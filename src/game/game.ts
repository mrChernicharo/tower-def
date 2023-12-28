/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import jsonCurve from "../desert-level-path.0.json";
import { THREE } from "../three";

import { Enemy } from "./Enemy";
import { getEnemyTypeFromChar, handleModelGun } from "./helpers";
import { COLORS, DRAW_FUTURE_GIZMO, ENEMY_BLUEPRINTS, STAGE_WAVES_DATA } from "./constants";
import { AppLayers, EnemyChar, EnemyType, GameState } from "./enums";
import { EnemyBluePrint } from "./types";

let pathPoints: THREE.Vector3[] = [];

// export type EnemyType = keyof typeof ENEMY_BLUEPRINTS;
// export type EnemyBluePrint = (typeof ENEMY_BLUEPRINTS)[keyof typeof ENEMY_BLUEPRINTS];

export let scene: THREE.Scene;
export let gltfLoader: GLTFLoader;
export let pathCurve: THREE.CatmullRomCurve3;
export let renderer: THREE.WebGLRenderer;
export let camera: THREE.PerspectiveCamera;
export let orbit: OrbitControls;
export let ambientLight: THREE.AmbientLight;
export let enemies: Enemy[] = [];
export let gameState = GameState.Loading;
export let cssRenderer: CSS2DRenderer;
export let towerBaseMouseRay: THREE.Raycaster;

export const glbModels = {} as { [k in EnemyType]: GLTF };
// enable canceling waveScheduling timeouts when game is destroy
const spawnTimeouts: number[] = [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let frameId = 0;
export let gameClock: THREE.Clock;
let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;

export let clickTimestamp = 0;

export async function destroyGame() {
    cancelAnimationFrame(frameId);
    gameClock.stop();
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    enemies = [];
    gameState = GameState.Paused;
    spawnTimeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
    });

    window.removeEventListener("resize", onResize);
    playPauseBtn.removeEventListener("click", onPlayPause);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("mousedown", onMouseDown);
}

export async function initGame(levelIdx: number) {
    await gameSetup();

    await drawMap();

    drawPath();

    init2DModals();

    scheduleWaveEnemies(levelIdx, 0);

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    playPauseBtn.addEventListener("click", onPlayPause);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("mousedown", onMouseDown);
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

    cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight - 120);
    cssRenderer.domElement.id = "css2d-overlay";
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "64px";
    cssRenderer.domElement.style.pointerEvents = "none";

    canvas.appendChild(cssRenderer.domElement);

    gltfLoader = new GLTFLoader();
    gameClock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.layers.enableAll();
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

    towerBaseMouseRay = new THREE.Raycaster();
    towerBaseMouseRay.layers.disableAll();
    towerBaseMouseRay.layers.enable(AppLayers.TowerBase);
    towerBaseMouseRay.layers.enable(AppLayers.Modals);

    await initGlbModels();
}

async function initGlbModels() {
    const promises: Promise<GLTF>[] = [];
    for (const enemyType of Object.keys(ENEMY_BLUEPRINTS)) {
        const bluePrint: EnemyBluePrint = ENEMY_BLUEPRINTS[enemyType as EnemyType];
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
                obj.layers.set(AppLayers.TowerBase);
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
    pathMesh.name = "Road";
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

    cssRenderer.render(scene, camera);
    renderer.render(scene, camera);

    orbit.update();

    if (gameState === GameState.Active) {
        for (const enemy of enemies) {
            enemy.tick(delta);
        }
    }

    frameId = requestAnimationFrame(animate);
}

let hoveredTowerBaseName: string | null = null;
function onMouseMove(e: MouseEvent) {
    const mousePos = new THREE.Vector2();
    mousePos.x = (e.offsetX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.offsetY / (window.innerHeight - 120)) * 2 + 1;

    towerBaseMouseRay.setFromCamera(mousePos, camera);
    handleTowerBaseHoverOpacityEfx();
}

function onMouseDown() {
    clickTimestamp = Date.now();
}

function init2DModals() {
    scene.traverse((el) => {
        if (el.name.includes("TowerBase")) {
            const modalContainer = document.createElement("div");
            modalContainer.className = "modal-container";

            const modal = document.createElement("div");
            modal.id = `modal2D-${el.name}`;
            modal.className = "modal2D";
            modal.style.pointerEvents = "all";
            modal.innerHTML = `
                <h3>Hello</h3>
                <button>Click</button>
            `;
            modal.onclick = () => {
                console.log("onclick", modal);
            };

            modalContainer.append(modal);

            const modal2D = new CSS2DObject(modalContainer);
            modal2D.position.set(el.position.x, el.position.y + 8, el.position.z);
            modal2D.name = `${el.name}-modal`;
            modal2D.layers.set(AppLayers.Modals);
            modal2D.visible = false;
            scene.add(modal2D);
        }
    });
}

function onCanvasClick(e: MouseEvent) {
    if (Date.now() - clickTimestamp > 300) {
        console.log("CLICK CANCELED");
        return;
    }

    const mousePos = new THREE.Vector2();
    mousePos.x = (e.offsetX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.offsetY / (window.innerHeight - 120)) * 2 + 1;

    const clickedTowerBase = towerBaseMouseRay.intersectObjects(scene.children)[0];

    if (clickedTowerBase) {
        console.log("CLICKED TOWER BASE");

        const modal2D = scene.getObjectByName(`${clickedTowerBase.object.name}-modal`)!;
        // close open modal
        scene.traverse((obj) => {
            if ((obj as any).isCSS2DObject && obj.visible) {
                obj.visible = false;
            }
        });
        // open new modal
        modal2D.visible = true;
        console.log({ clickedTowerBase, modal2D });
    } else {
        if ([...e.composedPath()].some((el) => (el as HTMLElement)?.classList?.contains("modal2D"))) {
            console.log("CLICKED MODAL");
        } else {
            console.log("CLICKED OUTSIDE");
            // close open modal
            scene.traverse((obj) => {
                if ((obj as any).isCSS2DObject && obj.visible) {
                    obj.visible = false;
                }
            });
        }
    }
}

function handleTowerBaseHoverOpacityEfx() {
    const hoveredTowerBase = towerBaseMouseRay.intersectObjects(scene.children)[0];

    if (hoveredTowerBase) {
        console.log({ hoveredTowerBase });

        const towerBaseMesh = hoveredTowerBase.object;
        // keep track of current towerBase
        hoveredTowerBaseName = towerBaseMesh.name;

        // add opacity EFX
        (towerBaseMesh as THREE.Mesh).material = new THREE.MeshMatcapMaterial({
            color: COLORS.concrete,
            transparent: true,
            opacity: 0.5,
        });
    } else {
        if (hoveredTowerBaseName) {
            const hoveredTowerBase = scene.getObjectByName(hoveredTowerBaseName);
            // const modal2D = scene.getObjectByName(`modal2D-${hoveredTowerBaseName}`)!;

            // remove opacity EFX
            (hoveredTowerBase as THREE.Mesh).material = new THREE.MeshMatcapMaterial({
                color: COLORS.concrete,
                transparent: true,
                opacity: 1,
            });

            // remove memory of hovered towerBase
            hoveredTowerBaseName = null;
        }
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    cssRenderer.setSize(window.innerWidth, window.innerHeight - 120);
}

function onPlayPause() {
    if (gameState === GameState.Active) {
        gameState = GameState.Paused;
        playPauseBtn.textContent = "Resume";
    } else if (gameState === GameState.Paused || gameState === GameState.Loading) {
        gameState = GameState.Active;
        playPauseBtn.textContent = "Pause";
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
