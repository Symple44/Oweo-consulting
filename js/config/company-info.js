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
    fullName: 'OWEO',
    tagline: 'Expert en transformation digitale pour l\'industrie métallique',
    
    // Contact principal
    contact: {
        email: 'contact@oweo-consulting.fr',
        phone: '+33 6 86 76 81 31',
        phoneFormatted: '06 86 76 81 31',
        phoneDisplay: '06 86 76 81 31',
        phoneInternational: '+33686768131'
    },
    
    // Contact commercial
    sales: {
        email: 'commercial@oweo-consulting.fr',
        phone: '+33 6 86 76 81 31',
        phoneFormatted: '06 86 76 81 31'
    },
    
    // Support technique
    support: {
        email: 'support@oweo-consulting.fr',
        phone: '+33 6 86 76 81 31',
        phoneFormatted: '06 86 76 81 31'
    },
    
    // Adresse
    address: {
        street: '10 Rue du sous bois',
        city: 'Nantes',
        postalCode: '44700',
        country: 'France',
        region: 'Pays de la Loire',
        full: 'Nantes, France',
        complete: '10 Rue du sous bois, 44700 Orvault, France'
    },
    
    // URLs et liens
    urls: {
        website: 'https://oweo-consulting.fr',
        calendly: 'https://calendly.com/nicolas-dubain/30min',
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        
        // Sous-domaines
        support: 'https://support.oweo-consulting.fr',
        docs: 'https://docs.oweo-consulting.fr',
        blog: 'https://blog.oweo-consulting.fr',
        
        // Liens de téléchargement
        brochure: '/assets/docs/Oweo-Solutions-ERP-Metallique.pdf',
        
        // Politique et légal
        privacy: '/privacy',
        terms: '/terms',
        legal: '/legal',
        cookies: '/cookies'
    },
    
    // Horaires d'ouverture
    businessHours: {
        days: 'Lundi - Vendredi',
        hours: '14h00 - 18h00',
        timezone: 'Europe/Paris',
        
        // Détail par jour
        schedule: {
            monday: { open: '08:30', close: '18:30' },
            tuesday: { open: '08:30', close: '18:30' },
            wednesday: { open: '08:30', close: '18:30' },
            thursday: { open: '08:30', close: '18:30' },
            friday: { open: '08:30', close: '18:30' },
            saturday: { closed: true },
            sunday: { closed: true }
        },
        
        // Messages
        closedMessage: 'Nous sommes actuellement fermés. Laissez-nous un message et nous vous recontacterons dès notre réouverture.',
        holidayMessage: 'Nos bureaux sont fermés pour les vacances. Nous reprendrons contact avec vous à notre retour.'
    },
    
    // Réseaux sociaux
    social: {
        linkedin: 'https://linkedin.com/company/oweo-consulting',
        //twitter: 'https://twitter.com/oweo_consulting',
        //facebook: 'https://facebook.com/oweoconsulting',
        //youtube: 'https://youtube.com/c/oweoconsulting',
        //github: 'https://github.com/oweo-consulting'
    },
    
    // Informations légales
    legal: {
        siret: '94502819900012',
        siren: '945028199',
        tva: 'FR37945028199',
        rcs: 'RCS Nantes B 945 028 199',
        ape: '6202A',
        apeName: 'Conseil en systèmes et logiciels informatiques',
        capital: '500 €',
        forme: 'SASU',
        dateCreation: '28/05/2025',
        numeroRM: '', // Numéro au Répertoire des Métiers si applicable
        assuranceRC: 'AXA France - Contrat n°123456789',
        representantLegal: 'Nicolas Dubain',
        qualiteRepresentant: 'Gérant'
    },
    
    // Informations bancaires (pour affichage uniquement)
    bank: {
        name: 'Crédit Mutuel',
        iban: 'FR76 XXXX XXXX XXXX XXXX XXXX XXX',
        bic: 'CMCIFRXX'
    },
    
    // Équipe dirigeante
    team: {
        ceo: {
            name: 'Nicolas Dubain',
            title: 'Fondateur & CEO',
            email: 'nicolas.dubain@oweo-consulting.fr',
            linkedin: 'https://linkedin.com/in/nicolas-dubain'
        }
    },
    
    // Messages et textes récurrents
    messages: {
        welcome: 'Bienvenue chez Oweo, votre partenaire pour la transformation digitale de l\'industrie métallique',
        mission: 'Notre mission est d\'accompagner les entreprises de la métallurgie dans leur transformation numérique avec des solutions sur mesure et innovantes.',
        values: 'Innovation, Excellence, Proximité'
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
    
    getCompleteAddress() {
        return this.address.complete;
    },
    
    getSocialLinks() {
        return Object.entries(this.social)
            .filter(([key, value]) => value !== null)
            .map(([network, url]) => ({ network, url }));
    },
    
    isOpenNow() {
        const now = new Date();
        const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
        const schedule = this.businessHours.schedule[day];
        
        if (schedule.closed) return false;
        
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openHour, openMin] = schedule.open.split(':').map(Number);
        const [closeHour, closeMin] = schedule.close.split(':').map(Number);
        
        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;
        
        return currentTime >= openTime && currentTime < closeTime;
    },
    
    getBusinessStatus() {
        return this.isOpenNow() ? 'Ouvert' : 'Fermé';
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
        
        if (!this.legal.siret || this.legal.siret.length !== 14) {
            issues.push('SIRET invalide');
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
        logger.warn('⚠️ Configuration société invalide:', validation.issues);
    } else {
        logger.log('✅ Configuration société validée');
        logger.log('📍 Statut:', window.CompanyInfo.getBusinessStatus());
    }
})();