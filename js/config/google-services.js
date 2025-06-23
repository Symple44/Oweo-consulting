// ========================================
// js/config/google-services.js - Configuration Google Analytics et Search Console
// ========================================

class GoogleServices {
    constructor() {
        this.config = {
            // Google Analytics 4
            ga4: {
                measurementId: 'G-J9QTX5G4DR', // ⚠️ À REMPLACER par votre ID GA4
                enabled: true, // Activé automatiquement en production
                cookieConsent: true,
                anonymizeIp: true,
                debugMode: false
            },
            
            // Google Tag Manager (optionnel)
            gtm: {
                containerId: 'GTM-XXXXXXX', // ⚠️ À REMPLACER si vous utilisez GTM
                enabled: false
            },
            
            // Google Search Console
            searchConsole: {
                verificationTag: 'google-site-verification=PUdCG0255qRtpK5s9G47pqVp-WT-T9Ja2z4ToQ9D8ww', 
                enabled: true
            },
            
            // Configuration par environnement
            environment: this.detectEnvironment()
        };
        
        this.initialized = false;
        this.consentGiven = false;
    }
    
    detectEnvironment() {
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'development';
        } else if (hostname.includes('staging') || hostname.includes('preprod')) {
            return 'staging';
        } else {
            return 'production';
        }
    }
    
    /**
     * Initialiser les services Google
     */
    async init() {
        console.log(`🔍 Initializing Google Services (${this.config.environment})...`);
        
        // Activer automatiquement en production
        if (this.config.environment === 'production') {
            this.config.ga4.enabled = true;
        }
        
        // Vérifier le consentement cookies
        this.checkCookieConsent();
        
        // Initialiser Search Console
        this.initSearchConsole();
        
        // Initialiser GA4 si activé et consentement donné
        if (this.config.ga4.enabled && (!this.config.ga4.cookieConsent || this.consentGiven)) {
            await this.initGA4();
        }
        
        // Initialiser GTM si activé
        if (this.config.gtm.enabled && (!this.config.ga4.cookieConsent || this.consentGiven)) {
            this.initGTM();
        }
        
        this.initialized = true;
        console.log('✅ Google Services initialized');
    }
    
    /**
     * Vérifier le consentement cookies
     */
    checkCookieConsent() {
        // Vérifier si l'utilisateur a donné son consentement
        const consent = localStorage.getItem('oweo_cookie_consent');
        this.consentGiven = consent === 'accepted';
        
        // Si pas de consentement et qu'on en a besoin, afficher la bannière
        if (!this.consentGiven && this.config.ga4.cookieConsent) {
            this.showCookieBanner();
        }
    }
    
    /**
     * Afficher la bannière de cookies
     */
    showCookieBanner() {
        // Créer une bannière simple si pas déjà présente
        if (document.getElementById('cookie-banner')) return;
        
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #1f2937;
                color: white;
                padding: 1rem;
                z-index: 10000;
                border-top: 3px solid #00d4ff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.5;">
                            🍪 Ce site utilise des cookies pour améliorer votre expérience et analyser notre trafic. 
                            <a href="#privacy" style="color: #00d4ff; text-decoration: underline;">En savoir plus</a>
                        </p>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                        <button id="cookie-accept" style="
                            background: #00d4ff;
                            color: white;
                            border: none;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 600;
                        ">Accepter</button>
                        <button id="cookie-decline" style="
                            background: transparent;
                            color: #9ca3af;
                            border: 1px solid #4b5563;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                        ">Refuser</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Gérer les clics
        document.getElementById('cookie-accept').addEventListener('click', () => {
            this.acceptCookies();
        });
        
        document.getElementById('cookie-decline').addEventListener('click', () => {
            this.declineCookies();
        });
    }
    
    /**
     * Accepter les cookies
     */
    acceptCookies() {
        localStorage.setItem('oweo_cookie_consent', 'accepted');
        this.consentGiven = true;
        this.hideCookieBanner();
        
        // Initialiser GA4 maintenant qu'on a le consentement
        if (this.config.ga4.enabled && !this.initialized) {
            this.initGA4();
        }
        
        console.log('✅ Cookies accepted');
    }
    
    /**
     * Refuser les cookies
     */
    declineCookies() {
        localStorage.setItem('oweo_cookie_consent', 'declined');
        this.consentGiven = false;
        this.hideCookieBanner();
        console.log('❌ Cookies declined');
    }
    
    /**
     * Masquer la bannière de cookies
     */
    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    /**
     * Initialiser Google Analytics 4
     */
    async initGA4() {
        if (!this.config.ga4.measurementId || this.config.ga4.measurementId === 'G-XXXXXXXXXX') {
            console.warn('⚠️ Google Analytics: Measurement ID not configured');
            return;
        }
        
        try {
            // Charger le script GA4
            await this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${this.config.ga4.measurementId}`);
            
            // Initialiser gtag
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', this.config.ga4.measurementId, {
                anonymize_ip: this.config.ga4.anonymizeIp,
                debug_mode: this.config.ga4.debugMode,
                send_page_view: false // On va gérer ça manuellement
            });
            
            console.log('✅ Google Analytics 4 initialized');
            
            // Envoyer la page vue initiale
            this.trackPageView();
            
        } catch (error) {
            console.error('❌ Failed to initialize Google Analytics:', error);
        }
    }
    
    /**
     * Initialiser Google Search Console
     */
    initSearchConsole() {
        if (!this.config.searchConsole.enabled || !this.config.searchConsole.verificationTag) {
            return;
        }
        
        // Ajouter la balise de vérification si pas déjà présente
        if (!document.querySelector('meta[name="google-site-verification"]')) {
            const meta = document.createElement('meta');
            meta.name = 'google-site-verification';
            meta.content = this.config.searchConsole.verificationTag.replace('google-site-verification=', '');
            document.head.appendChild(meta);
            
            console.log('✅ Google Search Console verification tag added');
        }
    }
    
    /**
     * Initialiser Google Tag Manager
     */
    initGTM() {
        if (!this.config.gtm.containerId || this.config.gtm.containerId === 'GTM-XXXXXXX') {
            console.warn('⚠️ Google Tag Manager: Container ID not configured');
            return;
        }
        
        // GTM script
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',this.config.gtm.containerId);
        
        console.log('✅ Google Tag Manager initialized');
    }
    
    /**
     * Tracker une page vue
     */
    trackPageView(page_title = document.title, page_location = window.location.href) {
        if (!this.config.ga4.enabled || !this.consentGiven || !window.gtag) return;
        
        gtag('event', 'page_view', {
            page_title: page_title,
            page_location: page_location,
            page_referrer: document.referrer
        });
        
        console.log(`📊 Page view tracked: ${page_title}`);
    }
    
    /**
     * Tracker un événement personnalisé
     */
    trackEvent(eventName, parameters = {}) {
        if (!this.config.ga4.enabled || !this.consentGiven || !window.gtag) return;
        
        gtag('event', eventName, parameters);
        console.log(`📊 Event tracked: ${eventName}`, parameters);
    }
    
    /**
     * Tracker les conversions importantes
     */
    trackConversion(conversionName, value = null) {
        const conversionEvents = {
            contact_form_submitted: {
                event_category: 'engagement',
                event_label: 'contact_form',
                value: value || 1
            },
            demo_requested: {
                event_category: 'engagement', 
                event_label: 'demo_request',
                value: value || 5
            },
            calendly_opened: {
                event_category: 'engagement',
                event_label: 'calendly_click',
                value: value || 3
            },
            brochure_downloaded: {
                event_category: 'engagement',
                event_label: 'brochure_download',
                value: value || 2
            }
        };
        
        const eventData = conversionEvents[conversionName];
        if (eventData) {
            this.trackEvent(conversionName, eventData);
        }
    }
    
    /**
     * Utilitaire pour charger des scripts
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    /**
     * Obtenir les métriques de performance
     */
    trackWebVitals() {
        // Core Web Vitals tracking
        if ('web-vital' in window) {
            import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
                getCLS(this.sendWebVital);
                getFID(this.sendWebVital);
                getFCP(this.sendWebVital);
                getLCP(this.sendWebVital);
                getTTFB(this.sendWebVital);
            });
        }
    }
    
    /**
     * Envoyer les métriques Web Vitals
     */
    sendWebVital = (metric) => {
        this.trackEvent('web_vital', {
            event_category: 'performance',
            event_label: metric.name,
            value: Math.round(metric.value),
            custom_parameter_1: metric.id,
            custom_parameter_2: metric.delta
        });
    }
    
    /**
     * Configuration des événements automatiques
     */
    setupAutoTracking() {
        // Tracking des clics sur liens externes
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.hostname !== window.location.hostname) {
                this.trackEvent('external_link_click', {
                    event_category: 'outbound',
                    event_label: link.href,
                    value: 1
                });
            }
        });
        
        // Tracking des téléchargements
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && /\.(pdf|doc|docx|xls|xlsx|zip)$/i.test(link.href)) {
                this.trackEvent('file_download', {
                    event_category: 'engagement',
                    event_label: link.href.split('/').pop(),
                    value: 1
                });
            }
        });
        
        // Tracking du scroll depth
        let maxScroll = 0;
        const trackScrollDepth = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                this.trackEvent('scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${scrollPercent}%`,
                    value: scrollPercent
                });
            }
        };
        
        window.addEventListener('scroll', trackScrollDepth, { passive: true });
    }
    
    /**
     * Méthodes publiques pour l'utilisation dans l'app
     */
    
    // Tracker navigation de pages SPA
    onRouteChange(page) {
        const pageTitle = `${page} - ${window.CompanyInfo?.name || 'Oweo'}`;
        const pageUrl = `${window.location.origin}/#${page}`;
        this.trackPageView(pageTitle, pageUrl);
    }
    
    // Tracker ouverture de démo
    onDemoAccess(demoId) {
        this.trackEvent('demo_access', {
            event_category: 'engagement',
            event_label: demoId,
            value: 5
        });
    }
    
    // Tracker soumission de formulaire
    onFormSubmit(formType) {
        this.trackConversion('contact_form_submitted');
    }
    
    // Tracker téléchargement brochure
    onBrochureDownload() {
        this.trackConversion('brochure_downloaded');
    }
    
    // Tracker ouverture Calendly
    onCalendlyOpen() {
        this.trackConversion('calendly_opened');
    }
}

// Initialisation automatique
window.GoogleServices = GoogleServices;

// Auto-initialisation si on est en prod
if (typeof window !== 'undefined') {
    window.googleServices = new GoogleServices();
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.googleServices.init();
        });
    } else {
        window.googleServices.init();
    }
}