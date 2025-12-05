// 3D Model for Main Section - Language Logo Holder
let heroModel, logoSpheres = [];

function createHeroModel() {
    const heroModelContainer = document.getElementById('hero-model');
    if (!heroModelContainer) return;

    // Create separate scene for hero model
    const heroScene = new THREE.Scene();
    
    const heroCamera = new THREE.PerspectiveCamera(
        50,
        heroModelContainer.clientWidth / heroModelContainer.clientHeight,
        0.1,
        1000
    );
    heroCamera.position.z = 15;

    const heroRenderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    heroRenderer.setSize(heroModelContainer.clientWidth, heroModelContainer.clientHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroModelContainer.appendChild(heroRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    heroScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight1.position.set(10, 10, 10);
    heroScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    heroScene.add(pointLight2);

    // Create platform/hand structure
    const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -2;
    heroScene.add(platform);

    // Create logo spheres representing different languages
    const languages = [
        { name: 'HTML', color: 0xe34f26 },
        { name: 'CSS', color: 0x1572b6 },
        { name: 'JS', color: 0xf7df1e },
        { name: 'React', color: 0x61dafb },
        { name: 'Node', color: 0x339933 },
        { name: 'Java', color: 0xff6b35 }
    ];

    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    
    languages.forEach((lang, index) => {
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: lang.color,
            metalness: 0.5,
            roughness: 0.2,
            emissive: lang.color,
            emissiveIntensity: 0.3
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        // Position spheres in a circle
        const angle = (index / languages.length) * Math.PI * 2;
        const radius = 4;
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
        sphere.position.y = 0;
        
        sphere.userData = {
            originalY: sphere.position.y,
            floatOffset: index * 0.5,
            angle: angle,
            radius: radius
        };
        
        logoSpheres.push(sphere);
        heroScene.add(sphere);

        // Add text sprite for language name
        createTextSprite(lang.name, sphere.position.clone(), heroScene);
    });

    // Animation
    function animateHeroModel() {
        requestAnimationFrame(animateHeroModel);

        // Rotate platform
        platform.rotation.y += 0.005;

        // Animate logo spheres
        const time = Date.now() * 0.001;
        logoSpheres.forEach((sphere, index) => {
            // Floating animation
            sphere.position.y = sphere.userData.originalY + Math.sin(time + sphere.userData.floatOffset) * 0.5;
            
            // Rotate around platform
            const angle = sphere.userData.angle + time * 0.2;
            sphere.position.x = Math.cos(angle) * sphere.userData.radius;
            sphere.position.z = Math.sin(angle) * sphere.userData.radius;
            
            // Rotate sphere itself
            sphere.rotation.y += 0.01;
        });

        // Subtle camera movement
        heroCamera.position.y = Math.sin(time * 0.5) * 0.5;
        heroCamera.lookAt(0, 0, 0);

        heroRenderer.render(heroScene, heroCamera);
    }

    animateHeroModel();

    // Mouse interaction
    let heroMouseX = 0;
    let heroMouseY = 0;

    heroModelContainer.addEventListener('mousemove', (event) => {
        const rect = heroModelContainer.getBoundingClientRect();
        heroMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        heroMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        heroCamera.position.x += (heroMouseX * 2 - heroCamera.position.x) * 0.1;
        heroCamera.position.y += (heroMouseY * 2 - heroCamera.position.y) * 0.1;
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const width = heroModelContainer.clientWidth;
        const height = heroModelContainer.clientHeight;
        
        heroCamera.aspect = width / height;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(width, height);
    });

    console.log('✅ Hero 3D model created');
}

function createTextSprite(text, position, scene) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    context.fillStyle = 'rgba(139, 92, 246, 0.8)';
    context.font = 'Bold 40px Orbitron';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    sprite.position.copy(position);
    sprite.position.y += 1.5;
    sprite.scale.set(2, 1, 1);
    
    scene.add(sprite);
    logoSpheres.push(sprite); // Add to array for animation
}

// Initialize hero model when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        createHeroModel();
    }, 200);
});
