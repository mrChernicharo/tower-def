/* eslint-disable @typescript-eslint/no-explicit-any */
import { THREE } from "../three";
import { GUI } from "dat.gui";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/examples/jsm/Addons.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Enemy } from "./Enemy";
import {
    applyAreaDamage,
    calcEarnedStarsForGameWin,
    // capitalize,
    determineDamage,
    mousePosToWorldPos,
    getEnemyTypeFromChar,
    getProjectileTowerName,
    handleModelGun,
    idMaker,
    isModal,
} from "../shared/helpers";
import {
    BLIZZARD_EFFECT_DURATION,
    BLIZZARD_SLOW_DURATION,
    COLORS,
    DRAW_FUTURE_GIZMO,
    DRAW_METEOR_GIZMOS,
    DRAW_PROJECTILE_TRAJECTORIES,
    MATERIALS,
    MAX_FOV,
    MIN_FOV,
} from "../shared/constants/general";

import {
    AppLayers,
    EnemyChar,
    EnemyType,
    GameArea,
    GameState,
    ModalType,
    TargetingStrategy,
    TowerType,
} from "../shared/enums";
import { EnemyBluePrint, Projectile, WaveEnemyObj, GameInitProps, GameSpeed, GameLevel } from "../shared/types";
import { beaconTemplate, cancelableModalNames, gameEndTemplates, modalTemplates, speedBtnsTemplate } from "./templates";
import { Tower } from "./Tower";
import { PlayerStats } from "./PlayerStats";
import { Meteor } from "./Meteor";
import { PoisonEntry } from "./PoisonEntry";
import { Blizzard } from "./Blizzard";
import { GAME_LEVELS, STAGE_WAVES_DATA } from "../shared/constants/levels/game-levels";
import { LEVEL_OBJECTS } from "../shared/constants/levels/level-objects";
import { ENEMY_BLUEPRINTS } from "../shared/constants/enemies";
import { towerModelsURLs, TOWER_BLUEPRINTS } from "../shared/constants/towers";

// let pathPoints: THREE.Vector3[] = [];

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

export const ENEMY_MODELS = {} as { [k in EnemyType]: GLTF };
export const TOWER_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Group } };
export const PROJECTILE_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };

let gltfLoader: GLTFLoader;
let fbxLoader: FBXLoader;
// let fontLoader: FontLoader;

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let cssRenderer: CSS2DRenderer;
let camera: THREE.PerspectiveCamera;
//  let orbit: OrbitControls;

let gameState = GameState.Idle;
let gameClock: THREE.Clock;
let totalGameTime: number;
let activeGameTime: number;
let gameSpeed: GameSpeed;

let mouseRay: THREE.Raycaster;
let playerStats: PlayerStats;
let loadingManager: THREE.LoadingManager;
let levelData: GameLevel;
let towerPreview: { model: THREE.Group; rangeGizmo: THREE.Mesh } | undefined;

let ambientLight: THREE.AmbientLight;
let directionalLight: THREE.DirectionalLight;

let enemies: Enemy[] = [];
let towers: Tower[] = [];
let meteors: Map<string, Meteor>;
let blizzards: Map<string, Blizzard>;
let nums: Map<string, CSS2DObject>;

let projectiles: Map<string, Projectile>;
let explosions: Map<string, THREE.Mesh>;
let poisonEntries: Map<string, PoisonEntry>;
let futureGizmos: Map<string, THREE.Mesh>;

export let pathCurves: THREE.CatmullRomCurve3[] = [];
export let towerTexture: THREE.Texture;

let gui: GUI;

let canvas: HTMLCanvasElement;
let pauseGameBtn: HTMLButtonElement;
let resumeGameBtn: HTMLButtonElement;
let blizzardBtn: HTMLButtonElement;
let meteorBtn: HTMLButtonElement;
let waveDisplay: HTMLDivElement;
let endGameScreen: HTMLDivElement;
let loadingScreen: HTMLDivElement;
let pauseScreen: HTMLDivElement;
let endGameBtn: HTMLButtonElement;
let progressBar: HTMLProgressElement;
let speedBtns: HTMLDivElement;
let callWaveBeaconContainers: HTMLDivElement[] = [];

let composer: EffectComposer;
export let slowOutlinePass: OutlinePass;
export let poisonOutlinePass: OutlinePass;
let outlinePass: OutlinePass;
let effectFXAA: ShaderPass;

let frameId = 0;
let clickTimestamp = 0;
let towerToBuild: TowerType | null = null;

let levelArea: string;
let levelIdx: number;
let currWave: WaveEnemyObj[] = [];
let currWaveIdx = 0;
let gameLost = false;

let readyToFireMeteor = false;
let meteorTargetPos = new THREE.Vector3();

let readyToFireBlizzard = false;
let blizzardTargetPos = new THREE.Vector3();
// let mouseTargetRing: THREE.Mesh;
let mobileScaling = false;
let prevPinchDist = 0;
let pinchDist = 0;

export async function destroyGame() {
    console.log("destroy", { scene });
    cancelAnimationFrame(frameId);
    gameState = GameState.Idle;
    currWaveIdx = 0;
    levelArea = "";
    levelIdx = 0;
    frameId = 0;
    gui?.destroy();
    gameClock.stop();
    scene.clear();
    camera.clear();
    composer.dispose();
    // orbit.dispose();
    ambientLight.dispose();
    directionalLight.dispose();
    renderer.dispose();
    enemies = [];
    towers = [];
    projectiles.clear();
    futureGizmos.clear();
    explosions.clear();
    meteors.clear();
    blizzards.clear();
    poisonEntries.clear();
    currWave = [];
    pathCurves = [];
    callWaveBeaconContainers = [];

    window.removeEventListener("projectile", onProjectile);
    window.removeEventListener("projectile-explode", onProjectileExplode);
    window.removeEventListener("meteor-explode", onMeteorExplode);
    window.removeEventListener("meteor-fire", onMeteorFire);
    window.removeEventListener("blizzard-fire", onBlizzardFire);
    window.removeEventListener("blizzard-finish", onBlizzardFinish);
    window.removeEventListener("enemy-destroyed", onEnemyDestroyed);
    window.removeEventListener("poison-entry-expired", onPoisonEntryExpired);
    window.removeEventListener("poison-entry-damage", onPoisonEntryDamage);

    window.removeEventListener("resize", onResize);
    window.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("wheel", onZoom);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);

    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("pointerdown", onMouseDown);
    pauseGameBtn.removeEventListener("click", onPauseGame);
    resumeGameBtn.removeEventListener("click", onResumeGame);
    speedBtns.removeEventListener("click", onGameSpeedChange);
    meteorBtn.removeEventListener("click", onMeteorBtnClick);
    blizzardBtn.removeEventListener("click", onBlizzardBtnClick);

    // location.reload();
}

