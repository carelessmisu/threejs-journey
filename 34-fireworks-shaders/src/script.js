import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import fireworkVertexShader from './shaders/firework/vertex.glsl';
import fireworkFragmenthader from './shaders/firework/fragment.glsl';
import gsap from 'gsap';
import { Sky } from 'three/addons/objects/Sky.js';

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 });

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixcelRatio: Math.min(window.devicePixelRatio, 2),
};
sizes.resolution = new THREE.Vector2(
  sizes.width * sizes.pixcelRatio,
  sizes.height * sizes.pixcelRatio
);

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixcelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.resolution.set(
    sizes.width * sizes.pixcelRatio,
    sizes.height * sizes.pixcelRatio
  );

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixcelRatio);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1.5, 0, 6);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixcelRatio);

/**
 * Fireworks
 */
const textures = [
  textureLoader.load('./particles/1.png'),
  textureLoader.load('./particles/2.png'),
  textureLoader.load('./particles/3.png'),
  textureLoader.load('./particles/4.png'),
  textureLoader.load('./particles/5.png'),
  textureLoader.load('./particles/6.png'),
  textureLoader.load('./particles/7.png'),
  textureLoader.load('./particles/8.png'),
];
const createFirework = (count, position, size, texture, radius, color) => {
  // Geometry
  const positionArray = new Float32Array(count * 3);
  const sizesArray = new Float32Array(count);
  const timeMultipliersArray = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const spherical = new THREE.Spherical(
      radius * (0.75 + Math.random() * 0.25),
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2
    );
    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);

    positionArray[i3] = position.x;
    positionArray[i3 + 1] = position.y;
    positionArray[i3 + 2] = position.z;

    sizesArray[i] = Math.random();
    timeMultipliersArray[i] = 1 + Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positionArray, 3)
  );
  geometry.setAttribute(
    'aSize',
    new THREE.Float32BufferAttribute(sizesArray, 1)
  );
  geometry.setAttribute(
    'aTimeMultiplier',
    new THREE.Float32BufferAttribute(timeMultipliersArray, 1)
  );

  // Material
  texture.flipY = false;
  const material = new THREE.ShaderMaterial({
    vertexShader: fireworkVertexShader,
    fragmentShader: fireworkFragmenthader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
      uColor: new THREE.Uniform(color),
      uProgress: new THREE.Uniform(0),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // Points
  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  scene.add(firework);

  // Destroy
  const destroy = () => {
    scene.remove(firework);
    geometry.dispose();
    material.dispose();
  };

  // Animate
  gsap.to(material.uniforms.uProgress, {
    value: 1,
    duration: 3,
    ease: 'linear',
    onComplete: destroy,
  });
};

const createRandomFirework = () => {
  const count = Math.round(3000 + Math.random() * 1000);
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    Math.random(),
    (Math.random() - 0.5) * 2
  );
  const size = 0.1 + Math.random() * 0.1;
  const texture = textures[Math.floor(Math.random() * textures.length)];
  const radius = 0.5 + Math.random();
  const color = new THREE.Color();
  color.setHSL(Math.random(), 1, 0.7);
  createFirework(count, position, size, texture, radius, color);
};

createRandomFirework();

window.addEventListener('click', createRandomFirework);

/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

const sun = new THREE.Vector3();

/// GUI

const skyParameters = {
  turbidity: 10,
  rayleigh: 3,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.95,
  elevation: -2.2,
  azimuth: 180,
  exposure: renderer.toneMappingExposure,
};

function updateSky() {
  const uniforms = sky.material.uniforms;
  uniforms['turbidity'].value = skyParameters.turbidity;
  uniforms['rayleigh'].value = skyParameters.rayleigh;
  uniforms['mieCoefficient'].value = skyParameters.mieCoefficient;
  uniforms['mieDirectionalG'].value = skyParameters.mieDirectionalG;

  const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation);
  const theta = THREE.MathUtils.degToRad(skyParameters.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  uniforms['sunPosition'].value.copy(sun);

  renderer.toneMappingExposure = skyParameters.exposure;
  renderer.render(scene, camera);
}

gui.add(skyParameters, 'turbidity', 0.0, 20.0, 0.1).onChange(updateSky);
gui.add(skyParameters, 'rayleigh', 0.0, 4, 0.001).onChange(updateSky);
gui
  .add(skyParameters, 'mieCoefficient', 0.0, 0.1, 0.001)
  .onChange(updateSky);
gui
  .add(skyParameters, 'mieDirectionalG', 0.0, 1, 0.001)
  .onChange(updateSky);
gui.add(skyParameters, 'elevation', -3, 10, 0.01).onChange(updateSky);
gui.add(skyParameters, 'azimuth', -180, 180, 0.1).onChange(updateSky);
gui.add(skyParameters, 'exposure', 0, 1, 0.0001).onChange(updateSky);

updateSky();

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
