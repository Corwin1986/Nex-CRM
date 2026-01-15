import React from 'react';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { getSectorConfig } from '@/components/hooks/useSectorConfig';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, Users, FileText, Receipt, TrendingUp, 
  ShoppingCart, Target, Package, ArrowUpRight, ArrowDownRight,
  Plus, Calendar, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * Dashboard adaptatif par secteur
 * Affiche les KPIs et raccourcis pertinents selon le secteur de l'entreprise
 */
export default function Dashboard() {
  const { company, sector } = useCompanyState();
  const sectorConfig = getSectorConfig(sector);

  // Charger les stats de base
  const { data: stats = {} } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [accounts, contacts, quotes, invoices, opportunities, orders] = await Promise.all([
        base44.entities.Account.list().catch(() => []),
        base44.entities.Contact.list().catch(() => []),
        base44.entities.Quote.list().catch(() => []),
        base44.entities.Invoice.list().catch(() => []),
        base44.entities.Opportunity.list().catch(() => []),
        base44.entities.Order.list().catch(() => []),
      ]);

      const totalRevenue = invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + (i.total || 0), 0);

      const pendingQuotes = quotes.filter(q => q.status === 'sent').length;
      const unpaidInvoices = invoices.filter(i => ['sent', 'overdue'].includes(i.status)).length;
      const pipelineValue = opportunities
        .filter(o => !['closed_won', 'closed_lost'].includes(o.stage))
        .reduce((sum, o) => sum + (o.amount || 0), 0);

      return {
        accounts: accounts.length,
        contacts: contacts.length,
        quotes: quotes.length,
        invoices: invoices.length,
        orders: orders.length,
        opportunities: opportunities.length,
        totalRevenue,
        pendingQuotes,
        unpaidInvoices,
        pipelineValue
      };
    }
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const kpiCards = [
    {
      title: 'Chiffre d\'affaires',
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      color: 'bg-emerald-500',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Pipeline',
      value: formatCurrency(stats.pipelineValue),
      icon: Target,
      color: 'bg-indigo-500',
      trend: `${stats.opportunities || 0} opportunités`
    },
    {
      title: 'Clients',
      value: stats.accounts || 0,
      icon: Building2,
      color: 'bg-blue-500',
      trend: `${stats.contacts || 0} contacts`
    },
    {
      title: 'Devis en attente',
      value: stats.pendingQuotes || 0,
      icon: FileText,
      color: 'bg-amber-500',
      trend: `${stats.quotes || 0} au total`
    },
  ];

  const quickActions = [
    { label: 'Nouveau client', icon: Building2, page: 'Accounts', color: 'bg-blue-50 text-blue-600' },
    { label: 'Nouveau devis', icon: FileText, page: 'Quotes', color: 'bg-amber-50 text-amber-600' },
    { label: 'Nouvelle facture', icon: Receipt, page: 'Invoices', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Nouvelle opportunité', icon: Target, page: 'Opportunities', color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Bonjour ! 👋
              </h1>
              <p className="text-slate-600 mt-1">
                Voici l'activité de <span className="font-medium">{company?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: (sectorConfig?.color || '#6366f1') + '20',
                  color: sectorConfig?.color || '#6366f1'
                }}
              >
                {sectorConfig?.label || 'CRM'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trendUp !== undefined && (
                        kpi.trendUp 
                          ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          : <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-slate-500">{kpi.trend}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={createPageUrl(action.page)}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-700">{action.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
                <p className="text-center text-sm text-slate-500 py-2">
                  Les activités apparaîtront ici
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tâches à faire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.unpaidInvoices > 0 && (
                  <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{stats.unpaidInvoices} facture(s) impayée(s)</p>
                      <p className="text-sm text-slate-600">Relancer les clients</p>
                    </div>
                  </div>
                )}
                {stats.pendingQuotes > 0 && (
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{stats.pendingQuotes} devis en attente</p>
                      <p className="text-sm text-slate-600">Suivre les réponses</p>
                    </div>
                  </div>
                )}
                {stats.pendingQuotes === 0 && stats.unpaidInvoices === 0 && (
                  <p className="text-center text-sm text-slate-500 py-8">
                    Aucune tâche urgente 🎉
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}