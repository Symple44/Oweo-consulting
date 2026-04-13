// ========================================
// js/pages/services.js - Page services recentrée sur conseil et développement sur mesure
// ========================================

class ServicesPage extends BasePage {
    constructor() {
        super({
            id: 'services',
            title: 'Nos Services',
            description: 'Conseil, développement sur mesure et accompagnement à la transformation digitale'
        });

        this.companyInfo = null;
        this.loadCompanyInfo();

        this.services = [
            {
                id: 'premier-echange',
                title: 'Premier échange',
                price: 'Gratuit',
                duration: '1h',
                description: 'Un premier rendez-vous pour comprendre votre contexte, vos enjeux et évaluer ensemble si et comment nous pouvons vous aider.',
                includes: [
                    'Écoute de votre besoin et de vos contraintes',
                    'Présentation de notre approche',
                    'Premiers retours et pistes de réflexion',
                    'Évaluation de la faisabilité',
                    'Proposition de prochaines étapes'
                ],
                deliverables: ['Compte-rendu d\'échange', 'Premières recommandations'],
                icon: 'fas fa-comments'
            },
            {
                id: 'conseil',
                title: 'Conseil Stratégique',
                price: 'Sur devis',
                duration: '1-4 semaines',
                description: 'Définir la bonne trajectoire digitale pour votre entreprise, en alignant technologie et objectifs métier.',
                includes: [
                    'Analyse approfondie des besoins',
                    'Définition de la stratégie digitale',
                    'Cahier des charges fonctionnel',
                    'Sélection des technologies adaptées',
                    'Conduite du changement'
                ],
                deliverables: ['Stratégie digitale', 'Cahier des charges', 'Planning projet'],
                icon: 'fas fa-compass'
            },
            {
                id: 'developpement',
                title: 'Développement d\'outils métier',
                price: 'Sur devis',
                duration: '1-12 mois',
                description: 'Configurateur 3D, imbrication, traitement DSTV, génération IFC, estimation de production, BI... On développe les outils dont votre atelier a besoin.',
                includes: [
                    'Configurateurs 3D et outils de chiffrage',
                    'Imbrication barres et tôles',
                    'Import/export DSTV, IFC, STEP',
                    'Planning et estimation de production',
                    'Tableaux de bord et BI métier'
                ],
                deliverables: ['Application métier', 'Documentation technique', 'Formation utilisateurs'],
                icon: 'fas fa-code'
            },
            {
                id: 'accompagnement',
                title: 'Accompagnement & Support',
                price: 'Sur devis',
                duration: 'Continu',
                description: 'Un suivi dans la durée pour faire évoluer vos outils et garantir leur adoption par vos équipes.',
                includes: [
                    'Formation des utilisateurs',
                    'Support technique réactif',
                    'Maintenance corrective et évolutive',
                    'Optimisation continue',
                    'Montée de version'
                ],
                deliverables: ['Support dédié', 'Mises à jour régulières', 'Rapports de suivi'],
                icon: 'fas fa-life-ring'
            }
        ];

    }

    loadCompanyInfo() {
        if (window.CompanyInfo) {
            this.companyInfo = window.CompanyInfo;
        } else {
            setTimeout(() => {
                this.companyInfo = window.CompanyInfo || this.getFallbackInfo();
            }, 100);
        }
    }

    getFallbackInfo() {
        return {
            contact: {
                email: 'contact@oweo-consulting.fr',
                phone: '+33 6 86 76 81 31',
                phoneFormatted: '06 86 76 81 31'
            },
            urls: {
                calendly: 'https://calendly.com/nicolas-dubain/30min'
            }
        };
    }

