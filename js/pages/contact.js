// ========================================
// js/pages/contact.js - Page contact avec EmailJS configuré
// ========================================

class ContactPage extends BasePage {
    constructor() {
        super({
            id: 'contact',
            title: 'Nous Contacter',
            description: 'Parlons de votre projet - Premier échange gratuit'
        });
        
        // Configuration EmailJS - VOS IDENTIFIANTS
        this.emailJS = {
            serviceId: 'service_vdnsgqj',           // Votre Service ID
            templateId: 'template_lv2fw9h',         // À REMPLACER par votre Template ID
            publicKey: 'cKnhoAohUfIlxaoKg',         // Votre clé publique
            initialized: false
        };

        this.recaptcha = {
            siteKey: '6LfwlFwrAAAAAGqiSXVELtmshYK8MrpAYbmyMc8a', // Votre clé site reCAPTCHA
            action: 'contact_form',
            minimumScore: 0.5,
            loaded: false,
            enabled: true // Mettre à false pour désactiver temporairement
        };
        
        // État du formulaire
        this.formState = {
            isSubmitting: false,
            hasSubmitted: false,
            errors: {}
        };
        
        // Informations de contact
        this.contactInfo = this.getContactInfo();
        
        // Initialiser les services
        this.initEmailJS();
        this.initRecaptcha();
    }
    
