// ========================================
// js/config/seo-pages.js - Configurations SEO spécifiques par page
// ========================================

window.SEOPagesConfig = {
    // Page d'accueil
    home: {
        title: 'Oweo - Développement & Conseil pour la Charpente Métallique | Nantes',
        description: 'Oweo développe des outils métier pour l\'industrie de la charpente métallique : configurateur 3D, imbrication, DSTV, IFC, estimation production, BI. Conseil et accompagnement.',
        keywords: [
            'développement sur mesure', 'conseil digital', 'transformation numérique',
            'projet informatique', 'logiciel métier', 'ERP sur mesure',
            'accompagnement digital', 'consultant IT', 'Nantes', 'Loire-Atlantique',
            'OWEO', 'application métier', 'solution logicielle',
            'conseil stratégique', 'développement logiciel', 'système information'
        ],
        type: 'website',
        image: '/assets/images/og-image.png',
        imageAlt: 'Oweo - Conseil et Développement Sur Mesure',
        priority: '1.0',
        changefreq: 'weekly',
        structuredData: {
            type: 'organization'
        }
    },

    // Page services
    services: {
        breadcrumb: [
            { name: 'Accueil', url: 'https://oweo-consulting.fr/' },
            { name: 'Services', url: 'https://oweo-consulting.fr/#services' }
        ],
        title: 'Nos Services | Développement Outils Métier & Conseil | Oweo',
        description: 'Développement d\'outils métier pour la charpente métallique : configurateur 3D, imbrication, DSTV, IFC. Conseil stratégique et accompagnement.',
        keywords: [
            'conseil transformation digitale', 'développement sur mesure',
            'audit digital', 'accompagnement projet', 'logiciel métier',
            'intégration système', 'formation digitale', 'support technique',
            'consultant IT Nantes', 'optimisation processus',
            'conduite du changement', 'architecture logicielle'
        ],
        type: 'service',
        image: '/assets/images/og-image.png',
        imageAlt: 'Services de conseil et développement par Oweo',
        priority: '0.9',
        changefreq: 'monthly',
        structuredData: {
            type: 'service',
            serviceType: 'IT Consulting & Custom Development',
            category: 'Software Development & Consulting'
        }
    },

    // Page réalisations
    products: {
        breadcrumb: [
            { name: 'Accueil', url: 'https://oweo-consulting.fr/' },
            { name: 'Réalisations', url: 'https://oweo-consulting.fr/#products' }
        ],
        title: 'Nos Réalisations | TopSteel, Metaliste.info | Oweo',
        description: 'TopSteel (ERP métallurgie + IA), Metaliste.info (annuaire géolocalisé), V-Steel (gestion production). Des outils développés pour l\'industrie métallique.',
        keywords: [
            'réalisations', 'projets sur mesure', 'portfolio',
            'études de cas', 'solutions métier', 'références clients',
            'développement logiciel', 'transformation digitale'
        ],
        type: 'product',
        image: '/assets/images/og-image.png',
        imageAlt: 'Réalisations et projets Oweo',
        priority: '0.9',
        changefreq: 'monthly',
        structuredData: {
            type: 'product',
            category: 'Software Projects'
        }
    },

    // Page contact
    contact: {
        breadcrumb: [
            { name: 'Accueil', url: 'https://oweo-consulting.fr/' },
            { name: 'Contact', url: 'https://oweo-consulting.fr/#contact' }
        ],
        title: 'Contact Oweo | Parlons de Votre Projet | Nantes',
        description: 'Contactez Oweo pour discuter de votre projet de développement sur mesure ou de transformation digitale. Premier échange gratuit. Nantes.',
        keywords: [
            'contact développement sur mesure', 'devis gratuit', 'diagnostic digital',
            'consultant Nantes', 'projet informatique', 'premier échange',
            'rdv conseil', 'étude personnalisée', 'accompagnement projet',
            'support client', 'partenaire digital'
        ],
        type: 'contact',
        image: '/assets/images/og-image.png',
        imageAlt: 'Contactez Oweo pour vos projets ERP métallique',
        priority: '0.7',
        changefreq: 'monthly',
        structuredData: {
            type: 'contact'
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
    products: {
        product: true,
        breadcrumb: true,
        aggregateRating: false // Ajouter si on a des avis
    },
    contact: {
        organization: true,
        breadcrumb: true,
        localBusiness: true
    }
};