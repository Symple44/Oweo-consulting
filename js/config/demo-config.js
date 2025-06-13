// ========================================
// js/config/demo-config.js - Configuration des démos CORRIGÉE
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
        },
        {
            id: 'gestion-stocks',
            title: 'Gestion des Stocks',
            description: 'Suivi en temps réel des matériaux et composants',
            category: 'Logistique',
            keywords: ['stock', 'inventaire', 'matériaux', 'gestion', 'suivi'],
            icon: 'fas fa-boxes',
            requireAccess: true
        },
        {
            id: 'planning-production',
            title: 'Planning de Production',
            description: 'Planification et suivi des opérations de production',
            category: 'Production',
            keywords: ['planning', 'production', 'ordonnancement', 'suivi', 'délais'],
            icon: 'fas fa-calendar-alt',
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

// ========================================
// EXPOSITION SÉCURISÉE DES CLASSES - CORRIGÉ
// ========================================

// Fonction pour vérifier et exposer les classes globalement de manière sécurisée
function exposeGlobalClasses() {
    const classesToExpose = [
        { name: 'DOMUtils', class: window.DOMUtils },
        { name: 'AnimationUtils', class: window.AnimationUtils },
        { name: 'OweoNavbar', class: window.OweoNavbar },
        { name: 'BaseDemo', class: window.BaseDemo },
        { name: 'ChiffrageDemo', class: window.ChiffrageDemo }
    ];
    
    const exposedClasses = [];
    const missingClasses = [];
    
    classesToExpose.forEach(({ name, class: cls }) => {
        if (typeof cls !== 'undefined') {
            window[name] = cls;
            exposedClasses.push(name);
        } else {
            missingClasses.push(name);
        }
    });
    
    if (exposedClasses.length > 0) {
        console.log('✅ Classes exposées globalement:', exposedClasses);
    }
    
    if (missingClasses.length > 0) {
        console.warn('⚠️ Classes manquantes (normale si pas encore chargées):', missingClasses);
        
        // Réessayer dans 100ms si certaines classes manquent
        setTimeout(() => {
            const stillMissing = missingClasses.filter(name => 
                typeof window[name] === 'undefined'
            );
            
            if (stillMissing.length > 0) {
                console.warn('🚨 Classes toujours manquantes après délai:', stillMissing);
            } else {
                console.log('✅ Toutes les classes ont été chargées');
            }
        }, 100);
    }
}

// ========================================
// INITIALISATION SÉCURISÉE
// ========================================

// Attendre que le DOM soit prêt avant d'exposer les classes
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', exposeGlobalClasses);
} else {
    // DOM déjà prêt, mais attendre un peu pour que les scripts se chargent
    setTimeout(exposeGlobalClasses, 50);
}

// Exposer la configuration globalement
window.DemoConfig = window.DEMO_SEARCH_CONFIG;

// ========================================
// UTILITAIRES DE DEBUG DEMO
// ========================================

window.DemoDebugTools = {
    listDemos() {
        console.table(window.DEMO_SEARCH_CONFIG.demos);
    },
    
    checkClassAvailability() {
        const requiredClasses = ['DOMUtils', 'AnimationUtils', 'OweoNavbar', 'BaseDemo', 'ChiffrageDemo'];
        const availability = {};
        
        requiredClasses.forEach(className => {
            availability[className] = typeof window[className] !== 'undefined' ? '✅ Disponible' : '❌ Manquant';
        });
        
        console.table(availability);
        return availability;
    },
    
    validateConfig() {
        const config = window.DEMO_SEARCH_CONFIG;
        const validation = {
            demos: config.demos?.length || 0,
            categories: config.categories?.length || 0,
            shortcuts: config.shortcuts?.length || 0,
            valid: !!(config.demos && config.categories && config.shortcuts)
        };
        
        console.log('🔍 Validation configuration démos:', validation);
        return validation;
    },
    
    reloadClasses() {
        console.log('🔄 Rechargement des classes...');
        exposeGlobalClasses();
    }
};

// Message de confirmation du chargement
console.log('✅ Demo Config chargé sans erreur');

// Validation automatique en mode développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(() => {
        console.log('🔍 Validation automatique demo config...');
        window.DemoDebugTools.checkClassAvailability();
        window.DemoDebugTools.validateConfig();
    }, 200);
}