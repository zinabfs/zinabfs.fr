import * as THREE from '../three/three.js';
import {OrbitControls} from '../three/OrbitControls.js';
import {GLTFLoader} from '../three/GLTFLoader.js';

// modeles qui regarde la souris
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('white', 2)
// directionalLight.position.set(0, -.5, 2)
// scene.add(directionalLight);
// const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
// scene.add( helper );

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100)
camera.position.z = 6
cameraGroup.add(camera)
// const helperC = new THREE.CameraHelper( camera );
// scene.add( helperC );

const light = new THREE.HemisphereLight(
    'white',
    'darkslategrey',
    1.5
);
camera.add(light);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * OBJECTS
 */

// GLTF LOADER
const gltfLoader = new GLTFLoader();

// PLANET
let planet = new THREE.Object3D();
gltfLoader.load('../models/planet.gltf', (gltf) => {
    planet = gltf.scene;

    planet.scale.set(0.5, 0.5, 0.5)
    planet.position.set(-1.5, -3, 0);

    scene.add(planet);
});

// SUN
let sun = new THREE.Object3D();
gltfLoader.load('../models/sun.gltf', (gltf) => {
    sun = gltf.scene;

    sun.scale.set(0.5, 0.5, 0.5)
    sun.position.set(1.5, -1.2, 1);

    scene.add(sun);
});

// // CLOUD
// let cloud = new THREE.Object3D();
// gltfLoader.load('../models/cloud.gltf', (gltf) => {
//     cloud = gltf.scene;
//     cloud.scale.set(0.5, 0.5, 0.5)
//     scene.add(cloud);
//
//     cloud.position.set(1.5, -1, 1);
// });

// FLOWER
let flower = new THREE.Object3D();
gltfLoader.load('../models/flower.gltf', (gltf) => {
    flower = gltf.scene;

    flower.scale.set(0.5, 0.5, 0.5)
    flower.position.set(2, -2, 1);

    scene.add(flower);
});

// RAINBOW
let rainbow = new THREE.Object3D();
gltfLoader.load('../models/rainbow.gltf', (gltf) => {
    rainbow = gltf.scene;

    rainbow.scale.set(0.5, 0.5, 0.5);
    rainbow.position.set(-2, .4, 1);

    scene.add(rainbow);
});


// const objectModels = [planet, sun];

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

// CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();


/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;
const objectsDistance = 4;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // objectModels.forEach(object => {
    //     object.rotation.x = elapsedTime * 0.1;
    //     object.rotation.y = elapsedTime * 0.12;
    // })


    planet.rotation.y = elapsedTime * 0.03;
    rainbow.rotation.y = elapsedTime * 0.03;
    sun.rotation.y = elapsedTime * -0.03;
    flower.rotation.y = elapsedTime * -0.03;

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance;

    const parallaxX = cursor.x * 0.1;
    const parallaxY = - cursor.y * 0.1;

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
tick()