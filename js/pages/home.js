// ========================================
// js/pages/home.js - Page d'accueil
// ========================================

class HomePage extends BasePage {
    constructor() {
        super({
            id: 'home',
            title: 'Accueil',
            description: 'Développement et conseil pour l\'industrie de la charpente métallique'
        });
    }

    getTemplate() {
        return `
            <div class="home-page">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="container">
                        <div class="hero-content">
                            <div class="hero-text">
                                <p class="hero-eyebrow">Développement & Conseil - Charpente Métallique</p>
                                <h1 class="hero-title">
                                    Nous développons les <span class="text-gradient">outils métier</span>
                                    de l'industrie métallique
                                </h1>
                                <p class="hero-description">
                                    Configurateurs 3D, imbrication barres et tôles, import DSTV,
                                    génération IFC, estimation de production, BI...
                                    Nous concevons des logiciels pensés pour votre métier.
                                </p>
                                <div class="hero-actions">
                                    <button class="btn btn-primary btn-lg" data-action="contact">
                                        Parlons de votre projet
                                    </button>
                                    <button class="btn btn-outline btn-lg" data-action="services">
                                        Nos services
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Savoir-faire technique -->
                <section class="capabilities-section">
                    <div class="container">
                        <h2 class="sr-only">Notre savoir-faire technique</h2>
                        <div class="capabilities-grid">
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-cube"></i></div>
                                <h3>Configurateur 3D</h3>
                                <p>Visualisation et chiffrage de produits métalliques directement intégrés à l'ERP.</p>
                            </div>
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-cut"></i></div>
                                <h3>Imbrication</h3>
                                <p>Optimisation de la découpe barres et tôles pour réduire les chutes matière.</p>
                            </div>
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-file-import"></i></div>
                                <h3>Import DSTV</h3>
                                <p>Traitement et import de fichiers DSTV pour piloter vos machines CNC.</p>
                            </div>
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-building"></i></div>
                                <h3>Génération IFC</h3>
                                <p>Export de maquettes IFC pour l'interopérabilité BIM de vos projets.</p>
                            </div>
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-clock"></i></div>
                                <h3>Estimation production</h3>
                                <p>Calcul automatisé des temps de fabrication et workflows de production.</p>
                            </div>
                            <div class="capability-card fade-in-up">
                                <div class="cap-icon"><i class="fas fa-chart-bar"></i></div>
                                <h3>BI & Reporting</h3>
                                <p>Tableaux de bord et indicateurs métier pour piloter votre activité.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Ce qu'on fait -->
                <section class="what-we-do-section">
                    <div class="container">
                        <div class="what-we-do-layout">
                            <div class="wwd-intro fade-in-up">
                                <h2>Développement sur mesure & conseil</h2>
                                <p class="wwd-lead">
                                    Nous sommes une entreprise de développement logiciel spécialisée dans
                                    l'industrie de la charpente métallique. Nous combinons expertise technique
                                    et connaissance métier pour créer des outils qui font vraiment la différence.
                                </p>
                            </div>

                            <div class="wwd-grid">
                                <div class="wwd-card fade-in-up">
                                    <div class="wwd-card-header">
                                        <span class="wwd-number">01</span>
                                        <h3>Développement d'outils métier</h3>
                                    </div>
                                    <p>ERP, configurateur 3D, pré-dimensionnement structurel,
                                    planning de production, imbrication, traitement DSTV, IFC...</p>
                                    <ul class="wwd-points">
                                        <li>Applications métier sur mesure</li>
                                        <li>Intégration dans votre écosystème</li>
                                        <li>Connexion aux ERP existants</li>
                                    </ul>
                                </div>

                                <div class="wwd-card fade-in-up">
                                    <div class="wwd-card-header">
                                        <span class="wwd-number">02</span>
                                        <h3>Conseil & accompagnement</h3>
                                    </div>
                                    <p>Stratégie digitale, choix technologiques, reprise de données,
                                    conduite du changement, formation des équipes.</p>
                                    <ul class="wwd-points">
                                        <li>Diagnostic de l'existant</li>
                                        <li>Reprise et migration de données</li>
                                        <li>Formation et support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Trust + Clients -->
                <section class="trust-section">
                    <div class="container">
                        <div class="trust-content">
                            <div class="trust-text fade-in-up">
                                <h2>Pourquoi travailler avec nous</h2>
                                <div class="trust-points">
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-industry"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Expertise charpente métallique</h4>
                                            <p>+10 ans dans l'industrie métallurgique. On connait vos process, vos machines, vos contraintes.</p>
                                        </div>
                                    </div>
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-code"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Développeurs avant tout</h4>
                                            <p>On conçoit et développe nos outils de A à Z. On distribue aussi des solutions partenaires quand c'est pertinent.</p>
                                        </div>
                                    </div>
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-comments"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Interlocuteur unique</h4>
                                            <p>Un seul contact, de l'analyse du besoin jusqu'à la mise en production et au-delà.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Clients Section -->
                <section class="clients-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Ils nous font confiance</h2>
                        </div>
                        <div class="clients-logos fade-in-up">
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

                <!-- Contact CTA Section -->
                <section class="contact-cta">
                    <div class="container">
                        <div class="contact-content">
                            <h2 class="contact-title fade-in-up">
                                Un projet en tête ?
                            </h2>
                            <p class="fade-in-up">
                                Premier échange gratuit et sans engagement.
                            </p>
                            <div class="contact-actions fade-in-up">
                                <button class="btn btn-primary btn-lg" id="schedule-meeting-btn">
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
        this.handlePageNavigation();
        this.handleSpecificActions();
    }

    handlePageNavigation() {
        const pageLinks = document.querySelectorAll('[data-action]');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const action = link.dataset.action;
                switch(action) {
                    case 'services': this.navigateTo('services'); break;
                    case 'contact': this.navigateTo('contact'); break;
                }
            });
        });
    }

    handleSpecificActions() {
        const scheduleMeetingBtn = document.getElementById('schedule-meeting-btn');
        if (scheduleMeetingBtn) {
            scheduleMeetingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openCalendly();
            });
        }
    }

    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }

    openCalendly() {
        const config = window.AppConfig || {};
        const calendlyUrl = config.calendlyUrl || 'https://calendly.com/nicolas-dubain/30min';
        if (typeof window.Calendly !== 'undefined') {
            window.Calendly.initPopupWidget({ url: calendlyUrl, color: '#1d4ed8', textColor: '#ffffff', branding: false });
        } else {
            window.open(calendlyUrl, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
    }

    setupAnimations() {
        super.setupAnimations();
    }

    mount() {
        super.mount();
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()));
    }

    unmount() {
        super.unmount();
    }
}

window.HomePage = HomePage;
