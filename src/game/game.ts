/* eslint-disable @typescript-eslint/no-explicit-any */
import { THREE } from "../three";
import { GUI } from "dat.gui";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/examples/jsm/Addons.js";
// import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { LEVEL_OBJECTS } from "../constants/levels/objects";
import { ENEMY_BLUEPRINTS } from "../constants/enemies";
import { TOWER_BLUEPRINTS, printTowersStats } from "../constants/towers-and-projectiles";
import { GAME_SKILLS } from "../constants/skills";
import { StraightProjectile } from "./Projectile";
import {
    COLORS,
    DEFAULT_METEOR_COUNT,
    DEFAULT_METEOR_DAMAGE,
    DRAW_FUTURE_GIZMO,
    DRAW_METEOR_GIZMOS,
    DRAW_PROJECTILE_TRAJECTORIES,
    MATERIALS,
    MAX_FOV,
    MIN_FOV,
    BLIZZARD_ANIMATION_DURATION,
    DEFAULT_POISON_DURATION,
    DEFAULT_CANNON_SLOW_DURATION,
    WIZARD_RICOCHET_RANGE,
    RICOCHET_IDEAL_DISTANCE,
    DRAW_AND_COMPUTE_OFFSET_PATHS,
    USE_ORBIT_CONTROLS,
    DRAW_PATH_LANES,
    SELL_PRICE_MULTIPLIER,
    PRINT_WAVE_STATISTICS,
    PRINT_TOWERS_STATISTICS,
} from "../constants/general";
import {
    applyAreaDamage,
    calcEarnedStarsForGameWin,
    determineDamage,
    mousePosToWorldPos,
    getEnemyTypeFromChar,
    getProjectileTowerName,
    handleModelGun,
    idMaker,
    isModal,
} from "../shared/helpers";

import {
    AppLayers,
    EnemyChar,
    EnemyType,
    GameState,
    ModalType,
    SkillPath,
    TargetingStrategy,
    TowerType,
} from "../shared/enums";
import {
    EnemyBluePrint,
    Projectile,
    WaveEnemyObj,
    GameInitProps,
    GameSpeed,
    GameLevel,
    Skill,
    LaneChar,
    JSONPath,
} from "../shared/types";
import { beaconTemplate, cancelableModalNames, gameEndTemplates, modalTemplates, speedBtnsTemplate } from "./templates";
import { PlayerStats } from "./PlayerStats";
import { Tower } from "./Tower";
import { Enemy } from "./Enemy";
import { Meteor } from "./Meteor";
import { Blizzard } from "./Blizzard";
import { PoisonEntry } from "./PoisonEntry";
import { SoundManager } from "./SoundManager";
import { printWavesStatistics } from "../constants/levels/waves";

// let pathPoints: THREE.Vector3[] = [];

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

export const ENEMY_MODELS = {} as { [k in EnemyType]: GLTF };
export const TOWER_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Group } };
export const PROJECTILE_MODELS = {} as { [k in TowerType]: { [k: `level-${number}`]: THREE.Mesh } };

let gltfLoader: GLTFLoader;
// let fbxLoader: FBXLoader;
// let fontLoader: FontLoader;

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let cssRenderer: CSS2DRenderer;
let camera: THREE.PerspectiveCamera;
let orbit: OrbitControls;
export let soundManager: SoundManager;

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

export let allPathCurves: {
    center: THREE.CatmullRomCurve3[];
    left: THREE.CatmullRomCurve3[];
    right: THREE.CatmullRomCurve3[];
} = {
    center: [],
    left: [],
    right: [],
};
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
// let soundBtn: HTMLButtonElement;
// let musicBtn: HTMLButtonElement;
let callWaveBeaconContainers: HTMLDivElement[] = [];

let composer: EffectComposer;
export let slowOutlinePass: OutlinePass;
export let poisonOutlinePass: OutlinePass;
let outlinePass: OutlinePass;
let effectFXAA: ShaderPass;

let frameId = 0;
let clickTimestamp = 0;
let towerTypeToBuild: TowerType | null = null;

let levelIdx: number;
let currWave: WaveEnemyObj[] = [];
let currWaveIdx = 0;
let gameLost = false;

let gameStateBeforePause = GameState.Idle;

let readyToFireMeteor = false;
let meteorTargetPos = new THREE.Vector3();

let readyToFireBlizzard = false;
let blizzardTargetPos = new THREE.Vector3();
// let mouseTargetRing: THREE.Mesh;
let mobileScaling = false;
let prevPinchDist = 0;
let pinchDist = 0;

export async function destroyGame() {
    // console.log("destroy", { scene });
    gameState = GameState.Idle;
    currWaveIdx = 0;
    levelIdx = 0;
    frameId = 0;
    gui?.destroy();
    gameClock.stop();
    scene.clear();
    camera.clear();
    composer.dispose();
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
    if (USE_ORBIT_CONTROLS) orbit.dispose();
    // playerStats.destroy();
    currWave = [];
    allPathCurves = {
        center: [],
        left: [],
        right: [],
    };
    callWaveBeaconContainers = [];

    cancelAnimationFrame(frameId);

    window.removeEventListener("projectile", onProjectile);
    window.removeEventListener("projectile-explode", onProjectileExplode);
    window.removeEventListener("meteor-explode", onMeteorExplode);
    window.removeEventListener("meteor-fire", onMeteorFire);
    window.removeEventListener("blizzard-fire", onBlizzardFire);
    window.removeEventListener("blizzard-finish", onBlizzardFinish);
    window.removeEventListener("enemy-destroyed", onEnemyDestroyed);
    window.removeEventListener("poison-entry-expired", onPoisonEntryExpired);
    window.removeEventListener("poison-entry-damage", onPoisonEntryDamage);
    window.removeEventListener("sound-settings-change", onSoundSettingsChange);

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

    // soundBtn.removeEventListener('click',onSoundBtnClick);
    // musicBtn.removeEventListener('click',onMusicBtnClick);
    // location.reload();
}

