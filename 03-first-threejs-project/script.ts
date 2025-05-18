import * as THREE from "three";

// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");
// Scene
const scene: THREE.Scene = new THREE.Scene();
// Object
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

// Renderer
if (canvas) {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  renderer.render(scene, camera);
}
