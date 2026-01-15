import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Receipt, Plus, Search, MoreHorizontal, Edit, Trash2, 
  Send, Check, Building2, Calendar, AlertCircle
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

export default function Invoices() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    invoice_number: '', account_id: '', status: 'draft',
    subtotal: 0, discount_amount: 0, tax_amount: 0, total: 0,
    issue_date: '', due_date: '', notes: ''
  });

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => base44.entities.Invoice.list('-created_date')
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => base44.entities.Account.list()
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const number = `FAC-${Date.now().toString().slice(-6)}`;
      const today = new Date().toISOString().split('T')[0];
      return base44.entities.Invoice.create({ 
        ...data, 
        invoice_number: number,
        issue_date: data.issue_date || today,
        amount_due: data.total
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
      closeDialog();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Invoice.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
      closeDialog();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Invoice.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['invoices'])
  });

  const openCreate = () => {
    setEditingInvoice(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      invoice_number: '', account_id: '', status: 'draft',
      subtotal: 0, discount_amount: 0, tax_amount: 0, total: 0,
      issue_date: today, due_date: '', notes: ''
    });
    setDialogOpen(true);
  };

  const openEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoice_number: invoice.invoice_number || '',
      account_id: invoice.account_id || '',
      status: invoice.status || 'draft',
      subtotal: invoice.subtotal || 0,
      discount_amount: invoice.discount_amount || 0,
      tax_amount: invoice.tax_amount || 0,
      total: invoice.total || 0,
      issue_date: invoice.issue_date || '',
      due_date: invoice.due_date || '',
      notes: invoice.notes || ''
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingInvoice(null);
  };

  const handleSubmit = () => {
    const subtotal = parseFloat(formData.subtotal) || 0;
    const discount = parseFloat(formData.discount_amount) || 0;
    const tax = parseFloat(formData.tax_amount) || 0;
    const total = subtotal - discount + tax;

    const data = { ...formData, total };

    if (editingInvoice) {
      updateMutation.mutate({ id: editingInvoice.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account?.name || '-';
  };

  const filteredInvoices = invoices.filter(i => 
    i.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    getAccountName(i.account_id)?.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
    sent: { label: 'Envoyée', color: 'bg-blue-100 text-blue-700' },
    paid: { label: 'Payée', color: 'bg-green-100 text-green-700' },
    partial: { label: 'Partielle', color: 'bg-amber-100 text-amber-700' },
    overdue: { label: 'En retard', color: 'bg-red-100 text-red-700' },
    cancelled: { label: 'Annulée', color: 'bg-slate-100 text-slate-500' }
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
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Factures</h1>
              <p className="text-sm text-slate-600">{invoices.length} facture(s)</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle facture
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher une facture..."
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
                <TableHead>Échéance</TableHead>
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
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Aucune facture trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <span className="font-medium text-slate-900">{invoice.invoice_number}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3 h-3" />
                        {getAccountName(invoice.account_id)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[invoice.status]?.color}>
                        {statusConfig[invoice.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(invoice.total)}</span>
                    </TableCell>
                    <TableCell>
                      {invoice.due_date && (
                        <div className={`flex items-center gap-1 text-sm ${
                          invoice.status === 'overdue' ? 'text-red-600' : 'text-slate-600'
                        }`}>
                          {invoice.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                          <Calendar className="w-3 h-3" />
                          {format(new Date(invoice.due_date), 'dd MMM yyyy', { locale: fr })}
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
                          <DropdownMenuItem onClick={() => openEdit(invoice)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          {invoice.status === 'draft' && (
                            <DropdownMenuItem onClick={() => updateMutation.mutate({ id: invoice.id, data: { status: 'sent' }})}>
                              <Send className="w-4 h-4 mr-2" />
                              Envoyer
                            </DropdownMenuItem>
                          )}
                          {['sent', 'overdue'].includes(invoice.status) && (
                            <DropdownMenuItem onClick={() => updateMutation.mutate({ id: invoice.id, data: { status: 'paid', paid_date: new Date().toISOString().split('T')[0] }})}>
                              <Check className="w-4 h-4 mr-2" />
                              Marquer payée
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteMutation.mutate(invoice.id)}
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
              {editingInvoice ? 'Modifier la facture' : 'Nouvelle facture'}
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
              <Label>Date d'émission</Label>
              <Input
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Date d'échéance</Label>
              <Input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
              <Label>Remise (€)</Label>
              <Input
                type="number"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>TVA (€)</Label>
              <Input
                type="number"
                value={formData.tax_amount}
                onChange={(e) => setFormData({ ...formData, tax_amount: e.target.value })}
              />
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
                  <SelectItem value="sent">Envoyée</SelectItem>
                  <SelectItem value="paid">Payée</SelectItem>
                  <SelectItem value="overdue">En retard</SelectItem>
                </SelectContent>
              </Select>
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
              {editingInvoice ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}