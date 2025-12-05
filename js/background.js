// Animated 3D Background with Particles
let particles, particleSystem;
let geometricShapes = [];

function createBackground() {
    // Create particle system
    createParticles();
    
    // Create geometric shapes
    createGeometricShapes();
    
    // Animate background
    animateBackground();
}

function createParticles() {
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create gradient colors (violet to cyan)
    const color1 = new THREE.Color(0x8b5cf6); // Violet
    const color2 = new THREE.Color(0x00ffff); // Cyan
    const color3 = new THREE.Color(0xff00ff); // Magenta

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random positions in a large sphere
        const radius = Math.random() * 100 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Color gradient
        const mixRatio = Math.random();
        let color;
        if (mixRatio < 0.33) {
            color = color1.clone().lerp(color2, mixRatio * 3);
        } else if (mixRatio < 0.66) {
            color = color2.clone().lerp(color3, (mixRatio - 0.33) * 3);
        } else {
            color = color3.clone().lerp(color1, (mixRatio - 0.66) * 3);
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    console.log('✅ Particle system created');
}

function createGeometricShapes() {
    // Create several wireframe geometric shapes
    const geometries = [
        new THREE.IcosahedronGeometry(5, 0),
        new THREE.OctahedronGeometry(4, 0),
        new THREE.TetrahedronGeometry(3, 0)
    ];

    const material = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    geometries.forEach((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, material.clone());
        
        // Random positions
        mesh.position.x = (Math.random() - 0.5) * 50;
        mesh.position.y = (Math.random() - 0.5) * 50;
        mesh.position.z = (Math.random() - 0.5) * 30 - 20;
        
        // Random rotation speeds
        mesh.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        geometricShapes.push(mesh);
        scene.add(mesh);
    });
    
    console.log('✅ Geometric shapes created');
}

function animateBackground() {
    // Rotate particle system
    if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;
    }

    // Rotate geometric shapes
    geometricShapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        // Pulse opacity
        const time = Date.now() * 0.001;
        shape.material.opacity = 0.2 + Math.sin(time + shape.position.x) * 0.1;
    });

    requestAnimationFrame(animateBackground);
}

// Parallax effect on mouse move
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function updateCameraParallax() {
    if (camera) {
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
    requestAnimationFrame(updateCameraParallax);
}

// Initialize background when scene is ready
window.addEventListener('load', () => {
    setTimeout(() => {
        if (scene) {
            createBackground();
            updateCameraParallax();
        }
    }, 100);
});
