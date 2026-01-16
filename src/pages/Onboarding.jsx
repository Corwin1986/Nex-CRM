import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { getSectorConfig, getAllSectors } from '@/components/hooks/useSectorConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, ShoppingBag, Lightbulb, HardHat, Heart, Sparkles,
  FileStack, UtensilsCrossed, Home, Factory, GraduationCap,
  ArrowRight, Check, Loader2, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ICON_MAP = {
  ShoppingBag, Lightbulb, HardHat, Heart, Sparkles, FileStack,
  UtensilsCrossed, Home, Factory, GraduationCap
};

/**
 * Page Onboarding - Sélection/Création de l'entreprise
 * Étapes : 1. Vérif entreprise existante → 2. Infos entreprise → 3. Choix secteur
 */
export default function Onboarding({ onComplete }) {
  const { selectCompany, resetAll } = useCompanyState();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = sélection/infos, 2 = secteur (si pas d'entreprise)
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: ''
  });

  React.useEffect(() => {
    // Charger les entreprises existantes
    const loadCompanies = async () => {
      try {
        const list = await base44.entities.Company.list('-created_date');
        setCompanies(list || []);
      } catch (error) {
        console.error('Error loading companies:', error);
      }
    };
    loadCompanies();
  }, []);

  const sectors = getAllSectors();

  const handleSectorSelect = (sectorId) => {
    setFormData({ ...formData, sector: sectorId });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.sector) return;

    setLoading(true);
    try {
      // 1. Créer l'entreprise
      const company = await base44.entities.Company.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        sector: formData.sector,
        is_active: true
      });
      selectCompany(company.id);

      // 2. Créer la configuration
      await base44.entities.AppConfiguration.create({
        company_id: company.id,
        sector: formData.sector,
        onboarding_completed: true,
        features_enabled: ['accounts', 'contacts', 'quotes', 'invoices']
      });

      // 3. Créer les CustomObjects uniquement pour le secteur choisi
      const sectorConfig = getSectorConfig(formData.sector);
      const coreObjects = sectorConfig?.coreObjects || [];
      const sectorObjects = sectorConfig?.customObjects || [];

      for (const obj of coreObjects) {
        await base44.entities.CustomObject.create({
          name: obj.name,
          label: obj.label,
          label_plural: obj.label_plural || obj.label,
          icon: obj.icon,
          sector: formData.sector,
          menu_order: obj.menu_order,
          record_types: obj.types || [],
          is_core: true,
          is_active: true
        });
      }

      for (const obj of sectorObjects) {
        await base44.entities.CustomObject.create({
          name: obj.name,
          label: obj.label,
          label_plural: obj.label_plural || obj.label,
          icon: obj.icon,
          sector: formData.sector,
          menu_order: obj.menu_order,
          record_types: obj.types || [],
          is_core: false,
          is_active: true
        });
      }

      // 5. Rafraîchir l'état global et aller au dashboard
      if (onComplete) {
        await onComplete();
      }
      navigate('/');

    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Erreur lors de la création : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const SectorIcon = ({ iconName }) => {
    const Icon = ICON_MAP[iconName] || Building2;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NexaCRM</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {companies.length > 0 && [1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white/10 text-white/50'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-sm ${step >= s ? 'text-white' : 'text-white/50'}`}>
                {s === 1 ? 'Entreprise' : s === 2 ? 'Infos' : 'Secteur'}
              </span>
              {s < 3 && <div className="w-12 h-px bg-white/20 mx-2" />}
            </div>
          ))}
          {companies.length === 0 && [1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white/10 text-white/50'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-sm ${step >= s ? 'text-white' : 'text-white/50'}`}>
                {s === 1 ? 'Votre entreprise' : 'Secteur d\'activité'}
              </span>
              {s < 2 && <div className="w-12 h-px bg-white/20 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select or Create Company */}
        {step === 1 && companies.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-white">Sélectionnez votre entreprise</CardTitle>
              <CardDescription className="text-white/60">
                Ou créez une nouvelle entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-3">
                {companies.map((comp) => (
                  <div
                    key={comp.id}
                    className="flex items-center gap-3 p-4 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition"
                  >
                    <button
                      onClick={async () => {
                        setFormData({ ...formData, name: comp.name, sector: comp.sector });
                        selectCompany(comp.id);
                        if (onComplete) {
                          await onComplete();
                        }
                        navigate('/');
                      }}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium text-white">{comp.name}</p>
                      <p className="text-xs text-white/50">{comp.sector}</p>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Supprimer "${comp.name}" ?`)) {
                          try {
                            await resetAll();
                            setCompanies([]);
                            setStep(1);
                          } catch (error) {
                            alert('Erreur lors de la suppression');
                          }
                        }
                      }}
                      className="p-2 hover:bg-red-500/20 rounded transition text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Company Info (Create) */}
        {((step === 2 && companies.length > 0) || (step === 1 && companies.length === 0)) && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-white">Bienvenue sur NexaCRM</CardTitle>
              <CardDescription className="text-white/60">
                Commençons par quelques informations sur votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label className="text-white/80">Nom de l'entreprise *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ma Société SAS"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@societe.fr"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Téléphone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01 23 45 67 89"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep(companies.length > 0 ? 3 : 2)}
                disabled={!formData.name}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Continuer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {companies.length > 0 && (
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full h-12 border-white/20 text-white hover:bg-white/10"
                >
                  Retour
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Sector Selection */}
        {((step === 3 && companies.length > 0) || (step === 2 && companies.length === 0)) && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre secteur</h2>
              <p className="text-white/60">
                Cela personnalisera votre CRM avec les objets métier adaptés
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sectors.map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => handleSectorSelect(sector.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.sector === sector.id
                      ? 'border-indigo-500 bg-indigo-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: sector.color + '20' }}
                  >
                    <SectorIcon iconName={sector.icon} />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1">{sector.label}</h3>
                  <p className="text-xs text-white/50 line-clamp-2">{sector.description}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={() => setStep(companies.length > 0 ? 2 : 1)}
                variant="outline"
                className="flex-1 h-12 border-white/20 text-white hover:bg-white/10"
              >
                Retour
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.sector || loading}
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    Créer mon CRM
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}