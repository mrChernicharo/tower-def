/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, EnemyType, GameArea, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, GameLevel, ProjectileBluePrint, Skill, TowerBluePrint } from "./types";
import { THREE } from "../three";
import { castleLevelPath, desertLevelPath, villageLevelPath } from "./levelPaths";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const DRAW_PROJECTILE_TRAJECTORIES = false;
// export const DRAW_PROJECTILE_TRAJECTORIES = true;

export const defaultPlayerSkills = {
    "constructor-1": false,
    "constructor-2": false,
    "constructor-3": false,
    "constructor-4": false,
    "constructor-5": false,
    "constructor-6": false,
    "merchant-1": false,
    "merchant-2": false,
    "merchant-3": false,
    "merchant-4": false,
    "merchant-5": false,
    "merchant-6": false,
    "chemist-1": false,
    "chemist-2": false,
    "chemist-3": false,
    "chemist-4": false,
    "chemist-5": false,
    "chemist-6": false,
    "blacksmith-1": false,
    "blacksmith-2": false,
    "blacksmith-3": false,
    "blacksmith-4": false,
    "blacksmith-5": false,
    "blacksmith-6": false,
};

export const allAreaLevels = {
    desert: [0, 1, 2, 3],
    forest: [4, 5, 6, 7],
    winter: [8, 9, 10, 11],
    lava: [12, 13, 14, 15],
} as const;

export const allAreas = [
    { id: 0, name: GameArea.Desert },
    { id: 1, name: GameArea.Forest },
    { id: 2, name: GameArea.Winter },
    { id: 3, name: GameArea.Lava },
] as const;

export const mapURLs = {
    desert: "/assets/glb/lv1.desert-level.glb",
    forest: "/assets/glb/lv2.castle-level.glb",
    winter: "/assets/glb/lv4.village-level.glb",
    lava: "/assets/glb/lv4.village-level.glb",
};

export const imgs = {
    Splash: "/assets/imgs/splash.png",
    World: "/assets/imgs/world-map.jpeg",
    Stage: "/assets/svg/stage.svg",
    // Stage: "/assets/imgs/sword32.webp",
    Archer: "/assets/imgs/archer.webp",
    Ballista: "/assets/imgs/ballista.webp",
    Cannon: "/assets/imgs/cannon.webp",
    Poison: "/assets/imgs/poison.webp",
    Wizard: "/assets/imgs/wizard.webp",
    ConstructorPath: "/assets/imgs/rune.webp",
    MerchantPath: "/assets/imgs/crown.webp",
    ChemistPath: "/assets/imgs/orb.webp",
    BlacksmithPath: "/assets/imgs/sledge-hammer.webp",
};

