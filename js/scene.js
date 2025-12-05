// Three.js Scene Setup
let scene, camera, renderer;
let sceneInitialized = false;

function initScene() {
    if (sceneInitialized) return;

    const canvas = document.getElementById('bg-canvas');
    
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.0008);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    sceneInitialized = true;
    
    // Load Millennium City background model
    const cityMtlLoader = new THREE.MTLLoader();
    const cityObjLoader = new THREE.OBJLoader();
    
    cityMtlLoader.setPath('milenium city/');
    cityMtlLoader.load('milenium_city.mtl', function(materials) {
        materials.preload();
        
        cityObjLoader.setMaterials(materials);
        cityObjLoader.setPath('milenium city/');
        cityObjLoader.load('milenium city.obj', function(city) {
            city.scale.set(0.5, 0.5, 0.5); // Adjust scale
            city.position.set(0, -20, -100); // Position city in background
            city.rotation.y = 0;
            
            // Add subtle lighting to city
            city.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material.emissive = new THREE.Color(0x111155);
                    child.material.emissiveIntensity = 0.1;
                }
            });
            
            scene.add(city);
            console.log('✅ Millennium City model loaded successfully');
        }, undefined, function(error) {
            console.error('❌ Error loading Millennium City model:', error);
        });
    }, undefined, function(error) {
        console.error('❌ Error loading Millennium City materials:', error);
    });
    
    console.log('✅ Three.js scene initialized');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    initScene();
    animate();
});
