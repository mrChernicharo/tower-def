/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "dat.gui";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { THREE } from "../three";
import { Enemy } from "./Enemy";
import {
    calcEarnedStarsForGameWin,
    capitalize,
    getEnemyTypeFromChar,
    getProjectileTowerName,
    handleModelGun,
} from "./helpers";
import {
    COLORS,
    DRAW_FUTURE_GIZMO,
    DRAW_PROJECTILE_TRAJECTORIES,
    ENEMY_BLUEPRINTS,
    MATERIALS,
    STAGE_WAVES_DATA,
    TOWER_BLUEPRINTS,
    desertLevelPath as jsonCurve,
} from "./constants";
import { AppLayers, EnemyChar, EnemyType, GameState, ModalType, TargetingStrategy, TowerType } from "./enums";
import { EnemyBluePrint, Projectile, WaveEnemy, GameInitProps } from "./types";
import { cancelableModalNames, gameEndTemplates, modalTemplates } from "./templates";
import { Tower } from "./Tower";
import { PlayerStats } from "./PlayerStats";

let pathPoints: THREE.Vector3[] = [];

export let scene: THREE.Scene;
export let gltfLoader: GLTFLoader;
export let fbxLoader: FBXLoader;
export let renderer: THREE.WebGLRenderer;
export let cssRenderer: CSS2DRenderer;
export let gameClock: THREE.Clock;
export let orbit: OrbitControls;
export let camera: THREE.PerspectiveCamera;
export let gameState = GameState.Idle;
export let pathCurve: THREE.CatmullRomCurve3;
export let mouseRay: THREE.Raycaster;
export let towerTexture: THREE.Texture;
export let playerStats: PlayerStats;
export let gameElapsedTime: number;
export let loadingManager: THREE.LoadingManager;

export let ambientLight: THREE.AmbientLight;
export let pointLight: THREE.PointLight;
export let lightProbe: THREE.LightProbe;

export let enemies: Enemy[] = [];
export let towers: Tower[] = [];
export let projectiles: Map<string, Projectile>;
export let explosions: Map<string, THREE.Mesh>;
export let futureGizmos: Map<string, THREE.Mesh>;

export let projectileFolder: any;
export const projRotation = { x: 0 };

export let gui: GUI;

export const ENEMY_MODELS = {} as { [k in EnemyType]: GLTF };
export const TOWER_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };
export const PROJECTILE_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };

const canvasHeight = window.innerHeight - 64;
let canvas: HTMLCanvasElement;
let playPauseBtn: HTMLButtonElement;
let waveDisplay: HTMLDivElement;
let endGameScreen: HTMLDivElement;
let loadingScreen: HTMLDivElement;
let endGameBtn: HTMLButtonElement;
let progressBar: HTMLProgressElement;

let frameId = 0;
let clickTimestamp = 0;
let towerToBuild: TowerType | null = null;
let hoveredTowerBaseName: string | null = null;
let hoveredTowerId: string | null = null;

let levelArea: string;
let levelIdx: number;
let currWave: WaveEnemy[] = [];
let currWaveIdx = 0;
let gameLost = false;

export async function destroyGame() {
    console.log("destroy", { scene });
    cancelAnimationFrame(frameId);
    currWaveIdx = 0;
    frameId = 0;
    gui?.destroy();
    gameClock.stop();
    scene.clear();
    camera.clear();
    orbit.dispose();
    ambientLight.dispose();
    renderer.dispose();
    enemies = [];
    towers = [];
    currWave = [];
    projectiles.clear();
    futureGizmos.clear();
    explosions.clear();
    gameState = GameState.Idle;

    window.removeEventListener("resize", onResize);
    window.removeEventListener("projectile", onProjectile);
    window.removeEventListener("projectile-explode", onProjectileExplode);
    window.removeEventListener("enemy-destroyed", onEnemyDestroyed);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("mousedown", onMouseDown);
    playPauseBtn.removeEventListener("click", onPlayPause);
}

