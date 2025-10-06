// ===== PARALLAX SCROLLING FUNCTIONALITY =====

class ParallaxController {
    constructor() {
        this.elements = [];
        this.isEnabled = true;
        this.scrollY = 0;
        this.ticking = false;
        this.performanceMode = false;
        
        this.init();
    }
    
    init() {
        this.checkPerformanceMode();
        this.setupElements();
        this.bindEvents();
        this.startParallax();
    }
    
    checkPerformanceMode() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isEnabled = false;
            return;
        }
        
        // Check device capabilities
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            this.performanceMode = true;
        }
        
        // Check for low-end mobile devices
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
            const isLowEnd = navigator.deviceMemory && navigator.deviceMemory < 4;
            if (isLowEnd) {
                this.performanceMode = true;
            }
        }
    }
    
    setupElements() {
        // Hero section parallax elements
        const heroLayers = document.querySelectorAll('.hero .topographic-layer');
        heroLayers.forEach((layer, index) => {
            this.elements.push({
                element: layer,
                speed: 0.3 + (index * 0.2), // Different speeds for each layer
                offset: 0,
                type: 'hero'
            });
        });
        
        // Page header parallax elements
        const headerLayers = document.querySelectorAll('.page-header .topographic-layer');
        headerLayers.forEach((layer, index) => {
            this.elements.push({
                element: layer,
                speed: 0.2 + (index * 0.1),
                offset: 0,
                type: 'header'
            });
        });
        
        // Service section parallax elements
        const serviceLayers = document.querySelectorAll('.service-background .topographic-layer');
        serviceLayers.forEach((layer, index) => {
            this.elements.push({
                element: layer,
                speed: 0.15 + (index * 0.05),
                offset: 0,
                type: 'service'
            });
        });
        
        // Section parallax elements
        const sectionElements = document.querySelectorAll('.section-parallax');
        sectionElements.forEach((section, index) => {
            this.elements.push({
                element: section,
                speed: 0.1,
                offset: 0,
                type: 'section'
            });
        });
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            this.elements.push({
                element: element,
                speed: 0.05 + (index * 0.02),
                offset: 0,
                type: 'floating'
            });
        });
        
        // Progressive dotted line elements
        const progressiveDottedLines = document.querySelectorAll('.progressive-dotted-line, .section-dotted-line, .hero-dotted-line');
        progressiveDottedLines.forEach((line, index) => {
            this.elements.push({
                element: line,
                speed: 0,
                offset: 0,
                type: 'progressive-dotted-line'
            });
        });
    }
    
    bindEvents() {
        // Throttled scroll event
        window.addEventListener('scroll', this.throttle(() => {
            this.updateScrollPosition();
        }, 16)); // ~60fps
        
        // Resize event
        window.addEventListener('resize', this.debounce(() => {
            this.updateElements();
        }, 250));
        
        // Visibility change (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseParallax();
            } else {
                this.resumeParallax();
            }
        });
    }
    
    updateScrollPosition() {
        if (!this.isEnabled) return;
        
        this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateParallax() {
        this.elements.forEach(item => {
            if (!item.element || !this.isElementInViewport(item.element)) {
                return;
            }
            
            const rect = item.element.getBoundingClientRect();
            const elementTop = rect.top + this.scrollY;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate parallax offset
            const scrolled = this.scrollY;
            const rate = scrolled * -item.speed;
            
            // Apply different transforms based on element type
            switch (item.type) {
                case 'hero':
                    this.updateHeroParallax(item, rate);
                    break;
                case 'header':
                    this.updateHeaderParallax(item, rate);
                    break;
                case 'service':
                    this.updateServiceParallax(item, rate);
                    break;
                case 'section':
                    this.updateSectionParallax(item, rate);
                    break;
                case 'floating':
                    this.updateFloatingParallax(item, rate);
                    break;
                case 'progressive-dotted-line':
                    this.updateProgressiveDottedLineParallax(item, rate);
                    break;
            }
        });
        
        // Update CSS custom property for scroll position
        document.documentElement.style.setProperty('--scroll-y', `${this.scrollY}px`);
    }
    
    updateHeroParallax(item, rate) {
        const transform = `translateY(${rate}px)`;
        item.element.style.transform = transform;
        item.element.style.willChange = 'transform';
    }
    
    updateHeaderParallax(item, rate) {
        const transform = `translateY(${rate * 0.5}px)`;
        item.element.style.transform = transform;
        item.element.style.willChange = 'transform';
    }
    
    updateServiceParallax(item, rate) {
        const transform = `translateY(${rate * 0.3}px)`;
        item.element.style.transform = transform;
        item.element.style.willChange = 'transform';
    }
    
    updateSectionParallax(item, rate) {
        const transform = `translateY(${rate * 0.3}px)`;
        item.element.style.transform = transform;
        item.element.style.willChange = 'transform';
    }
    
    updateFloatingParallax(item, rate) {
        const rotation = rate * 0.1;
        const transform = `translateY(${rate}px) rotate(${rotation}deg)`;
        item.element.style.transform = transform;
        item.element.style.willChange = 'transform';
    }
    
    updateProgressiveDottedLineParallax(item, rate) {
        // Progressive dotted lines don't use parallax - they're triggered by scroll position
        // The visibility is handled by intersection observer in main.js
        item.element.style.willChange = 'width';
    }
    
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }
    
    updateElements() {
        // Recalculate element positions on resize
        this.elements.forEach(item => {
            if (item.element) {
                item.offset = item.element.offsetTop;
            }
        });
    }
    
    pauseParallax() {
        this.isEnabled = false;
        this.elements.forEach(item => {
            if (item.element) {
                item.element.style.willChange = 'auto';
            }
        });
    }
    
    resumeParallax() {
        this.isEnabled = true;
        this.elements.forEach(item => {
            if (item.element) {
                item.element.style.willChange = 'transform';
            }
        });
    }
    
    startParallax() {
        if (this.isEnabled) {
            this.updateScrollPosition();
        }
    }
    
    // Performance utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// ===== TOPOGRAPHIC ANIMATION CONTROLLER =====
