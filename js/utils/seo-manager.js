// ========================================
// js/utils/seo-manager.js - Gestionnaire SEO complet
// ========================================

class SEOManager {
    constructor() {
        this.companyInfo = window.CompanyInfo || {};
        this.appConfig = window.AppConfig || {};
        this.currentPage = null;
        this.defaultMeta = this.getDefaultMeta();
    }
    
    getDefaultMeta() {
        return {
            title: `${this.companyInfo.name || 'Oweo'} - Expert ERP Charpente Métallique`,
            description: `${this.companyInfo.tagline || 'Expert en transformation digitale pour l\'industrie métallique'}. Solutions ERP sur mesure, chiffrage automatisé, interface DSTV. Accompagnement complet.`,
            keywords: [
                'ERP métallique', 'charpente métallique', 'logiciel métallurgie',
                'chiffrage automatisé', 'DSTV', 'Tekla', 'industrie 4.0',
                'transformation digitale', 'gestion production', 'Nantes',
                'OWEO', 'consultant ERP', 'développement sur mesure'
            ],
            author: this.companyInfo.fullName || 'OWEO',
            robots: 'index, follow',
            language: 'fr',
            locale: 'fr_FR',
            type: 'website',
            siteName: this.companyInfo.name || 'Oweo'
        };
    }
    
    /**
     * Mettre à jour toutes les métadonnées pour une page
     */
    updatePageSEO(pageData) {
        const meta = { ...this.defaultMeta, ...pageData };
        this.currentPage = meta;
        
        // Title
        this.updateTitle(meta.title);
        
        // Meta description
        this.updateMetaTag('description', meta.description);
        
        // Keywords
        if (meta.keywords && Array.isArray(meta.keywords)) {
            this.updateMetaTag('keywords', meta.keywords.join(', '));
        }
        
        // Author
        this.updateMetaTag('author', meta.author);
        
        // Robots
        this.updateMetaTag('robots', meta.robots);
        
        // Language
        this.updateMetaTag('language', meta.language);
        this.updateHtmlAttribute('lang', meta.language);
        
        // Open Graph
        this.updateOpenGraph(meta);
        
        // Twitter Cards
        this.updateTwitterCards(meta);
        
        // Canonical URL
        this.updateCanonical(meta.canonical || this.getCurrentURL());
        
        // Structured Data
        this.updateStructuredData(meta);
        
        // Hreflang (si multilingue)
        if (meta.hreflang) {
            this.updateHreflang(meta.hreflang);
        }
        
        console.log(`🔍 SEO updated for: ${meta.title}`);
    }
    
    /**
     * Mettre à jour le titre de la page
     */
    updateTitle(title) {
        document.title = title;
        
        // Open Graph title
        this.updateMetaProperty('og:title', title);
        
        // Twitter title
        this.updateMetaProperty('twitter:title', title);
    }
    
    /**
     * Mettre à jour une balise meta
     */
    updateMetaTag(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
    
    /**
     * Mettre à jour une balise meta property
     */
    updateMetaProperty(property, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
    
    /**
     * Mettre à jour les balises Open Graph
     */
    updateOpenGraph(meta) {
        const ogMeta = {
            'og:type': meta.type || 'website',
            'og:title': meta.title,
            'og:description': meta.description,
            'og:url': meta.canonical || this.getCurrentURL(),
            'og:site_name': meta.siteName,
            'og:locale': meta.locale || 'fr_FR',
            'og:image': meta.image || this.getDefaultImage(),
            'og:image:alt': meta.imageAlt || meta.title
        };
        
        Object.entries(ogMeta).forEach(([property, content]) => {
            if (content) {
                this.updateMetaProperty(property, content);
            }
        });
    }
    
    /**
     * Mettre à jour les Twitter Cards
     */
    updateTwitterCards(meta) {
        const twitterMeta = {
            'twitter:card': meta.twitterCard || 'summary_large_image',
            'twitter:title': meta.title,
            'twitter:description': meta.description,
            'twitter:image': meta.image || this.getDefaultImage(),
            'twitter:site': '@oweo_consulting',
            'twitter:creator': '@oweo_consulting'
        };
        
        Object.entries(twitterMeta).forEach(([name, content]) => {
            if (content) {
                this.updateMetaProperty(name, content);
            }
        });
    }
    
    /**
     * Mettre à jour l'URL canonique
     */
    updateCanonical(url) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);
    }
    