export async function initGame({ area, level, gold, hp, skills }: GameInitProps) {
    playerStats = new PlayerStats({ gold, hp });
    levelIdx = level;
    levelArea = area;

    console.log("initGame", {
        skills,
        levelArea,
        levelIdx,
        COLORS,
        DRAW_FUTURE_GIZMO,
        ENEMY_BLUEPRINTS,
        STAGE_WAVES_DATA,
        TOWER_BLUEPRINTS,
    });

    await gameSetup();
    _wireUpLoadingManager();
    await _initEnemyModels();
    await _initTowerModels();
    await drawMap();
    drawPath();
    _init2DModals();

    window.addEventListener("resize", onResize);
    window.addEventListener("projectile", onProjectile);
    window.addEventListener("projectile-explode", onProjectileExplode);
    window.addEventListener("enemy-destroyed", onEnemyDestroyed);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("mousedown", onMouseDown);
    playPauseBtn.addEventListener("click", onPlayPause);

    frameId = requestAnimationFrame(animate);
}

async function gameSetup() {
    loadingManager = new THREE.LoadingManager();

    canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    playPauseBtn = document.querySelector("#play-pause-btn") as HTMLButtonElement;
    waveDisplay = document.querySelector("#wave-display") as HTMLDivElement;
    endGameScreen = document.querySelector("#end-game-screen") as HTMLDivElement;
    loadingScreen = document.querySelector("#loading-screen") as HTMLDivElement;
    progressBar = document.querySelector("#progress-bar") as HTMLProgressElement;

    endGameScreen.classList.add("hidden");

    canvas.innerHTML = "";

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, canvasHeight);
    renderer.setClearColor(COLORS.bg); // Sets the color of the background
    canvas.appendChild(renderer.domElement);

    cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(window.innerWidth, canvasHeight);
    cssRenderer.domElement.id = "css2d-overlay";
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "64px";
    cssRenderer.domElement.style.pointerEvents = "none";
    canvas.appendChild(cssRenderer.domElement);

    gltfLoader = new GLTFLoader(loadingManager);
    fbxLoader = new FBXLoader(loadingManager);
    gameClock = new THREE.Clock();
    gameElapsedTime = 0;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 18;
    camera.position.y = 18;
    camera.position.z = 62;
    camera.layers.enableAll();

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.maxPolarAngle = Math.PI * 0.48;

    ambientLight = new THREE.AmbientLight(0xefefef, 1.5);
    scene = new THREE.Scene();
    scene.add(ambientLight);

    mouseRay = new THREE.Raycaster();
    mouseRay.layers.disableAll();
    mouseRay.layers.enable(AppLayers.TowerBase);
    mouseRay.layers.enable(AppLayers.Tower);
    mouseRay.layers.enable(AppLayers.Modals);

    // gui = new GUI({ closed: true });

    // const lightFolder = gui.addFolder("Light");
    // lightFolder.add(lightProbe, "intensity", 0, 100);
    // lightFolder.add(lightProbe.position, "x", -200, 200);
    // lightFolder.add(lightProbe.position, "y", -2, 100);
    // lightFolder.add(lightProbe.position, "z", -200, 200);

    // const camFolder = gui.addFolder("Camera");
    // camFolder.add(camera.position, "x", -200, 200);
    // camFolder.add(camera.position, "y", -2, 100);
    // camFolder.add(camera.position, "z", -200, 200);

    // projectileFolder = gui.addFolder("Projectile Rotation");
    // projectileFolder.add(projRotation, "x", -Math.PI * 2, Math.PI * 2, 0.1);

    projectiles = new Map();
    futureGizmos = new Map();
    explosions = new Map();
}