export async function initGame({ area, level, hp, skills }: GameInitProps) {
    levelIdx = level;
    levelArea = area;
    levelData = GAME_LEVELS[levelIdx];
    console.log({ levelData });
    playerStats = new PlayerStats({ hp, gold: levelData.initialGold });

    console.log("initGame", { skills, levelArea, levelIdx, levelData, PlayerStats });

    await gameSetup();
    _wireUpLoadingManager();
    await _initEnemyModels();
    await _initTowerModels();
    await drawMap();
    drawPaths();
    _init2DModals();
    drawWaveCallBeacon();

    window.addEventListener("projectile", onProjectile);
    window.addEventListener("projectile-explode", onProjectileExplode);
    window.addEventListener("meteor-explode", onMeteorExplode);
    window.addEventListener("meteor-fire", onMeteorFire);
    window.addEventListener("blizzard-fire", onBlizzardFire);
    window.addEventListener("blizzard-finish", onBlizzardFinish);
    window.addEventListener("enemy-destroyed", onEnemyDestroyed);
    window.addEventListener("poison-entry-expired", onPoisonEntryExpired);
    window.addEventListener("poison-entry-damage", onPoisonEntryDamage);

    window.addEventListener("resize", onResize);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("wheel", onZoom);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("pointerdown", onMouseDown);
    pauseGameBtn.addEventListener("click", onPauseGame);
    resumeGameBtn.addEventListener("click", onResumeGame);
    speedBtns.addEventListener("click", onGameSpeedChange);
    meteorBtn.addEventListener("click", onMeteorBtnClick);
    blizzardBtn.addEventListener("click", onBlizzardBtnClick);

    frameId = requestAnimationFrame(animate);
}

