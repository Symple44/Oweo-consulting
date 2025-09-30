// ========================================
// js/pages/products.js - Page produits avec MetaSteel, MétaListe, V-Steel
// ========================================

class ProductsPage extends BasePage {
    constructor() {
        super({
            id: 'products',
            title: 'Nos Produits',
            description: 'Des solutions ERP sur mesure pour l\'industrie métallique'
        });

        this.products = [
            {
                id: 'topsteel',
                name: 'TopSteel',
                tagline: 'Solution innovante couplée à l\'IA',
                description: 'Solution ERP innovante pour gérer les entreprises de métallurgie avec un couplage natif aux intelligences artificielles. Automatisez et optimisez vos processus grâce à l\'IA.',
                icon: 'fas fa-brain',
                color: '#00d4ff',
                link: 'https://topsteel.tech/',
                features: [
                    {
                        icon: 'fas fa-robot',
                        title: 'Couplage IA Natif',
                        description: 'Intelligence artificielle intégrée pour automatiser vos processus'
                    },
                    {
                        icon: 'fas fa-calculator',
                        title: 'Chiffrage Intelligent',
                        description: 'Génération automatique de devis assistée par IA'
                    },
                    {
                        icon: 'fas fa-industry',
                        title: 'Gestion de Production',
                        description: 'Optimisation de la production avec prédictions IA'
                    },
                    {
                        icon: 'fas fa-cogs',
                        title: 'Interface DSTV',
                        description: 'Connexion native avec vos machines CNC'
                    },
                    {
                        icon: 'fas fa-chart-network',
                        title: 'Analytics Avancés',
                        description: 'Analyses prédictives et recommandations IA'
                    },
                    {
                        icon: 'fas fa-comments',
                        title: 'Assistant Virtuel',
                        description: 'Chat IA pour répondre à vos questions métier'
                    }
                ],
                benefits: [
                    'Automatisation intelligente des tâches répétitives',
                    'Prédictions précises pour optimiser la planification',
                    'Réduction des erreurs grâce à l\'IA',
                    'Solution innovante à la pointe de la technologie'
                ],
                technologies: ['IA', 'Machine Learning', 'Python', 'Cloud', 'DSTV'],
                cta: {
                    primary: 'Visiter TopSteel',
                    secondary: 'Demander une démo'
                }
            },
            {
                id: 'metaliste',
                name: 'MétaListe',
                tagline: 'L\'annuaire de la métallurgie française',
                description: 'Annuaire digital complet dédié à l\'industrie métallurgique française. Découvrez et connectez-vous avec plus de 3 200 entreprises, 55+ solutions logicielles et 120 organisations professionnelles.',
                icon: 'fas fa-building',
                color: '#7c3aed',
                link: 'https://metaliste.info/',
                features: [
                    {
                        icon: 'fas fa-building',
                        title: '3 200+ Entreprises',
                        description: 'Base de données complète des acteurs de la métallurgie'
                    },
                    {
                        icon: 'fas fa-laptop-code',
                        title: '55+ Solutions Logicielles',
                        description: 'Catalogue des logiciels spécialisés pour la métallurgie'
                    },
                    {
                        icon: 'fas fa-users',
                        title: '120 Organisations',
                        description: 'Syndicats, fédérations et associations professionnelles'
                    },
                    {
                        icon: 'fas fa-calendar-alt',
                        title: '150 Événements',
                        description: 'Agenda complet des salons et événements du secteur'
                    },
                    {
                        icon: 'fas fa-search',
                        title: 'Recherche Avancée',
                        description: 'Filtres intelligents pour trouver les bons contacts'
                    },
                    {
                        icon: 'fas fa-shield-check',
                        title: 'Données Vérifiées',
                        description: 'Informations régulièrement mises à jour et validées'
                    }
                ],
                benefits: [
                    'Accès centralisé à tout l\'écosystème métallurgique',
                    'Gain de temps dans la recherche de partenaires',
                    'Mise en réseau facilitée avec les acteurs du secteur',
                    'Veille sectorielle simplifiée'
                ],
                technologies: ['Annuaire Digital', 'Base de Données', 'Moteur de Recherche'],
                cta: {
                    primary: 'Accéder à MétaListe',
                    secondary: 'En savoir plus'
                }
            },
            {
                id: 'vsteel',
                name: 'V-Steel',
                tagline: 'Gestion de production métallurgique',
                description: 'Partenariat avec Vega PM pour le déploiement en France de V-Steel, logiciel de gestion de production pour l\'industrie métallurgique. Optimisez vos flux et votre productivité.',
                icon: 'fas fa-industry',
                color: '#f59e0b',
                link: 'https://vega.pro/',
                isPartnership: true,
                features: [
                    {
                        icon: 'fas fa-industry',
                        title: 'Optimisation Production',
                        description: 'Optimisation des processus de production métallurgique'
                    },
                    {
                        icon: 'fas fa-clock',
                        title: 'Suivi Temps Réel',
                        description: 'Suivi en temps réel des flux de production'
                    },
                    {
                        icon: 'fas fa-cogs',
                        title: 'Compatible CNC',
                        description: 'Compatible avec les machines à commande numérique'
                    },
                    {
                        icon: 'fas fa-users-cog',
                        title: 'Optimisation Charge',
                        description: 'Optimisation de la charge de travail du personnel'
                    },
                    {
                        icon: 'fas fa-tools',
                        title: 'Installation & Config',
                        description: 'Installation et configuration complète assurée'
                    },
                    {
                        icon: 'fas fa-headset',
                        title: 'Support Dédié',
                        description: 'Formation, support technique et maintenance continue'
                    }
                ],
                benefits: [
                    'Amélioration significative de l\'efficacité production',
                    'Déploiement et support assurés en France',
                    'Solution éprouvée pour PME et grandes entreprises',
                    'Interfaces personnalisées selon vos besoins'
                ],
                technologies: ['Logiciel Production', 'Gestion Flux', 'Intégration CNC'],
                cta: {
                    primary: 'Découvrir V-Steel',
                    secondary: 'Demander un déploiement'
                },
                partner: 'Vega PM'
            }
        ];
    }

