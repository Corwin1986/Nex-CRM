import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const SELECTED_COMPANY_KEY = 'nexa:selected_company_id';

const getSelectedCompanyId = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(SELECTED_COMPANY_KEY);
};

const setSelectedCompanyId = (companyId) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!companyId) {
    window.localStorage.removeItem(SELECTED_COMPANY_KEY);
    return;
  }
  window.localStorage.setItem(SELECTED_COMPANY_KEY, companyId);
};

/**
 * Hook central pour gérer l'état de l'entreprise
 * Source de vérité unique : 1 Company max en base
 * - null = loading
 * - false = pas d'entreprise → onboarding
 * - object = entreprise trouvée → dashboard
 */
export function useCompanyState() {
  const [company, setCompany] = useState(null); // null = loading
  const [config, setConfig] = useState(null);
  const [customObjects, setCustomObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompanyId, setSelectedCompanyIdState] = useState(getSelectedCompanyId());

  const loadCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Charger la company (une seule max)
      const companies = await base44.entities.Company.list('-created_date');
      
      if (!companies || companies.length === 0) {
        // Pas d'entreprise → mode onboarding
        setCompany(false);
        setConfig(null);
        setCustomObjects([]);
        setSelectedCompanyIdState(null);
        setSelectedCompanyId(null);
        setLoading(false);
        return;
      }

      const storedCompanyId = getSelectedCompanyId();
      const resolvedCompany = storedCompanyId
        ? companies.find((item) => item.id === storedCompanyId)
        : null;
      const currentCompany = resolvedCompany || companies[0];
      setSelectedCompanyIdState(currentCompany?.id || null);
      setSelectedCompanyId(currentCompany?.id || null);
      setCompany(currentCompany);

      // 2. Charger la config associée
      const configs = await base44.entities.AppConfiguration.filter({ 
        company_id: currentCompany.id 
      });
      setConfig(configs[0] || null);

      // 3. Charger les CustomObjects actifs pour ce secteur
      const allObjects = await base44.entities.CustomObject.filter({ 
        is_active: true 
      });
      
      // Filtrer : secteur = 'all' OU secteur de l'entreprise, sans doublons
      const seen = new Set();
      const sectorObjects = allObjects
        .filter(obj => {
          const include = obj.sector === 'all' || obj.sector === currentCompany.sector;
          if (include && !seen.has(obj.name)) {
            seen.add(obj.name);
            return true;
          }
          return false;
        })
        .sort((a, b) => (a.menu_order || 100) - (b.menu_order || 100));
      
      setCustomObjects(sectorObjects);
      setLoading(false);

    } catch (err) {
      console.error('useCompanyState error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  // Rafraîchir les données
  const refresh = useCallback(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  const selectCompany = useCallback((companyId) => {
    setSelectedCompanyId(companyId);
    setSelectedCompanyIdState(companyId);
  }, []);

  // Réinitialisation complète (suppression)
  const resetAll = useCallback(async () => {
    try {
      setLoading(true);
      
      // Supprimer dans l'ordre pour éviter les dépendances
      const entitiesToClear = [
        'Payment', 'Invoice', 'Order', 'QuoteLine', 'Quote',
        'Opportunity', 'Case', 'Contract', 'Asset',
        'Contact', 'Lead', 'Account', 'Product',
        'FlowElement', 'Flow', 'ValidationRule', 'CustomField', 'CustomObject',
        'AppConfiguration', 'Company'
      ];

      for (const entityName of entitiesToClear) {
        try {
          const records = await base44.entities[entityName].list();
          for (const record of records) {
            await base44.entities[entityName].delete(record.id);
          }
        } catch (e) {
          // Ignorer si l'entité n'existe pas
          console.log(`Skip ${entityName}:`, e.message);
        }
      }

      // Réinitialiser l'état
      setCompany(false);
      setConfig(null);
      setCustomObjects([]);
      setSelectedCompanyIdState(null);
      setSelectedCompanyId(null);
      setLoading(false);

      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, []);

  return {
    // État
    company,        // false = pas d'entreprise, object = entreprise
    config,         // AppConfiguration
    customObjects,  // CustomObjects filtrés par secteur
    loading,
    error,
    
    // État dérivé
    hasCompany: company && company !== false,
    sector: company?.sector || null,
    
    // Actions
    refresh,
    selectCompany,
    resetAll,
    setCompany,
    setConfig,
    setCustomObjects
  };
}

export default useCompanyState;