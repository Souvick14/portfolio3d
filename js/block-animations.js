// Block Animations and Scroll Effects

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all cards and blocks
function observeElements() {
    const elements = document.querySelectorAll('.card, .block');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect on scroll
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating blocks in 3D scene
    if (window.floatingBlocks) {
        window.floatingBlocks.forEach((block, index) => {
            block.position.z = -30 + (scrolled * 0.01 * (index % 3));
        });
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Animate proficiency bars
function animateProficiencyBars() {
    const bars = document.querySelectorAll('.proficiency-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => {
        bar.style.width = '0%';
        barObserver.observe(bar);
    });
}

// 3D tilt effect on mouse move for blocks and project cards
function init3DTilt() {
    const blocks = document.querySelectorAll('.block, .card, .skill-card, .project-card');
    
    blocks.forEach(block => {
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Stronger tilt for project cards
            const isProjectCard = block.classList.contains('project-card');
            const intensity = isProjectCard ? 15 : 10;
            
            const rotateX = (y - centerY) / intensity;
            const rotateY = (centerX - x) / intensity;
            
            block.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            block.style.transition = 'transform 0.1s ease-out';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            block.style.transition = 'transform 0.3s ease';
        });
    });
}

// Initialize all animations
window.addEventListener('load', () => {
    setTimeout(() => {
        observeElements();
        animateProficiencyBars();
        init3DTilt();
    }, 500);
});

// Re-observe on dynamic content load
window.addEventListener('dataLoaded', () => {
    observeElements();
    animateProficiencyBars();
    init3DTilt();
});

console.log('✅ Block animations initialized');
