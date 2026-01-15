/**
 * Configuration par secteur d'activité
 * Définit les objets métier, dashboard, et paramètres spécifiques à chaque secteur
 */

export const SECTORS = {
  commerce_retail: {
    id: 'commerce_retail',
    label: 'Commerce & Retail',
    icon: 'ShoppingBag',
    color: '#10b981',
    description: 'Boutiques, e-commerce, distribution',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'product', label: 'Produits', icon: 'Package', menu_order: 30 },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40 },
      { name: 'order', label: 'Commandes', icon: 'ShoppingCart', menu_order: 50 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60 },
    ],
    customObjects: [
      { name: 'store', label: 'Magasin', label_plural: 'Magasins', icon: 'Store', menu_order: 70 },
      { name: 'inventory', label: 'Stock', label_plural: 'Stocks', icon: 'Warehouse', menu_order: 80 },
    ],
    dashboardKPIs: ['revenue', 'orders_count', 'avg_basket', 'stock_alerts'],
  },

  conseil_ingenierie: {
    id: 'conseil_ingenierie',
    label: 'Conseil & Ingénierie',
    icon: 'Lightbulb',
    color: '#6366f1',
    description: 'Consulting, bureaux d\'études, ESN',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'lead', label: 'Prospects', icon: 'UserPlus', menu_order: 25 },
      { name: 'opportunity', label: 'Opportunités', icon: 'Target', menu_order: 30 },
      { name: 'quote', label: 'Propositions', icon: 'FileText', menu_order: 40 },
      { name: 'contract', label: 'Contrats', icon: 'FileCheck', menu_order: 50 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60 },
    ],
    customObjects: [
      { name: 'mission', label: 'Mission', label_plural: 'Missions', icon: 'Briefcase', menu_order: 70 },
      { name: 'consultant', label: 'Consultant', label_plural: 'Consultants', icon: 'UserCheck', menu_order: 80 },
      { name: 'timesheet', label: 'Feuille de temps', label_plural: 'Feuilles de temps', icon: 'Clock', menu_order: 90 },
    ],
    dashboardKPIs: ['pipeline_value', 'missions_active', 'utilization_rate', 'revenue_forecast'],
  },

  construction_btp: {
    id: 'construction_btp',
    label: 'Construction & BTP',
    icon: 'HardHat',
    color: '#f59e0b',
    description: 'Bâtiment, travaux publics, artisanat',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 30 },
      { name: 'order', label: 'Commandes', icon: 'ClipboardList', menu_order: 40 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50 },
    ],
    customObjects: [
      { name: 'chantier', label: 'Chantier', label_plural: 'Chantiers', icon: 'Construction', menu_order: 60 },
      { name: 'intervention', label: 'Intervention', label_plural: 'Interventions', icon: 'Wrench', menu_order: 70 },
      { name: 'materiel', label: 'Matériel', label_plural: 'Matériels', icon: 'Truck', menu_order: 80 },
    ],
    dashboardKPIs: ['chantiers_actifs', 'ca_mensuel', 'devis_en_attente', 'interventions_planifiees'],
  },

  sante_social: {
    id: 'sante_social',
    label: 'Santé & Social',
    icon: 'Heart',
    color: '#ec4899',
    description: 'Cabinets médicaux, associations, EHPAD',
    coreObjects: [
      { name: 'account', label: 'Structures', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'case', label: 'Dossiers', icon: 'FolderOpen', menu_order: 30 },
      { name: 'invoice', label: 'Facturation', icon: 'Receipt', menu_order: 50 },
    ],
    customObjects: [
      { name: 'patient', label: 'Patient', label_plural: 'Patients', icon: 'UserHeart', menu_order: 25 },
      { name: 'rdv', label: 'Rendez-vous', label_plural: 'Rendez-vous', icon: 'Calendar', menu_order: 35 },
      { name: 'prescription', label: 'Prescription', label_plural: 'Prescriptions', icon: 'Pill', menu_order: 40 },
    ],
    dashboardKPIs: ['patients_actifs', 'rdv_jour', 'dossiers_ouverts', 'facturation_mois'],
  },

  services_personnels: {
    id: 'services_personnels',
    label: 'Services à la personne',
    icon: 'Sparkles',
    color: '#8b5cf6',
    description: 'Coiffure, esthétique, bien-être',
    coreObjects: [
      { name: 'contact', label: 'Clients', icon: 'Users', menu_order: 10 },
      { name: 'product', label: 'Prestations', icon: 'Sparkles', menu_order: 20 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 40 },
    ],
    customObjects: [
      { name: 'rdv', label: 'Rendez-vous', label_plural: 'Rendez-vous', icon: 'Calendar', menu_order: 15 },
      { name: 'fiche_client', label: 'Fiche client', label_plural: 'Fiches clients', icon: 'ClipboardList', menu_order: 25 },
      { name: 'abonnement', label: 'Abonnement', label_plural: 'Abonnements', icon: 'CreditCard', menu_order: 30 },
    ],
    dashboardKPIs: ['rdv_jour', 'ca_semaine', 'clients_fideles', 'prestations_populaires'],
  },

  services_administratifs: {
    id: 'services_administratifs',
    label: 'Services administratifs',
    icon: 'FileStack',
    color: '#64748b',
    description: 'Comptabilité, juridique, RH',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'contract', label: 'Contrats', icon: 'FileCheck', menu_order: 30 },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50 },
    ],
    customObjects: [
      { name: 'dossier', label: 'Dossier', label_plural: 'Dossiers', icon: 'FolderOpen', menu_order: 25 },
      { name: 'echeance', label: 'Échéance', label_plural: 'Échéances', icon: 'CalendarClock', menu_order: 35 },
      { name: 'document', label: 'Document', label_plural: 'Documents', icon: 'File', menu_order: 45 },
    ],
    dashboardKPIs: ['dossiers_actifs', 'echeances_semaine', 'ca_mensuel', 'taux_recouvrement'],
  },

  hebergement_restauration: {
    id: 'hebergement_restauration',
    label: 'Hôtellerie & Restauration',
    icon: 'UtensilsCrossed',
    color: '#ef4444',
    description: 'Hôtels, restaurants, traiteurs',
    coreObjects: [
      { name: 'contact', label: 'Clients', icon: 'Users', menu_order: 10 },
      { name: 'product', label: 'Menu/Services', icon: 'UtensilsCrossed', menu_order: 20 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50 },
    ],
    customObjects: [
      { name: 'reservation', label: 'Réservation', label_plural: 'Réservations', icon: 'CalendarCheck', menu_order: 15 },
      { name: 'chambre', label: 'Chambre', label_plural: 'Chambres', icon: 'Bed', menu_order: 25 },
      { name: 'table', label: 'Table', label_plural: 'Tables', icon: 'Armchair', menu_order: 30 },
      { name: 'evenement', label: 'Événement', label_plural: 'Événements', icon: 'PartyPopper', menu_order: 35 },
    ],
    dashboardKPIs: ['reservations_jour', 'taux_occupation', 'ca_jour', 'avis_clients'],
  },

  immobilier: {
    id: 'immobilier',
    label: 'Immobilier',
    icon: 'Home',
    color: '#0ea5e9',
    description: 'Agences, promoteurs, syndics',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'lead', label: 'Prospects', icon: 'UserPlus', menu_order: 25 },
      { name: 'contract', label: 'Mandats', icon: 'FileCheck', menu_order: 50 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60 },
    ],
    customObjects: [
      { name: 'bien', label: 'Bien', label_plural: 'Biens', icon: 'Home', menu_order: 30 },
      { name: 'visite', label: 'Visite', label_plural: 'Visites', icon: 'Eye', menu_order: 35 },
      { name: 'compromis', label: 'Compromis', label_plural: 'Compromis', icon: 'Handshake', menu_order: 40 },
      { name: 'copropriete', label: 'Copropriété', label_plural: 'Copropriétés', icon: 'Building', menu_order: 45 },
    ],
    dashboardKPIs: ['biens_disponibles', 'visites_semaine', 'ventes_mois', 'mandats_actifs'],
  },

  industrie: {
    id: 'industrie',
    label: 'Industrie',
    icon: 'Factory',
    color: '#78716c',
    description: 'Production, fabrication, maintenance',
    coreObjects: [
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'product', label: 'Produits', icon: 'Package', menu_order: 30 },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40 },
      { name: 'order', label: 'Commandes', icon: 'ClipboardList', menu_order: 50 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60 },
    ],
    customObjects: [
      { name: 'of', label: 'Ordre de fabrication', label_plural: 'Ordres de fabrication', icon: 'Factory', menu_order: 55 },
      { name: 'machine', label: 'Machine', label_plural: 'Machines', icon: 'Cog', menu_order: 70 },
      { name: 'maintenance', label: 'Maintenance', label_plural: 'Maintenances', icon: 'Wrench', menu_order: 75 },
      { name: 'lot', label: 'Lot', label_plural: 'Lots', icon: 'Boxes', menu_order: 80 },
    ],
    dashboardKPIs: ['of_en_cours', 'production_jour', 'maintenances_planifiees', 'taux_rendement'],
  },

  enseignement_formation: {
    id: 'enseignement_formation',
    label: 'Enseignement & Formation',
    icon: 'GraduationCap',
    color: '#14b8a6',
    description: 'Écoles, centres de formation, coaching',
    coreObjects: [
      { name: 'account', label: 'Organismes', icon: 'Building2', menu_order: 10 },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20 },
      { name: 'product', label: 'Formations', icon: 'BookOpen', menu_order: 30 },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 50 },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60 },
    ],
    customObjects: [
      { name: 'apprenant', label: 'Apprenant', label_plural: 'Apprenants', icon: 'UserGraduate', menu_order: 25 },
      { name: 'session', label: 'Session', label_plural: 'Sessions', icon: 'Calendar', menu_order: 35 },
      { name: 'formateur', label: 'Formateur', label_plural: 'Formateurs', icon: 'UserCheck', menu_order: 40 },
      { name: 'evaluation', label: 'Évaluation', label_plural: 'Évaluations', icon: 'ClipboardCheck', menu_order: 45 },
    ],
    dashboardKPIs: ['apprenants_actifs', 'sessions_mois', 'taux_satisfaction', 'ca_formation'],
  },
};

export const getSectorConfig = (sectorId) => {
  return SECTORS[sectorId] || null;
};

export const getAllSectors = () => {
  return Object.values(SECTORS);
};

export default { SECTORS, getSectorConfig, getAllSectors };