// ========================================
// js/pages/products.js - Nos réalisations
// ========================================

class ProductsPage extends BasePage {
    constructor() {
        super({
            id: 'products',
            title: 'Nos Réalisations',
            description: 'Les produits et outils que nous avons développés'
        });
    }

    getTemplate() {
        return `
            <div class="products-page">
                <!-- Page Header -->
                <section class="page-header products-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <button type="button" class="breadcrumb-link" data-page="home">Accueil</button>
                            <i class="fas fa-chevron-right"></i>
                            <span>Nos Réalisations</span>
                        </div>

                        <h1 class="page-title fade-in-up">Nos réalisations</h1>
                        <p class="page-description fade-in-up">
                            Des outils conçus et développés pour l'industrie métallique.
                        </p>
                    </div>
                </section>

                <!-- TopSteel -->
                <section class="section product-highlight">
                    <div class="container">
                        <div class="product-highlight-card fade-in-up">
                            <div class="ph-header">
                                <div class="ph-badge">Développé par Oweo</div>
                                <h2>TopSteel</h2>
                                <p class="ph-tagline">ERP métallurgie couplé à l'IA</p>
                            </div>
                            <p class="ph-description">
                                Solution complète de gestion pour les entreprises de charpente métallique.
                                Chiffrage, production, configurateur 3D, pré-dimensionnement structurel,
                                interface DSTV, génération IFC, imbrication barres et tôles.
                                Couplage natif à l'intelligence artificielle.
                            </p>
                            <div class="ph-features">
                                <div class="ph-feature"><i class="fas fa-cube"></i> Configurateur 3D</div>
                                <div class="ph-feature"><i class="fas fa-ruler-combined"></i> Pré-dimensionnement</div>
                                <div class="ph-feature"><i class="fas fa-cut"></i> Imbrication</div>
                                <div class="ph-feature"><i class="fas fa-file-import"></i> Import DSTV</div>
                                <div class="ph-feature"><i class="fas fa-building"></i> Export IFC</div>
                                <div class="ph-feature"><i class="fas fa-robot"></i> Couplage IA</div>
                                <div class="ph-feature"><i class="fas fa-calculator"></i> Chiffrage auto</div>
                                <div class="ph-feature"><i class="fas fa-clock"></i> Estimation production</div>
                            </div>
                            <div class="ph-actions">
                                <a href="https://topsteel.fr" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                    Visiter topsteel.fr
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Metaliste + V-Steel -->
                <section class="section other-products">
                    <div class="container">
                        <div class="other-products-grid">
                            <!-- Metaliste -->
                            <div class="product-card-simple fade-in-up">
                                <div class="pcs-badge">Développé par Oweo</div>
                                <h3>Metaliste.info</h3>
                                <p class="pcs-tagline">Annuaire géolocalisé de la métallurgie</p>
                                <p>Plateforme de géolocalisation des entreprises de métallurgie en France.
                                Trouvez des sous-traitants, fournisseurs et partenaires près de chez vous.</p>
                                <div class="pcs-features">
                                    <span><i class="fas fa-map-marker-alt"></i> Géolocalisation</span>
                                    <span><i class="fas fa-search"></i> Recherche avancée</span>
                                    <span><i class="fas fa-building"></i> Fiches entreprises</span>
                                </div>
                                <a href="https://metaliste.info" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                                    Visiter metaliste.info
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>

                            <!-- V-Steel -->
                            <div class="product-card-simple fade-in-up">
                                <div class="pcs-badge pcs-badge-partner">Distribution partenaire</div>
                                <h3>V-Steel</h3>
                                <p class="pcs-tagline">Gestion de production métallurgique</p>
                                <p>Partenariat avec Vega PM pour le déploiement en France de V-Steel,
                                logiciel de gestion de production. Suivi temps réel, optimisation des flux,
                                compatibilité CNC.</p>
                                <div class="pcs-features">
                                    <span><i class="fas fa-industry"></i> Production</span>
                                    <span><i class="fas fa-clock"></i> Temps réel</span>
                                    <span><i class="fas fa-cogs"></i> CNC</span>
                                </div>
                                <a href="https://vega.pro/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                                    Découvrir V-Steel
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Clients -->
                <section class="section clients-section">
                    <div class="container">
                        <div class="section-header text-center">
                            <h2 class="section-title fade-in-up">Ils nous font confiance</h2>
                        </div>
                        <div class="clients-logos fade-in-up" style="justify-content:center;">
                            <div class="client-logo-item">
                                <img src="assets/images/logo-poujoulat.png" alt="Groupe Poujoulat" class="client-logo-img">
                            </div>
                            <div class="client-logo-item">
                                <img src="assets/images/logo-euro-energies.png" alt="Euro Energies" class="client-logo-img">
                            </div>
                            <div class="client-logo-item">
                                <span class="client-text-logo">Press-Steel</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA -->
                <section class="contact-cta">
                    <div class="container">
                        <div class="contact-content">
                            <h2 class="contact-title fade-in-up">Un besoin spécifique ?</h2>
                            <p class="fade-in-up">
                                Parlons de votre projet. On peut sûrement vous aider.
                            </p>
                            <div class="contact-actions fade-in-up">
                                <button class="btn btn-primary btn-lg" data-page="contact">
                                    <i class="fas fa-calendar"></i>
                                    Planifier un échange
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

        const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link[data-page]');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
            });
        });

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

window.ProductsPage = ProductsPage;
