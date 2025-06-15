// ========================================
// js/config/demo-config.js - Configuration des démos
// ========================================

window.DEMO_SEARCH_CONFIG = {
    demos: [
        {
            id: 'chiffrage-demo',
            title: 'Outil de Chiffrage',
            description: 'Chiffrage automatisé pour projets métalliques',
            category: 'Devis',
            keywords: ['chiffrage', 'devis', 'calcul', 'prix', 'métrage', 'coût', 'estimation'],
            icon: 'fas fa-calculator',
            requireAccess: true
        },
        {
            id: 'dstv-demo',
            title: 'Interface DSTV',
            description: 'Import/Export de fichiers DSTV pour machines CNC',
            category: 'Production',
            keywords: ['dstv', 'cnc', 'usinage', 'fichier', 'machine', 'production', 'export'],
            icon: 'fas fa-cog',
            requireAccess: true
        }
    ],
    
    shortcuts: [
        { key: 'ctrl+k', action: 'openSearch', description: 'Ouvrir la recherche' },
        { key: 'esc', action: 'closeSearch', description: 'Fermer la recherche' },
        { key: 'enter', action: 'selectFirst', description: 'Sélectionner le premier résultat' }
    ],
    
    categories: [
        { id: 'devis', name: 'Devis & Chiffrage', icon: 'fas fa-calculator' },
        { id: 'production', name: 'Production', icon: 'fas fa-cog' },
        { id: 'logistique', name: 'Logistique', icon: 'fas fa-truck' },
        { id: 'gestion', name: 'Gestion', icon: 'fas fa-chart-bar' }
    ]
};

// Exposer les classes globalement
window.DOMUtils = DOMUtils;
window.AnimationUtils = AnimationUtils;
window.OweoNavbar = OweoNavbar;
window.BaseDemo = BaseDemo;
window.ChiffrageDemo = ChiffrageDemo;