// ========================================
// js/pages/base-page.js - Classe de base pour les pages
// ========================================

class BasePage {
    constructor(options = {}) {
        this.id = options.id;
        this.title = options.title || 'Page';
        this.description = options.description || '';
        this.initialized = false;
        this.container = null;
    }
    
    async init() {
        if (this.initialized) return;
        
        // Initialisation spécifique à la page
        await this.onInit();
        
        this.initialized = true;
        console.log(`✅ Page ${this.id} initialized`);
    }
    
    async onInit() {
        // À implémenter dans les classes enfants
    }
    
    async render() {
        return `
            <div class="page-container" data-page="${this.id}">
                ${this.getTemplate()}
            </div>
        `;
    }
    
    getTemplate() {
        return `
            <div class="section">
                <div class="container">
                    <h1>${this.title}</h1>
                    <p>${this.description}</p>
                </div>
            </div>
        `;
    }
    
    async onMount() {
        // Appelé après que le DOM soit inséré
        this.bindEvents();
        this.setupAnimations();
    }
    
    bindEvents() {
        // À implémenter dans les classes enfants
    }
    
    setupAnimations() {
        // Animations d'entrée automatiques
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100);
        });
    }
    
    destroy() {
        this.initialized = false;
    }
}
