// ========================================
// js/pages/legal.js - Pages légales (Mentions, Confidentialité, CGU, Cookies)
// ========================================

class LegalPage extends BasePage {
    constructor(pageType = 'legal') {
        const pageConfig = LegalPage.getPageConfig(pageType);
        
        super({
            id: pageType,
            title: pageConfig.title,
            description: pageConfig.description
        });
        
        this.pageType = pageType;
        this.lastUpdate = '1er janvier 2024';
        this.companyInfo = window.CompanyInfo || {};
        this._eventListeners = [];
    }
    
    static getPageConfig(pageType) {
        const configs = {
            legal: {
                title: 'Mentions Légales',
                description: 'Mentions légales et informations sur l\'éditeur du site'
            },
            privacy: {
                title: 'Politique de Confidentialité',
                description: 'Protection et traitement de vos données personnelles'
            },
            terms: {
                title: 'Conditions Générales d\'Utilisation',
                description: 'Conditions d\'utilisation du site web'
            },
            cookies: {
                title: 'Politique des Cookies',
                description: 'Utilisation des cookies et technologies similaires'
            }
        };
        
        return configs[pageType] || configs.legal;
    }
    
    getTemplate() {
        const content = this.getContentByType();
        
        return `
            <div class="page-container legal-page">
                <!-- Header -->
                <section class="legal-header page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#home" class="nav-link">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>${this.title}</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">${this.title}</h1>
                        <p class="page-description fade-in-up">${this.description}</p>
                        
                        <div class="legal-meta fade-in-up">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Dernière mise à jour : ${this.lastUpdate}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>Conforme RGPD</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Content -->
                <section class="legal-content">
                    <div class="container">
                        <div class="legal-layout">
                            <!-- Navigation latérale -->
                            <aside class="legal-nav">
                                <div class="nav-sticky">
                                    <h3>Navigation</h3>
                                    <nav class="legal-nav-links">
                                        <a href="#legal" class="legal-nav-link ${this.pageType === 'legal' ? 'active' : ''}" data-page="legal">
                                            <i class="fas fa-info-circle"></i>
                                            Mentions légales
                                        </a>
                                        <a href="#privacy" class="legal-nav-link ${this.pageType === 'privacy' ? 'active' : ''}" data-page="privacy">
                                            <i class="fas fa-shield-alt"></i>
                                            Confidentialité
                                        </a>
                                        <a href="#terms" class="legal-nav-link ${this.pageType === 'terms' ? 'active' : ''}" data-page="terms">
                                            <i class="fas fa-file-contract"></i>
                                            CGU
                                        </a>
                                        <a href="#cookies" class="legal-nav-link ${this.pageType === 'cookies' ? 'active' : ''}" data-page="cookies">
                                            <i class="fas fa-cookie-bite"></i>
                                            Cookies
                                        </a>
                                    </nav>
                                    
                                    <div class="legal-actions">
                                        <button class="btn btn-outline btn-sm btn-block" onclick="window.print()">
                                            <i class="fas fa-print"></i>
                                            Imprimer
                                        </button>
                                    </div>
                                </div>
                            </aside>
                            
                            <!-- Contenu principal -->
                            <main class="legal-main">
                                <div class="legal-document">
                                    ${content}
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    getContentByType() {
        switch (this.pageType) {
            case 'legal':
                return this.getLegalContent();
            case 'privacy':
                return this.getPrivacyContent();
            case 'terms':
                return this.getTermsContent();
            case 'cookies':
                return this.getCookiesContent();
            default:
                return this.getLegalContent();
        }
    }
    
    getLegalContent() {
        return `
            <div class="company-info">
                <h2>Informations sur l'éditeur</h2>
                <p>
                    <strong>Raison sociale :</strong> ${this.companyInfo.fullName || 'OWEO'} ${this.companyInfo.legal?.forme || 'SAS'}<br>
                    <strong>SIREN :</strong> ${this.companyInfo.legal?.siren || '945 028 199'}<br>
                    <strong>SIRET :</strong> ${this.companyInfo.legal?.siret || '945 028 199 00012'}<br>
                    <strong>TVA intracommunautaire :</strong> ${this.companyInfo.legal?.tva || 'FR37 945 028 199'}<br>
                    <strong>Siège social :</strong> ${this.companyInfo.address?.complete || '10 rue du Sous-Bois, 44700 Orvault'}<br>
                    <strong>Forme juridique :</strong> ${this.getFormeJuridique()}<br>
                    <strong>Code NAF/APE :</strong> ${this.companyInfo.legal?.ape || '62.02A'}<br>
                    <strong>Capital social :</strong> ${this.companyInfo.legal?.capital || '1 000 €'}<br>
                    <strong>Représentant légal :</strong> ${this.companyInfo.legal?.representantLegal || 'Nicolas Dubain'}
                </p>
            </div>

            <section class="legal-section">
                <h2>Contact</h2>
                <p>
                    <strong>Email :</strong> <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a><br>
                    <strong>Téléphone :</strong> <a href="tel:${this.companyInfo.contact?.phone || '+33686768131'}">${this.companyInfo.contact?.phoneFormatted || '06 86 76 81 31'}</a>
                </p>
            </section>

            <section class="legal-section">
                <h2>Hébergement</h2>
                <p>
                    Le site web est hébergé par :<br>
                    <strong>OVH</strong><br>
                    2 rue Kellermann<br>
                    59 100 Roubaix<br>
                    France<br>
                    Site web : <a href="https://www.ovhcloud.com/fr/" target="_blank" rel="noopener">https://www.ovhcloud.com/fr/</a>
                </p>
            </section>

            <section class="legal-section">
                <h2>Propriété intellectuelle</h2>
                <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
            </section>

            <section class="legal-section">
                <h2>Responsabilité</h2>
                <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
                    mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                <p>
                    Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
                    à l'adresse ${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}, en décrivant le problème de la façon la plus précise possible.
                </p>
            </section>

            <section class="legal-section">
                <h2>Liens hypertextes</h2>
                <p>
                    Les sites internet peuvent proposer des liens vers d'autres sites internet ou d'autres ressources disponibles sur Internet. 
                    ${this.companyInfo.fullName || 'OWEO'} ne dispose d'aucun moyen pour contrôler les sites en connexion avec ses sites internet.
                </p>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} ne répond pas de la disponibilité de tels sites et sources externes, 
                    ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, 
                    résultant du contenu de ces sites ou sources externes, et notamment des informations, produits ou services qu'ils proposent, 
                    ou de tout usage qui peut être fait de ces éléments.
                </p>
            </section>

