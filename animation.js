// Gestion des animations et effets visuels
class AnimationsManager {
    constructor() {
        this.animatedElements = new Set();
        this.observer = null;
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initLoadingAnimations();
        this.initParallaxEffect();
    }
    
    // Animations au scroll
    initScrollAnimations() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer tous les éléments avec data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    animateOnScroll(element) {
        if (this.animatedElements.has(element)) return;
        
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        // Ajouter la classe d'animation après le délai
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.6s ease-out';
            
            // Animation spécifique selon le type
            switch(animationType) {
                case 'fade-up':
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    break;
                case 'fade-down':
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(-30px)';
                    break;
                case 'fade-left':
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-30px)';
                    break;
                case 'fade-right':
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(30px)';
                    break;
                case 'zoom-in':
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.9)';
                    break;
                case 'zoom-out':
                    element.style.opacity = '0';
                    element.style.transform = 'scale(1.1)';
                    break;
            }
            
            // Déclencher l'animation
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = animationType.includes('zoom') ? 'scale(1)' : 'translate(0)';
                this.animatedElements.add(element);
            }, 50);
            
        }, parseInt(delay));
    }
    
    // Effets au survol
    initHoverEffects() {
        // Cartes de mission
        const missionCards = document.querySelectorAll('.mission-card');
        missionCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover);
            card.addEventListener('mouseleave', this.handleCardLeave);
        });
        
        // Cartes d'actualités
        const newsCards = document.querySelectorAll('.news-card');
        newsCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleNewsCardHover);
            card.addEventListener('mouseleave', this.handleNewsCardLeave);
        });
        
        // Boutons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', this.handleButtonHover);
            btn.addEventListener('mouseleave', this.handleButtonLeave);
        });
    }
    
    handleCardHover(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    }
    
    handleCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
    }
    
    handleNewsCardHover(e) {
        const card = e.currentTarget;
        const link = card.querySelector('.news-link');
        if (link) {
            link.style.transform = 'translateX(5px)';
        }
    }
    
    handleNewsCardLeave(e) {
        const card = e.currentTarget;
        const link = card.querySelector('.news-link');
        if (link) {
            link.style.transform = 'translateX(0)';
        }
    }
    
    handleButtonHover(e) {
        const btn = e.currentTarget;
        btn.style.transform = 'translateY(-2px)';
    }
    
    handleButtonLeave(e) {
        const btn = e.currentTarget;
        btn.style.transform = 'translateY(0)';
    }
    
    // Animations de chargement
    initLoadingAnimations() {
        // Animation des barres de graphique
        this.animateChartBars();
        
        // Animation des icônes
        this.animateIcons();
    }
    
    animateChartBars() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'growBar 1s ease-out forwards';
            }, index * 200);
        });
    }
    
    animateIcons() {
        const icons = document.querySelectorAll('.mission-icon, .stat-icon');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'pulseIcon 2s infinite';
            }, index * 100);
        });
    }
    
    // Effet parallaxe
    initParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // Animation de type machine à écrire
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Animation de compteur numérique
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const counter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start).toLocaleString();
                requestAnimationFrame(counter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        counter();
    }
}

// CSS Animations dynamiques
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes growBar {
            from { transform: scaleY(0); opacity: 0; }
            to { transform: scaleY(1); opacity: 1; }
        }
        
        @keyframes pulseIcon {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
            }
            40%, 43% {
                transform: translate3d(0,-10px,0);
            }
            70% {
                transform: translate3d(0,-5px,0);
            }
            90% {
                transform: translate3d(0,-2px,0);
            }
        }
        
        .bounce {
            animation: bounce 1s ease infinite;
        }
        
        .pulse {
            animation: pulseIcon 2s infinite;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', function() {
    addDynamicAnimations();
    window.animationsManager = new AnimationsManager();
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationsManager;
}
