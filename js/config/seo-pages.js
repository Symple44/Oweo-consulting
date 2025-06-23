// ========================================
// js/config/seo-pages.js - Configurations SEO spécifiques par page
// ========================================

window.SEOPagesConfig = {
    // Page d'accueil
    home: {
        title: 'Oweo - Expert ERP Charpente Métallique | Solutions Digitales Nantes',
        description: 'Expert ERP pour l\'industrie métallique. Solutions de chiffrage automatisé, interface DSTV, gestion production. Accompagnement digital complet à Nantes. Devis gratuit.',
        keywords: [
            'ERP métallique', 'charpente métallique', 'logiciel métallurgie',
            'chiffrage automatisé', 'DSTV', 'Tekla integration', 'industrie 4.0',
            'transformation digitale', 'consultant ERP', 'Nantes', 'Loire-Atlantique',
            'OWEO', 'gestion production métallique', 'devis automatisé',
            'logiciel sur mesure', 'développement ERP', 'système information'
        ],
        type: 'website',
        image: '/assets/images/og-home.jpg',
        imageAlt: 'Oweo - Solutions ERP pour l\'industrie métallique',
        priority: '1.0',
        changefreq: 'weekly',
        structuredData: {
            type: 'organization'
        }
    },
    
    // Page services
    services: {
        title: 'Services ERP Métallique | Conseil & Développement Sur Mesure | Oweo',
        description: 'Services complets ERP métallique : diagnostic gratuit, conseil stratégique, développement sur mesure, formation. Solutions Tekla, DSTV, chiffrage automatisé.',
        keywords: [
            'services ERP métallique', 'conseil ERP', 'développement sur mesure',
            'diagnostic digital gratuit', 'formation ERP', 'support technique',
            'intégration Tekla', 'interface DSTV', 'automatisation chiffrage',
            'consultant métallurgie', 'transformation digitale industrie',
            'accompagnement changement', 'optimisation processus'
        ],
        type: 'service',
        image: '/assets/images/og-services.jpg',
        imageAlt: 'Services ERP pour l\'industrie métallique par Oweo',
        priority: '0.9',
        changefreq: 'monthly',
        structuredData: {
            type: 'service',
            serviceType: 'ERP Consulting',
            category: 'Software Development & Consulting'
        }
    },
    
    // Page démos
    demos: {
        title: 'Démonstrations ERP Métallique | Chiffrage & DSTV | Oweo',
        description: 'Découvrez nos solutions ERP métallique en action : outil de chiffrage automatisé, interface DSTV, gestion production. Demandez votre démonstration personnalisée.',
        keywords: [
            'démo ERP métallique', 'démonstration logiciel', 'chiffrage automatisé',
            'interface DSTV démo', 'gestion production métallique',
            'test logiciel ERP', 'essai gratuit', 'présentation solution',
            'POC métallurgie', 'prototype ERP', 'validation concept'
        ],
        type: 'software',
        image: '/assets/images/og-demos.jpg',
        imageAlt: 'Démonstrations des solutions ERP métallique Oweo',
        priority: '0.8',
        changefreq: 'weekly',
        structuredData: {
            type: 'software',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser'
        }
    },
    
    // Page contact
    contact: {
        title: 'Contact Oweo | Expert ERP Métallique Nantes | Devis Gratuit',
        description: 'Contactez Oweo pour votre projet ERP métallique. Diagnostic gratuit, devis personnalisé, accompagnement complet. Nantes, Loire-Atlantique. Réponse rapide.',
        keywords: [
            'contact ERP métallique', 'devis gratuit', 'diagnostic digital',
            'consultant Nantes', 'expert métallurgie', 'projet ERP',
            'rdv conseil', 'étude personnalisée', 'accompagnement projet',
            'support client', 'service après-vente'
        ],
        type: 'contact',
        image: '/assets/images/og-contact.jpg',
        imageAlt: 'Contactez Oweo pour vos projets ERP métallique',
        priority: '0.7',
        changefreq: 'monthly',
        structuredData: {
            type: 'contact'
        }
    },
    
    // Démo chiffrage
    'chiffrage-demo': {
        title: 'Démo Chiffrage Automatisé | ERP Métallique | Oweo',
        description: 'Découvrez notre outil de chiffrage automatisé pour la charpente métallique. Calcul instantané, base matériaux, export PDF. Gain de temps et précision garantis.',
        keywords: [
            'chiffrage automatisé', 'outil devis métallique', 'calcul charpente',
            'base prix matériaux', 'métrage automatique', 'export PDF devis',
            'logiciel chiffrage', 'estimation automatique', 'pricing tool',
            'cost calculation', 'automated quotation'
        ],
        type: 'software',
        image: '/assets/images/og-chiffrage-demo.jpg',
        imageAlt: 'Outil de chiffrage automatisé pour la métallurgie',
        priority: '0.8',
        changefreq: 'weekly',
        robots: 'index, follow',
        structuredData: {
            type: 'software',
            name: 'Outil de Chiffrage Automatisé',
            applicationCategory: 'BusinessApplication',
            description: 'Logiciel de chiffrage automatisé pour la charpente métallique'
        }
    },
    
    // Démo DSTV
    'dstv-demo': {
        title: 'Démo Interface DSTV | CNC Métallique | Oweo',
        description: 'Interface DSTV pour machines CNC métalliques. Import/export fichiers, validation automatique, optimisation production. Compatible toutes machines.',
        keywords: [
            'interface DSTV', 'CNC métallique', 'fichier DSTV', 'machines CNC',
            'import export DSTV', 'validation automatique', 'optimisation CNC',
            'production automatisée', 'usinage métallique', 'CAM interface'
        ],
        type: 'software',
        image: '/assets/images/og-dstv-demo.jpg',
        imageAlt: 'Interface DSTV pour machines CNC métalliques',
        priority: '0.8',
        changefreq: 'weekly',
        structuredData: {
            type: 'software',
            name: 'Interface DSTV',
            applicationCategory: 'BusinessApplication',
            description: 'Interface DSTV pour machines CNC de métallurgie'
        }
    },
    
    // Pages légales
    cgv: {
        title: 'CGV - Conditions Générales de Vente | Oweo',
        description: 'Conditions Générales de Vente d\'Oweo pour les prestations de services informatiques et solutions ERP métallique.',
        keywords: ['CGV', 'conditions générales vente', 'prestations services', 'ERP métallique'],
        type: 'article',
        priority: '0.3',
        changefreq: 'yearly',
        robots: 'index, nofollow'
    },
    
    legal: {
        title: 'Mentions Légales | Oweo',
        description: 'Mentions légales du site Oweo, expert en solutions ERP pour l\'industrie métallique.',
        keywords: ['mentions légales', 'informations légales', 'éditeur site'],
        type: 'article',
        priority: '0.3',
        changefreq: 'yearly',
        robots: 'index, nofollow'
    },
    
    privacy: {
        title: 'Politique de Confidentialité | Protection Données | Oweo',
        description: 'Politique de confidentialité et protection des données personnelles - Oweo, conforme RGPD.',
        keywords: ['politique confidentialité', 'protection données', 'RGPD', 'vie privée'],
        type: 'article',
        priority: '0.3',
        changefreq: 'yearly',
        robots: 'index, nofollow'
    },
    
    terms: {
        title: 'Conditions Générales d\'Utilisation | CGU | Oweo',
        description: 'Conditions Générales d\'Utilisation du site Oweo, expert ERP métallique.',
        keywords: ['CGU', 'conditions utilisation', 'règles site web'],
        type: 'article',
        priority: '0.3',
        changefreq: 'yearly',
        robots: 'index, nofollow'
    },
    
    cookies: {
        title: 'Politique des Cookies | Gestion Cookies | Oweo',
        description: 'Politique des cookies et gestion des préférences de cookies sur le site Oweo.',
        keywords: ['politique cookies', 'gestion cookies', 'préférences cookies'],
        type: 'article',
        priority: '0.3',
        changefreq: 'yearly',
        robots: 'index, nofollow'
    }
};

