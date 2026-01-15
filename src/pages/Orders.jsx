import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  ShoppingCart, Plus, Search, MoreHorizontal, Edit, Trash2, 
  Building2, Calendar, Truck
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

export default function Orders() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    order_number: '', account_id: '', status: 'draft',
    subtotal: 0, total: 0, delivery_date: '', notes: ''
  });

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list('-created_date')
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => base44.entities.Account.list()
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const number = `CMD-${Date.now().toString().slice(-6)}`;
      return base44.entities.Order.create({ ...data, order_number: number });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      closeDialog();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Order.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      closeDialog();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Order.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['orders'])
  });

  const openCreate = () => {
    setEditingOrder(null);
    setFormData({
      order_number: '', account_id: '', status: 'draft',
      subtotal: 0, total: 0, delivery_date: '', notes: ''
    });
    setDialogOpen(true);
  };

  const openEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      order_number: order.order_number || '',
      account_id: order.account_id || '',
      status: order.status || 'draft',
      subtotal: order.subtotal || 0,
      total: order.total || 0,
      delivery_date: order.delivery_date || '',
      notes: order.notes || ''
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingOrder(null);
  };

  const handleSubmit = () => {
    if (editingOrder) {
      updateMutation.mutate({ id: editingOrder.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account?.name || '-';
  };

  const filteredOrders = orders.filter(o => 
    o.order_number?.toLowerCase().includes(search.toLowerCase()) ||
    getAccountName(o.account_id)?.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
    confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'En cours', color: 'bg-amber-100 text-amber-700' },
    shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700' }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Commandes</h1>
              <p className="text-sm text-slate-600">{orders.length} commande(s)</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle commande
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
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Livraison</TableHead>
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
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50">
                    <TableCell>
                      <span className="font-medium text-slate-900">{order.order_number}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3 h-3" />
                        {getAccountName(order.account_id)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[order.status]?.color}>
                        {statusConfig[order.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(order.total)}</span>
                    </TableCell>
                    <TableCell>
                      {order.delivery_date && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Truck className="w-3 h-3" />
                          {format(new Date(order.delivery_date), 'dd MMM', { locale: fr })}
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
                          <DropdownMenuItem onClick={() => openEdit(order)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteMutation.mutate(order.id)}
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
              {editingOrder ? 'Modifier la commande' : 'Nouvelle commande'}
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
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="shipped">Expédiée</SelectItem>
                  <SelectItem value="delivered">Livrée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date de livraison</Label>
              <Input
                type="date"
                value={formData.delivery_date}
                onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sous-total (€)</Label>
              <Input
                type="number"
                value={formData.subtotal}
                onChange={(e) => setFormData({ ...formData, subtotal: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Total (€)</Label>
              <Input
                type="number"
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) || 0 })}
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
              {editingOrder ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}