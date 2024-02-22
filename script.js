var container;
var camera, scene, renderer;
var model;

init();
animate();

function init() {
    container = document.getElementById('robot-scene');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const loader = new THREE.GLTFLoader();
    loader.load('/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        model.position.set(-1.5, 0, 0); // Adjust the position as needed
        model.scale.set(0.25, 0.25, 0.25); // Adjust the scale as needed
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });

    // Lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (model) { // Only rotate the model if it's loaded
        model.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}
function sendMessage() {
    var products = [
        { name: 'Robot A', description: 'Autonomous navigation robot' },
        { name: 'Robot B', description: 'Industrial assembly robot' },
        // Add more products as needed
    ];

    var userInput = document.getElementById('user-input').value.toLowerCase();
    var chatBox = document.getElementById('chat-box');
    var userMessage = document.createElement('div');
    userMessage.textContent = 'You: ' + userInput;
    chatBox.appendChild(userMessage);

    // Find matching products
    var matchingProducts = products.filter(product => product.description.toLowerCase().includes(userInput));

    var productResponse = document.createElement('div');
    if (matchingProducts.length > 0) {
        var productList = matchingProducts.map(product => product.name).join(', ');
        productResponse.textContent = 'ChatBot: Here are some robotics products for ' + userInput + ': ' + productList;
    } else {
        productResponse.textContent = 'ChatBot: No products found for ' + userInput;
    }
    chatBox.appendChild(productResponse);

    document.getElementById('user-input').value = '';


    
}
