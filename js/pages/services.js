// ========================================
// js/pages/services.js - Page services
// ========================================

class ServicesPage extends BasePage {
    constructor() {
        super({
            id: 'services',
            title: 'Nos Services',
            description: 'Découvrez notre gamme complète de services pour transformer votre industrie métallique'
        });
        
        this.services = [
            {
                id: 'diagnostic',
                title: 'Diagnostic Gratuit',
                price: 'Gratuit',
                duration: '2h',
                description: 'Analyse complète de vos processus actuels et identification des axes d\'amélioration.',
                includes: [
                    'Audit de vos processus métier',
                    'Analyse de votre système informatique',
                    'Identification des gains potentiels',
                    'Recommandations personnalisées',
                    'Roadmap de transformation'
                ],
                deliverables: ['Rapport d\'audit', 'Plan d\'action', 'Chiffrage indicatif'],
                icon: 'fas fa-search'
            },
            {
                id: 'conseil',
                title: 'Conseil Stratégique',
                price: '2 500€',
                duration: '5 jours',
                description: 'Accompagnement stratégique pour définir votre feuille de route digitale.',
                includes: [
                    'Analyse approfondie des besoins',
                    'Définition de la stratégie digitale',
                    'Sélection des solutions adaptées',
                    'Planning de mise en œuvre',
                    'Accompagnement au changement'
                ],
                deliverables: ['Stratégie digitale', 'Cahier des charges', 'Planning projet'],
                icon: 'fas fa-lightbulb'
            },
            {
                id: 'implementation',
                title: 'Implémentation ERP',
                price: 'Sur devis',
                duration: '3-6 mois',
                description: 'Mise en place complète d\'une solution ERP adaptée à votre métier.',
                includes: [
                    'Paramétrage de la solution',
                    'Migration des données',
                    'Formation des utilisateurs',
                    'Tests et recette',
                    'Mise en production'
                ],
                deliverables: ['Solution configurée', 'Formation', 'Documentation'],
                icon: 'fas fa-cogs'
            },
            {
                id: 'developpement',
                title: 'Développement Sur Mesure',
                price: 'Sur devis',
                duration: '2-12 mois',
                description: 'Création d\'outils métier spécifiques à vos besoins uniques.',
                includes: [
                    'Analyse fonctionnelle détaillée',
                    'Développement sur mesure',
                    'Intégration avec l\'existant',
                    'Tests et validation',
                    'Maintenance évolutive'
                ],
                deliverables: ['Application métier', 'Documentation technique', 'Formation'],
                icon: 'fas fa-code'
            }
        ];
        
        this.methodology = [
            {
                step: 1,
                title: 'Diagnostic & Analyse',
                description: 'Nous analysons vos processus actuels et identifions les opportunités d\'amélioration.',
                duration: '1-2 semaines',
                activities: [
                    'Audit des processus métier',
                    'Analyse du système existant',
                    'Interviews des utilisateurs',
                    'Benchmark sectoriel'
                ]
            },
            {
                step: 2,
                title: 'Conception & Planification',
                description: 'Nous concevons la solution optimale et planifions sa mise en œuvre.',
                duration: '2-3 semaines',
                activities: [
                    'Architecture de la solution',
                    'Spécifications fonctionnelles',
                    'Planning de déploiement',
                    'Analyse des risques'
                ]
            },
            {
                step: 3,
                title: 'Développement & Configuration',
                description: 'Nous développons ou configurons la solution selon vos besoins spécifiques.',
                duration: '4-16 semaines',
                activities: [
                    'Développement/paramétrage',
                    'Tests unitaires',
                    'Intégration système',
                    'Validation qualité'
                ]
            },
            {
                step: 4,
                title: 'Déploiement & Formation',
                description: 'Nous déployons la solution et formons vos équipes à son utilisation.',
                duration: '2-4 semaines',
                activities: [
                    'Migration des données',
                    'Mise en production',
                    'Formation utilisateurs',
                    'Support au démarrage'
                ]
            },
            {
                step: 5,
                title: 'Suivi & Optimisation',
                description: 'Nous assurons le suivi et l\'optimisation continue de votre solution.',
                duration: 'Continu',
                activities: [
                    'Monitoring performance',
                    'Support technique',
                    'Évolutions fonctionnelles',
                    'Optimisations'
                ]
            }
        ];
    }
    
