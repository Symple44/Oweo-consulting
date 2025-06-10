// ========================================
// js/config/company-info.js - Informations centralisées de l'entreprise
// ========================================

/**
 * Configuration centralisée des informations de contact et société
 * À importer dans tous les autres fichiers pour éviter les incohérences
 */
window.CompanyInfo = {
    // Informations de base
    name: 'Oweo',
    fullName: 'Oweo Consulting',
    tagline: 'Expert en transformation digitale pour l\'industrie métallique',
    
    // Contact principal
    contact: {
        email: 'contact@oweo-consulting.fr',
        phone: '+33 6 86 76 81 31',
        phoneFormatted: '06 86 76 81 31',
        phoneDisplay: '06 86 76 81 31'
    },
    
    // Adresse
    address: {
        street: null, // À définir si nécessaire
        city: 'Nantes',
        postalCode: null,
        country: 'France',
        full: 'Nantes, France'
    },
    
    // URLs et liens
    urls: {
        website: 'https://oweo-consulting.fr',
        calendly: 'https://calendly.com/nicolas-dubain/30min',
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        
        // Sous-domaines (si utilisés)
        support: 'https://support.oweo-consulting.fr',
        docs: 'https://docs.oweo-consulting.fr',
        blog: 'https://blog.oweo-consulting.fr'
    },
    
    // Horaires
    businessHours: {
        days: 'Lundi - Vendredi',
        hours: '8h30 - 18h30',
        timezone: 'Europe/Paris'
    },
    
    // Réseaux sociaux
    social: {
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        twitter: null, // À définir si existant
        facebook: null, // À définir si existant
        youtube: null // À définir si existant
    },
    
    // Informations légales
    legal: {
        siret: '94502819900012', // À remplir si nécessaire
        tva: 'FR37945028199', // À remplir si nécessaire
        rcs: 'RCS Nantes' // À remplir si nécessaire
    },
    
    // Méthodes utilitaires
    getFormattedPhone() {
        return this.contact.phoneFormatted;
    },
    
    getContactEmail() {
        return this.contact.email;
    },
    
    getCalendlyUrl() {
        return this.urls.calendly;
    },
    
    getFullAddress() {
        return this.address.full;
    },
    
    // Validation de cohérence
    validate() {
        const issues = [];
        
        if (!this.contact.email.includes('@')) {
            issues.push('Email invalide');
        }
        
        if (!this.contact.phone.startsWith('+33')) {
            issues.push('Format téléphone français attendu');
        }
        
        if (!this.urls.website.startsWith('https://')) {
            issues.push('URL website doit être HTTPS');
        }
        
        if (!this.urls.calendly.includes('calendly.com')) {
            issues.push('URL Calendly invalide');
        }
        
        return {
            valid: issues.length === 0,
            issues
        };
    }
};

// Auto-validation au chargement
(function() {
    const validation = window.CompanyInfo.validate();
    if (!validation.valid) {
        console.warn('⚠️ Configuration société invalide:', validation.issues);
    } else {
        console.log('✅ Configuration société validée');
    }
})();