    initEmailJS() {
        // Charger le script EmailJS si pas déjà chargé
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.emailJS.publicKey);
                this.emailJS.initialized = true;
                logger.log('✅ EmailJS initialized');
            };
            script.onerror = () => {
                logger.error('Erreur chargement EmailJS');
            };
            document.head.appendChild(script);
        } else {
            emailjs.init(this.emailJS.publicKey);
            this.emailJS.initialized = true;
        }
    }

    initRecaptcha() {
        if (!this.recaptcha.enabled) {
            logger.log('🔒 reCAPTCHA désactivé');
            return;
        }
        
        // Charger reCAPTCHA v3
        if (!window.grecaptcha) {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.recaptcha.siteKey}`;
            script.onload = () => {
                this.recaptcha.loaded = true;
                logger.log('✅ reCAPTCHA v3 chargé');
            };
            script.onerror = () => {
                logger.error('Erreur chargement reCAPTCHA');
                this.recaptcha.enabled = false;
            };
            document.head.appendChild(script);
        } else {
            this.recaptcha.loaded = true;
        }
    }
    
    getContactInfo() {
        if (window.CompanyInfo) {
            return window.CompanyInfo;
        }
        
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
                hours: '14h00 - 18h00'
            },
            urls: {
                calendly: 'https://calendly.com/nicolas-dubain/30min',
                linkedin: 'https://linkedin.com/company/oweo-consulting'
            },
            getFormattedPhone: function() { return this.contact.phoneFormatted; },
            getContactEmail: function() { return this.contact.email; },
            getCalendlyUrl: function() { return this.urls.calendly; },
            getFullAddress: function() { return this.address.full; }
        };
    }
    
    getTemplate() {
        return `
            <div class="contact-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#home">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Contact</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Parlons de votre projet</h1>
                        <p class="page-description fade-in-up">
                            Premier échange gratuit et sans engagement.
                            Décrivez-nous votre besoin, on vous répond rapidement.
                        </p>
                        
                        <div class="contact-quick-actions fade-in-up">
                            <button type="button" class="btn btn-primary btn-lg" onclick="window.contactPageInstance.openCalendly()">
                                <i class="fas fa-calendar"></i>
                                Planifier un appel
                            </button>
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
                                    ${this.recaptcha.enabled ? `
                                        <div class="recaptcha-info">
                                            <i class="fas fa-shield-alt"></i>
                                            <span>Ce formulaire est protégé par reCAPTCHA</span>
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <form id="contact-form" class="contact-form">
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label for="contact-name">Nom complet *</label>
                                            <input type="text" 
                                                   id="contact-name" 
                                                   name="from_name"
                                                   class="form-control" 
                                                   placeholder="Votre nom et prénom"
                                                   required>
                                            <div class="field-error" id="name-error"></div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-email">Email *</label>
                                            <input type="email" 
                                                   id="contact-email" 
                                                   name="from_email"
                                                   class="form-control" 
                                                   placeholder="votre@email.com"
                                                   required>
                                            <div class="field-error" id="email-error"></div>
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
                                                <option value="Dirigeant / CEO">Dirigeant / CEO</option>
                                                <option value="Directeur technique">Directeur technique</option>
                                                <option value="Chef de projet">Chef de projet</option>
                                                <option value="Responsable production">Responsable production</option>
                                                <option value="Responsable informatique">Responsable informatique</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="contact-company-size">Taille de l'entreprise</label>
                                            <select id="contact-company-size" name="company_size" class="form-control">
                                                <option value="">Sélectionnez</option>
                                                <option value="TPE (1-10 salariés)">TPE (1-10 salariés)</option>
                                                <option value="PME (11-250 salariés)">PME (11-250 salariés)</option>
                                                <option value="ETI (251-5000 salariés)">ETI (251-5000 salariés)</option>
                                                <option value="Grande entreprise (5000+ salariés)">Grande entreprise (5000+ salariés)</option>
                                            </select>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label for="contact-subject">Sujet</label>
                                            <select id="contact-subject" name="subject" class="form-control">
                                                <option value="">Choisissez un sujet</option>
                                                <option value="Développement outil métier">Développement d'un outil métier</option>
                                                <option value="Conseil et accompagnement">Conseil et accompagnement</option>
                                                <option value="Demande de démonstration">Demande de démonstration</option>
                                                <option value="Support technique">Support technique</option>
                                                <option value="Partenariat">Partenariat</option>
                                                <option value="Autre">Autre</option>
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
                                        <button type="submit" 
                                                class="btn btn-primary btn-lg" 
                                                id="contact-submit">
                                            <i class="fas fa-paper-plane"></i>
                                            Envoyer le message
                                        </button>
                                    </div>
                                    
                                    ${this.recaptcha.enabled ? `
                                        <div class="recaptcha-notice">
                                            <small>
                                                Ce site est protégé par reCAPTCHA et les 
                                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Règles de confidentialité</a> 
                                                et <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Conditions d'utilisation</a> 
                                                de Google s'appliquent.
                                            </small>
                                        </div>
                                    ` : ''}
                                    
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
                                                <a href="mailto:${this.contactInfo.getContactEmail()}" class="method-value">
                                                    ${this.contactInfo.getContactEmail()}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Localisation</div>
                                                <div class="method-value">${this.contactInfo.getFullAddress()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="social-links">
                                        <h4>Suivez-nous</h4>
                                        <a href="${this.contactInfo.urls.linkedin}" 
                                           class="social-link" 
                                           target="_blank" 
                                           rel="noopener"
                                           title="LinkedIn">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
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
                answer: `Vous pouvez planifier un rendez-vous directement via notre calendrier en ligne.`
            },
            {
                question: "Intervenez-vous dans toute la France ?",
                answer: `Basés à ${this.contactInfo.address.city}, nous intervenons sur toute la France métropolitaine.`
            }
        ];
        
        return faqs.map((faq, index) => `
            <div class="faq-item fade-in-up">
                <button type="button" class="faq-question" onclick="window.contactPageInstance.toggleFAQ(${index})">
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
        await super.onMount();
        
        // Exposer l'instance pour les événements onclick
        window.contactPageInstance = this;
        
        // Attendre un peu que les services se chargent
        setTimeout(() => {
            if (!this.emailJS.initialized) {
                logger.warn('⚠️ EmailJS non initialisé, vérifiez votre connection internet');
            }
            
            if (this.recaptcha.enabled && !this.recaptcha.loaded) {
                logger.warn('⚠️ reCAPTCHA non chargé, vérifiez votre connection internet');
            }
        }, 3000);
    }
    
    bindEvents() {
        logger.log('📋 Contact page: binding events');
        
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Validation en temps réel
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.formState.isSubmitting) return;
        
        const form = e.target;
        
        if (!this.validateForm(form)) {
            return;
        }
        
        await this.submitForm(form);
    }
    
    validateForm(form) {
        let isValid = true;
        this.formState.errors = {};
        this.clearAllErrors();
        
        // Validation des champs requis
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (field.type === 'checkbox' && !field.checked) {
                this.showFieldError(field, 'Ce champ est requis');
                isValid = false;
            } else if (field.type !== 'checkbox' && !field.value.trim()) {
                this.showFieldError(field, 'Ce champ est requis');
                isValid = false;
            }
        });
        
        // Validation email
        const emailField = form.querySelector('[name="from_email"]');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                this.showFieldError(emailField, 'Format d\'email invalide');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    async getRecaptchaToken() {
        if (!this.recaptcha.enabled || !this.recaptcha.loaded || !window.grecaptcha) {
            logger.log('🔒 reCAPTCHA désactivé ou non chargé');
            return null;
        }
        
        try {
            const token = await window.grecaptcha.execute(this.recaptcha.siteKey, {
                action: this.recaptcha.action
            });
            
            logger.log('🔒 Token reCAPTCHA obtenu');
            return token;
            
        } catch (error) {
            logger.error('Erreur reCAPTCHA:', error);
            this.showNotification('Erreur de vérification de sécurité. Veuillez réessayer.', 'warning');
            return null;
        }
    }
    
    async submitForm(form) {
        // Vérifier que EmailJS est prêt
        if (!this.emailJS.initialized) {
            this.showNotification('Service d\'email en cours d\'initialisation, veuillez patienter...', 'warning');
            return;
        }
        
        if (!window.emailjs) {
            this.showNotification('Service d\'email non disponible. Veuillez réessayer.', 'error');
            return;
        }
        
        const submitBtn = document.getElementById('contact-submit');
        const successDiv = document.getElementById('form-success');
        
        this.formState.isSubmitting = true;
        
        // UI Loading
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
        
        try {
            // 1. Obtenir le token reCAPTCHA
            let recaptchaToken = null;
            if (this.recaptcha.enabled) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification de sécurité...';
                recaptchaToken = await this.getRecaptchaToken();
                
                if (this.recaptcha.enabled && !recaptchaToken) {
                    throw new Error('Échec de la vérification de sécurité');
                }
            }
            
            // 2. Préparer les données pour EmailJS
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            const formData = new FormData(form);
            const templateParams = {};
            
            // Convertir FormData en objet
            for (let [key, value] of formData.entries()) {
                if (key === 'consent' || key === 'newsletter') {
                    templateParams[key] = form.querySelector(`[name="${key}"]`).checked ? 'Oui' : 'Non';
                } else {
                    templateParams[key] = value || 'Non renseigné';
                }
            }
            
            // Ajouter des informations supplémentaires
            templateParams.date = new Date().toLocaleString('fr-FR');
            templateParams.source_page = window.location.href;
            templateParams.user_agent = navigator.userAgent;
            templateParams.recaptcha_token = recaptchaToken || 'Non disponible';
            templateParams.recaptcha_score = 'Analysé côté serveur';
            
            logger.log('📧 Envoi email avec les paramètres:', templateParams);
            
            // 3. Envoyer via EmailJS
            const response = await emailjs.send(
                this.emailJS.serviceId,
                this.emailJS.templateId,
                templateParams,
                this.emailJS.publicKey
            );
            
            logger.log('✅ Email envoyé avec succès:', response);
            
            // 4. Afficher le succès
            form.style.display = 'none';
            successDiv.style.display = 'block';
            this.formState.hasSubmitted = true;
            
            this.showNotification('Votre message a été envoyé avec succès !', 'success');
            
            // 5. Analytics
            this.trackFormSubmission(recaptchaToken ? 'with_recaptcha' : 'without_recaptcha');
            
        } catch (error) {
            logger.error('Erreur envoi email:', error);

            let errorMessage = 'Erreur lors de l\'envoi du message. ';
            
            if (error.status === 400) {
                errorMessage += 'Paramètres invalides.';
            } else if (error.status === 401) {
                errorMessage += 'Service non autorisé.';
            } else if (error.status === 402) {
                errorMessage += 'Quota d\'emails dépassé.';
            } else if (error.status === 403) {
                errorMessage += 'Accès refusé.';
            } else if (error.status === 404) {
                errorMessage += 'Service ou template non trouvé.';
            } else if (error.text) {
                errorMessage += error.text;
            } else {
                errorMessage += 'Veuillez réessayer ou nous contacter directement.';
            }
            
            this.showNotification(errorMessage, 'error');
            
            // Restaurer le bouton
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            
        } finally {
            this.formState.isSubmitting = false;
        }
    }
    
    showFieldError(field, message) {
        const fieldName = field.name.replace('from_', '');
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        field.classList.add('error');
        
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        
        this.formState.errors[field.name] = message;
    }
    
    clearFieldError(field) {
        const fieldName = field.name.replace('from_', '');
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        field.classList.remove('error');
        
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
        
        delete this.formState.errors[field.name];
    }
    
    clearAllErrors() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const fields = form.querySelectorAll('.form-control');
        const errors = form.querySelectorAll('.field-error');
        
        fields.forEach(field => field.classList.remove('error'));
        errors.forEach(error => error.style.display = 'none');
        
        this.formState.errors = {};
    }
    
    validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'Ce champ est requis');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                this.showFieldError(field, 'Format d\'email invalide');
                return false;
            }
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    showNotification(message, type = 'info') {
        if (window.notifications) {
            window.notifications[type](message);
        } else {
            alert(message);
        }
    }
    
    openCalendly() {
        const calendlyUrl = this.contactInfo.getCalendlyUrl();
        
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
        
        return false;
    }
    
    trackFormSubmission(method = 'default') {
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submitted', {
                event_category: 'contact',
                event_label: `emailjs_${method}`,
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
    
    destroy() {
        // Nettoyer l'instance globale
        if (window.contactPageInstance === this) {
            delete window.contactPageInstance;
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.ContactPage = ContactPage;