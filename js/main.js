// ===== MAIN JAVASCRIPT FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSmoothScrolling();
    initPerformanceOptimizations();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show navbar when user starts scrolling
            if (scrollTop > 0) {
                navbar.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
            }
            
            // Add scrolled class for additional styling
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keep scroll indicator always visible
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.display = 'block';
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .service-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Progressive dotted line animations
    initProgressiveDottedLines();
    
    // Vertical line fade in animation
    initVerticalLineFadeIn();
    
    // Analysis section line fade in animation
    initAnalysisLineFadeIn();
    
    // Horn wiggle animation
    initHornWiggle();
    
    // Initialize Mapbox map
    initAnalysisMap();
    
    // Service section bold text animations
    initServiceTextAnimations();
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== VERTICAL LINE FADE IN ANIMATION =====
function initVerticalLineFadeIn() {
    const verticalLine1 = document.querySelector('.vertical-line-1');
    const verticalLine2 = document.querySelector('.vertical-line-2');
    const verticalLine3 = document.querySelector('.vertical-line-3');
    const pinIcon = document.querySelector('.pin-icon');
    const engagementContent = document.querySelector('.engagement-content');
    const hornIcon = document.querySelector('.horn-icon');
    const fixedLine1 = document.querySelector('.fixed-line-1');
    const fixedLine2 = document.querySelector('.fixed-line-2');
    const fixedLine3 = document.querySelector('.fixed-line-3');
    const fixedLine4 = document.querySelector('.fixed-line-4');
    const fixedLine5 = document.querySelector('.fixed-line-5');
    const fixedLine6 = document.querySelector('.fixed-line-6');
    const fixedLine7 = document.querySelector('.fixed-line-7');
    const fixedLine8 = document.querySelector('.fixed-line-8');
    const fixedLine9 = document.querySelector('.fixed-line-9');
    const fixedLine10 = document.querySelector('.fixed-line-10');
    const fixedLine11 = document.querySelector('.fixed-line-11');
    const fixedLine12 = document.querySelector('.fixed-line-12');
    const blankSection = document.querySelector('.engagement');
    
    if (!verticalLine1 || !verticalLine2 || !verticalLine3 || !pinIcon || !engagementContent || !hornIcon || !fixedLine1 || !fixedLine2 || !fixedLine3 || !fixedLine4 || !fixedLine5 || !fixedLine6 || !fixedLine7 || !fixedLine8 || !fixedLine9 || !fixedLine10 || !fixedLine11 || !fixedLine12 || !blankSection) return;
    
    // Show the lines when user scrolls into the blank section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const bottomOfViewport = scrollPosition + viewportHeight;
        const blankSectionTop = blankSection.offsetTop;
        const distanceFromBottom = blankSectionTop - bottomOfViewport;
        
        // Convert vh units to pixels for consistent cross-screen behavior
        const vhToPx = (vh) => (vh / 100) * viewportHeight;
        
        // Check if top of viewport has reached the content section
        const topOfViewportReachedContent = scrollPosition >= blankSectionTop;
        
        // First line fades in when bottom of viewport is 5vh before the blank section
        if (distanceFromBottom < -vhToPx(20)) {
            verticalLine1.style.opacity = '1';
        } else {
            verticalLine1.style.opacity = '0';
        }
        
        // Second line fades in when bottom of viewport is 15vh before the blank section
        if (distanceFromBottom < -vhToPx(26)) {
            verticalLine2.style.opacity = '1';
        } else {
            verticalLine2.style.opacity = '0';
        }
        
        // Third line fades in when bottom of viewport is 25vh before the blank section
        if (distanceFromBottom < -vhToPx(32)) {
            verticalLine3.style.opacity = '1';
        } else {
            verticalLine3.style.opacity = '0';
        }
        
        // Pin icon fades in when bottom of viewport is 35vh before the engagement section
        if (distanceFromBottom < -vhToPx(38)) {
            pinIcon.style.opacity = '1';
        } else {
            pinIcon.style.opacity = '0';
        }
        
        // Engagement content fade in when bottom of viewport is 35vh before the blank section
        if (distanceFromBottom < -vhToPx(66)) {
            engagementContent.style.opacity = '1';
            engagementContent.style.transform = 'translateY(0px)';
            hornIcon.style.opacity = '1';
            hornIcon.style.transform = 'translateY(0px)';
        } else {
            engagementContent.style.opacity = '0';
            engagementContent.style.transform = 'translateY(30px)';
            hornIcon.style.opacity = '0';
            hornIcon.style.transform = 'translateY(30px)';
        }
        
        
        // Fixed lines appear based on distance from bottom of viewport to engagement section
        // First fixed line appears when bottom of viewport is 40vh before the engagement section
        if (distanceFromBottom < -vhToPx(46)) {
            fixedLine1.style.opacity = '1';
        } else {
            fixedLine1.style.opacity = '0';
        }
        
        // Second fixed line appears when bottom of viewport is 45vh before the engagement section
        if (distanceFromBottom < -vhToPx(52)) {
            fixedLine2.style.opacity = '1';
        } else {
            fixedLine2.style.opacity = '0';
        }
        
        // Third fixed line appears when bottom of viewport is 50vh before the engagement section
        if (distanceFromBottom < -vhToPx(58)) {
            fixedLine3.style.opacity = '1';
        } else {
            fixedLine3.style.opacity = '0';
        }
        
        // Fourth fixed line appears when bottom of viewport is 55vh before the engagement section
        if (distanceFromBottom < -vhToPx(64)) {
            fixedLine4.style.opacity = '1';
        } else {
            fixedLine4.style.opacity = '0';
        }
        
        // Fifth fixed line appears when bottom of viewport is 60vh before the engagement section
        if (distanceFromBottom < -vhToPx(70)) {
            fixedLine5.style.opacity = '1';
        } else {
            fixedLine5.style.opacity = '0';
        }
        
        // Sixth fixed line appears when bottom of viewport is 65vh before the engagement section
        if (distanceFromBottom < -vhToPx(76)) {
            fixedLine6.style.opacity = '1';
        } else {
            fixedLine6.style.opacity = '0';
        }
        
        // Seventh fixed line appears when bottom of viewport is 70vh before the engagement section
        if (distanceFromBottom < -vhToPx(82)) {
            fixedLine7.style.opacity = '1';
        } else {
            fixedLine7.style.opacity = '0';
        }
        
        // Eighth fixed line appears when bottom of viewport is 75vh before the engagement section
        if (distanceFromBottom < -vhToPx(88)) {
            fixedLine8.style.opacity = '1';
        } else {
            fixedLine8.style.opacity = '0';
        }
        
        // Ninth fixed line appears when bottom of viewport is 94vh before the engagement section
        if (distanceFromBottom < -vhToPx(94)) {
            fixedLine9.style.opacity = '1';
        } else {
            fixedLine9.style.opacity = '0';
        }
        
        // Tenth fixed line appears when bottom of viewport is 100vh before the engagement section
        if (distanceFromBottom < -vhToPx(100)) {
            fixedLine10.style.opacity = '1';
        } else {
            fixedLine10.style.opacity = '0';
        }
        
        // Eleventh fixed line appears when bottom of viewport is 106vh before the engagement section
        if (distanceFromBottom < -vhToPx(106)) {
            fixedLine11.style.opacity = '1';
        } else {
            fixedLine11.style.opacity = '0';
        }
        
        // Twelfth fixed line appears when bottom of viewport is 112vh before the engagement section
        if (distanceFromBottom < -vhToPx(112)) {
            fixedLine12.style.opacity = '1';
        } else {
            fixedLine12.style.opacity = '0';
        }
    });
}