// prettier-ignore
export const gameSkills: { [k in SkillPath]: Skill[] }  = {
    constructor: [
        { id: "constructor-1", name: "masonry basics", description: "reduce 10% build cost of level 1 towers", starCost: 1 },
        { id: "constructor-2", name: "reinforced walls", description: "1 extra ❤️", starCost: 2 },
        { id: "constructor-3", name: "advanced tools", description: "reduce 10% upgrade cost of level 2 towers", starCost: 3 },
        { id: "constructor-4", name: "fortified walls", description: "3 extra ❤️", starCost: 3 },
        { id: "constructor-5", name: "specialized artisans", description: "reduce 10% upgrade cost of level 3 towers", starCost: 4 },
        { id: "constructor-6", name: "masonry mastery", description: "reduce 10% cost of all towers", starCost: 5 },
    ],
    merchant: [
        { id: "merchant-1", name: "developing economy", description: "earn 10 gold every time you survive a wave", starCost: 1 },
        { id: "merchant-2", name: "trade with foreigners", description: "start with extra 50 gold", starCost: 2 },
        { id: "merchant-3", name: "oversees colony", description: "start with extra 100 gold", starCost: 3 },
        { id: "merchant-4", name: "bounty hunter", description: "earn 20 gold every time you survive a wave", starCost: 3 },
        { id: "merchant-5", name: "maximized profits", description: "earn 1 extra gold piece for every killed enemy", starCost: 4 },
        { id: "merchant-6", name: "advanced economy", description: "start with extra 150 gold", starCost: 5 },
    ],
    chemist: [
        { id: "chemist-1", name: "basic chemistry", description: "poison towers deal 10% extra damage", starCost: 1 },
        { id: "chemist-2", name: "herbal lore", description: "wizard towers deal 10% extra damage", starCost: 2 },
        { id: "chemist-3", name: "philosophy stone", description: "poison damage increased by 1", starCost: 3 },
        { id: "chemist-4", name: "laboratory trinkets", description: "poison towers deal 20% extra damage", starCost: 3 },
        { id: "chemist-5", name: "classical library", description: "wizard towers deal 20% extra damage", starCost: 4 },
        { id: "chemist-6", name: "chemical mastery", description: "poison damage increased by 3", starCost: 5 },
    ],
    blacksmith: [
        { id: "blacksmith-1", name: "basic smithery", description: "archer towers deal 10% extra damage", starCost: 1 },
        { id: "blacksmith-2", name: "metal alloy", description: "ballista towers deal 10% extra damage", starCost: 2 },
        { id: "blacksmith-3", name: "gold hammer", description: "cannon towers deal 10% extra damage", starCost: 3 },
        { id: "blacksmith-4", name: "high temperature oven", description: "archer towers deal 20% extra damage", starCost: 3 },
        { id: "blacksmith-5", name: "advanced forgery", description: "ballista towers deal 20% extra damage", starCost: 4 },
        { id: "blacksmith-6", name: "smith mastery", description: "cannon towers deal 20% extra damage", starCost: 5 },
    ],
};

export const COLORS = {
    bg: 0x333355,
    desert: 0xdd6600,
    concrete: 0xacacac,
    blue: 0x3484d4,
    red: 0xd43434,
    orange: 0xd47f34,
    orangered: 0xff5a00,
    green: 0x34d4af,
    forest: 0x007900,
    purple: 0xb834d4,
    lava: 0x7778c8,
    yellow: 0xfffc00,
    black: 0x000000,
    white: 0xffffff,
    winter: 0xffffff,
} as const;

export const ENEMY_BLUEPRINTS: { [k in EnemyType]: EnemyBluePrint } = {
    spider: {
        name: EnemyType.Spider,
        reward: 5,
        modelURL: "/assets/glb/spider.glb",
        // speed: 10,
        speed: 3.5,
        maxHp: 40,
        modelScale: 80,
        walkAnimationName: "Wolf Spider Armature|Spider running",
    },
    orc: {
        name: EnemyType.Orc,
        reward: 10,
        // modelURL: "/assets/glb/hand-painted_orc.glb",
        modelURL: "/assets/glb/low-poly_orc.glb",
        speed: 2,
        maxHp: 200,
        modelScale: 1.5,
        walkAnimationName: "ANM_WALK",
    },
    raptor: {
        name: EnemyType.Raptor,
        reward: 10,
        modelURL: "/assets/glb/raptoid.glb",
        speed: 6,
        maxHp: 100,
        modelScale: 0.02,
        walkAnimationName: "Running",
    },
    raptor2: {
        name: EnemyType.Raptor2,
        reward: 100,
        modelURL: "/assets/glb/raptoid.glb",
        speed: 3,
        maxHp: 1500,
        modelScale: 0.04,
        walkAnimationName: "Running",
    },
    soldier: {
        name: EnemyType.Soldier,
        reward: 15,
        modelURL: "/assets/glb/Character_Soldier.gltf",
        speed: 2,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    brigand: {
        name: EnemyType.Brigand,
        reward: 15,
        modelURL: "/assets/glb/Character_Hazmat.gltf",
        speed: 2,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    warrior: {
        name: EnemyType.Warrior,
        reward: 15,
        modelURL: "/assets/glb/Character_Enemy.gltf",
        speed: 1.6,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
} as const;

export const MATERIALS = {
    damageMaterialStd: new THREE.MeshStandardMaterial({ color: "red" }),
    damageMaterialPhysical: new THREE.MeshStandardMaterial({ color: "red" }),
    concrete: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    desert: new THREE.MeshMatcapMaterial({ color: COLORS.desert }),
    forest: new THREE.MeshMatcapMaterial({ color: COLORS.forest }),
    winter: new THREE.MeshMatcapMaterial({ color: COLORS.winter }),
    lava: new THREE.MeshMatcapMaterial({ color: COLORS.lava }),
    path: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    concreteTransparent: new THREE.MeshMatcapMaterial({
        color: COLORS.concrete,
        transparent: true,
        opacity: 0.5,
    }),
    projectileGizmo: new THREE.MeshToonMaterial({ color: 0x00ffff }),
    tower: (towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color: 0xdba58c,
            map: towerTexture,
        }),
    towerHighlight: (towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color: 0xca947d,
            map: towerTexture,
        }),
    towerRangeGizmo: (color: string) =>
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.15,
            color,
        }),
    projectile: (color: number, towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color,
            map: towerTexture,
        }),
    explosion: (color: number) =>
        new THREE.MeshToonMaterial({
            color,
            transparent: true,
            opacity: 0.6,
        }),
    trajectoryLine: () => new THREE.LineBasicMaterial({ color: 0xff0000 }),
};