async function gameSetup() {
    loadingManager = new THREE.LoadingManager();

    canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    pauseGameBtn = document.querySelector("#play-pause-btn") as HTMLButtonElement;
    resumeGameBtn = document.querySelector("#resume-game-btn") as HTMLButtonElement;
    waveDisplay = document.querySelector("#wave-display") as HTMLDivElement;
    endGameScreen = document.querySelector("#end-game-screen") as HTMLDivElement;
    loadingScreen = document.querySelector("#loading-screen") as HTMLDivElement;
    pauseScreen = document.querySelector("#pause-game-screen") as HTMLDivElement;
    progressBar = document.querySelector("#progress-bar") as HTMLProgressElement;
    speedBtns = document.querySelector("#speed-btn") as HTMLDivElement;
    blizzardBtn = document.querySelector("#blizzard-action-btn") as HTMLButtonElement;
    meteorBtn = document.querySelector("#meteor-action-btn") as HTMLButtonElement;

    projectiles = new Map();
    futureGizmos = new Map();
    explosions = new Map();
    meteors = new Map();
    blizzards = new Map();
    nums = new Map();
    poisonEntries = new Map();

    endGameScreen.classList.add("hidden");
    speedBtns.innerHTML = speedBtnsTemplate.speedBtns();
    (speedBtns.children[1] as HTMLInputElement).checked = true;
    gameSpeed = 1;

    canvas.innerHTML = "";

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(COLORS.bg); // Sets the color of the background
    canvas.style.touchAction = "none";
    canvas.appendChild(renderer.domElement);

    cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(canvasWidth, canvasHeight);
    cssRenderer.domElement.id = "css2d-overlay";
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0px";
    cssRenderer.domElement.style.pointerEvents = "none";
    canvas.appendChild(cssRenderer.domElement);

    gltfLoader = new GLTFLoader(loadingManager);
    fbxLoader = new FBXLoader(loadingManager);
    // fontLoader = new FontLoader(loadingManager);
    gameClock = new THREE.Clock();
    activeGameTime = 0;
    totalGameTime = 0;

    camera = new THREE.PerspectiveCamera(45, canvasWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = levelData.initialCamPos[0];
    camera.position.y = levelData.initialCamPos[1];
    camera.position.z = levelData.initialCamPos[2];
    camera.layers.enableAll();
    scene = new THREE.Scene();
    const camTarget = new THREE.Vector3(camera.position.x, camera.position.y - 40, camera.position.z - 50);
    camera.lookAt(camTarget);

    // orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.maxPolarAngle = Math.PI * 0.48;

    ambientLight = new THREE.AmbientLight(0xefefef, 1);
    directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    // directionalLight.position.set(-30, 50, -30);
    directionalLight.position.set(5, 10, 7.5);
    // x: 5, y: 10, z: 7.5
    scene.add(ambientLight);
    scene.add(directionalLight);

    mouseRay = new THREE.Raycaster();
    mouseRay.layers.disableAll();
    mouseRay.layers.enable(AppLayers.Terrain);
    mouseRay.layers.enable(AppLayers.TowerBase);
    mouseRay.layers.enable(AppLayers.Tower);
    mouseRay.layers.enable(AppLayers.Modals);
    mouseRay.layers.enable(AppLayers.Buildings);

    // const mouseTargetRingGeometry = new THREE.TorusGeometry(3);
    // mouseTargetRingGeometry.rotateX(-Math.PI / 2);
    // mouseTargetRing = new THREE.Mesh(mouseTargetRingGeometry, MATERIALS.beacon);
    // mouseTargetRing.name = "mouseTargetRing";
    // mouseTargetRing.position.set(0, 0, 0);
    // scene.add(mouseTargetRing);
    // mouseTargetRing.visible = false;

    // post-processing (for drawing outlines)
    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new OutlinePass(new THREE.Vector2(canvasWidth, canvasHeight), scene, camera);
    slowOutlinePass = new OutlinePass(new THREE.Vector2(canvasWidth, canvasHeight), scene, camera);
    poisonOutlinePass = new OutlinePass(new THREE.Vector2(canvasWidth, canvasHeight), scene, camera);

    outlinePass.visibleEdgeColor = new THREE.Color(0xffffff);
    slowOutlinePass.visibleEdgeColor = new THREE.Color(COLORS.blue);
    poisonOutlinePass.visibleEdgeColor = new THREE.Color(COLORS.poisonGreen);

    composer.addPass(outlinePass);
    composer.addPass(slowOutlinePass);
    composer.addPass(poisonOutlinePass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(1 / canvasWidth, 1 / canvasHeight);
    composer.addPass(effectFXAA);

    // gui = new GUI({ closed: false });

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
}

function _wireUpLoadingManager() {
    // loadingManager.onStart = (url, loaded, total) => {
    //     // console.log(progressBar);
    //     // console.log("loadingManager::START", { url, loaded, total });
    // };

    loadingManager.onProgress = (_url, loaded, total) => {
        // console.log("loadingManager::PROGRESS", { url, loaded, total });
        progressBar.value = (loaded / total) * 100;
    };

    loadingManager.onLoad = () => {
        // console.log("loadingManager::DONE!");
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
    // const towersFbx = await fbxLoader.loadAsync("/assets/fbx/towers-no-texture.fbx");
    // const { scene: towerModels } = await gltfLoader.loadAsync(
    //     "/assets/glb/towers/towers-no-texture-separated-heads.glb"
    // );

    const modelPromises: Promise<GLTF>[] = [];
    for (const [, /*towerType*/ urls] of Object.entries(towerModelsURLs)) {
        for (const url of urls) {
            modelPromises.push(gltfLoader.loadAsync(url));
        }
    }
    const result = await Promise.all(modelPromises);

    for (const glb of result) {
        const model = glb.scene;
        // console.log(model);
        const modelName =
            model.userData.name || model.children[0].userData.name || model.children[0].children[0].userData.name;
        const [towerName, towerLevel] = [modelName.split("_")[0] as TowerType, +modelName.split("_")[3]];
        model.name = modelName;
        model.userData.name = model.name;
        // console.log(towerName, towerLevel, modelName);

        if (!TOWER_MODELS[towerName]) {
            TOWER_MODELS[towerName] = {};
        }

        if (!TOWER_MODELS[towerName][`level-${towerLevel}`]) {
            TOWER_MODELS[towerName][`level-${towerLevel}`] = new THREE.Group();
        }

        if (model.userData.name.includes("_Head")) {
            model.name = `${towerName}_Tower_Head`;
        } else if (model.userData.name.includes("_Body")) {
            model.name = `${towerName}_Tower_Body`;
        } else {
            model.name = `${towerName}_Tower`;
        }

        TOWER_MODELS[towerName][`level-${towerLevel}`].add(model.clone());
    }
    console.log({ result, TOWER_MODELS });

    const projectilesFbx = await fbxLoader.loadAsync("/assets/fbx/projectiles-no-texture.fbx");
    towerTexture = await new THREE.TextureLoader().loadAsync("/assets/fbx/towers-texture.png");
    // console.log("_initTowerModels", {
    //     towerModels,
    //     towers: towerModels.children.map((c) => c.name).sort((a, b) => a.localeCompare(b)),
    // });

    // for (const model of towerModels.children) {
    //     // console.log(model);
    //     const towerLevel = +model.name.split("_")[3];
    //     const towerName = capitalize(model.name.split("_")[0]) as TowerType;

    //     if (!TOWER_MODELS[towerName]) {
    //         TOWER_MODELS[towerName] = {};
    //     }

    //     if (!TOWER_MODELS[towerName][`level-${towerLevel}`]) {
    //         TOWER_MODELS[towerName][`level-${towerLevel}`] = new THREE.Group();
    //     }

    //     // if (TOWER_BLUEPRINTS[towerName][towerLevel]?.modelURL) {
    //     //     const glb = await gltfLoader.loadAsync(TOWER_BLUEPRINTS[towerName][towerLevel].modelURL!);
    //     //     model = glb.scene;
    //     // }

    //     if (model.userData.name.includes("_Head")) {
    //         model.name = `${towerName}-Tower_Head`;
    //     } else if (model.userData.name.includes("_Body")) {
    //         model.name = `${towerName}-Tower_Body`;
    //     } else {
    //         model.name = `${towerName}-Tower`;
    //     }

    //     TOWER_MODELS[towerName][`level-${towerLevel}`].add(model.clone());
    // }

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
    // console.log({ scene });
    scene.traverse((el) => {
        // if (/TowerBase.\d\d\d/.test(el.name)) {q
        if ((el as THREE.Mesh).isMesh && el.name.includes("TowerBase")) {
            // console.log({ el });

            const tileIdx = el.userData.idx;

            const modalContainer = document.createElement("div");
            modalContainer.className = "modal-container";

            const modalEl = document.createElement("div");
            modalEl.id = `modal2D-${el.name}`;
            modalEl.className = `modal2D tile_${tileIdx}`;
            modalEl.style.pointerEvents = "all";
            modalEl.style.opacity = "0.9";

            const modal3D = new CSS2DObject(modalContainer);

            modal3D.position.set(el.position.x, el.position.y, el.position.z);
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
    const glb = await gltfLoader.loadAsync(levelData.mapURL);

    const model = glb.scene;

    console.log("drawMap", { glb, model });

    model.traverse((obj) => {
        console.log({ obj });
        if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;

            // console.log(mesh.name, mesh.position, mesh.rotation, mesh.scale);

            if (/Plane/g.test(mesh.name)) {
                mesh.material = MATERIALS[`${levelData.area}`];
                // mesh.receiveShadow = true;
                obj.layers.set(AppLayers.Terrain);
            } else {
                mesh.material = MATERIALS.concrete2;
                // mesh.receiveShadow = true;
                obj.layers.set(AppLayers.Buildings);
            }
        }
    });

    scene.add(model);

    levelData.towerBasePositions.forEach((pos, i) => {
        const towerBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.2), MATERIALS.concrete);
        towerBaseMesh.name = `TowerBase.${i}`;

        // towerBaseMesh.userData.name = `TowerBase.${i}`;
        towerBaseMesh.userData.idx = i;
        towerBaseMesh.layers.set(AppLayers.TowerBase);
        towerBaseMesh.position.set(pos[0], pos[1], pos[2]);
        scene.add(towerBaseMesh);
    });

    console.log({ LEVEL_OBJECTS, levelArea, levelData, mapObjects: LEVEL_OBJECTS[levelIdx] });

    for (const levelObj of LEVEL_OBJECTS[levelIdx]) {
        const { scene: object } = await gltfLoader.loadAsync(levelObj.url);

        levelObj.instances.forEach((inst) => {
            const clone = object.clone();
            clone.name = levelObj.name;
            clone.position.set(inst.position[0], inst.position[1], inst.position[2]);
            clone.setRotationFromEuler(new THREE.Euler(inst.rotation[0], inst.rotation[1], inst.rotation[2]));
            clone.scale.set(inst.scale[0], inst.scale[1], inst.scale[2]);

            if (clone.name.includes("desert")) {
                clone.traverse((obj) => {
                    if ((obj as any).isMesh) {
                        const mesh = obj as THREE.Mesh;
                        mesh.material = MATERIALS[`${levelData.area}`];
                        // // mesh.receiveShadow = true;
                        obj.layers.set(AppLayers.Terrain);
                    }
                });
            }

            if (["Tavern", "Fountain_00", "Statue_01"].includes(clone.name)) {
                clone.traverse((obj) => {
                    if ((obj as any).isMesh) {
                        const mesh = obj as THREE.Mesh;
                        mesh.material = MATERIALS.lightConcrete;
                        // // mesh.receiveShadow = true;
                        obj.layers.set(AppLayers.Terrain);
                    }
                });
            }

            scene.add(clone);
        });
    }
}

function drawPaths() {
    console.log("drawPaths", { levelData });

    levelData.paths.forEach((path) => {
        const pathPoints: THREE.Vector3[] = [];
        path.points.forEach((point) => {
            pathPoints.push(new THREE.Vector3(point.x, point.y, point.z));
        });

        const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, "catmullrom", 0.5);
        pathCurves.push(pathCurve);

        const [shapeW, shapeH] =
            levelData.area === GameArea.Forest || levelData.area === GameArea.Lava ? [0.05, 0.2] : [0.05, 0.05];
        // const [shapeW, shapeH] = [0.05, 0.05];
        // const [shapeW, shapeH] = [1, 0.05];
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
            steps: 200,
            extrudePath: pathCurve,
        });
        const pathMesh = new THREE.Mesh(geometry, MATERIALS.path);
        pathMesh.name = "Road";
        pathMesh.position.y = shapeH;

        // console.log({ attributes: pathMesh.geometry.attributes, geometry });
        // console.log({ pathCurve, pathMesh, pathPoints });

        scene.add(pathMesh);
    });
}