// ===== HORN WIGGLE ANIMATION =====
function initHornWiggle() {
    const hornIcon = document.querySelector('.horn-icon');
    
    if (!hornIcon) return;
    
    let wiggleInterval;
    let isHovering = false;
    let hasBeenClicked = false;
    
    // Add wiggle animation every 2 seconds
    function startWiggle() {
        wiggleInterval = setInterval(function() {
            // Only wiggle if horn is visible and not hovering
            if (hornIcon.style.opacity === '1' && !isHovering) {
                hornIcon.style.transform = 'translateY(0px) rotate(-12deg)';
                
                setTimeout(function() {
                    if (!isHovering) hornIcon.style.transform = 'translateY(0px) rotate(12deg)';
                }, 150);
                
                setTimeout(function() {
                    if (!isHovering) hornIcon.style.transform = 'translateY(0px) rotate(-8deg)';
                }, 300);
                
                setTimeout(function() {
                    if (!isHovering) hornIcon.style.transform = 'translateY(0px) rotate(0deg)';
                }, 450);
            }
        }, 2000);
    }
    
    // Start the wiggle animation
    startWiggle();
    
    // Add hover event listeners
    hornIcon.addEventListener('mouseenter', function() {
        isHovering = true;
        hornIcon.style.cursor = 'pointer';
        hornIcon.src = 'assets/images/Horn.svg';
        hornIcon.style.transform = 'translateY(0px) rotate(0deg) scale(1.1)';
        clearInterval(wiggleInterval);
    });
    
    hornIcon.addEventListener('mouseleave', function() {
        isHovering = false;
        hornIcon.style.cursor = 'default';
        // Keep Horn.svg if it has been clicked, otherwise revert to horn_click.svg
        if (hasBeenClicked) {
            hornIcon.src = 'assets/images/Horn.svg';
        } else {
            hornIcon.src = 'assets/images/horn_click.svg';
        }
        hornIcon.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
        // Restart wiggle animation after a short delay
        setTimeout(startWiggle, 100);
    });
    
    // Add click event listener for typewriter text
    hornIcon.addEventListener('click', function() {
        hasBeenClicked = true;
        // Remove existing typewriter text if it exists
        const existingText = document.querySelector('.horn-typewriter-text');
        if (existingText) {
            existingText.remove();
        }
        
        // Remove existing group image if it exists
        const existingGroupImage = document.querySelector('.horn-group-image');
        if (existingGroupImage) {
            existingGroupImage.remove();
        }
        
        // Create and fade in Group-01.png image
        const groupImage = document.createElement('img');
        groupImage.src = 'assets/images/Group-01.png';
        groupImage.className = 'horn-group-image';
        groupImage.style.position = 'absolute';
        groupImage.style.left = '12vw';
        groupImage.style.top = '40vh';
        groupImage.style.height = 'auto';
        groupImage.style.width = '80vw';
        groupImage.style.opacity = '0';
        groupImage.style.transition = 'opacity 0.8s ease';
        groupImage.style.zIndex = '8';
        groupImage.style.pointerEvents = 'none';
        
        // Append to engagement section
        const engagementSection = document.querySelector('.engagement');
        engagementSection.appendChild(groupImage);
        
        // Fade in the image
        setTimeout(() => {
            groupImage.style.opacity = '1';
        }, 250);
        
        // Create and fly in Group-02.png image after 0.5 seconds
        setTimeout(() => {
            // Remove existing group2 image if it exists
            const existingGroup2Image = document.querySelector('.horn-group2-image');
            if (existingGroup2Image) {
                existingGroup2Image.remove();
            }
            
            // Create Group-02.png image with fly-in effect
            const group2Image = document.createElement('img');
            group2Image.src = 'assets/images/Group-02.png';
            group2Image.className = 'horn-group2-image';
            group2Image.style.position = 'absolute';
            group2Image.style.left = '12vw';
            group2Image.style.top = '40vh';
            group2Image.style.height = 'auto';
            group2Image.style.width = '80vw';
            group2Image.style.objectFit = 'cover';
            group2Image.style.objectPosition = 'center';
            group2Image.style.opacity = '0';
            group2Image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            group2Image.style.zIndex = '10';
            group2Image.style.pointerEvents = 'none';
            group2Image.style.transform = 'translateX(-100vw)';
            
            // Append to engagement section
            engagementSection.appendChild(group2Image);
            
            // Fly in from left and fade in
            setTimeout(() => {
                group2Image.style.transform = 'translateX(0)';
                group2Image.style.opacity = '1';
            }, 50);
        }, 250);
        
        // Create and fly in Group-03.png image after 1 second
        setTimeout(() => {
            // Remove existing group3 image if it exists
            const existingGroup3Image = document.querySelector('.horn-group3-image');
            if (existingGroup3Image) {
                existingGroup3Image.remove();
            }
            
            // Create Group-03.png image with fly-in effect from right
            const group3Image = document.createElement('img');
            group3Image.src = 'assets/images/Group-03.png';
            group3Image.className = 'horn-group3-image';
            group3Image.style.position = 'absolute';
            group3Image.style.left = '12vw';
            group3Image.style.top = '40vh';
            group3Image.style.height = 'auto';
            group3Image.style.width = '80vw';
            group3Image.style.objectFit = 'cover';
            group3Image.style.objectPosition = 'center';
            group3Image.style.opacity = '0';
            group3Image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            group3Image.style.zIndex = '10';
            group3Image.style.pointerEvents = 'none';
            group3Image.style.transform = 'translateX(100vw)';
            
            // Append to engagement section
            engagementSection.appendChild(group3Image);
            
            // Fly in from right and fade in
            setTimeout(() => {
                group3Image.style.transform = 'translateX(0)';
                group3Image.style.opacity = '1';
            }, 50);
        }, 500);
        
        // Create and fly in Group-04.png image after 0.75 seconds
        setTimeout(() => {
            // Remove existing group4 image if it exists
            const existingGroup4Image = document.querySelector('.horn-group4-image');
            if (existingGroup4Image) {
                existingGroup4Image.remove();
            }
            
            // Create Group-04.png image with fly-in effect from left
            const group4Image = document.createElement('img');
            group4Image.src = 'assets/images/Group-04.png';
            group4Image.className = 'horn-group4-image';
            group4Image.style.position = 'absolute';
            group4Image.style.left = '12vw';
            group4Image.style.top = '40vh';
            group4Image.style.height = 'auto';
            group4Image.style.width = '80vw';
            group4Image.style.objectFit = 'cover';
            group4Image.style.objectPosition = 'center';
            group4Image.style.opacity = '0';
            group4Image.style.transition = 'opacity 0.8s ease, transform 1s ease';
            group4Image.style.zIndex = '9';
            group4Image.style.pointerEvents = 'none';
            group4Image.style.transform = 'translateX(-100vw)';
            
            // Append to engagement section
            engagementSection.appendChild(group4Image);
            
            // Fly in from left and fade in
            setTimeout(() => {
                group4Image.style.transform = 'translateX(0)';
                group4Image.style.opacity = '1';
            }, 50);
        }, 750);
        
        // Create typewriter text element
        const hornTypewriterEl = document.createElement('div');
        hornTypewriterEl.className = 'horn-typewriter-text';
        hornTypewriterEl.style.position = 'absolute';
        hornTypewriterEl.style.top = 'min(32vh, 350px)';
        
        // Position text based on viewport width
        if (window.innerWidth < 500) {
            // On narrow screens, position text to the left of the horn
            hornTypewriterEl.style.left = '18vw';
            hornTypewriterEl.style.top = '45vh';
        } else {
            // On wider screens, position text to the right of the horn
            hornTypewriterEl.style.left = 'calc(18vw + min(8vw, 120px) + 2vw)';
        }
        
        hornTypewriterEl.style.transform = 'none';
        hornTypewriterEl.style.width = 'min(70vw, 500px)';
        hornTypewriterEl.style.maxWidth = '500px';
        hornTypewriterEl.style.fontSize = '24px';
        hornTypewriterEl.style.fontFamily = "'Raleway', sans-serif";
        hornTypewriterEl.style.fontWeight = '700';
        hornTypewriterEl.style.color = '#A6785D';
        hornTypewriterEl.style.lineHeight = '1.4';
        hornTypewriterEl.style.zIndex = '15';
        hornTypewriterEl.style.opacity = '0';
        hornTypewriterEl.style.transition = 'opacity 0.3s ease';
        
        // Append to engagement section
        engagementSection.appendChild(hornTypewriterEl);
        
        // Fade in the container
        hornTypewriterEl.style.opacity = '1';
        
        // Start typewriter effect
        const text = "Bring stakeholders together through thoughtful, sincere engagement.";
        typeWriter(text, hornTypewriterEl, 25);
    });
}