function _wireUpLoadingManager() {
    loadingManager.onStart = (url, loaded, total) => {
        console.log(progressBar);
        console.log("loadingManager::START", { url, loaded, total });
    };

    loadingManager.onProgress = (_url, loaded, total) => {
        // console.log("loadingManager::PROGRESS", { url, loaded, total });
        progressBar.value = (total / loaded) * 100;
    };

    loadingManager.onLoad = () => {
        console.log("loadingManager::DONE!");
        loadingScreen.classList.add("hidden");
    };

    loadingManager.onError = (url) => {
        console.log("loadingManager::ERROR!", { url });
    };
}

async function _initEnemyModels() {
    const promises: Promise<GLTF>[] = [];
    for (const enemyType of Object.keys(ENEMY_BLUEPRINTS)) {
        const bluePrint: EnemyBluePrint = { ...ENEMY_BLUEPRINTS[enemyType as EnemyType] };
        promises.push(gltfLoader.loadAsync(bluePrint.modelURL).then((glb) => ({ ...glb, userData: { enemyType } })));
    }

    const models = await Promise.all(promises);

    for (const model of models) {
        handleModelGun(model);
        ENEMY_MODELS[model.userData.enemyType as EnemyType] = model;
    }
}

async function _initTowerModels() {
    const towersFbx = await fbxLoader.loadAsync("/assets/fbx/towers-no-texture.fbx");
    const projectilesFbx = await fbxLoader.loadAsync("/assets/fbx/projectiles-no-texture.fbx");
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
}