    getTemplate() {
        return `
            <div class="page-container services-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#" data-page="home">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Services</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Nos Services</h1>
                        <p class="page-description fade-in-up">
                            Une approche complète pour accompagner votre transformation digitale, 
                            du diagnostic initial au déploiement de solutions sur mesure.
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
                
                <!-- Methodology -->
                <section class="section methodology-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Notre Méthodologie</h2>
                            <p class="section-description fade-in-up">
                                Une approche éprouvée en 5 étapes pour garantir le succès de votre projet
                            </p>
                        </div>
                        
                        <div class="methodology-timeline">
                            ${this.methodology.map(step => this.renderMethodologyStep(step)).join('')}
                        </div>
                    </div>
                </section>
                
                <!-- Contact CTA -->
                <section class="section-lg">
                    <div class="container">
                        <div class="contact-cta fade-in-up">
                            <div class="contact-content">
                                <h2>Prêt à démarrer votre projet ?</h2>
                                <p>
                                    Contactez-nous pour un diagnostic gratuit et découvrez comment 
                                    nous pouvons transformer votre entreprise.
                                </p>
                            </div>
                            
                            <div class="contact-actions">
                                <button class="btn btn-primary btn-lg" id="contact-phone-btn">
                                    <i class="fas fa-phone"></i>
                                    01 23 45 67 89
                                </button>
                                <button class="btn btn-outline btn-lg" id="contact-email-btn">
                                    <i class="fas fa-envelope"></i>
                                    contact@oweo.fr
                                </button>
                                <button class="btn btn-outline btn-lg" id="schedule-meeting-btn">
                                    <i class="fas fa-calendar"></i>
                                    Planifier un RDV
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
                    <button class="btn btn-primary" onclick="servicesPageInstance.requestQuote('${service.id}')">
                        <i class="fas fa-paper-plane"></i>
                        Demander un devis
                    </button>
                    <button class="btn btn-outline" onclick="servicesPageInstance.learnMore('${service.id}')">
                        <i class="fas fa-info-circle"></i>
                        En savoir plus
                    </button>
                </div>
            </div>
        `;
    }
    