export const TOWER_BLUEPRINTS: { [k in TowerType]: TowerBluePrint[] } = {
    Archer: [
        {
            name: TowerType.Archer,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6,
            damage: [3, 7],
            fireRate: 6,
            color: "blue",
            price: 100,
            range: 8,
            modelScale: 0.005,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6.5,
            level: 2,
            damage: [6, 13],
            fireRate: 6,
            color: "blue",
            price: 160,
            range: 9,
            modelScale: 0.0055,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 7,
            level: 3,
            damage: [14, 22],
            fireRate: 7,
            color: "blue",
            price: 220,
            modelScale: 0.006,
            range: 10,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 7.5,
            level: 4,
            damage: [20, 34],
            fireRate: 8,
            color: "blue",
            price: 380,
            modelScale: 0.0065,
            range: 10,
            skills: [],
        },
    ],
    Ballista: [
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 6,
            level: 1,
            damage: [10, 20],
            fireRate: 2,
            color: "red",
            price: 100,
            range: 8,
            modelScale: 0.005,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 6.5,
            level: 2,
            damage: [20, 38],
            fireRate: 2.25,
            color: "red",
            price: 160,
            range: 9,
            modelScale: 0.0055,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 7,
            level: 3,
            damage: [34, 55],
            fireRate: 2.5,
            color: "red",
            price: 220,
            modelScale: 0.006,
            range: 10,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 7.5,
            level: 4,
            damage: [51, 76],
            fireRate: 2.75,
            color: "red",
            price: 380,
            modelScale: 0.0065,
            range: 10,
            skills: [],
        },
    ],
    Cannon: [
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8,
            level: 1,
            damage: [18, 36],
            fireRate: 0.8,
            color: "orange",
            price: 100,
            range: 9,
            modelScale: 0.005,
        },
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8.5,
            level: 2,
            damage: [29, 54],
            fireRate: 0.8,
            color: "orange",
            price: 160,
            modelScale: 0.0055,
            range: 10,
        },
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 9,
            level: 3,
            damage: [48, 86],
            fireRate: 0.8,
            color: "orange",
            price: 220,
            modelScale: 0.006,
            range: 11,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 9.5,
            level: 4,
            damage: [60, 100],
            fireRate: 0.8,
            color: "orange",
            price: 380,
            modelScale: 0.0065,
            range: 12,
            skills: [],
        },
    ],
    Poison: [
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8,
            level: 1,
            damage: [4, 7],
            fireRate: 3,
            color: "green",
            price: 100,
            modelScale: 0.005,
            range: 10,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8.5,
            level: 2,
            damage: [11, 22],
            fireRate: 2.5,
            color: "green",
            price: 160,
            modelScale: 0.0055,
            range: 12,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 9,
            level: 3,
            damage: [21, 37],
            fireRate: 2,
            color: "green",
            price: 220,
            modelScale: 0.006,
            range: 13,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 10,
            level: 4,
            damage: [33, 60],
            fireRate: 2,
            color: "green",
            price: 380,
            modelScale: 0.0065,
            range: 14,
            skills: [],
        },
    ],
    Wizard: [
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 9.5,
            level: 1,
            damage: [9, 18],
            fireRate: 2,
            color: "purple",
            price: 100,
            modelScale: 0.005,
            range: 12,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 11,
            level: 2,
            damage: [14, 30],
            fireRate: 1.8,
            color: "purple",
            price: 160,
            modelScale: 0.0055,
            range: 13,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 12,
            level: 3,
            damage: [26, 49],
            fireRate: 1.6,
            color: "purple",
            price: 220,
            modelScale: 0.006,
            range: 14,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 13.5,
            level: 4,
            damage: [40, 65],
            fireRate: 1.5,
            color: "purple",
            price: 380,
            modelScale: 0.0065,
            range: 14,
            skills: [],
        },
    ],
};

