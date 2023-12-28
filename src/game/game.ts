import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import jsonCurve from "../desert-level-path.0.json";
import { THREE } from "../three";
import { Enemy } from "./Enemy";
import { getEnemyTypeFromChar, handleModelGun } from "./helpers";
import { COLORS, DRAW_FUTURE_GIZMO, enemyBlueprints, STAGE_WAVES_DATA } from "./constants";
import { EnemyChar, EnemyType, GameState } from "./enums";
import { EnemyBluePrint } from "./types";

let pathPoints: THREE.Vector3[] = [];

// export type EnemyType = keyof typeof enemyBlueprints;
// export type EnemyBluePrint = (typeof enemyBlueprints)[keyof typeof enemyBlueprints];

export let scene: THREE.Scene;
export let gltfLoader: GLTFLoader;
export let pathCurve: THREE.CatmullRomCurve3;
export let renderer: THREE.WebGLRenderer;
export let camera: THREE.PerspectiveCamera;
export let orbit: OrbitControls;
export let ambientLight: THREE.AmbientLight;
export let enemies: Enemy[] = [];
export let gameState = GameState.Loading;

export const glbModels = {} as { [k in EnemyType]: GLTF };
// enable canceling waveScheduling timeouts when game is destroy
const spawnTimeouts: number[] = [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;
export let gameClock: THREE.Clock;
let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;

export async function destroyGame() {
    cancelAnimationFrame(frameId);
    gameClock.stop();
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    enemies = [];
    spawnTimeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
    });

    window.removeEventListener("resize", onResize);
    playPauseBtn.removeEventListener("click", onPlayPause);
}

export async function initGame(levelIdx: number) {
    await gameSetup();

    await drawMap();

    drawPath();

    scheduleWaveEnemies(levelIdx, 0);

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    playPauseBtn.addEventListener("click", onPlayPause);
}

async function gameSetup() {
    canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    playPauseBtn = document.querySelector("#play-pause-btn") as HTMLButtonElement;

    canvas.innerHTML = "";

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    renderer.setClearColor(COLORS.bg); // Sets the color of the background
    // renderer.setClearColor(0xcbcbcb); // Sets the color of the background
    canvas.appendChild(renderer.domElement);

    gltfLoader = new GLTFLoader();
    gameClock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-10, 100, 40);
    // camera.position.set(5, 2, 46);
    // camera.position.set(-20, -10, -80);
    // camera.position.set(10, 10, 70); // Camera positioning
    // camera.position.set(0, 0, 100);
    // camera.position.set(5, 4, 50); // Camera positioning

    orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.maxPolarAngle = Math.PI * 0.4;

    ambientLight = new THREE.AmbientLight(0xefefef, 1.5);
    scene = new THREE.Scene();
    scene.add(ambientLight);

    await initGlbModels();
}

async function initGlbModels() {
    const promises: Promise<GLTF>[] = [];
    for (const enemyType of Object.keys(enemyBlueprints)) {
        const bluePrint: EnemyBluePrint = enemyBlueprints[enemyType as EnemyType];
        promises.push(gltfLoader.loadAsync(bluePrint.modelURL).then((glb) => ({ ...glb, userData: { enemyType } })));
    }

    const models = await Promise.all(promises);

    for (const model of models) {
        handleModelGun(model);
        glbModels[model.userData.enemyType as EnemyType] = model;
    }
}

async function drawMap() {
    const glb = await gltfLoader.loadAsync("/assets/glb/desert-level.0.glb");
    const model = glb.scene;

    // console.log({ glb, model });

    model.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;

            if (mesh.name.includes("TowerBase")) {
                mesh.material = new THREE.MeshMatcapMaterial({ color: COLORS.concrete });
            }

            if (/desert|Plane/g.test(mesh.name)) {
                mesh.material = new THREE.MeshMatcapMaterial({ color: COLORS.desert });
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

    const [shapeW, shapeH] = [1, 0.05];
    // const [shapeW, shapeH] = [0.5, 0.05];
    // const [shapeW, shapeH] = [0.2, 0.05];
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
    // const material = new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: false });
    const material = new THREE.MeshMatcapMaterial({ color: COLORS.concrete });

    const pathMesh = new THREE.Mesh(geometry, material);
    pathMesh.position.y = shapeH;

    console.log({ pathCurve, pathMesh, pathPoints });

    scene.add(pathMesh);
}

function scheduleWaveEnemies(levelIdx: number, waveIdx: number) {
    try {
        const wave = STAGE_WAVES_DATA[levelIdx][waveIdx].map((wEnemy) => ({
            enemyType: getEnemyTypeFromChar(wEnemy[0] as EnemyChar),
            spawnAt: (wEnemy[1] as number) * 1000,
        }));

        for (const waveEnemy of wave) {
            const spawnFn = setTimeout(() => spawnEnemy(waveEnemy.enemyType), waveEnemy.spawnAt);
            spawnTimeouts.push(spawnFn);
        }
    } catch (err) {
        console.error({ err, STAGE_WAVES_DATA });
        throw Error(`couldn't find wave ${waveIdx} of level ${levelIdx} at the STAGE_WAVES_DATA object`);
    }
}

function spawnEnemy(enemyType: EnemyType) {
    const enemy = new Enemy(enemyType);
    enemies.push(enemy);
    scene.add(enemy.model);
    if (DRAW_FUTURE_GIZMO) scene.add(enemy.futureGizmo);
}

function animate() {
    const delta = gameClock.getDelta();
    // const elapsed = gameClock.getElapsedTime();

    renderer.render(scene, camera);
    orbit.update();

    if (gameState === GameState.Active) {
        for (const enemy of enemies) {
            enemy.tick(delta);
        }
    }

    frameId = requestAnimationFrame(animate);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
}

function onPlayPause() {
    if (gameState === GameState.Active) {
        gameState = GameState.Paused;
    } else if (gameState === GameState.Paused || gameState === GameState.Loading) {
        gameState = GameState.Active;
    }
    console.log("playpause click", gameState);
}

// function drawGrid() {
//     // Sets a 12 by 12 gird helper
//     const gridHelper = new THREE.GridHelper(12, 12);
//     scene.add(gridHelper);

//     // Sets the x, y, and z axes with each having a length of 4
//     const axesHelper = new THREE.AxesHelper(14);
//     scene.add(axesHelper);
// }