export async function initGame({ level, hp, skills }: GameInitProps) {
    levelIdx = level;

    const { GAME_LEVELS } = await import("../constants/levels/levels");

    levelData = GAME_LEVELS[levelIdx];

    const playerSkills: { [k in SkillPath]: Skill[] } = {
        archer: [],
        ballista: [],
        cannon: [],
        poison: [],
        wizard: [],
        blizzard: [],
        meteor: [],
    };

    for (const skillId of Object.keys(skills)) {
        const skillPath = skillId.split("-")[0] as SkillPath;
        const skill = GAME_SKILLS[skillPath].find((s) => s.id === skillId);
        if (skill) {
            playerSkills[skillPath].push(skill);
        }
    }

    console.log("initGame", { skills, levelData, playerSkills });

    playerStats = new PlayerStats({ hp, gold: levelData.initialGold, skills: playerSkills });

    await gameSetup();
    _wireUpLoadingManager();
    await drawMap();
    await drawPaths();
    drawWaveCallBeacon();
    _init2DModals();
    await _initEnemyModels();
    await _initTowerModels();

    window.addEventListener("projectile", onProjectile);
    window.addEventListener("projectile-explode", onProjectileExplode);
    window.addEventListener("meteor-explode", onMeteorExplode);
    window.addEventListener("meteor-fire", onMeteorFire);
    window.addEventListener("blizzard-fire", onBlizzardFire);
    window.addEventListener("blizzard-finish", onBlizzardFinish);
    window.addEventListener("enemy-destroyed", onEnemyDestroyed);
    window.addEventListener("poison-entry-expired", onPoisonEntryExpired);
    window.addEventListener("poison-entry-damage", onPoisonEntryDamage);
    window.addEventListener("sound-settings-change", onSoundSettingsChange);

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

    // soundBtn.addEventListener('click',onSoundBtnClick);
    // musicBtn.addEventListener('click',onMusicBtnClick);

    if (PRINT_WAVE_STATISTICS) {
        printWavesStatistics(allPathCurves.center, ENEMY_BLUEPRINTS);
    }
    if (PRINT_TOWERS_STATISTICS) {
        printTowersStats();
    }

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

    // fbxLoader = new FBXLoader(loadingManager);
    // fontLoader = new FontLoader(loadingManager);
    gltfLoader = new GLTFLoader(loadingManager);
    gameClock = new THREE.Clock();
    activeGameTime = 0;
    totalGameTime = 0;

    soundManager = new SoundManager();

    camera = new THREE.PerspectiveCamera(45, canvasWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = levelData.initialCamPos[0];
    camera.position.y = levelData.initialCamPos[1];
    camera.position.z = levelData.initialCamPos[2];
    camera.layers.enableAll();
    scene = new THREE.Scene();
    const camTarget = new THREE.Vector3(camera.position.x, camera.position.y - 40, camera.position.z - 50);
    camera.lookAt(camTarget);

    if (USE_ORBIT_CONTROLS) {
        orbit = new OrbitControls(camera, renderer.domElement);
        orbit.maxPolarAngle = Math.PI * 0.48;
    }

    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(60, 100, -60);
    scene.add(ambientLight);
    scene.add(directionalLight);

    mouseRay = new THREE.Raycaster();
    mouseRay.layers.disableAll();
    mouseRay.layers.enable(AppLayers.Terrain);
    mouseRay.layers.enable(AppLayers.TowerBase);
    mouseRay.layers.enable(AppLayers.Tower);
    mouseRay.layers.enable(AppLayers.Modals);
    mouseRay.layers.enable(AppLayers.Buildings);

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

async function drawMap() {
    levelData.ground.forEach((plane) => {
        const [x, y, z] = plane;
        const groundGeometry = new THREE.BoxGeometry(x, y, z);
        const ground = new THREE.Mesh(groundGeometry, MATERIALS[levelData.area]);
        ground.layers.set(AppLayers.Terrain);
        scene.add(ground);
    });

    levelData.towerBasePositions.forEach((pos, i) => {
        const towerBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.2), MATERIALS.concrete);
        towerBaseMesh.position.set(pos[0], pos[1], pos[2]);
        towerBaseMesh.name = `TowerBase.${i}`;
        towerBaseMesh.userData.idx = i;
        towerBaseMesh.layers.set(AppLayers.TowerBase);
        scene.add(towerBaseMesh);
    });

    // console.log({ LEVEL_OBJECTS, levelArea, levelData, mapObjects: LEVEL_OBJECTS[levelIdx] });

    for (const levelObj of LEVEL_OBJECTS[levelIdx]) {
        const { scene: object } = await gltfLoader.loadAsync(levelObj.url);

        levelObj.instances.forEach((d) => {
            const clone = object.clone();
            clone.name = levelObj.name;
            clone.position.set(d.position[0], d.position[1], d.position[2]);
            clone.setRotationFromEuler(new THREE.Euler(d.rotation[0], d.rotation[1], d.rotation[2]));
            clone.scale.set(d.scale[0], d.scale[1], d.scale[2]);

            if (clone.name.includes("desert")) {
                clone.traverse((obj) => {
                    if ((obj as any).isMesh) {
                        const mesh = obj as THREE.Mesh;
                        mesh.material = MATERIALS[levelData.area];
                        mesh.position.y -= 0.1;
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

async function drawPaths() {
    console.log("drawPaths", { levelData });

    function drawPath(path: JSONPath, shapeW: number, shapeH: number) {
        const pathPoints: THREE.Vector3[] = [];

        path.points.forEach((point) => {
            pathPoints.push(new THREE.Vector3(point.x, point.y, point.z));
        });

        const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, "catmullrom", 0.5);

        const shapePts = [
            new THREE.Vector2(-shapeH, -shapeW),
            new THREE.Vector2(shapeH, -shapeW),
            new THREE.Vector2(shapeH, shapeW),
            new THREE.Vector2(-shapeH, shapeW),
        ];
        const extrudeShape = new THREE.Shape(shapePts);
        const mainPathGeometry = new THREE.ExtrudeGeometry(extrudeShape, {
            steps: 200,
            extrudePath: pathCurve,
        });

        const pathMesh = new THREE.Mesh(mainPathGeometry, MATERIALS.darkConcrete);
        pathMesh.name = "Road";
        pathMesh.position.y = shapeH;

        return { pathCurve, pathMesh };
    }

    if (DRAW_AND_COMPUTE_OFFSET_PATHS) {
        const centerPaths: { x: number; y: number; z: number }[][] = [];
        const leftPaths: { x: number; y: number; z: number }[][] = [];
        const rightPaths: { x: number; y: number; z: number }[][] = [];

        for (const [lane, paths] of Object.entries(levelData.paths)) {
            for (const path of paths) {
                const [shapeW, shapeH] = [1, 0.035];

                const { pathCurve, pathMesh } = drawPath(path, shapeW, shapeH);

                allPathCurves[lane as keyof typeof allPathCurves].push(pathCurve);

                scene.add(pathMesh);

                const { centerPath, leftPath, rightPath } = drawAndComputeOffsetPaths(
                    shapeW,
                    shapeH,
                    pathMesh.geometry
                );
                centerPaths.push(centerPath);
                leftPaths.push(leftPath);
                rightPaths.push(rightPath);
            }
        }

        const levelPaths = {
            stage: levelData.stage,
            area: levelData.area,
            paths: {
                center: centerPaths.map((path) => ({ points: path, closed: false })),
                left: leftPaths.map((path) => ({ points: path, closed: false })),
                right: rightPaths.map((path) => ({ points: path, closed: false })),
            },
        };
        console.log({
            l1x: leftPaths[0][0].x,
            c1x: centerPaths[0][0].x,
            r1x: rightPaths[0][0].x,
            centerPaths,
            leftPaths,
            rightPaths,
            levelPaths,
        });
    } else if (DRAW_PATH_LANES) {
        for (const [lane, paths] of Object.entries(levelData.paths)) {
            for (const path of paths) {
                const { pathCurve, pathMesh } = drawPath(path, 0.05, 0.035);

                allPathCurves[lane as keyof typeof allPathCurves].push(pathCurve);

                scene.add(pathMesh);
            }
        }
    }
    // Regular game paths
    else {
        for (const [lane, paths] of Object.entries(levelData.paths)) {
            for (const path of paths) {
                const { pathCurve, pathMesh } = drawPath(path, 1.4, 0.035);

                allPathCurves[lane as keyof typeof allPathCurves].push(pathCurve);

                if (lane === "center") {
                    scene.add(pathMesh);
                }
            }
        }
    }

    allPathCurves.center.forEach((path) => {
        const start = path.points[0];
        const finish = path.points[path.points.length - 1];

        console.log(":::", { path, start, finish });
    });

    return Promise.resolve();
}

function drawWaveCallBeacon() {
    currWave = levelData.waves[currWaveIdx].map((wEnemy) => ({
        enemyType: getEnemyTypeFromChar(wEnemy[0] as EnemyChar),
        pathIdx: wEnemy[1], // prevent errors with enemyWaves with pathIdx greater than the number of paths
        spawnAt: wEnemy[2],
        lane: wEnemy[3] as LaneChar,
    }));

    const differentEnemyPaths = [...new Set(currWave.map((waveData) => waveData.pathIdx))];

    console.log("drawWaveCallBeacon", {
        allPaths: levelData.paths.center.length,
        currWave,
        differentEnemyPaths,
        levelData,
        currWaveIdx,
    });
    const beaconsPositions: THREE.Vector3[] = [];
    differentEnemyPaths.forEach((pathIdx) => {
        const pos = new THREE.Vector3(
            allPathCurves.center[pathIdx % allPathCurves.center.length].points[0].x,
            allPathCurves.center[pathIdx % allPathCurves.center.length].points[0].y,
            allPathCurves.center[pathIdx % allPathCurves.center.length].points[0].z
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

    // console.log("drawWaveCallBeacon", { allPathCurves, beaconsPositions, levelData, differentEnemyPaths });

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
            soundManager.play("crow");
            (speedBtns.children[1] as HTMLInputElement).checked = true;
            gameSpeed = 1;
            gameState = GameState.Active;
            pauseGameBtn.textContent = "⏸️";
            waveDisplay.innerHTML = `Wave ${currWaveIdx + 1}/${levelData.waves.length}`;
            callWaveBeaconContainers = [];

            const modalEls = [...document.querySelectorAll("#call-wave-modal")];
            modalEls.forEach((modalEl) => {
                modalEl.remove();
            });
        };
    });
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
    const towersGlTF = await gltfLoader.loadAsync("/assets/glb/towers/towers.gltf");

    for (const model of towersGlTF.scene.children) {
        model.userData.name = (model.userData.name as string).replace(".gltf", "");
        const modelName = model.userData.name;

        // console.log({ model, n: model.userData.name, modelName });

        const [towerName, towerLevel] = [modelName.split("_")[0] as TowerType, +modelName.split("_")[3]];
        // model.name = modelName;
        // model.userData.name = model.name;

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
    // console.log({ TOWER_MODELS });

    const projectilesGlTF = await gltfLoader.loadAsync("/assets/glb/projectiles/projectiles.gltf");

    // console.log({ projectilesGlTF });

    // const projectilesFbx = await fbxLoader.loadAsync("/assets/fbx/projectiles-no-texture.fbx");
    // towerTexture = await new THREE.TextureLoader().loadAsync("/assets/fbx/towers-texture.png");

    for (const model of projectilesGlTF.scene.children[0].children as THREE.Mesh[]) {
        const towerName = getProjectileTowerName(model.name);
        // console.log({ model, n: model.name, towerName });

        if (!(towerName in PROJECTILE_MODELS)) {
            PROJECTILE_MODELS[towerName] = {};
        }

        if (towerName === TowerType.Archer) {
            const level = model.name.split("_")[3];

            PROJECTILE_MODELS[towerName][`level-${+level}`] = model;

            if (+level === 2) {
                // there's no lvl_3
                PROJECTILE_MODELS[towerName]["level-3"] = model;
            }
        } else {
            PROJECTILE_MODELS[towerName]["level-1"] = model;
            PROJECTILE_MODELS[towerName]["level-2"] = model;
            PROJECTILE_MODELS[towerName]["level-3"] = model;
            PROJECTILE_MODELS[towerName]["level-4"] = model;
        }
    }

    // console.log({ PROJECTILE_MODELS });
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
            modalEl.innerHTML = modalTemplates.towerBuild(playerStats.skills);

            modalEl.addEventListener("click", (e) => onModalClick(e, el, modal3D, modalEl));
        }
    });
}

function animate() {
    const delta = gameClock.getDelta() * gameSpeed;
    totalGameTime += delta;

    // const elapsed = gameClock.getElapsedTime();

    cssRenderer.render(scene, camera);
    renderer.render(scene, camera);
    composer.render(delta);

    if (USE_ORBIT_CONTROLS) orbit.update();

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
                // console.log(enemy.slowedBy, enemy.timeSinceSlowed, enemy.slowDuration);
                if (enemy.timeSinceSlowed > enemy.slowDuration) {
                    enemy.healSlow();
                }
            }
        }

        // TOWERS
        for (const tower of towers) {
            let targetEnemy: Enemy | undefined;

            const enemiesInRange = enemies.filter(
                (e) => e.hp > 0 && tower.position.distanceTo(e.model.position) <= tower.range
            );

            if (enemiesInRange) {
                const multiShotEnabled = playerStats.skills.archer[2];
                if (tower.towerName === TowerType.Archer && multiShotEnabled) {
                    let sortedEnemies: Enemy[] = [];

                    if (tower.strategy === TargetingStrategy.FirstInLine) {
                        sortedEnemies = [...enemiesInRange].sort((a, b) => a.getPercDist() - b.getPercDist());
                    } else if (tower.strategy === TargetingStrategy.LastInLine) {
                        sortedEnemies = [...enemiesInRange].sort((a, b) => b.getPercDist() - a.getPercDist());
                    }

                    // console.log(sortedEnemies.map((e) => e.getPercDist()));

                    const targetEnemies: Enemy[] = [];
                    if (playerStats.skills.archer[4]) {
                        if (sortedEnemies.length) targetEnemies.push(sortedEnemies.pop()!);
                    }
                    if (sortedEnemies.length) targetEnemies.push(sortedEnemies.pop()!);
                    if (sortedEnemies.length) targetEnemies.push(sortedEnemies.pop()!);

                    tower.tick(delta, targetEnemies);
                } else {
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
        }

        // PROJECTILE
        for (const [, projectile] of projectiles.entries()) {
            // console.log({ projectile });
            projectile.tick(delta);
        }

        // EXPLOSIONS
        const removingExplosions = [];
        for (const [, explosion] of explosions.entries()) {
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
            if (blizzard.timeSinceSpawn > BLIZZARD_ANIMATION_DURATION) {
                blizzard.finish();
            }

            for (const e of enemies) {
                const distance = e.model.position.distanceTo(blizzard.initialPos);
                if (distance < blizzard.radius) {
                    e.setSlowed({ slowPower: blizzard.slowPower, duration: blizzard.slowDuration });

                    if (e.lastBlizzardId !== blizzard.id) {
                        const damage = determineDamage(blizzard.damage);
                        // console.log(e.id, damage);
                        e.takeDamage(damage);
                        e.lastBlizzardId = blizzard.id;
                    }
                }
            }

            blizzard.tick(delta);
        }

        // WAVE SPAWNING
        const spawningEnemyIdx = currWave.findIndex((e) => e.spawnAt < activeGameTime);
        if (spawningEnemyIdx > -1) {
            const [spawningEnemy] = currWave.splice(spawningEnemyIdx, 1);
            // console.log({ spawningEnemy });
            spawnEnemy(
                spawningEnemy.enemyType,
                spawningEnemy.pathIdx % levelData.paths.center.length,
                spawningEnemy.lane
            );
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
    // console.log("onPointerMove", e);
    const mousePos = new THREE.Vector2();
    mousePos.x = (e.clientX / canvasWidth) * 2 - 1;
    mousePos.y = -(e.clientY / canvasHeight) * 2 + 1;

    mouseRay.setFromCamera(mousePos, camera);

    if (!USE_ORBIT_CONTROLS) {
        if (e.buttons === 1) {
            handleCameraMovement(e);
        } else {
            // console.log("no drag", e.buttons);
        }
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

    // console.log(":::onModalClick::::", { e, el, modal3D, modalEl, tower_id, tower });
    outlinePass.selectedObjects = [];

    const clickedButton = [...e.composedPath()].some((el) => (el as Element).tagName === "BUTTON");
    if (clickedButton) {
        soundManager.play("click");
    }

    /******* TOWER BUILD *******/
    if (evTarget.classList.contains("tower-build-btn")) {
        towerTypeToBuild = evTarget.id.split("-")[0] as TowerType;
        modalEl.innerHTML = modalTemplates.confirmTowerBuild(towerTypeToBuild, playerStats.skills);

        const t = new Tower(towerTypeToBuild!, el.position, modal3D.userData["tile_idx"], false);
        towerPreview = { model: t.model, rangeGizmo: t.rangeGizmo };
        console.log("draw tower preview", {
            towerPreview,
            rangeGizmo: towerPreview.rangeGizmo,
            rangeGizmoRadius: (towerPreview.rangeGizmo.geometry as THREE.CircleGeometry).parameters.radius,
        });

        scene.add(t.model);
        scene.add(t.rangeGizmo);
        // scene.add(towerPreview.rangeGizmo);
    }
    if (evTarget.classList.contains("cancel-tower-build-btn")) {
        modalEl.innerHTML = modalTemplates.towerBuild(playerStats.skills);
        towerTypeToBuild = null;
        clearTowerPreview();
    }
    if (evTarget.classList.contains("confirm-tower-build-btn")) {
        // console.log(`BUILD THIS GODAMN ${towerTypeToBuild} TOWER`, { el });

        // const towerPrice = .price;

        const { price } = Tower.getTowerValuesBasedOnPlayerStats(
            playerStats.skills,
            TOWER_BLUEPRINTS[towerTypeToBuild!][0]
        );

        if (playerStats.gold < price) {
            console.warn("not enough money");
            const msgArea = document.querySelector(".warning-msg-area")!;
            msgArea.innerHTML = "not enough money!";
            return;
        }

        clearTowerPreview();
        playerStats.spendGold(price);

        const tower = new Tower(towerTypeToBuild!, el.position, modal3D.userData["tile_idx"]);

        el.userData["tower"] = towerTypeToBuild;
        el.userData["tower_id"] = tower.id;
        modal3D.userData["tower"] = towerTypeToBuild;
        modal3D.userData["tower_id"] = tower.id;

        // console.log("open details modal", { tower });
        modalEl.dataset["tower_id"] = tower.id;
        modalEl.innerHTML = modalTemplates.towerDetails(tower, playerStats.skills);
        modal3D.visible = false;

        towers.push(tower);
        scene.add(tower.model);
        scene.add(tower.rangeGizmo);
        tower.hideGizmo();

        towerTypeToBuild = null;
    }

    /******* TOWER SELL *******/
    if (evTarget.id === "tower-sell-btn") {
        modalEl.innerHTML = modalTemplates.confirmTowerSell(tower!, playerStats.skills);
    }
    if (evTarget.classList.contains("cancel-tower-sell-btn")) {
        // console.log("open details modal", { tower });
        modalEl.innerHTML = modalTemplates.towerDetails(tower!, playerStats.skills);
    }
    if (evTarget.id === "confirm-tower-sell-btn") {
        // console.log("SELL THIS GODAMN TOWER", { el });
        delete el.userData.tower;
        delete el.userData.tower_id;
        delete modal3D.userData.tower;
        delete modal3D.userData.tower_id;

        modalEl.innerHTML = modalTemplates.towerBuild(playerStats.skills);
        modal3D.visible = false;

        // towers = towers.filter((t) => t.id !== tower_id);
        const towerIdx = towers.findIndex((t) => t.id === tower_id);
        const [tower] = towers.splice(towerIdx, 1);
        scene.remove(tower.model);
        scene.remove(tower.rangeGizmo);
        playerStats.gainGold(tower.price * SELL_PRICE_MULTIPLIER);
        soundManager.play("sell");

        // console.log({ towers, tower, scene });
    }

    /******* TOWER INFO *******/
    if (evTarget.id === "tower-info-btn") {
        // console.log("INFO", { el });
        modalEl.innerHTML = modalTemplates.towerInfo(tower!);
    }
    if (evTarget.classList.contains("cancel-tower-info-btn")) {
        // console.log("open details modal", { tower });
        modalEl.innerHTML = modalTemplates.towerDetails(tower!, playerStats.skills);
    }

    /******* TOWER UPGRADE *******/
    if (evTarget.id === "tower-upgrade-btn") {
        // console.log("UPGRADE", { el });
        modalEl.innerHTML = modalTemplates.confirmTowerUpgrade(tower!, playerStats.skills);

        if (tower) {
            tower.hideGizmo();

            const { model, rangeGizmo } = tower.getUpgradedPreview();
            console.log("draw tower preview", {
                currModel: tower.model,
                nextModel: model,
                currRadius: tower.rangeGizmo.geometry.boundingSphere?.radius,
                nxtRadius: rangeGizmo.geometry.parameters.radius,
            });
            towerPreview = { model, rangeGizmo };
            scene.add(towerPreview.model);
            scene.add(towerPreview.rangeGizmo);
        }
    }
    if (evTarget.classList.contains("cancel-tower-upgrade-btn")) {
        // console.log("open details modal", { tower });
        modalEl.innerHTML = modalTemplates.towerDetails(tower!, playerStats.skills);
        clearTowerPreview();

        if (tower) {
            tower.model.visible = true;
            tower.showGizmo();
        }
    }
    if (evTarget.id === "confirm-tower-upgrade-btn") {
        const tower = towers.find((t) => t.id === tower_id);

        // console.log("tower upgrade", { e, el, modal3D, modalEl, tower_id, tower });
        // if (towerIdx >= 0)
        if (tower) {
            if (tower.blueprint.level > 3) return;
            // const t2 = TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level];
            const towerIdx = towers.findIndex((t) => t.id === tower_id);
            const { price } = Tower.getTowerValuesBasedOnPlayerStats(
                playerStats.skills,
                TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level]
            );

            if (playerStats.gold < price) {
                console.warn("not enough money");
                const msgArea = document.querySelector(".warning-msg-area")!;
                msgArea.innerHTML = "not enough money!";
                return;
            }
            playerStats.spendGold(price);

            clearTowerPreview();

            scene.remove(tower.model);
            scene.remove(tower.rangeGizmo);

            // if (tower.blueprint.level > 3) return;

            const upgradedTower = tower.upgrade();

            towers.splice(towerIdx, 1, upgradedTower);

            scene.add(upgradedTower.model);
            scene.add(upgradedTower.rangeGizmo);

            // console.log({ tower, towers });
            modalEl.innerHTML = modalTemplates.towerDetails(tower, playerStats.skills);
            upgradedTower.hideGizmo();
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
    console.log("click at", [pos.x, pos.y, pos.z]);

    let clickedTower: THREE.Intersection | undefined;
    let clickedTowerBase: THREE.Intersection | undefined;
    const rayIntersects = mouseRay.intersectObjects(scene.children);
    // console.log(rayIntersects);
    rayIntersects.forEach((ch) => {
        if (ch.object.name.includes("TowerBase")) {
            clickedTowerBase = ch;
            // console.log(ch.object.position);
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
                // console.log("cancel meteor");
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
                // console.log("cancel blizzard");
                clearBlizzardTargeting();
                return;
            }

            const pos = mousePosToWorldPos(mouseRay, scene);
            blizzardTargetPos = new THREE.Vector3(pos.x, pos.y, pos.z);
            // console.log("will dispatch blizzard-fire", { pos, blizzardTargetPos });
            window.dispatchEvent(new CustomEvent("blizzard-fire"));
            return;
        }
        case Boolean(clickedTower): {
            if (!clickedTower) return;
            const tower = towers.find((t) => t.id === clickedTower!.object.userData.tower_id);
            console.log("CLICKED TOWER", { clickedTower, tower });

            outlinePass.selectedObjects.push(clickedTower.object.parent as THREE.Mesh);

            const towersWithShowingGizmos = towers.filter((t) => t.rangeGizmo.visible);
            towersWithShowingGizmos.forEach((t) => {
                t.hideGizmo();
            });
            tower?.showGizmo();

            scene.traverse((obj) => {
                if ((obj as any).isCSS2DObject) {
                    if (obj.userData.tile_idx === clickedTower!.object.userData.tile_idx) {
                        // modal
                        obj.visible = true;
                    }
                }
            });
            soundManager.play("click");
            return;
        }
        case Boolean(clickedTowerBase): {
            if (!clickedTowerBase) return;
            console.log("CLICKED TOWER BASE", { clickedTowerBase });
            const tower = towers.find((t) => t.id === clickedTowerBase!.object.userData.tower_id);
            const modal3D = scene.getObjectByName(`${clickedTowerBase.object.name}-modal`)!;
            modal3D.visible = true;

            const towersWithShowingGizmos = towers.filter((t) => t.rangeGizmo.visible);
            towersWithShowingGizmos.forEach((t) => {
                t.hideGizmo();
            });
            tower?.showGizmo();

            outlinePass.selectedObjects.push(clickedTowerBase.object);
            soundManager.play("click");
            return;
        }
        default: {
            const towersWithShowingGizmos = towers.filter((t) => t.rangeGizmo.visible);
            towersWithShowingGizmos.forEach((t) => {
                t.hideGizmo();
            });

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
    if (gameState === GameState.Paused) return;
    // console.log("onZoom", e, e.deltaX, e.deltaY, e.deltaZ, gameState);
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
    if (gameState === GameState.Paused) return;

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
    console.log("onPauseGame", callWaveBeaconContainers, gameState);
    gameStateBeforePause = gameState;
    gameState = GameState.Paused;

    pauseScreen.classList.remove("hidden");

    // hide call-wave beacons
    callWaveBeaconContainers.forEach((container) => {
        container.style.opacity = "0";
    });

    // dim enemies hp bars
    cssRenderer.domElement.style.opacity = "0.4";

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

    if (gameStateBeforePause === GameState.Active) {
        gameState = GameState.Active;
    } else {
        gameState = GameState.Idle;
    }

    pauseScreen.classList.add("hidden");

    callWaveBeaconContainers.forEach((container) => {
        container.style.opacity = "1";
    });

    cssRenderer.domElement.style.opacity = "1";

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
    location.assign("#/level-selection");
    endGameBtn.removeEventListener("click", onEndGameConfirm);
}

function onGameSpeedChange(e: MouseEvent) {
    const elTarget = e.target as HTMLElement;

    if (elTarget.tagName === "INPUT") {
        const speedStr = elTarget.id.split("-")[1];
        const speed = Number(speedStr[0]);
        gameSpeed = speed as GameSpeed;
        // console.log("onGameSpeedChange", { gameSpeed });
    }
}

function onWaveEnded() {
    console.log(`WAVE ${currWaveIdx + 1} ended`);
    gameState = GameState.Idle;
    currWaveIdx++;
    activeGameTime = 0;

    printWaveAfterMath();

    const waveCount = levelData.waves.length;
    // const waveCount = STAGE_WAVES_DATA[levelIdx].length;
    if (currWaveIdx < waveCount) {
        drawWaveCallBeacon();
    }
    if (currWaveIdx === waveCount) {
        gameOverWin();
    }
    // pauseGameBtn.innerHTML = `Start Wave ${currWaveIdx + 1}`;
}

function gameOverWin() {
    console.log("GAME END ... WIN!");
    cssRenderer.domElement.style.opacity = "0";
    soundManager.play("gameWin");

    const stars = calcEarnedStarsForGameWin(playerStats.hp);
    endGameScreen.innerHTML = gameEndTemplates.gameWin(stars);
    endGameScreen.classList.remove("hidden");

    window.dispatchEvent(new CustomEvent("game-win", { detail: stars }));

    endGameBtn = document.querySelector("#confirm-end-game-btn") as HTMLButtonElement;
    endGameBtn.addEventListener("click", onEndGameConfirm);
}

function gameOverLose() {
    console.log("GAME END ... LOSE");
    soundManager.play("gameLose");

    gameState = GameState.Idle;
    cssRenderer.domElement.style.opacity = "0";
    endGameScreen.innerHTML = gameEndTemplates.gameLose();
    endGameScreen.classList.remove("hidden");
    endGameBtn = document.querySelector("#confirm-end-game-btn") as HTMLButtonElement;
    endGameBtn.addEventListener("click", onEndGameConfirm);
    gameLost = true;
}

function handleCameraMovement(e: PointerEvent) {
    if (mobileScaling) return; // block camera movement while zooming
    // vel = (fov - MIN) / (MAX - MIN)
    const speed = 0.2;
    const vel = THREE.MathUtils.clamp((camera.fov - MIN_FOV) / (MAX_FOV - MIN_FOV), 0.25, 1);
    // console.log({ fov: camera.fov, vel });

    if (
        (e.movementX > 0 && camera.position.x > levelData.cameraBounds.left) ||
        (e.movementX < 0 && camera.position.x < levelData.cameraBounds.right)
    ) {
        camera.position.x -= e.movementX * speed * vel;
    }

    if (
        (e.movementY > 0 && camera.position.z > levelData.cameraBounds.top) ||
        (e.movementY < 0 && camera.position.z < levelData.cameraBounds.bottom)
    ) {
        camera.position.z -= e.movementY * speed * vel;
    }

    // console.log("isDragging", e.buttons, e.movementX, e.movementY);

    const camTarget = new THREE.Vector3(camera.position.x, camera.position.y - 40, camera.position.z - 50);
    camera.lookAt(camTarget);
}

function revertCancelableModals() {
    const allModals = Array.from(document.querySelectorAll<HTMLDivElement>(".modal2D"));

    allModals.forEach((modalEl) => {
        // console.log(":::REVERT CANCELABLE MODALS", { modalEl, tower_id: modalEl.dataset["tower_id"] });

        for (const cancelableModalName of cancelableModalNames) {
            if (modalEl.children[0].classList.contains(cancelableModalName)) {
                if (cancelableModalName === ModalType.ConfirmTowerBuild) {
                    modalEl.innerHTML = modalTemplates.towerBuild(playerStats.skills);
                } else {
                    const tower = towers.find((t) => t.id === modalEl.dataset["tower_id"]);
                    if (tower) {
                        modalEl.innerHTML = modalTemplates.towerDetails(tower, playerStats.skills);

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
        switch (projectile.type) {
            case TowerType.Archer: {
                soundManager.play("arrowHit");
                targetEnemy.takeDamage(projectile.damage);
                break;
            }
            case TowerType.Ballista: {
                soundManager.play("hit01");

                let damage = projectile.damage;
                let critChance = 0;

                if (playerStats.skills.ballista[2]) {
                    critChance += playerStats.skills.ballista[2].effect.CRITICAL_HIT!.value / 100;
                }

                if (playerStats.skills.ballista[4]) {
                    critChance += playerStats.skills.ballista[4].effect.CRITICAL_HIT!.value / 100;
                }

                const isCriticalHit = Math.random() < critChance;
                if (isCriticalHit) {
                    const t = TOWER_BLUEPRINTS.Ballista[projectile.level - 1];
                    const towerAvgDmg = THREE.MathUtils.lerp(t.damage[0], t.damage[1], 0.5);
                    const critDamage = towerAvgDmg * 3;
                    damage += critDamage;
                    // console.log("CRITICAL HIT", { towerAvgDmg, "critDamage (3x towerAvgDmg)": critDamage, damage });
                }

                targetEnemy.takeDamage(damage);
                break;
            }
            case TowerType.Cannon: {
                soundManager.play("explosion");

                let radius = explosion.userData.radius;
                if (playerStats.skills.cannon[1]) {
                    radius += (radius * playerStats.skills.cannon[1].effect.SPLASH_AREA!.value) / 100; // skill::cannon-2
                }
                // override previously set radius, so explosion is drawn with the right size
                explosion.userData["radius"] = radius;

                const CRAZY_MULTIPLIER = 4;
                const enemiesHit = applyAreaDamage(enemies, pos, radius * CRAZY_MULTIPLIER, projectile.damage);

                if (playerStats.skills.cannon[3]) {
                    const slowPower = playerStats.skills.cannon[3].effect.SLOW_POWER!.value / 100;
                    const duration = DEFAULT_CANNON_SLOW_DURATION;

                    enemiesHit.forEach((e) => {
                        e.setSlowed({ slowPower, duration });
                    });
                }
                break;
            }
            case TowerType.Poison: {
                soundManager.play("hit01");

                const duration = DEFAULT_POISON_DURATION;

                const poison = new PoisonEntry(targetEnemy.id, duration, projectile.level, playerStats.skills);
                if (!targetEnemy.isPoisoned) {
                    targetEnemy.setPoisoned();
                }

                if (poisonEntries.has(poison.enemyId)) {
                    poison.cooldown = poisonEntries.get(poison.enemyId)!.cooldown;
                    poisonEntries.set(poison.enemyId, poison);
                } else {
                    poisonEntries.set(poison.enemyId, poison);
                }
                targetEnemy.takeDamage(projectile.damage);
                break;
            }
            case TowerType.Wizard: {
                soundManager.play("hit01");

                const ricochetEnabled = playerStats.skills.wizard[1];
                const ricochet3 = playerStats.skills.wizard[3];
                const ricochet4 = playerStats.skills.wizard[4];

                if (ricochetEnabled) {
                    if (projectile.model.userData.ricochet === 3) {
                        targetEnemy.takeDamage(projectile.damage * 0.35);
                    }

                    if (projectile.model.userData.ricochet === 2) {
                        targetEnemy.takeDamage(projectile.damage * 0.5);
                        if (!ricochet4) break;
                        handleRicochet(
                            pos,
                            targetEnemy,
                            projectile.blueprint.speed,
                            projectile.model.userData.tower_id,
                            3
                        );
                    }

                    if (projectile.model.userData.ricochet === 1) {
                        targetEnemy.takeDamage(projectile.damage * 0.65);
                        if (!ricochet3) break;
                        handleRicochet(
                            pos,
                            targetEnemy,
                            projectile.blueprint.speed,
                            projectile.model.userData.tower_id,
                            2
                        );
                    }

                    if (!projectile.model.userData.ricochet) {
                        targetEnemy.takeDamage(projectile.damage);
                        handleRicochet(
                            pos,
                            targetEnemy,
                            projectile.blueprint.speed,
                            projectile.model.userData.tower_id,
                            1
                        );
                    }
                } else {
                    targetEnemy.takeDamage(projectile.damage);
                }
                break;
            }
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

function handleRicochet(pos: THREE.Vector3, targetEnemy: Enemy, speed: number, tower_id: string, level: number) {
    const tower = towers.find((t) => t.id === tower_id)!;

    // RICOCHET
    let chosenEnemy: Enemy | undefined;
    enemies.forEach((e) => {
        if (pos.distanceTo(e.model.position) < WIZARD_RICOCHET_RANGE && e.id !== targetEnemy.id) {
            if (chosenEnemy) {
                // if (pos.distanceTo(e.model.position) < pos.distanceTo(chosenEnemy.model.position)) {
                if (
                    Math.abs(pos.distanceTo(e.model.position) - RICOCHET_IDEAL_DISTANCE) <
                    Math.abs(pos.distanceTo(chosenEnemy.model.position) - RICOCHET_IDEAL_DISTANCE)
                ) {
                    chosenEnemy = e;
                }
            } else {
                chosenEnemy = e;
            }
        }
    });

    if (chosenEnemy) {
        const timeToReachTargetViaStraightLine =
            pos.distanceTo(new THREE.Vector3().copy(chosenEnemy.getFuturePosition(0.2))) / speed;
        const destination = new THREE.Vector3().copy(chosenEnemy.getFuturePosition(timeToReachTargetViaStraightLine));
        const origin = new THREE.Vector3().copy(pos);
        const ricochetProjectile = new StraightProjectile(tower, origin, destination, chosenEnemy.id);
        // window.dispatchEvent(new CustomEvent("ricochet-projectile", { detail: ricochetProjectile }));

        ricochetProjectile.model.userData["ricochet"] = level;
        // ricochetProjectile.model.userData["ricochet_enemy_id"] = level;
        window.dispatchEvent(new CustomEvent("projectile", { detail: ricochetProjectile }));
    }
}

function spawnEnemy(enemyType: EnemyType, pathIdx = 0, lane: LaneChar) {
    // console.log("spawnEnemy", { enemyType, currWave });
    const enemy = new Enemy(enemyType, pathIdx, lane, camera.fov);
    enemies.push(enemy);
    scene.add(enemy.model);
}

function onEnemyDestroyed(e: any) {
    const data = e.detail;
    // console.log("enemy destroy", { data });
    const { enemy, endReached } = data as { enemy: Enemy; endReached: boolean };

    if (endReached) {
        // console.log(`${enemy.enemyType} reached end`);
        playerStats.loseHP(1);
        if (playerStats.hp <= 0) {
            if (!gameLost) {
                gameOverLose();
            }
        } else {
            soundManager.play("loseHP");
        }
    } else {
        // console.log("enemy killed");
        soundManager.play("coin");
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
    // console.log("remove enemy from scene", enemy);
    scene.remove(enemy.model);

    if (enemies.length === 0 && !gameLost) {
        onWaveEnded();
    }
}

/****************************************/
/*************** SPECIALS ***************/
/****************************************/

function onMeteorBtnClick() {
    if (gameState === GameState.Active && meteorBtn.classList.contains("cancel-action")) {
        // console.log("onMeteorBtnClick! cancel meteor");
        clearMeteorTargeting();
    } else if (gameState === GameState.Active && playerStats.readyToMeteor()) {
        // console.log("onMeteorBtnClick! meteor targeting on");

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
        // console.log("onBlizzardBtnClick! cancel blizzard");
        clearBlizzardTargeting();
    } else if (gameState === GameState.Active && playerStats.readyToBlizzard()) {
        // console.log("onBlizzardBtnClick! blizzard targeting on");

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

    let meteorCount = DEFAULT_METEOR_COUNT;

    // METEOR COUNT
    if (playerStats.skills.meteor[0]) {
        meteorCount += playerStats.skills.meteor[0].effect.METEOR_COUNT!.value; // skill::meteor-1
    }
    if (playerStats.skills.meteor[2]) {
        meteorCount += playerStats.skills.meteor[2].effect.METEOR_COUNT!.value; // skill::meteor-3
    }
    if (playerStats.skills.meteor[4]) {
        meteorCount += playerStats.skills.meteor[4].effect.METEOR_COUNT!.value; // skill::meteor-5
    }

    for (let i = 0; i < meteorCount; i++) {
        const delay = i * 220;
        spawnMeteor(delay);
    }

    // ADDITIONAL METEORS AT RANDOM POSITIONS
    if (playerStats.skills.meteor[3]) {
        let randomTargetMeteorCount = playerStats.skills.meteor[3].effect.RANDOM_TARGETS!.value; // skill::meteor-4

        if (playerStats.skills.meteor[4]) {
            randomTargetMeteorCount += playerStats.skills.meteor[4].effect.RANDOM_TARGETS!.value; // skill::meteor-5
        }

        for (let i = 0; i < randomTargetMeteorCount; i++) {
            const randomEnemy = enemies[Math.floor(enemies.length * Math.random())];
            const delay = i * 200;
            const target = randomEnemy.getFuturePosition(Meteor.timeToTarget() + delay / 1000);
            spawnMeteor(delay, target);
        }
    }
}

function spawnMeteor(delay: number, target?: THREE.Vector3) {
    const destination = new THREE.Vector3(
        target ? target.x : THREE.MathUtils.lerp(meteorTargetPos.x - 2.5, meteorTargetPos.x + 2.5, Math.random()),
        target ? target.y : meteorTargetPos.y,
        target ? target.z : THREE.MathUtils.lerp(meteorTargetPos.z - 2.5, meteorTargetPos.z + 2.5, Math.random())
    );

    setTimeout(() => {
        const meteor = new Meteor(destination);

        if (playerStats.skills.meteor[2]) {
            meteor.slowPower = playerStats.skills.meteor[2].effect.SLOW_POWER!.value / 100; // skill::meteor-3
            meteor.slowDuration = playerStats.skills.meteor[2].effect.SLOW_DURATION!.value; // skill::meteor-3
        }
        if (playerStats.skills.meteor[4]) {
            meteor.slowPower = meteor.slowPower + playerStats.skills.meteor[4].effect.SLOW_POWER!.value / 100; // skill::meteor-5
            meteor.slowDuration = meteor.slowDuration + playerStats.skills.meteor[4].effect.SLOW_DURATION!.value; // skill::meteor-5
        }

        meteors.set(meteor.id, meteor);
        scene.add(meteor.model);

        if (DRAW_METEOR_GIZMOS) {
            const meteorGizmo = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.25), MATERIALS.transparentBlack);
            meteorGizmo.position.set(destination.x, destination.y + 0.25, destination.z);
            scene.add(meteorGizmo);

            setTimeout(() => {
                scene.remove(meteorGizmo);
            }, Meteor.timeToTarget() * 1000);
        }
    }, delay);
}

function onBlizzardFire() {
    playerStats.fireBlizzard();

    clearBlizzardTargeting();

    const position = new THREE.Vector3(blizzardTargetPos.x, blizzardTargetPos.y, blizzardTargetPos.z);
    console.log("fire Blizzard", position);

    const { radius, slowPower, duration, damage } = Blizzard.setValuesBasedOnPlayerStats(playerStats);
    // console.log("blizzard", { radius, slowPower, duration, damage });

    const blizzard = new Blizzard(position, radius, slowPower, duration, damage);
    blizzards.set(blizzard.id, blizzard);
    scene.add(blizzard.model);
}

function clearMeteorTargeting() {
    readyToFireMeteor = false;
    document.body.style.cursor = "default";
    if (meteorBtn.classList.contains("cancel-action")) {
        meteorBtn.classList.remove("cancel-action");
    }
}
function clearBlizzardTargeting() {
    readyToFireBlizzard = false;
    document.body.style.cursor = "default";
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

    let damage = determineDamage(DEFAULT_METEOR_DAMAGE);

    if (playerStats.skills.meteor[1]) {
        damage += (damage * playerStats.skills.meteor[1].effect.DAMAGE!.value) / 100; // skill::meteor-2
    }

    if (playerStats.skills.meteor[3]) {
        damage += (damage * playerStats.skills.meteor[1].effect.DAMAGE!.value) / 100; // skill::meteor-4
    }

    const hitEnemies = applyAreaDamage(enemies, pos, explosion.userData.radius * 0.4, damage);

    // console.log({ id: meteor.id, meteor });
    if (meteor.slowPower > 0) {
        hitEnemies.forEach((e) => {
            const slowPower = meteor.slowPower;
            const duration = meteor.slowDuration;
            // console.log(e, slowPower, duration);
            e.setSlowed({ slowPower, duration });
        });
    }
}
function onBlizzardFinish(e: any) {
    const blizzard = e.detail as Blizzard;
    // console.log("onBlizzardFinish", blizzard);
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
        enemy.takeDamage(poison.damage);
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
        // console.log("revert tower preview", { towerPreview });
        scene.remove(towerPreview.model);
        scene.remove(towerPreview.rangeGizmo);
        towerPreview = undefined;
    }
}

function drawAndComputeOffsetPaths(shapeW: number, shapeH: number, pathGeometry: THREE.ExtrudeGeometry) {
    const centerPath: { x: number; y: number; z: number }[] = [];
    const leftPath: { x: number; y: number; z: number }[] = [];
    const rightPath: { x: number; y: number; z: number }[] = [];

    const dummy = new THREE.Object3D();
    const rectangle = new THREE.Mesh(new THREE.BoxGeometry(shapeW, 0.05, shapeH), MATERIALS.concrete);
    const pathPoints = (pathGeometry.toJSON() as any).options.extrudePath.points as [number, number, number][];

    pathPoints.forEach((point, i, arr) => {
        const rect = rectangle.clone();
        rect.position.set(point[0], point[1], point[2]);

        const prevPoint = arr[i - 1];
        const nextPoint = arr[i + 1]
            ? arr[i + 1]
            : [
                  point[0] + point[0] - prevPoint[0],
                  point[1] + point[1] - prevPoint[1],
                  point[2] + point[2] - prevPoint[2],
              ];

        rect.lookAt(nextPoint[0], nextPoint[1], nextPoint[2]);

        i = 0;
        while (i < 3) {
            const [center, left, right] = [i === 0, i === 1, i === 2];
            let dot!: THREE.Mesh;

            if (center) {
                dot = new THREE.Mesh(new THREE.SphereGeometry(0.15), MATERIALS.black);
            }
            if (left) {
                dot = new THREE.Mesh(new THREE.SphereGeometry(0.15), MATERIALS.damageMaterialStd);
                dot.position.x += shapeW;
            }
            if (right) {
                dot = new THREE.Mesh(new THREE.SphereGeometry(0.15), MATERIALS.poisonDmgMaterialStd);
                dot.position.x -= shapeW;
            }

            rect.add(dot);
            dot.getWorldPosition(dummy.position);

            const array = center ? centerPath : left ? leftPath : right ? rightPath : [];
            array.push({ x: dummy.position.x, y: dummy.position.y, z: dummy.position.z });

            scene.add(rect);
            i++;
        }
    });

    return { centerPath, leftPath, rightPath };
}

function printWaveAfterMath() {
    const waveAfterMath: { towerName: TowerType; tower: Tower; totalDamage: number }[] = [];
    towers.forEach((t) => {
        waveAfterMath.push({ towerName: t.towerName, tower: t, totalDamage: t.damageDealt });
        t.damageDealt = 0;
    });
    console.table(waveAfterMath);
}

function onSoundSettingsChange() {
    soundManager.updateSettings();
}