function _init2DModals() {
    console.log({ scene });
    scene.traverse((el) => {
        // if (/TowerBase.\d\d\d/.test(el.name)) {q
        if ((el as THREE.Mesh).isMesh && el.name.includes("TowerBase")) {
            // console.log({ el });

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
    // const glb = await gltfLoader.loadAsync("/assets/glb/village-level-000.glb");
    const glb = await gltfLoader.loadAsync("/assets/glb/desert-level.0.glb");
    const model = glb.scene;

    console.log({ glb, model });

    model.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;

            if (mesh.name.includes("TowerBase")) {
                mesh.material = MATERIALS.concrete();
                obj.layers.set(AppLayers.TowerBase);
            } else if (/desert|Plane/g.test(mesh.name)) {
                mesh.material = MATERIALS.desert();
                mesh.receiveShadow = true;
            } else {
                mesh.material = MATERIALS.desert();
                mesh.receiveShadow = true;
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
    const pathMesh = new THREE.Mesh(geometry, MATERIALS.path());
    pathMesh.name = "Road";
    pathMesh.position.y = shapeH;

    console.log({ pathCurve, pathMesh, pathPoints });

    scene.add(pathMesh);
}

// BUG: THIS IS STARTING WITH THE GAME PAUSED
function scheduleWaveEnemies(levelIdx: number, waveIdx: number) {
    console.log("scheduleWaveEnemies", { levelIdx, waveIdx, STAGE_WAVES_DATA });
    try {
        currWave = STAGE_WAVES_DATA[levelIdx][waveIdx].map(
            (wEnemy) =>
                ({
                    enemyType: getEnemyTypeFromChar(wEnemy[0] as EnemyChar),
                    spawnAt: wEnemy[1] as number,
                    xOffset: wEnemy[2] as number,
                } as WaveEnemy)
        );
    } catch (err) {
        console.error({ err, STAGE_WAVES_DATA });
        throw Error(`couldn't find wave ${waveIdx} of level ${levelIdx} at the STAGE_WAVES_DATA object`);
    }
}

function spawnEnemy(enemyType: EnemyType) {
    // console.log("spawnEnemy", { enemyType, currWave });
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
        gameElapsedTime += delta;
    }

    if (gameState === GameState.Active || gameState === GameState.Idle) {
        // ENEMIES
        for (const enemy of enemies) {
            enemy.tick(delta);
        }

        // TOWERS
        for (const tower of towers) {
            let targetEnemy: Enemy | undefined;

            const enemiesInRange = enemies.filter(
                (e) => e.hp > 0 && tower.position.distanceTo(e.model.position) <= tower.blueprint.range
            );

            if (enemiesInRange) {
                if (tower.strategy === TargetingStrategy.FirstInLine) {
                    let maxCoveredDistance = 0;
                    enemiesInRange.forEach((e) => {
                        const coveredDist = e.getPercDist();
                        if (coveredDist > maxCoveredDistance) {
                            maxCoveredDistance = coveredDist;
                            targetEnemy = e;
                        }
                    });
                } else if (tower.strategy === TargetingStrategy.LastInLine) {
                    let minCoveredDistance = Infinity;
                    enemiesInRange.forEach((e) => {
                        const coveredDist = e.getPercDist();
                        if (coveredDist < minCoveredDistance) {
                            minCoveredDistance = coveredDist;
                            targetEnemy = e;
                        }
                    });
                }
            }

            // console.log({ tower, enemiesInRange, enemies: [...enemies], targetEnemy });
            tower.tick(delta, targetEnemy!);
        }

        // PROJECTILE
        for (const [, projectile] of projectiles.entries()) {
            // console.log({ projectile });
            projectile.tick(delta);
        }

        // EXPLOSIONS
        const removingExplosions = [];
        for (const [, explosion] of explosions.entries()) {
            const elapsed = Date.now() - explosion.userData.spawned_at;
            const intensity = explosion.userData.intensity;
            if (elapsed < 200) {
                explosion.scale.x += intensity * 0.5;
                explosion.scale.y += intensity * 0.5;
                explosion.scale.z += intensity * 0.5;
            } else if (elapsed < 600) {
                explosion.scale.x -= intensity * 0.25;
                explosion.scale.y -= intensity * 0.25;
                explosion.scale.z -= intensity * 0.25;
            } else {
                removingExplosions.push(explosion);
            }
            // console.log({ explosion, elapsed });
        }
        removingExplosions.forEach((ex) => {
            explosions.delete(ex.userData.projectile_id);
            scene.remove(ex);
        });

        // WAVE SPAWNING
        const spawningEnemyIdx = currWave.findIndex((e) => e.spawnAt < gameElapsedTime);
        if (spawningEnemyIdx > -1) {
            const [spawningEnemy] = currWave.splice(spawningEnemyIdx, 1);
            spawnEnemy(spawningEnemy.enemyType);
        }
    }

    frameId = requestAnimationFrame(animate);
}

function onMouseMove(e: MouseEvent) {
    const mousePos = new THREE.Vector2();
    mousePos.x = (e.offsetX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.offsetY / canvasHeight) * 2 + 1;

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
    // console.log(":::onModalClick::::", { e, el, modal3D, modalEl, tower_id, tower });

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

        const towerPrice = TOWER_BLUEPRINTS[towerToBuild!][0].price;
        if (playerStats.gold < towerPrice) {
            console.warn("not enough money");
            const msgArea = document.querySelector(".warning-msg-area")!;
            msgArea.innerHTML = "not enough money!";
            return;
        }
        playerStats.spendGold(towerPrice);

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
        playerStats.gainGold(tower.blueprint.price * 0.7);

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
        // if (towerIdx >= 0)
        if (tower) {
            if (playerStats.gold < tower.blueprint.price) {
                console.warn("not enough money");
                const msgArea = document.querySelector(".warning-msg-area")!;
                msgArea.innerHTML = "not enough money!";
                return;
            }
            playerStats.spendGold(tower.blueprint.price);

            scene.remove(tower.rangeGizmo);
            scene.remove(tower.model);

            if (tower.blueprint.level > 3) return;

            const upgradedTower = tower.upgrade();
            scene.add(upgradedTower.model);
            scene.add(upgradedTower.rangeGizmo);

            // console.log({ tower, towers });
            modalEl.innerHTML = modalTemplates.towerDetails(tower);
            upgradedTower.rangeGizmo.visible = false;
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
    mousePos.y = -(e.offsetY / canvasHeight) * 2 + 1;

    const clickedModal = [...e.composedPath()].find((el) => (el as HTMLElement)?.classList?.contains("modal2D"));
    const clickedTower = mouseRay.intersectObjects(scene.children).find((ch) => ch.object.name.includes("-Tower"));
    const clickedTowerBase = mouseRay
        .intersectObjects(scene.children)
        .find((ch) => ch.object.name.includes("TowerBase"));

    // console.log({ rayIntersects: mouseRay.intersectObjects(scene.children), clickedTower, clickedTowerBase });

    revertCancelableModals(clickedModal as HTMLDivElement | undefined);

    if (clickedTowerBase) {
        console.log("CLICKED TOWER BASE", { clickedTowerBase, scene });
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
        .find((ch) => (ch.object as THREE.Mesh).isMesh && ch.object.name.includes("TowerBase"));
    // console.log({ scene, hoveredTowerBase });

    if (hoveredTowerBase) {
        const towerBaseMesh = hoveredTowerBase.object;
        // keep track of current towerBase
        hoveredTowerBaseName = towerBaseMesh.name;

        (towerBaseMesh as THREE.Mesh).material = MATERIALS.concreteTransparent();
    } else {
        if (hoveredTowerBaseName) {
            const hoveredTowerBase = scene.getObjectByName(hoveredTowerBaseName) as THREE.Mesh;
            hoveredTowerBase.material = MATERIALS.concrete();

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

        towerMesh.material = MATERIALS.towerHighlight(towerTexture);
        tower.rangeGizmo.visible = true;
    } else {
        if (hoveredTowerId) {
            const hoveredTower = towers.find((t) => t.id === hoveredTowerId);
            // console.log({ scene, hoveredTowerId, hoveredTower });
            if (!hoveredTower) return;

            hoveredTower.model.material = MATERIALS.tower(towerTexture);
            hoveredTower.rangeGizmo.visible = false;
        }
        hoveredTowerId = null;
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, canvasHeight);
    cssRenderer.setSize(window.innerWidth, canvasHeight);
}

function onPlayPause() {
    switch (gameState) {
        case GameState.Idle:
            // WAVE START
            console.log("<<< WAVE START >>>", { levelIdx, currWaveIdx });
            scheduleWaveEnemies(levelIdx, currWaveIdx);
            gameState = GameState.Active;
            playPauseBtn.textContent = "Pause";
            waveDisplay.innerHTML = `Wave ${currWaveIdx + 1}`;
            break;
        case GameState.Active:
            gameState = GameState.Paused;
            playPauseBtn.textContent = "Resume";
            break;
        case GameState.Paused:
            gameState = GameState.Active;
            playPauseBtn.textContent = "Pause";
            break;
    }
}

function onProjectile(e: any) {
    const projectile = e.detail as Projectile;
    projectiles.set(projectile.id, projectile);
    scene.add(projectile.model);

    if (DRAW_FUTURE_GIZMO) {
        const futureGizmo = new THREE.Mesh(new THREE.SphereGeometry(0.35), MATERIALS.projectileGizmo());
        const hitPosition = new THREE.Vector3().copy(projectile.destination);
        futureGizmo.position.set(hitPosition.x, hitPosition.y, hitPosition.z);
        futureGizmo.name = "FutureGizmo";
        futureGizmo.userData["id"] = projectile.id;
        scene.add(futureGizmo);
        futureGizmos.set(projectile.id, futureGizmo);
        // futureGizmo.visible = false;
    }

    // in case you want to draw trajectories
    if (DRAW_PROJECTILE_TRAJECTORIES) {
        scene.add(projectile.trajectory);
    }
}

function onProjectileExplode(e: any) {
    const projectile = e.detail as Projectile;
    const futureGizmo = futureGizmos.get(projectile.id)!;
    const targetEnemy = enemies.find((e) => e.id === projectile.targetEnemyId);

    const explosion = projectile.explosion as THREE.Mesh;
    explosion.userData["projectile_id"] = projectile.id;
    explosion.userData["spawned_at"] = Date.now();
    explosion.userData["intensity"] = projectile.blueprint.explosionIntensity;
    explosion.position.set(projectile.model.position.x, projectile.model.position.y, projectile.model.position.z);

    if (targetEnemy && targetEnemy.hp > 0) {
        targetEnemy.takeDamage(projectile.damage);
    }

    // console.log("onProjectileExplode", { projectile, projectiles, towers, explosions, scene });

    futureGizmos.delete(projectile.id);
    projectiles.delete(projectile.id);
    scene.remove(projectile.model);
    scene.remove(futureGizmo);

    explosions.set(projectile.id, explosion);
    scene.add(explosion);
}

function onEnemyDestroyed(e: any) {
    const data = e.detail;
    // console.log("enemy destroy", { data });
    const { enemy, endReached } = data as { enemy: Enemy; endReached: boolean };

    if (endReached) {
        console.log(`${enemy.enemyType} reached end`);
        playerStats.loseHP(1);
        if (playerStats.hp <= 0) {
            console.log("GAME END ... LOSE");
            endGameScreen.innerHTML = gameEndTemplates.gameLose();
            endGameScreen.classList.remove("hidden");
            endGameBtn = document.querySelector("#confirm-end-game-btn") as HTMLButtonElement;
            endGameBtn.addEventListener("click", onEndGameConfirm);
            gameLost = true;
        }
    } else {
        console.log("enemy killed");
        playerStats.gainGold(enemy.bluePrint.reward);
        // @TODO: draw money gain effect
    }

    enemies = enemies.filter((e) => e.id !== enemy.id);
    scene.remove(enemy.model);

    if (enemies.length === 0 && !gameLost) {
        console.log("wave ended");
        gameState = GameState.Idle;
        currWaveIdx++;
        gameElapsedTime = 0;

        const waveCount = STAGE_WAVES_DATA[levelIdx].length;
        if (currWaveIdx === waveCount) {
            console.log("GAME END ... WIN!");
            const stars = calcEarnedStarsForGameWin(playerStats.hp);
            endGameScreen.innerHTML = gameEndTemplates.gameWin(stars);
            endGameScreen.classList.remove("hidden");
            window.dispatchEvent(new CustomEvent("game-win", { detail: stars }));

            endGameBtn = document.querySelector("#confirm-end-game-btn") as HTMLButtonElement;
            endGameBtn.addEventListener("click", onEndGameConfirm);
        }

        playPauseBtn.innerHTML = `Start Wave ${currWaveIdx + 1}`;
    }
}

function onEndGameConfirm() {
    location.assign("#/area");
    endGameBtn.removeEventListener("click", onEndGameConfirm);
}

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
                    for (const [, className] of modalEl.children[0].classList.entries()) {
                        if (className in TowerType) {
                            // const towerName = className as TowerType;
                            const tower = towers.find((t) => t.model.userData.tower_id);

                            // console.log(":::::::::revertCancelableModals", { modalEl, towers, idx, tower });
                            if (tower) {
                                modalEl.innerHTML = modalTemplates.towerDetails(tower);
                            }
                        }
                        // console.log(":::::::::revertCancelableModals", { className, idx });
                    }
                }
                break;
            }
        }
    });
}

// function drawGrid() {
//     // Sets a 12 by 12 gird helper
//     const gridHelper = new THREE.GridHelper(12, 12);
//     scene.add(gridHelper);

//     // Sets the x, y, and z axes with each having a length of 4
//     const axesHelper = new THREE.AxesHelper(14);
//     scene.add(axesHelper);
// }