            <section class="legal-section">
                <h2>Loi applicable</h2>
                <p>
                    Les présentes conditions du site ${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'} sont régies par les lois françaises et toute contestation ou litiges qui pourrait naître de l'interprétation ou de l'exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la société.
                </p>
                <p>
                    La langue de référence, pour le règlement de contentieux éventuels, est le français.
                </p>
            </section>
        `;
    }
    
    getPrivacyContent() {
        return `
            <section class="legal-section">
                <h2>Introduction</h2>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} s'engage à protéger la confidentialité et la sécurité des données personnelles de ses utilisateurs. 
                    Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles 
                    en conformité avec le Règlement Général sur la Protection des Données (RGPD).
                </p>
            </section>

            <section class="legal-section">
                <h2>Responsable de traitement</h2>
                <p>
                    Le responsable du traitement des données est :<br>
                    <strong>${this.companyInfo.fullName || 'OWEO'}</strong><br>
                    ${this.companyInfo.address?.complete || '10 rue du Sous-Bois, 44700 Orvault'}<br>
                    Email : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>
                </p>
            </section>

            <section class="legal-section">
                <h2>Données collectées</h2>
                <h3>Données collectées directement</h3>
                <ul>
                    <li><strong>Formulaires de contact :</strong> nom, prénom, email, téléphone, entreprise, message</li>
                    <li><strong>Newsletter :</strong> adresse email</li>
                    <li><strong>Demandes de démonstration :</strong> informations professionnelles</li>
                </ul>
                
