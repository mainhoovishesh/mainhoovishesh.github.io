document.addEventListener("DOMContentLoaded", function() {
    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('page-content').appendChild(renderer.domElement);

    // Add a simple object (e.g., cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Handle resizing
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        cube.rotation.y = scrollY * 0.01; // Adjust rotation speed as needed
        cube.rotation.x = scrollY * 0.005;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            alert('Object clicked!');
        }
    }

    window.addEventListener('click', onMouseClick, false);

    document.querySelectorAll('.button-3d').forEach(button => {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    });

    animate();
});
