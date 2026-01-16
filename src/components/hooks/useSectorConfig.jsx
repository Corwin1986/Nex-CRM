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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['Particulier', 'Professionnel', 'Revendeur', 'Distributeur', 'Fournisseur'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Acheteur', 'Décideur', 'Comptable', 'SAV'] },
      { name: 'product', label: 'Produits', icon: 'Package', menu_order: 30, types: ['Produit', 'Service', 'Abonnement', 'Pack'] },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40, types: ['B2C', 'B2B', 'En ligne', 'Boutique'] },
      { name: 'order', label: 'Commandes', icon: 'ShoppingCart', menu_order: 50, types: ['B2C', 'B2B', 'En ligne', 'Boutique'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60, types: ['Standard', 'Avoir', 'B2B'] },
    ],
    customObjects: [
      { name: 'store', label: 'Magasin', label_plural: 'Magasins', icon: 'Store', menu_order: 70, types: ['Boutique', 'Entrepôt'] },
      { name: 'inventory', label: 'Stock', label_plural: 'Stocks', icon: 'Warehouse', menu_order: 80, types: ['Produit', 'Matière'] },
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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['PME', 'Grand compte', 'Secteur public', 'Partenaire'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Décideur', 'Prescripteur', 'Acheteur', 'RH', 'Technique'] },
      { name: 'lead', label: 'Prospects', icon: 'UserPlus', menu_order: 25, types: ['Inbound', 'Outbound', 'Partenaire'] },
      { name: 'opportunity', label: 'Opportunités', icon: 'Target', menu_order: 30, types: ['Régie', 'Forfait', 'Projet', 'Audit'] },
      { name: 'quote', label: 'Propositions', icon: 'FileText', menu_order: 40, types: ['AO', 'Proposition', 'SOW'] },
      { name: 'contract', label: 'Contrats', icon: 'FileCheck', menu_order: 50, types: ['Cadre', 'Mission', 'Maintenance'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60, types: ['Honoraires', 'Forfait', 'Récurrent'] },
    ],
    customObjects: [
      { name: 'mission', label: 'Mission', label_plural: 'Missions', icon: 'Briefcase', menu_order: 70, types: ['Audit', 'Conseil', 'Projet', 'Support'] },
      { name: 'consultant', label: 'Consultant', label_plural: 'Consultants', icon: 'UserCheck', menu_order: 80, types: ['Interne', 'Externe'] },
      { name: 'timesheet', label: 'Feuille de temps', label_plural: 'Feuilles de temps', icon: 'Clock', menu_order: 90, types: ['Hebdo', 'Mensuel'] },
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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['Particulier', 'Promoteur', 'Collectivité', 'Architecte', 'Entreprise'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['MOA', 'MOE', 'Conducteur', 'Chef de chantier'] },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 30, types: ['Devis', 'Avenant'] },
      { name: 'order', label: 'Commandes', icon: 'ClipboardList', menu_order: 40, types: ['Marché', 'Sous-traitance', 'Achat'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50, types: ['Situation', 'Solde', 'Avoir'] },
    ],
    customObjects: [
      { name: 'chantier', label: 'Chantier', label_plural: 'Chantiers', icon: 'Construction', menu_order: 60, types: ['Neuf', 'Rénovation', 'Maintenance'] },
      { name: 'intervention', label: 'Intervention', label_plural: 'Interventions', icon: 'Wrench', menu_order: 70, types: ['SAV', 'Urgence', 'Planifiée'] },
      { name: 'materiel', label: 'Matériel', label_plural: 'Matériels', icon: 'Truck', menu_order: 80, types: ['Engin', 'Outil', 'Véhicule'] },
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
      { name: 'account', label: 'Structures', icon: 'Building2', menu_order: 10, types: ['Cabinet', 'Clinique', 'Association', 'EHPAD', 'Hôpital'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Patient', 'Médecin', 'Infirmier', 'Famille', 'Administratif'] },
      { name: 'case', label: 'Dossiers', icon: 'FolderOpen', menu_order: 30, types: ['Suivi', 'Social', 'Médical'] },
      { name: 'invoice', label: 'Facturation', icon: 'Receipt', menu_order: 50, types: ['Patient', 'Tiers-payant', 'Mutuelle'] },
    ],
    customObjects: [
      { name: 'patient', label: 'Patient', label_plural: 'Patients', icon: 'UserHeart', menu_order: 25, types: ['Adulte', 'Enfant', 'Senior'] },
      { name: 'rdv', label: 'Rendez-vous', label_plural: 'Rendez-vous', icon: 'Calendar', menu_order: 35, types: ['Consultation', 'Suivi', 'Urgence'] },
      { name: 'prescription', label: 'Prescription', label_plural: 'Prescriptions', icon: 'Pill', menu_order: 40, types: ['Médicament', 'Soins', 'Examen'] },
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
      { name: 'contact', label: 'Clients', icon: 'Users', menu_order: 10, types: ['Client', 'Prospect', 'Abonné'] },
      { name: 'product', label: 'Prestations', icon: 'Sparkles', menu_order: 20, types: ['Prestation', 'Forfait', 'Abonnement'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 40, types: ['Unitaire', 'Abonnement'] },
    ],
    customObjects: [
      { name: 'rdv', label: 'Rendez-vous', label_plural: 'Rendez-vous', icon: 'Calendar', menu_order: 15, types: ['Unique', 'Récurrent'] },
      { name: 'fiche_client', label: 'Fiche client', label_plural: 'Fiches clients', icon: 'ClipboardList', menu_order: 25, types: ['Standard', 'VIP'] },
      { name: 'abonnement', label: 'Abonnement', label_plural: 'Abonnements', icon: 'CreditCard', menu_order: 30, types: ['Mensuel', 'Annuel'] },
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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['PME', 'Association', 'Indépendant'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Dirigeant', 'Comptable', 'RH', 'Juriste'] },
      { name: 'contract', label: 'Contrats', icon: 'FileCheck', menu_order: 30, types: ['Forfait', 'Récurrent', 'Ponctuel'] },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40, types: ['Forfait', 'Devis'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50, types: ['Honoraires', 'Abonnement'] },
    ],
    customObjects: [
      { name: 'dossier', label: 'Dossier', label_plural: 'Dossiers', icon: 'FolderOpen', menu_order: 25, types: ['Compta', 'Juridique', 'RH'] },
      { name: 'echeance', label: 'Échéance', label_plural: 'Échéances', icon: 'CalendarClock', menu_order: 35, types: ['Déclarative', 'Paiement'] },
      { name: 'document', label: 'Document', label_plural: 'Documents', icon: 'File', menu_order: 45, types: ['Contrat', 'Bilan', 'Bulletin'] },
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
      { name: 'contact', label: 'Clients', icon: 'Users', menu_order: 10, types: ['Individuel', 'Groupe', 'Entreprise', 'Tour-opérateur'] },
      { name: 'product', label: 'Menu/Services', icon: 'UtensilsCrossed', menu_order: 20, types: ['Chambre', 'Menu', 'Événement', 'Service'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 50, types: ['Séjour', 'Prestation', 'Groupe'] },
    ],
    customObjects: [
      { name: 'reservation', label: 'Réservation', label_plural: 'Réservations', icon: 'CalendarCheck', menu_order: 15, types: ['Chambre', 'Table', 'Événement'] },
      { name: 'chambre', label: 'Chambre', label_plural: 'Chambres', icon: 'Bed', menu_order: 25, types: ['Standard', 'Suite', 'Familiale'] },
      { name: 'table', label: 'Table', label_plural: 'Tables', icon: 'Armchair', menu_order: 30, types: ['2 places', '4 places', '6 places'] },
      { name: 'evenement', label: 'Événement', label_plural: 'Événements', icon: 'PartyPopper', menu_order: 35, types: ['Séminaire', 'Mariage', 'Anniversaire'] },
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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['Acheteur', 'Vendeur', 'Locataire', 'Investisseur', 'Bailleur'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Prospect', 'Mandant', 'Notaire', 'Artisan'] },
      { name: 'lead', label: 'Prospects', icon: 'UserPlus', menu_order: 25, types: ['Acheteur', 'Vendeur', 'Locataire'] },
      { name: 'contract', label: 'Mandats', icon: 'FileCheck', menu_order: 50, types: ['Vente', 'Location', 'Gestion'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60, types: ['Honoraires', 'Gestion'] },
    ],
    customObjects: [
      { name: 'bien', label: 'Bien', label_plural: 'Biens', icon: 'Home', menu_order: 30, types: ['Appartement', 'Maison', 'Terrain', 'Local'] },
      { name: 'visite', label: 'Visite', label_plural: 'Visites', icon: 'Eye', menu_order: 35, types: ['Simple', 'Contre-visite'] },
      { name: 'compromis', label: 'Compromis', label_plural: 'Compromis', icon: 'Handshake', menu_order: 40, types: ['Vente', 'Location'] },
      { name: 'copropriete', label: 'Copropriété', label_plural: 'Copropriétés', icon: 'Building', menu_order: 45, types: ['Syndic', 'ASL'] },
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
      { name: 'account', label: 'Clients', icon: 'Building2', menu_order: 10, types: ['OEM', 'Distributeur', 'Intégrateur', 'Maintenance'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Achats', 'Méthodes', 'Maintenance', 'Qualité'] },
      { name: 'product', label: 'Produits', icon: 'Package', menu_order: 30, types: ['Série', 'Sur-mesure', 'Pièce'] },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 40, types: ['Série', 'Sur-mesure', 'Prototype'] },
      { name: 'order', label: 'Commandes', icon: 'ClipboardList', menu_order: 50, types: ['Série', 'Prototype'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60, types: ['Produit', 'Service'] },
    ],
    customObjects: [
      { name: 'of', label: 'Ordre de fabrication', label_plural: 'Ordres de fabrication', icon: 'Factory', menu_order: 55, types: ['Série', 'Prototype', 'Rework'] },
      { name: 'machine', label: 'Machine', label_plural: 'Machines', icon: 'Cog', menu_order: 70, types: ['Production', 'Maintenance'] },
      { name: 'maintenance', label: 'Maintenance', label_plural: 'Maintenances', icon: 'Wrench', menu_order: 75, types: ['Préventive', 'Curative'] },
      { name: 'lot', label: 'Lot', label_plural: 'Lots', icon: 'Boxes', menu_order: 80, types: ['Matière', 'Produit fini'] },
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
      { name: 'account', label: 'Organismes', icon: 'Building2', menu_order: 10, types: ['École', 'Centre de formation', 'Université', 'Financeur', 'Entreprise cliente', 'Partenaire'] },
      { name: 'contact', label: 'Contacts', icon: 'Users', menu_order: 20, types: ['Apprenant', 'Parent/Tuteur', 'Formateur', 'Administratif', 'Financeur'] },
      { name: 'product', label: 'Formations', icon: 'BookOpen', menu_order: 30, types: ['Cursus', 'Module', 'Atelier', 'Coaching', 'Certification'] },
      { name: 'quote', label: 'Devis', icon: 'FileText', menu_order: 50, types: ['Entreprise', 'Individuel', 'Subvention', 'Alternance'] },
      { name: 'invoice', label: 'Factures', icon: 'Receipt', menu_order: 60, types: ['Apprenant', 'Entreprise', 'Financeur'] },
    ],
    customObjects: [
      { name: 'apprenant', label: 'Apprenant', label_plural: 'Apprenants', icon: 'UserGraduate', menu_order: 25, types: ['Initial', 'Alternance', 'Continue'] },
      { name: 'session', label: 'Session', label_plural: 'Sessions', icon: 'Calendar', menu_order: 35, types: ['Présentiel', 'Distanciel', 'Hybride'] },
      { name: 'formateur', label: 'Formateur', label_plural: 'Formateurs', icon: 'UserCheck', menu_order: 40, types: ['Interne', 'Externe'] },
      { name: 'evaluation', label: 'Évaluation', label_plural: 'Évaluations', icon: 'ClipboardCheck', menu_order: 45, types: ['Note', 'Compétence', 'Satisfaction'] },
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