function drawWaveCallBeacon() {
    currWave = levelData.waves[currWaveIdx].map((wEnemy) => ({
        enemyType: getEnemyTypeFromChar(wEnemy[0] as EnemyChar),
        pathIdx: wEnemy[1],
        spawnAt: wEnemy[2],
        xOffset: wEnemy[3],
    }));

    const differentEnemyPaths = [...new Set(currWave.map((waveData) => waveData.pathIdx))];

    const beaconsPositions: THREE.Vector3[] = [];
    differentEnemyPaths.forEach((pathIdx) => {
        const pos = new THREE.Vector3(
            pathCurves[pathIdx].points[0].x,
            pathCurves[pathIdx].points[0].y,
            pathCurves[pathIdx].points[0].z
        );

        let samePoint = false;
        for (const beaconPos of beaconsPositions) {
            if (pos.distanceTo(beaconPos) < 1) {
                samePoint = true;
                break;
            }
        }
        if (!samePoint) {
            beaconsPositions.push(pos);
        }
    });

    // console.log("drawWaveCallBeacon", { pathCurves, beaconsPositions, levelData, differentEnemyPaths });

    callWaveBeaconContainers = [];
    beaconsPositions.forEach((pos) => {
        const callWaveModalContainer = document.createElement("div");
        callWaveBeaconContainers.push(callWaveModalContainer);

        const modal2D = new CSS2DObject(callWaveModalContainer);
        modal2D.position.set(pos.x, pos.y, pos.z);
        modal2D.name = `call-wave-2D-modal`;
        scene.add(modal2D);

        const modalEl = document.createElement("div");
        modalEl.id = `call-wave-modal`;
        modalEl.style.pointerEvents = "all";
        modalEl.style.opacity = "0.9";
        callWaveModalContainer.append(modalEl);
        modalEl.innerHTML = beaconTemplate.callWave();

        modalEl.onclick = () => {
            // console.log("CALL WAVE!", currWaveIdx + 1);
            // WAVE START
            console.log("<<< WAVE START >>>", { levelIdx, currWaveIdx });
            gameState = GameState.Active;
            pauseGameBtn.textContent = "⏸️";
            waveDisplay.innerHTML = `Wave ${currWaveIdx + 1}/${GAME_LEVELS[levelIdx!].waves.length}`;
            callWaveBeaconContainers = [];

            const modalEls = [...document.querySelectorAll("#call-wave-modal")];
            modalEls.forEach((modalEl) => {
                modalEl.remove();
            });
        };
    });
}

function animate() {
    const delta = gameClock.getDelta() * gameSpeed;
    totalGameTime += delta;

    // const elapsed = gameClock.getElapsedTime();

    cssRenderer.render(scene, camera);
    renderer.render(scene, camera);
    composer.render(delta);

    // orbit.update();

    if (gameState === GameState.Active) {
        activeGameTime += delta;

        // SPECIALS COOLDOWN
        playerStats.tick(delta);

        for (const [, poison] of poisonEntries.entries()) {
            poison.tick(delta);
        }
    }

    if (gameState === GameState.Active || gameState === GameState.Idle) {
        // ENEMIES
        for (const enemy of enemies) {
            enemy.tick(delta);

            if (enemy.isSlowed) {
                if (enemy.timeSinceSlowed > BLIZZARD_SLOW_DURATION) {
                    enemy.healSlow();
                }
            }
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
            // if (gameState === GameState.Idle) {

            // }

            const elapsed = totalGameTime - explosion.userData.spawned_at;
            const explosionRadius = explosion.userData.radius;
            if (elapsed < 0.2) {
                explosion.scale.x += explosionRadius * 10 * delta;
                explosion.scale.y += explosionRadius * 10 * delta;
                explosion.scale.z += explosionRadius * 10 * delta;
            } else if (elapsed >= 0.2 && elapsed <= 0.5) {
                explosion.scale.x -= explosionRadius * 5 * delta;
                explosion.scale.y -= explosionRadius * 5 * delta;
                explosion.scale.z -= explosionRadius * 5 * delta;
            } else if (elapsed > 0.5) {
                removingExplosions.push(explosion);
            }
            // console.log({ explosion, elapsed });
        }
        removingExplosions.forEach((ex) => {
            explosions.delete(ex.userData.projectile_id);
            scene.remove(ex);
        });

        // METEORS
        for (const [meteorId, meteor] of meteors.entries()) {
            if (meteor.destination.distanceTo(meteor.model.position) < 0.6) {
                meteor.explode();
                scene.remove(meteor.model);
                meteors.delete(meteorId);
            }

            meteor.tick(delta);
        }

        // BLIZZARDS
        for (const [, blizzard] of blizzards.entries()) {
            if (blizzard.timeSinceSpawn > BLIZZARD_EFFECT_DURATION) {
                blizzard.finish();
            }

            for (const e of enemies) {
                const distance = e.model.position.distanceTo(blizzard.initialPos);
                if (distance < blizzard.radius) {
                    e.setSlowed();
                }
            }

            blizzard.tick(delta);
        }

        // WAVE SPAWNING
        const spawningEnemyIdx = currWave.findIndex((e) => e.spawnAt < activeGameTime);
        if (spawningEnemyIdx > -1) {
            const [spawningEnemy] = currWave.splice(spawningEnemyIdx, 1);
            spawnEnemy(spawningEnemy.enemyType, spawningEnemy.pathIdx);
        }
    }

    if (gameState === GameState.Active || gameState === GameState.Idle || gameState === GameState.Paused) {
        // NUMS
        for (const [id, num3D] of nums.entries()) {
            num3D.position.y += 1 * delta;

            if (totalGameTime - num3D.userData.spawned_at > 2) {
                num3D.userData.container_el.remove();
                scene.remove(num3D);
                nums.delete(id);
            }
        }
    }

    frameId = requestAnimationFrame(animate);
}