// ===== ANALYSIS SECTION LINE FADE IN ANIMATION =====
function initAnalysisLineFadeIn() {
    const verticalLine1Analysis = document.querySelector('.vertical-line-1-analysis');
    const verticalLine2Analysis = document.querySelector('.vertical-line-2-analysis');
    const verticalLine3Analysis = document.querySelector('.vertical-line-3-analysis');
    const pinIconAnalysis = document.querySelector('.pin-icon-analysis');
    const analysisContent = document.querySelector('.analysis-content');
    const analysisMap = document.getElementById('analysis-map');
    const fixedLine1Analysis = document.querySelector('.fixed-line-1-analysis');
    const fixedLine2Analysis = document.querySelector('.fixed-line-2-analysis');
    const fixedLine3Analysis = document.querySelector('.fixed-line-3-analysis');
    const fixedLine4Analysis = document.querySelector('.fixed-line-4-analysis');
    const fixedLine5Analysis = document.querySelector('.fixed-line-5-analysis');
    const fixedLine6Analysis = document.querySelector('.fixed-line-6-analysis');
    const fixedLine7Analysis = document.querySelector('.fixed-line-7-analysis');
    const fixedLine8Analysis = document.querySelector('.fixed-line-8-analysis');
    const fixedLine9Analysis = document.querySelector('.fixed-line-9-analysis');
    const fixedLine10Analysis = document.querySelector('.fixed-line-10-analysis');
    const fixedLine11Analysis = document.querySelector('.fixed-line-11-analysis');
    const fixedLine12Analysis = document.querySelector('.fixed-line-12-analysis');
    const analysisSection = document.querySelector('.analysis');
    
    if (!verticalLine1Analysis || !verticalLine2Analysis || !verticalLine3Analysis || !pinIconAnalysis || !analysisContent || !analysisMap || !fixedLine1Analysis || !fixedLine2Analysis || !fixedLine3Analysis || !fixedLine4Analysis || !fixedLine5Analysis || !fixedLine6Analysis || !fixedLine7Analysis || !fixedLine8Analysis || !fixedLine9Analysis || !fixedLine10Analysis || !fixedLine11Analysis || !fixedLine12Analysis || !analysisSection) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const sectionTop = analysisSection.offsetTop;
        const distanceFromBottom = sectionTop - (scrollTop + viewportHeight);
        
        // Convert vh units to pixels for consistent cross-screen behavior
        const vhToPx = (vh) => (vh / 100) * viewportHeight;
        
        // First line fades in when bottom of viewport is 5vh before the analysis section
        if (distanceFromBottom < -vhToPx(20)) {
            verticalLine1Analysis.style.opacity = '1';
        } else {
            verticalLine1Analysis.style.opacity = '0';
        }
        
        // Second line fades in when bottom of viewport is 15vh before the analysis section
        if (distanceFromBottom < -vhToPx(26)) {
            verticalLine2Analysis.style.opacity = '1';
        } else {
            verticalLine2Analysis.style.opacity = '0';
        }
        
        // Third line fades in when bottom of viewport is 25vh before the analysis section
        if (distanceFromBottom < -vhToPx(32)) {
            verticalLine3Analysis.style.opacity = '1';
        } else {
            verticalLine3Analysis.style.opacity = '0';
        }
        
        // Pin icon fades in when bottom of viewport is 35vh before the analysis section
        if (distanceFromBottom < -vhToPx(38)) {
            pinIconAnalysis.style.opacity = '1';
        } else {
            pinIconAnalysis.style.opacity = '0';
        }
        
        // Analysis content fade in when bottom of viewport is 35vh before the analysis section
        if (distanceFromBottom < -vhToPx(66)) {
            analysisContent.style.opacity = '1';
            analysisContent.style.transform = 'translateY(0px)';
        } else {
            analysisContent.style.opacity = '0';
            analysisContent.style.transform = 'translateY(30px)';
        }
        
        // Map fades in later when bottom of viewport is 66vh before the analysis section
        if (distanceFromBottom < -vhToPx(90)) {
            analysisMap.style.opacity = '1';
        } else {
            analysisMap.style.opacity = '0';
        }
        
        // Fixed lines appear based on distance from bottom of viewport to analysis section
        
        // First fixed line appears when bottom of viewport is 40vh before the analysis section
        if (distanceFromBottom < -vhToPx(46)) {
            fixedLine1Analysis.style.opacity = '1';
        } else {
            fixedLine1Analysis.style.opacity = '0';
        }
        
        // Second fixed line appears when bottom of viewport is 52vh before the analysis section
        if (distanceFromBottom < -vhToPx(52)) {
            fixedLine2Analysis.style.opacity = '1';
        } else {
            fixedLine2Analysis.style.opacity = '0';
        }
        
        // Third fixed line appears when bottom of viewport is 58vh before the analysis section
        if (distanceFromBottom < -vhToPx(58)) {
            fixedLine3Analysis.style.opacity = '1';
        } else {
            fixedLine3Analysis.style.opacity = '0';
        }
        
        // Fourth fixed line appears when bottom of viewport is 64vh before the analysis section
        if (distanceFromBottom < -vhToPx(64)) {
            fixedLine4Analysis.style.opacity = '1';
        } else {
            fixedLine4Analysis.style.opacity = '0';
        }
        
        // Fifth fixed line appears when bottom of viewport is 70vh before the analysis section
        if (distanceFromBottom < -vhToPx(70)) {
            fixedLine5Analysis.style.opacity = '1';
        } else {
            fixedLine5Analysis.style.opacity = '0';
        }
        
        // Sixth fixed line appears when bottom of viewport is 76vh before the analysis section
        if (distanceFromBottom < -vhToPx(76)) {
            fixedLine6Analysis.style.opacity = '1';
        } else {
            fixedLine6Analysis.style.opacity = '0';
        }
        
        // Seventh fixed line appears when bottom of viewport is 82vh before the analysis section
        if (distanceFromBottom < -vhToPx(82)) {
            fixedLine7Analysis.style.opacity = '1';
        } else {
            fixedLine7Analysis.style.opacity = '0';
        }
        
        // Eighth fixed line appears when bottom of viewport is 88vh before the analysis section
        if (distanceFromBottom < -vhToPx(88)) {
            fixedLine8Analysis.style.opacity = '1';
        } else {
            fixedLine8Analysis.style.opacity = '0';
        }
        
        // Ninth fixed line appears when bottom of viewport is 94vh before the analysis section
        if (distanceFromBottom < -vhToPx(94)) {
            fixedLine9Analysis.style.opacity = '1';
        } else {
            fixedLine9Analysis.style.opacity = '0';
        }
        
        // Tenth fixed line appears when bottom of viewport is 100vh before the analysis section
        if (distanceFromBottom < -vhToPx(100)) {
            fixedLine10Analysis.style.opacity = '1';
        } else {
            fixedLine10Analysis.style.opacity = '0';
        }
        
        // Eleventh fixed line appears when bottom of viewport is 106vh before the analysis section
        if (distanceFromBottom < -vhToPx(106)) {
            fixedLine11Analysis.style.opacity = '1';
        } else {
            fixedLine11Analysis.style.opacity = '0';
        }
        
        // Twelfth fixed line appears when bottom of viewport is 112vh before the analysis section
        if (distanceFromBottom < -vhToPx(112)) {
            fixedLine12Analysis.style.opacity = '1';
        } else {
            fixedLine12Analysis.style.opacity = '0';
        }
    });
}

