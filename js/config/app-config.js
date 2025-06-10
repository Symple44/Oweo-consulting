// ========================================
// js/config/app-config.js - Configuration application complète
// ========================================

window.AppConfig = {
    // Configuration de base
    appName: 'Oweo',
    version: '1.0.0',
    environment: 'production',
    
    // URLs d'actions
    calendlyUrl: 'https://calendly.com/nicolas-dubain/30min',
    brochureUrl: '/assets/docs/Oweo-Solutions-ERP-Metallique.pdf',
    
    // Configuration de contact
    contact: {
        email: 'contact@oweo-consulting.fr',
        phone: '+33 6 86 76 81 31',
        address: 'Nantes, France',
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        website: 'https://oweo-consulting.fr'
    },
    
    // Configuration client access
    clientAccess: {
        enabled: true,
        demoMode: true,
        allowGuestAccess: false,
        sessionTimeout: 3600000, // 1 heure
        maxRetries: 3
    },
    
    // Configuration des démos
    demos: {
        chiffrageDemo: {
            enabled: true,
            requiresAuth: true,
            title: 'Démo Chiffrage',
            description: 'Outil de chiffrage automatisé pour la charpente métallique',
            features: ['Calcul automatique', 'Export PDF', 'Base de données matériaux'],
            estimatedDuration: '15-20 minutes'
        },
        dstvDemo: {
            enabled: true,
            requiresAuth: true,
            title: 'Démo DSTV',
            description: 'Interface DSTV pour machines CNC',
            features: ['Import DSTV', 'Validation automatique', 'Export machines'],
            estimatedDuration: '10-15 minutes'
        },
        productionDemo: {
            enabled: false,
            requiresAuth: true,
            title: 'Gestion Production',
            description: 'Pilotage atelier temps réel',
            features: ['Suivi temps réel', 'Tableaux de bord', 'Analytics'],
            estimatedDuration: '20-25 minutes',
            comingSoon: true
        }
    },
    
    // Configuration des notifications
    notifications: {
        duration: 5000,
        position: 'top-right',
        maxNotifications: 3,
        showIcons: true,
        enableSounds: false
    },
    
    // Analytics et tracking
    analytics: {
        enabled: false, // Activé en production
        gtag: null, // 'G-XXXXXXXXXX'
        events: {
            pageView: 'page_view',
            demoAccess: 'demo_access',
            calendlyOpen: 'calendly_opened',
            brochureDownload: 'brochure_downloaded',
            contactForm: 'contact_form_submitted'
        }
    },
    
    // Configuration des animations
    animations: {
        enabled: true,
        duration: 300,
        easing: 'ease-out',
        reducedMotion: false
    },
    
    // Configuration API
    api: {
        baseUrl: '/api/v1',
        timeout: 10000,
        retries: 3,
        endpoints: {
            auth: '/auth',
            demos: '/demos',
            contact: '/contact',
            analytics: '/analytics'
        }
    },
    
    // Configuration sécurité
    security: {
        allowedOrigins: ['https://oweo-consulting.fr', 'https://www.oweo-consulting.fr'],
        csrfProtection: true,
        maxFileSize: 10485760, // 10MB
        allowedFileTypes: ['.pdf', '.dxf', '.dwg', '.nc1']
    },
    
    // Configuration des modals
    modals: {
        closeOnBackdropClick: true,
        closeOnEscape: true,
        animationDuration: 300,
        backdrop: 'blur'
    },
    
    // Configuration du routeur
    router: {
        basePath: '/',
        hashMode: false,
        scrollToTop: true,
        transitionDuration: 250
    },
    
    // Configuration UI/UX
    ui: {
        theme: 'dark',
        primaryColor: '#00d4ff',
        secondaryColor: '#7c3aed',
        borderRadius: '12px',
        fontFamily: 'Inter, system-ui, sans-serif',
        animations: {
            stagger: 100,
            duration: 300
        }
    },
    
    // Configuration responsive
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        large: 1200,
        xlarge: 1400
    },
    
    // Configuration des formulaires
    forms: {
        validation: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[(]?[\d\s\-\(\)]{10,}$/,
            required: true
        },
        submitTimeout: 30000
    },
    
    // Messages utilisateur
    messages: {
        // Succès
        brochureDownloadSuccess: 'Téléchargement de la brochure démarré',
        calendlyOpenSuccess: 'Ouverture de la page de rendez-vous',
        demoAccessGranted: 'Accès aux démos autorisé',
        formSubmitSuccess: 'Votre message a été envoyé avec succès',
        
        // Erreurs
        brochureDownloadError: 'Erreur lors du téléchargement de la brochure',
        calendlyError: 'Impossible d\'ouvrir la planification',
        authError: 'Erreur d\'authentification',
        networkError: 'Erreur de connexion réseau',
        formValidationError: 'Veuillez corriger les erreurs dans le formulaire',
        unknownError: 'Une erreur inattendue s\'est produite',
        
        // Info
        loading: 'Chargement en cours...',
        processing: 'Traitement en cours...',
        redirecting: 'Redirection...',
        
        // Avertissements
        sessionExpiring: 'Votre session expire dans 5 minutes',
        unsavedChanges: 'Vous avez des modifications non sauvegardées',
        browserCompatibility: 'Votre navigateur pourrait ne pas supporter toutes les fonctionnalités'
    },
    
    // Configuration des actions
    actions: {
        // Action pour télécharger la brochure
        downloadBrochure: {
            url: '/assets/docs/Oweo-Solutions-ERP-Metallique.pdf',
            filename: 'Oweo-Solutions-ERP-Metallique.pdf',
            trackingEvent: 'brochure_downloaded',
            fallbackUrl: 'mailto:contact@oweo.fr?subject=Demande de brochure'
        },
        
        // Action pour ouvrir Calendly
        scheduleInterview: {
            url: 'https://calendly.com/nicolas-dubain/30min',
            widgetOptions: {
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            },
            trackingEvent: 'calendly_opened'
        },
        
        // Action pour contacter
        contact: {
            email: 'contact@oweo-consulting.fr',
            subject: 'Demande d\'information - Site web',
            trackingEvent: 'contact_clicked',
            phoneNumber: '+33686768131'
        }
    },
    
    // Configuration des démos avancée
    demoSettings: {
        autoSave: true,
        saveInterval: 30000, // 30 secondes
        maxHistory: 10,
        allowExport: true,
        watermark: true,
        sessionDuration: 1800000, // 30 minutes
        resetOnExpire: true
    },
    
    // Configuration cache
    cache: {
        enabled: true,
        duration: 300000, // 5 minutes
        maxSize: 50, // 50 éléments
        strategies: {
            api: 'network-first',
            assets: 'cache-first',
            pages: 'stale-while-revalidate'
        }
    },
    
    // Configuration des services externes
    external: {
        calendly: {
            css: 'https://assets.calendly.com/assets/external/widget.css',
            js: 'https://assets.calendly.com/assets/external/widget.js',
            enabled: true
        },
        analytics: {
            google: {
                enabled: false,
                measurementId: null
            },
            mixpanel: {
                enabled: false,
                token: null
            }
        },
        maps: {
            enabled: false,
            apiKey: null
        }
    },
    
    // Configuration développement
    development: {
        debug: false,
        logLevel: 'warn',
        mockData: false,
        hotReload: false,
        sourceMap: false
    },
    
    // Configuration performance
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        bundleSplitting: true,
        prefetchLinks: true,
        serviceWorker: false
    },
    
    // Configuration accessibilité
    accessibility: {
        announcements: true,
        highContrast: false,
        reducedMotion: 'respect-user-preference',
        focusManagement: true,
        skipLinks: true
    },
    
    // URLs et liens externes
    externalLinks: {
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        website: 'https://oweo-consulting.fr',
        support: 'mailto:contact@oweo.fr',
        documentation: 'https://docs.oweo.fr',
        blog: 'https://blog.oweo.fr',
        github: 'https://github.com/oweo'
    },
    
    // Configuration des erreurs
    errorHandling: {
        showStackTrace: false,
        logToConsole: true,
        reportToService: false,
        userFriendlyMessages: true,
        fallbackPages: {
            404: '/404.html',
            500: '/500.html',
            offline: '/offline.html'
        }
    }
};