                <h3>Données collectées automatiquement</h3>
                <ul>
                    <li><strong>Données de navigation :</strong> adresse IP, pages visitées, durée de visite</li>
                    <li><strong>Données techniques :</strong> type de navigateur, système d'exploitation, résolution d'écran</li>
                    <li><strong>Cookies :</strong> voir notre politique des cookies</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Finalités du traitement</h2>
                <p>Nous utilisons vos données personnelles pour :</p>
                <ul>
                    <li>Répondre à vos demandes de contact et d'information</li>
                    <li>Organiser des démonstrations de nos solutions</li>
                    <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                    <li>Améliorer notre site web et nos services</li>
                    <li>Respecter nos obligations légales</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Base légale</h2>
                <p>Le traitement de vos données personnelles est fondé sur :</p>
                <ul>
                    <li><strong>Votre consentement</strong> pour la newsletter et les cookies non essentiels</li>
                    <li><strong>L'exécution d'un contrat</strong> pour les services demandés</li>
                    <li><strong>L'intérêt légitime</strong> pour améliorer nos services</li>
                    <li><strong>L'obligation légale</strong> pour la conservation de certaines données</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Partage des données</h2>
                <p>
                    Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :
                </p>
                <ul>
                    <li><strong>Prestataires de services :</strong> hébergement, email, analytics (sous contrat de confidentialité)</li>
                    <li><strong>Autorités légales :</strong> si requis par la loi</li>
                    <li><strong>Partenaires commerciaux :</strong> uniquement avec votre consentement explicite</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Durée de conservation</h2>
                <ul>
                    <li><strong>Prospects :</strong> 3 ans après le dernier contact</li>
                    <li><strong>Clients :</strong> durée contractuelle + 10 ans pour les obligations comptables</li>
                    <li><strong>Newsletter :</strong> jusqu'au désabonnement</li>
                    <li><strong>Données de navigation :</strong> 25 mois maximum</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Vos droits</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul>
                    <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                    <li><strong>Droit à la limitation :</strong> limiter le traitement</li>
                    <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                    <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement</li>
                </ul>
                <p>
                    Pour exercer ces droits, contactez-nous à : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>
                </p>
            </section>

            <section class="legal-section">
                <h2>Sécurité</h2>
                <p>
                    Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                </p>
                <ul>
                    <li>L'accès non autorisé</li>
                    <li>La modification, divulgation ou destruction</li>
                    <li>La perte accidentelle</li>
                </ul>
                <p>
                    Ces mesures incluent le chiffrement, les contrôles d'accès, la formation du personnel et la surveillance continue.
                </p>
            </section>

