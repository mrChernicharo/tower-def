import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import jsonCurve from "./desert-level-path.0.json";
// import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { THREE } from "./three";
import { Enemy } from "./Enemy";

let pathPoints: THREE.Vector3[] = [];

export let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let orbit: OrbitControls;
let ambientLight: THREE.AmbientLight;
export let gltfLoader: GLTFLoader;
let clock: THREE.Clock;
export let pathCurve: THREE.CatmullRomCurve3;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;
export let enemies: Enemy[] = [];
// let mixer: THREE.AnimationMixer;

let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;

export async function destroyGame() {
    cancelAnimationFrame(frameId);
    clock.stop();
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    enemies = [];
    window.removeEventListener("resize", onResize);
}

export async function initGame() {
    gameSetup();

    await drawMap();

    drawPath();

    spawnEnemy();

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);

    playPauseBtn.addEventListener("click", onPlayPause);

    setTimeout(spawnEnemy, 4000);
    setTimeout(spawnEnemy, 8000);
    setTimeout(spawnEnemy, 12000);
}

function gameSetup() {
    canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    playPauseBtn = document.querySelector("#play-pause-btn") as HTMLButtonElement;

    canvas.innerHTML = "";

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    renderer.setClearColor(0xcbcbcb); // Sets the color of the background
    canvas.appendChild(renderer.domElement);

    gltfLoader = new GLTFLoader();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.set(5, 2, 46);
    // camera.position.set(-10, 100, 40);
    // camera.position.set(-20, -10, -80);
    camera.position.set(10, 10, 70); // Camera positioning
    orbit = new OrbitControls(camera, renderer.domElement); // Sets orbit control to move the camera around
    orbit.maxPolarAngle = Math.PI * 0.4;

    ambientLight = new THREE.AmbientLight(0xefefef, 0.9);
    scene = new THREE.Scene();
    scene.add(ambientLight);
}

async function drawMap() {
    const glb = await gltfLoader.loadAsync("/assets/glb/desert-level.0.glb");
    const model = glb.scene;

    // console.log({ glb, model });

    model.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;

            if (mesh.name.includes("TowerBase")) {
                mesh.material = new THREE.MeshMatcapMaterial({ color: 0x5588ff });
            }

            if (/desert|Plane/g.test(mesh.name)) {
                mesh.material = new THREE.MeshMatcapMaterial({ color: 0xaa8800 });
            }
        }
    });

    scene.add(model);
}

function drawPath() {
    // console.log({ jsonCurve });
    pathPoints = [];
    jsonCurve.points.forEach((point) => {
        pathPoints.push(new THREE.Vector3(point.x, point.y, point.z));
    });

    pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, "catmullrom", 0.3);

    const [shapeW, shapeH] = [0.2, 0.05];
    const shapePts = [
        new THREE.Vector2(-shapeH, -shapeW),
        new THREE.Vector2(shapeH, -shapeW),
        new THREE.Vector2(shapeH, shapeW),
        new THREE.Vector2(-shapeH, shapeW),
    ];
    const extrudeShape = new THREE.Shape(shapePts);

    const geometry = new THREE.ExtrudeGeometry(extrudeShape, {
        steps: 100,
        extrudePath: pathCurve,
    });
    const material = new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: false });

    const pathMesh = new THREE.Mesh(geometry, material);
    pathMesh.position.y = shapeH;

    console.log({ pathCurve, pathMesh, pathPoints });

    scene.add(pathMesh);
}

function spawnEnemy() {
    const enemy = new Enemy("spider");

    // setTimeout(() => {
    //     console.log("::spawnEnemy", enemy, enemy.ready());
    // }, 100);
}

function animate() {
    const delta = clock.getDelta();
    // const elapsed = clock.getElapsedTime();
    renderer.render(scene, camera);
    orbit.update();

    for (const enemy of enemies) {
        enemy.tick(delta);
    }

    frameId = requestAnimationFrame(animate);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
}

function onPlayPause() {
    console.log("playpause click");
}

// function drawGrid() {
//     // Sets a 12 by 12 gird helper
//     const gridHelper = new THREE.GridHelper(12, 12);
//     scene.add(gridHelper);

//     // Sets the x, y, and z axes with each having a length of 4
//     const axesHelper = new THREE.AxesHelper(14);
//     scene.add(axesHelper);
// }