// ===== MAPBOX MAP INITIALIZATION =====
function initAnalysisMap() {
    // Set Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjYXNob3JucyIsImEiOiJjbTZ6ZGtweWMwM2RzMnFvbWJ2NGVoNjU1In0.dU3kPMeYYDdlAowT1VonWQ';
    
    // Create map with mobile-optimized settings
    const map = new mapboxgl.Map({
        container: 'analysis-map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-111.71406564891637, 39.400787429800836],
        zoom: 5.5,
        scrollZoom: false, // Prevents accidental scroll zoom
        touchZoomRotate: true, // Enables pinch to zoom on mobile
        touchPitch: false, // Disables tilt gesture (simpler interaction)
        dragRotate: false, // Disables rotation for simpler interaction
        dragPan: true // Enables drag to pan (touch and mouse)
    });
    
    
    // Add zoom controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    // Add custom marker with label
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.position = 'relative';
    el.style.width = '40px';
    el.style.height = '40px';
    
    // Create the pin image
    const pinImg = document.createElement('div');
    pinImg.style.backgroundImage = 'url(assets/images/pin.png)';
    pinImg.style.width = '40px';
    pinImg.style.height = '40px';
    pinImg.style.backgroundSize = 'contain';
    pinImg.style.backgroundRepeat = 'no-repeat';
    pinImg.style.backgroundPosition = 'center';
    pinImg.style.transition = 'all 0.3s ease';
    pinImg.style.cursor = 'pointer';
    pinImg.style.transformOrigin = 'bottom center';
    
    // Create the "Click Me" label
    const label = document.createElement('div');
    label.className = 'pin-label';
    label.textContent = 'Click Me';
    label.style.position = 'absolute';
    label.style.bottom = '48px';
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    label.style.whiteSpace = 'nowrap';
    label.style.fontFamily = "'Raleway', sans-serif";
    label.style.fontSize = '18px';
    label.style.fontWeight = '700';
    label.style.color = '#594032';
    label.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)';
    label.style.opacity = '0'; // Start hidden - controlled only by pulse animation
    
    el.appendChild(pinImg);
    el.appendChild(label);
    
    // Track hover state to control label visibility
    let isHovering = false;
    
    // Hover effects (grow from bottom)
    el.addEventListener('mouseenter', function() {
        isHovering = true;
        pinImg.style.transform = 'scale(1.15)';
        label.style.opacity = '0';
    });
    
    el.addEventListener('mouseleave', function() {
        isHovering = false;
        pinImg.style.transform = 'scale(1)';
        // Don't set label opacity here - let pulse animation control it
    });
    
    // Click to zoom to polygon - fit bounds to show entire polygon
    el.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from reaching the map/polygon
        
        // Define bounds for the polygon (adjust these based on your actual polygon extent)
        // These bounds encompass the Salt Lake County area
        const bounds = [
            [-112.2, 40.4], // Southwest coordinates [lng, lat]
            [-111.6, 40.9]  // Northeast coordinates [lng, lat]
        ];
        
        map.fitBounds(bounds, {
            padding: {top: 50, bottom: 50, left: 50, right: 50}, // Adds padding for mobile
            duration: 2000,
            maxZoom: 10 // Prevents zooming in too far on mobile
        });
        
        // Trigger typewriter text 1.5 seconds after clicking the pin
        setTimeout(function() {
            if (window.typewriterEl && window.typeWriter && !window.isTextVisible) {
                window.typeWriter(window.typewriterText, window.typewriterEl);
                window.isTextVisible = true;
            }
        }, 1500);
    });
    
    // Set transitions to exactly match for perfect synchronization
    const transitionDuration = '0.3s';
    const transitionEasing = 'ease';
    label.style.transition = `opacity ${transitionDuration} ${transitionEasing}`;
    pinImg.style.transition = `opacity ${transitionDuration} ${transitionEasing}, transform ${transitionDuration} ${transitionEasing}`;
    
    // Hide label after zoom 7.5 and pin after zoom level 7
    map.on('zoom', function() {
        const currentZoom = map.getZoom();
        
        // Fade out pin after zoom 7
        if (currentZoom > 7) {
            pinImg.style.opacity = '0';
            label.style.opacity = '0';
        } else {
            pinImg.style.opacity = '1';
            // Hide label after zoom 7.5, but let pulse control it before that
            if (currentZoom > 7.5) {
                label.style.opacity = '0';
            }
            // Label opacity will be controlled by pulse when zoom <= 7.5
        }
    });
    
    // Add pulsing grow effect to pin and fade effect to label (synchronized)
    // Delay the first pulse so pin stays small initially
    setTimeout(function() {
        // First pulse
        pinImg.style.transform = 'scale(1.2)';
        // Only show label if not hovering and zoom <= 7.5
        if (!isHovering && map.getZoom() <= 7.5) {
            label.style.opacity = '1';
        }
        
        setTimeout(function() {
            pinImg.style.transform = 'scale(1)';
            label.style.opacity = '0';
        }, 700); // 300ms transition + 400ms hold at peak
        
        // Then continue pulsing every 2 seconds
        setInterval(function() {
            pinImg.style.transform = 'scale(1.2)';
            // Only show label if not hovering and zoom <= 7.5
            if (!isHovering && map.getZoom() <= 7.5) {
                label.style.opacity = '1';
            }
            
            setTimeout(function() {
                pinImg.style.transform = 'scale(1)';
                label.style.opacity = '0';
            }, 700);
        }, 2000);
    }, 2000); // Wait 2 seconds before first pulse
    
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
    .setLngLat([-111.907, 40.669])
    .addTo(map);
    
    // Add polygon layer when map loads
    map.on('load', function() {
        // Add the tileset source
        map.addSource('helper-polygon', {
            type: 'vector',
            url: 'mapbox://lucashorns.4dw15jte'
        });
        
        // Add polygon fill layer
        map.addLayer({
            id: 'polygon-fill',
            type: 'fill',
            source: 'helper-polygon',
            'source-layer': 'SLCo-2lit8f',
            paint: {
                'fill-color': '#A6785D', // Static primary brown (no hover effect)
                'fill-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7, 0,
                    8, 0.6
                ]
            }
        });
        
        // Add polygon outline layer
        map.addLayer({
            id: 'polygon-outline',
            type: 'line',
            source: 'helper-polygon',
            'source-layer': 'SLCo-2lit8f',
            paint: {
                'line-color': '#594032',
                'line-width': 2,
                'line-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7, 0,
                    8, 1
                ]
            }
        });
        
        
        // Create typewriter text as an overlay div (positioned relative to map frame)
        const typewriterEl = document.createElement('div');
        typewriterEl.style.position = 'absolute';
        typewriterEl.style.top = '20%';
        typewriterEl.style.left = '5%';
        typewriterEl.style.transform = 'none';
        typewriterEl.style.color = '#594032';
        typewriterEl.style.fontFamily = "'Raleway', sans-serif";
        typewriterEl.style.fontSize = '24px';
        typewriterEl.style.fontWeight = '700';
        typewriterEl.style.width = '80%'; // 80% of map width
        typewriterEl.style.maxWidth = '350px'; // Max width for large screens
        typewriterEl.style.lineHeight = '1.5';
        typewriterEl.style.textAlign = 'left';
        typewriterEl.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7)';
        typewriterEl.style.opacity = '0';
        typewriterEl.style.pointerEvents = 'none';
        typewriterEl.style.zIndex = '10';
        
        // Append to map container instead of using marker
        document.getElementById('analysis-map').appendChild(typewriterEl);
        
        // Typewriter effect function
        function typeWriter(text, element, speed = 15) {
            element.textContent = '';
            element.style.opacity = '1';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }
        
        // Store typewriter text for use in pin click
        window.typewriterText = "Use data to tell the story of any place.";
        window.typewriterEl = typewriterEl;
        window.typeWriter = typeWriter;
        window.isTextVisible = false;
    });
}