    /**
     * Mettre à jour les structured data (JSON-LD)
     */
    updateStructuredData(meta) {
        // Supprimer l'ancien script JSON-LD
        const oldScript = document.querySelector('script[type="application/ld+json"][data-seo]');
        if (oldScript) {
            oldScript.remove();
        }
        
        // Créer le nouveau structured data
        const structuredData = this.generateStructuredData(meta);
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'true');
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }
    
    /**
     * Générer les structured data selon le type de page
     */
    generateStructuredData(meta) {
        const baseData = {
            "@context": "https://schema.org",
            "@graph": [
                // Organization
                {
                    "@type": "Organization",
                    "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`,
                    "name": this.companyInfo.fullName || 'OWEO',
                    "alternateName": this.companyInfo.name || 'Oweo',
                    "description": this.companyInfo.tagline,
                    "url": this.companyInfo.urls?.website || 'https://oweo-consulting.fr',
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}/assets/images/logo.png`
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": this.companyInfo.contact?.phone,
                        "contactType": "customer service",
                        "availableLanguage": "French",
                        "areaServed": "FR"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": this.companyInfo.address?.street,
                        "addressLocality": this.companyInfo.address?.city,
                        "postalCode": this.companyInfo.address?.postalCode,
                        "addressCountry": "FR"
                    },
                    "sameAs": [
                        this.companyInfo.social?.linkedin
                    ].filter(Boolean)
                },
                
                // Website
                {
                    "@type": "WebSite",
                    "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#website`,
                    "url": this.companyInfo.urls?.website || 'https://oweo-consulting.fr',
                    "name": this.companyInfo.name || 'Oweo',
                    "description": this.companyInfo.tagline,
                    "publisher": {
                        "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
                    },
                    "inLanguage": "fr-FR"
                },
                
                // Page actuelle
                {
                    "@type": "WebPage",
                    "@id": `${meta.canonical || this.getCurrentURL()}#webpage`,
                    "url": meta.canonical || this.getCurrentURL(),
                    "name": meta.title,
                    "description": meta.description,
                    "isPartOf": {
                        "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#website`
                    },
                    "about": {
                        "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
                    },
                    "inLanguage": "fr-FR"
                }
            ]
        };
        
        // Ajouter des données spécifiques selon le type de page
        if (meta.type === 'service') {
            baseData["@graph"].push(this.generateServiceSchema(meta));
        } else if (meta.type === 'software') {
            baseData["@graph"].push(this.generateSoftwareSchema(meta));
        } else if (meta.type === 'article') {
            baseData["@graph"].push(this.generateArticleSchema(meta));
        }
        
        return baseData;
    }
    
    /**
     * Schéma pour les pages de services
     */
    generateServiceSchema(meta) {
        return {
            "@type": "Service",
            "name": meta.title,
            "description": meta.description,
            "provider": {
                "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
            },
            "serviceType": "IT Consulting",
            "category": "Software Development",
            "areaServed": "France"
        };
    }
    
    /**
     * Schéma pour les pages de logiciels
     */
    generateSoftwareSchema(meta) {
        return {
            "@type": "SoftwareApplication",
            "name": meta.title,
            "description": meta.description,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "creator": {
                "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
            }
        };
    }
    
    /**
     * Schéma pour les articles/blog
     */
    generateArticleSchema(meta) {
        return {
            "@type": "Article",
            "headline": meta.title,
            "description": meta.description,
            "author": {
                "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
            },
            "publisher": {
                "@id": `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}#organization`
            },
            "datePublished": meta.datePublished || new Date().toISOString(),
            "dateModified": meta.dateModified || new Date().toISOString(),
            "mainEntityOfPage": {
                "@id": `${meta.canonical || this.getCurrentURL()}#webpage`
            }
        };
    }
    
    /**
     * Mettre à jour les attributs HTML
     */
    updateHtmlAttribute(attribute, value) {
        if (value) {
            document.documentElement.setAttribute(attribute, value);
        }
    }
    
    /**
     * Obtenir l'URL actuelle
     */
    getCurrentURL() {
        return window.location.href;
    }
    
    /**
     * Obtenir l'image par défaut
     */
    getDefaultImage() {
        return `${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'}/assets/images/og-image.jpg`;
    }
    
    /**
     * Ajouter des liens hreflang pour le multilingue (futur)
     */
    updateHreflang(hreflangs) {
        // Supprimer les anciens liens hreflang
        const oldHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
        oldHreflangs.forEach(link => link.remove());
        
        // Ajouter les nouveaux
        Object.entries(hreflangs).forEach(([lang, url]) => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    /**
     * Optimiser les images pour le SEO
     */
    optimizeImages() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            // Ajouter un alt text basique si manquant
            if (!img.alt) {
                const src = img.src || '';
                const filename = src.split('/').pop().split('.')[0];
                img.alt = filename.replace(/[-_]/g, ' ');
            }
            
            // Ajouter loading="lazy" si pas déjà présent
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
        });
    }
    
    /**
     * Générer le sitemap dynamiquement
     */
    generateSitemap() {
        const urls = [
            { loc: '/', priority: '1.0', changefreq: 'weekly' },
            { loc: '/services', priority: '0.9', changefreq: 'monthly' },
            { loc: '/demos', priority: '0.8', changefreq: 'weekly' },
            { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
            { loc: '/cgv', priority: '0.3', changefreq: 'yearly' },
            { loc: '/legal', priority: '0.3', changefreq: 'yearly' },
            { loc: '/privacy', priority: '0.3', changefreq: 'yearly' }
        ];
        
        const baseUrl = this.companyInfo.urls?.website || 'https://oweo-consulting.fr';
        
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
    }
    
    /**
     * Générer le robots.txt
     */
    generateRobotsTxt() {
        const baseUrl = this.companyInfo.urls?.website || 'https://oweo-consulting.fr';
        
        return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin pages (if any)
Disallow: /admin/
Disallow: /private/

# Allow important resources
Allow: /css/
Allow: /js/
Allow: /assets/images/
Allow: /assets/docs/

# Host
Host: ${baseUrl.replace('https://', '')}`;
    }
    
    /**
     * Initialiser le SEO pour la page actuelle
     */
    init() {
        // Optimiser les images existantes
        this.optimizeImages();
        
        // Observer les nouvelles images
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1 && node.tagName === 'IMG') {
                                this.optimizeImages();
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        console.log('🔍 SEO Manager initialized');
    }
}

// Exposer globalement
window.SEOManager = SEOManager;