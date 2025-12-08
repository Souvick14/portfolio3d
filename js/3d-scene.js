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
// -------------------------------------------------------------
// 3D Scene Setup with Enhanced Abstract Floating Blocks
// -------------------------------------------------------------






// let scene, camera, renderer;
// let floatingBlocks = [];
// let particles;

// // -------------------------------------------------------------
// // Initialize Scene
// // -------------------------------------------------------------
// function init3DScene() {
//     const canvas = document.getElementById("bg-canvas");

//     // Scene
//     scene = new THREE.Scene();
//     scene.fog = new THREE.FogExp2(0x050509, 0.0012);

//     // Camera
//     camera = new THREE.PerspectiveCamera(
//         70,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1500
//     );
//     camera.position.z = 45;

//     // Renderer
//     renderer = new THREE.WebGLRenderer({
//         canvas,
//         antialias: true,
//         alpha: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // High quality tone mapping
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 1.3;

//     // Lighting
//     addLighting();

//     // Objects
//     createFloatingBlocks();
//     createParticles();

//     // Resize Handler
//     window.addEventListener("resize", onWindowResize);

//     console.log("✨ Enhanced 3D Scene Initialized");
// }

// // -------------------------------------------------------------
// // Improved Lighting System
// // -------------------------------------------------------------
// function addLighting() {
//     // Soft environment light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);

//     // Colored point lights for glow effect
//     const lightA = new THREE.PointLight(0x5a64ff, 2.5, 200);
//     lightA.position.set(50, 20, 40);
//     scene.add(lightA);

//     const lightB = new THREE.PointLight(0xb164ff, 2.5, 200);
//     lightB.position.set(-50, -20, 40);
//     scene.add(lightB);

//     const lightC = new THREE.PointLight(0x99d6ff, 1.5, 200);
//     lightC.position.set(0, 40, -30);
//     scene.add(lightC);
// }

// // -------------------------------------------------------------
// // Floating Blocks (Improved Materials + Shapes)
// // -------------------------------------------------------------
// function createFloatingBlocks() {
//     const shapes = [
//         new THREE.BoxGeometry(2.2, 2.2, 2.2),
//         new THREE.DodecahedronGeometry(1.8),
//         new THREE.TetrahedronGeometry(1.7),
//         new THREE.CapsuleGeometry(1, 0.7, 4, 12),
//         new THREE.TorusKnotGeometry(1.2, 0.3, 100, 16),
//         new THREE.IcosahedronGeometry(1.9)
//     ];

//     for (let i = 0; i < 18; i++) {
//         const geo = shapes[Math.floor(Math.random() * shapes.length)];

//         const mat = new THREE.MeshStandardMaterial({
//             color: Math.random() > 0.5 ? 0x6b7bfa : 0xad6bfa,
//             metalness: 0.9,
//             roughness: 0.15,
//             emissive: Math.random() > 0.5 ? 0x6b7bfa : 0xad6bfa,
//             emissiveIntensity: 0.25,
//             transparent: true,
//             opacity: 0.8
//         });

//         const block = new THREE.Mesh(geo, mat);

//         block.position.set(
//             (Math.random() - 0.5) * 100,
//             (Math.random() - 0.5) * 80,
//             (Math.random() - 0.5) * 80 - 40
//         );

//         block.rotation.set(
//             Math.random() * Math.PI,
//             Math.random() * Math.PI,
//             Math.random() * Math.PI
//         );

//         block.userData = {
//             rotationSpeed: {
//                 x: (Math.random() - 0.5) * 0.008,
//                 y: (Math.random() - 0.5) * 0.008,
//                 z: (Math.random() - 0.5) * 0.008
//             },
//             floatSpeed: Math.random() * 0.015 + 0.008,
//             floatOffset: Math.random() * Math.PI * 2
//         };

//         scene.add(block);
//         floatingBlocks.push(block);
//     }
// }

// // -------------------------------------------------------------
// // Depth-Colored Particle Field
// // -------------------------------------------------------------
// function createParticles() {
//     const count = 2000;
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);

//     for (let i = 0; i < count; i++) {
//         const i3 = i * 3;

//         positions[i3] = (Math.random() - 0.5) * 350;
//         positions[i3 + 1] = (Math.random() - 0.5) * 350;
//         positions[i3 + 2] = (Math.random() - 0.5) * 350;

//         // Soft blue/purple nebula colors
//         const baseColor = new THREE.Color(
//             Math.random() > 0.5 ? 0x6b7bfa : 0xad6bfa
//         );
//         colors[i3] = baseColor.r;
//         colors[i3 + 1] = baseColor.g;
//         colors[i3 + 2] = baseColor.b;
//     }

//     const geo = new THREE.BufferGeometry();
//     geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//     const mat = new THREE.PointsMaterial({
//         size: 1.1,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.7,
//         blending: THREE.AdditiveBlending
//     });

//     particles = new THREE.Points(geo, mat);
//     scene.add(particles);
// }

// // -------------------------------------------------------------
// // Animation Loop
// // -------------------------------------------------------------
// function animate3DScene() {
//     requestAnimationFrame(animate3DScene);

//     const t = Date.now() * 0.0005;

//     // Floating camera motion
//     camera.position.x = Math.sin(t * 0.4) * 4;
//     camera.position.y = Math.cos(t * 0.3) * 3;
//     camera.lookAt(0, 0, 0);

//     // Animate blocks
//     floatingBlocks.forEach((b) => {
//         b.rotation.x += b.userData.rotationSpeed.x;
//         b.rotation.y += b.userData.rotationSpeed.y;

//         b.position.y +=
//             Math.sin(t * 4 * b.userData.floatSpeed + b.userData.floatOffset) * 0.03;
//     });

//     // Soft particle rotation
//     if (particles) {
//         particles.rotation.y += 0.00025;
//         particles.rotation.x += 0.0001;
//     }

//     renderer.render(scene, camera);
// }

// // -------------------------------------------------------------
// // Resize Handler
// // -------------------------------------------------------------
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // -------------------------------------------------------------
// // Start
// // -------------------------------------------------------------
// window.addEventListener("load", () => {
//     init3DScene();
//     animate3DScene();
// });
