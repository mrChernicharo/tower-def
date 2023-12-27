import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let orbit;
let ambientLight;

export async function destroyGame() {
    scene.clear();
    renderer.dispose();
    window.removeEventListener("resize", onResize);
}

export async function initGame() {
    setup();

    drawGrid();

    renderer.setAnimationLoop(animate);

    window.addEventListener("resize", onResize);
}

function setup() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();

    const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    canvas.innerHTML = "";

    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    renderer.setClearColor(0xcbcbcb); // Sets the color of the background
    canvas.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    orbit = new OrbitControls(camera, renderer.domElement); // Sets orbit control to move the camera around
    camera.position.set(5, 10, 15); // Camera positioning
    orbit.update();

    ambientLight = new THREE.AmbientLight(0xefefef, 0.9);
    scene.add(ambientLight);
}

function drawGrid() {
    // Sets a 12 by 12 gird helper
    const gridHelper = new THREE.GridHelper(12, 12);
    scene.add(gridHelper);

    // Sets the x, y, and z axes with each having a length of 4
    const axesHelper = new THREE.AxesHelper(14);
    scene.add(axesHelper);
}

function animate() {
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
}
