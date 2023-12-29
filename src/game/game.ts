/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "dat.gui";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import jsonCurve from "../desert-level-path.0.json";
import { THREE } from "../three";

import { Enemy } from "./Enemy";
import { capitalize, getEnemyTypeFromChar, getProjectileTowerName, handleModelGun } from "./helpers";
import { COLORS, DRAW_FUTURE_GIZMO, ENEMY_BLUEPRINTS, STAGE_WAVES_DATA } from "./constants";
import { AppLayers, EnemyChar, EnemyType, GameState, ModalType, TargetingStrategy, TowerType } from "./enums";
import { EnemyBluePrint } from "./types";
import { cancelableModalNames, modalTemplates } from "./templates";
import { Tower } from "./Tower";
import { Projectile } from "./Projectile";

let pathPoints: THREE.Vector3[] = [];

// export type EnemyType = keyof typeof ENEMY_BLUEPRINTS;
// export type EnemyBluePrint = (typeof ENEMY_BLUEPRINTS)[keyof typeof ENEMY_BLUEPRINTS];

export let scene: THREE.Scene;
export let gltfLoader: GLTFLoader;
export let fbxLoader: FBXLoader;
export let renderer: THREE.WebGLRenderer;
export let cssRenderer: CSS2DRenderer;
export let gameClock: THREE.Clock;
export let orbit: OrbitControls;
export let camera: THREE.PerspectiveCamera;
export let ambientLight: THREE.AmbientLight;
export let enemies: Enemy[] = [];
export let towers: Tower[] = [];
export let projectiles: Map<string, Projectile>;
export let gameState = GameState.Loading;
export let pathCurve: THREE.CatmullRomCurve3;
export let mouseRay: THREE.Raycaster;
export let towerTexture: THREE.Texture;

export let gui: GUI;

const spawnTimeouts: number[] = []; // enable canceling waveScheduling timeouts when game is destroy
export const ENEMY_MODELS = {} as { [k in EnemyType]: GLTF };
export const TOWER_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };
export const PROJECTILE_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };

let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;

let frameId = 0;
let clickTimestamp = 0;
let towerToBuild: TowerType | null = null;
let hoveredTowerBaseName: string | null = null;
let hoveredTowerId: string | null = null;

export async function destroyGame() {
    cancelAnimationFrame(frameId);
    gameClock.stop();
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    enemies = [];
    towers = [];
    projectiles.clear();
    gameState = GameState.Paused;
    gui.destroy();
    spawnTimeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
    });

    window.removeEventListener("resize", onResize);
    window.removeEventListener("projectile", onProjectile);
    window.removeEventListener("projectile-explode", onProjectileExplode);
    playPauseBtn.removeEventListener("click", onPlayPause);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("mousedown", onMouseDown);
}

export async function initGame(levelIdx: number) {
    await gameSetup();

    await _initEnemyModels();
    await _initTowerModels();

    await drawMap();
    drawPath();

    _init2DModals();

    scheduleWaveEnemies(levelIdx, 0);

    window.addEventListener("resize", onResize);
    window.addEventListener("projectile", onProjectile);
    window.addEventListener("projectile-explode", onProjectileExplode);
    playPauseBtn.addEventListener("click", onPlayPause);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("mousedown", onMouseDown);

    frameId = requestAnimationFrame(animate);
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
    fbxLoader = new FBXLoader();
    gameClock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.layers.enableAll();
    // camera.position.set(-10, 100, 40);
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

    mouseRay = new THREE.Raycaster();
    mouseRay.layers.disableAll();
    mouseRay.layers.enable(AppLayers.TowerBase);
    mouseRay.layers.enable(AppLayers.Tower);
    mouseRay.layers.enable(AppLayers.Modals);

    gui = new GUI({ closed: true });
    const camFolder = gui.addFolder("Camera");
    camFolder.add(camera.position, "x", -200, 200);
    camFolder.add(camera.position, "y", -2, 100);
    camFolder.add(camera.position, "z", -200, 200);
    camera.position.x = 18;
    camera.position.y = 18;
    camera.position.z = 62;

    projectiles = new Map();
}

