import React, { useState } from 'react';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { getSectorConfig } from '@/components/hooks/useSectorConfig';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, Save, Trash2, AlertTriangle, Loader2, Check,
  Settings as SettingsIcon, Palette, Bell, Shield, Database
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { company, config, resetAll, refresh } = useCompanyState();
  const sectorConfig = getSectorConfig(company?.sector);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: company?.name || '',
    email: company?.email || '',
    phone: company?.phone || '',
    address: company?.address || '',
    siret: company?.siret || '',
    tva_number: company?.tva_number || '',
    website: company?.website || ''
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.entities.Company.update(company.id, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      refresh();
    } catch (error) {
      console.error('Save error:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setDeleting(true);
    try {
      await resetAll();
      // Après suppression, la page Home va rediriger vers Onboarding
      window.location.href = '/';
    } catch (error) {
      console.error('Reset error:', error);
      alert('Erreur lors de la réinitialisation');
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Paramètres</h1>
              <p className="text-sm text-slate-600">Gérez votre entreprise et votre CRM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Company Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-slate-600" />
              <div>
                <CardTitle className="text-lg">Informations entreprise</CardTitle>
                <CardDescription>Les informations de base de votre entreprise</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom de l'entreprise</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Secteur d'activité</Label>
                <div 
                  className="h-10 px-3 flex items-center rounded-md border border-slate-200 bg-slate-50"
                  style={{ color: sectorConfig?.color }}
                >
                  {sectorConfig?.label || company?.sector}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Adresse</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>SIRET</Label>
                <Input
                  value={formData.siret}
                  onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Numéro TVA</Label>
                <Input
                  value={formData.tva_number}
                  onChange={(e) => setFormData({ ...formData, tva_number: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Site web</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/Onboarding')}
              >
                Changer d'entreprise
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saved ? 'Enregistré !' : 'Enregistrer'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <CardTitle className="text-lg text-red-900">Zone de danger</CardTitle>
                <CardDescription className="text-red-700">
                  Actions irréversibles sur votre CRM
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-900">Réinitialiser complètement le CRM</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Supprime TOUTES les données : entreprise, clients, devis, factures, objets métier...
                    Vous reviendrez à l'écran de création d'entreprise.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="shrink-0">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Tout supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Confirmer la suppression totale
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p>Cette action va supprimer définitivement :</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Votre entreprise et sa configuration</li>
                          <li>Tous vos clients et contacts</li>
                          <li>Tous vos devis, commandes et factures</li>
                          <li>Tous les objets métier personnalisés</li>
                          <li>Tous les flows et automatisations</li>
                        </ul>
                        <p className="font-medium text-red-600 pt-2">
                          Cette action est irréversible !
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleReset}
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Suppression...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Oui, tout supprimer
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}