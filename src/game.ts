import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import jsonCurve from "./desert-level-path.0.json";
import { THREE } from "./three";
import { Enemy } from "./Enemy";

let pathPoints: THREE.Vector3[] = [];

export const enemyBlueprints = {
    spider: {
        name: "spider",
        modelURL: "/assets/glb/spider.glb",
        speed: 3.5,
        maxHp: 40,
    },
    orc: {
        name: "orc",
        // modelURL: "/assets/glb/hand-painted_orc.glb",
        modelURL: "/assets/glb/low-poly_orc.glb",
        speed: 2,
        maxHp: 200,
    },
    raptor: {
        name: "raptor",
        modelURL: "/assets/glb/raptoid.glb",
        speed: 4,
        maxHp: 100,
    },
} as const;

export type EnemyType = keyof typeof enemyBlueprints;
export type EnemyBluePrint = (typeof enemyBlueprints)[keyof typeof enemyBlueprints];

export let scene: THREE.Scene;
export let gltfLoader: GLTFLoader;
export let pathCurve: THREE.CatmullRomCurve3;
export let renderer: THREE.WebGLRenderer;
export let camera: THREE.PerspectiveCamera;
export let orbit: OrbitControls;
export let ambientLight: THREE.AmbientLight;
export let enemies: Enemy[] = [];
export let glbModels: { [k in EnemyType]: GLTF };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;
let clock: THREE.Clock;
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

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);

    playPauseBtn.addEventListener("click", onPlayPause);

    setTimeout(() => spawnEnemy("raptor"), 0);
    setTimeout(() => spawnEnemy("spider"), 2000);
    setTimeout(() => spawnEnemy("spider"), 3000);
    setTimeout(() => spawnEnemy("raptor"), 6000);
    setTimeout(() => spawnEnemy("spider"), 9000);
    setTimeout(() => spawnEnemy("spider"), 11000);
    setTimeout(() => spawnEnemy("raptor"), 12000);
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

    initGlbModels();
}

async function initGlbModels() {
    const promises: Promise<GLTF>[] = [];
    for (const enemyType of Object.keys(enemyBlueprints)) {
        const bluePrint: EnemyBluePrint = enemyBlueprints[enemyType as EnemyType];
        promises.push(gltfLoader.loadAsync(bluePrint.modelURL));
    }

    const models = await Promise.all(promises);
    console.log(":::::", models);
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

function spawnEnemy(enemyType: EnemyType) {
    const enemy = new Enemy(enemyType);
    setTimeout(() => console.log(enemy), 100);
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
