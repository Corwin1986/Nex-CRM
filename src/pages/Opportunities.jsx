import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Target, Plus, Search, MoreHorizontal, Edit, Trash2, 
  Building2, Calendar, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Opportunities() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [formData, setFormData] = useState({
    name: '', account_id: '', amount: 0, probability: 50,
    stage: 'prospecting', close_date: '', source: '', notes: ''
  });

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: () => base44.entities.Opportunity.list('-created_date')
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => base44.entities.Account.list()
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Opportunity.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['opportunities']);
      closeDialog();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Opportunity.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['opportunities']);
      closeDialog();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Opportunity.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['opportunities'])
  });

  const openCreate = () => {
    setEditingOpp(null);
    setFormData({
      name: '', account_id: '', amount: 0, probability: 50,
      stage: 'prospecting', close_date: '', source: '', notes: ''
    });
    setDialogOpen(true);
  };

  const openEdit = (opp) => {
    setEditingOpp(opp);
    setFormData({
      name: opp.name || '',
      account_id: opp.account_id || '',
      amount: opp.amount || 0,
      probability: opp.probability || 50,
      stage: opp.stage || 'prospecting',
      close_date: opp.close_date || '',
      source: opp.source || '',
      notes: opp.notes || ''
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingOpp(null);
  };

  const handleSubmit = () => {
    if (editingOpp) {
      updateMutation.mutate({ id: editingOpp.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account?.name || '-';
  };

  const filteredOpps = opportunities.filter(o => 
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    getAccountName(o.account_id)?.toLowerCase().includes(search.toLowerCase())
  );

  const stageConfig = {
    prospecting: { label: 'Prospection', color: 'bg-slate-100 text-slate-700', prob: 10 },
    qualification: { label: 'Qualification', color: 'bg-blue-100 text-blue-700', prob: 25 },
    proposal: { label: 'Devis', color: 'bg-purple-100 text-purple-700', prob: 50 },
    negotiation: { label: 'Négociation', color: 'bg-amber-100 text-amber-700', prob: 75 },
    closed_won: { label: 'Gagnée', color: 'bg-green-100 text-green-700', prob: 100 },
    closed_lost: { label: 'Perdue', color: 'bg-red-100 text-red-700', prob: 0 }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Opportunités</h1>
              <p className="text-sm text-slate-600">{opportunities.length} opportunité(s)</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle opportunité
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Étape</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Probabilité</TableHead>
                <TableHead>Clôture</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : filteredOpps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    Aucune opportunité trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOpps.map((opp) => (
                  <TableRow key={opp.id} className="hover:bg-slate-50">
                    <TableCell>
                      <span className="font-medium text-slate-900">{opp.name}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3 h-3" />
                        {getAccountName(opp.account_id)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={stageConfig[opp.stage]?.color}>
                        {stageConfig[opp.stage]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(opp.amount)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${opp.probability || 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{opp.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {opp.close_date && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(opp.close_date), 'dd MMM', { locale: fr })}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(opp)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteMutation.mutate(opp.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingOpp ? 'Modifier l\'opportunité' : 'Nouvelle opportunité'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Nom *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Projet refonte site web"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Client *</Label>
              <Select
                value={formData.account_id}
                onValueChange={(v) => setFormData({ ...formData, account_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Montant (€)</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Probabilité (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Étape</Label>
              <Select
                value={formData.stage}
                onValueChange={(v) => setFormData({ ...formData, stage: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospecting">Prospection</SelectItem>
                  <SelectItem value="qualification">Qualification</SelectItem>
                  <SelectItem value="proposal">Devis</SelectItem>
                  <SelectItem value="negotiation">Négociation</SelectItem>
                  <SelectItem value="closed_won">Gagnée</SelectItem>
                  <SelectItem value="closed_lost">Perdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date de clôture</Label>
              <Input
                type="date"
                value={formData.close_date}
                onChange={(e) => setFormData({ ...formData, close_date: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Annuler</Button>
            <Button onClick={handleSubmit} disabled={!formData.name || !formData.account_id}>
              {editingOpp ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}