/****************************************/
/************** DOM EVENTS **************/
/****************************************/

function onPointerMove(e: PointerEvent) {
    const mousePos = new THREE.Vector2();
    mousePos.x = (e.clientX / canvasWidth) * 2 - 1;
    mousePos.y = -(e.clientY / canvasHeight) * 2 + 1;

    mouseRay.setFromCamera(mousePos, camera);

    // if (readyToFireMeteor || readyToFireBlizzard) {
    //     if (!mouseTargetRing.visible) mouseTargetRing.visible = true;

    //     const pos = mousePosToWorldPos(mouseRay, scene);
    //     mouseTargetRing.position.set(pos.x, pos.y, pos.z);

    //     // make targeting ring disappear if mouse is outside map
    //     if (pos.x === 0 && pos.y === 0 && pos.z === 0) {
    //         mouseTargetRing.visible = false;
    //     }
    // }
    // else {
    //     handleHoverEfx();
    // }

    if (e.buttons === 1) {
        handleCameraMovement(e);
    } else {
        // console.log("no drag", e.buttons);
    }
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
    outlinePass.selectedObjects = [];

    /******* TOWER BUILD *******/
    if (evTarget.classList.contains("tower-build-btn")) {
        towerToBuild = evTarget.id.split("-")[0] as TowerType;
        modalEl.innerHTML = modalTemplates.confirmTowerBuild(towerToBuild);

        const t = new Tower(towerToBuild!, el.position, modal3D.userData["tile_idx"]);
        towerPreview = { model: t.model, rangeGizmo: t.rangeGizmo };
        console.log("draw tower preview", towerPreview);
        scene.add(towerPreview.model);
        scene.add(towerPreview.rangeGizmo);
    }
    if (evTarget.classList.contains("cancel-tower-build-btn")) {
        modalEl.innerHTML = modalTemplates.towerBuild();
        towerToBuild = null;
        clearTowerPreview();
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

        clearTowerPreview();
        playerStats.spendGold(towerPrice);

        const tower = new Tower(towerToBuild!, el.position, modal3D.userData["tile_idx"]);

        el.userData["tower"] = towerToBuild;
        el.userData["tower_id"] = tower.id;
        modal3D.userData["tower"] = towerToBuild;
        modal3D.userData["tower_id"] = tower.id;

        // console.log("open details modal", { tower });
        modalEl.dataset["tower_id"] = tower.id;
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
        modal3D.visible = false;

        towers.push(tower);
        scene.add(tower.model);
        scene.add(tower.rangeGizmo);
        tower.rangeGizmo.visible = false;

        towerToBuild = null;
    }

    /******* TOWER SELL *******/
    if (evTarget.id === "tower-sell-btn") {
        modalEl.innerHTML = modalTemplates.confirmTowerSell(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-sell-btn")) {
        console.log("open details modal", { tower });
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

    /******* TOWER INFO *******/
    if (evTarget.id === "tower-info-btn") {
        // console.log("INFO", { el });
        modalEl.innerHTML = modalTemplates.towerInfo(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-info-btn")) {
        console.log("open details modal", { tower });
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
    }

    /******* TOWER UPGRADE *******/
    if (evTarget.id === "tower-upgrade-btn") {
        // console.log("UPGRADE", { el });
        modalEl.innerHTML = modalTemplates.confirmTowerUpgrade(tower!);

        if (tower) {
            const { model, rangeGizmo } = tower.getUpgradedPreview();
            towerPreview = { model, rangeGizmo };
            console.log("draw tower preview");
            scene.add(towerPreview.model);
            scene.add(towerPreview.rangeGizmo);
            tower.model.visible = false;
            tower.rangeGizmo.visible = false;
        }
    }
    if (evTarget.classList.contains("cancel-tower-upgrade-btn")) {
        // console.log("open details modal", { tower });
        modalEl.innerHTML = modalTemplates.towerDetails(tower!);
        clearTowerPreview();

        if (tower) {
            tower.model.visible = true;
        }
    }
    if (evTarget.id === "confirm-tower-upgrade-btn") {
        const tower = towers.find((t) => t.id === tower_id);

        // const towerIdx = towers.findIndex((t) => t.id === tower_id);
        // console.log("tower upgrade", { e, el, modal3D, modalEl, tower_id, tower });
        // if (towerIdx >= 0)
        if (tower) {
            const t2 = TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level];

            if (playerStats.gold < t2.price) {
                console.warn("not enough money");
                const msgArea = document.querySelector(".warning-msg-area")!;
                msgArea.innerHTML = "not enough money!";
                return;
            }
            playerStats.spendGold(t2.price);

            clearTowerPreview();

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
    mousePos.x = (e.clientX / canvasWidth) * 2 - 1;
    mousePos.y = -(e.clientY / canvasHeight) * 2 + 1;
    mouseRay.setFromCamera(mousePos, camera);

    const pos = mousePosToWorldPos(mouseRay, scene);
    console.log([pos.x, pos.y, pos.z]);

    let clickedTower: THREE.Intersection | undefined;
    let clickedTowerBase: THREE.Intersection | undefined;
    const rayIntersects = mouseRay.intersectObjects(scene.children);
    console.log(rayIntersects);
    rayIntersects.forEach((ch) => {
        if (ch.object.name.includes("TowerBase")) {
            clickedTowerBase = ch;
            console.log(ch.object.position);
        }
        if (ch.object.name.includes("_Tower")) {
            clickedTower = ch;
        }
    });

    revertCancelableModals();
    closedAllOpenModels();
    clearTowerPreview();

    outlinePass.selectedObjects = [];
    switch (true) {
        case readyToFireMeteor: {
            if (rayIntersects.length < 1) {
                console.log("cancel meteor");
                clearMeteorTargeting();
                return;
            }

            const pos = mousePosToWorldPos(mouseRay, scene);
            meteorTargetPos = new THREE.Vector3(pos.x, pos.y, pos.z);
            window.dispatchEvent(new CustomEvent("meteor-fire"));
            return;
        }
        case readyToFireBlizzard: {
            if (rayIntersects.length < 1) {
                console.log("cancel blizzard");
                clearBlizzardTargeting();
                return;
            }

            const pos = mousePosToWorldPos(mouseRay, scene);
            blizzardTargetPos = new THREE.Vector3(pos.x, pos.y, pos.z);
            console.log("will dispatch blizzard-fire", { pos, blizzardTargetPos });
            window.dispatchEvent(new CustomEvent("blizzard-fire"));
            return;
        }
        case Boolean(clickedTower): {
            if (!clickedTower) return;
            const tower = towers.find((t) => t.id === clickedTower!.object.userData.tower_id);
            console.log("CLICKED TOWER", { clickedTower, tower, scene });

            // tower!.rangeGizmo.visible = true;
            outlinePass.selectedObjects.push(clickedTower.object.parent as THREE.Mesh);

            scene.traverse((obj) => {
                if ((obj as any).isCSS2DObject) {
                    if (obj.userData.tile_idx === clickedTower!.object.userData.tile_idx) {
                        // modal
                        obj.visible = true;
                    }
                }
            });
            return;
        }
        case Boolean(clickedTowerBase): {
            if (!clickedTowerBase) return;
            console.log("CLICKED TOWER BASE", { clickedTowerBase, scene });
            const modal3D = scene.getObjectByName(`${clickedTowerBase.object.name}-modal`)!;
            modal3D.visible = true;
            outlinePass.selectedObjects.push(clickedTowerBase.object);
            return;
        }
        default: {
            console.log("CLICKED NOWHERE!");
            return;
        }
    }
}

function onResize() {
    canvasHeight = window.innerHeight;
    canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
    cssRenderer.setSize(canvasWidth, canvasHeight);
}

function onZoom(e: WheelEvent) {
    // console.log(e, e.deltaX, e.deltaY, e.deltaZ);
    if ((e.deltaY > 0 && camera.fov < MAX_FOV) || (e.deltaY < 0 && camera.fov > MIN_FOV)) {
        camera.fov += e.deltaY * 0.02;
    }
    camera.updateProjectionMatrix();
    enemies.forEach((e) => {
        e.updateHpBarLengthToMatchZoom(camera.fov);
    });
}

function onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
        mobileScaling = true;
    }
}
function onTouchMove(e: TouchEvent) {
    if (mobileScaling) {
        onMobileZoom(e);
    }
}
function onTouchEnd() {
    if (mobileScaling) {
        mobileScaling = false;
    }
}

function onMobileZoom(e: any) {
    prevPinchDist = pinchDist;
    pinchDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
    const diff = pinchDist - prevPinchDist;
    const discard = diff > 40 || diff < -40;
    // console.log("onMobileZoom", pinchDist, prevPinchDist, diff, discard, e);

    if (discard) return;

    if ((diff > 0 && camera.fov > MIN_FOV) || (diff < 0 && camera.fov < MAX_FOV)) {
        camera.fov -= diff * 0.15;
    }

    if (camera.fov < 20) camera.fov = 20;
    if (camera.fov > 80) camera.fov = 80;

    camera.updateProjectionMatrix();
    enemies.forEach((e) => {
        e.updateHpBarLengthToMatchZoom(camera.fov);
    });
}

function onVisibilityChange() {
    if (document.visibilityState === "visible") {
        // backgroundMusic.play();
    } else {
        onPauseGame();
        // backgroundMusic.pause();
    }
}

/****************************************/
/************** GAME EVENTS *************/
/****************************************/

function onPauseGame() {
    console.log("onPauseGame", callWaveBeaconContainers);

    pauseScreen.classList.remove("hidden");

    if (gameState === GameState.Active) {
        gameState = GameState.Paused;
    }

    callWaveBeaconContainers.forEach((container) => {
        container.style.opacity = "0";
    });

    // const openedModal = document.querySelector(".modal-content");

    // hide modal on pause
    scene.traverse((obj) => {
        if (isModal(obj)) {
            obj.visible = false;
            revertCancelableModals();
        }
    });
}

function onResumeGame() {
    console.log("onResumeGame", callWaveBeaconContainers);

    if (gameState === GameState.Paused) {
        gameState = GameState.Active;
    }
    pauseScreen.classList.add("hidden");

    callWaveBeaconContainers.forEach((container) => {
        container.style.opacity = "1";
    });

    if (towerPreview) {
        console.log("remove tower preview");
        scene.remove(towerPreview.model);
        scene.remove(towerPreview.rangeGizmo);
    }

    scene.traverse((obj) => {
        // paused with confirmUpgrade modal open? line below will ensure the tower mesh gets back to its original state on resume
        if ((obj as any).isMesh && obj.name.includes("_Tower") && !obj.visible) {
            obj.visible = true;
        }
    });
}

function onEndGameConfirm() {
    location.assign("#/area-selection");
    endGameBtn.removeEventListener("click", onEndGameConfirm);
}

function onGameSpeedChange(e: MouseEvent) {
    const elTarget = e.target as HTMLElement;
    // e.preventDefault();
    if (elTarget.tagName === "INPUT") {
        const speedStr = elTarget.id.split("-")[1];
        const speed = Number(speedStr[0]);
        gameSpeed = speed as GameSpeed;
        console.log("onGameSpeedChange", { gameSpeed });
    }
}

function handleCameraMovement(e: PointerEvent) {
    if (mobileScaling) return; // block camera movement while zooming
    if (
        (e.movementX > 0 && camera.position.x > levelData.cameraBounds.left) ||
        (e.movementX < 0 && camera.position.x < levelData.cameraBounds.right)
    ) {
        camera.position.x -= e.movementX * 0.2;
    }

    if (
        (e.movementY > 0 && camera.position.z > levelData.cameraBounds.top) ||
        (e.movementY < 0 && camera.position.z < levelData.cameraBounds.bottom)
    ) {
        camera.position.z -= e.movementY * 0.2;
    }

    // console.log("isDragging", e.buttons, e.movementX, e.movementY);

    const camTarget = new THREE.Vector3(camera.position.x, camera.position.y - 40, camera.position.z - 50);
    camera.lookAt(camTarget);
}

function revertCancelableModals() {
    const allModals = Array.from(document.querySelectorAll<HTMLDivElement>(".modal2D"));
    // console.log("REVERT CANCELABLE MODALS");
    allModals.forEach((modalEl) => {
        // if (modalEl === clickedModal) return;
        // console.log(":::", { modalEl, tower_id: modalEl.dataset["tower_id"] });

        for (const cancelableModalName of cancelableModalNames) {
            if (modalEl.children[0].classList.contains(cancelableModalName)) {
                if (cancelableModalName === ModalType.ConfirmTowerBuild) {
                    modalEl.innerHTML = modalTemplates.towerBuild();
                } else {
                    const tower = towers.find((t) => t.id === modalEl.dataset["tower_id"]);
                    if (tower) {
                        modalEl.innerHTML = modalTemplates.towerDetails(tower);

                        if (!tower.model.visible) {
                            tower.model.visible = true;
                        }
                    }
                }
            }
        }
    });
}

function closedAllOpenModels() {
    console.log("closedAllOpenModels");
    scene.traverse((obj) => {
        if (isModal(obj)) {
            obj.visible = false;
        }
    });
}

/****************************************/
/************* GAME OBJECTS *************/
/****************************************/

function onProjectile(e: any) {
    const projectile = e.detail as Projectile;
    projectiles.set(projectile.id, projectile);
    scene.add(projectile.model);

    if (DRAW_FUTURE_GIZMO) {
        const futureGizmo = new THREE.Mesh(new THREE.SphereGeometry(0.35), MATERIALS.projectileGizmo);
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
    // console.log(projectile.type);
    const futureGizmo = futureGizmos.get(projectile.id)!;
    const targetEnemy = enemies.find((e) => e.id === projectile.targetEnemyId);

    const explosion = projectile.explosion as THREE.Mesh;
    explosion.userData["projectile_id"] = projectile.id;
    explosion.userData["spawned_at"] = totalGameTime;
    explosion.userData["radius"] = projectile.blueprint.explosionRadius;

    const pos = new THREE.Vector3(
        projectile.model.position.x,
        projectile.model.position.y,
        projectile.model.position.z
    );
    explosion.position.set(pos.x, pos.y, pos.z);

    if (targetEnemy && targetEnemy.hp > 0) {
        if (projectile.type === TowerType.Cannon) {
            applyAreaDamage(enemies, pos, explosion.userData.radius * 4.5, projectile.damage);
        } else {
            if (projectile.type === TowerType.Poison) {
                const poison = new PoisonEntry(targetEnemy.id);
                if (!targetEnemy.isPoisoned) {
                    targetEnemy.setPoisoned();
                }

                if (poisonEntries.has(poison.enemyId)) {
                    poison.cooldown = poisonEntries.get(poison.enemyId)!.cooldown;
                    poisonEntries.set(poison.enemyId, poison);
                } else {
                    poisonEntries.set(poison.enemyId, poison);
                }
            }

            targetEnemy.takeDamage(projectile.damage);
        }
    }

    futureGizmos.delete(projectile.id);
    projectiles.delete(projectile.id);
    scene.remove(projectile.model);
    scene.remove(futureGizmo);

    explosions.set(projectile.id, explosion);
    scene.add(explosion);
    // console.log("onProjectileExplode", { poisonEntries });
}

function spawnEnemy(enemyType: EnemyType, pathIdx = 0) {
    // console.log("spawnEnemy", { enemyType, currWave });
    const enemy = new Enemy(enemyType, pathIdx, camera.fov);
    enemies.push(enemy);
    scene.add(enemy.model);
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
        // console.log("enemy killed");
        playerStats.gainGold(enemy.bluePrint.reward);

        if (enemy.isPoisoned) {
            poisonEntries.delete(enemy.id);
        }

        // DRAW GOLD GAIN EFX
        const numContainer = document.createElement("div");
        const numEl = document.createElement("div");
        const num3D = new CSS2DObject(numContainer);

        numContainer.className = "num-container";
        num3D.name = "num";
        num3D.userData["id"] = idMaker();
        num3D.userData["spawned_at"] = totalGameTime;
        num3D.userData["container_el"] = numContainer;
        num3D.position.set(enemy.model.position.x, enemy.model.position.y, enemy.model.position.z);

        scene.add(num3D);
        numContainer.append(numEl);
        numEl.innerHTML = `+${enemy.bluePrint.reward} <small>🟡</small>`;

        nums.set(num3D.userData["id"], num3D);
    }

    enemies = enemies.filter((e) => e.id !== enemy.id);
    console.log("remove enemy from scene", enemy);
    scene.remove(enemy.model);

    if (enemies.length === 0 && !gameLost) {
        console.log("wave ended");
        gameState = GameState.Idle;
        currWaveIdx++;
        activeGameTime = 0;
        (speedBtns.children[1] as HTMLInputElement).checked = true;
        gameSpeed = 1;

        const waveCount = STAGE_WAVES_DATA[levelIdx].length;
        if (currWaveIdx < waveCount) {
            drawWaveCallBeacon();
        }
        if (currWaveIdx === waveCount) {
            console.log("GAME END ... WIN!");
            const stars = calcEarnedStarsForGameWin(playerStats.hp);
            endGameScreen.innerHTML = gameEndTemplates.gameWin(stars);
            endGameScreen.classList.remove("hidden");
            window.dispatchEvent(new CustomEvent("game-win", { detail: stars }));

            endGameBtn = document.querySelector("#confirm-end-game-btn") as HTMLButtonElement;
            endGameBtn.addEventListener("click", onEndGameConfirm);
        }

        // pauseGameBtn.innerHTML = `Start Wave ${currWaveIdx + 1}`;
    }
}

/****************************************/
/*************** SPECIALS ***************/
/****************************************/

function onMeteorBtnClick() {
    if (gameState === GameState.Active && meteorBtn.classList.contains("cancel-action")) {
        console.log("onMeteorBtnClick! cancel meteor");
        clearMeteorTargeting();
    } else if (gameState === GameState.Active && playerStats.readyToMeteor()) {
        console.log("onMeteorBtnClick! meteor targeting on");

        document.body.style.cursor = "crosshair";
        readyToFireMeteor = true;
        meteorBtn.classList.add("cancel-action");

        if (readyToFireBlizzard) {
            readyToFireBlizzard = false;
            blizzardBtn.classList.remove("cancel-action");
        }
    } else {
        console.log("meteor target not ready!");
    }
}
function onBlizzardBtnClick() {
    if (gameState === GameState.Active && blizzardBtn.classList.contains("cancel-action")) {
        console.log("onBlizzardBtnClick! cancel blizzard");
        clearBlizzardTargeting();
    } else if (gameState === GameState.Active && playerStats.readyToBlizzard()) {
        console.log("onBlizzardBtnClick! blizzard targeting on");

        document.body.style.cursor = "crosshair";
        readyToFireBlizzard = true;
        blizzardBtn.classList.add("cancel-action");

        if (readyToFireMeteor) {
            readyToFireMeteor = false;
            meteorBtn.classList.remove("cancel-action");
        }
    } else {
        console.log("blizzard target not ready!");
    }
}

function onMeteorFire() {
    playerStats.fireMeteor();

    clearMeteorTargeting();

    const meteorCount = 6;

    for (let i = 0; i < meteorCount; i++) {
        const destination = new THREE.Vector3(
            THREE.MathUtils.lerp(meteorTargetPos.x - 2.5, meteorTargetPos.x + 2.5, Math.random()),
            meteorTargetPos.y,
            THREE.MathUtils.lerp(meteorTargetPos.z - 2.5, meteorTargetPos.z + 2.5, Math.random())
        );

        setTimeout(() => {
            const meteor = new Meteor(destination);
            meteors.set(meteor.id, meteor);
            scene.add(meteor.model);

            if (DRAW_METEOR_GIZMOS) {
                const meteorGizmo = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.5, 0.5, 0.25),
                    MATERIALS.transparentBlack
                );
                meteorGizmo.position.set(destination.x, destination.y + 0.25, destination.z);
                scene.add(meteorGizmo);

                setTimeout(() => {
                    scene.remove(meteorGizmo);
                }, meteor.timeToTarget * 1000);
            }
        }, i * 220);
    }
}
function onBlizzardFire() {
    playerStats.fireBlizzard();

    clearBlizzardTargeting();

    const position = new THREE.Vector3(blizzardTargetPos.x, blizzardTargetPos.y, blizzardTargetPos.z);
    console.log("fire Blizzard", position);

    const blizzard = new Blizzard(position);
    blizzards.set(blizzard.id, blizzard);
    scene.add(blizzard.model);
}

