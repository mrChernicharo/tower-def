import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import jsonCurve from "./desert-level-path.0.json";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

let pathPoints: THREE.Vector3[] = [];

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let orbit: OrbitControls;
let ambientLight: THREE.AmbientLight;
let gltfLoader: GLTFLoader;
let clock: THREE.Clock;
let pathCurve: THREE.CatmullRomCurve3;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;
let enemies: THREE.Object3D[] = [];
let mixer: THREE.AnimationMixer;

let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;

export async function destroyGame() {
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    clock.stop();
    cancelAnimationFrame(frameId);

    enemies.forEach((mesh) => mesh.clear());
    enemies = [];
    window.removeEventListener("resize", onResize);
}

export async function initGame() {
    gameSetup();

    // drawGrid();

    await drawMap();

    drawPath();

    await spawnEnemy();

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);

    playPauseBtn.addEventListener("click", onPlayPause);
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
    camera.position.set(-10, 100, 40);
    // camera.position.set(10, 10, 70); // Camera positioning
    orbit = new OrbitControls(camera, renderer.domElement); // Sets orbit control to move the camera around

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

async function spawnEnemy() {
    // const wereWolfGlb = await gltfLoader.loadAsync("/assets/glb/werewolf.glb");
    const glb = await gltfLoader.loadAsync("/assets/glb/spider.glb");

    // const model = wereWolfGlb.scene;
    // const model = glb.scene;
    const model = SkeletonUtils.clone(glb.scene);
    // console.log({ glb, model });

    model.scale.set(50, 50, 50);

    enemies.push(model);
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);

    const walkAnimation = glb.animations.find((clip) => clip.name === "Wolf Spider Armature|Spider running")!;

    const walkAction = mixer.clipAction(walkAnimation);
    walkAction.loop = THREE.LoopRepeat;

    console.log({
        animations: glb.animations,
        mixer,
        walkAnimation,
        walkAction,
    });
    walkAction.play();
}

function animate() {
    const delta = clock.getDelta();
    renderer.render(scene, camera);
    orbit.update();

    mixer.update(delta);

    const time = Date.now();
    const speed = 40000;
    const t = ((time / speed) % 2) / 2;

    const position = pathCurve.getPointAt(t);
    const tangent = pathCurve.getTangentAt(t).normalize();

    enemies[0].position.copy(position);
    enemies[0].lookAt(position.clone().sub(tangent));

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
