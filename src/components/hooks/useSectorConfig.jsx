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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['Particulier', 'Professionnel', 'Revendeur', 'Distributeur', 'Fournisseur'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Particulier', 'Professionnel', 'Revendeur', 'Distributeur', 'Fournisseur'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'address', label: 'Adresse', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Actif', 'Inactif'] }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Acheteur', 'Décideur', 'Comptable', 'SAV'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Acheteur', 'Décideur', 'Comptable', 'SAV'] },
          { name: 'email', label: 'Email', field_type: 'text', required: true },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'product',
        label: 'Produits',
        icon: 'Package',
        menu_order: 30,
        types: ['Produit', 'Service', 'Abonnement', 'Pack'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Produit', 'Service', 'Abonnement', 'Pack'] },
          { name: 'sku', label: 'SKU', field_type: 'text' },
          { name: 'price', label: 'Prix', field_type: 'number' },
          { name: 'category', label: 'Catégorie', field_type: 'text' }
        ]
      },
      {
        name: 'quote',
        label: 'Devis',
        icon: 'FileText',
        menu_order: 40,
        types: ['B2C', 'B2B', 'En ligne', 'Boutique'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['B2C', 'B2B', 'En ligne', 'Boutique'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyé', 'Accepté', 'Refusé'] }
        ]
      },
      {
        name: 'order',
        label: 'Commandes',
        icon: 'ShoppingCart',
        menu_order: 50,
        types: ['B2C', 'B2B', 'En ligne', 'Boutique'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['B2C', 'B2B', 'En ligne', 'Boutique'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['En préparation', 'Expédiée', 'Livrée', 'Annulée'] }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 60,
        types: ['Standard', 'Avoir', 'B2B'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Standard', 'Avoir', 'B2B'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'due_date', label: 'Échéance', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'store',
        label: 'Magasin',
        label_plural: 'Magasins',
        icon: 'Store',
        menu_order: 70,
        types: ['Boutique', 'Entrepôt'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Boutique', 'Entrepôt'] },
          { name: 'address', label: 'Adresse', field_type: 'text' },
          { name: 'manager', label: 'Responsable', field_type: 'text' }
        ]
      },
      {
        name: 'inventory',
        label: 'Stock',
        label_plural: 'Stocks',
        icon: 'Warehouse',
        menu_order: 80,
        types: ['Produit', 'Matière'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Produit', 'Matière'] },
          { name: 'quantity', label: 'Quantité', field_type: 'number' },
          { name: 'min_stock', label: 'Stock minimum', field_type: 'number' }
        ]
      },
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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['PME', 'Grand compte', 'Secteur public', 'Partenaire'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['PME', 'Grand compte', 'Secteur public', 'Partenaire'] },
          { name: 'industry', label: 'Secteur', field_type: 'text' },
          { name: 'effectif', label: 'Effectif', field_type: 'number' },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Décideur', 'Prescripteur', 'Acheteur', 'RH', 'Technique'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Décideur', 'Prescripteur', 'Acheteur', 'RH', 'Technique'] },
          { name: 'email', label: 'Email', field_type: 'text', required: true },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'lead',
        label: 'Prospects',
        icon: 'UserPlus',
        menu_order: 25,
        types: ['Inbound', 'Outbound', 'Partenaire'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Inbound', 'Outbound', 'Partenaire'] },
          { name: 'source', label: 'Source', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Nouveau', 'En cours', 'Qualifié', 'Perdu'] }
        ]
      },
      {
        name: 'opportunity',
        label: 'Opportunités',
        icon: 'Target',
        menu_order: 30,
        types: ['Régie', 'Forfait', 'Projet', 'Audit'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Régie', 'Forfait', 'Projet', 'Audit'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'stage', label: 'Étape', field_type: 'select', options: ['Prospection', 'Proposition', 'Négociation', 'Gagnée', 'Perdue'] }
        ]
      },
      {
        name: 'quote',
        label: 'Propositions',
        icon: 'FileText',
        menu_order: 40,
        types: ['AO', 'Proposition', 'SOW'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['AO', 'Proposition', 'SOW'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'valid_until', label: 'Valide jusqu\'au', field_type: 'date' }
        ]
      },
      {
        name: 'contract',
        label: 'Contrats',
        icon: 'FileCheck',
        menu_order: 50,
        types: ['Cadre', 'Mission', 'Maintenance'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Cadre', 'Mission', 'Maintenance'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' },
          { name: 'value', label: 'Valeur', field_type: 'number' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 60,
        types: ['Honoraires', 'Forfait', 'Récurrent'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Honoraires', 'Forfait', 'Récurrent'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'due_date', label: 'Échéance', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'mission',
        label: 'Mission',
        label_plural: 'Missions',
        icon: 'Briefcase',
        menu_order: 70,
        types: ['Audit', 'Conseil', 'Projet', 'Support'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Audit', 'Conseil', 'Projet', 'Support'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'En cours', 'Terminée'] }
        ]
      },
      {
        name: 'consultant',
        label: 'Consultant',
        label_plural: 'Consultants',
        icon: 'UserCheck',
        menu_order: 80,
        types: ['Interne', 'Externe'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Interne', 'Externe'] },
          { name: 'rate', label: 'Taux journalier', field_type: 'number' },
          { name: 'availability', label: 'Disponible', field_type: 'checkbox', default_value: true }
        ]
      },
      {
        name: 'timesheet',
        label: 'Feuille de temps',
        label_plural: 'Feuilles de temps',
        icon: 'Clock',
        menu_order: 90,
        types: ['Hebdo', 'Mensuel'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Hebdo', 'Mensuel'] },
          { name: 'period_start', label: 'Début période', field_type: 'date' },
          { name: 'hours', label: 'Heures', field_type: 'number' }
        ]
      },
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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['Particulier', 'Promoteur', 'Collectivité', 'Architecte', 'Entreprise'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Particulier', 'Promoteur', 'Collectivité', 'Architecte', 'Entreprise'] },
          { name: 'siret', label: 'SIRET', field_type: 'text' },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'address', label: 'Adresse', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['MOA', 'MOE', 'Conducteur', 'Chef de chantier'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['MOA', 'MOE', 'Conducteur', 'Chef de chantier'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'quote',
        label: 'Devis',
        icon: 'FileText',
        menu_order: 30,
        types: ['Devis', 'Avenant'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Devis', 'Avenant'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'site_address', label: 'Adresse chantier', field_type: 'text' }
        ]
      },
      {
        name: 'order',
        label: 'Commandes',
        icon: 'ClipboardList',
        menu_order: 40,
        types: ['Marché', 'Sous-traitance', 'Achat'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Marché', 'Sous-traitance', 'Achat'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'En cours', 'Terminée'] }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 50,
        types: ['Situation', 'Solde', 'Avoir'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Situation', 'Solde', 'Avoir'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'chantier',
        label: 'Chantier',
        label_plural: 'Chantiers',
        icon: 'Construction',
        menu_order: 60,
        types: ['Neuf', 'Rénovation', 'Maintenance'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Neuf', 'Rénovation', 'Maintenance'] },
          { name: 'address', label: 'Adresse', field_type: 'text' },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifié', 'En cours', 'Livré'] }
        ]
      },
      {
        name: 'intervention',
        label: 'Intervention',
        label_plural: 'Interventions',
        icon: 'Wrench',
        menu_order: 70,
        types: ['SAV', 'Urgence', 'Planifiée'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['SAV', 'Urgence', 'Planifiée'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'En cours', 'Terminée'] }
        ]
      },
      {
        name: 'materiel',
        label: 'Matériel',
        label_plural: 'Matériels',
        icon: 'Truck',
        menu_order: 80,
        types: ['Engin', 'Outil', 'Véhicule'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Engin', 'Outil', 'Véhicule'] },
          { name: 'serial', label: 'Numéro de série', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Disponible', 'En service', 'Maintenance'] }
        ]
      },
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
      {
        name: 'account',
        label: 'Structures',
        icon: 'Building2',
        menu_order: 10,
        types: ['Cabinet', 'Clinique', 'Association', 'EHPAD', 'Hôpital'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Cabinet', 'Clinique', 'Association', 'EHPAD', 'Hôpital'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'address', label: 'Adresse', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Patient', 'Médecin', 'Infirmier', 'Famille', 'Administratif'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Patient', 'Médecin', 'Infirmier', 'Famille', 'Administratif'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'case',
        label: 'Dossiers',
        icon: 'FolderOpen',
        menu_order: 30,
        types: ['Suivi', 'Social', 'Médical'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Suivi', 'Social', 'Médical'] },
          { name: 'opened_date', label: 'Date d\'ouverture', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Ouvert', 'En cours', 'Clos'] }
        ]
      },
      {
        name: 'invoice',
        label: 'Facturation',
        icon: 'Receipt',
        menu_order: 50,
        types: ['Patient', 'Tiers-payant', 'Mutuelle'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Patient', 'Tiers-payant', 'Mutuelle'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'patient',
        label: 'Patient',
        label_plural: 'Patients',
        icon: 'UserHeart',
        menu_order: 25,
        types: ['Adulte', 'Enfant', 'Senior'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Adulte', 'Enfant', 'Senior'] },
          { name: 'birthdate', label: 'Date de naissance', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Actif', 'Inactif'] }
        ]
      },
      {
        name: 'rdv',
        label: 'Rendez-vous',
        label_plural: 'Rendez-vous',
        icon: 'Calendar',
        menu_order: 35,
        types: ['Consultation', 'Suivi', 'Urgence'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Consultation', 'Suivi', 'Urgence'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifié', 'Réalisé', 'Annulé'] }
        ]
      },
      {
        name: 'prescription',
        label: 'Prescription',
        label_plural: 'Prescriptions',
        icon: 'Pill',
        menu_order: 40,
        types: ['Médicament', 'Soins', 'Examen'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Médicament', 'Soins', 'Examen'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'notes', label: 'Notes', field_type: 'text' }
        ]
      },
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
      {
        name: 'contact',
        label: 'Clients',
        icon: 'Users',
        menu_order: 10,
        types: ['Client', 'Prospect', 'Abonné'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Client', 'Prospect', 'Abonné'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'product',
        label: 'Prestations',
        icon: 'Sparkles',
        menu_order: 20,
        types: ['Prestation', 'Forfait', 'Abonnement'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Prestation', 'Forfait', 'Abonnement'] },
          { name: 'duration', label: 'Durée (min)', field_type: 'number' },
          { name: 'price', label: 'Prix', field_type: 'number' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 40,
        types: ['Unitaire', 'Abonnement'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Unitaire', 'Abonnement'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'rdv',
        label: 'Rendez-vous',
        label_plural: 'Rendez-vous',
        icon: 'Calendar',
        menu_order: 15,
        types: ['Unique', 'Récurrent'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Unique', 'Récurrent'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifié', 'Réalisé', 'Annulé'] }
        ]
      },
      {
        name: 'fiche_client',
        label: 'Fiche client',
        label_plural: 'Fiches clients',
        icon: 'ClipboardList',
        menu_order: 25,
        types: ['Standard', 'VIP'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Standard', 'VIP'] },
          { name: 'preferences', label: 'Préférences', field_type: 'text' },
          { name: 'notes', label: 'Notes', field_type: 'text' }
        ]
      },
      {
        name: 'abonnement',
        label: 'Abonnement',
        label_plural: 'Abonnements',
        icon: 'CreditCard',
        menu_order: 30,
        types: ['Mensuel', 'Annuel'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Mensuel', 'Annuel'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Actif', 'Suspendu', 'Résilié'] }
        ]
      },
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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['PME', 'Association', 'Indépendant'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['PME', 'Association', 'Indépendant'] },
          { name: 'siret', label: 'SIRET', field_type: 'text' },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Dirigeant', 'Comptable', 'RH', 'Juriste'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Dirigeant', 'Comptable', 'RH', 'Juriste'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'contract',
        label: 'Contrats',
        icon: 'FileCheck',
        menu_order: 30,
        types: ['Forfait', 'Récurrent', 'Ponctuel'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Forfait', 'Récurrent', 'Ponctuel'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' }
        ]
      },
      {
        name: 'quote',
        label: 'Devis',
        icon: 'FileText',
        menu_order: 40,
        types: ['Forfait', 'Devis'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Forfait', 'Devis'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'valid_until', label: 'Valide jusqu\'au', field_type: 'date' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 50,
        types: ['Honoraires', 'Abonnement'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Honoraires', 'Abonnement'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'dossier',
        label: 'Dossier',
        label_plural: 'Dossiers',
        icon: 'FolderOpen',
        menu_order: 25,
        types: ['Compta', 'Juridique', 'RH'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Compta', 'Juridique', 'RH'] },
          { name: 'reference', label: 'Référence', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Ouvert', 'En cours', 'Clos'] }
        ]
      },
      {
        name: 'echeance',
        label: 'Échéance',
        label_plural: 'Échéances',
        icon: 'CalendarClock',
        menu_order: 35,
        types: ['Déclarative', 'Paiement'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Déclarative', 'Paiement'] },
          { name: 'due_date', label: 'Échéance', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['À faire', 'Fait', 'En retard'] }
        ]
      },
      {
        name: 'document',
        label: 'Document',
        label_plural: 'Documents',
        icon: 'File',
        menu_order: 45,
        types: ['Contrat', 'Bilan', 'Bulletin'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Contrat', 'Bilan', 'Bulletin'] },
          { name: 'reference', label: 'Référence', field_type: 'text' },
          { name: 'date', label: 'Date', field_type: 'date' }
        ]
      },
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
      {
        name: 'contact',
        label: 'Clients',
        icon: 'Users',
        menu_order: 10,
        types: ['Individuel', 'Groupe', 'Entreprise', 'Tour-opérateur'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Individuel', 'Groupe', 'Entreprise', 'Tour-opérateur'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'product',
        label: 'Menu/Services',
        icon: 'UtensilsCrossed',
        menu_order: 20,
        types: ['Chambre', 'Menu', 'Événement', 'Service'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Chambre', 'Menu', 'Événement', 'Service'] },
          { name: 'price', label: 'Prix', field_type: 'number' },
          { name: 'duration', label: 'Durée', field_type: 'text' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 50,
        types: ['Séjour', 'Prestation', 'Groupe'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Séjour', 'Prestation', 'Groupe'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'reservation',
        label: 'Réservation',
        label_plural: 'Réservations',
        icon: 'CalendarCheck',
        menu_order: 15,
        types: ['Chambre', 'Table', 'Événement'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Chambre', 'Table', 'Événement'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Confirmée', 'En attente', 'Annulée'] }
        ]
      },
      {
        name: 'chambre',
        label: 'Chambre',
        label_plural: 'Chambres',
        icon: 'Bed',
        menu_order: 25,
        types: ['Standard', 'Suite', 'Familiale'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Standard', 'Suite', 'Familiale'] },
          { name: 'number', label: 'Numéro', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Disponible', 'Occupée', 'Maintenance'] }
        ]
      },
      {
        name: 'table',
        label: 'Table',
        label_plural: 'Tables',
        icon: 'Armchair',
        menu_order: 30,
        types: ['2 places', '4 places', '6 places'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['2 places', '4 places', '6 places'] },
          { name: 'number', label: 'Numéro', field_type: 'text' },
          { name: 'seats', label: 'Places', field_type: 'number' }
        ]
      },
      {
        name: 'evenement',
        label: 'Événement',
        label_plural: 'Événements',
        icon: 'PartyPopper',
        menu_order: 35,
        types: ['Séminaire', 'Mariage', 'Anniversaire'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Séminaire', 'Mariage', 'Anniversaire'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Prévu', 'Confirmé', 'Réalisé'] }
        ]
      },
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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['Acheteur', 'Vendeur', 'Locataire', 'Investisseur', 'Bailleur'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Acheteur', 'Vendeur', 'Locataire', 'Investisseur', 'Bailleur'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Prospect', 'Mandant', 'Notaire', 'Artisan'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Prospect', 'Mandant', 'Notaire', 'Artisan'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'lead',
        label: 'Prospects',
        icon: 'UserPlus',
        menu_order: 25,
        types: ['Acheteur', 'Vendeur', 'Locataire'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Acheteur', 'Vendeur', 'Locataire'] },
          { name: 'source', label: 'Source', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Nouveau', 'Qualifié', 'Perdu'] }
        ]
      },
      {
        name: 'contract',
        label: 'Mandats',
        icon: 'FileCheck',
        menu_order: 50,
        types: ['Vente', 'Location', 'Gestion'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Vente', 'Location', 'Gestion'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 60,
        types: ['Honoraires', 'Gestion'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Honoraires', 'Gestion'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'bien',
        label: 'Bien',
        label_plural: 'Biens',
        icon: 'Home',
        menu_order: 30,
        types: ['Appartement', 'Maison', 'Terrain', 'Local'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Appartement', 'Maison', 'Terrain', 'Local'] },
          { name: 'surface', label: 'Surface', field_type: 'number' },
          { name: 'price', label: 'Prix', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Disponible', 'Sous offre', 'Vendu'] }
        ]
      },
      {
        name: 'visite',
        label: 'Visite',
        label_plural: 'Visites',
        icon: 'Eye',
        menu_order: 35,
        types: ['Simple', 'Contre-visite'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Simple', 'Contre-visite'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'Effectuée', 'Annulée'] }
        ]
      },
      {
        name: 'compromis',
        label: 'Compromis',
        label_plural: 'Compromis',
        icon: 'Handshake',
        menu_order: 40,
        types: ['Vente', 'Location'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Vente', 'Location'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Signé', 'En attente', 'Annulé'] }
        ]
      },
      {
        name: 'copropriete',
        label: 'Copropriété',
        label_plural: 'Copropriétés',
        icon: 'Building',
        menu_order: 45,
        types: ['Syndic', 'ASL'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Syndic', 'ASL'] },
          { name: 'address', label: 'Adresse', field_type: 'text' },
          { name: 'lots', label: 'Lots', field_type: 'number' }
        ]
      },
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
      {
        name: 'account',
        label: 'Clients',
        icon: 'Building2',
        menu_order: 10,
        types: ['OEM', 'Distributeur', 'Intégrateur', 'Maintenance'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['OEM', 'Distributeur', 'Intégrateur', 'Maintenance'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Achats', 'Méthodes', 'Maintenance', 'Qualité'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Achats', 'Méthodes', 'Maintenance', 'Qualité'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' }
        ]
      },
      {
        name: 'product',
        label: 'Produits',
        icon: 'Package',
        menu_order: 30,
        types: ['Série', 'Sur-mesure', 'Pièce'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Série', 'Sur-mesure', 'Pièce'] },
          { name: 'sku', label: 'SKU', field_type: 'text' },
          { name: 'price', label: 'Prix', field_type: 'number' }
        ]
      },
      {
        name: 'quote',
        label: 'Devis',
        icon: 'FileText',
        menu_order: 40,
        types: ['Série', 'Sur-mesure', 'Prototype'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Série', 'Sur-mesure', 'Prototype'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'valid_until', label: 'Valide jusqu\'au', field_type: 'date' }
        ]
      },
      {
        name: 'order',
        label: 'Commandes',
        icon: 'ClipboardList',
        menu_order: 50,
        types: ['Série', 'Prototype'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Série', 'Prototype'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'due_date', label: 'Échéance', field_type: 'date' }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 60,
        types: ['Produit', 'Service'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Produit', 'Service'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'of',
        label: 'Ordre de fabrication',
        label_plural: 'Ordres de fabrication',
        icon: 'Factory',
        menu_order: 55,
        types: ['Série', 'Prototype', 'Rework'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Série', 'Prototype', 'Rework'] },
          { name: 'quantity', label: 'Quantité', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifié', 'En cours', 'Terminé'] }
        ]
      },
      {
        name: 'machine',
        label: 'Machine',
        label_plural: 'Machines',
        icon: 'Cog',
        menu_order: 70,
        types: ['Production', 'Maintenance'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Production', 'Maintenance'] },
          { name: 'serial', label: 'Numéro de série', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Disponible', 'En service', 'Maintenance'] }
        ]
      },
      {
        name: 'maintenance',
        label: 'Maintenance',
        label_plural: 'Maintenances',
        icon: 'Wrench',
        menu_order: 75,
        types: ['Préventive', 'Curative'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Préventive', 'Curative'] },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'En cours', 'Terminée'] }
        ]
      },
      {
        name: 'lot',
        label: 'Lot',
        label_plural: 'Lots',
        icon: 'Boxes',
        menu_order: 80,
        types: ['Matière', 'Produit fini'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Matière', 'Produit fini'] },
          { name: 'quantity', label: 'Quantité', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['En stock', 'Consommé'] }
        ]
      },
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
      {
        name: 'account',
        label: 'Organismes',
        icon: 'Building2',
        menu_order: 10,
        types: ['École', 'Centre de formation', 'Université', 'Financeur', 'Entreprise cliente', 'Partenaire'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['École', 'Centre de formation', 'Université', 'Financeur', 'Entreprise cliente', 'Partenaire'] },
          { name: 'uai', label: 'UAI', field_type: 'text' },
          { name: 'siret', label: 'SIRET', field_type: 'text' },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'address', label: 'Adresse', field_type: 'text' },
          { name: 'is_active', label: 'Actif', field_type: 'checkbox', default_value: true }
        ]
      },
      {
        name: 'contact',
        label: 'Contacts',
        icon: 'Users',
        menu_order: 20,
        types: ['Apprenant', 'Parent/Tuteur', 'Formateur', 'Administratif', 'Financeur'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Apprenant', 'Parent/Tuteur', 'Formateur', 'Administratif', 'Financeur'] },
          { name: 'email', label: 'Email', field_type: 'text', required: true },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'fonction', label: 'Fonction', field_type: 'text' }
        ]
      },
      {
        name: 'product',
        label: 'Formations',
        icon: 'BookOpen',
        menu_order: 30,
        types: ['Cursus', 'Module', 'Atelier', 'Coaching', 'Certification'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Cursus', 'Module', 'Atelier', 'Coaching', 'Certification'] },
          { name: 'code', label: 'Code', field_type: 'text' },
          { name: 'duration_hours', label: 'Durée (heures)', field_type: 'number' },
          { name: 'modality', label: 'Modalité', field_type: 'select', options: ['Présentiel', 'Distanciel', 'Hybride'] },
          { name: 'price', label: 'Prix', field_type: 'number' }
        ]
      },
      {
        name: 'quote',
        label: 'Devis',
        icon: 'FileText',
        menu_order: 50,
        types: ['Entreprise', 'Individuel', 'Subvention', 'Alternance'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Entreprise', 'Individuel', 'Subvention', 'Alternance'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'valid_until', label: 'Valide jusqu\'au', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyé', 'Accepté', 'Refusé'] }
        ]
      },
      {
        name: 'invoice',
        label: 'Factures',
        icon: 'Receipt',
        menu_order: 60,
        types: ['Apprenant', 'Entreprise', 'Financeur'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Apprenant', 'Entreprise', 'Financeur'] },
          { name: 'amount', label: 'Montant', field_type: 'number' },
          { name: 'due_date', label: 'Échéance', field_type: 'date' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Brouillon', 'Envoyée', 'Payée', 'En retard'] }
        ]
      },
    ],
    customObjects: [
      {
        name: 'apprenant',
        label: 'Apprenant',
        label_plural: 'Apprenants',
        icon: 'UserGraduate',
        menu_order: 25,
        types: ['Initial', 'Alternance', 'Continue'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Initial', 'Alternance', 'Continue'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Pré-inscrit', 'Actif', 'Terminé'] },
          { name: 'birthdate', label: 'Date de naissance', field_type: 'date' }
        ]
      },
      {
        name: 'session',
        label: 'Session',
        label_plural: 'Sessions',
        icon: 'Calendar',
        menu_order: 35,
        types: ['Présentiel', 'Distanciel', 'Hybride'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Présentiel', 'Distanciel', 'Hybride'] },
          { name: 'start_date', label: 'Début', field_type: 'date' },
          { name: 'end_date', label: 'Fin', field_type: 'date' },
          { name: 'location', label: 'Lieu', field_type: 'text' },
          { name: 'capacity', label: 'Capacité', field_type: 'number' },
          { name: 'status', label: 'Statut', field_type: 'select', options: ['Planifiée', 'En cours', 'Terminée'] }
        ]
      },
      {
        name: 'formateur',
        label: 'Formateur',
        label_plural: 'Formateurs',
        icon: 'UserCheck',
        menu_order: 40,
        types: ['Interne', 'Externe'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Interne', 'Externe'] },
          { name: 'email', label: 'Email', field_type: 'text' },
          { name: 'phone', label: 'Téléphone', field_type: 'text' },
          { name: 'expertise', label: 'Expertise', field_type: 'text' }
        ]
      },
      {
        name: 'evaluation',
        label: 'Évaluation',
        label_plural: 'Évaluations',
        icon: 'ClipboardCheck',
        menu_order: 45,
        types: ['Note', 'Compétence', 'Satisfaction'],
        fields: [
          { name: 'type', label: 'Type', field_type: 'select', required: true, options: ['Note', 'Compétence', 'Satisfaction'] },
          { name: 'score', label: 'Score', field_type: 'number' },
          { name: 'date', label: 'Date', field_type: 'date' },
          { name: 'comment', label: 'Commentaire', field_type: 'text' }
        ]
      },
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