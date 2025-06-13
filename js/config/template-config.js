// ========================================
// js/config/template-config.js - Configuration centralisée CORRIGÉE
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
    // CENTRALISATION COMPLÈTE - CORRIGÉE
    // ========================================
    
    // Approche: remplacer tous les fichiers CSS par le système template
    replaceExistingCSS: true,
    
    // Fichiers CSS remplacés par le système template centralisé
    replacedFiles: [
        'css/variables.css',
        'css/base.css', 
        'css/utilities.css',
        'css/layout.css',
        'css/components.css'
    ],
    
    // ========================================
    // FICHIERS TEMPLATE COMPLETS - NOUVEAU
    // ========================================
    
    // TOUS les fichiers template requis (d'après votre index.html)
    requiredTemplateFiles: [
        'template-variables.css',    // Variables centralisées
        'template-utilities.css',    // Base, layout, utilities
        'template-navigation.css',   // Navigation et footer
        'template-modals.css',       // Modales et notifications
        'template-components.css',   // Composants UI
        'template-pages.css',        // Pages complètes
        'template-demos.css'         // Démos spécialisées
    ],
    
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
        centralizedCSS: true,       
        autoThemeDetection: true,   
        responsiveComponents: true, 
        animationSystem: true,      
        utilitiesFirst: true,       
        darkModeToggle: true,       
        devTools: true,            
        performanceMode: false      
    },
    
    // ========================================
    // INITIALISATION CENTRALISÉE - CORRIGÉE
    // ========================================
    
    init() {
        console.log('🎨 Initialisation du Template System Centralisé Oweo');
        
        try {
            // Vérifier que TOUS les fichiers template sont chargés - CORRIGÉ
            this.validateAllTemplateFiles();
            
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
            
        } catch (error) {
            console.error('❌ Erreur initialisation Template System:', error);
            this.handleInitError(error);
        }
    },
    
    // ========================================
    // VALIDATION COMPLÈTE - NOUVEAU
    // ========================================
    
    validateAllTemplateFiles() {
        const loadedFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => link.href.split('/').pop());
            
        const missing = this.requiredTemplateFiles.filter(file => 
            !loadedFiles.some(loaded => loaded.includes(file))
        );
        
        if (missing.length > 0) {
            console.warn('⚠️ Fichiers template manquants:', missing);
            this.loadMissingTemplateFiles(missing);
            return false;
        } else {
            console.log('✅ Tous les fichiers template sont chargés:', this.requiredTemplateFiles.length);
            return true;
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
        
        // Attendre le chargement et relancer l'initialisation
        setTimeout(() => {
            console.log('🔄 Rechargement après ajout des fichiers manquants');
            this.init();
        }, 500);
    },
    
    // ========================================
    // GESTION D'ERREURS - NOUVEAU
    // ========================================
    
    handleInitError(error) {
        // Mode dégradé - au moins afficher quelque chose
        console.warn('🚨 Mode dégradé activé');
        
        // Créer un style de base minimal
        const fallbackCSS = `
            body { 
                font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #f9fafb;
                color: #1f2937;
            }
            .error-notice {
                background: #fef2f2;
                color: #991b1b;
                padding: 16px;
                border-radius: 8px;
                border: 1px solid #fecaca;
                margin: 20px 0;
            }
            .app-container { 
                max-width: 1200px; 
                margin: 0 auto; 
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = fallbackCSS;
        document.head.appendChild(style);
        
        // Afficher une notification d'erreur
        const appContainer = document.querySelector('.app-container') || document.body;
        const errorNotice = document.createElement('div');
        errorNotice.className = 'error-notice';
        errorNotice.innerHTML = `
            <h3>⚠️ Problème de chargement du thème</h3>
            <p>Le système de template n'a pas pu s'initialiser complètement. L'application fonctionne en mode dégradé.</p>
            <details>
                <summary>Détails techniques</summary>
                <pre>${error.message}</pre>
            </details>
        `;
        appContainer.insertBefore(errorNotice, appContainer.firstChild);
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
                // Attendre un peu plus longtemps et réessayer
                setTimeout(registerThemes, 200);
            }
        };
        
        registerThemes();
    },
    
    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'T':
                        e.preventDefault();
                        this.toggleThemeSelector();
                        break;
                    case 'M':
                        e.preventDefault();
                        this.toggleMode();
                        break;
                    case 'D':
                        e.preventDefault();
                        this.toggleDevTools();
                        break;
                    case 'P':
                        e.preventDefault();
                        this.togglePerformanceMode();
                        break;
                }
            }
        });
    },
    
    observeThemeChanges() {
        // Observer les changements d'attributs de thème
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'data-theme' || 
                     mutation.attributeName === 'data-theme-mode')) {
                    console.log('🎨 Thème centralisé changé:', {
                        theme: document.documentElement.getAttribute('data-theme'),
                        mode: document.documentElement.getAttribute('data-theme-mode')
                    });
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'data-theme-mode']
        });
    },
    
    setupModeDetection() {
        if (!this.features.autoThemeDetection) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleModeChange = (e) => {
            if (this.defaultMode === 'auto') {
                this.setMode(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleModeChange);
        handleModeChange(mediaQuery);
        
        // Détecter les préférences de contraste et mouvement
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
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
            toggleDebugMode: () => this.toggleDebugMode(),
            validateFiles: () => this.validateAllTemplateFiles()
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
TemplateDevTools.validateFiles()   - Valider fichiers template

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
        if (!manager) {
            console.warn('ThemeManager non disponible');
            return;
        }
        
        const selector = document.createElement('div');
        selector.id = 'template-theme-selector';
        selector.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; 
                        background: white; border: 1px solid #e5e7eb;
                        border-radius: 12px; padding: 24px;
                        font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
                        font-size: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); 
                        min-width: 250px;">
                <div style="margin-bottom: 16px; font-weight: 600;">
                    🎨 Template Theme Manager
                </div>
                <select id="template-theme-select" style="margin-bottom: 12px; width: 100%; 
                        padding: 8px; border-radius: 6px; border: 1px solid #d1d5db;">
                    ${Object.entries(manager.themes || {}).map(([key, theme]) => 
                        `<option value="${key}" ${key === manager.currentTheme ? 'selected' : ''}>${theme.name}</option>`
                    ).join('')}
                </select>
                <button id="template-mode-toggle" style="width: 100%; padding: 8px; 
                        margin-bottom: 12px; border-radius: 6px; border: 1px solid #d1d5db; 
                        background: white; cursor: pointer;">
                    ${manager.currentMode === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
                </button>
                <div style="display: flex; gap: 8px;">
                    <button id="template-export-btn" style="flex: 1; padding: 6px; 
                            font-size: 12px; border-radius: 6px; border: 1px solid #d1d5db; 
                            background: white; cursor: pointer;">
                        Export
                    </button>
                    <button id="template-close-btn" style="flex: 1; padding: 6px; 
                            font-size: 12px; border-radius: 6px; border: 1px solid #d1d5db; 
                            background: white; cursor: pointer;">
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
    
    // ========================================
    // MÉTHODES D'ANALYSE
    // ========================================
    
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
            loadedTemplateFiles: this.requiredTemplateFiles.filter(file => 
                styles.some(s => s.href.includes(file))
            ),
            missingTemplateFiles: this.requiredTemplateFiles.filter(file => 
                !styles.some(s => s.href.includes(file))
            )
        };
        
        console.log('📊 Analyse CSS:', usage);
        return usage;
    },
    
    exportConfiguration() {
        const manager = window.OweoThemeManager || window.ThemeManager;
        const config = {
            system: 'Oweo Template System',
            version: '2.0.0',
            currentTheme: manager?.currentTheme,
            currentMode: manager?.currentMode,
            themes: manager?.themes,
            features: this.features,
            performance: this.performanceMetrics,
            loadedFiles: this.analyzeCSSUsage()
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'oweo-template-config.json';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📁 Configuration exportée');
    }
};

// ========================================
// AUTO-INITIALISATION SÉCURISÉE
// ========================================

// Initialiser automatiquement quand le DOM est prêt
if (window.TemplateConfig.enabled) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Attendre que tous les scripts soient chargés
            setTimeout(() => {
                window.TemplateConfig.init();
            }, 100);
        });
    } else {
        // DOM déjà prêt
        setTimeout(() => {
            window.TemplateConfig.init();
        }, 100);
    }
}

// Exposer l'API pour la console
window.Template = window.TemplateConfig;