// ===== PROGRESSIVE DOTTED LINE ANIMATIONS =====
function initProgressiveDottedLines() {
    // Hero dotted line - appears after a delay
    const heroDottedLine = document.querySelector('.hero-dotted-line');
    if (heroDottedLine) {
        setTimeout(() => {
            heroDottedLine.classList.add('visible');
        }, 2000); // Appear after 2 seconds on hero section
    }
    
    // Service section dotted lines - appear when section is in view
    const sectionDottedLines = document.querySelectorAll('.section-dotted-line');
    const progressiveDottedLines = document.querySelectorAll('.progressive-dotted-line');
    
    const dottedLineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 300); // Small delay for effect
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sectionDottedLines.forEach(line => {
        dottedLineObserver.observe(line);
    });
    
    progressiveDottedLines.forEach(line => {
        dottedLineObserver.observe(line);
    });
}

// ===== SERVICE TEXT ANIMATIONS =====
function initServiceTextAnimations() {
    const serviceSections = document.querySelectorAll('.service-section');
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the large title
                const largeTitle = entry.target.querySelector('.service-large-title');
                if (largeTitle) {
                    setTimeout(() => {
                        largeTitle.classList.add('visible');
                    }, 200);
                }
                
                // Animate the pin
                const pin = entry.target.querySelector('.service-pin');
                if (pin) {
                    setTimeout(() => {
                        pin.classList.add('visible');
                    }, 400);
                }
                
                // Animate street lines
                const streetLines = entry.target.querySelectorAll('.street-line');
                streetLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, 600 + (index * 200));
                });
            } else {
                // Reset animations when section is out of view
                const largeTitle = entry.target.querySelector('.service-large-title');
                const pin = entry.target.querySelector('.service-pin');
                const streetLines = entry.target.querySelectorAll('.street-line');
                
                if (largeTitle) largeTitle.classList.remove('visible');
                if (pin) pin.classList.remove('visible');
                streetLines.forEach(line => line.classList.remove('visible'));
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceSections.forEach(section => {
        serviceObserver.observe(section);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based functionality here
        }, 10);
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    // Performance mode for low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.classList.add('performance-mode');
    }
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, limit) {
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

// Debounce function for performance
function debounce(func, wait, immediate) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for custom elements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===== SERVICE WORKER REGISTRATION (for future PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ===== ANALYTICS INTEGRATION (placeholder) =====
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Analytics event:', { category, action, label });
    
    // Example: Google Analytics 4
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Track page views
function trackPageView(page) {
    trackEvent('Page', 'View', page);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        const buttonType = e.target.classList.contains('btn-primary') ? 'Primary' : 'Secondary';
        trackEvent('Button', 'Click', `${buttonType} - ${buttonText}`);
    }
});

// Track form interactions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('contact-form')) {
        trackEvent('Form', 'Submit', 'Contact Form');
    }
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isInViewport,
        getScrollPosition,
        trackEvent,
        trackPageView
    };
}
