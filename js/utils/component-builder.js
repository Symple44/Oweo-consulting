// ========================================
// js/utils/component-builder.js - Constructeur de composants simplifiés
// ========================================

class ComponentBuilder {
    // ========================================
    // CARTES
    // ========================================
    
    static card(options = {}) {
        const {
            title,
            content,
            icon,
            variant = '',
            hover = true,
            glow = false,
            badge,
            actions,
            className = ''
        } = options;
        
        const classes = ['card'];
        if (hover) classes.push('card--hover');
        if (glow) classes.push('card--glow');
        if (variant) classes.push(`card--${variant}`);
        if (className) classes.push(className);
        
        return `
            <div class="${classes.join(' ')}">
                ${icon ? `
                    <div class="icon-box icon-box--${variant || 'primary'} mb-lg">
                        <i class="${icon}"></i>
                    </div>
                ` : ''}
                
                ${title ? `<h3 class="text-xl font-semibold mb-sm">${title}</h3>` : ''}
                
                ${content ? `<p class="text-secondary mb-lg">${content}</p>` : ''}
                
                ${badge ? `
                    <span class="badge badge--${badge.variant || 'primary'}">
                        ${badge.icon ? `<i class="${badge.icon}"></i>` : ''}
                        ${badge.text}
                    </span>
                ` : ''}
                
                ${actions ? `
                    <div class="mt-lg">
                        ${actions.map(action => this.button(action)).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // ========================================
    // BOUTONS
    // ========================================
    
    static button(options = {}) {
        const {
            text,
            icon,
            variant = 'primary',
            size = '',
            href,
            onclick,
            className = ''
        } = options;
        
        const classes = ['btn', `btn--${variant}`];
        if (size) classes.push(`btn--${size}`);
        if (className) classes.push(className);
        
        const tag = href ? 'a' : 'button';
        const attrs = [];
        if (href) attrs.push(`href="${href}"`);
        if (onclick) attrs.push(`onclick="${onclick}"`);
        
        return `
            <${tag} class="${classes.join(' ')}" ${attrs.join(' ')}>
                ${icon ? `<i class="${icon}"></i>` : ''}
                ${text}
            </${tag}>
        `;
    }
    
    // ========================================
    // SECTIONS
    // ========================================
    
    static section(options = {}) {
        const {
            title,
            description,
            content,
            background = '',
            container = true,
            className = ''
        } = options;
        
        const classes = ['section'];
        if (background) classes.push(`bg-${background}`);
        if (className) classes.push(className);
        
        return `
            <section class="${classes.join(' ')}">
                ${container ? '<div class="container">' : ''}
                    
                    ${title || description ? `
                        <div class="center mb-xl">
                            ${title ? `<h2 class="text-3xl font-bold mb-md animate-on-scroll">${title}</h2>` : ''}
                            ${description ? `<p class="text-secondary text-lg animate-on-scroll">${description}</p>` : ''}
                        </div>
                    ` : ''}
                    
                    ${content || ''}
                    
                ${container ? '</div>' : ''}
            </section>
        `;
    }
    
    // ========================================
    // GRILLES
    // ========================================
    
    static grid(items = [], options = {}) {
        const {
            columns = 'auto',
            gap = '',
            className = ''
        } = options;
        
        const classes = ['grid'];
        if (columns === 'auto') {
            classes.push('grid--auto');
        } else if (typeof columns === 'number') {
            classes.push(`grid--${columns}`);
        }
        if (gap) classes.push(`gap-${gap}`);
        if (className) classes.push(className);
        
        return `
            <div class="${classes.join(' ')}">
                ${items.join('')}
            </div>
        `;
    }
    
    // ========================================
    // HERO
    // ========================================
    
    static hero(options = {}) {
        const {
            title,
            subtitle,
            description,
            icon,
            actions = [],
            className = ''
        } = options;
        
        const classes = ['hero'];
        if (className) classes.push(className);
        
        return `
            <section class="${classes.join(' ')}">
                <div class="container">
                    <div class="hero-content">
                        ${icon ? `
                            <div class="icon-box icon-box--primary icon-box--animated animate-in mx-auto mb-lg">
                                <i class="${icon}"></i>
                            </div>
                        ` : ''}
                        
                        <h1 class="hero-title animate-in animate-in-delay-1">
                            ${subtitle ? `<span class="text-gradient">${subtitle}</span><br>` : ''}
                            ${title}
                        </h1>
                        
                        ${description ? `
                            <p class="hero-description animate-in animate-in-delay-2">
                                ${description}
                            </p>
                        ` : ''}
                        
                        ${actions.length > 0 ? `
                            <div class="hero-actions animate-in animate-in-delay-3">
                                ${actions.map(action => this.button({ size: 'lg', ...action })).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </section>
        `;
    }
    
    // ========================================
    // FORMULAIRES
    // ========================================
    
    static form(fields = [], options = {}) {
        const {
            submitText = 'Envoyer',
            submitIcon = 'fas fa-paper-plane',
            onsubmit,
            className = ''
        } = options;
        
        const attrs = [];
        if (onsubmit) attrs.push(`onsubmit="${onsubmit}"`);
        
        return `
            <form ${attrs.join(' ')} class="${className}">
                ${fields.map(field => this.formField(field)).join('')}
                
                <button type="submit" class="btn btn--primary btn--lg mt-lg">
                    ${submitIcon ? `<i class="${submitIcon}"></i>` : ''}
                    ${submitText}
                </button>
            </form>
        `;
    }
    
    static formField(options = {}) {
        const {
            type = 'text',
            name,
            label,
            placeholder,
            required = false,
            rows
        } = options;
        
        const id = `field-${name}`;
        
        return `
            <div class="form-group">
                ${label ? `<label class="form-label" for="${id}">${label}</label>` : ''}
                
                ${type === 'textarea' ? `
                    <textarea 
                        id="${id}"
                        name="${name}"
                        class="form-input"
                        placeholder="${placeholder || ''}"
                        ${required ? 'required' : ''}
                        rows="${rows || 4}"
                    ></textarea>
                ` : `
                    <input 
                        type="${type}"
                        id="${id}"
                        name="${name}"
                        class="form-input"
                        placeholder="${placeholder || ''}"
                        ${required ? 'required' : ''}
                    >
                `}
            </div>
        `;
    }
    
    // ========================================
    // LISTES DE FONCTIONNALITÉS
    // ========================================
    
    static featureList(features = [], options = {}) {
        const { className = '' } = options;
        
        return `
            <div class="feature-list ${className}">
                ${features.map(feature => `
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="${feature.icon || 'fas fa-check'}"></i>
                        </div>
                        <div class="feature-content">
                            <h4>${feature.title}</h4>
                            ${feature.description ? `<p>${feature.description}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // ========================================
    // BADGES
    // ========================================
    
    static badge(options = {}) {
        const {
            text,
            icon,
            variant = '',
            className = ''
        } = options;
        
        const classes = ['badge'];
        if (variant) classes.push(`badge--${variant}`);
        if (className) classes.push(className);
        
        return `
            <span class="${classes.join(' ')}">
                ${icon ? `<i class="${icon}"></i>` : ''}
                ${text}
            </span>
        `;
    }
    
    // ========================================
    // PAGE COMPLÈTE
    // ========================================
    
    static page(sections = [], options = {}) {
        const { className = '' } = options;
        
        return `
            <div class="page-container ${className}">
                ${sections.join('')}
            </div>
        `;
    }
}

// ========================================
// HELPERS POUR PAGES
// ========================================

class PageBuilder {
    constructor() {
        this.sections = [];
    }
    
    addHero(options) {
        this.sections.push(ComponentBuilder.hero(options));
        return this;
    }
    
    addSection(options) {
        this.sections.push(ComponentBuilder.section(options));
        return this;
    }
    
    addCards(cards, options = {}) {
        const cardElements = cards.map(card => ComponentBuilder.card(card));
        const grid = ComponentBuilder.grid(cardElements, options.grid || {});
        
        this.sections.push(
            ComponentBuilder.section({
                ...options,
                content: grid
            })
        );
        return this;
    }
    
    addForm(fields, options = {}) {
        const form = ComponentBuilder.form(fields, options.form || {});
        
        this.sections.push(
            ComponentBuilder.section({
                ...options,
                content: `<div style="max-width: 600px; margin: 0 auto;">${form}</div>`
            })
        );
        return this;
    }
    
    addFeatures(features, options = {}) {
        const list = ComponentBuilder.featureList(features);
        
        this.sections.push(
            ComponentBuilder.section({
                ...options,
                content: list
            })
        );
        return this;
    }
    
    build() {
        return ComponentBuilder.page(this.sections);
    }
}

// ========================================
// EXPORT ET EXEMPLES
// ========================================

window.ComponentBuilder = ComponentBuilder;
window.PageBuilder = PageBuilder;

// Exemples d'utilisation
console.log(`
🛠️ Component Builder - Exemples
==============================

// Créer une carte
ComponentBuilder.card({
    title: 'Mon Service',
    content: 'Description du service',
    icon: 'fas fa-rocket',
    variant: 'primary',
    badge: { text: 'Nouveau', icon: 'fas fa-star' }
});

// Créer un bouton
ComponentBuilder.button({
    text: 'Action',
    icon: 'fas fa-arrow-right',
    variant: 'primary',
    size: 'lg'
});

// Construire une page complète
const page = new PageBuilder()
    .addHero({
        title: 'Bienvenue',
        subtitle: 'Site Moderne',
        actions: [
            { text: 'Commencer', variant: 'primary' },
            { text: 'En savoir plus', variant: 'outline' }
        ]
    })
    .addCards([
        { title: 'Service 1', content: 'Description', icon: 'fas fa-star' },
        { title: 'Service 2', content: 'Description', icon: 'fas fa-cog' }
    ], {
        title: 'Nos Services',
        grid: { columns: 3 }
    })
    .build();
`);