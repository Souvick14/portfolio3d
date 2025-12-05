// Custom Cursor Effects
class CursorEffects {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorTrail = document.getElementById('cursor-trail');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.trailX = 0;
        this.trailY = 0;
        
        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Smooth cursor animation
        this.animateCursor();

        // Add hover effects to interactive elements
        this.addHoverEffects();

        // Add click effect
        document.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    }

    animateCursor() {
        // Smooth follow effect
        this.cursorX += (this.mouseX - this.cursorX) * 0.2;
        this.cursorY += (this.mouseY - this.cursorY) * 0.2;
        this.trailX += (this.mouseX - this.trailX) * 0.1;
        this.trailY += (this.mouseY - this.trailY) * 0.1;

        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        this.cursorTrail.style.left = this.trailX + 'px';
        this.cursorTrail.style.top = this.trailY + 'px';

        requestAnimationFrame(() => this.animateCursor());
    }

    addHoverEffects() {
        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .nav-link, .project-card, .skill-card, .dream-card, input, textarea'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // Update hover effects for dynamically loaded content
    updateInteractiveElements() {
        this.addHoverEffects();
    }
}

// Initialize cursor effects on load
let cursorEffects;
if (window.matchMedia('(hover: hover)').matches) {
    cursorEffects = new CursorEffects();
}
