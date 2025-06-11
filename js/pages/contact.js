// ========================================
// js/pages/contact.js - Page de contact (VERSION COMPLÈTE FINALE)
// ========================================

class ContactPage extends BasePage {
    constructor() {
        super({
            id: 'contact',
            title: 'Nous Contacter',
            description: 'Prenez contact avec nos experts pour transformer votre industrie métallique'
        });
        
        // État du formulaire
        this.formState = {
            isSubmitting: false,
            hasSubmitted: false,
            errors: {},
            data: {}
        };
        
        // Configuration validation
        this.validation = {
            required: ['name', 'email', 'company', 'message'],
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[(]?[\d\s\-\(\)]{10,}$/
        };
        
        // Informations de contact centralisées
        this.contactInfo = this.getContactInfo();
    }
    
    getContactInfo() {
        // Priorité 1 : CompanyInfo (configuration centralisée)
        if (window.CompanyInfo) {
            // S'assurer que toutes les méthodes utilitaires existent
            if (!window.CompanyInfo.getFormattedPhone) {
                window.CompanyInfo.getFormattedPhone = function() { 
                    return this.contact.phoneFormatted; 
                };
            }
            if (!window.CompanyInfo.getContactEmail) {
                window.CompanyInfo.getContactEmail = function() { 
                    return this.contact.email; 
                };
            }
            if (!window.CompanyInfo.getCalendlyUrl) {
                window.CompanyInfo.getCalendlyUrl = function() { 
                    return this.urls.calendly; 
                };
            }
            if (!window.CompanyInfo.getFullAddress) {
                window.CompanyInfo.getFullAddress = function() { 
                    return this.address.full; 
                };
            }
            return window.CompanyInfo;
        }
        
        // Priorité 2 : AppConfig avec adaptation
        if (window.AppConfig && window.AppConfig.contact) {
            return this.getFallbackContactInfo();
        }
        
        // Priorité 3 : Valeurs par défaut
        return this.getFallbackContactInfo();
    }
    
    getFallbackContactInfo() {
        // Si AppConfig existe, utiliser ses valeurs
        if (window.AppConfig && window.AppConfig.contact) {
            const appContact = window.AppConfig.contact;
            return {
                contact: {
                    email: appContact.email,
                    phone: appContact.phone,
                    phoneFormatted: appContact.phoneFormatted
                },
                address: {
                    city: appContact.address?.split(',')[0]?.trim() || 'Nantes',
                    full: appContact.address
                },
                businessHours: {
                    days: 'Lundi - Vendredi',
                    hours: '8h30 - 18h30'
                },
                urls: {
                    calendly: window.AppConfig.calendlyUrl,
                    linkedin: appContact.linkedin,
                    website: appContact.website
                },
                social: {
                    linkedin: appContact.linkedin
                },
                getFormattedPhone: function() { return this.contact.phoneFormatted; },
                getContactEmail: function() { return this.contact.email; },
                getCalendlyUrl: function() { return this.urls.calendly; },
                getFullAddress: function() { return this.address.full; }
            };
        }
        
        // Fallback par défaut si aucune config n'est disponible
        return {
            contact: {
                email: 'contact@oweo-consulting.fr',
                phone: '+33 6 86 76 81 31',
                phoneFormatted: '06 86 76 81 31'
            },
            address: {
                city: 'Nantes',
                full: 'Nantes, France'
            },
            businessHours: {
                days: 'Lundi - Vendredi',
                hours: '8h30 - 18h30'
            },
            urls: {
                calendly: 'https://calendly.com/nicolas-dubain/30min',
                linkedin: 'https://linkedin.com/company/oweo-consulting'
            },
            social: {
                linkedin: 'https://linkedin.com/company/oweo-consulting'
            },
            getFormattedPhone: function() { return this.contact.phoneFormatted; },
            getContactEmail: function() { return this.contact.email; },
            getCalendlyUrl: function() { return this.urls.calendly; },
            getFullAddress: function() { return this.address.full; }
        };
    }
    
    getBusinessStatusHTML() {
        if (!this.contactInfo.isOpenNow || !this.contactInfo.getBusinessStatus) {
            return ''; // Pas de statut si les méthodes n'existent pas
        }
        
        const isOpen = this.contactInfo.isOpenNow();
        const status = this.contactInfo.getBusinessStatus();
        
        return `
            <div class="business-status ${isOpen ? 'open' : 'closed'}">
                <span class="status-indicator"></span>
                <span class="status-text">${status}</span>
                ${!isOpen && this.contactInfo.businessHours.closedMessage ? 
                    `<p class="status-message">${this.contactInfo.businessHours.closedMessage}</p>` : 
                    ''
                }
            </div>
        `;
    }
    
    getTemplate() {
        return `
            <div class="page-container contact-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="javascript:void(0)" onclick="contactPageInstance.navigateTo('home')">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Contact</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Parlons de votre projet</h1>
                        <p class="page-description fade-in-up">
                            Nos experts sont là pour vous accompagner dans votre transformation digitale. 
                            Contactez-nous pour un échange personnalisé sur vos besoins.
                        </p>
                        
                        <div class="contact-quick-actions fade-in-up">
                            <button type="button" class="btn btn-primary btn-lg" onclick="contactPageInstance.openCalendly()">
                                <i class="fas fa-calendar"></i>
                                Planifier un appel
                            </button>
                            <a href="tel:${this.contactInfo.contact.phone}" class="btn btn-outline btn-lg">
                                <i class="fas fa-phone"></i>
                                ${this.contactInfo.getFormattedPhone ? this.contactInfo.getFormattedPhone() : this.contactInfo.contact.phoneFormatted}
                            </a>
                        </div>
                    </div>
                </section>
                
                <!-- Contact Main -->
                <section class="section">
                    <div class="container">
                        <div class="contact-grid">
                            <!-- Formulaire de contact -->
                            <div class="contact-form-section">
                                <div class="form-header">
                                    <h2>Envoyez-nous un message</h2>
                                    <p>Décrivez-nous votre projet et nous vous recontacterons rapidement.</p>
                                </div>
                                
                                <form id="contact-form" class="contact-form" onsubmit="return false;" novalidate>
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label for="contact-name">Nom complet *</label>
                                            <input type="text" 
                                                   id="contact-name" 
                                                   name="name"
                                                   class="form-control" 
                                                   placeholder="Votre nom et prénom"
                                                   required>
                                            <div class="field-error" id="name-error"></div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-email">Email *</label>
                                            <input type="email" 
                                                   id="contact-email" 
                                                   name="email"
                                                   class="form-control" 
                                                   placeholder="votre@email.com"
                                                   required>
                                            <div class="field-error" id="email-error"></div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-phone">Téléphone</label>
                                            <input type="tel" 
                                                   id="contact-phone" 
                                                   name="phone"
                                                   class="form-control" 
                                                   placeholder="06 12 34 56 78">
                                            <div class="field-error" id="phone-error"></div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-company">Entreprise *</label>
                                            <input type="text" 
                                                   id="contact-company" 
                                                   name="company"
                                                   class="form-control" 
                                                   placeholder="Nom de votre entreprise"
                                                   required>
                                            <div class="field-error" id="company-error"></div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-role">Fonction</label>
                                            <select id="contact-role" name="role" class="form-control">
                                                <option value="">Sélectionnez votre fonction</option>
                                                <option value="dirigeant">Dirigeant / CEO</option>
                                                <option value="directeur-technique">Directeur technique</option>
                                                <option value="chef-projet">Chef de projet</option>
                                                <option value="responsable-production">Responsable production</option>
                                                <option value="responsable-informatique">Responsable informatique</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-company-size">Taille de l'entreprise</label>
                                            <select id="contact-company-size" name="company_size" class="form-control">
                                                <option value="">Sélectionnez</option>
                                                <option value="tpe">TPE (1-10 salariés)</option>
                                                <option value="pme">PME (11-250 salariés)</option>
                                                <option value="eti">ETI (251-5000 salariés)</option>
                                                <option value="ge">Grande entreprise (5000+ salariés)</option>
                                            </select>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label for="contact-subject">Sujet</label>
                                            <select id="contact-subject" name="subject" class="form-control">
                                                <option value="">Choisissez un sujet</option>
                                                <option value="demo">Demande de démonstration</option>
                                                <option value="diagnostic">Diagnostic gratuit</option>
                                                <option value="conseil">Conseil stratégique</option>
                                                <option value="implementation">Implémentation ERP</option>
                                                <option value="support">Support technique</option>
                                                <option value="partenariat">Partenariat</option>
                                                <option value="autre">Autre demande</option>
                                            </select>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label for="contact-message">Message *</label>
                                            <textarea id="contact-message" 
                                                      name="message"
                                                      class="form-control" 
                                                      rows="5"
                                                      placeholder="Décrivez votre projet, vos besoins ou vos questions..."
                                                      required></textarea>
                                            <div class="field-error" id="message-error"></div>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label class="checkbox-label">
                                                <input type="checkbox" 
                                                       id="contact-consent" 
                                                       name="consent"
                                                       required>
                                                <span>J'accepte d'être contacté par Oweo concernant ma demande *</span>
                                            </label>
                                            <div class="field-error" id="consent-error"></div>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label class="checkbox-label">
                                                <input type="checkbox" 
                                                       id="contact-newsletter" 
                                                       name="newsletter">
                                                <span>Je souhaite recevoir les actualités et conseils d'Oweo</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" 
                                                class="btn btn-primary btn-lg" 
                                                id="contact-submit"
                                                onclick="contactPageInstance.handleFormSubmit(event)">
                                            <i class="fas fa-paper-plane"></i>
                                            Envoyer le message
                                        </button>
                                    </div>
                                    
                                    <div class="form-success" id="form-success" style="display: none;">
                                        <div class="success-content">
                                            <i class="fas fa-check-circle"></i>
                                            <h3>Message envoyé avec succès !</h3>
                                            <p>Nous avons bien reçu votre message et vous recontacterons dans les plus brefs délais.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            <!-- Informations de contact -->
                            <div class="contact-info-section">
                                <div class="contact-card">
                                    <h3>Nos coordonnées</h3>
                                    
                                    <div class="contact-methods">
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-envelope"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Email</div>
                                                <a href="mailto:${this.contactInfo.getContactEmail ? this.contactInfo.getContactEmail() : this.contactInfo.contact.email}" class="method-value email-link">
                                                    ${this.contactInfo.getContactEmail ? this.contactInfo.getContactEmail() : this.contactInfo.contact.email}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-phone"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Téléphone</div>
                                                <a href="tel:${this.contactInfo.contact.phone}" class="method-value phone-link">
                                                    ${this.contactInfo.getFormattedPhone ? this.contactInfo.getFormattedPhone() : this.contactInfo.contact.phoneFormatted}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Localisation</div>
                                                <div class="method-value">${this.contactInfo.getFullAddress ? this.contactInfo.getFullAddress() : this.contactInfo.address.full}</div>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Horaires</div>
                                                <div class="method-value">
                                                    ${this.contactInfo.businessHours.days}<br>
                                                    ${this.contactInfo.businessHours.hours}
                                                    ${this.getBusinessStatusHTML()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    ${this.renderSocialLinks()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- FAQ Section -->
                <section class="section section-sm">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Questions fréquentes</h2>
                            <p class="section-description fade-in-up">
                                Trouvez rapidement les réponses à vos questions
                            </p>
                        </div>
                        
                        <div class="faq-grid">
                            ${this.renderFAQ()}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    renderSocialLinks() {
        // Si CompanyInfo a une méthode getSocialLinks
        if (this.contactInfo.getSocialLinks) {
            const socialLinks = this.contactInfo.getSocialLinks();
            if (socialLinks && socialLinks.length > 0) {
                const linksHTML = socialLinks.map(({network, url}) => `
                    <a href="${url}" 
                       class="social-link" 
                       target="_blank" 
                       rel="noopener"
                       title="${network.charAt(0).toUpperCase() + network.slice(1)}">
                        <i class="fab fa-${network}"></i>
                    </a>
                `).join('');
                
                return `
                    <div class="social-links">
                        <h4>Suivez-nous</h4>
                        <div class="social-links-container">
                            ${linksHTML}
                        </div>
                    </div>
                `;
            }
        }
        
        // Fallback : juste LinkedIn si disponible
        if (this.contactInfo.social?.linkedin || this.contactInfo.urls?.linkedin) {
            return `
                <div class="social-links">
                    <h4>Suivez-nous</h4>
                    <a href="${this.contactInfo.social?.linkedin || this.contactInfo.urls.linkedin}" 
                       class="social-link" 
                       target="_blank" 
                       rel="noopener"
                       title="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            `;
        }
        
        return '';
    }
    