    renderMethodologyStep(step) {
        return `
            <div class="methodology-step fade-in-up">
                <div class="step-number">${step.step}</div>
                <div class="step-content">
                    <h3 class="step-title">${step.title}</h3>
                    <p class="step-description">${step.description}</p>
                    <div class="step-duration">Durée : ${step.duration}</div>
                    <div class="step-activities">
                        ${step.activities.map(activity => `
                            <div class="activity-item">
                                <i class="fas fa-check"></i>
                                <span>${activity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation
        const pageLinks = document.querySelectorAll('[data-page]');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Contact buttons
        const phoneBtn = document.getElementById('contact-phone-btn');
        if (phoneBtn) {
            phoneBtn.addEventListener('click', () => this.handlePhoneContact());
        }
        
        const emailBtn = document.getElementById('contact-email-btn');
        if (emailBtn) {
            emailBtn.addEventListener('click', () => this.handleEmailContact());
        }
        
        const meetingBtn = document.getElementById('schedule-meeting-btn');
        if (meetingBtn) {
            meetingBtn.addEventListener('click', () => this.scheduleMeeting());
        }
        
        // Hover effects sur les cartes de service
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    onMount() {
        super.onMount();
        
        // Exposer l'instance pour les événements onclick
        window.servicesPageInstance = this;
        
        // Animation séquentielle des étapes de méthodologie
        this.animateMethodologySteps();
    }
    
    animateMethodologySteps() {
        const steps = document.querySelectorAll('.methodology-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 200);
                }
            });
        }, {
            threshold: 0.3
        });
        
        steps.forEach(step => {
            observer.observe(step);
        });
    }
    
    requestQuote(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        
        if (!service) return;
        
        // Créer le modal de demande de devis
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: `Demande de devis - ${service.title}`,
                content: this.getQuoteFormContent(service),
                size: 'lg'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'cancel',
                    label: 'Annuler',
                    class: 'btn-outline',
                    handler: () => true
                },
                {
                    id: 'submit',
                    label: 'Envoyer la demande',
                    class: 'btn-primary',
                    icon: 'fas fa-paper-plane',
                    handler: () => this.submitQuoteRequest(modal.id, service)
                }
            ]);
            
            window.modalSystem.show(modal.id);
        }
        
        // Analytics
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('quote_requested', {
                service_id: serviceId,
                service_name: service.title
            });
        }
    }
    
    getQuoteFormContent(service) {
        return `
            <div class="quote-form">
                <div class="service-summary">
                    <div class="summary-header">
                        <div class="summary-icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <div class="summary-info">
                            <h4>${service.title}</h4>
                            <p>${service.description}</p>
                        </div>
                    </div>
                </div>
                
                <form id="quote-form">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="company-name">Nom de l'entreprise *</label>
                            <input type="text" id="company-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="contact-name">Nom du contact *</label>
                            <input type="text" id="contact-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="contact-email">Email *</label>
                            <input type="email" id="contact-email" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="contact-phone">Téléphone</label>
                            <input type="tel" id="contact-phone" class="form-control">
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label for="company-size">Taille de l'entreprise</label>
                            <select id="company-size" class="form-control">
                                <option value="">Sélectionnez...</option>
                                <option value="tpe">TPE (1-10 salariés)</option>
                                <option value="pme">PME (11-250 salariés)</option>
                                <option value="eti">ETI (251-5000 salariés)</option>
                                <option value="ge">Grande entreprise (5000+ salariés)</option>
                            </select>
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label for="project-description">Description du projet</label>
                            <textarea id="project-description" class="form-control" rows="4" 
                                      placeholder="Décrivez vos besoins, objectifs et contraintes..."></textarea>
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label for="project-timeline">Timeline souhaitée</label>
                            <select id="project-timeline" class="form-control">
                                <option value="">Sélectionnez...</option>
                                <option value="urgent">Urgent (< 1 mois)</option>
                                <option value="court">Court terme (1-3 mois)</option>
                                <option value="moyen">Moyen terme (3-6 mois)</option>
                                <option value="long">Long terme (> 6 mois)</option>
                            </select>
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label>
                                <input type="checkbox" id="accept-contact" required>
                                J'accepte d'être contacté par Oweo concernant cette demande *
                            </label>
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label>
                                <input type="checkbox" id="newsletter">
                                Je souhaite recevoir les actualités et conseils d'Oweo
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
    
    submitQuoteRequest(modalId, service) {
        const form = document.getElementById('quote-form');
        const formData = new FormData(form);
        
        // Validation simple
        const requiredFields = ['company-name', 'contact-name', 'contact-email'];
        for (const field of requiredFields) {
            if (!document.getElementById(field).value.trim()) {
                if (window.notifications) {
                    window.notifications.error('Veuillez remplir tous les champs obligatoires');
                }
                return false;
            }
        }
        
        if (!document.getElementById('accept-contact').checked) {
            if (window.notifications) {
                window.notifications.error('Veuillez accepter d\'être contacté');
            }
            return false;
        }
        
        // Simuler l'envoi
        if (window.notifications) {
            window.notifications.success(`Votre demande de devis pour "${service.title}" a été envoyée avec succès !`);
        }
        
        console.log('📧 Demande de devis envoyée:', {
            service: service.id,
            data: Object.fromEntries(formData)
        });
        
        return true; // Fermer le modal
    }
    
    learnMore(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        
        if (!service) return;
        
        // Afficher les détails dans un modal
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: service.title,
                content: this.getServiceDetailsContent(service),
                size: 'lg'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'quote',
                    label: 'Demander un devis',
                    class: 'btn-primary',
                    icon: 'fas fa-paper-plane',
                    handler: () => {
                        window.modalSystem.close(modal.id);
                        this.requestQuote(serviceId);
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
                                    <i class="fas fa-document"></i>
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="details-section">
                        <h4><i class="fas fa-info-circle"></i> Informations complémentaires</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <strong>Durée :</strong> ${service.duration}
                            </div>
                            <div class="info-item">
                                <strong>Prix :</strong> ${service.price}
                            </div>
                            <div class="info-item">
                                <strong>Support :</strong> Inclus pendant 3 mois
                            </div>
                            <div class="info-item">
                                <strong>Garantie :</strong> Satisfaction 100%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    handlePhoneContact() {
        // Tenter d'ouvrir l'application téléphone
        window.location.href = 'tel:+33123456789';
        
        if (window.notifications) {
            window.notifications.info('Appel en cours vers le 01 23 45 67 89...');
        }
    }
    
    handleEmailContact() {
        // Ouvrir le client email
        const subject = encodeURIComponent('Demande d\'information - Services Oweo');
        const body = encodeURIComponent('Bonjour,\n\nJe souhaite obtenir plus d\'informations sur vos services.\n\nCordialement,');
        
        window.location.href = `mailto:contact@oweo.fr?subject=${subject}&body=${body}`;
        
        if (window.notifications) {
            window.notifications.info('Ouverture de votre client email...');
        }
    }
    
    scheduleMeeting() {
        if (window.notifications) {
            window.notifications.info('Redirection vers le système de prise de rendez-vous...');
        }
        
        // Ici vous pourriez intégrer Calendly ou un autre système
        console.log('📅 Planification de rendez-vous demandée');
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    destroy() {
        // Nettoyer l'instance globale
        if (window.servicesPageInstance === this) {
            delete window.servicesPageInstance;
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.ServicesPage = ServicesPage;