function clearMeteorTargeting() {
    readyToFireMeteor = false;
    document.body.style.cursor = "default";
    // mouseTargetRing.visible = false;
    if (meteorBtn.classList.contains("cancel-action")) {
        meteorBtn.classList.remove("cancel-action");
    }
}
function clearBlizzardTargeting() {
    readyToFireBlizzard = false;
    document.body.style.cursor = "default";
    // mouseTargetRing.visible = false;
    if (blizzardBtn.classList.contains("cancel-action")) {
        blizzardBtn.classList.remove("cancel-action");
    }
}

function onMeteorExplode(e: any) {
    const meteor = e.detail as Meteor;
    // console.log("onMeteorExplode", meteor.timeToTarget);

    const explosion = meteor.explosion as THREE.Mesh;
    const pos = new THREE.Vector3(meteor.model.position.x, meteor.model.position.y, meteor.model.position.z);
    explosion.userData["meteor_id"] = meteor.id;
    explosion.userData["spawned_at"] = totalGameTime;
    explosion.userData["radius"] = 10;
    explosion.position.set(pos.x, pos.y, pos.z);
    explosions.set(meteor.id, explosion);
    scene.add(explosion);
    applyAreaDamage(enemies, pos, explosion.userData.radius * 0.4, determineDamage([50, 200]));
}
function onBlizzardFinish(e: any) {
    const blizzard = e.detail as Blizzard;
    console.log("onBlizzardFinish", blizzard);
    scene.remove(blizzard.model);
    blizzards.delete(blizzard.id);
}
/****************************************/
/*************** STATUSES ***************/
/****************************************/

