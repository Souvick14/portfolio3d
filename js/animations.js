// Scroll-based Animations using GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

class AnimationsManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for content to load
        setTimeout(() => {
            this.setupScrollAnimations();
            this.animateProficiencyBars();
            this.setupNavigation();
        }, 1000);
    }

    setupScrollAnimations() {
        // Fade in sections on scroll
        gsap.utils.toArray('.fade-in-up').forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.05,
                ease: 'power2.out'
            });
        });

        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            });
        });

        // Parallax effect for sections
        gsap.utils.toArray('.section').forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
                ease: 'none'
            });
        });
    }

    animateProficiencyBars() {
        // Animate skill proficiency bars
        gsap.utils.toArray('.proficiency-fill').forEach(bar => {
            const level = bar.getAttribute('data-level');
            
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                width: `${level}%`,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }

    setupNavigation() {
        // Active navigation link on scroll
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });

            // Hide/show nav on scroll
            const nav = document.getElementById('main-nav');
            if (window.scrollY > 100) {
                nav.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
                nav.style.boxShadow = '0 5px 20px rgba(139, 92, 246, 0.3)';
            } else {
                nav.style.backgroundColor = 'rgba(26, 26, 46, 0.7)';
                nav.style.boxShadow = 'none';
            }
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Number counting animation
    animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
}

// Initialize animations
let animationsManager;
window.addEventListener('load', () => {
    animationsManager = new AnimationsManager();
});
