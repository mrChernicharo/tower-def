import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import jsonCurve from "./desert-level-path.0.json";

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let orbit: OrbitControls;
let ambientLight: THREE.AmbientLight;
let gltfLoader: GLTFLoader;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;

export async function destroyGame() {
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    window.removeEventListener("resize", onResize);
}

export async function initGame() {
    setup();

    drawGrid();

    await drawMap();

    drawPath();

    // renderer.setAnimationLoop(animate);
    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
}

function setup() {
    const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    canvas.innerHTML = "";

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    renderer.setClearColor(0xcbcbcb); // Sets the color of the background
    canvas.appendChild(renderer.domElement);

    gltfLoader = new GLTFLoader();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-10, 100, 40);
    // camera.position.set(10, 10, 70); // Camera positioning
    orbit = new OrbitControls(camera, renderer.domElement); // Sets orbit control to move the camera around

    ambientLight = new THREE.AmbientLight(0xefefef, 0.9);
    scene = new THREE.Scene();
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

async function drawMap() {
    const glb = await gltfLoader.loadAsync("/assets/glb/desert-level.0.glb");
    // const curveJSON = await load

    const model = glb.scene;

    console.log({ glb, model });

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
    console.log({ jsonCurve });

    const pathPoints: THREE.Vector3[] = [];
    jsonCurve.points.forEach((point) => {
        pathPoints.push(new THREE.Vector3(point.x, point.y, point.z));
    });

    // Define the curve
    const curve = new THREE.CatmullRomCurve3(pathPoints);

    // Define a shape
    const pts = [
        new THREE.Vector2(-0.2, -1),
        new THREE.Vector2(0.2, -1),
        new THREE.Vector2(0.2, 1),
        new THREE.Vector2(-0.2, 1),
    ];
    const shape = new THREE.Shape(pts);

    // Extrude the triangle along the CatmullRom curve
    const geometry = new THREE.ExtrudeGeometry(shape, {
        steps: 200,
        bevelEnabled: true,
        extrudePath: curve,
    });
    const material = new THREE.MeshLambertMaterial({ color: 0xb00000, wireframe: false });

    // Create mesh with the resulting geometry
    const pathMesh = new THREE.Mesh(geometry, material);

    scene.add(pathMesh);
}

function animate() {
    renderer.render(scene, camera);
    orbit.update();

    frameId = requestAnimationFrame(animate);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
}
