// ========================================
// js/utils/animation-utils.js - Utilitaires d'animation
// ========================================

class AnimationUtils {
    constructor() {
        this.activeAnimations = new Map();
        this.defaultDuration = 300;
        this.defaultEasing = 'ease-out';
    }
    
    /**
     * Créer une animation personnalisée
     */
    animate(element, keyframes, options = {}) {
        if (!element || !element.animate) {
            return Promise.resolve();
        }
        
        const animationOptions = {
            duration: this.defaultDuration,
            easing: this.defaultEasing,
            fill: 'both',
            ...options
        };
        
        const animation = element.animate(keyframes, animationOptions);
        
        // Garder une référence pour pouvoir l'annuler
        const animationId = Math.random().toString(36).substr(2, 9);
        this.activeAnimations.set(animationId, animation);
        
        animation.finished.finally(() => {
            this.activeAnimations.delete(animationId);
        });
        
        return animation.finished;
    }
    
    /**
     * Fade In
     */
    fadeIn(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        return this.animate(element, [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration });
    }
    
    /**
     * Fade Out
     */
    fadeOut(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-10px)' }
        ], { duration }).then(() => {
            element.style.display = 'none';
        });
    }
    
    /**
     * Slide Down
     */
    slideDown(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        const height = element.scrollHeight;
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        return this.animate(element, [
            { height: '0px', opacity: 0 },
            { height: `${height}px`, opacity: 1 }
        ], { duration }).then(() => {
            element.style.height = '';
            element.style.overflow = '';
        });
    }
    
    /**
     * Slide Up
     */
    slideUp(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        const height = element.scrollHeight;
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        
        return this.animate(element, [
            { height: `${height}px`, opacity: 1 },
            { height: '0px', opacity: 0 }
        ], { duration }).then(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
        });
    }
    
    /**
     * Scale In
     */
    scaleIn(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        return this.animate(element, [
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration });
    }
    
    /**
     * Scale Out
     */
    scaleOut(element, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0.8)', opacity: 0 }
        ], { duration }).then(() => {
            element.style.display = 'none';
        });
    }
    
    /**
     * Bounce In
     */
    bounceIn(element, duration = 600) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        return this.animate(element, [
            { transform: 'scale3d(0.3, 0.3, 0.3)', opacity: 0 },
            { transform: 'scale3d(1.1, 1.1, 1.1)', opacity: 1, offset: 0.2 },
            { transform: 'scale3d(0.9, 0.9, 0.9)', offset: 0.4 },
            { transform: 'scale3d(1.03, 1.03, 1.03)', offset: 0.6 },
            { transform: 'scale3d(0.97, 0.97, 0.97)', offset: 0.8 },
            { transform: 'scale3d(1, 1, 1)', opacity: 1 }
        ], { 
            duration, 
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' 
        });
    }
    
    /**
     * Shake
     */
    shake(element, intensity = 10, duration = 600) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { transform: 'translate3d(0, 0, 0)' },
            { transform: `translate3d(-${intensity}px, 0, 0)`, offset: 0.1 },
            { transform: `translate3d(${intensity}px, 0, 0)`, offset: 0.2 },
            { transform: `translate3d(-${intensity}px, 0, 0)`, offset: 0.3 },
            { transform: `translate3d(${intensity}px, 0, 0)`, offset: 0.4 },
            { transform: `translate3d(-${intensity}px, 0, 0)`, offset: 0.5 },
            { transform: `translate3d(${intensity}px, 0, 0)`, offset: 0.6 },
            { transform: `translate3d(-${intensity}px, 0, 0)`, offset: 0.7 },
            { transform: `translate3d(${intensity}px, 0, 0)`, offset: 0.8 },
            { transform: `translate3d(-${intensity}px, 0, 0)`, offset: 0.9 },
            { transform: 'translate3d(0, 0, 0)' }
        ], { duration });
    }
    
    /**
     * Pulse
     */
    pulse(element, scale = 1.1, duration = 1000) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { transform: 'scale3d(1, 1, 1)' },
            { transform: `scale3d(${scale}, ${scale}, ${scale})`, offset: 0.5 },
            { transform: 'scale3d(1, 1, 1)' }
        ], { duration });
    }
    
    /**
     * Rotation
     */
    rotate(element, degrees = 360, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { transform: 'rotate(0deg)' },
            { transform: `rotate(${degrees}deg)` }
        ], { duration });
    }
    
    /**
     * Slide In from Left
     */
    slideInLeft(element, distance = 100, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        return this.animate(element, [
            { transform: `translateX(-${distance}px)`, opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ], { duration });
    }
    
    /**
     * Slide In from Right
     */
    slideInRight(element, distance = 100, duration = this.defaultDuration) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        return this.animate(element, [
            { transform: `translateX(${distance}px)`, opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ], { duration });
    }
    
    /**
     * Flip In
     */
    flipIn(element, axis = 'Y', duration = 600) {
        if (!element) return Promise.resolve();
        
        element.style.display = 'block';
        
        const transformOrigin = axis === 'X' ? 'center bottom' : 'center center';
        element.style.transformOrigin = transformOrigin;
        
        return this.animate(element, [
            { 
                transform: `perspective(400px) rotate${axis}(90deg)`, 
                opacity: 0 
            },
            { 
                transform: `perspective(400px) rotate${axis}(-20deg)`, 
                opacity: 1, 
                offset: 0.4 
            },
            { 
                transform: `perspective(400px) rotate${axis}(10deg)`, 
                offset: 0.6 
            },
            { 
                transform: `perspective(400px) rotate${axis}(-5deg)`, 
                offset: 0.8 
            },
            { 
                transform: `perspective(400px) rotate${axis}(0deg)`, 
                opacity: 1 
            }
        ], { 
            duration, 
            easing: 'ease-in' 
        });
    }
    
    /**
     * Typewriter Effect
     */
    typewriter(element, text, speed = 50) {
        if (!element) return Promise.resolve();
        
        element.textContent = '';
        let i = 0;
        
        return new Promise(resolve => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }
    
    /**
     * Morphing Counter
     */
    countTo(element, from = 0, to = 100, duration = 1000, formatter = null) {
        if (!element) return Promise.resolve();
        
        const startTime = performance.now();
        
        return new Promise(resolve => {
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = from + (to - from) * easedProgress;
                
                if (formatter) {
                    element.textContent = formatter(currentValue);
                } else {
                    element.textContent = Math.round(currentValue);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    /**
     * Stagger Animation (pour plusieurs éléments)
     */
    stagger(elements, animationFn, delay = 100) {
        if (!elements || elements.length === 0) {
            return Promise.resolve();
        }
        
        const promises = Array.from(elements).map((element, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    animationFn(element).then(resolve);
                }, index * delay);
            });
        });
        
        return Promise.all(promises);
    }
    
    /**
     * Reveal on Scroll
     */
    revealOnScroll(elements, options = {}) {
        if (!elements || !window.IntersectionObserver) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.reveal || 'fadeIn';
                    
                    if (this[animationType]) {
                        this[animationType](element).then(() => {
                            element.classList.add('revealed');
                        });
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        });
        
        Array.from(elements).forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
        
        return observer;
    }
    
    /**
     * Arrêter toutes les animations actives
     */
    stopAll() {
        this.activeAnimations.forEach(animation => {
            animation.cancel();
        });
        this.activeAnimations.clear();
    }
    
    /**
     * Vérifier le support des animations
     */
    isSupported() {
        return typeof document.createElement('div').animate === 'function';
    }
}

// Exposer globalement
window.AnimationUtils = AnimationUtils;