function onPoisonEntryDamage(e: any) {
    const poison = e.detail as PoisonEntry;
    const enemy = enemies.find((e) => e.id === poison.enemyId);
    if (enemy) {
        enemy.takeDamage(4);
    }
    // console.log("onPoisonEntryDamage", { poisonEntries, poison, enemy });
}

function onPoisonEntryExpired(e: any) {
    const poison = e.detail as PoisonEntry;
    const enemy = enemies.find((e) => e.id === poison.enemyId);
    if (enemy) {
        enemy.healPoison();
    }
    // console.log("onPoisonEntryExpired", { poisonEntries, poison, enemy });
    poisonEntries.delete(poison.enemyId);
}

export function clearTowerPreview() {
    if (towerPreview) {
        console.log("revert tower preview", { towerPreview });
        scene.remove(towerPreview.model);
        scene.remove(towerPreview.rangeGizmo);
        towerPreview = undefined;
    }
}

// let prevHighlightedMeshUUID: string | null = null;
// function handleHoverEfx() {
//     const rayIntersects = mouseRay.intersectObjects(scene.children);
//     let foundHighlightTarget = false;
//     for (const ch of rayIntersects) {
//         const obj = ch.object as THREE.Mesh;
//         if (
//             obj.isMesh &&
//             obj.type !== "SkinnedMesh" &&
//             (obj.name.includes("-Tower") || obj.name.includes("TowerBase"))
//         ) {
//             const oldMeshIdx = outlinePass.selectedObjects.findIndex((o) => o.uuid === prevHighlightedMeshUUID);
//             // outlinePass.visibleEdgeColor = new THREE.Color(0xffffff * Math.random());
//             prevHighlightedMeshUUID = obj.uuid;
//             foundHighlightTarget = true;
//             outlinePass.selectedObjects.splice(oldMeshIdx, 1);
//             outlinePass.selectedObjects.push(obj);
//             break;
//         }
//     }

//     if (!foundHighlightTarget) {
//         if (prevHighlightedMeshUUID) {
//             const oldMeshIdx = outlinePass.selectedObjects.findIndex(
//                 (o) => o.type !== "SkinnedMesh" && o.uuid === prevHighlightedMeshUUID
//             );

//             if (oldMeshIdx > -1) {
//                 outlinePass.selectedObjects.splice(oldMeshIdx, 1);
//             }
//         }
//         prevHighlightedMeshUUID = null;
//     }
// }

// fontLoader.load("/assets/fonts/font.json", (font) => {
//     console.log({ font });
//     const geometry = new TextGeometry("Hello three.js!", {
//         font: font,
//         size: 4,
//         height: 2,
//         curveSegments: 12,
//     });

//     const textMesh = new THREE.Mesh(geometry, MATERIALS.beacon);
//     scene.add(textMesh);
// });