// Auto-configuration selon l'environnement
(function initializeConfig() {
    if (typeof window === 'undefined') return;
    
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost');
    
    if (isDevelopment) {
        // Configuration développement
        window.AppConfig.environment = 'development';
        window.AppConfig.development.debug = true;
        window.AppConfig.development.logLevel = 'debug';
        window.AppConfig.analytics.enabled = false;
        window.AppConfig.errorHandling.showStackTrace = true;
        
        // URLs de développement avec fallbacks
        window.AppConfig.calendlyUrl = 'https://calendly.com/nicolas-dubain/30min';
        window.AppConfig.brochureUrl = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE93ZW8gU29sdXRpb25zIEVSUCkKL0NyZWF0b3IgKERlbW8pCi9Qcm9kdWNlciAoT3dlbyBEZW1vKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMTAxMDAwMDAwKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFs0IDAgUl0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCAzOAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKE93ZW8gLSBTb2x1dGlvbnMgRVJQKSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMTM5IDAwMDAwIG4gCjAwMDAwMDAxODYgMDAwMDAgbiAKMDAwMDAwMDI0MyAwMDAwMCBuIAowMDAwMDAwMzQzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAyIDAgUgo+PgpzdGFydHhyZWYKNDMwCiUlRU9GCg==';
        
        console.log('🔧 Development mode detected');
    } else {
        // Configuration production
        window.AppConfig.development.debug = false;
        window.AppConfig.analytics.enabled = true;
        window.AppConfig.errorHandling.reportToService = true;
        
        console.log('🚀 Production mode active');
    }
    
    // Validation de la configuration
    const requiredFields = ['appName', 'version', 'calendlyUrl'];
    const missingFields = requiredFields.filter(field => !window.AppConfig[field]);
    
    if (missingFields.length > 0) {
        console.warn('⚠️ Configuration incomplète:', missingFields);
    }
    
    console.log('✅ App Config loaded:', window.AppConfig.appName, 'v' + window.AppConfig.version);
})();