export const PROJECTILE_BLUEPRINTS: { [k in TowerType]: ProjectileBluePrint[] } = {
    Archer: [
        {
            type: TowerType.Archer,
            level: 1,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 2,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 3,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 4,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
    ],
    Ballista: [
        {
            type: TowerType.Ballista,
            level: 1,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 2,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 3,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 4,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
    Cannon: [
        {
            type: TowerType.Cannon,
            level: 1,
            explosionIntensity: 2,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.0065,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 2,
            explosionIntensity: 2,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.01,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 3,
            explosionIntensity: 2,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.012,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 4,
            explosionIntensity: 2,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.015,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
    Wizard: [
        {
            type: TowerType.Wizard,
            level: 1,
            explosionIntensity: 1,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.005,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 2,
            explosionIntensity: 1,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.0055,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 3,
            explosionIntensity: 1,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.006,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 4,
            explosionIntensity: 1,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.0065,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
    ],
    Poison: [
        {
            type: TowerType.Poison,
            level: 1,
            explosionIntensity: 1,
            explosionColor: "green",
            color: "green",
            modelScale: 0.005,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 2,
            explosionIntensity: 1,
            explosionColor: "green",
            color: "green",
            modelScale: 0.0055,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 3,
            explosionIntensity: 1,
            explosionColor: "green",
            color: "green",
            modelScale: 0.006,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 4,
            explosionIntensity: 1,
            explosionColor: "green",
            color: "green",
            modelScale: 0.0065,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
};

export const STAGE_WAVES_DATA: [string, number, number][][][] = [
    // stage 00
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
    ],

    // stage 01
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
        // wave 2
        waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 02
    [
        // wave 1
        waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 03
    [
        // wave 1
        [...waveSegment(EnemyChar.Spider, 1), ...waveSegment(EnemyChar.Raptor, 4)],
        // // wave 2
    ],

    // stage 04
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
    ],

    // stage 05
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Raptor, 4, 10, 0, []),
        // wave 3
        // [...waveSegment(EnemyChar.Soldier, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        [...waveSegment(EnemyChar.Soldier, 4, 6), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor2, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
    ],

    // stage 06
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Soldier, 3.2, 5),
        // waveSegment(EnemyChar.Raptor, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 3.2, 10), ...waveSegment(EnemyChar.Spider, 2, 20)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor, 2), ...waveSegment(EnemyChar.Spider, 2.3, 24)],
        // // wave 5
        // [
        //     ...waveSegment(EnemyChar.Brigand, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Spider, 0.8, 20),
        // ],
        // // wave 5
        // [
        //     ...waveSegment(EnemyChar.Brigand, 2),
        //     ...waveSegment(EnemyChar.Raptor, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Spider, 0.8, 50),
        // ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Raptor, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 07
    [
        // wave 1
        waveSegment(EnemyChar.Orc, 4),
        // wave 2
        waveSegment(EnemyChar.Raptor, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // // wave 5
        // [
        //     ...waveSegment(EnemyChar.Brigand, 2),
        //     ...waveSegment(EnemyChar.Raptor, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Spider, 0.8, 50),
        // ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Raptor, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 08
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
    ],
    // stage 09
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
    ],
    // stage 10
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Warrior, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 11
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Warrior, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 12
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
    ],
    // stage 13
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
    ],
    // stage 14
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
    ],
    // stage 15
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
        [...waveSegment(EnemyChar.Raptor2, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
    ],
];

export const GAME_LEVELS: GameLevel[] = [
    {
        area: GameArea.Desert,
        level: 0,
        initialGold: 250,
        mapURL: mapURLs.desert,
        path: desertLevelPath,
        waves: STAGE_WAVES_DATA[0],
        initialCamPos: [18, 18, 62],
    },
    {
        area: GameArea.Desert,
        level: 1,
        initialGold: 260,
        mapURL: mapURLs.desert,
        path: desertLevelPath,
        waves: STAGE_WAVES_DATA[1],
        initialCamPos: [18, 18, 62],
    },
    {
        area: GameArea.Desert,
        level: 2,
        initialGold: 270,
        mapURL: mapURLs.desert,
        path: desertLevelPath,
        waves: STAGE_WAVES_DATA[2],
        initialCamPos: [18, 18, 62],
    },
    {
        area: GameArea.Desert,
        level: 3,
        initialGold: 250,
        mapURL: mapURLs.desert,
        path: desertLevelPath,
        waves: STAGE_WAVES_DATA[3],
        initialCamPos: [18, 18, 62],
    },
    {
        area: GameArea.Forest,
        level: 4,
        initialGold: 250,
        mapURL: mapURLs.forest,
        path: castleLevelPath,
        waves: STAGE_WAVES_DATA[4],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Forest,
        level: 5,
        initialGold: 250,
        mapURL: mapURLs.forest,
        path: castleLevelPath,
        waves: STAGE_WAVES_DATA[5],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Forest,
        level: 6,
        initialGold: 250,
        mapURL: mapURLs.forest,
        path: castleLevelPath,
        waves: STAGE_WAVES_DATA[6],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Forest,
        level: 7,
        initialGold: 250,
        mapURL: mapURLs.forest,
        path: castleLevelPath,
        waves: STAGE_WAVES_DATA[7],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Winter,
        level: 8,
        initialGold: 250,
        mapURL: mapURLs.winter,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Winter,
        level: 9,
        initialGold: 250,
        mapURL: mapURLs.winter,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Winter,
        level: 10,
        initialGold: 250,
        mapURL: mapURLs.winter,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Winter,
        level: 11,
        initialGold: 250,
        mapURL: mapURLs.winter,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Lava,
        level: 12,
        initialGold: 250,
        mapURL: mapURLs.lava,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Lava,
        level: 13,
        initialGold: 250,
        mapURL: mapURLs.lava,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Lava,
        level: 14,
        initialGold: 250,
        mapURL: mapURLs.lava,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [-22, 60, 96],
    },
    {
        area: GameArea.Lava,
        level: 15,
        initialGold: 250,
        mapURL: mapURLs.lava,
        path: villageLevelPath,
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [-22, 60, 96],
    },
];

function waveSegment(
    e: EnemyChar,
    interval = 2,
    enemyCount = 10,
    startSpawningAt = 0,
    xOffList = [0]
): [EnemyChar, number, number][] {
    // console.log("waveSegment", { e, enemyCount, interval, startSpawningAt, xOffList });

    return Array.from({ length: enemyCount }, (_, index) => [
        e,
        index * interval + startSpawningAt,
        xOffList[index % xOffList.length],
    ]);
}
