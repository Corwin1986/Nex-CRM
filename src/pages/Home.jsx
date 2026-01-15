import React from 'react';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { Loader2 } from 'lucide-react';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';

/**
 * Page Home - Point d'entrée unique
 * Routing déterministe basé sur useCompanyState :
 * - loading → spinner
 * - pas d'entreprise → Onboarding
 * - entreprise existe → Dashboard
 */
export default function Home() {
  const { company, loading, error, refresh } = useCompanyState();

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Chargement de NexaCRM...</p>
        </div>
      </div>
    );
  }

  // Erreur
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Erreur de chargement</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Pas d'entreprise → Onboarding
  if (company === false) {
    return <Onboarding onComplete={refresh} />;
  }

  // Entreprise existe → Dashboard
  return <Dashboard />;
}