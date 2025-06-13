// ========================================
// js/config/template-config.js - Configuration centralisée du système template
// ========================================

window.TemplateConfig = {
    // ========================================
    // CONFIGURATION GÉNÉRALE
    // ========================================
    
    enabled: true,
    defaultTheme: 'oweo',
    defaultMode: 'auto',
    showThemeSelector: true,
    
    // ========================================
    // CENTRALISATION COMPLÈTE
    // ========================================
    
    // Approche: remplacer tous les fichiers CSS par le système template
    replaceExistingCSS: true,
    
    // Fichiers CSS remplacés par template-variables.css et template-components.css
    replacedFiles: [
        'css/variables.css',
        'css/base.css', 
        'css/utilities.css',
        'css/layout.css',
        'css/components.css'
    ],
    
    // ========================================
    // MIGRATION AUTOMATIQUE
    // ========================================
    
    // Mapping automatique des classes existantes
    autoMigration: {
        enabled: true,
        preserveOriginal: true,  // Garder les anciennes classes pour compatibilité
        logChanges: true
    },
    
    // Mapping des classes (gardé pour compatibilité mais pas nécessaire avec la centralisation)
    classMapping: {
        // Les classes existantes sont maintenant intégrées directement dans template-components.css
        'warm-card': 'card card--primary card--hover',
        'service-card-warm': 'card card--primary card--hover',
        'btn-warm': 'btn btn--primary',
        'btn-warm--outline': 'btn btn--outline',
        'icon-warm': 'icon-box icon-box--primary icon-box--animated',
        'warm-grid': 'grid grid-auto-fit'
    },
    
    // ========================================
    // THÈMES OWEO CENTRALISÉS
    // ========================================
    
    customThemes: {
        oweo: {
            name: 'Oweo Signature',
            primary: 199,     // Bleu Oweo
            accent: 25,       // Orange Oweo
            tertiary: 349,    // Rose accent
            saturation: 84,
            lightness: 50
        },
        oweoLight: {
            name: 'Oweo Clair',
            primary: 199,
            accent: 25,
            tertiary: 349,
            saturation: 70,
            lightness: 60
        },
        oweoDark: {
            name: 'Oweo Sombre',
            primary: 199,
            accent: 25,
            tertiary: 349,
            saturation: 90,
            lightness: 45
        }
    },
    
    // ========================================
    // FEATURES CENTRALISÉES
    // ========================================
    
    features: {
        centralizedCSS: true,       // Utiliser uniquement les fichiers template
        autoThemeDetection: true,   // Détecter automatiquement les préférences
        responsiveComponents: true, // Composants adaptatifs
        animationSystem: true,      // Système d'animations unifié
        utilitiesFirst: true,       // Approche utility-first
        darkModeToggle: true,       // Toggle mode sombre
        devTools: true,            // Outils de développement
        performanceMode: false      // Mode performance (désactive certaines animations)
    },
    
    // ========================================
    // INITIALISATION CENTRALISÉE
    // ========================================
    
    init() {
        console.log('🎨 Initialisation du Template System Centralisé Oweo');
        
        // Vérifier que les fichiers template sont chargés
        this.validateTemplateFiles();
        
        // Enregistrer les thèmes Oweo
        this.registerCustomThemes();
        
        // Configurer les raccourcis
        this.setupShortcuts();
        
        // Écouter les changements de thème
        this.observeThemeChanges();
        
        // Initialiser la détection de mode
        this.setupModeDetection();
        
        // Outils de développement
        if (this.features.devTools) {
            this.setupDevTools();
        }
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        console.log('✅ Template System centralisé initialisé');
    },
    
    validateTemplateFiles() {
        const requiredFiles = [
            'template-variables.css',
            'template-components.css'
        ];
        
        const loadedFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => link.href.split('/').pop());
            
        const missing = requiredFiles.filter(file => 
            !loadedFiles.some(loaded => loaded.includes(file))
        );
        
        if (missing.length > 0) {
            console.warn('⚠️ Fichiers template manquants:', missing);
            this.loadMissingTemplateFiles(missing);
        } else {
            console.log('✅ Tous les fichiers template sont chargés');
        }
    },
    
    loadMissingTemplateFiles(missingFiles) {
        missingFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `css/${file}`;
            document.head.appendChild(link);
            console.log(`🔄 Chargement de ${file}`);
        });
    },
    
    registerCustomThemes() {
        const registerThemes = () => {
            if (window.OweoThemeManager || window.ThemeManager) {
                const manager = window.OweoThemeManager || window.ThemeManager;
                Object.entries(this.customThemes).forEach(([key, theme]) => {
                    manager.themes[key] = theme;
                });
                console.log('✨ Thèmes Oweo centralisés enregistrés');
                
                // Appliquer le thème par défaut
                manager.applyTheme(this.defaultTheme);
            } else {
                setTimeout(registerThemes, 100);
            }
        };
        
        registerThemes();
    },
    
    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.features.devTools) return;
            
            // Ctrl+Shift+T: Sélecteur de thème
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleThemeSelector();
            }
            
            // Ctrl+Shift+M: Toggle mode clair/sombre
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                this.toggleMode();
            }
            
            // Ctrl+Shift+D: Toggle dev tools
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleDevTools();
            }
            
            // Ctrl+Shift+P: Toggle performance mode
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.togglePerformanceMode();
            }
        });
    },
    
    observeThemeChanges() {
        window.addEventListener('themechange', (e) => {
            console.log('🎨 Thème centralisé changé:', e.detail);
            
            // Émettre vers le système Oweo existant
            if (window.app && window.app.eventBus) {
                window.app.eventBus.emit('template:theme:changed', e.detail);
            }
            
            // Mettre à jour les métriques de performance
            this.updatePerformanceMetrics(e.detail);
        });
    },
    
    setupModeDetection() {
        if (!this.features.autoThemeDetection) return;
        
        // Détecter les préférences système
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        // Écouter les changements
        darkModeQuery.addEventListener('change', (e) => {
            if (this.defaultMode === 'auto') {
                this.setMode(e.matches ? 'dark' : 'light');
            }
        });
        
        contrastQuery.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-high-contrast', e.matches);
        });
        
        motionQuery.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-reduced-motion', e.matches);
            this.features.performanceMode = e.matches;
        });
    },
    
    setupDevTools() {
        // Console API
        window.TemplateDevTools = {
            listThemes: () => this.listAvailableThemes(),
            analyzeCSS: () => this.analyzeCSSUsage(),
            benchmarkPerformance: () => this.benchmarkPerformance(),
            validateStructure: () => this.validateHTMLStructure(),
            exportConfig: () => this.exportConfiguration(),
            toggleDebugMode: () => this.toggleDebugMode()
        };
        
        console.log(`
🛠️ Template Dev Tools disponibles:
=================================
TemplateDevTools.listThemes()      - Liste des thèmes
TemplateDevTools.analyzeCSS()      - Analyse de l'utilisation CSS  
TemplateDevTools.benchmarkPerformance() - Test de performance
TemplateDevTools.validateStructure() - Validation HTML
TemplateDevTools.exportConfig()    - Export de la configuration
TemplateDevTools.toggleDebugMode() - Mode debug

Raccourcis:
Ctrl+Shift+T : Sélecteur de thème
Ctrl+Shift+M : Toggle mode
Ctrl+Shift+D : Toggle dev tools
Ctrl+Shift+P : Toggle performance mode
        `);
    },
    
    setupPerformanceMonitoring() {
        this.performanceMetrics = {
            themeChanges: 0,
            cssVariableUpdates: 0,
            animationsTriggered: 0,
            lastChangeTime: null
        };
        
        // Observer les changements de style
        const observer = new MutationObserver(() => {
            this.performanceMetrics.cssVariableUpdates++;
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style', 'data-theme', 'data-theme-mode']
        });
    },
    
    // ========================================
    // MÉTHODES UTILITAIRES
    // ========================================
    
    toggleMode() {
        const manager = window.OweoThemeManager || window.ThemeManager;
        if (manager) {
            manager.toggleMode();
        }
    },
    
    setMode(mode) {
        const manager = window.OweoThemeManager || window.ThemeManager;
        if (manager) {
            manager.setMode(mode);
        }
    },
    
    toggleThemeSelector() {
        const existing = document.getElementById('template-theme-selector');
        if (existing) {
            existing.remove();
        } else {
            this.createThemeSelector();
        }
    },
    
    createThemeSelector() {
        const manager = window.OweoThemeManager || window.ThemeManager;
        if (!manager) return;
        
        const selector = document.createElement('div');
        selector.id = 'template-theme-selector';
        selector.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; 
                        background: var(--bg-elevated); border: 1px solid var(--border-default);
                        border-radius: var(--radius-xl); padding: var(--space-6);
                        font-family: var(--font-family-base); font-size: var(--font-size-sm);
                        box-shadow: var(--shadow-xl); min-width: 250px;">
                <div style="margin-bottom: var(--space-4); font-weight: var(--font-weight-semibold);">
                    🎨 Template Theme Manager
                </div>
                <select id="template-theme-select" style="margin-bottom: var(--space-3); width: 100%; 
                        padding: var(--space-2); border-radius: var(--radius-md);">
                    ${Object.entries(manager.themes).map(([key, theme]) => 
                        `<option value="${key}" ${key === manager.currentTheme ? 'selected' : ''}>${theme.name}</option>`
                    ).join('')}
                </select>
                <button id="template-mode-toggle" style="width: 100%; padding: var(--space-2); 
                        margin-bottom: var(--space-3); border-radius: var(--radius-md);">
                    ${manager.currentMode === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
                </button>
                <div style="display: flex; gap: var(--space-2);">
                    <button id="template-export-btn" style="flex: 1; padding: var(--space-1); 
                            font-size: var(--font-size-xs); border-radius: var(--radius-md);">
                        Export
                    </button>
                    <button id="template-close-btn" style="flex: 1; padding: var(--space-1); 
                            font-size: var(--font-size-xs); border-radius: var(--radius-md);">
                        Fermer
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(selector);
        this.bindThemeSelector();
    },
    
    bindThemeSelector() {
        const themeSelect = document.getElementById('template-theme-select');
        const modeToggle = document.getElementById('template-mode-toggle');
        const exportBtn = document.getElementById('template-export-btn');
        const closeBtn = document.getElementById('template-close-btn');
        
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                const manager = window.OweoThemeManager || window.ThemeManager;
                if (manager) manager.applyTheme(e.target.value);
            });
        }
        
        if (modeToggle) {
            modeToggle.addEventListener('click', () => {
                this.toggleMode();
                setTimeout(() => {
                    const manager = window.OweoThemeManager || window.ThemeManager;
                    modeToggle.textContent = manager.currentMode === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre';
                }, 100);
            });
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportConfiguration();
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('template-theme-selector')?.remove();
            });
        }
    },
    
    togglePerformanceMode() {
        this.features.performanceMode = !this.features.performanceMode;
        document.documentElement.setAttribute('data-performance-mode', this.features.performanceMode);
        console.log(`🚀 Performance mode: ${this.features.performanceMode ? 'ON' : 'OFF'}`);
    },
    
    listAvailableThemes() {
        const manager = window.OweoThemeManager || window.ThemeManager;
        if (manager) {
            console.table(manager.themes);
        }
    },
    
    analyzeCSSUsage() {
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const usage = {
            templateFiles: styles.filter(s => s.href.includes('template-')),
            totalFiles: styles.length,
            replaced: this.replacedFiles
        };
        
        console.log('📊 Analyse CSS:', usage);
        return usage;
    },
    
    exportConfiguration() {
        const manager = window.OweoThemeManager || window.ThemeManager;
        const config = {
            system: 'Oweo Template System',
            version: '1.0.0',
            currentTheme: manager?.currentTheme,
            currentMode: manager?.currentMode,
            themes: manager?.themes,
            features: this.features,
            performance: this.performanceMetrics
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'oweo-template-config.json';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📁 Configuration exportée');
    },
    
    updatePerformanceMetrics(themeData) {
        this.performanceMetrics.themeChanges++;
        this.performanceMetrics.lastChangeTime = Date.now();
    }
};

// ========================================
// AUTO-INITIALISATION
// ========================================

// Initialiser automatiquement quand le DOM est prêt
if (window.TemplateConfig.enabled) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.TemplateConfig.init();
        });
    } else {
        window.TemplateConfig.init();
    }
}

// Exposer l'API pour la console
window.Template = window.TemplateConfig;