async function _initEnemyModels() {
    const promises: Promise<GLTF>[] = [];
    for (const enemyType of Object.keys(ENEMY_BLUEPRINTS)) {
        const bluePrint: EnemyBluePrint = ENEMY_BLUEPRINTS[enemyType as EnemyType];
        promises.push(gltfLoader.loadAsync(bluePrint.modelURL).then((glb) => ({ ...glb, userData: { enemyType } })));
    }

    const models = await Promise.all(promises);

    for (const model of models) {
        handleModelGun(model);
        ENEMY_MODELS[model.userData.enemyType as EnemyType] = model;
    }
}

async function _initTowerModels() {
    const towersFbx = await fbxLoader.loadAsync("/assets/fbx/tower-collection.fbx");
    const projectilesFbx = await fbxLoader.loadAsync("/assets/fbx/tower-projectiles.fbx");
    towerTexture = await new THREE.TextureLoader().loadAsync("/assets/fbx/towers-texture.png");

    // console.log({ fbx: towersFbx, towers: towersFbx.children.map((c) => c.name).sort((a, b) => a.localeCompare(b)) });

    const towerModels = towersFbx.children;
    for (const model of towerModels) {
        const towerLevel = +model.name.split("_")[3];
        const towerName = capitalize(model.name.split("_")[0]) as TowerType;

        if (!TOWER_MODELS[towerName]) {
            TOWER_MODELS[towerName] = {};
        }

        model.name = `${towerName}-Tower`;
        TOWER_MODELS[towerName][`level-${towerLevel}`] = model as THREE.Mesh;
    }

    const projectileModels = projectilesFbx.children;
    for (const model of projectileModels as THREE.Mesh[]) {
        const towerName = getProjectileTowerName(model.name);
        console.log(model, towerName);
        if (!(towerName in PROJECTILE_MODELS)) {
            PROJECTILE_MODELS[towerName] = {};
        }

        if (towerName === TowerType.Archer) {
            const level = model.name.split("_")[3];
            PROJECTILE_MODELS[towerName][`level-${+level}`] = model;
        } else {
            PROJECTILE_MODELS[towerName]["level-1"] = model;
            PROJECTILE_MODELS[towerName]["level-2"] = model;
            PROJECTILE_MODELS[towerName]["level-3"] = model;
            PROJECTILE_MODELS[towerName]["level-4"] = model;
        }
    }

    console.log({ TOWER_MODELS, PROJECTILE_MODELS });
}

function _init2DModals() {
    scene.traverse((el) => {
        if (el.name.includes("TowerBase")) {
            const tileIdx = el.userData.name.split(".")[1];
            el.userData["tile_idx"] = tileIdx;

            const modalContainer = document.createElement("div");
            modalContainer.className = "modal-container";

            const modalEl = document.createElement("div");
            modalEl.id = `modal2D-${el.name}`;
            modalEl.className = `modal2D tile_${tileIdx}`;
            modalEl.style.pointerEvents = "all";
            modalEl.style.opacity = "0.9";

            const modal3D = new CSS2DObject(modalContainer);
            modal3D.position.set(el.position.x, el.position.y + 8, el.position.z);
            modal3D.name = `${el.name}-modal`;
            modal3D.userData["tile_idx"] = tileIdx;
            modal3D.layers.set(AppLayers.Modals);
            modal3D.visible = false;

            scene.add(modal3D);

            modalContainer.append(modalEl);
            modalEl.innerHTML = modalTemplates.towerBuild();

            modalEl.addEventListener("click", (e) => onModalClick(e, el, modal3D, modalEl));
        }
    });
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
        for (const tower of towers) {
            let targetEnemy: Enemy;

            const enemiesInRange = enemies.filter(
                (e) => tower.position.distanceTo(e.model.position) < tower.blueprint.range
            );

            if (tower.strategy === TargetingStrategy.FirstInLine) {
                let maxCoveredDistance = 0;
                enemiesInRange.forEach((e) => {
                    if (e.getPercDist() > maxCoveredDistance) {
                        maxCoveredDistance = e.getPercDist();
                        targetEnemy = e;
                    }
                });
            }
            if (tower.strategy === TargetingStrategy.LastInLine) {
                let minCoveredDistance = Infinity;
                enemiesInRange.forEach((e) => {
                    if (e.getPercDist() < minCoveredDistance) {
                        minCoveredDistance = e.getPercDist();
                        targetEnemy = e;
                    }
                });
            }

            tower.tick(delta, targetEnemy!);
        }
        for (const [, projectile] of projectiles.entries()) {
            projectile.tick(delta);
        }
    }

    frameId = requestAnimationFrame(animate);
}

