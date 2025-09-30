// Script de débogage pour forcer la visibilité
console.log('🔍 DEBUG: Checking visibility issues...');

// Attendre que le DOM soit chargé
setTimeout(() => {
    console.log('🔍 Checking .fade-in-up elements...');
    const fadeElements = document.querySelectorAll('.fade-in-up');
    console.log(`Found ${fadeElements.length} .fade-in-up elements`);

    fadeElements.forEach((el, index) => {
        console.log(`Element ${index}:`, {
            hasAnimateClass: el.classList.contains('animate'),
            opacity: window.getComputedStyle(el).opacity,
            display: window.getComputedStyle(el).display,
            visibility: window.getComputedStyle(el).visibility
        });

        // Forcer l'animation
        el.classList.add('animate');
    });

    console.log('✅ Forced all .fade-in-up to animate');

    // Vérifier les pages
    const homeSection = document.querySelector('.home-page');
    const servicesSection = document.querySelector('.services-page');

    console.log('Pages found:', {
        home: !!homeSection,
        services: !!servicesSection
    });

    if (homeSection) {
        console.log('Home page HTML length:', homeSection.innerHTML.length);
    }
    if (servicesSection) {
        console.log('Services page HTML length:', servicesSection.innerHTML.length);
    }

}, 2000);