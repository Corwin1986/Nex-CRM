import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  FileText, Plus, Search, MoreHorizontal, Edit, Trash2, 
  Send, Check, X, Building2, Calendar
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

export default function Quotes() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [formData, setFormData] = useState({
    quote_number: '', account_id: '', status: 'draft',
    subtotal: 0, discount_percent: 0, tax_percent: 20, total: 0,
    valid_until: '', notes: ''
  });

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: () => base44.entities.Quote.list('-created_date')
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => base44.entities.Account.list()
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      // Générer numéro de devis
      const number = `DEV-${Date.now().toString().slice(-6)}`;
      return base44.entities.Quote.create({ ...data, quote_number: number });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quotes']);
      closeDialog();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Quote.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['quotes']);
      closeDialog();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Quote.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['quotes'])
  });

  const openCreate = () => {
    setEditingQuote(null);
    setFormData({
      quote_number: '', account_id: '', status: 'draft',
      subtotal: 0, discount_percent: 0, tax_percent: 20, total: 0,
      valid_until: '', notes: ''
    });
    setDialogOpen(true);
  };

  const openEdit = (quote) => {
    setEditingQuote(quote);
    setFormData({
      quote_number: quote.quote_number || '',
      account_id: quote.account_id || '',
      status: quote.status || 'draft',
      subtotal: quote.subtotal || 0,
      discount_percent: quote.discount_percent || 0,
      tax_percent: quote.tax_percent || 20,
      total: quote.total || 0,
      valid_until: quote.valid_until || '',
      notes: quote.notes || ''
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingQuote(null);
  };

  const handleSubmit = () => {
    // Calcul du total
    const subtotal = parseFloat(formData.subtotal) || 0;
    const discount = subtotal * (parseFloat(formData.discount_percent) || 0) / 100;
    const taxable = subtotal - discount;
    const tax = taxable * (parseFloat(formData.tax_percent) || 0) / 100;
    const total = taxable + tax;

    const data = {
      ...formData,
      discount_amount: discount,
      tax_amount: tax,
      total
    };

    if (editingQuote) {
      updateMutation.mutate({ id: editingQuote.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account?.name || '-';
  };

  const filteredQuotes = quotes.filter(q => 
    q.quote_number?.toLowerCase().includes(search.toLowerCase()) ||
    getAccountName(q.account_id)?.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
    sent: { label: 'Envoyé', color: 'bg-blue-100 text-blue-700' },
    accepted: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
    rejected: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
    expired: { label: 'Expiré', color: 'bg-amber-100 text-amber-700' }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Devis</h1>
              <p className="text-sm text-slate-600">{quotes.length} devis</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau devis
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher un devis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Validité</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Aucun devis trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <span className="font-medium text-slate-900">{quote.quote_number}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3 h-3" />
                        {getAccountName(quote.account_id)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[quote.status]?.color}>
                        {statusConfig[quote.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(quote.total)}</span>
                    </TableCell>
                    <TableCell>
                      {quote.valid_until && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(quote.valid_until), 'dd MMM yyyy', { locale: fr })}
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
                          <DropdownMenuItem onClick={() => openEdit(quote)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          {quote.status === 'draft' && (
                            <DropdownMenuItem onClick={() => updateMutation.mutate({ id: quote.id, data: { status: 'sent' }})}>
                              <Send className="w-4 h-4 mr-2" />
                              Envoyer
                            </DropdownMenuItem>
                          )}
                          {quote.status === 'sent' && (
                            <>
                              <DropdownMenuItem onClick={() => updateMutation.mutate({ id: quote.id, data: { status: 'accepted' }})}>
                                <Check className="w-4 h-4 mr-2" />
                                Marquer accepté
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateMutation.mutate({ id: quote.id, data: { status: 'rejected' }})}>
                                <X className="w-4 h-4 mr-2" />
                                Marquer refusé
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteMutation.mutate(quote.id)}
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

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingQuote ? 'Modifier le devis' : 'Nouveau devis'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Client *</Label>
              <Select
                value={formData.account_id}
                onValueChange={(v) => setFormData({ ...formData, account_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client..." />
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
              <Label>Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="sent">Envoyé</SelectItem>
                  <SelectItem value="accepted">Accepté</SelectItem>
                  <SelectItem value="rejected">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Validité</Label>
              <Input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sous-total HT (€)</Label>
              <Input
                type="number"
                value={formData.subtotal}
                onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Remise (%)</Label>
              <Input
                type="number"
                value={formData.discount_percent}
                onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>TVA (%)</Label>
              <Input
                type="number"
                value={formData.tax_percent}
                onChange={(e) => setFormData({ ...formData, tax_percent: e.target.value })}
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
            <Button onClick={handleSubmit} disabled={!formData.account_id}>
              {editingQuote ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}