function onMouseMove(e: MouseEvent) {
    const mousePos = new THREE.Vector2();
    mousePos.x = (e.offsetX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.offsetY / (window.innerHeight - 120)) * 2 + 1;

    mouseRay.setFromCamera(mousePos, camera);
    handleHoverOpacityEfx();
}

function onMouseDown() {
    clickTimestamp = Date.now();
}

function onModalClick(e: MouseEvent, el: THREE.Object3D, modal3D: CSS2DObject, modalEl: HTMLDivElement) {
    const evTarget = e.target as HTMLElement;
    e.stopPropagation();
    const tower_id = el.userData.tower_id ?? "";
    const tower = towers.find((t) => t.id === tower_id);
    console.log(":::onModalClick::::", { e, el, modal3D, modalEl, tower_id, tower });

    // TOWER BUILD
    if (evTarget.classList.contains("tower-build-btn")) {
        towerToBuild = evTarget.id.split("-")[0] as TowerType;
        modalEl.innerHTML = modalTemplates.confirmTowerBuild(towerToBuild);
    }
    if (evTarget.classList.contains("cancel-tower-build-btn")) {
        modalEl.innerHTML = modalTemplates.towerBuild();
        towerToBuild = null;
    }
    if (evTarget.classList.contains("confirm-tower-build-btn")) {
        // console.log(`BUILD THIS GODAMN ${towerToBuild} TOWER`, { el });

        const tower = new Tower(towerToBuild!, el.position, modal3D.userData["tile_idx"]);
        el.userData["tower"] = towerToBuild;
        el.userData["tower_id"] = tower.id;
        modal3D.userData["tower"] = towerToBuild;
        modal3D.userData["tower_id"] = tower.id;

        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
        modal3D.visible = false;

        towers.push(tower);
        scene.add(tower.model);
        scene.add(tower.rangeGizmo);
        tower.rangeGizmo.visible = false;
        // console.log(":::", { tower, towers });

        towerToBuild = null;
    }

    // TOWER SELL
    if (evTarget.id === "tower-sell-btn") {
        modalEl.innerHTML = modalTemplates.confirmTowerSell(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-sell-btn")) {
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
    }
    if (evTarget.id === "confirm-tower-sell-btn") {
        // console.log("SELL THIS GODAMN TOWER", { el });
        delete el.userData.tower;
        delete el.userData.tower_id;
        delete modal3D.userData.tower;
        delete modal3D.userData.tower_id;

        modalEl.innerHTML = modalTemplates.towerBuild();
        modal3D.visible = false;

        // towers = towers.filter((t) => t.id !== tower_id);
        const towerIdx = towers.findIndex((t) => t.id === tower_id);
        const [tower] = towers.splice(towerIdx, 1);
        scene.remove(tower.model);
        scene.remove(tower.rangeGizmo);
        // console.log({ towers, tower, scene });
    }

    // TOWER INFO
    if (evTarget.id === "tower-info-btn") {
        // console.log("INFO", { el });
        modalEl.innerHTML = modalTemplates.towerInfo(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-info-btn")) {
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
    }

    // TOWER UPGRADE
    if (evTarget.id === "tower-upgrade-btn") {
        // console.log("UPGRADE", { el });
        modalEl.innerHTML = modalTemplates.confirmTowerUpgrade(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-upgrade-btn")) {
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
    }
    if (evTarget.classList.contains("confirm-tower-upgrade-btn")) {
        const tower = towers.find((t) => t.id === tower_id);
        // const towerIdx = towers.findIndex((t) => t.id === tower_id);
        // console.log("tower upgrade", { e, el, modal3D, modalEl, tower_id, tower });

        // if (towerIdx >= 0) {
        if (tower) {
            scene.remove(tower.rangeGizmo);
            scene.remove(tower.model);

            if (tower.blueprint.level > 3) return;

            const upgradedTower = tower.upgrade();
            scene.add(upgradedTower.model);
            scene.add(upgradedTower.rangeGizmo);

            console.log({ tower, towers });
            modalEl.innerHTML = modalTemplates.towerDetails(tower);
            modal3D.visible = false;
        }
    }
}

function onCanvasClick(e: MouseEvent) {
    if (Date.now() - clickTimestamp > 300) {
        // console.log("CLICK CANCELED");
        return;
    }

    const mousePos = new THREE.Vector2();
    mousePos.x = (e.offsetX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.offsetY / (window.innerHeight - 120)) * 2 + 1;

    const clickedModal = [...e.composedPath()].find((el) => (el as HTMLElement)?.classList?.contains("modal2D"));
    const clickedTower = mouseRay.intersectObjects(scene.children).find((ch) => ch.object.name.includes("-Tower"));
    const clickedTowerBase = mouseRay
        .intersectObjects(scene.children)
        .find((ch) => ch.object.name.includes("TowerBase"));

    // console.log({ rayIntersects: mouseRay.intersectObjects(scene.children), clickedTower, clickedTowerBase });

    revertCancelableModals(clickedModal as HTMLDivElement | undefined);

    if (clickedTowerBase) {
        console.log("CLICKED TOWER BASE", { clickedTowerBase });
        const modal3D = scene.getObjectByName(`${clickedTowerBase.object.name}-modal`)!;
        // HIDE previously open modal
        scene.traverse((obj) => {
            if ((obj as any).isCSS2DObject && obj.visible) {
                obj.visible = false;
            }
        });
        // SHOW current modal
        modal3D.visible = true;
    } else if (clickedTower) {
        console.log("CLICKED TOWER", { clickedTower, scene });

        // HIDE previously open modal
        let modal3D: THREE.Object3D | undefined;
        scene.traverse((obj) => {
            if ((obj as any).isCSS2DObject) {
                if (obj.userData.tile_idx === clickedTower.object.userData.tile_idx) {
                    modal3D = obj;
                }

                if (obj.visible) {
                    obj.visible = false;
                }
            }
        });
        // SHOW current modal
        if (modal3D) modal3D.visible = true;
    } else if (clickedModal) {
        console.log("CLICKED MODAL", { clickedModal });
    } else {
        console.log("CLICKED OUTSIDE: Neither modal nor towerBase");

        // HIDE modal (3D)
        scene.traverse((obj) => {
            if ((obj as any).isCSS2DObject) {
                if (obj.visible) {
                    obj.visible = false;
                }
            }
        });
    }
}

function handleHoverOpacityEfx() {
    const hoveredTower = mouseRay.intersectObjects(scene.children).find((ch) => ch.object.name.includes("-Tower"));
    const hoveredTowerBase = mouseRay
        .intersectObjects(scene.children)
        .find((ch) => ch.object.name.includes("TowerBase"));

    if (hoveredTowerBase) {
        const towerBaseMesh = hoveredTowerBase.object;
        // keep track of current towerBase
        hoveredTowerBaseName = towerBaseMesh.name;

        (towerBaseMesh as THREE.Mesh).material = new THREE.MeshMatcapMaterial({
            color: COLORS.concrete,
            transparent: true,
            opacity: 0.5,
        });
    } else {
        if (hoveredTowerBaseName) {
            const hoveredTowerBase = scene.getObjectByName(hoveredTowerBaseName) as THREE.Mesh;

            hoveredTowerBase.material = new THREE.MeshMatcapMaterial({
                color: COLORS.concrete,
            });
            // remove memory of hovered towerBase
            hoveredTowerBaseName = null;
        }
    }

    if (hoveredTower) {
        const towerMesh = hoveredTower.object as THREE.Mesh;
        // console.log({ towerMesh, hoveredTower });
        const tower = towers.find((t) => t.id === hoveredTower.object.userData["tower_id"]);
        if (!tower) return;

        hoveredTowerId = tower.id;

        towerMesh.material = new THREE.MeshBasicMaterial({
            // transparent: true,
            // opacity: 0.75,
            color: 0xca947d,
            map: towerTexture,
        });
        tower.rangeGizmo.visible = true;
    } else {
        if (hoveredTowerId) {
            const hoveredTower = towers.find((t) => t.id === hoveredTowerId);
            // console.log({ scene, hoveredTowerId, hoveredTower });

            if (!hoveredTower) return;
            hoveredTower.model.material = new THREE.MeshBasicMaterial({
                color: 0xdba58c,
                map: towerTexture,
            });
            hoveredTower.rangeGizmo.visible = false;
        }
        hoveredTowerId = null;
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
    // console.log("playpause click", gameState);
}

function onProjectile(e: any) {
    const projectile = e.detail as Projectile;
    projectiles.set(projectile.id, projectile);
    scene.add(projectile.model);

    if (DRAW_FUTURE_GIZMO) {
        const futureGizmo = new THREE.Mesh(
            new THREE.SphereGeometry(0.5),
            new THREE.MeshToonMaterial({ color: 0x00ffff })
            // new THREE.MeshToonMaterial({ color: 0xff0000 })
        );
        // const hitPosition =
        futureGizmo.position;
        // futureGizmo.visible = false;
    }

    // scene.add(projectile.trajectory);
    // console.log("onProjectile", { e, projectile });
}

function onProjectileExplode(e: any) {
    const projectile = e.detail as Projectile;
    scene.remove(projectile.model);
    // scene.remove(projectile.trajectory);
    projectiles.delete(projectile.id);
}

// function drawGrid() {
//     // Sets a 12 by 12 gird helper
//     const gridHelper = new THREE.GridHelper(12, 12);
//     scene.add(gridHelper);

//     // Sets the x, y, and z axes with each having a length of 4
//     const axesHelper = new THREE.AxesHelper(14);
//     scene.add(axesHelper);
// }

export function revertCancelableModals(clickedModal: HTMLDivElement | undefined) {
    const allModals = Array.from(document.querySelectorAll<HTMLDivElement>(".modal2D"));
    // console.log("REVERT CANCELABLE MODALS");
    // console.log(":::", { allModals, e, clickedTowerBase, clickedModal });
    allModals.forEach((modalEl) => {
        if (modalEl === clickedModal) return;
        // console.log(":::", { modalEl });

        for (const cancelableModalName of cancelableModalNames) {
            if (modalEl.children[0].classList.contains(cancelableModalName)) {
                // console.log(":::: cancel this one!", { cancelableModalName, modalEl });

                if (cancelableModalName === ModalType.ConfirmTowerBuild) {
                    modalEl.innerHTML = modalTemplates.towerBuild();
                } else {
                    for (const [idx, className] of modalEl.children[0].classList.entries()) {
                        if (className in TowerType) {
                            // const towerName = className as TowerType;
                            const tower = towers.find((t) => t.model.userData.tower_id);

                            // console.log(":::::::::revertCancelableModals", { modalEl, towers, idx, tower });
                            if (tower) {
                                modalEl.innerHTML = modalTemplates.towerDetails(tower);
                            }
                        }

                        console.log(":::::::::revertCancelableModals", { className, idx });
                    }
                }
                break;
            }
        }
    });
}
