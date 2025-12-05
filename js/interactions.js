// Interactive Element Effects
class InteractionsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupContactForm();
        this.setupFooter();
        this.setupCardEffects();
    }

    setupHoverEffects() {
        // Project cards 3D tilt effect
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.project-card, .dream-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                if (card.matches(':hover')) {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                }
            });
        });

        // Reset transform when mouse leaves
        document.querySelectorAll('.project-card, .dream-card').forEach(card => {
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    setupCardEffects() {
        // Glowing effect on skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('.btn');
                const originalText = submitBtn.innerHTML;
                
                // Simulate sending (you can add actual form submission logic here)
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
                    submitBtn.style.background = 'linear-gradient(135deg, #39ff14, #00ffff)';
                    
                    // Reset form
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 2000);
            });

            // Input field glow effects
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.style.boxShadow = '';
                    }
                });
            });
        }
    }

    setupFooter() {
        // Update current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Animated heart icon
        const heartIcon = document.querySelector('.footer-text .fa-heart');
        if (heartIcon) {
            setInterval(() => {
                heartIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    heartIcon.style.transform = 'scale(1)';
                }, 300);
            }, 2000);
        }
    }

    // Add ripple effect to buttons
    addRippleEffect(element, x, y) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Button click ripple effect styles (add to CSS dynamically)
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple-animation 0.6s;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Initialize interactions
let interactionsManager;
window.addEventListener('load', () => {
    // Wait for content to load
    setTimeout(() => {
        interactionsManager = new InteractionsManager();
    }, 1500);
});