    getTemplate() {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const selectedProduct = urlParams.get('product');

        if (selectedProduct) {
            return this.getProductDetailTemplate(selectedProduct);
        }

        return `
            <div class="products-page">
                <!-- Page Header -->
                <section class="page-header products-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <button type="button" class="breadcrumb-link" data-page="home">Accueil</button>
                            <i class="fas fa-chevron-right"></i>
                            <span>Nos Produits</span>
                        </div>

                        <h1 class="page-title fade-in-up">Nos Produits</h1>
                        <p class="page-description fade-in-up">
                            Des solutions ERP sur mesure pour transformer votre industrie métallique
                        </p>
                    </div>
                </section>

                <!-- Products Grid -->
                <section class="section products-grid-section">
                    <div class="container">
                        <div class="products-grid">
                            ${this.products.map(product => this.renderProductCard(product)).join('')}
                        </div>
                    </div>
                </section>

                <!-- Why Choose Section -->
                <section class="section why-choose-section">
                    <div class="container">
                        <div class="section-header text-center">
                            <h2 class="section-title fade-in-up">Pourquoi Choisir Nos Produits ?</h2>
                            <p class="section-description fade-in-up">
                                Des solutions pensées par et pour les professionnels de la métallurgie
                            </p>
                        </div>

                        <div class="why-choose-grid">
                            <div class="why-item fade-in-up">
                                <div class="why-icon">
                                    <i class="fas fa-industry"></i>
                                </div>
                                <h3>Expertise Métier</h3>
                                <p>Développé avec des professionnels de la métallurgie pour répondre aux vrais besoins du terrain</p>
                            </div>

                            <div class="why-item fade-in-up">
                                <div class="why-icon">
                                    <i class="fas fa-puzzle-piece"></i>
                                </div>
                                <h3>Modulaire</h3>
                                <p>Choisissez les modules dont vous avez besoin et évoluez à votre rythme</p>
                            </div>

                            <div class="why-item fade-in-up">
                                <div class="why-icon">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <h3>Support Dédié</h3>
                                <p>Accompagnement personnalisé et support technique réactif</p>
                            </div>

                            <div class="why-item fade-in-up">
                                <div class="why-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <h3>Sécurité & Fiabilité</h3>
                                <p>Hébergement sécurisé et sauvegardes automatiques de vos données</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2 class="cta-title fade-in-up">
                                Prêt à transformer votre activité ?
                            </h2>
                            <p class="fade-in-up">
                                Discutons de vos besoins et trouvons ensemble la solution adaptée
                            </p>
                            <div class="cta-actions fade-in-up">
                                <button class="btn btn-primary btn-lg" data-page="contact">
                                    <i class="fas fa-calendar"></i>
                                    Demander une démonstration
                                </button>
                                <button class="btn btn-outline btn-lg" data-page="contact">
                                    <i class="fas fa-phone"></i>
                                    Nous contacter
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    renderProductCard(product) {
        return `
            <div class="product-card fade-in-up" data-product="${product.id}" style="--product-color: ${product.color}">
                <div class="product-card-header">
                    <div class="product-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <div class="product-badge">
                        <span>${product.isPartnership ? 'Partenaire' : 'Solution'}</span>
                    </div>
                </div>

                <div class="product-card-body">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-tagline">${product.tagline}</p>
                    <p class="product-description">${product.description}</p>

                    <div class="product-features-preview">
                        ${product.features.slice(0, 3).map(feature => `
                            <div class="feature-preview-item">
                                <i class="${feature.icon}"></i>
                                <span>${feature.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="product-card-footer">
                    ${product.link ? `
                        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
                            <span>Visiter ${product.name}</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : `
                        <button class="btn btn-primary btn-block product-detail-btn" data-product="${product.id}">
                            <span>Découvrir ${product.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    getProductDetailTemplate(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            return this.getTemplate();
        }

        return `
            <div class="product-detail-page">
                <!-- Product Hero -->
                <section class="product-hero" style="--product-color: ${product.color}">
                    <div class="container">
                        <button class="back-btn" data-action="back">
                            <i class="fas fa-arrow-left"></i>
                            Retour aux produits
                        </button>

                        <div class="product-hero-content">
                            <div class="product-hero-text">
                                <div class="product-hero-icon">
                                    <i class="${product.icon}"></i>
                                </div>
                                ${product.isPartnership ? '<span class="partnership-badge"><i class="fas fa-handshake"></i> Partenariat avec ' + product.partner + '</span>' : ''}
                                <h1 class="product-hero-title">${product.name}</h1>
                                <p class="product-hero-tagline">${product.tagline}</p>
                                <p class="product-hero-description">${product.description}</p>

                                <div class="product-hero-actions">
                                    ${product.link ? `
                                        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
                                            <i class="fas fa-external-link-alt"></i>
                                            ${product.cta.primary}
                                        </a>
                                    ` : `
                                        <button class="btn btn-primary btn-lg" data-page="contact">
                                            <i class="fas fa-rocket"></i>
                                            ${product.cta.primary}
                                        </button>
                                    `}
                                    <button class="btn btn-outline btn-lg" data-page="contact">
                                        <i class="fas fa-phone"></i>
                                        ${product.cta.secondary}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features -->
                <section class="section product-features-section">
                    <div class="container">
                        <h2 class="section-title">Fonctionnalités Principales</h2>
                        <div class="features-grid">
                            ${product.features.map(feature => `
                                <div class="feature-card fade-in-up">
                                    <div class="feature-icon">
                                        <i class="${feature.icon}"></i>
                                    </div>
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Benefits -->
                <section class="section product-benefits-section">
                    <div class="container">
                        <h2 class="section-title">Bénéfices Concrets</h2>
                        <div class="benefits-list">
                            ${product.benefits.map(benefit => `
                                <div class="benefit-item fade-in-up">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${benefit}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Technologies -->
                <section class="section product-tech-section">
                    <div class="container">
                        <h2 class="section-title">Technologies Utilisées</h2>
                        <div class="tech-badges">
                            ${product.technologies.map(tech => `
                                <span class="tech-badge">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- CTA -->
                <section class="cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2 class="cta-title">Intéressé par ${product.name} ?</h2>
                            <p>${product.link ? 'Visitez le site officiel ou contactez-nous pour en savoir plus' : 'Contactez-nous pour une démonstration personnalisée'}</p>
                            <div class="cta-actions">
                                ${product.link ? `
                                    <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
                                        <i class="fas fa-external-link-alt"></i>
                                        Visiter le site
                                    </a>
                                ` : ''}
                                <button class="btn btn-outline btn-lg" data-page="contact">
                                    <i class="fas fa-phone"></i>
                                    Nous contacter
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    bindEvents() {
        super.bindEvents();

        // Navigation breadcrumb
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link[data-page]');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });

        // Product detail buttons
        const detailButtons = document.querySelectorAll('.product-detail-btn');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.product;
                window.location.hash = `#products?product=${productId}`;
                window.location.reload();
            });
        });

        // Back button
        const backBtn = document.querySelector('[data-action="back"]');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('products');
            });
        }

        // CTA buttons
        const ctaButtons = document.querySelectorAll('[data-page="contact"]');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('contact');
            });
        });
    }

    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
}

// Exposer la classe
window.ProductsPage = ProductsPage;