// ========================================
// js/pages/contact.js - Page de contact
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
        this.contactInfo = window.CompanyInfo || this.getFallbackContactInfo();
    }
    
    getFallbackContactInfo() {
        return {
            contact: {
                email: 'contact@oweo-consulting.fr',
                phone: '+33 6 86 76 81 31',
                phoneFormatted: '06 86 76 81 31'
            },
            address: {
                full: 'Nantes, France'
            },
            businessHours: {
                days: 'Lundi - Vendredi',
                hours: '8h30 - 18h30'
            },
            urls: {
                calendly: 'https://calendly.com/nicolas-dubain/30min',
                linkedin: 'https://linkedin.com/company/oweo-consulting'
            }
        };
    }
    
    getTemplate() {
        return `
            <div class="page-container contact-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#" data-page="home">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Contact</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Parlons de votre projet</h1>
                        <p class="page-description fade-in-up">
                            Nos experts sont là pour vous accompagner dans votre transformation digitale. 
                            Contactez-nous pour un échange personnalisé sur vos besoins.
                        </p>
                        
                        <div class="contact-quick-actions fade-in-up">
                            <button class="btn btn-primary btn-lg" id="schedule-call-btn">
                                <i class="fas fa-calendar"></i>
                                Planifier un appel
                            </button>
                            <a href="tel:${this.contactInfo.contact.phone}" class="btn btn-outline btn-lg">
                                <i class="fas fa-phone"></i>
                                ${this.contactInfo.contact.phoneFormatted}
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
                                
                                <form id="contact-form" class="contact-form" novalidate>
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
                                                <span class="checkmark"></span>
                                                <span>J'accepte d'être contacté par Oweo concernant ma demande *</span>
                                            </label>
                                            <div class="field-error" id="consent-error"></div>
                                        </div>
                                        
                                        <div class="form-group col-span-2">
                                            <label class="checkbox-label">
                                                <input type="checkbox" 
                                                       id="contact-newsletter" 
                                                       name="newsletter">
                                                <span class="checkmark"></span>
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
                                                <a href="mailto:${this.contactInfo.contact.email}" class="method-value">
                                                    ${this.contactInfo.contact.email}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-phone"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Téléphone</div>
                                                <a href="tel:${this.contactInfo.contact.phone}" class="method-value">
                                                    ${this.contactInfo.contact.phoneFormatted}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="method-content">
                                                <div class="method-label">Localisation</div>
                                                <div class="method-value">${this.contactInfo.address.full}</div>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    ${this.contactInfo.urls.linkedin ? `
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
                                    ` : ''}
                                </div>
                                
                                <div class="contact-card">
                                    <h3>Rendez-vous en ligne</h3>
                                    <p>Planifiez directement un créneau pour échanger avec nos experts.</p>
                                    
                                    <button class="btn btn-primary btn-block" id="calendly-btn">
                                        <i class="fas fa-calendar-alt"></i>
                                        Réserver un créneau
                                    </button>
                                    
                                    <div class="calendly-info">
                                        <div class="info-item">
                                            <i class="fas fa-clock"></i>
                                            <span>30 minutes</span>
                                        </div>
                                        <div class="info-item">
                                            <i class="fas fa-video"></i>
                                            <span>Visioconférence</span>
                                        </div>
                                        <div class="info-item">
                                            <i class="fas fa-gift"></i>
                                            <span>Gratuit</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="contact-card">
                                    <h3>Diagnostic gratuit</h3>
                                    <p>Bénéficiez d'un audit gratuit de vos processus actuels.</p>
                                    
                                    <div class="diagnostic-features">
                                        <div class="feature-item">
                                            <i class="fas fa-search"></i>
                                            <span>Analyse de l'existant</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-bullseye"></i>
                                            <span>Identification des gains</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-map"></i>
                                            <span>Roadmap personnalisée</span>
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-primary btn-block" onclick="contactPageInstance.requestDiagnostic()">
                                        <i class="fas fa-play"></i>
                                        Demander un diagnostic
                                    </button>
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
                question: "Puis-je tester vos solutions ?",
                answer: "Oui, utilisez le code DEMO-CLIENT pour accéder à nos démonstrations interactives."
            },
            {
                question: "Offrez-vous un support technique ?",
                answer: "Nous proposons plusieurs niveaux de support, du support de base au support premium 24h/24."
            }
        ];
        
        return faqs.map((faq, index) => `
            <div class="faq-item fade-in-up">
                <div class="faq-question" onclick="contactPageInstance.toggleFAQ(${index})">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
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
        
        // Formulaire de contact
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Validation en temps réel
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
        
        // Boutons d'action
        const scheduleCallBtn = document.getElementById('schedule-call-btn');
        if (scheduleCallBtn) {
            scheduleCallBtn.addEventListener('click', () => this.openCalendly());
        }
        
        const calendlyBtn = document.getElementById('calendly-btn');
        if (calendlyBtn) {
            calendlyBtn.addEventListener('click', () => this.openCalendly());
        }
        
        // Analytics pour les liens de contact
        this.trackContactLinks();
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.formState.isSubmitting) return;
        
        // Validation complète
        if (!this.validateForm()) {
            return;
        }
        
        // Collecter les données
        const formData = new FormData(e.target);
        this.formState.data = Object.fromEntries(formData);
        
        // Soumettre
        this.submitForm();
    }
    
    validateForm() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        let isValid = true;
        
        // Reset des erreurs
        this.formState.errors = {};
        this.clearAllErrors();
        
        // Validation des champs requis
        this.validation.required.forEach(field => {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                this.formState.errors[field] = 'Ce champ est requis';
                this.showFieldError(field, this.formState.errors[field]);
                isValid = false;
            }
        });
        
        // Validation email
        const email = formData.get('email');
        if (email && !this.validation.email.test(email)) {
            this.formState.errors.email = 'Format d\'email invalide';
            this.showFieldError('email', this.formState.errors.email);
            isValid = false;
        }
        
        // Validation téléphone (optionnel mais si rempli)
        const phone = formData.get('phone');
        if (phone && !this.validation.phone.test(phone)) {
            this.formState.errors.phone = 'Format de téléphone invalide';
            this.showFieldError('phone', this.formState.errors.phone);
            isValid = false;
        }
        
        // Validation consentement
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
        
        // Champs requis
        if (this.validation.required.includes(name) && !value) {
            this.showFieldError(name, 'Ce champ est requis');
            return false;
        }
        
        // Email
        if (name === 'email' && value && !this.validation.email.test(value)) {
            this.showFieldError(name, 'Format d\'email invalide');
            return false;
        }
        
        // Téléphone
        if (name === 'phone' && value && !this.validation.phone.test(value)) {
            this.showFieldError(name, 'Format de téléphone invalide');
            return false;
        }
        
        // Consentement
        if (name === 'consent' && !field.checked) {
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
        
        // UI de chargement
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            // Simuler l'envoi (dans un vrai projet, appel API)
            await this.simulateFormSubmission();
            
            // Succès
            form.style.display = 'none';
            successDiv.style.display = 'block';
            
            this.formState.hasSubmitted = true;
            
            // Notification
            if (window.notifications) {
                window.notifications.success('Votre message a été envoyé avec succès !');
            }
            
            // Analytics
            this.trackFormSubmission();
            
            // Scroll vers le succès
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        } catch (error) {
            console.error('Erreur envoi formulaire:', error);
            
            // Erreur
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
        // Simuler un délai d'envoi
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('📧 Message de contact envoyé:', this.formState.data);
                resolve();
            }, 2000);
        });
    }
    
    openCalendly() {
        const calendlyUrl = this.contactInfo.urls?.calendly || 'https://calendly.com/nicolas-dubain/30min';
        
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
        
        // Analytics
        this.trackCalendlyOpen();
    }
    
    requestDiagnostic() {
        // Pré-remplir le formulaire pour un diagnostic
        const subjectSelect = document.getElementById('contact-subject');
        const messageTextarea = document.getElementById('contact-message');
        
        if (subjectSelect) {
            subjectSelect.value = 'diagnostic';
        }
        
        if (messageTextarea && !messageTextarea.value.trim()) {
            messageTextarea.value = 'Je souhaite bénéficier du diagnostic gratuit pour analyser mes processus actuels et identifier les axes d\'amélioration.';
        }
        
        // Scroll vers le formulaire
        const form = document.getElementById('contact-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Focus sur le nom
        const nameInput = document.getElementById('contact-name');
        if (nameInput) {
            setTimeout(() => nameInput.focus(), 500);
        }
    }
    
    toggleFAQ(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const question = answer.previousElementSibling;
        const icon = question.querySelector('i');
        
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
            icon.classList.add('rotate');
        }
    }
    
    trackContactLinks() {
        // Track email clicks
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
                    gtag('event', 'contact_email_clicked', {
                        event_category: 'contact',
                        event_label: 'contact_page'
                    });
                }
            });
        });
        
        // Track phone clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
                    gtag('event', 'contact_phone_clicked', {
                        event_category: 'contact',
                        event_label: 'contact_page'
                    });
                }
            });
        });
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
    }
    
    onMount() {
        super.onMount();
        
        // Exposer l'instance pour les événements onclick
        window.contactPageInstance = this;
        
        // Pré-remplir depuis les paramètres URL
        this.prefillFromURL();
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
        // Nettoyer l'instance globale
        if (window.contactPageInstance === this) {
            delete window.contactPageInstance;
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.ContactPage = ContactPage;