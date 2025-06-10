// ========================================
// js/config/app-config.js - Configuration application corrigée
// ========================================

// Importer les informations centralisées (à charger avant ce fichier)
// <script src="js/config/company-info.js"></script>

window.AppConfig = {
    // Configuration de base
    appName: 'Oweo',
    version: '1.0.0',
    environment: 'production',
    
    // URLs d'actions (utilisation des infos centralisées)
    get calendlyUrl() {
        return window.CompanyInfo?.urls.calendly || 'https://calendly.com/nicolas-dubain/30min';
    },
    brochureUrl: '/assets/docs/Oweo-Solutions-ERP-Metallique.pdf',
    
    // Configuration de contact (référence centralisée)
    get contact() {
        if (window.CompanyInfo) {
            return {
                email: window.CompanyInfo.contact.email,
                phone: window.CompanyInfo.contact.phone,
                phoneFormatted: window.CompanyInfo.contact.phoneFormatted,
                address: window.CompanyInfo.address.full,
                linkedin: window.CompanyInfo.social.linkedin,
                website: window.CompanyInfo.urls.website
            };
        }
        // Fallback si CompanyInfo pas chargé
        return {
            email: 'contact@oweo-consulting.fr',
            phone: '+33 6 86 76 81 31',
            phoneFormatted: '06 86 76 81 31',
            address: 'Nantes, France',
            linkedin: 'https://linkedin.com/company/oweo-consulting',
            website: 'https://oweo-consulting.fr'
        };
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
        get allowedOrigins() {
            const website = window.CompanyInfo?.urls.website || 'https://oweo-consulting.fr';
            return [website, `www.${website.replace('https://', '')}`];
        },
        csrfProtection: true,
        maxFileSize: 10485760, // 10MB
        allowedFileTypes: ['.pdf', '.dxf', '.dwg', '.nc1']
    },
    
    // Messages utilisateur
    messages: {
        // Succès
        brochureDownloadSuccess: 'Téléchargement de la brochure démarré',
        calendlyOpenSuccess: 'Ouverture de la planification de rendez-vous',
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
    
    // Configuration des actions (utilisation des infos centralisées)
    actions: {
        // Action pour télécharger la brochure
        downloadBrochure: {
            url: '/assets/docs/Oweo-Solutions-ERP-Metallique.pdf',
            filename: 'Oweo-Solutions-ERP-Metallique.pdf',
            trackingEvent: 'brochure_downloaded',
            get fallbackUrl() {
                const email = window.CompanyInfo?.contact.email || 'contact@oweo-consulting.fr';
                return `mailto:${email}?subject=Demande de brochure`;
            }
        },
        
        // Action pour ouvrir Calendly
        scheduleInterview: {
            get url() {
                return window.CompanyInfo?.urls.calendly || 'https://calendly.com/nicolas-dubain/30min';
            },
            widgetOptions: {
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            },
            trackingEvent: 'calendly_opened'
        },
        
        // Action pour contacter
        contact: {
            get email() {
                return window.CompanyInfo?.contact.email || 'contact@oweo-consulting.fr';
            },
            subject: 'Demande d\'information - Site web',
            trackingEvent: 'contact_clicked',
            get phoneNumber() {
                return window.CompanyInfo?.contact.phone || '+33686768131';
            }
        }
    },
    
    // URLs et liens externes (référence centralisée)
    get externalLinks() {
        if (window.CompanyInfo) {
            return {
                linkedin: window.CompanyInfo.social.linkedin,
                website: window.CompanyInfo.urls.website,
                support: `mailto:${window.CompanyInfo.contact.email}`,
                documentation: window.CompanyInfo.urls.docs,
                blog: window.CompanyInfo.urls.blog
            };
        }
        // Fallback
        return {
            linkedin: 'https://linkedin.com/company/oweo-consulting',
            website: 'https://oweo-consulting.fr',
            support: 'mailto:contact@oweo-consulting.fr',
            documentation: 'https://docs.oweo-consulting.fr',
            blog: 'https://blog.oweo-consulting.fr'
        };
    },
    
    // Configuration développement
    development: {
        debug: false,
        logLevel: 'warn',
        mockData: false,
        hotReload: false,
        sourceMap: false
    },
    
    // Méthode pour valider la cohérence avec CompanyInfo
    validateCompanyInfo() {
        if (!window.CompanyInfo) {
            console.warn('⚠️ CompanyInfo non chargé, utilisation des valeurs fallback');
            return false;
        }
        
        const validation = window.CompanyInfo.validate();
        if (!validation.valid) {
            console.error('❌ Configuration société invalide:', validation.issues);
            return false;
        }
        
        console.log('✅ Configuration société cohérente');
        return true;
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
        
        console.log('🔧 Development mode detected');
    } else {
        // Configuration production
        window.AppConfig.development.debug = false;
        window.AppConfig.analytics.enabled = true;
        
        console.log('🚀 Production mode active');
    }
    
    // Valider la cohérence des informations société
    setTimeout(() => {
        window.AppConfig.validateCompanyInfo();
    }, 100);
    
    console.log('✅ App Config loaded:', window.AppConfig.appName, 'v' + window.AppConfig.version);
})();