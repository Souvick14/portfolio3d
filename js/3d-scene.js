// 3D Scene Setup with Abstract Floating Blocks
let scene, camera, renderer;
let floatingBlocks = [];
let particles;

function init3DScene() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0015);
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x667eea, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x764ba2, 2, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
    
    // Create floating abstract blocks
    createFloatingBlocks();
    
    // Create particle system
    createParticles();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
    
    console.log('✅ 3D Scene initialized');
}

function createFloatingBlocks() {
    const geometries = [
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.TetrahedronGeometry(1.5),
        new THREE.OctahedronGeometry(1.5),
        new THREE.IcosahedronGeometry(1.5),
        new THREE.TorusGeometry(1, 0.4, 16, 100)
    ];
    
    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
            metalness: 0.7,
            roughness: 0.3,
            emissive: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.6,
            wireframe: Math.random() > 0.7
        });
        
        const block = new THREE.Mesh(geometry, material);
        
        block.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 50 - 30
        );
        
        block.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        block.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(block);
        floatingBlocks.push(block);
    }
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 200;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x667eea,
        size: 0.5,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function animate3DScene() {
    requestAnimationFrame(animate3DScene);
    
    const time = Date.now() * 0.001;
    
    // Animate floating blocks
    floatingBlocks.forEach(block => {
        block.rotation.x += block.userData.rotationSpeed.x;
        block.rotation.y += block.userData.rotationSpeed.y;
        block.rotation.z += block.userData.rotationSpeed.z;
        
        block.position.y += Math.sin(time * block.userData.floatSpeed + block.userData.floatOffset) * 0.02;
    });
    
    // Rotate particles
    if (particles) {
        particles.rotation.y += 0.0002;
    }
    
    // Render
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
window.addEventListener('load', () => {
    init3DScene();
    animate3DScene();
});