    renderFAQ() {
        const faqs = [
            {
                question: "Combien coûte un diagnostic ?",
                answer: "Le diagnostic initial est entièrement gratuit. Il comprend une analyse de vos processus actuels et des recommandations personnalisées."
            },
            {
                question: "Combien de temps dure une implémentation ?",
                answer: "La durée varie selon la complexité du projet, généralement entre 3 et 6 mois pour une solution complète."
            },
            {
                question: "Proposez-vous de la formation ?",
                answer: "Oui, nous incluons la formation de vos équipes dans tous nos projets d'implémentation."
            },
            {
                question: "Travaillez-vous avec des PME ?",
                answer: "Absolument ! Nos solutions s'adaptent aux entreprises de toutes tailles, de la PME à la grande entreprise."
            },
            {
                question: "Comment prendre rendez-vous ?",
                answer: `Vous pouvez planifier un rendez-vous directement via notre calendrier en ligne ou nous appeler au ${this.contactInfo.contact.phoneFormatted}. Nous sommes disponibles ${this.contactInfo.businessHours.days} de ${this.contactInfo.businessHours.hours}.`
            },
            {
                question: "Intervenez-vous dans toute la France ?",
                answer: `Basés à ${this.contactInfo.address.city}, nous intervenons sur toute la France métropolitaine. Nos solutions peuvent être déployées à distance et nos équipes se déplacent selon les besoins du projet.`
            }
        ];
        
        return faqs.map((faq, index) => `
            <div class="faq-item fade-in-up">
                <button type="button" class="faq-question" onclick="contactPageInstance.toggleFAQ(${index}); return false;">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    }
    
    async onMount() {
        // Appelé par BasePage après que le DOM soit inséré
        await super.onMount(); // Appelle bindEvents() et setupAnimations()
        
        // Exposer l'instance pour les événements onclick
        window.contactPageInstance = this;
        
        // Pré-remplir depuis les paramètres URL
        this.prefillFromURL();
        
        // Mettre à jour le statut toutes les minutes si disponible
        if (this.contactInfo.isOpenNow) {
            this.statusInterval = setInterval(() => {
                this.updateBusinessStatus();
            }, 60000); // 60 secondes
        }
    }
    
    bindEvents() {
        // Cette méthode est appelée automatiquement par BasePage.onMount()
        console.log('📋 Contact page: binding events');
        
        // Validation en temps réel pour le formulaire
        const form = document.getElementById('contact-form');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }
    
    updateBusinessStatus() {
        const statusElements = document.querySelectorAll('.business-status');
        if (!statusElements.length || !this.contactInfo.isOpenNow) return;
        
        const isOpen = this.contactInfo.isOpenNow();
        const status = this.contactInfo.getBusinessStatus();
        
        statusElements.forEach(element => {
            element.className = `business-status ${isOpen ? 'open' : 'closed'}`;
            const statusText = element.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = status;
            }
        });
    }
    
    handleFormSubmit(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (this.formState.isSubmitting) return;
        
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        if (!this.validateForm()) {
            return;
        }
        
        const formData = new FormData(form);
        this.formState.data = Object.fromEntries(formData);
        
        this.submitForm();
    }
    
    validateForm() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        let isValid = true;
        
        this.formState.errors = {};
        this.clearAllErrors();
        
        this.validation.required.forEach(field => {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                this.formState.errors[field] = 'Ce champ est requis';
                this.showFieldError(field, this.formState.errors[field]);
                isValid = false;
            }
        });
        
        const email = formData.get('email');
        if (email && !this.validation.email.test(email)) {
            this.formState.errors.email = 'Format d\'email invalide';
            this.showFieldError('email', this.formState.errors.email);
            isValid = false;
        }
        
        const phone = formData.get('phone');
        if (phone && phone.trim() && !this.validation.phone.test(phone)) {
            this.formState.errors.phone = 'Format de téléphone invalide';
            this.showFieldError('phone', this.formState.errors.phone);
            isValid = false;
        }
        
        const consent = formData.get('consent');
        if (!consent) {
            this.formState.errors.consent = 'Vous devez accepter d\'être contacté';
            this.showFieldError('consent', this.formState.errors.consent);
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        
        if (this.validation.required.includes(name) && !value) {
            this.showFieldError(name, 'Ce champ est requis');
            return false;
        }
        
        if (name === 'email' && value && !this.validation.email.test(value)) {
            this.showFieldError(name, 'Format d\'email invalide');
            return false;
        }
        
        if (name === 'phone' && value && !this.validation.phone.test(value)) {
            this.showFieldError(name, 'Format de téléphone invalide');
            return false;
        }
        
        if (name === 'consent' && field.type === 'checkbox' && !field.checked) {
            this.showFieldError(name, 'Vous devez accepter d\'être contacté');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
    
    clearFieldError(field) {
        const fieldName = field.name || field.id.replace('contact-', '');
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        field.classList.remove('error');
        
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
    
    clearAllErrors() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const fields = form.querySelectorAll('.form-control');
        const errors = form.querySelectorAll('.field-error');
        
        fields.forEach(field => field.classList.remove('error'));
        errors.forEach(error => error.style.display = 'none');
    }
    
    async submitForm() {
        const submitBtn = document.getElementById('contact-submit');
        const form = document.getElementById('contact-form');
        const successDiv = document.getElementById('form-success');
        
        this.formState.isSubmitting = true;
        
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            await this.simulateFormSubmission();
            
            form.style.display = 'none';
            successDiv.style.display = 'block';
            
            this.formState.hasSubmitted = true;
            
            if (window.notifications) {
                window.notifications.success('Votre message a été envoyé avec succès !');
            }
            
            this.trackFormSubmission();
            
        } catch (error) {
            console.error('Erreur envoi formulaire:', error);
            
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            
            if (window.notifications) {
                window.notifications.error('Erreur lors de l\'envoi. Veuillez réessayer.');
            }
            
        } finally {
            this.formState.isSubmitting = false;
        }
    }
    
    async simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('📧 Message de contact envoyé:', this.formState.data);
                resolve();
            }, 2000);
        });
    }
    
    openCalendly() {
        const calendlyUrl = this.contactInfo.getCalendlyUrl ? this.contactInfo.getCalendlyUrl() : (this.contactInfo.urls?.calendly || 'https://calendly.com/nicolas-dubain/30min');
        
        if (typeof window.Calendly !== 'undefined') {
            window.Calendly.initPopupWidget({
                url: calendlyUrl,
                text: 'Planifier un appel',
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            });
        } else {
            window.open(calendlyUrl, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
        
        this.trackCalendlyOpen();
        return false; // Empêcher toute propagation
    }
    
    toggleFAQ(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const button = event ? event.currentTarget : null;
        const icon = button ? button.querySelector('i') : null;
        
        if (!answer) return;
        
        const isOpen = answer.classList.contains('open');
        
        // Fermer toutes les autres FAQ
        document.querySelectorAll('.faq-answer').forEach(el => {
            el.classList.remove('open');
        });
        document.querySelectorAll('.faq-question i').forEach(el => {
            el.classList.remove('rotate');
        });
        
        if (!isOpen) {
            answer.classList.add('open');
            if (icon) icon.classList.add('rotate');
        }
        
        return false; // Empêcher toute propagation
    }
    
    trackPhoneClick() {
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'contact_phone_clicked', {
                event_category: 'contact',
                event_label: 'contact_page'
            });
        }
    }
    
    trackEmailClick() {
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'contact_email_clicked', {
                event_category: 'contact',
                event_label: 'contact_page'
            });
        }
    }
    
    trackFormSubmission() {
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submitted', {
                event_category: 'contact',
                event_label: this.formState.data.subject || 'general',
                value: 1
            });
        }
    }
    
    trackCalendlyOpen() {
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'calendly_opened', {
                event_category: 'contact',
                event_label: 'contact_page'
            });
        }
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
        return false; // Empêcher toute propagation
    }
    
    prefillFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const subject = urlParams.get('subject');
        const source = urlParams.get('source');
        
        if (subject) {
            const subjectSelect = document.getElementById('contact-subject');
            if (subjectSelect) {
                subjectSelect.value = subject;
            }
        }
        
        if (source) {
            const messageTextarea = document.getElementById('contact-message');
            if (messageTextarea && !messageTextarea.value.trim()) {
                let prefillMessage = '';
                
                switch (source) {
                    case 'demo':
                        prefillMessage = 'Je suis intéressé par vos solutions après avoir vu les démonstrations.';
                        break;
                    case 'services':
                        prefillMessage = 'Je souhaite en savoir plus sur vos services.';
                        break;
                    default:
                        prefillMessage = `Contact depuis ${source}.`;
                }
                
                messageTextarea.value = prefillMessage;
            }
        }
    }
    
    destroy() {
        // Nettoyer le timer de statut
        if (this.statusInterval) {
            clearInterval(this.statusInterval);
        }
        
        // Nettoyer l'instance globale
        if (window.contactPageInstance === this) {
            delete window.contactPageInstance;
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.ContactPage = ContactPage;