class TopographicAnimator {
    constructor() {
        this.animations = [];
        this.isEnabled = true;
        this.init();
    }
    
    init() {
        this.checkReducedMotion();
        this.setupAnimations();
        this.startAnimations();
    }
    
    checkReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isEnabled = false;
        }
    }
    
    setupAnimations() {
        const topographicLayers = document.querySelectorAll('.topographic-layer');
        
        topographicLayers.forEach((layer, index) => {
            this.animations.push({
                element: layer,
                animationId: null,
                startTime: null,
                duration: 20000 + (index * 5000), // Different durations
                direction: index % 2 === 0 ? 1 : -1
            });
        });
    }
    
    startAnimations() {
        if (!this.isEnabled) return;
        
        this.animations.forEach(animation => {
            this.animateLayer(animation);
        });
    }
    
    animateLayer(animation) {
        const animate = (timestamp) => {
            if (!animation.startTime) {
                animation.startTime = timestamp;
            }
            
            const elapsed = timestamp - animation.startTime;
            const progress = (elapsed % animation.duration) / animation.duration;
            
            // Create smooth floating motion
            const yOffset = Math.sin(progress * Math.PI * 2) * 20;
            const rotation = Math.sin(progress * Math.PI * 2) * 2 * animation.direction;
            const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.02;
            
            // Apply transform
            const transform = `translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`;
            animation.element.style.transform = transform;
            
            // Continue animation
            animation.animationId = requestAnimationFrame(animate);
        };
        
        animation.animationId = requestAnimationFrame(animate);
    }
    
    stopAnimations() {
        this.animations.forEach(animation => {
            if (animation.animationId) {
                cancelAnimationFrame(animation.animationId);
                animation.animationId = null;
            }
        });
    }
    
    pauseAnimations() {
        this.animations.forEach(animation => {
            if (animation.animationId) {
                cancelAnimationFrame(animation.animationId);
            }
        });
    }
    
    resumeAnimations() {
        this.startAnimations();
    }
}

// ===== SCROLL-TRIGGERED ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupElements();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
    }
    
    setupElements() {
        // Fade in up elements
        const fadeUpElements = document.querySelectorAll('.fade-in-up');
        fadeUpElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });
        
        // Fade in left elements
        const fadeLeftElements = document.querySelectorAll('.fade-in-left');
        fadeLeftElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });
        
        // Fade in right elements
        const fadeRightElements = document.querySelectorAll('.fade-in-right');
        fadeRightElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });
        
        // Scale in elements
        const scaleElements = document.querySelectorAll('.scale-in');
        scaleElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });
    }
    
    animateElement(element) {
        element.classList.add('visible');
        this.observer.unobserve(element);
    }
}

// ===== INITIALIZE PARALLAX SYSTEMS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax controller
    window.parallaxController = new ParallaxController();
    
    // Initialize topographic animator
    window.topographicAnimator = new TopographicAnimator();
    
    // Initialize scroll animations
    window.scrollAnimations = new ScrollAnimations();
    
    // Performance monitoring
    if (window.performance && window.performance.mark) {
        window.performance.mark('parallax-init-end');
    }
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParallaxController,
        TopographicAnimator,
        ScrollAnimations
    };
}
