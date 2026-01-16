import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { getSectorConfig } from '@/components/hooks/useSectorConfig';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  LayoutDashboard, Building2, Users, UserPlus, Target, Package,
  FileText, ShoppingCart, Receipt, CreditCard, MessageSquare,
  FileCheck, Box, Settings, ChevronLeft, ChevronRight, LogOut,
  Menu, X, Search, Bell, User, Home, Briefcase, Calendar, Clock,
  Wrench, Truck, Heart, Sparkles, Store, Warehouse, Construction,
  GraduationCap, Factory, Bed, Eye, Handshake, Cog, Boxes,
  UserCheck, ClipboardCheck, BookOpen, FolderOpen, CalendarClock,
  File, CalendarCheck, Armchair, PartyPopper, Pill, UserGraduate,
  UserHeart, ClipboardList, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Map des icônes disponibles
const ICON_MAP = {
  LayoutDashboard, Building2, Users, UserPlus, Target, Package,
  FileText, ShoppingCart, Receipt, CreditCard, MessageSquare,
  FileCheck, Box, Settings, Home, Briefcase, Calendar, Clock,
  Wrench, Truck, Heart, Sparkles, Store, Warehouse, Construction,
  GraduationCap, Factory, Bed, Eye, Handshake, Cog, Boxes,
  UserCheck, ClipboardCheck, BookOpen, FolderOpen, CalendarClock,
  File, CalendarCheck, Armchair, PartyPopper, Pill, UserGraduate,
  UserHeart, ClipboardList, Building
};

// Mapping des objets vers les pages
const OBJECT_TO_PAGE = {
  account: 'Accounts',
  contact: 'Contacts',
  lead: 'Leads',
  opportunity: 'Opportunities',
  product: 'Products',
  quote: 'Quotes',
  order: 'Orders',
  invoice: 'Invoices',
  payment: 'Payments',
  case: 'Cases',
  contract: 'Contracts',
  asset: 'Assets'
};

export default function Layout({ children, currentPageName }) {
  const { company, customObjects, hasCompany, sector, loading } = useCompanyState();
  const sectorConfig = getSectorConfig(sector);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Si pas d'entreprise ou page onboarding, pas de layout
  if (!hasCompany || currentPageName === 'Onboarding') {
    return <>{children}</>;
  }

  // Construire le menu dynamique à partir des CustomObjects
  const buildMenuItems = () => {
    const items = [
      { 
        name: 'Dashboard', 
        label: 'Tableau de bord', 
        icon: 'LayoutDashboard',
        page: 'Home'
      }
    ];

    // Ajouter les objets métier actifs
    customObjects.forEach(obj => {
      const pageName = OBJECT_TO_PAGE[obj.name] || `CustomObject_${obj.name}`;
      items.push({
        name: obj.name,
        label: obj.label_plural || obj.label,
        icon: obj.icon || 'Box',
        page: pageName,
        color: obj.color
      });
    });

    return items;
  };

  const menuItems = buildMenuItems();

  const getIcon = (iconName) => {
    return ICON_MAP[iconName] || Box;
  };

  const isActive = (page) => {
    if (page === 'Home' && currentPageName === 'Home') return true;
    if (page === 'Home' && currentPageName === 'Dashboard') return true;
    return currentPageName === page;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-semibold text-slate-900">{company?.name}</span>
        <div className="w-10" />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: sectorConfig?.color || '#6366f1' }}
            >
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="font-semibold text-slate-900 truncate">{company?.name}</p>
                <p className="text-xs text-slate-500 truncate">{sectorConfig?.label}</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-lg"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 8rem)' }}>
          {menuItems.map((item) => {
            const Icon = getIcon(item.icon);
            const active = isActive(item.page);

            return (
              <Link
                key={item.name}
                to={createPageUrl(item.page)}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  active 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", active && "text-indigo-600")} />
                {sidebarOpen && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-100">
          <Link
            to={createPageUrl('Settings')}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              currentPageName === 'Settings'
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Paramètres</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 pt-16 lg:pt-0",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        {children}
      </main>
    </div>
  );
}