// ========================================
// js/config/theme-config.js - Configuration du système de thème générique
// ========================================

window.ThemeConfig = {
    // ========================================
    // CONFIGURATION GÉNÉRALE
    // ========================================
    
    // Activer le nouveau système automatiquement
    enabled: true,
    
    // Thème par défaut
    defaultTheme: 'warm',
    
    // Mode par défaut (dark/light/auto)
    defaultMode: 'auto',
    
    // Afficher le sélecteur de thème
    showThemeSelector: true,
    
    // ========================================
    // MAPPING DES CLASSES
    // ========================================
    
    // Mapping ancien système -> nouveau système
    classMapping: {
        // Cartes
        'warm-card': 'card card--glow',
        'warm-card--primary': 'card card--primary',
        'warm-card--accent': 'card card--accent',
        'service-card-warm': 'card card--hover card--glow',
        
        // Boutons
        'btn-warm': 'btn btn--primary',
        'btn-warm--outline': 'btn btn--outline',
        'btn-warm--lg': 'btn btn--lg',
        
        // Icônes
        'icon-warm': 'icon-box icon-box--primary',
        'service-icon-warm': 'icon-box icon-box--accent icon-box--animated',
        
        // Headers
        'page-header-warm': 'page-header page-header--gradient',
        'page-title-warm': 'page-title',
        'page-description-warm': 'page-description',
        
        // Animations
        'warm-fade-in': 'animate-in',
        'warm-scale-in': 'animate-in',
        'animation-delay-200': 'animate-in-delay-2',
        
        // Sections
        'hero-section-warm': 'hero',
        'hero-content-warm': 'hero-content',
        'hero-title-warm': 'hero-title',
        'hero-description-warm': 'hero-description',
        
        // Grilles
        'warm-grid': 'grid grid--auto',
        'warm-grid--4cols': 'grid grid--4'
    },
    
    // ========================================
    // THÈMES PERSONNALISÉS
    // ========================================
    
    customThemes: {
        // Exemple de thème personnalisé entreprise
        corporate: {
            name: 'Corporate',
            primary: 210,      // Bleu corporate
            accent: 45,        // Or
            tertiary: 0,       // Rouge
            saturation: 50,
            lightness: 40
        },
        
        // Thème pastel
        pastel: {
            name: 'Pastel',
            primary: 280,      // Lavande
            accent: 150,       // Menthe
            tertiary: 30,      // Pêche
            saturation: 40,
            lightness: 70
        }
    },
    
    // ========================================
    // FONCTIONNALITÉS
    // ========================================
    
    features: {
        // Animations
        animations: {
            enabled: true,
            onScroll: true,
            reduceOnMobile: true,
            respectReducedMotion: true
        },
        
        // Persistance
        persistence: {
            enabled: true,
            key: 'app-theme-preference'
        },
        
        // Raccourcis clavier
        shortcuts: {
            enabled: true,
            toggleTheme: 'Ctrl+Shift+T',
            toggleMode: 'Ctrl+Shift+M',
            nextTheme: 'Ctrl+Shift+Right',
            prevTheme: 'Ctrl+Shift+Left'
        }
    },
    
    // ========================================
    // UTILITAIRES DE MIGRATION
    // ========================================
    
    migration: {
        // Remplacer automatiquement les classes
        autoReplace: true,
        
        // Logger les remplacements
        logReplacements: true,
        
        // Méthode de remplacement des classes
        replaceClasses(element) {
            const classList = element.className.split(' ');
            const newClasses = [];
            let replaced = false;
            
            classList.forEach(className => {
                if (this.classMapping[className]) {
                    newClasses.push(...this.classMapping[className].split(' '));
                    replaced = true;
                    
                    if (this.logReplacements) {
                        console.log(`✨ Remplacé: ${className} → ${this.classMapping[className]}`);
                    }
                } else {
                    newClasses.push(className);
                }
            });
            
            if (replaced) {
                element.className = [...new Set(newClasses)].join(' ');
            }
        },
        
        // Scanner et remplacer dans tout le DOM
        migrateDOM() {
            const elements = document.querySelectorAll('*');
            let count = 0;
            
            elements.forEach(element => {
                if (element.className && typeof element.className === 'string') {
                    const before = element.className;
                    this.replaceClasses.call(this, element);
                    
                    if (before !== element.className) {
                        count++;
                    }
                }
            });
            
            console.log(`✅ Migration terminée: ${count} éléments mis à jour`);
        }
    },
    
    // ========================================
    // INITIALISATION
    // ========================================
    
    init() {
        console.log('🎨 Initialisation du système de thème générique...');
        
        // Charger les CSS
        this.loadStyles();
        
        // Appliquer les thèmes personnalisés
        this.registerCustomThemes();
        
        // Configurer les raccourcis
        if (this.features.shortcuts.enabled) {
            this.setupShortcuts();
        }
        
        // Migration automatique si activée
        if (this.migration.autoReplace) {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    this.migration.migrateDOM.call(this.migration);
                }, 500);
            });
        }
        
        // Observer les changements de thème
        this.observeThemeChanges();
    },
    
    loadStyles() {
        // Vérifier si les styles sont déjà chargés
        if (document.querySelector('link[href*="theme-variables.css"]')) {
            return;
        }
        
        // Charger les fichiers CSS du nouveau système
        const styles = [
            'css/theme-variables.css',
            'css/theme-components.css'
        ];
        
        styles.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        });
    },
    
    registerCustomThemes() {
        // Attendre que ThemeManager soit chargé
        const checkAndRegister = () => {
            if (window.ThemeManager) {
                Object.entries(this.customThemes).forEach(([key, theme]) => {
                    window.ThemeManager.themes[key] = theme;
                });
                console.log('✨ Thèmes personnalisés enregistrés');
            } else {
                setTimeout(checkAndRegister, 100);
            }
        };
        
        checkAndRegister();
    },
    
    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            const shortcuts = this.features.shortcuts;
            
            // Toggle mode clair/sombre
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                if (window.ThemeManager) {
                    window.ThemeManager.toggleMode();
                }
            }
            
            // Thème suivant
            if (e.ctrlKey && e.shiftKey && e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextTheme();
            }
            
            // Thème précédent
            if (e.ctrlKey && e.shiftKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevTheme();
            }
        });
    },
    
    observeThemeChanges() {
        window.addEventListener('themechange', (e) => {
            console.log('🎨 Thème changé:', e.detail);
            
            // Actions personnalisées lors du changement de thème
            if (e.detail.theme === 'custom') {
                console.log('💡 Thème personnalisé activé');
            }
        });
    },
    
    // ========================================
    // API PUBLIQUE
    // ========================================
    
    // Passer au thème suivant
    nextTheme() {
        if (window.ThemeManager) {
            const themes = window.ThemeManager.getThemes();
            const current = window.ThemeManager.currentTheme;
            const index = themes.indexOf(current);
            const next = themes[(index + 1) % themes.length];
            window.ThemeManager.applyTheme(next);
        }
    },
    
    // Passer au thème précédent
    prevTheme() {
        if (window.ThemeManager) {
            const themes = window.ThemeManager.getThemes();
            const current = window.ThemeManager.currentTheme;
            const index = themes.indexOf(current);
            const prev = themes[(index - 1 + themes.length) % themes.length];
            window.ThemeManager.applyTheme(prev);
        }
    },
    
    // Migrer une page spécifique
    migratePage(pageElement) {
        const elements = pageElement.querySelectorAll('*');
        elements.forEach(element => {
            if (element.className && typeof element.className === 'string') {
                this.migration.replaceClasses.call(this.migration, element);
            }
        });
    },
    
    // Obtenir le mapping des classes
    getClassMapping() {
        return this.classMapping;
    },
    
    // Ajouter un mapping personnalisé
    addClassMapping(oldClass, newClass) {
        this.classMapping[oldClass] = newClass;
    }
};

// ========================================
// AUTO-INITIALISATION
// ========================================

// Initialiser automatiquement si activé
if (window.ThemeConfig.enabled) {
    window.ThemeConfig.init();
}

// Commandes console
console.log(`
🎨 Configuration du Thème Générique
==================================
ThemeConfig.migratePage(element)     - Migrer une page
ThemeConfig.nextTheme()              - Thème suivant
ThemeConfig.prevTheme()              - Thème précédent
ThemeConfig.getClassMapping()        - Voir les mappings
ThemeConfig.migration.migrateDOM()   - Migrer tout le DOM

Raccourcis:
Ctrl+Shift+T : Sélecteur de thème
Ctrl+Shift+M : Basculer clair/sombre
Ctrl+Shift+→ : Thème suivant
Ctrl+Shift+← : Thème précédent
`);