// Configuration SEO locale pour Nantes et région
window.LocalSEOConfig = {
    business: {
        name: 'Oweo',
        type: 'TechnologyCompany',
        address: {
            streetAddress: '10 rue du Sous-Bois',
            addressLocality: 'Orvault',
            addressRegion: 'Pays de la Loire',
            postalCode: '44700',
            addressCountry: 'FR'
        },
        geo: {
            latitude: 47.2569,
            longitude: -1.6233
        },
        serviceArea: [
            'Nantes', 'Orvault', 'Saint-Nazaire', 'Rezé', 'Saint-Sébastien-sur-Loire',
            'Vertou', 'Carquefou', 'Bouguenais', 'La Chapelle-sur-Erdre',
            'Loire-Atlantique', 'Pays de la Loire', 'Bretagne', 'France'
        ],
        keywords: [
            'ERP métallique Nantes', 'logiciel métallurgie Loire-Atlantique',
            'chiffrage automatisé Nantes', 'consultant ERP Pays de la Loire',
            'développeur sur mesure Nantes', 'transformation digitale industrie Nantes',
            'DSTV interface Nantes', 'Tekla consultant Nantes'
        ]
    }
};

// Mots-clés sectoriels pour le SEO
window.IndustrySEOKeywords = {
    primary: [
        'ERP métallique', 'logiciel métallurgie', 'charpente métallique',
        'système information industrie', 'digitalisation métallurgie',
        'transformation digitale industrie', 'industrie 4.0 métallique'
    ],
    secondary: [
        'chiffrage automatisé', 'interface DSTV', 'Tekla integration',
        'gestion production métallique', 'optimisation processus',
        'automatisation métallurgie', 'planning production'
    ],
    longtail: [
        'logiciel de chiffrage pour charpente métallique',
        'système ERP spécialisé métallurgie industrie',
        'automatisation des devis en métallerie',
        'interface DSTV pour machines CNC métalliques',
        'développement sur mesure ERP métallique',
        'consultant transformation digitale industrie métallique',
        'intégration Tekla dans système ERP',
        'optimisation processus production métallique'
    ],
    competitors: [
        'alternative SAP métallurgie', 'concurrent SAGE métallique',
        'solution ERP métallique française', 'logiciel français métallurgie'
    ],
    regional: [
        'ERP métallique Nantes', 'logiciel métallurgie Loire-Atlantique',
        'consultant ERP Pays de la Loire', 'développeur Nantes industrie',
        'transformation digitale Nantes', 'expert métallurgie Nantes'
    ]
};

// Configuration des rich snippets par page
window.RichSnippetsConfig = {
    home: {
        organization: true,
        website: true,
        breadcrumb: false
    },
    services: {
        service: true,
        breadcrumb: true,
        faq: false // Ajouter si on a une FAQ
    },
    demos: {
        software: true,
        breadcrumb: true,
        video: false // Ajouter si on a des vidéos
    },
    contact: {
        organization: true,
        breadcrumb: true,
        localBusiness: true
    }
};