            <section class="legal-section">
                <h2>Transferts internationaux</h2>
                <p>
                    Certaines de nos données peuvent être transférées en dehors de l'Union Européenne, notamment vers les États-Unis. 
                    Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types, certifications).
                </p>
            </section>

            <section class="legal-section">
                <h2>Contact et réclamations</h2>
                <p>
                    Pour toute question relative à cette politique de confidentialité ou à l'exercice de vos droits :<br>
                    Email : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>
                </p>
                <p>
                    Vous avez également le droit de déposer une réclamation auprès de la CNIL :<br>
                    <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">https://www.cnil.fr/fr/plaintes</a>
                </p>
            </section>
        `;
    }
    
    getTermsContent() {
        return `
            <section class="legal-section">
                <h2>Objet</h2>
                <p>
                    Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation 
                    du site ${this.companyInfo.urls?.website || 'https://oweo-consulting.fr'} (ci-après "le Site") édité par ${this.companyInfo.fullName || 'OWEO'}.
                </p>
                <p>
                    L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU.
                </p>
            </section>

            <section class="legal-section">
                <h2>Accès au site</h2>
                <p>
                    Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. 
                    Tous les coûts afférents à l'accès au Site, que ce soient les frais matériels, logiciels ou d'accès à Internet, 
                    sont exclusivement à la charge de l'utilisateur.
                </p>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} se réserve le droit de modifier, suspendre ou interrompre l'accès au Site 
                    à tout moment et sans préavis, notamment pour des raisons de maintenance.
                </p>
            </section>

            <section class="legal-section">
                <h2>Utilisation du site</h2>
                <h3>Utilisation autorisée</h3>
                <p>Le Site est destiné à :</p>
                <ul>
                    <li>S'informer sur nos services et solutions</li>
                    <li>Nous contacter pour des demandes commerciales</li>
                    <li>Accéder aux démonstrations (sous conditions)</li>
                    <li>Télécharger nos documents commerciaux</li>
                </ul>
                
                <h3>Utilisation interdite</h3>
                <p>Il est formellement interdit d'utiliser le Site pour :</p>
                <ul>
                    <li>Diffuser des contenus illégaux, diffamatoires ou contraires aux bonnes mœurs</li>
                    <li>Perturber le fonctionnement du Site</li>
                    <li>Tenter d'accéder de manière non autorisée aux systèmes</li>
                    <li>Utiliser des robots, scripts ou autres moyens automatisés</li>
                    <li>Collecter des données personnelles d'autres utilisateurs</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Propriété intellectuelle</h2>
                <p>
                    L'ensemble des éléments du Site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) 
                    sont protégés par le droit d'auteur, le droit des marques et/ou le droit sui generis des bases de données.
                </p>
                <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, 
                    quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de ${this.companyInfo.fullName || 'OWEO'}.
                </p>
            </section>

            <section class="legal-section">
                <h2>Données personnelles</h2>
                <p>
                    Le traitement de vos données personnelles est régi par notre 
                    <a href="#privacy" class="internal-link">Politique de Confidentialité</a>.
                </p>
                <p>
                    En utilisant le Site, vous consentez à la collecte et au traitement de vos données 
                    conformément à cette politique.
                </p>
            </section>

            <section class="legal-section">
                <h2>Responsabilité</h2>
                <h3>Responsabilité de l'éditeur</h3>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site. 
                    Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
                </p>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} ne saurait être tenue responsable des dommages directs ou indirects 
                    causés au matériel de l'utilisateur lors de l'accès au Site.
                </p>
                
                <h3>Responsabilité de l'utilisateur</h3>
                <p>
                    L'utilisateur est seul responsable de l'utilisation qu'il fait du Site et des informations qu'il y consulte. 
                    Il s'engage à utiliser le Site conformément aux présentes CGU et à la législation en vigueur.
                </p>
            </section>

            <section class="legal-section">
                <h2>Liens hypertextes</h2>
                <p>
                    Le Site peut contenir des liens vers d'autres sites internet. 
                    ${this.companyInfo.fullName || 'OWEO'} n'exerce aucun contrôle sur ces sites et décline toute responsabilité 
                    quant à leur contenu ou leur disponibilité.
                </p>
                <p>
                    La création de liens vers le Site est libre, sous réserve qu'ils ne portent pas atteinte à l'image de ${this.companyInfo.fullName || 'OWEO'} 
                    et qu'ils respectent la législation en vigueur.
                </p>
            </section>

            <section class="legal-section">
                <h2>Cookies</h2>
                <p>
                    Le Site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite. 
                    Pour plus d'informations, consultez notre <a href="#cookies" class="internal-link">Politique des Cookies</a>.
                </p>
            </section>

            <section class="legal-section">
                <h2>Modification des CGU</h2>
                <p>
                    ${this.companyInfo.fullName || 'OWEO'} se réserve le droit de modifier les présentes CGU à tout moment. 
                    Les modifications entrent en vigueur dès leur publication sur le Site.
                </p>
                <p>
                    Il appartient à l'utilisateur de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications.
                </p>
            </section>

            <section class="legal-section">
                <h2>Droit applicable et juridiction</h2>
                <p>
                    Les présentes CGU sont régies par le droit français. 
                    En cas de litige, les tribunaux français seront seuls compétents.
                </p>
                <p>
                    Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, 
                    ${this.companyInfo.fullName || 'OWEO'} adhère au service du médiateur du e-commerce de la FEVAD.
                </p>
            </section>

            <section class="legal-section">
                <h2>Contact</h2>
                <p>
                    Pour toute question relative aux présentes CGU, vous pouvez nous contacter :<br>
                    Email : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a><br>
                    Téléphone : <a href="tel:${this.companyInfo.contact?.phone || '+33686768131'}">${this.companyInfo.contact?.phoneFormatted || '06 86 76 81 31'}</a>
                </p>
            </section>
        `;
    }
    
    getCookiesContent() {
        return `
            <section class="legal-section">
                <h2>Qu'est-ce qu'un cookie ?</h2>
                <p>
                    Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                    lors de la visite d'un site internet. Il permet au site de reconnaître votre terminal lors de vos visites suivantes.
                </p>
            </section>

            <section class="legal-section">
                <h2>Types de cookies utilisés</h2>
                
                <h3>Cookies essentiels</h3>
                <p>
                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. 
                    Ils sont généralement activés en réponse à des actions que vous effectuez.
                </p>
                <ul>
                    <li><strong>Cookies de session :</strong> maintiennent votre session de navigation</li>
                    <li><strong>Cookies de sécurité :</strong> préviennent les attaques de sécurité</li>
                    <li><strong>Cookies de préférences :</strong> mémorisent vos choix de cookies</li>
                </ul>
                
                <h3>Cookies de performance</h3>
                <p>
                    Ces cookies nous permettent de compter les visites et sources de trafic afin d'améliorer les performances de notre site.
                </p>
                <ul>
                    <li><strong>Google Analytics :</strong> analyse du trafic et du comportement des utilisateurs</li>
                    <li><strong>Mesure d'audience :</strong> statistiques de fréquentation</li>
                </ul>
                
                <h3>Cookies fonctionnels</h3>
                <p>
                    Ces cookies permettent une expérience améliorée et des fonctionnalités personnalisées.
                </p>
                <ul>
                    <li><strong>Préférences utilisateur :</strong> langue, région, thème</li>
                    <li><strong>Chat en ligne :</strong> support client intégré</li>
                </ul>
                
                <h3>Cookies publicitaires</h3>
                <p>
                    Actuellement, nous n'utilisons pas de cookies publicitaires sur notre site.
                </p>
            </section>

            <section class="legal-section">
                <h2>Cookies tiers</h2>
                <p>Certains cookies sont déposés par des services tiers que nous utilisons :</p>
                
                <h3>Google Analytics</h3>
                <p>
                    <strong>Finalité :</strong> Analyse du trafic et amélioration du site<br>
                    <strong>Durée :</strong> 24 mois<br>
                    <strong>Données collectées :</strong> Pages visitées, durée de session, source de trafic<br>
                    <strong>Opt-out :</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Module de désactivation Google Analytics</a>
                </p>
                
                <h3>Calendly</h3>
                <p>
                    <strong>Finalité :</strong> Planification de rendez-vous<br>
                    <strong>Durée :</strong> Session<br>
                    <strong>Données collectées :</strong> Préférences de rendez-vous
                </p>
            </section>

            <section class="legal-section">
                <h2>Gestion des cookies</h2>
                
                <h3>Paramétrage de votre navigateur</h3>
                <p>
                    Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
                </p>
                <ul>
                    <li><strong>Chrome :</strong> Paramètres > Confidentialité et sécurité > Cookies</li>
                    <li><strong>Firefox :</strong> Préférences > Vie privée et sécurité > Cookies</li>
                    <li><strong>Safari :</strong> Préférences > Confidentialité > Cookies</li>
                    <li><strong>Edge :</strong> Paramètres > Cookies et autorisations de site</li>
                </ul>
                
                <h3>Conséquences du refus des cookies</h3>
                <p>
                    Le refus de certains cookies peut affecter votre expérience de navigation :
                </p>
                <ul>
                    <li>Impossibilité de mémoriser vos préférences</li>
                    <li>Fonctionnalités limitées</li>
                    <li>Expérience moins personnalisée</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Durée de conservation</h2>
                <p>La durée de conservation des cookies varie selon leur type :</p>
                <ul>
                    <li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
                    <li><strong>Cookies persistants :</strong> 1 à 24 mois selon le cookie</li>
                    <li><strong>Cookies tiers :</strong> Selon les politiques des prestataires</li>
                </ul>
            </section>

            <section class="legal-section">
                <h2>Mise à jour de la politique</h2>
                <p>
                    Cette politique des cookies peut être mise à jour pour refléter les évolutions 
                    de nos pratiques ou de la réglementation. 
                    Nous vous encourageons à consulter régulièrement cette page.
                </p>
            </section>

            <section class="legal-section">
                <h2>Contact</h2>
                <p>
                    Pour toute question concernant notre utilisation des cookies :<br>
                    Email : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>
                </p>
            </section>

            <section class="legal-section">
                <h2>Liens utiles</h2>
                <ul>
                    <li><a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener">CNIL - Cookies et traceurs</a></li>
                    <li><a href="https://www.allaboutcookies.org/fr/" target="_blank" rel="noopener">Tout sur les cookies</a></li>
                    <li><a href="https://www.youronlinechoices.com/fr/" target="_blank" rel="noopener">Gérer les cookies publicitaires</a></li>
                </ul>
            </section>
        `;
    }
    
    getFormeJuridique() {
        const formes = {
            'SARL': 'Société à Responsabilité Limitée (SARL)',
            'SAS': 'Société par Actions Simplifiée (SAS)',
            'SASU': 'Société par Actions Simplifiée Unipersonnelle (SASU)',
            'SA': 'Société Anonyme (SA)',
            'EURL': 'Entreprise Unipersonnelle à Responsabilité Limitée (EURL)'
        };
        
        const forme = this.companyInfo.legal?.forme || 'SAS';
        return formes[forme] || forme;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // IMPORTANT: Nettoyer les anciens écouteurs d'abord (comme CGV)
        this.cleanupEventListeners();
        
        // Navigation entre pages légales (inspiré du pattern CGV)
        const handleLegalNavClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.currentTarget;
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const page = href.substring(1);
                this.navigateTo(page);
            }
            
            return false;
        };
        
        // Sélecteur spécifique pour les liens de navigation légale
        const legalNavLinks = document.querySelectorAll('.legal-page .legal-nav-link');
        legalNavLinks.forEach(link => {
            link.addEventListener('click', handleLegalNavClick);
            this._eventListeners.push({ element: link, event: 'click', handler: handleLegalNavClick });
        });
        
        // Handler pour le breadcrumb (copié exactement de CGV)
        const handleBreadcrumbClick = (e) => {
            const link = e.currentTarget;
            const href = link.getAttribute('href');
            
            // Vérifier que c'est bien un lien de navigation et pas un lien de nav latéral
            if (href && href.startsWith('#') && !link.classList.contains('legal-nav-link')) {
                e.preventDefault();
                e.stopPropagation();
                
                const page = href.substring(1);
                this.navigateTo(page);
            }
        };
        
        // Sélecteur spécifique pour le breadcrumb
        const breadcrumbLinks = document.querySelectorAll('.legal-page .page-breadcrumb .nav-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', handleBreadcrumbClick);
            this._eventListeners.push({ element: link, event: 'click', handler: handleBreadcrumbClick });
        });
        
        // Liens internes dans le contenu
        const handleInternalClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.currentTarget;
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const pageType = href.substring(1);
                this.navigateTo(pageType);
            }
        };
        
        const internalLinks = document.querySelectorAll('.legal-page .internal-link');
        internalLinks.forEach(link => {
            link.addEventListener('click', handleInternalClick);
            this._eventListeners.push({ element: link, event: 'click', handler: handleInternalClick });
        });
    }

    // Méthode pour nettoyer les écouteurs (copié de CGV)
    cleanupEventListeners() {
        this._eventListeners.forEach(({ element, event, handler }) => {
            if (element) {
                element.removeEventListener(event, handler);
            }
        });
        this._eventListeners = [];
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    async onMount() {
        await super.onMount();
        
        // Ajouter une classe au body pour les styles spécifiques
        document.body.classList.add('page-legal', `page-${this.pageType}`);
        
        // Mettre à jour le titre de la page
        document.title = `${this.title} - ${this.companyInfo.name || 'OWEO'}`;
        
        // S'assurer que le scroll est en haut
        window.scrollTo(0, 0);
    }
    
    destroy() {
        // Nettoyer tous les écouteurs d'événements (comme CGV)
        this.cleanupEventListeners();
        
        // Retirer la classe du body
        document.body.classList.remove('page-legal', `page-${this.pageType}`);
        
        super.destroy();
    }
}

// Exposer la classe
window.LegalPage = LegalPage;