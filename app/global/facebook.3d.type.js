// First, make sure you have Three.js included in your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Get the container and image element
    const container = document.getElementById('model3D');
    const imageElement = document.getElementById('homeModelImg');
    
    // Check if image exists
    if (!imageElement) {
      console.error('Image element not found');
      return;
    }
    
    // If image is not yet loaded, wait for it
    if (!imageElement.complete) {
      console.log('Waiting for image to load...');
      imageElement.onload = function() {
        console.log('Image loaded, initializing 3D effect');
        init3DEffect(container, imageElement, '/assets/home.model.png', '/assets/home.model_depth.png');
      };
    } else {
      // Image is already loaded
      console.log('Image already loaded, initializing 3D effect');
      init3DEffect(container, imageElement, '/assets/home.model.png', '/assets/home.model_depth.png');
    }
  });
  
  function init3DEffect(container, imageElement, imageSrc, depthSrc) {
    // Store the original dimensions before hiding
    // Get dimensions from the natural image size if available, or from computed styles
    const width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.clientWidth || 300;
    const height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.clientHeight || 200;
    
    // Hide the original image - we'll replace it with our Three.js canvas
    imageElement.style.display = 'none';
    
    // Make sure the container has position relative to contain the absolute positioned canvas
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }
    
    // Set up Three.js scene
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0.1, 1000);
    camera.position.z = 100;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    // Set the canvas to fill the container with absolute positioning
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    
    // Create a material that uses both the image and depth map
    const material = new THREE.ShaderMaterial({
      uniforms: {
        image: { value: textureLoader.load(imageSrc) },
        depthMap: { value: textureLoader.load(depthSrc) },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(width, height) },
        depthScale: { value: 20.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D image;
        uniform sampler2D depthMap;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform float depthScale;
        
        varying vec2 vUv;
        
        void main() {
          // Calculate normalized mouse position from -1 to 1
          vec2 mouseNorm = mouse / resolution * 2.0 - 1.0;
          
          // Get depth value from depth map
          float depth = texture2D(depthMap, vUv).r;
          
          // Calculate offset based on mouse position and depth
          vec2 offset = mouseNorm * (depth * depthScale);
          
          // Sample the image with the offset
          vec4 color = texture2D(image, vUv + offset * 0.01);
          
          gl_FragColor = color;
        }
      `
    });
    
    // Create a plane to display our image
    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    // Center the plane in the scene
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    
    // Add hover effect
    container.addEventListener('mousemove', (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      material.uniforms.mouse.value.x = mouseX;
      material.uniforms.mouse.value.y = mouseY;
    });
    
    // Reset when mouse leaves
    container.addEventListener('mouseleave', () => {
      material.uniforms.mouse.value.x = width / 2;
      material.uniforms.mouse.value.y = height / 2;
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      // Use the container's dimensions for responsive sizing
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      // Update camera
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(newWidth, newHeight);
      material.uniforms.resolution.value.x = newWidth;
      material.uniforms.resolution.value.y = newHeight;
      
      // Update mesh size to match container
      mesh.geometry.dispose(); // Clean up old geometry
      mesh.geometry = new THREE.PlaneGeometry(newWidth, newHeight);
    });
  }