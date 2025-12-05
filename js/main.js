// Main entry point - Initialize everything
console.log('%c🚀 Portfolio 3D Loading...', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');

// Configuration
const CONFIG = {
    API_URL: 'http://localhost:8080/api',
    ENABLE_3D: true,
    ENABLE_PARTICLES: true,
    DEBUG_MODE: false
};

// Global state
const AppState = {
    isLoading: true,
    dataLoaded: false,
    sceneReady: false
};

// Initialize application
function initApp() {
    console.log('✅ Initializing application...');
    
    // Check if backend is accessible
    checkBackendConnection();
    
    // Initialize all components
    if (CONFIG.DEBUG_MODE) {
        console.log('Debug mode enabled');
    }
}

// Check backend connection
async function checkBackendConnection() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'OK') {
            console.log('✅ Backend server connected');
        }
    } catch (error) {
        console.warn('⚠️ Backend server not accessible. Some features may not work.');
        console.warn('Please ensure the backend server is running on http://localhost:8080');
    }
}

// Loading screen
function showLoadingScreen() {
    const loadingHTML = `
        <div id="loading-screen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a1a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div class="loading-logo" style="
                font-family: 'Orbitron', sans-serif;
                font-size: 3rem;
                font-weight: 900;
                background: linear-gradient(135deg, #8b5cf6, #00ffff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 2rem;
            ">
                DEV.PORTFOLIO
            </div>
            <div class="spinner" style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(139, 92, 246, 0.3);
                border-top-color: #00ffff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                color: #b8b8d1;
                font-family: 'Rajdhani', sans-serif;
                font-size: 1.2rem;
                margin-top: 2rem;
            ">Initializing 3D Experience...</p>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
            AppState.isLoading = false;
        }, 500);
    }
}

// Wait for all content to load
function waitForContent() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const skillsContainer = document.getElementById('skills-container');
            const hasContent = skillsContainer && !skillsContainer.querySelector('.loading-spinner');
            
            if (hasContent || !CONFIG.ENABLE_3D) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 5000);
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    showLoadingScreen();
    initApp();
    
    // Wait for content to load
    await waitForContent();
    
    // Wait a bit for 3D scene to initialize
    setTimeout(() => {
        hideLoadingScreen();
        console.log('%c✨ Portfolio 3D Ready!', 'color: #00ffff; font-size: 16px; font-weight: bold;');
    }, 2000);
});

// Performance monitoring
if (CONFIG.DEBUG_MODE) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// Error handling
window.addEventListener('error', (e) => {
    if (CONFIG.DEBUG_MODE) {
        console.error('Global error:', e.error);
    }
});

// Console welcome message
console.log('%c', 'padding: 50px 100px; background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9Ik9yYml0cm9uIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOGI1Y2Y2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Tb3V2aWNrLkRldjwvdGV4dD48L3N2Zz4=) no-repeat center;');
console.log('%cWelcome to my 3D Portfolio! 🚀', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with Three.js, Express.js & PostgreSQL', 'color: #00ffff; font-size: 12px;');
