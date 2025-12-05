// Custom 3D Cursor with Smooth Trailing
let cursor, cursorTrails = [];
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

function initCustomCursor() {
    // Create main cursor
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 0.5 - (i * 0.1);
        document.body.appendChild(trail);
        cursorTrails.push({ element: trail, x: 0, y: 0 });
    }
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .btn, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Start animation
    animateCursor();
    
    console.log('✅ Custom cursor initialized');
}

function animateCursor() {
    // Smooth lerp for main cursor
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    
    // Update trails with delay
    cursorTrails.forEach((trail, index) => {
        const delay = (index + 1) * 0.05;
        trail.x += (mouseX - trail.x) * (0.15 - delay);
        trail.y += (mouseY - trail.y) * (0.15 - delay);
        
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
    });
    
    requestAnimationFrame(animateCursor);
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}
