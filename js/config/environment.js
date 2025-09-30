// js/config/environment.js - Configuration spécifique par environnement

(function() {
    'use strict';
    
    // Détection automatique de l'environnement
    const hostname = window.location.hostname;
    const isDevelopment = hostname === 'localhost' || hostname === '127.0.0.1';
    const isStaging = hostname.includes('staging') || hostname.includes('preprod');
    const isProduction = !isDevelopment && !isStaging;
    
    // Configuration par environnement
    const environments = {
        development: {
            name: 'development',
            debug: true,
            api: {
                baseUrl: 'http://localhost:3001/api/v1',
                timeout: 30000 // Plus long en dev pour le debug
            },
            security: {
                recaptcha: {
                    enabled: false, // Désactivé en dev
                    siteKey: '6LfwlFwrAAAAAGqiSXVELtmshYK8MrpAYbmyMc8a' // clé client
                },
                rateLimit: {
                    enabled: false, // Désactivé en dev pour faciliter les tests
                    maxAttempts: 100
                },
                honeypot: {
                    enabled: true // Toujours actif même en dev
                }
            },
            features: {
                analytics: false,
                errorReporting: false,
                performanceMonitoring: false
            }
        },
        
        staging: {
            name: 'staging',
            debug: true,
            api: {
                baseUrl: 'https://staging-api.oweo-consulting.fr/api/v1',
                timeout: 15000
            },
            security: {
                recaptcha: {
                    enabled: true,
                    siteKey: '6LfwlFwrAAAAAGqiSXVELtmshYK8MrpAYbmyMc8a' // clé client
                },
                rateLimit: {
                    enabled: true,
                    maxAttempts: 5
                },
                honeypot: {
                    enabled: true
                }
            },
            features: {
                analytics: true,
                errorReporting: true,
                performanceMonitoring: true
            }
        },
        
        production: {
            name: 'production',
            debug: false,
            api: {
                baseUrl: 'https://api.oweo-consulting.fr/api/v1',
                timeout: 10000
            },
            security: {
                recaptcha: {
                    enabled: true,
                    siteKey: '6LfwlFwrAAAAAGqiSXVELtmshYK8MrpAYbmyMc8a' // clé client
                },
                rateLimit: {
                    enabled: true,
                    maxAttempts: 3
                },
                honeypot: {
                    enabled: true
                }
            },
            features: {
                analytics: true,
                errorReporting: true,
                performanceMonitoring: true
            }
        }
    };
    
    // Sélectionner l'environnement
    let currentEnvironment;
    if (isDevelopment) {
        currentEnvironment = environments.development;
    } else if (isStaging) {
        currentEnvironment = environments.staging;
    } else {
        currentEnvironment = environments.production;
    }
    
    // Permettre le forçage via URL parameter (utile pour les tests)
    const urlParams = new URLSearchParams(window.location.search);
    const forcedEnv = urlParams.get('env');
    if (forcedEnv && environments[forcedEnv]) {
        currentEnvironment = environments[forcedEnv];
        logger.warn(`⚠️ Environment forcé à: ${forcedEnv}`);
    }
    
    // Exposer la configuration
    window.EnvironmentConfig = {
        current: currentEnvironment,
        name: currentEnvironment.name,
        
        // Helpers
        isDevelopment: () => currentEnvironment.name === 'development',
        isStaging: () => currentEnvironment.name === 'staging',
        isProduction: () => currentEnvironment.name === 'production',
        
        // Obtenir une valeur de config
        get(path) {
            const keys = path.split('.');
            let value = currentEnvironment;
            
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return undefined;
                }
            }
            
            return value;
        },
        
        // Logger conditionnel
        log(...args) {
            if (currentEnvironment.debug) {
                logger.log('[ENV]', ...args);
            }
        },
        
        // Afficher la configuration actuelle
        displayInfo() {
            const info = {
                environment: currentEnvironment.name,
                hostname: hostname,
                api: currentEnvironment.api.baseUrl,
                debug: currentEnvironment.debug,
                features: currentEnvironment.features
            };
            
            logger.group('Environment Configuration');
            logger.table(info);
            logger.groupEnd();
        }
    };
    
    // Appliquer automatiquement la configuration à AppConfig si disponible
    if (window.AppConfig) {
        // Merger la configuration d'environnement
        window.AppConfig.environment = currentEnvironment.name;
        window.AppConfig.development.debug = currentEnvironment.debug;
        
        // API
        if (currentEnvironment.api) {
            window.AppConfig.api = {
                ...window.AppConfig.api,
                ...currentEnvironment.api
            };
        }
        
        // Sécurité du formulaire de contact
        if (window.AppConfig.contactForm && currentEnvironment.security) {
            window.AppConfig.contactForm.security.recaptcha = {
                ...window.AppConfig.contactForm.security.recaptcha,
                ...currentEnvironment.security.recaptcha
            };
            
            window.AppConfig.contactForm.security.rateLimit = {
                ...window.AppConfig.contactForm.security.rateLimit,
                ...currentEnvironment.security.rateLimit
            };
            
            window.AppConfig.contactForm.security.honeypotEnabled = 
                currentEnvironment.security.honeypot.enabled;
        }
        
        // Analytics
        if (window.AppConfig.analytics) {
            window.AppConfig.analytics.enabled = currentEnvironment.features.analytics;
        }
    }
    
    // Afficher les infos en dev
    if (currentEnvironment.debug) {
        window.EnvironmentConfig.displayInfo();
    }
    
    // Émettre un événement pour signaler que l'environnement est configuré
    document.dispatchEvent(new CustomEvent('oweo:environment:ready', {
        detail: { environment: currentEnvironment }
    }));
    
})();