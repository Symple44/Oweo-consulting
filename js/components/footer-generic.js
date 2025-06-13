// ========================================
// js/components/footer-generic.js - Footer avec système générique
// ========================================

class FooterGeneric extends BaseComponent {
    constructor() {
        super('footer');
        
        // Configuration du footer
        this.config = {
            company: window.CompanyInfo || {
                name: 'MonEntreprise',
                description: 'Solutions innovantes pour votre industrie',
                email: 'contact@monentreprise.com',
                phone: '+33 1 23 45 67 89'
            },
            
            links: {
                services: [
                    { text: 'Chiffrage', href: '#services/chiffrage' },
                    { text: 'Production', href: '#services/production' },
                    { text: 'Gestion Stock', href: '#services/stock' },
                    { text: 'Planning', href: '#services/planning' }
                ],
                company: [
                    { text: 'À propos', href: '#about' },
                    { text: 'Équipe', href: '#team' },
                    { text: 'Carrières', href: '#careers' },
                    { text: 'Blog', href: '#blog' }
                ],
                support: [
                    { text: 'Centre d\'aide', href: '#help' },
                    { text: 'Documentation', href: '#docs' },
                    { text: 'Contact', href: '#contact' },
                    { text: 'FAQ', href: '#faq' }
                ]
            },
            
            social: [
                { icon: 'fab fa-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: 'fab fa-twitter', href: 'https://twitter.com', label: 'Twitter' },
                { icon: 'fab fa-github', href: 'https://github.com', label: 'GitHub' },
                { icon: 'fab fa-youtube', href: 'https://youtube.com', label: 'YouTube' }
            ],
            
            badges: [
                { icon: 'fas fa-shield-alt', text: 'Sécurisé' },
                { icon: 'fas fa-check-circle', text: 'Certifié ISO' },
                { icon: 'fas fa-award', text: 'Leader 2024' }
            ]
        };
    }
    
    render() {
        return `
            <footer class="footer" id="footer">
                ${this.renderMain()}
                ${this.renderBottom()}
            </footer>
        `;
    }
    
    renderMain() {
        return `
            <div class="footer-main">
                <div class="container">
                    <div class="footer-grid">
                        ${this.renderBrand()}
                        ${this.renderLinks('Services', this.config.links.services)}
                        ${this.renderLinks('Entreprise', this.config.links.company)}
                        ${this.renderNewsletter()}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderBrand() {
        return `
            <div class="footer-brand">
                <a href="#home" class="footer-logo">
                    <div class="footer-logo-icon">
                        <i class="fas fa-industry"></i>
                    </div>
                    <span>${this.config.company.name}</span>
                </a>
                
                <p class="footer-description">
                    ${this.config.company.description}
                </p>
                
                <div class="footer-social">
                    ${this.config.social.map(social => `
                        <a href="${social.href}" 
                           class="footer-social-link" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           aria-label="${social.label}">
                            <i class="${social.icon}"></i>
                        </a>
                    `).join('')}
                </div>
                
                <div class="footer-badges">
                    ${this.config.badges.map(badge => `
                        <div class="footer-badge">
                            <i class="${badge.icon}"></i>
                            ${badge.text}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderLinks(title, links) {
        return `
            <div class="footer-column">
                <h3 class="footer-title">${title}</h3>
                <ul class="footer-links">
                    ${links.map(link => `
                        <li>
                            <a href="${link.href}" class="footer-link">
                                ${link.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    renderNewsletter() {
        return `
            <div class="footer-column">
                <div class="footer-newsletter">
                    <h3 class="footer-newsletter-title">
                        <i class="fas fa-envelope"></i>
                        Newsletter
                    </h3>
                    <p class="footer-newsletter-text">
                        Restez informé de nos dernières nouveautés
                    </p>
                    <form class="footer-newsletter-form" id="footer-newsletter-form">
                        <input 
                            type="email" 
                            class="footer-newsletter-input" 
                            placeholder="votre@email.com"
                            required
                            aria-label="Email pour newsletter"
                        >
                        <button type="submit" class="footer-newsletter-button">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
                
                <div class="footer-column mt-lg">
                    <h3 class="footer-title">Support</h3>
                    <ul class="footer-links">
                        ${this.config.links.support.map(link => `
                            <li>
                                <a href="${link.href}" class="footer-link">
                                    ${link.text}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    renderBottom() {
        const currentYear = new Date().getFullYear();
        
        return `
            <div class="footer-bottom">
                <div class="container">
                    <div class="footer-bottom-content">
                        <div class="footer-copyright">
                            © ${currentYear} ${this.config.company.name}. Tous droits réservés.
                        </div>
                        
                        <ul class="footer-legal">
                            <li>
                                <a href="#privacy" class="footer-legal-link">
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li>
                                <a href="#terms" class="footer-legal-link">
                                    Conditions d'utilisation
                                </a>
                            </li>
                            <li>
                                <a href="#cookies" class="footer-legal-link">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a href="#cgv" class="footer-legal-link">
                                    CGV
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    onMount() {
        super.onMount();
        
        // Gestion du formulaire newsletter
        const form = document.getElementById('footer-newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(e);
            });
        }
        
        // Animation au scroll pour les badges
        this.animateBadgesOnScroll();
        
        // Effet de hover sur les liens sociaux
        this.enhanceSocialLinks();
    }
    
    handleNewsletterSubmit(e) {
        const form = e.target;
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        const email = input.value;
        
        // Animation du bouton
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            // Réinitialiser le bouton
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'var(--theme-accent)';
            
            // Message de succès
            if (window.NotificationSystem) {
                window.NotificationSystem.show({
                    type: 'success',
                    message: 'Inscription réussie ! Merci de votre intérêt.',
                    duration: 3000
                });
            }
            
            // Réinitialiser le formulaire
            input.value = '';
            
            // Restaurer le bouton après 2 secondes
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-paper-plane"></i>';
                button.style.background = '';
                button.disabled = false;
            }, 2000);
            
        }, 1500);
    }
    
    animateBadgesOnScroll() {
        const badges = document.querySelectorAll('.footer-badge');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        badges.forEach(badge => {
            badge.style.transform = 'translateY(20px)';
            badge.style.opacity = '0';
            badge.style.transition = 'all 0.5s ease';
            observer.observe(badge);
        });
    }
    
    enhanceSocialLinks() {
        const socialLinks = document.querySelectorAll('.footer-social-link');
        
        socialLinks.forEach(link => {
            // Ajouter un effet de particules au hover
            link.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                this.createParticle(rect.left + rect.width / 2, rect.top);
            });
        });
    }
    
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--theme-primary);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        // Style d'animation
        if (!document.getElementById('footer-particle-style')) {
            const style = document.createElement('style');
            style.id = 'footer-particle-style';
            style.textContent = `
                @keyframes particleFloat {
                    to {
                        transform: translateY(-30px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Supprimer après l'animation
        setTimeout(() => particle.remove(), 1000);
    }
}

// Variante de footer minimal
class FooterMinimal extends FooterGeneric {
    renderMain() {
        return `
            <div class="footer-main">
                <div class="container">
                    <div class="footer-grid" style="grid-template-columns: 1fr auto;">
                        <div class="footer-brand">
                            <a href="#home" class="footer-logo">
                                <div class="footer-logo-icon">
                                    <i class="fas fa-industry"></i>
                                </div>
                                <span>${this.config.company.name}</span>
                            </a>
                            <p class="footer-description">
                                ${this.config.company.description}
                            </p>
                        </div>
                        
                        <div class="footer-social">
                            ${this.config.social.map(social => `
                                <a href="${social.href}" 
                                   class="footer-social-link" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="${social.label}">
                                    <i class="${social.icon}"></i>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Enregistrer les composants
window.FooterGeneric = FooterGeneric;
window.FooterMinimal = FooterMinimal;