    getTemplate() {
        if (!this.companyInfo) {
            this.companyInfo = window.CompanyInfo || this.getFallbackInfo();
        }

        return `
            <div class="services-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <button type="button" class="breadcrumb-link" data-page="home">Accueil</button>
                            <i class="fas fa-chevron-right"></i>
                            <span>Services</span>
                        </div>

                        <h1 class="page-title fade-in-up">Nos services</h1>
                        <p class="page-description fade-in-up">
                            Conseil, développement d'outils métier et accompagnement
                            pour l'industrie de la charpente métallique.
                        </p>
                    </div>
                </section>

                <!-- Services Grid -->
                <section class="section">
                    <div class="container">
                        <div class="services-grid">
                            ${this.services.map(service => this.renderServiceCard(service)).join('')}
                        </div>
                    </div>
                </section>

                <!-- Contact CTA -->
                <section class="contact-cta">
                    <div class="container">
                        <div class="contact-content">
                            <h2 class="contact-title fade-in-up">
                                Prêt à lancer votre projet ?
                            </h2>
                            <p class="fade-in-up">
                                Échangeons sur vos besoins. Premier entretien gratuit et sans engagement.
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

    renderServiceCard(service) {
        return `
            <div class="service-card fade-in-up" data-service="${service.id}">
                <div class="service-header">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <div class="service-meta">
                        <div class="service-price">${service.price}</div>
                        <div class="service-duration">${service.duration}</div>
                    </div>
                </div>

                <div class="service-content">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>

                    <div class="service-includes">
                        <h4>Ce qui est inclus :</h4>
                        <ul class="service-includes-list">
                            ${service.includes.map(item => `
                                <li>
                                    <i class="fas fa-check"></i>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="service-deliverables">
                        <h4>Livrables :</h4>
                        <div class="deliverables-tags">
                            ${service.deliverables.map(item => `
                                <span class="deliverable-tag">${item}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="service-actions">
                    <button type="button" class="btn btn-primary contact-btn" data-page="contact">
                        Nous contacter
                    </button>
                </div>
            </div>
        `;
    }


    bindEvents() {
        super.bindEvents();

        const container = document.querySelector('.services-page');
        if (container) {
            const breadcrumbLinks = container.querySelectorAll('.breadcrumb-link[data-page]');
            breadcrumbLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const page = link.dataset.page;
                    this.navigateTo(page);
                });
            });

            const contactButtons = container.querySelectorAll('.contact-btn');
            contactButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.navigateTo('contact');
                });
            });

            this.handleSpecificActions();
        }
    }

    onMount() {
        super.onMount();

        if (!this.companyInfo) {
            this.companyInfo = window.CompanyInfo || this.getFallbackInfo();
        }

    }

    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
            return;
        }
        if (window.app && window.app.eventBus) {
            window.app.eventBus.emit('navigate', { page });
            return;
        }
        window.location.hash = `#${page}`;
    }


    learnMore(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: service.title,
                content: this.getServiceDetailsContent(service),
                size: 'lg'
            });

            window.modalSystem.addActions(modal.id, [
                {
                    id: 'contact',
                    label: 'Nous contacter',
                    class: 'btn-primary',
                    icon: 'fas fa-envelope',
                    handler: () => {
                        window.modalSystem.close(modal.id);
                        this.navigateTo('contact');
                        return false;
                    }
                },
                {
                    id: 'close',
                    label: 'Fermer',
                    class: 'btn-outline',
                    handler: () => true
                }
            ]);

            window.modalSystem.show(modal.id);
        }
    }

    getServiceDetailsContent(service) {
        return `
            <div class="service-details">
                <div class="service-overview">
                    <div class="overview-header">
                        <div class="overview-icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <div class="overview-info">
                            <div class="overview-meta">
                                <span class="price">${service.price}</span>
                                <span class="duration">${service.duration}</span>
                            </div>
                        </div>
                    </div>
                    <p class="overview-description">${service.description}</p>
                </div>

                <div class="service-sections">
                    <div class="details-section">
                        <h4><i class="fas fa-check-circle"></i> Ce qui est inclus</h4>
                        <ul class="details-list">
                            ${service.includes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="details-section">
                        <h4><i class="fas fa-file-alt"></i> Livrables</h4>
                        <div class="deliverables-grid">
                            ${service.deliverables.map(item => `
                                <div class="deliverable-item">
                                    <i class="fas fa-file"></i>
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
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

    openCalendly() {
        const config = window.AppConfig || {};
        const calendlyUrl = config.calendlyUrl || 'https://calendly.com/nicolas-dubain/30min';

        if (typeof window.Calendly !== 'undefined') {
            window.Calendly.initPopupWidget({
                url: calendlyUrl,
                text: 'Planifier un échange',
                color: '#1d4ed8',
                textColor: '#ffffff',
                branding: false
            });
        } else {
            window.open(calendlyUrl, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
    }

    destroy() {
        super.destroy();
    }
}

window.ServicesPage = ServicesPage;
