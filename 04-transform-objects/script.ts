import * as THREE from "three";

// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");
// Scene
const scene: THREE.Scene = new THREE.Scene();
// Object
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });
// const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
const group = new THREE.Group();
scene.add(group);
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);

// Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// Rotatation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// Axes helper
const axexhelper = new THREE.AxesHelper();
scene.add(axexhelper);

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
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);

// camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position)

// Renderer
if (canvas) {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  renderer.render(scene, camera);
}
