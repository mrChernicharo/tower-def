/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, EnemyType, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, ProjectileBluePrint, Skill, TowerBluePrint } from "./types";
import { THREE } from "../three";

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
    { id: 0, name: "desert" },
    { id: 1, name: "forest" },
    { id: 2, name: "winter" },
    { id: 3, name: "lava" },
] as const;

export const imgs = {
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
    purple: 0xb834d4,
    yellow: 0xfffc00,
    black: 0x000000,
    white: 0xffffff,
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
    damageMaterialStd: () => new THREE.MeshStandardMaterial({ color: "red" }),
    damageMaterialPhysical: () => new THREE.MeshStandardMaterial({ color: "red" }),
    concrete: () => new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    desert: () => new THREE.MeshMatcapMaterial({ color: COLORS.desert }),
    path: () => new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    concreteTransparent: () =>
        new THREE.MeshMatcapMaterial({
            color: COLORS.concrete,
            transparent: true,
            opacity: 0.5,
        }),
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
    projectileGizmo: () => new THREE.MeshToonMaterial({ color: 0x00ffff }),
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
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Raptor, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Raptor, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
        // wave 7
        [...waveSegment(EnemyChar.Raptor2, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
    ],

    // stage 06
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
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
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Raptor, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Raptor, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
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
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Raptor, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Raptor, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
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
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
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
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        ],
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
    ],
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

export const desertLevelPath = {
    points: [
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.98408508300781,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.971466064453125,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.9366569519043,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.88393020629883,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.81716537475586,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.73984146118164,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.65504837036133,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.565467834472656,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.473392486572266,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.380714416503906,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.2889289855957,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.19913864135742,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.11204528808594,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 39.0279541015625,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.946800231933594,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.86836624145508,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.792442321777344,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.71881103515625,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.64727783203125,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.57765579223633,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.50975799560547,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.44341278076172,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.37846374511719,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.31475067138672,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.25212860107422,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.190467834472656,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.129634857177734,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.06951904296875,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 38.01002883911133,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.95111846923828,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.89276885986328,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.83500289916992,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.77787780761719,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.72148513793945,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.66595458984375,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.6114501953125,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.55817413330078,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.50636672973633,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.456298828125,
        },
        {
            x: 4.473023414611816,
            y: 0.0,
            z: 37.40827941894531,
        },
        {
            x: 4.473022937774658,
            y: 0.0,
            z: 37.362613677978516,
        },
        {
            x: 4.473019123077393,
            y: 0.0,
            z: 37.3194580078125,
        },
        {
            x: 4.473006725311279,
            y: 0.0,
            z: 37.278778076171875,
        },
        {
            x: 4.4729766845703125,
            y: 0.0,
            z: 37.24032974243164,
        },
        {
            x: 4.472918510437012,
            y: 0.0,
            z: 37.20367431640625,
        },
        {
            x: 4.472817420959473,
            y: 0.0,
            z: 37.16816711425781,
        },
        {
            x: 4.47265625,
            y: 0.0,
            z: 37.132972717285156,
        },
        {
            x: 4.472415447235107,
            y: 0.0,
            z: 37.097049713134766,
        },
        {
            x: 4.472072124481201,
            y: 0.0,
            z: 37.05915832519531,
        },
        {
            x: 4.47160005569458,
            y: 0.0,
            z: 37.017852783203125,
        },
        {
            x: 4.47097110748291,
            y: 0.0,
            z: 36.971492767333984,
        },
        {
            x: 4.470154285430908,
            y: 0.0,
            z: 36.918243408203125,
        },
        {
            x: 4.469113826751709,
            y: 0.0,
            z: 36.85606002807617,
        },
        {
            x: 4.467811584472656,
            y: 0.0,
            z: 36.78285598754883,
        },
        {
            x: 4.466195583343506,
            y: 0.0,
            z: 36.69685363769531,
        },
        {
            x: 4.464202404022217,
            y: 0.0,
            z: 36.5966796875,
        },
        {
            x: 4.461755275726318,
            y: 0.0,
            z: 36.48137664794922,
        },
        {
            x: 4.458765029907227,
            y: 0.0,
            z: 36.35038757324219,
        },
        {
            x: 4.455129623413086,
            y: 0.0,
            z: 36.20357894897461,
        },
        {
            x: 4.450733184814453,
            y: 0.0,
            z: 36.04121017456055,
        },
        {
            x: 4.445448398590088,
            y: 0.0,
            z: 35.86396789550781,
        },
        {
            x: 4.439134120941162,
            y: 0.0,
            z: 35.67292785644531,
        },
        {
            x: 4.431636810302734,
            y: 0.0,
            z: 35.46959686279297,
        },
        {
            x: 4.422790050506592,
            y: 0.0,
            z: 35.25587844848633,
        },
        {
            x: 4.412414073944092,
            y: 0.0,
            z: 35.034080505371094,
        },
        {
            x: 4.400318622589111,
            y: 0.0,
            z: 34.80693054199219,
        },
        {
            x: 4.386337757110596,
            y: 0.0,
            z: 34.57729721069336,
        },
        {
            x: 4.370394706726074,
            y: 0.0,
            z: 34.347801208496094,
        },
        {
            x: 4.3525166511535645,
            y: 0.0,
            z: 34.12071228027344,
        },
        {
            x: 4.332831859588623,
            y: 0.0,
            z: 33.897953033447266,
        },
        {
            x: 4.311570644378662,
            y: 0.0,
            z: 33.68110656738281,
        },
        {
            x: 4.289066791534424,
            y: 0.0,
            z: 33.47140121459961,
        },
        {
            x: 4.265756130218506,
            y: 0.0,
            z: 33.269737243652344,
        },
        {
            x: 4.242175579071045,
            y: 0.0,
            z: 33.07665252685547,
        },
        {
            x: 4.218966007232666,
            y: 0.0,
            z: 32.89235305786133,
        },
        {
            x: 4.196869373321533,
            y: 0.0,
            z: 32.71669006347656,
        },
        {
            x: 4.176730632781982,
            y: 0.0,
            z: 32.54917907714844,
        },
        {
            x: 4.159496784210205,
            y: 0.0,
            z: 32.38898468017578,
        },
        {
            x: 4.146213531494141,
            y: 0.0,
            z: 32.23493957519531,
        },
        {
            x: 4.137962341308594,
            y: 0.0,
            z: 32.08576583862305,
        },
        {
            x: 4.135781764984131,
            y: 0.0,
            z: 31.940353393554688,
        },
        {
            x: 4.140655517578125,
            y: 0.0,
            z: 31.797805786132812,
        },
        {
            x: 4.153512477874756,
            y: 0.0,
            z: 31.657424926757812,
        },
        {
            x: 4.175227642059326,
            y: 0.0,
            z: 31.51872444152832,
        },
        {
            x: 4.206622123718262,
            y: 0.0,
            z: 31.38142204284668,
        },
        {
            x: 4.2484612464904785,
            y: 0.0,
            z: 31.24544334411621,
        },
        {
            x: 4.301456928253174,
            y: 0.0,
            z: 31.110919952392578,
        },
        {
            x: 4.36626672744751,
            y: 0.0,
            z: 30.978195190429688,
        },
        {
            x: 4.443493843078613,
            y: 0.0,
            z: 30.84781265258789,
        },
        {
            x: 4.533686637878418,
            y: 0.0,
            z: 30.720523834228516,
        },
        {
            x: 4.637339115142822,
            y: 0.0,
            z: 30.5972900390625,
        },
        {
            x: 4.754894256591797,
            y: 0.0,
            z: 30.47926139831543,
        },
        {
            x: 4.886771202087402,
            y: 0.0,
            z: 30.367603302001953,
        },
        {
            x: 5.03339147567749,
            y: 0.0,
            z: 30.263343811035156,
        },
        {
            x: 5.195183277130127,
            y: 0.0,
            z: 30.167339324951172,
        },
        {
            x: 5.372579097747803,
            y: 0.0,
            z: 30.08029556274414,
        },
        {
            x: 5.566017150878906,
            y: 0.0,
            z: 30.002758026123047,
        },
        {
            x: 5.775941848754883,
            y: 0.0,
            z: 29.93511199951172,
        },
        {
            x: 6.002800941467285,
            y: 0.0,
            z: 29.877580642700195,
        },
        {
            x: 6.247049808502197,
            y: 0.0,
            z: 29.83023452758789,
        },
        {
            x: 6.509147644042969,
            y: 0.0,
            z: 29.792980194091797,
        },
        {
            x: 6.789560317993164,
            y: 0.0,
            z: 29.76556396484375,
        },
        {
            x: 7.088757038116455,
            y: 0.0,
            z: 29.747575759887695,
        },
        {
            x: 7.407217025756836,
            y: 0.0,
            z: 29.738445281982422,
        },
        {
            x: 7.74538516998291,
            y: 0.0,
            z: 29.737457275390625,
        },
        {
            x: 8.103476524353027,
            y: 0.0,
            z: 29.74382781982422,
        },
        {
            x: 8.481319427490234,
            y: 0.0,
            z: 29.756793975830078,
        },
        {
            x: 8.878350257873535,
            y: 0.0,
            z: 29.775577545166016,
        },
        {
            x: 9.29361343383789,
            y: 0.0,
            z: 29.799402236938477,
        },
        {
            x: 9.725761413574219,
            y: 0.0,
            z: 29.827512741088867,
        },
        {
            x: 10.173055648803711,
            y: 0.0,
            z: 29.859142303466797,
        },
        {
            x: 10.633365631103516,
            y: 0.0,
            z: 29.893535614013672,
        },
        {
            x: 11.104166030883789,
            y: 0.0,
            z: 29.9299373626709,
        },
        {
            x: 11.582545280456543,
            y: 0.0,
            z: 29.967594146728516,
        },
        {
            x: 12.065195083618164,
            y: 0.0,
            z: 30.00576400756836,
        },
        {
            x: 12.548418045043945,
            y: 0.0,
            z: 30.043697357177734,
        },
        {
            x: 13.028121948242188,
            y: 0.0,
            z: 30.08065414428711,
        },
        {
            x: 13.499944686889648,
            y: 0.0,
            z: 30.115909576416016,
        },
        {
            x: 13.959784507751465,
            y: 0.0,
            z: 30.148757934570312,
        },
        {
            x: 14.40408706665039,
            y: 0.0,
            z: 30.178544998168945,
        },
        {
            x: 14.82983684539795,
            y: 0.0,
            z: 30.204662322998047,
        },
        {
            x: 15.234572410583496,
            y: 0.0,
            z: 30.226547241210938,
        },
        {
            x: 15.616375923156738,
            y: 0.0,
            z: 30.243677139282227,
        },
        {
            x: 15.97387981414795,
            y: 0.0,
            z: 30.25557518005371,
        },
        {
            x: 16.306262969970703,
            y: 0.0,
            z: 30.261810302734375,
        },
        {
            x: 16.613250732421875,
            y: 0.0,
            z: 30.26199722290039,
        },
        {
            x: 16.895112991333008,
            y: 0.0,
            z: 30.255794525146484,
        },
        {
            x: 17.152679443359375,
            y: 0.0,
            z: 30.24290657043457,
        },
        {
            x: 17.387313842773438,
            y: 0.0,
            z: 30.223079681396484,
        },
        {
            x: 17.60093116760254,
            y: 0.0,
            z: 30.19610595703125,
        },
        {
            x: 17.795852661132812,
            y: 0.0,
            z: 30.161819458007812,
        },
        {
            x: 17.974334716796875,
            y: 0.0,
            z: 30.12008285522461,
        },
        {
            x: 18.138408660888672,
            y: 0.0,
            z: 30.070785522460938,
        },
        {
            x: 18.289875030517578,
            y: 0.0,
            z: 30.013839721679688,
        },
        {
            x: 18.43030548095703,
            y: 0.0,
            z: 29.949188232421875,
        },
        {
            x: 18.56103515625,
            y: 0.0,
            z: 29.87678337097168,
        },
        {
            x: 18.68317222595215,
            y: 0.0,
            z: 29.7966251373291,
        },
        {
            x: 18.797590255737305,
            y: 0.0,
            z: 29.708723068237305,
        },
        {
            x: 18.90494155883789,
            y: 0.0,
            z: 29.613113403320312,
        },
        {
            x: 19.005634307861328,
            y: 0.0,
            z: 29.50986099243164,
        },
        {
            x: 19.0998592376709,
            y: 0.0,
            z: 29.3990535736084,
        },
        {
            x: 19.187562942504883,
            y: 0.0,
            z: 29.280807495117188,
        },
        {
            x: 19.268474578857422,
            y: 0.0,
            z: 29.155261993408203,
        },
        {
            x: 19.342174530029297,
            y: 0.0,
            z: 29.022602081298828,
        },
        {
            x: 19.408306121826172,
            y: 0.0,
            z: 28.88313102722168,
        },
        {
            x: 19.466632843017578,
            y: 0.0,
            z: 28.737266540527344,
        },
        {
            x: 19.517024993896484,
            y: 0.0,
            z: 28.585556030273438,
        },
        {
            x: 19.55946922302246,
            y: 0.0,
            z: 28.428665161132812,
        },
        {
            x: 19.594066619873047,
            y: 0.0,
            z: 28.267391204833984,
        },
        {
            x: 19.621036529541016,
            y: 0.0,
            z: 28.102642059326172,
        },
        {
            x: 19.640708923339844,
            y: 0.0,
            z: 27.935462951660156,
        },
        {
            x: 19.65353012084961,
            y: 0.0,
            z: 27.767013549804688,
        },
        {
            x: 19.660058975219727,
            y: 0.0,
            z: 27.59857940673828,
        },
        {
            x: 19.660974502563477,
            y: 0.0,
            z: 27.431568145751953,
        },
        {
            x: 19.657058715820312,
            y: 0.0,
            z: 27.267513275146484,
        },
        {
            x: 19.649219512939453,
            y: 0.0,
            z: 27.10806655883789,
        },
        {
            x: 19.638378143310547,
            y: 0.0,
            z: 26.954830169677734,
        },
        {
            x: 19.625362396240234,
            y: 0.0,
            z: 26.80908203125,
        },
        {
            x: 19.61085319519043,
            y: 0.0,
            z: 26.67173194885254,
        },
        {
            x: 19.595394134521484,
            y: 0.0,
            z: 26.543315887451172,
        },
        {
            x: 19.579402923583984,
            y: 0.0,
            z: 26.423999786376953,
        },
        {
            x: 19.563156127929688,
            y: 0.0,
            z: 26.31356430053711,
        },
        {
            x: 19.546798706054688,
            y: 0.0,
            z: 26.211441040039062,
        },
        {
            x: 19.53033447265625,
            y: 0.0,
            z: 26.116666793823242,
        },
        {
            x: 19.513633728027344,
            y: 0.0,
            z: 26.027923583984375,
        },
        {
            x: 19.496440887451172,
            y: 0.0,
            z: 25.943506240844727,
        },
        {
            x: 19.478351593017578,
            y: 0.0,
            z: 25.861347198486328,
        },
        {
            x: 19.458831787109375,
            y: 0.0,
            z: 25.779001235961914,
        },
        {
            x: 19.437225341796875,
            y: 0.0,
            z: 25.693675994873047,
        },
        {
            x: 19.412845611572266,
            y: 0.0,
            z: 25.6025333404541,
        },
        {
            x: 19.38515853881836,
            y: 0.0,
            z: 25.503070831298828,
        },
        {
            x: 19.35375213623047,
            y: 0.0,
            z: 25.393165588378906,
        },
        {
            x: 19.31836700439453,
            y: 0.0,
            z: 25.271080017089844,
        },
        {
            x: 19.278888702392578,
            y: 0.0,
            z: 25.135456085205078,
        },
        {
            x: 19.23534393310547,
            y: 0.0,
            z: 24.985321044921875,
        },
        {
            x: 19.187910079956055,
            y: 0.0,
            z: 24.82007598876953,
        },
        {
            x: 19.136899948120117,
            y: 0.0,
            z: 24.639511108398438,
        },
        {
            x: 19.082775115966797,
            y: 0.0,
            z: 24.443798065185547,
        },
        {
            x: 19.026138305664062,
            y: 0.0,
            z: 24.233488082885742,
        },
        {
            x: 18.967742919921875,
            y: 0.0,
            z: 24.009510040283203,
        },
        {
            x: 18.908477783203125,
            y: 0.0,
            z: 23.773181915283203,
        },
        {
            x: 18.849369049072266,
            y: 0.0,
            z: 23.526172637939453,
        },
        {
            x: 18.79144287109375,
            y: 0.0,
            z: 23.27027702331543,
        },
        {
            x: 18.735614776611328,
            y: 0.0,
            z: 23.007186889648438,
        },
        {
            x: 18.68268394470215,
            y: 0.0,
            z: 22.738487243652344,
        },
        {
            x: 18.633331298828125,
            y: 0.0,
            z: 22.46565055847168,
        },
        {
            x: 18.588117599487305,
            y: 0.0,
            z: 22.190032958984375,
        },
        {
            x: 18.54747772216797,
            y: 0.0,
            z: 21.912891387939453,
        },
        {
            x: 18.511737823486328,
            y: 0.0,
            z: 21.635351181030273,
        },
        {
            x: 18.481094360351562,
            y: 0.0,
            z: 21.358440399169922,
        },
        {
            x: 18.455631256103516,
            y: 0.0,
            z: 21.08307456970215,
        },
        {
            x: 18.435314178466797,
            y: 0.0,
            z: 20.81005859375,
        },
        {
            x: 18.419984817504883,
            y: 0.0,
            z: 20.540071487426758,
        },
        {
            x: 18.409366607666016,
            y: 0.0,
            z: 20.273693084716797,
        },
        {
            x: 18.403072357177734,
            y: 0.0,
            z: 20.011396408081055,
        },
        {
            x: 18.400636672973633,
            y: 0.0,
            z: 19.753570556640625,
        },
        {
            x: 18.401535034179688,
            y: 0.0,
            z: 19.500537872314453,
        },
        {
            x: 18.405200958251953,
            y: 0.0,
            z: 19.2525634765625,
        },
        {
            x: 18.411006927490234,
            y: 0.0,
            z: 19.009851455688477,
        },
        {
            x: 18.418277740478516,
            y: 0.0,
            z: 18.772539138793945,
        },
        {
            x: 18.426284790039062,
            y: 0.0,
            z: 18.540700912475586,
        },
        {
            x: 18.434249877929688,
            y: 0.0,
            z: 18.314359664916992,
        },
        {
            x: 18.44133758544922,
            y: 0.0,
            z: 18.093461990356445,
        },
        {
            x: 18.4466609954834,
            y: 0.0,
            z: 17.877901077270508,
        },
        {
            x: 18.449283599853516,
            y: 0.0,
            z: 17.667509078979492,
        },
        {
            x: 18.448223114013672,
            y: 0.0,
            z: 17.46204376220703,
        },
        {
            x: 18.442428588867188,
            y: 0.0,
            z: 17.26121711730957,
        },
        {
            x: 18.430824279785156,
            y: 0.0,
            z: 17.06468963623047,
        },
        {
            x: 18.412376403808594,
            y: 0.0,
            z: 16.872146606445312,
        },
        {
            x: 18.386110305786133,
            y: 0.0,
            z: 16.683347702026367,
        },
        {
            x: 18.351131439208984,
            y: 0.0,
            z: 16.49811553955078,
        },
        {
            x: 18.306612014770508,
            y: 0.0,
            z: 16.316341400146484,
        },
        {
            x: 18.251800537109375,
            y: 0.0,
            z: 16.137981414794922,
        },
        {
            x: 18.18601417541504,
            y: 0.0,
            z: 15.963056564331055,
        },
        {
            x: 18.108646392822266,
            y: 0.0,
            z: 15.791666030883789,
        },
        {
            x: 18.019155502319336,
            y: 0.0,
            z: 15.623966217041016,
        },
        {
            x: 17.917083740234375,
            y: 0.0,
            z: 15.460182189941406,
        },
        {
            x: 17.802034378051758,
            y: 0.0,
            z: 15.300601959228516,
        },
        {
            x: 17.673686981201172,
            y: 0.0,
            z: 15.145593643188477,
        },
        {
            x: 17.53179359436035,
            y: 0.0,
            z: 14.99557876586914,
        },
        {
            x: 17.376174926757812,
            y: 0.0,
            z: 14.851041793823242,
        },
        {
            x: 17.206737518310547,
            y: 0.0,
            z: 14.71245002746582,
        },
        {
            x: 17.023456573486328,
            y: 0.0,
            z: 14.580268859863281,
        },
        {
            x: 16.826383590698242,
            y: 0.0,
            z: 14.454931259155273,
        },
        {
            x: 16.615652084350586,
            y: 0.0,
            z: 14.33686637878418,
        },
        {
            x: 16.3914737701416,
            y: 0.0,
            z: 14.226463317871094,
        },
        {
            x: 16.154129028320312,
            y: 0.0,
            z: 14.124120712280273,
        },
        {
            x: 15.903985023498535,
            y: 0.0,
            z: 14.030193328857422,
        },
        {
            x: 15.641478538513184,
            y: 0.0,
            z: 13.945026397705078,
        },
        {
            x: 15.367125511169434,
            y: 0.0,
            z: 13.86895751953125,
        },
        {
            x: 15.081522941589355,
            y: 0.0,
            z: 13.802291870117188,
        },
        {
            x: 14.785340309143066,
            y: 0.0,
            z: 13.745311737060547,
        },
        {
            x: 14.47932243347168,
            y: 0.0,
            z: 13.698297500610352,
        },
        {
            x: 14.164290428161621,
            y: 0.0,
            z: 13.661489486694336,
        },
        {
            x: 13.841095924377441,
            y: 0.0,
            z: 13.635116577148438,
        },
        {
            x: 13.510644912719727,
            y: 0.0,
            z: 13.619365692138672,
        },
        {
            x: 13.173872947692871,
            y: 0.0,
            z: 13.614383697509766,
        },
        {
            x: 12.831758499145508,
            y: 0.0,
            z: 13.620294570922852,
        },
        {
            x: 12.485321998596191,
            y: 0.0,
            z: 13.637191772460938,
        },
        {
            x: 12.135622024536133,
            y: 0.0,
            z: 13.66512680053711,
        },
        {
            x: 11.783757209777832,
            y: 0.0,
            z: 13.704132080078125,
        },
        {
            x: 11.430864334106445,
            y: 0.0,
            z: 13.754194259643555,
        },
        {
            x: 11.078119277954102,
            y: 0.0,
            z: 13.815275192260742,
        },
        {
            x: 10.726744651794434,
            y: 0.0,
            z: 13.887300491333008,
        },
        {
            x: 10.377992630004883,
            y: 0.0,
            z: 13.970174789428711,
        },
        {
            x: 10.033159255981445,
            y: 0.0,
            z: 14.063753128051758,
        },
        {
            x: 9.693459510803223,
            y: 0.0,
            z: 14.167804718017578,
        },
        {
            x: 9.359861373901367,
            y: 0.0,
            z: 14.281942367553711,
        },
        {
            x: 9.033055305480957,
            y: 0.0,
            z: 14.405572891235352,
        },
        {
            x: 8.713447570800781,
            y: 0.0,
            z: 14.537948608398438,
        },
        {
            x: 8.401166915893555,
            y: 0.0,
            z: 14.678098678588867,
        },
        {
            x: 8.096063613891602,
            y: 0.0,
            z: 14.82489013671875,
        },
        {
            x: 7.797707557678223,
            y: 0.0,
            z: 14.97700309753418,
        },
        {
            x: 7.505388259887695,
            y: 0.0,
            z: 15.1329345703125,
        },
        {
            x: 7.2181172370910645,
            y: 0.0,
            z: 15.29098129272461,
        },
        {
            x: 6.934624195098877,
            y: 0.0,
            z: 15.449274063110352,
        },
        {
            x: 6.653362274169922,
            y: 0.0,
            z: 15.605741500854492,
        },
        {
            x: 6.372500896453857,
            y: 0.0,
            z: 15.75814437866211,
        },
        {
            x: 6.089956283569336,
            y: 0.0,
            z: 15.904056549072266,
        },
        {
            x: 5.803670883178711,
            y: 0.0,
            z: 16.04108238220215,
        },
        {
            x: 5.511960983276367,
            y: 0.0,
            z: 16.167070388793945,
        },
        {
            x: 5.213551044464111,
            y: 0.0,
            z: 16.280136108398438,
        },
        {
            x: 4.9075727462768555,
            y: 0.0,
            z: 16.378671646118164,
        },
        {
            x: 4.593569278717041,
            y: 0.0,
            z: 16.46133041381836,
        },
        {
            x: 4.271490573883057,
            y: 0.0,
            z: 16.52704620361328,
        },
        {
            x: 3.9416956901550293,
            y: 0.0,
            z: 16.57501792907715,
        },
        {
            x: 3.604952812194824,
            y: 0.0,
            z: 16.604724884033203,
        },
        {
            x: 3.262439250946045,
            y: 0.0,
            z: 16.615903854370117,
        },
        {
            x: 2.915740966796875,
            y: 0.0,
            z: 16.608570098876953,
        },
        {
            x: 2.56685209274292,
            y: 0.0,
            z: 16.583011627197266,
        },
        {
            x: 2.2181763648986816,
            y: 0.0,
            z: 16.539783477783203,
        },
        {
            x: 1.8724792003631592,
            y: 0.0,
            z: 16.479694366455078,
        },
        {
            x: 1.5324783325195312,
            y: 0.0,
            z: 16.403705596923828,
        },
        {
            x: 1.200488805770874,
            y: 0.0,
            z: 16.31281852722168,
        },
        {
            x: 0.8784012794494629,
            y: 0.0,
            z: 16.20806884765625,
        },
        {
            x: 0.5676789283752441,
            y: 0.0,
            z: 16.090530395507812,
        },
        {
            x: 0.2693610191345215,
            y: 0.0,
            z: 15.961320877075195,
        },
        {
            x: -0.015943527221679688,
            y: 0.0,
            z: 15.821588516235352,
        },
        {
            x: -0.28804731369018555,
            y: 0.0,
            z: 15.672523498535156,
        },
        {
            x: -0.5471925735473633,
            y: 0.0,
            z: 15.515340805053711,
        },
        {
            x: -0.7940459251403809,
            y: 0.0,
            z: 15.351312637329102,
        },
        {
            x: -1.0297012329101562,
            y: 0.0,
            z: 15.181734085083008,
        },
        {
            x: -1.2556772232055664,
            y: 0.0,
            z: 15.007944107055664,
        },
        {
            x: -1.473921775817871,
            y: 0.0,
            z: 14.831308364868164,
        },
        {
            x: -1.686744213104248,
            y: 0.0,
            z: 14.653230667114258,
        },
        {
            x: -1.8964624404907227,
            y: 0.0,
            z: 14.475044250488281,
        },
        {
            x: -2.1051697731018066,
            y: 0.0,
            z: 14.2979736328125,
        },
        {
            x: -2.314736843109131,
            y: 0.0,
            z: 14.123104095458984,
        },
        {
            x: -2.526797294616699,
            y: 0.0,
            z: 13.95142936706543,
        },
        {
            x: -2.742758274078369,
            y: 0.0,
            z: 13.7838134765625,
        },
        {
            x: -2.9637975692749023,
            y: 0.0,
            z: 13.620994567871094,
        },
        {
            x: -3.1908607482910156,
            y: 0.0,
            z: 13.463613510131836,
        },
        {
            x: -3.4246649742126465,
            y: 0.0,
            z: 13.312171936035156,
        },
        {
            x: -3.6656980514526367,
            y: 0.0,
            z: 13.167064666748047,
        },
        {
            x: -3.914217948913574,
            y: 0.0,
            z: 13.028564453125,
        },
        {
            x: -4.170249938964844,
            y: 0.0,
            z: 12.896827697753906,
        },
        {
            x: -4.433594703674316,
            y: 0.0,
            z: 12.771894454956055,
        },
        {
            x: -4.703859329223633,
            y: 0.0,
            z: 12.65369987487793,
        },
        {
            x: -4.9806365966796875,
            y: 0.0,
            z: 12.54220199584961,
        },
        {
            x: -5.263584136962891,
            y: 0.0,
            z: 12.437368392944336,
        },
        {
            x: -5.552417755126953,
            y: 0.0,
            z: 12.339231491088867,
        },
        {
            x: -5.846916198730469,
            y: 0.0,
            z: 12.24786376953125,
        },
        {
            x: -6.146925926208496,
            y: 0.0,
            z: 12.163373947143555,
        },
        {
            x: -6.452350616455078,
            y: 0.0,
            z: 12.085916519165039,
        },
        {
            x: -6.763161659240723,
            y: 0.0,
            z: 12.015684127807617,
        },
        {
            x: -7.0793914794921875,
            y: 0.0,
            z: 11.952917098999023,
        },
        {
            x: -7.401134490966797,
            y: 0.0,
            z: 11.897905349731445,
        },
        {
            x: -7.728549003601074,
            y: 0.0,
            z: 11.850971221923828,
        },
        {
            x: -8.061858177185059,
            y: 0.0,
            z: 11.812471389770508,
        },
        {
            x: -8.401347160339355,
            y: 0.0,
            z: 11.782825469970703,
        },
        {
            x: -8.747310638427734,
            y: 0.0,
            z: 11.762441635131836,
        },
        {
            x: -9.099936485290527,
            y: 0.0,
            z: 11.751579284667969,
        },
        {
            x: -9.459227561950684,
            y: 0.0,
            z: 11.750341415405273,
        },
        {
            x: -9.825037956237793,
            y: 0.0,
            z: 11.75864028930664,
        },
        {
            x: -10.197053909301758,
            y: 0.0,
            z: 11.776201248168945,
        },
        {
            x: -10.574790954589844,
            y: 0.0,
            z: 11.802589416503906,
        },
        {
            x: -10.957597732543945,
            y: 0.0,
            z: 11.83718490600586,
        },
        {
            x: -11.344666481018066,
            y: 0.0,
            z: 11.879179000854492,
        },
        {
            x: -11.735020637512207,
            y: 0.0,
            z: 11.927593231201172,
        },
        {
            x: -12.127507209777832,
            y: 0.0,
            z: 11.98127555847168,
        },
        {
            x: -12.52082347869873,
            y: 0.0,
            z: 12.038883209228516,
        },
        {
            x: -12.913506507873535,
            y: 0.0,
            z: 12.098896026611328,
        },
        {
            x: -13.303894996643066,
            y: 0.0,
            z: 12.159624099731445,
        },
        {
            x: -13.690285682678223,
            y: 0.0,
            z: 12.219289779663086,
        },
        {
            x: -14.071066856384277,
            y: 0.0,
            z: 12.27615737915039,
        },
        {
            x: -14.44477367401123,
            y: 0.0,
            z: 12.328641891479492,
        },
        {
            x: -14.810078620910645,
            y: 0.0,
            z: 12.375255584716797,
        },
        {
            x: -15.165810585021973,
            y: 0.0,
            z: 12.414604187011719,
        },
        {
            x: -15.510931968688965,
            y: 0.0,
            z: 12.4454345703125,
        },
        {
            x: -15.844555854797363,
            y: 0.0,
            z: 12.46660041809082,
        },
        {
            x: -16.165935516357422,
            y: 0.0,
            z: 12.477056503295898,
        },
        {
            x: -16.474472045898438,
            y: 0.0,
            z: 12.475875854492188,
        },
        {
            x: -16.769718170166016,
            y: 0.0,
            z: 12.46224594116211,
        },
        {
            x: -17.051353454589844,
            y: 0.0,
            z: 12.43545913696289,
        },
        {
            x: -17.3192138671875,
            y: 0.0,
            z: 12.394943237304688,
        },
        {
            x: -17.573284149169922,
            y: 0.0,
            z: 12.340206146240234,
        },
        {
            x: -17.813621520996094,
            y: 0.0,
            z: 12.270832061767578,
        },
        {
            x: -18.040313720703125,
            y: 0.0,
            z: 12.18636703491211,
        },
        {
            x: -18.253433227539062,
            y: 0.0,
            z: 12.086324691772461,
        },
        {
            x: -18.45306396484375,
            y: 0.0,
            z: 11.97016716003418,
        },
        {
            x: -18.639286041259766,
            y: 0.0,
            z: 11.837331771850586,
        },
        {
            x: -18.812171936035156,
            y: 0.0,
            z: 11.687204360961914,
        },
        {
            x: -18.971813201904297,
            y: 0.0,
            z: 11.51913833618164,
        },
        {
            x: -19.11827850341797,
            y: 0.0,
            z: 11.332437515258789,
        },
        {
            x: -19.25164794921875,
            y: 0.0,
            z: 11.126373291015625,
        },
        {
            x: -19.372013092041016,
            y: 0.0,
            z: 10.900171279907227,
        },
        {
            x: -19.47943878173828,
            y: 0.0,
            z: 10.653022766113281,
        },
        {
            x: -19.57400894165039,
            y: 0.0,
            z: 10.384078979492188,
        },
        {
            x: -19.655811309814453,
            y: 0.0,
            z: 10.092458724975586,
        },
        {
            x: -19.724971771240234,
            y: 0.0,
            z: 9.777528762817383,
        },
        {
            x: -19.781719207763672,
            y: 0.0,
            z: 9.439153671264648,
        },
        {
            x: -19.826377868652344,
            y: 0.0,
            z: 9.077733993530273,
        },
        {
            x: -19.859386444091797,
            y: 0.0,
            z: 8.694219589233398,
        },
        {
            x: -19.881282806396484,
            y: 0.0,
            z: 8.290079116821289,
        },
        {
            x: -19.89269256591797,
            y: 0.0,
            z: 7.867340087890625,
        },
        {
            x: -19.894359588623047,
            y: 0.0,
            z: 7.428558349609375,
        },
        {
            x: -19.88711929321289,
            y: 0.0,
            z: 6.976829528808594,
        },
        {
            x: -19.871917724609375,
            y: 0.0,
            z: 6.515781402587891,
        },
        {
            x: -19.849796295166016,
            y: 0.0,
            z: 6.049591064453125,
        },
        {
            x: -19.821903228759766,
            y: 0.0,
            z: 5.5829620361328125,
        },
        {
            x: -19.78948211669922,
            y: 0.0,
            z: 5.121143341064453,
        },
        {
            x: -19.753864288330078,
            y: 0.0,
            z: 4.669834136962891,
        },
        {
            x: -19.71627426147461,
            y: 0.0,
            z: 4.234489440917969,
        },
        {
            x: -19.67770004272461,
            y: 0.0,
            z: 3.8197555541992188,
        },
        {
            x: -19.638858795166016,
            y: 0.0,
            z: 3.429412841796875,
        },
        {
            x: -19.600223541259766,
            y: 0.0,
            z: 3.066417694091797,
        },
        {
            x: -19.562000274658203,
            y: 0.0,
            z: 2.7328567504882812,
        },
        {
            x: -19.52414321899414,
            y: 0.0,
            z: 2.4299697875976562,
        },
        {
            x: -19.48635482788086,
            y: 0.0,
            z: 2.1581573486328125,
        },
        {
            x: -19.448078155517578,
            y: 0.0,
            z: 1.9169464111328125,
        },
        {
            x: -19.408493041992188,
            y: 0.0,
            z: 1.7050361633300781,
        },
        {
            x: -19.366527557373047,
            y: 0.0,
            z: 1.5202598571777344,
        },
        {
            x: -19.32085418701172,
            y: 0.0,
            z: 1.3596229553222656,
        },
        {
            x: -19.269886016845703,
            y: 0.0,
            z: 1.2192497253417969,
        },
        {
            x: -19.211822509765625,
            y: 0.0,
            z: 1.0945777893066406,
        },
        {
            x: -19.14482879638672,
            y: 0.0,
            z: 0.9811515808105469,
        },
        {
            x: -19.067180633544922,
            y: 0.0,
            z: 0.8750762939453125,
        },
        {
            x: -18.977249145507812,
            y: 0.0,
            z: 0.7730560302734375,
        },
        {
            x: -18.87350845336914,
            y: 0.0,
            z: 0.6724090576171875,
        },
        {
            x: -18.754531860351562,
            y: 0.0,
            z: 0.5710296630859375,
        },
        {
            x: -18.619003295898438,
            y: 0.0,
            z: 0.4674186706542969,
        },
        {
            x: -18.465702056884766,
            y: 0.0,
            z: 0.36066436767578125,
        },
        {
            x: -18.29351043701172,
            y: 0.0,
            z: 0.2504844665527344,
        },
        {
            x: -18.101409912109375,
            y: 0.0,
            z: 0.13714599609375,
        },
        {
            x: -17.88848876953125,
            y: 0.0,
            z: 0.02153778076171875,
        },
        {
            x: -17.653934478759766,
            y: 0.0,
            z: -0.09484100341796875,
        },
        {
            x: -17.39704132080078,
            y: 0.0,
            z: -0.209930419921875,
        },
        {
            x: -17.117225646972656,
            y: 0.0,
            z: -0.3212013244628906,
        },
        {
            x: -16.814163208007812,
            y: 0.0,
            z: -0.4263038635253906,
        },
        {
            x: -16.487804412841797,
            y: 0.0,
            z: -0.5233192443847656,
        },
        {
            x: -16.138404846191406,
            y: 0.0,
            z: -0.6107444763183594,
        },
        {
            x: -15.766510963439941,
            y: 0.0,
            z: -0.6875381469726562,
        },
        {
            x: -15.372963905334473,
            y: 0.0,
            z: -0.7530593872070312,
        },
        {
            x: -14.958897590637207,
            y: 0.0,
            z: -0.8071250915527344,
        },
        {
            x: -14.525736808776855,
            y: 0.0,
            z: -0.8499679565429688,
        },
        {
            x: -14.075207710266113,
            y: 0.0,
            z: -0.8822708129882812,
        },
        {
            x: -13.609320640563965,
            y: 0.0,
            z: -0.9051284790039062,
        },
        {
            x: -13.130389213562012,
            y: 0.0,
            z: -0.9200897216796875,
        },
        {
            x: -12.641011238098145,
            y: 0.0,
            z: -0.9291152954101562,
        },
        {
            x: -12.144089698791504,
            y: 0.0,
            z: -0.9346275329589844,
        },
        {
            x: -11.642708778381348,
            y: 0.0,
            z: -0.9392929077148438,
        },
        {
            x: -11.139898300170898,
            y: 0.0,
            z: -0.9457130432128906,
        },
        {
            x: -10.638545036315918,
            y: 0.0,
            z: -0.9562301635742188,
        },
        {
            x: -10.141385078430176,
            y: 0.0,
            z: -0.9729881286621094,
        },
        {
            x: -9.651008605957031,
            y: 0.0,
            z: -0.99786376953125,
        },
        {
            x: -9.169868469238281,
            y: 0.0,
            z: -1.0325431823730469,
        },
        {
            x: -8.700262069702148,
            y: 0.0,
            z: -1.078460693359375,
        },
        {
            x: -8.244348526000977,
            y: 0.0,
            z: -1.1368293762207031,
        },
        {
            x: -7.804139137268066,
            y: 0.0,
            z: -1.2086296081542969,
        },
        {
            x: -7.381500244140625,
            y: 0.0,
            z: -1.2946128845214844,
        },
        {
            x: -6.978151321411133,
            y: 0.0,
            z: -1.3953132629394531,
        },
        {
            x: -6.595669746398926,
            y: 0.0,
            z: -1.5110206604003906,
        },
        {
            x: -6.235476493835449,
            y: 0.0,
            z: -1.6418190002441406,
        },
        {
            x: -5.898833274841309,
            y: 0.0,
            z: -1.787567138671875,
        },
        {
            x: -5.586678504943848,
            y: 0.0,
            z: -1.9481201171875,
        },
        {
            x: -5.299720764160156,
            y: 0.0,
            z: -2.1232032775878906,
        },
        {
            x: -5.038315773010254,
            y: 0.0,
            z: -2.312541961669922,
        },
        {
            x: -4.802585601806641,
            y: 0.0,
            z: -2.5157737731933594,
        },
        {
            x: -4.592310905456543,
            y: 0.0,
            z: -2.732501983642578,
        },
        {
            x: -4.407029151916504,
            y: 0.0,
            z: -2.9622421264648438,
        },
        {
            x: -4.245944976806641,
            y: 0.0,
            z: -3.2045021057128906,
        },
        {
            x: -4.108007431030273,
            y: 0.0,
            z: -3.45867919921875,
        },
        {
            x: -3.9918460845947266,
            y: 0.0,
            z: -3.7241744995117188,
        },
        {
            x: -3.8958263397216797,
            y: 0.0,
            z: -4.000270843505859,
        },
        {
            x: -3.8179931640625,
            y: 0.0,
            z: -4.2862548828125,
        },
        {
            x: -3.7561416625976562,
            y: 0.0,
            z: -4.581302642822266,
        },
        {
            x: -3.7079334259033203,
            y: 0.0,
            z: -4.8846588134765625,
        },
        {
            x: -3.6711902618408203,
            y: 0.0,
            z: -5.195598602294922,
        },
        {
            x: -3.6439075469970703,
            y: 0.0,
            z: -5.513557434082031,
        },
        {
            x: -3.6242637634277344,
            y: 0.0,
            z: -5.838031768798828,
        },
        {
            x: -3.610616683959961,
            y: 0.0,
            z: -6.168659210205078,
        },
        {
            x: -3.601506233215332,
            y: 0.0,
            z: -6.5051422119140625,
        },
        {
            x: -3.5956525802612305,
            y: 0.0,
            z: -6.847343444824219,
        },
        {
            x: -3.591958999633789,
            y: 0.0,
            z: -7.195159912109375,
        },
        {
            x: -3.589506149291992,
            y: 0.0,
            z: -7.548675537109375,
        },
        {
            x: -3.587557792663574,
            y: 0.0,
            z: -7.907989501953125,
        },
        {
            x: -3.585556983947754,
            y: 0.0,
            z: -8.273399353027344,
        },
        {
            x: -3.5831298828125,
            y: 0.0,
            z: -8.645225524902344,
        },
        {
            x: -3.5800819396972656,
            y: 0.0,
            z: -9.02395248413086,
        },
        {
            x: -3.576390266418457,
            y: 0.0,
            z: -9.409904479980469,
        },
        {
            x: -3.572197914123535,
            y: 0.0,
            z: -9.803279876708984,
        },
        {
            x: -3.5678157806396484,
            y: 0.0,
            z: -10.203903198242188,
        },
        {
            x: -3.5637168884277344,
            y: 0.0,
            z: -10.6114540409766,
        },
        {
            x: -3.560542106628418,
            y: 0.0,
            z: -11.025253295898438,
        },
        {
            x: -3.5590906143188477,
            y: 0.0,
            z: -11.444454193115234,
        },
        {
            x: -3.5603342056274414,
            y: 0.0,
            z: -11.867870330810547,
        },
        {
            x: -3.56540584564209,
            y: 0.0,
            z: -12.294136047363281,
        },
        {
            x: -3.5756025314331055,
            y: 0.0,
            z: -12.721561431884766,
        },
        {
            x: -3.592388153076172,
            y: 0.0,
            z: -13.148265838623047,
        },
        {
            x: -3.617389678955078,
            y: 0.0,
            z: -13.572029113769531,
        },
        {
            x: -3.6524038314819336,
            y: 0.0,
            z: -13.990482330322266,
        },
        {
            x: -3.6993494033813477,
            y: 0.0,
            z: -14.40093994140625,
        },
        {
            x: -3.759998321533203,
            y: 0.0,
            z: -14.800880432128906,
        },
        {
            x: -3.835752487182617,
            y: 0.0,
            z: -15.188056945800781,
        },
        {
            x: -3.9276485443115234,
            y: 0.0,
            z: -15.56069564819336,
        },
        {
            x: -4.036325454711914,
            y: 0.0,
            z: -15.917259216308594,
        },
        {
            x: -4.162059783935547,
            y: 0.0,
            z: -16.25664520263672,
        },
        {
            x: -4.304734230041504,
            y: 0.0,
            z: -16.57806396484375,
        },
        {
            x: -4.463872909545898,
            y: 0.0,
            z: -16.881149291992188,
        },
        {
            x: -4.638594627380371,
            y: 0.0,
            z: -17.16579818725586,
        },
        {
            x: -4.827671051025391,
            y: 0.0,
            z: -17.432357788085938,
        },
        {
            x: -5.029458045959473,
            y: 0.0,
            z: -17.681446075439453,
        },
        {
            x: -5.241972923278809,
            y: 0.0,
            z: -17.91413116455078,
        },
        {
            x: -5.4628143310546875,
            y: 0.0,
            z: -18.131755828857422,
        },
        {
            x: -5.689304351806641,
            y: 0.0,
            z: -18.33609390258789,
        },
        {
            x: -5.918706893920898,
            y: 0.0,
            z: -18.529064178466797,
        },
        {
            x: -6.148505210876465,
            y: 0.0,
            z: -18.712902069091797,
        },
        {
            x: -6.376303672790527,
            y: 0.0,
            z: -18.889995574951172,
        },
        {
            x: -6.5999298095703125,
            y: 0.0,
            z: -19.062984466552734,
        },
        {
            x: -6.8173370361328125,
            y: 0.0,
            z: -19.23468017578125,
        },
        {
            x: -7.026691436767578,
            y: 0.0,
            z: -19.408126831054688,
        },
        {
            x: -7.226292610168457,
            y: 0.0,
            z: -19.58657455444336,
        },
        {
            x: -7.414656639099121,
            y: 0.0,
            z: -19.77349090576172,
        },
        {
            x: -7.590426445007324,
            y: 0.0,
            z: -19.9725341796875,
        },
        {
            x: -7.752459526062012,
            y: 0.0,
            z: -20.187610626220703,
        },
        {
            x: -7.899752616882324,
            y: 0.0,
            z: -20.422809600830078,
        },
        {
            x: -8.031498908996582,
            y: 0.0,
            z: -20.682437896728516,
        },
        {
            x: -8.147049903869629,
            y: 0.0,
            z: -20.97079849243164,
        },
        {
            x: -8.245969772338867,
            y: 0.0,
            z: -21.29146957397461,
        },
        {
            x: -8.328003883361816,
            y: 0.0,
            z: -21.646907806396484,
        },
        {
            x: -8.393119812011719,
            y: 0.0,
            z: -22.038578033447266,
        },
        {
            x: -8.441465377807617,
            y: 0.0,
            z: -22.466815948486328,
        },
        {
            x: -8.473403930664062,
            y: 0.0,
            z: -22.930938720703125,
        },
        {
            x: -8.489494323730469,
            y: 0.0,
            z: -23.42914581298828,
        },
        {
            x: -8.490496635437012,
            y: 0.0,
            z: -23.95864486694336,
        },
        {
            x: -8.477374076843262,
            y: 0.0,
            z: -24.515472412109375,
        },
        {
            x: -8.451285362243652,
            y: 0.0,
            z: -25.094711303710938,
        },
        {
            x: -8.413594245910645,
            y: 0.0,
            z: -25.69025421142578,
        },
        {
            x: -8.365866661071777,
            y: 0.0,
            z: -26.295082092285156,
        },
        {
            x: -8.309868812561035,
            y: 0.0,
            z: -26.900955200195312,
        },
        {
            x: -8.247505187988281,
            y: 0.0,
            z: -27.499237060546875,
        },
        {
            x: -8.180678367614746,
            y: 0.0,
            z: -28.081954956054688,
        },
        {
            x: -8.11124038696289,
            y: 0.0,
            z: -28.642486572265625,
        },
        {
            x: -8.040997505187988,
            y: 0.0,
            z: -29.175270080566406,
        },
        {
            x: -7.971701622009277,
            y: 0.0,
            z: -29.676055908203125,
        },
        {
            x: -7.905065536499023,
            y: 0.0,
            z: -30.141700744628906,
        },
        {
            x: -7.84273624420166,
            y: 0.0,
            z: -30.570350646972656,
        },
        {
            x: -7.786333084106445,
            y: 0.0,
            z: -30.961273193359375,
        },
        {
            x: -7.737408638000488,
            y: 0.0,
            z: -31.315017700195312,
        },
        {
            x: -7.69747257232666,
            y: 0.0,
            z: -31.633224487304688,
        },
        {
            x: -7.667991638183594,
            y: 0.0,
            z: -31.91887664794922,
        },
        {
            x: -7.650374412536621,
            y: 0.0,
            z: -32.17601776123047,
        },
        {
            x: -7.645986557006836,
            y: 0.0,
            z: -32.40997314453125,
        },
        {
            x: -7.656149864196777,
            y: 0.0,
            z: -32.6265869140625,
        },
        {
            x: -7.682167053222656,
            y: 0.0,
            z: -32.83118438720703,
        },
        {
            x: -7.725312232971191,
            y: 0.0,
            z: -33.028221130371094,
        },
        {
            x: -7.786852836608887,
            y: 0.0,
            z: -33.221473693847656,
        },
        {
            x: -7.868016242980957,
            y: 0.0,
            z: -33.41382598876953,
        },
        {
            x: -7.970029830932617,
            y: 0.0,
            z: -33.607421875,
        },
        {
            x: -8.094080924987793,
            y: 0.0,
            z: -33.80358123779297,
        },
        {
            x: -8.241354942321777,
            y: 0.0,
            z: -34.002845764160156,
        },
        {
            x: -8.412996292114258,
            y: 0.0,
            z: -34.20497131347656,
        },
        {
            x: -8.61015510559082,
            y: 0.0,
            z: -34.408897399902344,
        },
        {
            x: -8.833940505981445,
            y: 0.0,
            z: -34.61280822753906,
        },
        {
            x: -9.085430145263672,
            y: 0.0,
            z: -34.81403350830078,
        },
        {
            x: -9.365903854370117,
            y: 0.0,
            z: -35.00920867919922,
        },
        {
            x: -9.679800987243652,
            y: 0.0,
            z: -35.194580078125,
        },
        {
            x: -10.039071083068848,
            y: 0.0,
            z: -35.36681365966797,
        },
        {
            x: -10.46360969543457,
            y: 0.0,
            z: -35.522911071777344,
        },
        {
            x: -10.981410026550293,
            y: 0.0,
            z: -35.66034698486328,
        },
        {
            x: -11.628388404846191,
            y: 0.0,
            z: -35.7769775390625,
        },
        {
            x: -12.448594093322754,
            y: 0.0,
            z: -35.871070861816406,
        },
        {
            x: -13.493958473205566,
            y: 0.0,
            z: -35.94134521484375,
        },
        {
            x: -14.824604988098145,
            y: 0.0,
            z: -35.986900329589844,
        },
        {
            x: -16.508441925048828,
            y: 0.0,
            z: -36.007240295410156,
        },
        {
            x: -18.62169647216797,
            y: 0.0,
            z: -36.00232696533203,
        },
        {
            x: -21.248241424560547,
            y: 0.0,
            z: -35.97251892089844,
        },
        {
            x: -24.480430603027344,
            y: 0.0,
            z: -35.918556213378906,
        },
    ],
    closed: false,
} as const;

export const villageLevelPath = {
    points: [
        {
            x: -40.117225646972656,
            y: 0.30485600233078003,
            z: 11.850417137145996,
        },
        {
            x: -40.09112548828125,
            y: 0.3048560321331024,
            z: 11.851038932800293,
        },
        {
            x: -40.063934326171875,
            y: 0.30485600233078003,
            z: 11.850914001464844,
        },
        {
            x: -40.03540802001953,
            y: 0.30485600233078003,
            z: 11.850143432617188,
        },
        {
            x: -40.00529098510742,
            y: 0.3048560321331024,
            z: 11.8488187789917,
        },
        {
            x: -39.97334289550781,
            y: 0.30485600233078003,
            z: 11.847041130065918,
        },
        {
            x: -39.93930435180664,
            y: 0.30485600233078003,
            z: 11.844903945922852,
        },
        {
            x: -39.90293884277344,
            y: 0.30485600233078003,
            z: 11.842506408691406,
        },
        {
            x: -39.86398696899414,
            y: 0.30485600233078003,
            z: 11.83994197845459,
        },
        {
            x: -39.82221221923828,
            y: 0.30485600233078003,
            z: 11.837312698364258,
        },
        {
            x: -39.77735137939453,
            y: 0.30485600233078003,
            z: 11.834711074829102,
        },
        {
            x: -39.72917175292969,
            y: 0.30485600233078003,
            z: 11.832232475280762,
        },
        {
            x: -39.677406311035156,
            y: 0.30485600233078003,
            z: 11.829977035522461,
        },
        {
            x: -39.6218147277832,
            y: 0.30485597252845764,
            z: 11.828027725219727,
        },
        {
            x: -39.56204605102539,
            y: 0.30485597252845764,
            z: 11.82636833190918,
        },
        {
            x: -39.49772644042969,
            y: 0.30485600233078003,
            z: 11.824946403503418,
        },
        {
            x: -39.428489685058594,
            y: 0.30485600233078003,
            z: 11.823704719543457,
        },
        {
            x: -39.353965759277344,
            y: 0.30485600233078003,
            z: 11.822588920593262,
        },
        {
            x: -39.273773193359375,
            y: 0.30485600233078003,
            z: 11.821544647216797,
        },
        {
            x: -39.18754196166992,
            y: 0.30485597252845764,
            z: 11.820515632629395,
        },
        {
            x: -39.09490203857422,
            y: 0.3048560321331024,
            z: 11.81944751739502,
        },
        {
            x: -38.9954719543457,
            y: 0.30485600233078003,
            z: 11.818283081054688,
        },
        {
            x: -38.888893127441406,
            y: 0.30485600233078003,
            z: 11.81696891784668,
        },
        {
            x: -38.7747802734375,
            y: 0.30485600233078003,
            z: 11.815448760986328,
        },
        {
            x: -38.652767181396484,
            y: 0.30485600233078003,
            z: 11.813668251037598,
        },
        {
            x: -38.52251052856445,
            y: 0.3048560321331024,
            z: 11.811567306518555,
        },
        {
            x: -38.38405227661133,
            y: 0.30485600233078003,
            z: 11.809006690979004,
        },
        {
            x: -38.23772430419922,
            y: 0.30485597252845764,
            z: 11.805794715881348,
        },
        {
            x: -38.083866119384766,
            y: 0.30485600233078003,
            z: 11.801738739013672,
        },
        {
            x: -37.92281723022461,
            y: 0.3048560321331024,
            z: 11.796647071838379,
        },
        {
            x: -37.754905700683594,
            y: 0.30485600233078003,
            z: 11.790322303771973,
        },
        {
            x: -37.58047103881836,
            y: 0.30485600233078003,
            z: 11.782572746276855,
        },
        {
            x: -37.39984893798828,
            y: 0.30485597252845764,
            z: 11.773207664489746,
        },
        {
            x: -37.213382720947266,
            y: 0.30485597252845764,
            z: 11.762029647827148,
        },
        {
            x: -37.02140426635742,
            y: 0.30485600233078003,
            z: 11.748848915100098,
        },
        {
            x: -36.82423400878906,
            y: 0.30485600233078003,
            z: 11.733470916748047,
        },
        {
            x: -36.62223815917969,
            y: 0.30485600233078003,
            z: 11.71570110321045,
        },
        {
            x: -36.41572189331055,
            y: 0.30485600233078003,
            z: 11.695354461669922,
        },
        {
            x: -36.20476150512695,
            y: 0.3048560321331024,
            z: 11.67246150970459,
        },
        {
            x: -35.989131927490234,
            y: 0.30485600233078003,
            z: 11.647305488586426,
        },
        {
            x: -35.76856231689453,
            y: 0.3048560321331024,
            z: 11.620185852050781,
        },
        {
            x: -35.54281997680664,
            y: 0.30485600233078003,
            z: 11.591403007507324,
        },
        {
            x: -35.3116455078125,
            y: 0.30485600233078003,
            z: 11.561253547668457,
        },
        {
            x: -35.074790954589844,
            y: 0.3048560321331024,
            z: 11.53003978729248,
        },
        {
            x: -34.832008361816406,
            y: 0.30485600233078003,
            z: 11.498059272766113,
        },
        {
            x: -34.583038330078125,
            y: 0.30485600233078003,
            z: 11.46561050415039,
        },
        {
            x: -34.32763671875,
            y: 0.30485600233078003,
            z: 11.432991981506348,
        },
        {
            x: -34.0655517578125,
            y: 0.30485597252845764,
            z: 11.400505065917969,
        },
        {
            x: -33.796531677246094,
            y: 0.30485600233078003,
            z: 11.368447303771973,
        },
        {
            x: -33.520328521728516,
            y: 0.3048560321331024,
            z: 11.337117195129395,
        },
        {
            x: -33.236976623535156,
            y: 0.30485600233078003,
            z: 11.306748390197754,
        },
        {
            x: -32.94704818725586,
            y: 0.30485597252845764,
            z: 11.277446746826172,
        },
        {
            x: -32.65119934082031,
            y: 0.30485600233078003,
            z: 11.249305725097656,
        },
        {
            x: -32.350059509277344,
            y: 0.30485597252845764,
            z: 11.222416877746582,
        },
        {
            x: -32.044281005859375,
            y: 0.30485600233078003,
            z: 11.196873664855957,
        },
        {
            x: -31.73450469970703,
            y: 0.30485600233078003,
            z: 11.172764778137207,
        },
        {
            x: -31.421358108520508,
            y: 0.30485600233078003,
            z: 11.150186538696289,
        },
        {
            x: -31.10548973083496,
            y: 0.30485600233078003,
            z: 11.129230499267578,
        },
        {
            x: -30.78755760192871,
            y: 0.3048560321331024,
            z: 11.10998821258545,
        },
        {
            x: -30.468181610107422,
            y: 0.3048560321331024,
            z: 11.092551231384277,
        },
        {
            x: -30.148014068603516,
            y: 0.30485600233078003,
            z: 11.07701301574707,
        },
        {
            x: -29.827699661254883,
            y: 0.3048560321331024,
            z: 11.06346607208252,
        },
        {
            x: -29.50790786743164,
            y: 0.3048560321331024,
            z: 11.05212116241455,
        },
        {
            x: -29.18943214416504,
            y: 0.3048560321331024,
            z: 11.043582916259766,
        },
        {
            x: -28.873106002807617,
            y: 0.30485600233078003,
            z: 11.038534164428711,
        },
        {
            x: -28.559730529785156,
            y: 0.30485600233078003,
            z: 11.0376615524292,
        },
        {
            x: -28.25012969970703,
            y: 0.30485600233078003,
            z: 11.041647911071777,
        },
        {
            x: -27.94512367248535,
            y: 0.3048560321331024,
            z: 11.051179885864258,
        },
        {
            x: -27.645526885986328,
            y: 0.30485600233078003,
            z: 11.066940307617188,
        },
        {
            x: -27.352161407470703,
            y: 0.30485600233078003,
            z: 11.089614868164062,
        },
        {
            x: -27.065841674804688,
            y: 0.30485597252845764,
            z: 11.119887351989746,
        },
        {
            x: -26.787391662597656,
            y: 0.30485600233078003,
            z: 11.158443450927734,
        },
        {
            x: -26.517620086669922,
            y: 0.30485600233078003,
            z: 11.205965042114258,
        },
        {
            x: -26.257352828979492,
            y: 0.30485600233078003,
            z: 11.263139724731445,
        },
        {
            x: -26.00736427307129,
            y: 0.3048560321331024,
            z: 11.330718040466309,
        },
        {
            x: -25.768171310424805,
            y: 0.30485600233078003,
            z: 11.409842491149902,
        },
        {
            x: -25.54019546508789,
            y: 0.30485600233078003,
            z: 11.50179672241211,
        },
        {
            x: -25.323877334594727,
            y: 0.3048560321331024,
            z: 11.607863426208496,
        },
        {
            x: -25.1196346282959,
            y: 0.3048560321331024,
            z: 11.729320526123047,
        },
        {
            x: -24.92789077758789,
            y: 0.30485600233078003,
            z: 11.867456436157227,
        },
        {
            x: -24.749086380004883,
            y: 0.30485600233078003,
            z: 12.023550987243652,
        },
        {
            x: -24.583642959594727,
            y: 0.30485600233078003,
            z: 12.198884963989258,
        },
        {
            x: -24.431989669799805,
            y: 0.30485600233078003,
            z: 12.394742012023926,
        },
        {
            x: -24.294544219970703,
            y: 0.30485600233078003,
            z: 12.612411499023438,
        },
        {
            x: -24.17174530029297,
            y: 0.30485600233078003,
            z: 12.85316276550293,
        },
        {
            x: -24.06401824951172,
            y: 0.30485600233078003,
            z: 13.118287086486816,
        },
        {
            x: -23.971738815307617,
            y: 0.30485600233078003,
            z: 13.408818244934082,
        },
        {
            x: -23.894725799560547,
            y: 0.30485600233078003,
            z: 13.72313117980957,
        },
        {
            x: -23.832475662231445,
            y: 0.30485600233078003,
            z: 14.057997703552246,
        },
        {
            x: -23.78447914123535,
            y: 0.30485600233078003,
            z: 14.410176277160645,
        },
        {
            x: -23.750215530395508,
            y: 0.30485597252845764,
            z: 14.776408195495605,
        },
        {
            x: -23.729177474975586,
            y: 0.30485600233078003,
            z: 15.153448104858398,
        },
        {
            x: -23.720849990844727,
            y: 0.30485600233078003,
            z: 15.538046836853027,
        },
        {
            x: -23.72471809387207,
            y: 0.30485600233078003,
            z: 15.926959991455078,
        },
        {
            x: -23.740270614624023,
            y: 0.30485600233078003,
            z: 16.31693458557129,
        },
        {
            x: -23.766998291015625,
            y: 0.30485600233078003,
            z: 16.7047176361084,
        },
        {
            x: -23.80438232421875,
            y: 0.30485600233078003,
            z: 17.087068557739258,
        },
        {
            x: -23.851911544799805,
            y: 0.3048560321331024,
            z: 17.46073341369629,
        },
        {
            x: -23.909069061279297,
            y: 0.30485600233078003,
            z: 17.822538375854492,
        },
        {
            x: -23.975257873535156,
            y: 0.30485600233078003,
            z: 18.171138763427734,
        },
        {
            x: -24.049793243408203,
            y: 0.30485600233078003,
            z: 18.5069580078125,
        },
        {
            x: -24.131996154785156,
            y: 0.30485600233078003,
            z: 18.830522537231445,
        },
        {
            x: -24.221181869506836,
            y: 0.3048560321331024,
            z: 19.142335891723633,
        },
        {
            x: -24.31666374206543,
            y: 0.30485600233078003,
            z: 19.442913055419922,
        },
        {
            x: -24.417757034301758,
            y: 0.30485600233078003,
            z: 19.732769012451172,
        },
        {
            x: -24.52378273010254,
            y: 0.30485600233078003,
            z: 20.012413024902344,
        },
        {
            x: -24.634048461914062,
            y: 0.30485600233078003,
            z: 20.282363891601562,
        },
        {
            x: -24.74787712097168,
            y: 0.3048560321331024,
            z: 20.543128967285156,
        },
        {
            x: -24.864585876464844,
            y: 0.3048560321331024,
            z: 20.795225143432617,
        },
        {
            x: -24.983482360839844,
            y: 0.30485600233078003,
            z: 21.03916358947754,
        },
        {
            x: -25.10388946533203,
            y: 0.30485600233078003,
            z: 21.27545738220215,
        },
        {
            x: -25.22490119934082,
            y: 0.30485600233078003,
            z: 21.504688262939453,
        },
        {
            x: -25.345260620117188,
            y: 0.30485600233078003,
            z: 21.72751808166504,
        },
        {
            x: -25.463693618774414,
            y: 0.30485600233078003,
            z: 21.944643020629883,
        },
        {
            x: -25.578914642333984,
            y: 0.30485597252845764,
            z: 22.156742095947266,
        },
        {
            x: -25.689640045166016,
            y: 0.30485600233078003,
            z: 22.364498138427734,
        },
        {
            x: -25.79458999633789,
            y: 0.30485600233078003,
            z: 22.568601608276367,
        },
        {
            x: -25.89247703552246,
            y: 0.3048560321331024,
            z: 22.769729614257812,
        },
        {
            x: -25.982025146484375,
            y: 0.30485600233078003,
            z: 22.968568801879883,
        },
        {
            x: -26.061946868896484,
            y: 0.30485600233078003,
            z: 23.165803909301758,
        },
        {
            x: -26.130962371826172,
            y: 0.3048560321331024,
            z: 23.36211585998535,
        },
        {
            x: -26.187786102294922,
            y: 0.3048560321331024,
            z: 23.558191299438477,
        },
        {
            x: -26.231138229370117,
            y: 0.30485600233078003,
            z: 23.75471305847168,
        },
        {
            x: -26.260101318359375,
            y: 0.30485597252845764,
            z: 23.951932907104492,
        },
        {
            x: -26.274770736694336,
            y: 0.30485600233078003,
            z: 24.148944854736328,
        },
        {
            x: -26.2753963470459,
            y: 0.30485600233078003,
            z: 24.344627380371094,
        },
        {
            x: -26.26224136352539,
            y: 0.3048560321331024,
            z: 24.53787612915039,
        },
        {
            x: -26.235549926757812,
            y: 0.30485597252845764,
            z: 24.72756576538086,
        },
        {
            x: -26.195594787597656,
            y: 0.30485600233078003,
            z: 24.912607192993164,
        },
        {
            x: -26.142616271972656,
            y: 0.30485600233078003,
            z: 25.091873168945312,
        },
        {
            x: -26.076885223388672,
            y: 0.3048560321331024,
            z: 25.264253616333008,
        },
        {
            x: -25.99864959716797,
            y: 0.30485600233078003,
            z: 25.428640365600586,
        },
        {
            x: -25.908164978027344,
            y: 0.30485600233078003,
            z: 25.583921432495117,
        },
        {
            x: -25.805692672729492,
            y: 0.30485600233078003,
            z: 25.728984832763672,
        },
        {
            x: -25.691486358642578,
            y: 0.30485600233078003,
            z: 25.86271858215332,
        },
        {
            x: -25.565837860107422,
            y: 0.30485600233078003,
            z: 25.98423957824707,
        },
        {
            x: -25.429218292236328,
            y: 0.3048560321331024,
            z: 26.09374237060547,
        },
        {
            x: -25.282123565673828,
            y: 0.30485600233078003,
            z: 26.191734313964844,
        },
        {
            x: -25.12508201599121,
            y: 0.30485600233078003,
            z: 26.278730392456055,
        },
        {
            x: -24.958599090576172,
            y: 0.30485600233078003,
            z: 26.355249404907227,
        },
        {
            x: -24.78319549560547,
            y: 0.3048560321331024,
            z: 26.421798706054688,
        },
        {
            x: -24.59937286376953,
            y: 0.3048560321331024,
            z: 26.478893280029297,
        },
        {
            x: -24.407649993896484,
            y: 0.3048560321331024,
            z: 26.52704429626465,
        },
        {
            x: -24.208545684814453,
            y: 0.3048560321331024,
            z: 26.566770553588867,
        },
        {
            x: -24.0025577545166,
            y: 0.30485600233078003,
            z: 26.59857177734375,
        },
        {
            x: -23.79021644592285,
            y: 0.3048560321331024,
            z: 26.62297821044922,
        },
        {
            x: -23.572021484375,
            y: 0.30485600233078003,
            z: 26.640487670898438,
        },
        {
            x: -23.348434448242188,
            y: 0.30485600233078003,
            z: 26.651653289794922,
        },
        {
            x: -23.1193790435791,
            y: 0.3048560321331024,
            z: 26.65728759765625,
        },
        {
            x: -22.884506225585938,
            y: 0.30485600233078003,
            z: 26.658308029174805,
        },
        {
            x: -22.64348602294922,
            y: 0.30485600233078003,
            z: 26.655675888061523,
        },
        {
            x: -22.395967483520508,
            y: 0.3048560321331024,
            z: 26.65032386779785,
        },
        {
            x: -22.141613006591797,
            y: 0.30485600233078003,
            z: 26.643192291259766,
        },
        {
            x: -21.88007926940918,
            y: 0.30485600233078003,
            z: 26.635221481323242,
        },
        {
            x: -21.61102867126465,
            y: 0.3048560321331024,
            z: 26.627357482910156,
        },
        {
            x: -21.3341121673584,
            y: 0.30485600233078003,
            z: 26.620527267456055,
        },
        {
            x: -21.04899024963379,
            y: 0.3048560321331024,
            z: 26.61568832397461,
        },
        {
            x: -20.755325317382812,
            y: 0.3048560321331024,
            z: 26.613773345947266,
        },
        {
            x: -20.45276641845703,
            y: 0.30485597252845764,
            z: 26.615713119506836,
        },
        {
            x: -20.141036987304688,
            y: 0.30485600233078003,
            z: 26.622446060180664,
        },
        {
            x: -19.820720672607422,
            y: 0.3048560321331024,
            z: 26.63457679748535,
        },
        {
            x: -19.493183135986328,
            y: 0.30485600233078003,
            z: 26.652454376220703,
        },
        {
            x: -19.159780502319336,
            y: 0.3048560321331024,
            z: 26.67641830444336,
        },
        {
            x: -18.821876525878906,
            y: 0.30485597252845764,
            z: 26.70680809020996,
        },
        {
            x: -18.480852127075195,
            y: 0.30485600233078003,
            z: 26.743980407714844,
        },
        {
            x: -18.138059616088867,
            y: 0.30485597252845764,
            z: 26.78826141357422,
        },
        {
            x: -17.794878005981445,
            y: 0.3048560321331024,
            z: 26.84000587463379,
        },
        {
            x: -17.452672958374023,
            y: 0.30485600233078003,
            z: 26.899539947509766,
        },
        {
            x: -17.112821578979492,
            y: 0.30485600233078003,
            z: 26.967220306396484,
        },
        {
            x: -16.776676177978516,
            y: 0.30485600233078003,
            z: 27.043380737304688,
        },
        {
            x: -16.445615768432617,
            y: 0.30485600233078003,
            z: 27.128366470336914,
        },
        {
            x: -16.12098503112793,
            y: 0.3048560619354248,
            z: 27.222537994384766,
        },
        {
            x: -15.803595542907715,
            y: 0.30485600233078003,
            z: 27.326766967773438,
        },
        {
            x: -15.493498802185059,
            y: 0.30485600233078003,
            z: 27.442697525024414,
        },
        {
            x: -15.190702438354492,
            y: 0.3048560321331024,
            z: 27.571990966796875,
        },
        {
            x: -14.895196914672852,
            y: 0.30485600233078003,
            z: 27.716320037841797,
        },
        {
            x: -14.606986999511719,
            y: 0.30485600233078003,
            z: 27.877365112304688,
        },
        {
            x: -14.326072692871094,
            y: 0.30485600233078003,
            z: 28.056798934936523,
        },
        {
            x: -14.052444458007812,
            y: 0.3048560321331024,
            z: 28.256298065185547,
        },
        {
            x: -13.786116600036621,
            y: 0.3048560321331024,
            z: 28.477527618408203,
        },
        {
            x: -13.52707576751709,
            y: 0.30485600233078003,
            z: 28.72216796875,
        },
        {
            x: -13.275335311889648,
            y: 0.30485600233078003,
            z: 28.991893768310547,
        },
        {
            x: -13.030890464782715,
            y: 0.30485600233078003,
            z: 29.28837013244629,
        },
        {
            x: -12.793742179870605,
            y: 0.3048560321331024,
            z: 29.613277435302734,
        },
        {
            x: -12.56440544128418,
            y: 0.3048560321331024,
            z: 29.966978073120117,
        },
        {
            x: -12.344561576843262,
            y: 0.30485600233078003,
            z: 30.346912384033203,
        },
        {
            x: -12.136065483093262,
            y: 0.30485597252845764,
            z: 30.750102996826172,
        },
        {
            x: -11.940751075744629,
            y: 0.30485600233078003,
            z: 31.17359161376953,
        },
        {
            x: -11.76047134399414,
            y: 0.3048560321331024,
            z: 31.614391326904297,
        },
        {
            x: -11.597064018249512,
            y: 0.30485597252845764,
            z: 32.06953811645508,
        },
        {
            x: -11.452373504638672,
            y: 0.30485597252845764,
            z: 32.53606414794922,
        },
        {
            x: -11.3282470703125,
            y: 0.3048560321331024,
            z: 33.01100540161133,
        },
        {
            x: -11.226522445678711,
            y: 0.3048560321331024,
            z: 33.49139404296875,
        },
        {
            x: -11.149048805236816,
            y: 0.3048560321331024,
            z: 33.97425079345703,
        },
        {
            x: -11.09766960144043,
            y: 0.30485600233078003,
            z: 34.456600189208984,
        },
        {
            x: -11.074230194091797,
            y: 0.3048560321331024,
            z: 34.93547821044922,
        },
        {
            x: -11.079615592956543,
            y: 0.30485597252845764,
            z: 35.4082145690918,
        },
        {
            x: -11.111003875732422,
            y: 0.30485600233078003,
            z: 35.87331008911133,
        },
        {
            x: -11.164654731750488,
            y: 0.30485600233078003,
            z: 36.32954788208008,
        },
        {
            x: -11.236833572387695,
            y: 0.3048560321331024,
            z: 36.77568817138672,
        },
        {
            x: -11.323800086975098,
            y: 0.3048560321331024,
            z: 37.21052932739258,
        },
        {
            x: -11.421825408935547,
            y: 0.30485600233078003,
            z: 37.63285827636719,
        },
        {
            x: -11.527164459228516,
            y: 0.30485600233078003,
            z: 38.04142761230469,
        },
        {
            x: -11.636085510253906,
            y: 0.3048560321331024,
            z: 38.435035705566406,
        },
        {
            x: -11.744853019714355,
            y: 0.30485600233078003,
            z: 38.81247329711914,
        },
        {
            x: -11.849726676940918,
            y: 0.30485600233078003,
            z: 39.1724967956543,
        },
        {
            x: -11.94697380065918,
            y: 0.3048560321331024,
            z: 39.5139045715332,
        },
        {
            x: -12.032855987548828,
            y: 0.3048560321331024,
            z: 39.83546447753906,
        },
        {
            x: -12.103933334350586,
            y: 0.3048560321331024,
            z: 40.13627624511719,
        },
        {
            x: -12.15880012512207,
            y: 0.30485600233078003,
            z: 40.4174690246582,
        },
        {
            x: -12.196916580200195,
            y: 0.30485600233078003,
            z: 40.681087493896484,
        },
        {
            x: -12.217743873596191,
            y: 0.30485600233078003,
            z: 40.92916488647461,
        },
        {
            x: -12.220745086669922,
            y: 0.30485600233078003,
            z: 41.16373062133789,
        },
        {
            x: -12.2053804397583,
            y: 0.30485600233078003,
            z: 41.38682174682617,
        },
        {
            x: -12.171111106872559,
            y: 0.30485600233078003,
            z: 41.60047149658203,
        },
        {
            x: -12.117396354675293,
            y: 0.30485600233078003,
            z: 41.806705474853516,
        },
        {
            x: -12.043703079223633,
            y: 0.3048560321331024,
            z: 42.007572174072266,
        },
        {
            x: -11.949487686157227,
            y: 0.30485600233078003,
            z: 42.2050895690918,
        },
        {
            x: -11.834209442138672,
            y: 0.30485600233078003,
            z: 42.40129470825195,
        },
        {
            x: -11.697338104248047,
            y: 0.30485600233078003,
            z: 42.598228454589844,
        },
        {
            x: -11.538415908813477,
            y: 0.30485600233078003,
            z: 42.79777145385742,
        },
        {
            x: -11.358119010925293,
            y: 0.30485600233078003,
            z: 42.99993896484375,
        },
        {
            x: -11.157928466796875,
            y: 0.30485600233078003,
            z: 43.203407287597656,
        },
        {
            x: -10.939329147338867,
            y: 0.30485600233078003,
            z: 43.40682601928711,
        },
        {
            x: -10.703816413879395,
            y: 0.3048560321331024,
            z: 43.608856201171875,
        },
        {
            x: -10.452869415283203,
            y: 0.30485600233078003,
            z: 43.80815505981445,
        },
        {
            x: -10.187994003295898,
            y: 0.30485600233078003,
            z: 44.00336456298828,
        },
        {
            x: -9.910675048828125,
            y: 0.3048560321331024,
            z: 44.193145751953125,
        },
        {
            x: -9.622392654418945,
            y: 0.3048560321331024,
            z: 44.376155853271484,
        },
        {
            x: -9.324654579162598,
            y: 0.30485600233078003,
            z: 44.5510368347168,
        },
        {
            x: -9.018943786621094,
            y: 0.3048560321331024,
            z: 44.716461181640625,
        },
        {
            x: -8.706742286682129,
            y: 0.30485600233078003,
            z: 44.871070861816406,
        },
        {
            x: -8.389532089233398,
            y: 0.30485600233078003,
            z: 45.013545989990234,
        },
        {
            x: -8.068072319030762,
            y: 0.30485600233078003,
            z: 45.143375396728516,
        },
        {
            x: -7.742320537567139,
            y: 0.30485600233078003,
            z: 45.26097869873047,
        },
        {
            x: -7.412182807922363,
            y: 0.30485597252845764,
            z: 45.36680221557617,
        },
        {
            x: -7.077592372894287,
            y: 0.30485600233078003,
            z: 45.46132278442383,
        },
        {
            x: -6.738452911376953,
            y: 0.30485600233078003,
            z: 45.54499435424805,
        },
        {
            x: -6.394670009613037,
            y: 0.30485600233078003,
            z: 45.6182746887207,
        },
        {
            x: -6.046177387237549,
            y: 0.30485600233078003,
            z: 45.681640625,
        },
        {
            x: -5.692880153656006,
            y: 0.30485600233078003,
            z: 45.735538482666016,
        },
        {
            x: -5.334683418273926,
            y: 0.30485600233078003,
            z: 45.78044128417969,
        },
        {
            x: -4.971519470214844,
            y: 0.30485600233078003,
            z: 45.816802978515625,
        },
        {
            x: -4.603294849395752,
            y: 0.30485600233078003,
            z: 45.845096588134766,
        },
        {
            x: -4.229928493499756,
            y: 0.3048560321331024,
            z: 45.865779876708984,
        },
        {
            x: -3.8518810272216797,
            y: 0.3048560321331024,
            z: 45.87944030761719,
        },
        {
            x: -3.470679759979248,
            y: 0.30485600233078003,
            z: 45.886898040771484,
        },
        {
            x: -3.087939977645874,
            y: 0.30485600233078003,
            z: 45.88901901245117,
        },
        {
            x: -2.705277681350708,
            y: 0.3048560321331024,
            z: 45.88665771484375,
        },
        {
            x: -2.3243348598480225,
            y: 0.30485600233078003,
            z: 45.88064956665039,
        },
        {
            x: -1.9467275142669678,
            y: 0.30485600233078003,
            z: 45.871864318847656,
        },
        {
            x: -1.574070930480957,
            y: 0.30485600233078003,
            z: 45.86114501953125,
        },
        {
            x: -1.208007574081421,
            y: 0.30485600233078003,
            z: 45.8493537902832,
        },
        {
            x: -0.8501527309417725,
            y: 0.30485600233078003,
            z: 45.83733367919922,
        },
        {
            x: -0.5021312236785889,
            y: 0.30485600233078003,
            z: 45.82594680786133,
        },
        {
            x: -0.16555991768836975,
            y: 0.30485600233078003,
            z: 45.8160400390625,
        },
        {
            x: 0.15792205929756165,
            y: 0.30485597252845764,
            z: 45.808467864990234,
        },
        {
            x: 0.4691088795661926,
            y: 0.30485600233078003,
            z: 45.803993225097656,
        },
        {
            x: 0.7765420079231262,
            y: 0.30485600233078003,
            z: 45.80307388305664,
        },
        {
            x: 1.0902965068817139,
            y: 0.30485600233078003,
            z: 45.80610275268555,
        },
        {
            x: 1.4204685688018799,
            y: 0.30485600233078003,
            z: 45.8134880065918,
        },
        {
            x: 1.7771471738815308,
            y: 0.3048560321331024,
            z: 45.82561492919922,
        },
        {
            x: 2.1704306602478027,
            y: 0.30485600233078003,
            z: 45.842899322509766,
        },
        {
            x: 2.6103901863098145,
            y: 0.30485600233078003,
            z: 45.865726470947266,
        },
        {
            x: 3.107123374938965,
            y: 0.30485600233078003,
            z: 45.894500732421875,
        },
        {
            x: 3.6707329750061035,
            y: 0.30485600233078003,
            z: 45.92962646484375,
        },
        {
            x: 4.311282634735107,
            y: 0.30485600233078003,
            z: 45.97148513793945,
        },
        {
            x: 5.038871765136719,
            y: 0.30485600233078003,
            z: 46.02048873901367,
        },
        {
            x: 5.863611221313477,
            y: 0.30485600233078003,
            z: 46.0770378112793,
        },
        {
            x: 6.792308807373047,
            y: 0.3048560321331024,
            z: 46.14126205444336,
        },
        {
            x: 7.813530445098877,
            y: 0.30485600233078003,
            z: 46.21176528930664,
        },
        {
            x: 8.909414291381836,
            y: 0.30485600233078003,
            z: 46.28666305541992,
        },
        {
            x: 10.062117576599121,
            y: 0.30485600233078003,
            z: 46.364036560058594,
        },
        {
            x: 11.253719329833984,
            y: 0.3048560321331024,
            z: 46.44197463989258,
        },
        {
            x: 12.4663724899292,
            y: 0.3048560321331024,
            z: 46.51857376098633,
        },
        {
            x: 13.682235717773438,
            y: 0.30485600233078003,
            z: 46.591915130615234,
        },
        {
            x: 14.883386611938477,
            y: 0.30485600233078003,
            z: 46.660099029541016,
        },
        {
            x: 16.05198097229004,
            y: 0.30485597252845764,
            z: 46.721214294433594,
        },
        {
            x: 17.170177459716797,
            y: 0.30485600233078003,
            z: 46.77335739135742,
        },
        {
            x: 18.220050811767578,
            y: 0.30485600233078003,
            z: 46.814605712890625,
        },
        {
            x: 19.183761596679688,
            y: 0.30485600233078003,
            z: 46.843055725097656,
        },
        {
            x: 20.04492950439453,
            y: 0.30485600233078003,
            z: 46.8569450378418,
        },
        {
            x: 20.80261993408203,
            y: 0.3048555254936218,
            z: 46.85589599609375,
        },
        {
            x: 21.464975357055664,
            y: 0.30485406517982483,
            z: 46.84040069580078,
        },
        {
            x: 22.040306091308594,
            y: 0.3048509657382965,
            z: 46.8109245300293,
        },
        {
            x: 22.53691864013672,
            y: 0.3048457205295563,
            z: 46.76796340942383,
        },
        {
            x: 22.963083267211914,
            y: 0.3048376142978668,
            z: 46.711997985839844,
        },
        {
            x: 23.32710838317871,
            y: 0.30482617020606995,
            z: 46.643516540527344,
        },
        {
            x: 23.637287139892578,
            y: 0.3048107326030731,
            z: 46.56299591064453,
        },
        {
            x: 23.901905059814453,
            y: 0.3047907054424286,
            z: 46.470924377441406,
        },
        {
            x: 24.129257202148438,
            y: 0.3047654926776886,
            z: 46.3677864074707,
        },
        {
            x: 24.327646255493164,
            y: 0.3047344982624054,
            z: 46.25407028198242,
        },
        {
            x: 24.50536346435547,
            y: 0.304697185754776,
            z: 46.1302490234375,
        },
        {
            x: 24.670515060424805,
            y: 0.30465131998062134,
            z: 45.996795654296875,
        },
        {
            x: 24.827388763427734,
            y: 0.30456221103668213,
            z: 45.85367965698242,
        },
        {
            x: 24.97654914855957,
            y: 0.3043631315231323,
            z: 45.700401306152344,
        },
        {
            x: 25.118410110473633,
            y: 0.3039863705635071,
            z: 45.53647232055664,
        },
        {
            x: 25.253379821777344,
            y: 0.3033639192581177,
            z: 45.36135482788086,
        },
        {
            x: 25.38187026977539,
            y: 0.3024280369281769,
            z: 45.17455291748047,
        },
        {
            x: 25.504295349121094,
            y: 0.30111071467399597,
            z: 44.97553634643555,
        },
        {
            x: 25.621063232421875,
            y: 0.29934412240982056,
            z: 44.763797760009766,
        },
        {
            x: 25.732585906982422,
            y: 0.29706045985221863,
            z: 44.53883743286133,
        },
        {
            x: 25.83927345275879,
            y: 0.2941916882991791,
            z: 44.30012512207031,
        },
        {
            x: 25.941539764404297,
            y: 0.29067012667655945,
            z: 44.047157287597656,
        },
        {
            x: 26.039796829223633,
            y: 0.2864278554916382,
            z: 43.779422760009766,
        },
        {
            x: 26.13445281982422,
            y: 0.28139838576316833,
            z: 43.49641036987305,
        },
        {
            x: 26.225276947021484,
            y: 0.2756161391735077,
            z: 43.19858169555664,
        },
        {
            x: 26.311063766479492,
            y: 0.2692739963531494,
            z: 42.88785171508789,
        },
        {
            x: 26.39054298400879,
            y: 0.2625792324542999,
            z: 42.566307067871094,
        },
        {
            x: 26.462411880493164,
            y: 0.25573885440826416,
            z: 42.235992431640625,
        },
        {
            x: 26.52538299560547,
            y: 0.24896033108234406,
            z: 41.89898681640625,
        },
        {
            x: 26.578166961669922,
            y: 0.24245069921016693,
            z: 41.55736541748047,
        },
        {
            x: 26.619478225708008,
            y: 0.2364170104265213,
            z: 41.21316909790039,
        },
        {
            x: 26.64802360534668,
            y: 0.23106680810451508,
            z: 40.86848449707031,
        },
        {
            x: 26.66251564025879,
            y: 0.2266070395708084,
            z: 40.52537536621094,
        },
        {
            x: 26.661664962768555,
            y: 0.22324484586715698,
            z: 40.18589401245117,
        },
        {
            x: 26.644182205200195,
            y: 0.22118759155273438,
            z: 39.85213088989258,
        },
        {
            x: 26.608776092529297,
            y: 0.22064244747161865,
            z: 39.5261344909668,
        },
        {
            x: 26.5550479888916,
            y: 0.2218630611896515,
            z: 39.2095832824707,
        },
        {
            x: 26.484935760498047,
            y: 0.22522656619548798,
            z: 38.90310287475586,
        },
        {
            x: 26.40077781677246,
            y: 0.2311301976442337,
            z: 38.60717010498047,
        },
        {
            x: 26.304895401000977,
            y: 0.23997129499912262,
            z: 38.32224655151367,
        },
        {
            x: 26.199613571166992,
            y: 0.2521474361419678,
            z: 38.04877853393555,
        },
        {
            x: 26.0872745513916,
            y: 0.26805543899536133,
            z: 37.78725051879883,
        },
        {
            x: 25.97020149230957,
            y: 0.28809285163879395,
            z: 37.538116455078125,
        },
        {
            x: 25.85072898864746,
            y: 0.31265702843666077,
            z: 37.301841735839844,
        },
        {
            x: 25.731170654296875,
            y: 0.3421459496021271,
            z: 37.078880310058594,
        },
        {
            x: 25.613880157470703,
            y: 0.37695571780204773,
            z: 36.86971664428711,
        },
        {
            x: 25.50116539001465,
            y: 0.4174840450286865,
            z: 36.67478942871094,
        },
        {
            x: 25.39536476135254,
            y: 0.46412959694862366,
            z: 36.494571685791016,
        },
        {
            x: 25.29840087890625,
            y: 0.5171477794647217,
            z: 36.3292121887207,
        },
        {
            x: 25.21027946472168,
            y: 0.5761498808860779,
            z: 36.17735290527344,
        },
        {
            x: 25.130464553833008,
            y: 0.6405606865882874,
            z: 36.037208557128906,
        },
        {
            x: 25.058414459228516,
            y: 0.7098003625869751,
            z: 35.907005310058594,
        },
        {
            x: 24.99359893798828,
            y: 0.7832934856414795,
            z: 35.78496170043945,
        },
        {
            x: 24.935470581054688,
            y: 0.8604631423950195,
            z: 35.66929244995117,
        },
        {
            x: 24.883493423461914,
            y: 0.9407343864440918,
            z: 35.55821990966797,
        },
        {
            x: 24.83713150024414,
            y: 1.0235267877578735,
            z: 35.44995880126953,
        },
        {
            x: 24.79584312438965,
            y: 1.1082649230957031,
            z: 35.34273147583008,
        },
        {
            x: 24.759092330932617,
            y: 1.194374442100525,
            z: 35.23475646972656,
        },
        {
            x: 24.726341247558594,
            y: 1.2812743186950684,
            z: 35.12425231933594,
        },
        {
            x: 24.69704246520996,
            y: 1.368389368057251,
            z: 35.009437561035156,
        },
        {
            x: 24.670711517333984,
            y: 1.4551587104797363,
            z: 34.88870620727539,
        },
        {
            x: 24.64720344543457,
            y: 1.541129231452942,
            z: 34.762027740478516,
        },
        {
            x: 24.626543045043945,
            y: 1.625908613204956,
            z: 34.63008499145508,
        },
        {
            x: 24.608766555786133,
            y: 1.709104299545288,
            z: 34.49359893798828,
        },
        {
            x: 24.593914031982422,
            y: 1.79032564163208,
            z: 34.3532829284668,
        },
        {
            x: 24.582008361816406,
            y: 1.8691753149032593,
            z: 34.20985412597656,
        },
        {
            x: 24.573087692260742,
            y: 1.9452625513076782,
            z: 34.06401062011719,
        },
        {
            x: 24.567182540893555,
            y: 2.0181961059570312,
            z: 33.91647720336914,
        },
        {
            x: 24.564332962036133,
            y: 2.0875799655914307,
            z: 33.767967224121094,
        },
        {
            x: 24.564563751220703,
            y: 2.153022050857544,
            z: 33.61919021606445,
        },
        {
            x: 24.56791114807129,
            y: 2.21412992477417,
            z: 33.470855712890625,
        },
        {
            x: 24.57440948486328,
            y: 2.270512104034424,
            z: 33.32366943359375,
        },
        {
            x: 24.584083557128906,
            y: 2.321809768676758,
            z: 33.17832946777344,
        },
        {
            x: 24.596843719482422,
            y: 2.3682990074157715,
            z: 33.034908294677734,
        },
        {
            x: 24.61248016357422,
            y: 2.4107630252838135,
            z: 32.89299011230469,
        },
        {
            x: 24.630794525146484,
            y: 2.4499971866607666,
            z: 32.75217056274414,
        },
        {
            x: 24.6516056060791,
            y: 2.486802816390991,
            z: 32.61204528808594,
        },
        {
            x: 24.67470359802246,
            y: 2.521979570388794,
            z: 32.4721794128418,
        },
        {
            x: 24.699886322021484,
            y: 2.5563228130340576,
            z: 32.33217239379883,
        },
        {
            x: 24.726959228515625,
            y: 2.5906336307525635,
            z: 32.19160079956055,
        },
        {
            x: 24.755722045898438,
            y: 2.6257097721099854,
            z: 32.050052642822266,
        },
        {
            x: 24.785978317260742,
            y: 2.662350654602051,
            z: 31.907108306884766,
        },
        {
            x: 24.817527770996094,
            y: 2.70135498046875,
            z: 31.762357711791992,
        },
        {
            x: 24.850168228149414,
            y: 2.743520975112915,
            z: 31.615381240844727,
        },
        {
            x: 24.883705139160156,
            y: 2.789645195007324,
            z: 31.465761184692383,
        },
        {
            x: 24.917856216430664,
            y: 2.84041690826416,
            z: 31.313068389892578,
        },
        {
            x: 24.952220916748047,
            y: 2.8963816165924072,
            z: 31.156841278076172,
        },
        {
            x: 24.986417770385742,
            y: 2.958080530166626,
            z: 30.99661636352539,
        },
        {
            x: 25.02004051208496,
            y: 3.02604341506958,
            z: 30.831947326660156,
        },
        {
            x: 25.052698135375977,
            y: 3.100811243057251,
            z: 30.66237449645996,
        },
        {
            x: 25.083986282348633,
            y: 3.1829187870025635,
            z: 30.487428665161133,
        },
        {
            x: 25.113513946533203,
            y: 3.2729084491729736,
            z: 30.30664825439453,
        },
        {
            x: 25.140880584716797,
            y: 3.3713080883026123,
            z: 30.119592666625977,
        },
        {
            x: 25.165693283081055,
            y: 3.47865891456604,
            z: 29.92579460144043,
        },
        {
            x: 25.187549591064453,
            y: 3.5954971313476562,
            z: 29.724790573120117,
        },
        {
            x: 25.2060604095459,
            y: 3.7223596572875977,
            z: 29.51612663269043,
        },
        {
            x: 25.220821380615234,
            y: 3.8597776889801025,
            z: 29.299341201782227,
        },
        {
            x: 25.231616973876953,
            y: 4.007162570953369,
            z: 29.073875427246094,
        },
        {
            x: 25.238609313964844,
            y: 4.161449909210205,
            z: 28.83893585205078,
        },
        {
            x: 25.242019653320312,
            y: 4.319243907928467,
            z: 28.593700408935547,
        },
        {
            x: 25.242061614990234,
            y: 4.47714900970459,
            z: 28.337350845336914,
        },
        {
            x: 25.238956451416016,
            y: 4.631775856018066,
            z: 28.06905746459961,
        },
        {
            x: 25.232912063598633,
            y: 4.779714107513428,
            z: 27.78801727294922,
        },
        {
            x: 25.224157333374023,
            y: 4.917575359344482,
            z: 27.4934024810791,
        },
        {
            x: 25.212905883789062,
            y: 5.041969299316406,
            z: 27.184377670288086,
        },
        {
            x: 25.199369430541992,
            y: 5.14948844909668,
            z: 26.860151290893555,
        },
        {
            x: 25.183774948120117,
            y: 5.2367424964904785,
            z: 26.519886016845703,
        },
        {
            x: 25.166330337524414,
            y: 5.3003363609313965,
            z: 26.162765502929688,
        },
        {
            x: 25.147260665893555,
            y: 5.336873531341553,
            z: 25.787967681884766,
        },
        {
            x: 25.126710891723633,
            y: 5.344132900238037,
            z: 25.395353317260742,
        },
        {
            x: 25.10457992553711,
            y: 5.32436990737915,
            z: 24.98737907409668,
        },
        {
            x: 25.0806941986084,
            y: 5.280904293060303,
            z: 24.567127227783203,
        },
        {
            x: 25.05488395690918,
            y: 5.2170562744140625,
            z: 24.137666702270508,
        },
        {
            x: 25.026988983154297,
            y: 5.136143684387207,
            z: 23.702056884765625,
        },
        {
            x: 24.996841430664062,
            y: 5.0414934158325195,
            z: 23.2634220123291,
        },
        {
            x: 24.964265823364258,
            y: 4.936420917510986,
            z: 22.824806213378906,
        },
        {
            x: 24.92910385131836,
            y: 4.824249267578125,
            z: 22.389297485351562,
        },
        {
            x: 24.89118194580078,
            y: 4.7082977294921875,
            z: 21.9599666595459,
        },
        {
            x: 24.850330352783203,
            y: 4.591886520385742,
            z: 21.53989028930664,
        },
        {
            x: 24.806386947631836,
            y: 4.478330612182617,
            z: 21.13212776184082,
        },
        {
            x: 24.759180068969727,
            y: 4.370961666107178,
            z: 20.739791870117188,
        },
        {
            x: 24.708513259887695,
            y: 4.272721767425537,
            z: 20.365558624267578,
        },
        {
            x: 24.65398597717285,
            y: 4.184047698974609,
            z: 20.009532928466797,
        },
        {
            x: 24.595109939575195,
            y: 4.10434103012085,
            z: 19.670751571655273,
        },
        {
            x: 24.531394958496094,
            y: 4.0329999923706055,
            z: 19.348247528076172,
        },
        {
            x: 24.462350845336914,
            y: 3.9694221019744873,
            z: 19.041053771972656,
        },
        {
            x: 24.387487411499023,
            y: 3.9130024909973145,
            z: 18.748191833496094,
        },
        {
            x: 24.306325912475586,
            y: 3.8631458282470703,
            z: 18.468721389770508,
        },
        {
            x: 24.218372344970703,
            y: 3.8192460536956787,
            z: 18.20166778564453,
        },
        {
            x: 24.123140335083008,
            y: 3.7807016372680664,
            z: 17.946056365966797,
        },
        {
            x: 24.0201358795166,
            y: 3.7469100952148438,
            z: 17.700925827026367,
        },
        {
            x: 23.90888023376465,
            y: 3.7172701358795166,
            z: 17.46531105041504,
        },
        {
            x: 23.78887939453125,
            y: 3.6911792755126953,
            z: 17.238243103027344,
        },
        {
            x: 23.659704208374023,
            y: 3.6680691242218018,
            z: 17.01879119873047,
        },
        {
            x: 23.521791458129883,
            y: 3.6478049755096436,
            z: 16.806631088256836,
        },
        {
            x: 23.376127243041992,
            y: 3.6305477619171143,
            z: 16.601808547973633,
        },
        {
            x: 23.223722457885742,
            y: 3.6164650917053223,
            z: 16.404376983642578,
        },
        {
            x: 23.065589904785156,
            y: 3.6057236194610596,
            z: 16.21439552307129,
        },
        {
            x: 22.902734756469727,
            y: 3.598491907119751,
            z: 16.03192901611328,
        },
        {
            x: 22.73616600036621,
            y: 3.5949361324310303,
            z: 15.85702896118164,
        },
        {
            x: 22.56688690185547,
            y: 3.5952248573303223,
            z: 15.689756393432617,
        },
        {
            x: 22.395923614501953,
            y: 3.599525213241577,
            z: 15.530179023742676,
        },
        {
            x: 22.224281311035156,
            y: 3.6080048084259033,
            z: 15.378352165222168,
        },
        {
            x: 22.052961349487305,
            y: 3.620830774307251,
            z: 15.234334945678711,
        },
        {
            x: 21.88297462463379,
            y: 3.6381702423095703,
            z: 15.098182678222656,
        },
        {
            x: 21.71531867980957,
            y: 3.6601803302764893,
            z: 14.969942092895508,
        },
        {
            x: 21.550552368164062,
            y: 3.686704635620117,
            z: 14.849137306213379,
        },
        {
            x: 21.388774871826172,
            y: 3.7172300815582275,
            z: 14.73474407196045,
        },
        {
            x: 21.230037689208984,
            y: 3.7512288093566895,
            z: 14.625686645507812,
        },
        {
            x: 21.074399948120117,
            y: 3.7881710529327393,
            z: 14.520894050598145,
        },
        {
            x: 20.921920776367188,
            y: 3.827528238296509,
            z: 14.41930103302002,
        },
        {
            x: 20.77265739440918,
            y: 3.8687708377838135,
            z: 14.319836616516113,
        },
        {
            x: 20.626672744750977,
            y: 3.911369562149048,
            z: 14.221433639526367,
        },
        {
            x: 20.484020233154297,
            y: 3.9547977447509766,
            z: 14.123015403747559,
        },
        {
            x: 20.344770431518555,
            y: 3.9985220432281494,
            z: 14.023527145385742,
        },
        {
            x: 20.20897674560547,
            y: 4.042014122009277,
            z: 13.921892166137695,
        },
        {
            x: 20.07670021057129,
            y: 4.084746360778809,
            z: 13.81704330444336,
        },
        {
            x: 19.94799041748047,
            y: 4.126188278198242,
            z: 13.707915306091309,
        },
        {
            x: 19.822559356689453,
            y: 4.165838718414307,
            z: 13.593910217285156,
        },
        {
            x: 19.699466705322266,
            y: 4.203246116638184,
            z: 13.475293159484863,
        },
        {
            x: 19.57769775390625,
            y: 4.237964153289795,
            z: 13.352412223815918,
        },
        {
            x: 19.456253051757812,
            y: 4.2695441246032715,
            z: 13.225635528564453,
        },
        {
            x: 19.334117889404297,
            y: 4.297540187835693,
            z: 13.095315933227539,
        },
        {
            x: 19.210283279418945,
            y: 4.321505546569824,
            z: 12.961806297302246,
        },
        {
            x: 19.083740234375,
            y: 4.340993881225586,
            z: 12.82546615600586,
        },
        {
            x: 18.95347785949707,
            y: 4.355557918548584,
            z: 12.686649322509766,
        },
        {
            x: 18.8184871673584,
            y: 4.36475133895874,
            z: 12.545710563659668,
        },
        {
            x: 18.677753448486328,
            y: 4.368128299713135,
            z: 12.40300464630127,
        },
        {
            x: 18.5302791595459,
            y: 4.365240573883057,
            z: 12.258896827697754,
        },
        {
            x: 18.375049591064453,
            y: 4.355642318725586,
            z: 12.113739967346191,
        },
        {
            x: 18.21152687072754,
            y: 4.339148044586182,
            z: 11.967997550964355,
        },
        {
            x: 18.040672302246094,
            y: 4.316396713256836,
            z: 11.822497367858887,
        },
        {
            x: 17.863727569580078,
            y: 4.288184642791748,
            z: 11.678126335144043,
        },
        {
            x: 17.681936264038086,
            y: 4.255309581756592,
            z: 11.53576946258545,
        },
        {
            x: 17.496557235717773,
            y: 4.218572616577148,
            z: 11.396331787109375,
        },
        {
            x: 17.30883026123047,
            y: 4.178769588470459,
            z: 11.26069450378418,
        },
        {
            x: 17.12000274658203,
            y: 4.13670015335083,
            z: 11.129749298095703,
        },
        {
            x: 16.931324005126953,
            y: 4.093161582946777,
            z: 11.004388809204102,
        },
        {
            x: 16.744035720825195,
            y: 4.048952102661133,
            z: 10.885502815246582,
        },
        {
            x: 16.559385299682617,
            y: 4.00486946105957,
            z: 10.773980140686035,
        },
        {
            x: 16.378616333007812,
            y: 3.9617106914520264,
            z: 10.670707702636719,
        },
        {
            x: 16.202991485595703,
            y: 3.9202773571014404,
            z: 10.57658576965332,
        },
        {
            x: 16.033540725708008,
            y: 3.8811726570129395,
            z: 10.4923734664917,
        },
        {
            x: 15.870176315307617,
            y: 3.8439347743988037,
            z: 10.418131828308105,
        },
        {
            x: 15.712425231933594,
            y: 3.807738780975342,
            z: 10.353682518005371,
        },
        {
            x: 15.559808731079102,
            y: 3.771758556365967,
            z: 10.298849105834961,
        },
        {
            x: 15.411860466003418,
            y: 3.735168218612671,
            z: 10.25345230102539,
        },
        {
            x: 15.268088340759277,
            y: 3.6971397399902344,
            z: 10.21731185913086,
        },
        {
            x: 15.128037452697754,
            y: 3.656851291656494,
            z: 10.190255165100098,
        },
        {
            x: 14.991225242614746,
            y: 3.6134750843048096,
            z: 10.172100067138672,
        },
        {
            x: 14.857173919677734,
            y: 3.5661845207214355,
            z: 10.162670135498047,
        },
        {
            x: 14.725412368774414,
            y: 3.5141544342041016,
            z: 10.161786079406738,
        },
        {
            x: 14.595460891723633,
            y: 3.4565587043762207,
            z: 10.169268608093262,
        },
        {
            x: 14.466843605041504,
            y: 3.392568826675415,
            z: 10.184944152832031,
        },
        {
            x: 14.339129447937012,
            y: 3.3214845657348633,
            z: 10.208589553833008,
        },
        {
            x: 14.212270736694336,
            y: 3.2438197135925293,
            z: 10.239606857299805,
        },
        {
            x: 14.086441040039062,
            y: 3.1607940196990967,
            z: 10.2771635055542,
        },
        {
            x: 13.961814880371094,
            y: 3.073636770248413,
            z: 10.320428848266602,
        },
        {
            x: 13.83857250213623,
            y: 2.983576536178589,
            z: 10.368572235107422,
        },
        {
            x: 13.716894149780273,
            y: 2.8918426036834717,
            z: 10.42076301574707,
        },
        {
            x: 13.596949577331543,
            y: 2.7996599674224854,
            z: 10.476171493530273,
        },
        {
            x: 13.47892951965332,
            y: 2.708265781402588,
            z: 10.53396224975586,
        },
        {
            x: 13.363001823425293,
            y: 2.6188852787017822,
            z: 10.593304634094238,
        },
        {
            x: 13.24935531616211,
            y: 2.532747507095337,
            z: 10.653368949890137,
        },
        {
            x: 13.138157844543457,
            y: 2.4510810375213623,
            z: 10.713324546813965,
        },
        {
            x: 13.029590606689453,
            y: 2.375115394592285,
            z: 10.7723388671875,
        },
        {
            x: 12.923822402954102,
            y: 2.306032419204712,
            z: 10.829594612121582,
        },
        {
            x: 12.820816040039062,
            y: 2.244034767150879,
            z: 10.884570121765137,
        },
        {
            x: 12.720346450805664,
            y: 2.1884047985076904,
            z: 10.937010765075684,
        },
        {
            x: 12.622170448303223,
            y: 2.138380765914917,
            z: 10.986681938171387,
        },
        {
            x: 12.526053428649902,
            y: 2.0932040214538574,
            z: 11.033346176147461,
        },
        {
            x: 12.43175983428955,
            y: 2.052114963531494,
            z: 11.076766014099121,
        },
        {
            x: 12.339048385620117,
            y: 2.014354944229126,
            z: 11.116703987121582,
        },
        {
            x: 12.2476806640625,
            y: 1.9791638851165771,
            z: 11.152921676635742,
        },
        {
            x: 12.157418251037598,
            y: 1.9457824230194092,
            z: 11.185184478759766,
        },
        {
            x: 12.068031311035156,
            y: 1.9134539365768433,
            z: 11.213253021240234,
        },
        {
            x: 11.979278564453125,
            y: 1.8814178705215454,
            z: 11.23688793182373,
        },
        {
            x: 11.890920639038086,
            y: 1.8489148616790771,
            z: 11.255853652954102,
        },
        {
            x: 11.80272388458252,
            y: 1.8151935338974,
            z: 11.269915580749512,
        },
        {
            x: 11.714607238769531,
            y: 1.7799261808395386,
            z: 11.278990745544434,
        },
        {
            x: 11.62672233581543,
            y: 1.7434442043304443,
            z: 11.283239364624023,
        },
        {
            x: 11.539260864257812,
            y: 1.7061395645141602,
            z: 11.282838821411133,
        },
        {
            x: 11.452388763427734,
            y: 1.6683993339538574,
            z: 11.277965545654297,
        },
        {
            x: 11.366291046142578,
            y: 1.630612850189209,
            z: 11.268798828125,
        },
        {
            x: 11.281142234802246,
            y: 1.5931689739227295,
            z: 11.255518913269043,
        },
        {
            x: 11.197123527526855,
            y: 1.5564565658569336,
            z: 11.238300323486328,
        },
        {
            x: 11.114408493041992,
            y: 1.520864725112915,
            z: 11.217321395874023,
        },
        {
            x: 11.03317642211914,
            y: 1.4867805242538452,
            z: 11.19276237487793,
        },
        {
            x: 10.953609466552734,
            y: 1.4545964002609253,
            z: 11.164800643920898,
        },
        {
            x: 10.875885009765625,
            y: 1.4246996641159058,
            z: 11.133615493774414,
        },
        {
            x: 10.800176620483398,
            y: 1.3974788188934326,
            z: 11.099382400512695,
        },
        {
            x: 10.726621627807617,
            y: 1.3733106851577759,
            z: 11.062312126159668,
        },
        {
            x: 10.65523624420166,
            y: 1.352536916732788,
            z: 11.022686958312988,
        },
        {
            x: 10.58602237701416,
            y: 1.3354952335357666,
            z: 10.980805397033691,
        },
        {
            x: 10.518978118896484,
            y: 1.3225221633911133,
            z: 10.936960220336914,
        },
        {
            x: 10.454105377197266,
            y: 1.3139560222625732,
            z: 10.891453742980957,
        },
        {
            x: 10.391404151916504,
            y: 1.3101330995559692,
            z: 10.844581604003906,
        },
        {
            x: 10.330873489379883,
            y: 1.311390995979309,
            z: 10.796640396118164,
        },
        {
            x: 10.272515296936035,
            y: 1.3180663585662842,
            z: 10.747923851013184,
        },
        {
            x: 10.216325759887695,
            y: 1.3304965496063232,
            z: 10.698732376098633,
        },
        {
            x: 10.162308692932129,
            y: 1.3490186929702759,
            z: 10.649362564086914,
        },
        {
            x: 10.110458374023438,
            y: 1.3739712238311768,
            z: 10.600107192993164,
        },
        {
            x: 10.060783386230469,
            y: 1.4056891202926636,
            z: 10.55126953125,
        },
        {
            x: 10.013251304626465,
            y: 1.4443540573120117,
            z: 10.503046035766602,
        },
        {
            x: 9.967720031738281,
            y: 1.4894415140151978,
            z: 10.455205917358398,
        },
        {
            x: 9.92401123046875,
            y: 1.5402265787124634,
            z: 10.407391548156738,
        },
        {
            x: 9.88194465637207,
            y: 1.5959845781326294,
            z: 10.359245300292969,
        },
        {
            x: 9.84134292602539,
            y: 1.6559948921203613,
            z: 10.310409545898438,
        },
        {
            x: 9.802029609680176,
            y: 1.719526767730713,
            z: 10.260534286499023,
        },
        {
            x: 9.763824462890625,
            y: 1.7858586311340332,
            z: 10.209259033203125,
        },
        {
            x: 9.726552963256836,
            y: 1.8542664051055908,
            z: 10.156228065490723,
        },
        {
            x: 9.690032958984375,
            y: 1.924025297164917,
            z: 10.101085662841797,
        },
        {
            x: 9.654088973999023,
            y: 1.9944109916687012,
            z: 10.043474197387695,
        },
        {
            x: 9.61854076385498,
            y: 2.0646989345550537,
            z: 9.983038902282715,
        },
        {
            x: 9.583209991455078,
            y: 2.1341686248779297,
            z: 9.919421195983887,
        },
        {
            x: 9.547913551330566,
            y: 2.202141046524048,
            z: 9.852307319641113,
        },
        {
            x: 9.512385368347168,
            y: 2.268373727798462,
            z: 9.781716346740723,
        },
        {
            x: 9.476332664489746,
            y: 2.33282732963562,
            z: 9.707822799682617,
        },
        {
            x: 9.439455032348633,
            y: 2.395462989807129,
            z: 9.630804061889648,
        },
        {
            x: 9.401459693908691,
            y: 2.456242799758911,
            z: 9.550840377807617,
        },
        {
            x: 9.362046241760254,
            y: 2.5151281356811523,
            z: 9.468108177185059,
        },
        {
            x: 9.320918083190918,
            y: 2.5720832347869873,
            z: 9.382781982421875,
        },
        {
            x: 9.277780532836914,
            y: 2.6270642280578613,
            z: 9.295047760009766,
        },
        {
            x: 9.232335090637207,
            y: 2.6800358295440674,
            z: 9.20508098602295,
        },
        {
            x: 9.184287071228027,
            y: 2.730959892272949,
            z: 9.113058090209961,
        },
        {
            x: 9.133336067199707,
            y: 2.779797077178955,
            z: 9.019158363342285,
        },
        {
            x: 9.079187393188477,
            y: 2.826509714126587,
            z: 8.923559188842773,
        },
        {
            x: 9.021566390991211,
            y: 2.8710594177246094,
            z: 8.826437950134277,
        },
        {
            x: 8.960540771484375,
            y: 2.9134130477905273,
            z: 8.72793197631836,
        },
        {
            x: 8.896464347839355,
            y: 2.9535329341888428,
            z: 8.628171920776367,
        },
        {
            x: 8.829689979553223,
            y: 2.991389036178589,
            z: 8.52727222442627,
        },
        {
            x: 8.760576248168945,
            y: 3.026947259902954,
            z: 8.4253511428833,
        },
        {
            x: 8.689477920532227,
            y: 3.0601751804351807,
            z: 8.322526931762695,
        },
        {
            x: 8.616751670837402,
            y: 3.0910401344299316,
            z: 8.21891975402832,
        },
        {
            x: 8.54274845123291,
            y: 3.11950945854187,
            z: 8.114641189575195,
        },
        {
            x: 8.467832565307617,
            y: 3.145547389984131,
            z: 8.009820938110352,
        },
        {
            x: 8.392358779907227,
            y: 3.169123649597168,
            z: 7.904573440551758,
        },
        {
            x: 8.316681861877441,
            y: 3.190204381942749,
            z: 7.799017429351807,
        },
        {
            x: 8.241157531738281,
            y: 3.208756685256958,
            z: 7.693270683288574,
        },
        {
            x: 8.16611385345459,
            y: 3.2247493267059326,
            z: 7.587420463562012,
        },
        {
            x: 8.090747833251953,
            y: 3.2382547855377197,
            z: 7.4802751541137695,
        },
        {
            x: 8.012781143188477,
            y: 3.2494750022888184,
            z: 7.368973731994629,
        },
        {
            x: 7.929844856262207,
            y: 3.2586209774017334,
            z: 7.250556468963623,
        },
        {
            x: 7.839560508728027,
            y: 3.2659058570861816,
            z: 7.1220502853393555,
        },
        {
            x: 7.739555358886719,
            y: 3.271541118621826,
            z: 6.9804863929748535,
        },
        {
            x: 7.627451419830322,
            y: 3.275738477706909,
            z: 6.8228960037231445,
        },
        {
            x: 7.500874996185303,
            y: 3.2787091732025146,
            z: 6.646310329437256,
        },
        {
            x: 7.357451915740967,
            y: 3.2806663513183594,
            z: 6.447761058807373,
        },
        {
            x: 7.194797039031982,
            y: 3.281820297241211,
            z: 6.224267482757568,
        },
        {
            x: 7.010552406311035,
            y: 3.2823843955993652,
            z: 5.972883224487305,
        },
        {
            x: 6.802334308624268,
            y: 3.2825686931610107,
            z: 5.690627574920654,
        },
        {
            x: 6.567780494689941,
            y: 3.282586097717285,
            z: 5.374546527862549,
        },
        {
            x: 6.306539535522461,
            y: 3.282586097717285,
            z: 5.02419900894165,
        },
        {
            x: 6.022616863250732,
            y: 3.282586097717285,
            z: 4.644576549530029,
        },
        {
            x: 5.720569133758545,
            y: 3.282585859298706,
            z: 4.241359233856201,
        },
        {
            x: 5.404996395111084,
            y: 3.282586097717285,
            z: 3.8202850818634033,
        },
        {
            x: 5.08045768737793,
            y: 3.2825863361358643,
            z: 3.387035608291626,
        },
        {
            x: 4.751524448394775,
            y: 3.282585859298706,
            z: 2.9473111629486084,
        },
        {
            x: 4.422767639160156,
            y: 3.282585859298706,
            z: 2.5068113803863525,
        },
        {
            x: 4.09876012802124,
            y: 3.282585859298706,
            z: 2.0712363719940186,
        },
        {
            x: 3.784073829650879,
            y: 3.282585859298706,
            z: 1.646285891532898,
        },
        {
            x: 3.483266830444336,
            y: 3.282585859298706,
            z: 1.2376420497894287,
        },
        {
            x: 3.2009389400482178,
            y: 3.282586097717285,
            z: 0.851042628288269,
        },
        {
            x: 2.941647529602051,
            y: 3.282586097717285,
            z: 0.49216780066490173,
        },
        {
            x: 2.708773374557495,
            y: 3.282527208328247,
            z: 0.16525015234947205,
        },
        {
            x: 2.501267194747925,
            y: 3.2821333408355713,
            z: -0.13093653321266174,
        },
        {
            x: 2.317051410675049,
            y: 3.2810771465301514,
            z: -0.398885577917099,
        },
        {
            x: 2.1540472507476807,
            y: 3.27903151512146,
            z: -0.641090989112854,
        },
        {
            x: 2.0101706981658936,
            y: 3.2756683826446533,
            z: -0.8600559830665588,
        },
        {
            x: 1.883357048034668,
            y: 3.2706613540649414,
            z: -1.0582542419433594,
        },
        {
            x: 1.7715206146240234,
            y: 3.263683319091797,
            z: -1.2381900548934937,
        },
        {
            x: 1.6725834608078003,
            y: 3.254406452178955,
            z: -1.4023573398590088,
        },
        {
            x: 1.5844674110412598,
            y: 3.2425036430358887,
            z: -1.553249478340149,
        },
        {
            x: 1.5050946474075317,
            y: 3.2276484966278076,
            z: -1.6933608055114746,
        },
        {
            x: 1.4323869943618774,
            y: 3.20951247215271,
            z: -1.8251843452453613,
        },
        {
            x: 1.3642629384994507,
            y: 3.1877686977386475,
            z: -1.9512202739715576,
        },
        {
            x: 1.2988369464874268,
            y: 3.162116289138794,
            z: -2.073700189590454,
        },
        {
            x: 1.2354336977005005,
            y: 3.13242244720459,
            z: -2.193234443664551,
        },
        {
            x: 1.1738742589950562,
            y: 3.098623275756836,
            z: -2.309765338897705,
        },
        {
            x: 1.1139799356460571,
            y: 3.060652732849121,
            z: -2.423232316970825,
        },
        {
            x: 1.0555731058120728,
            y: 3.018449306488037,
            z: -2.5335781574249268,
        },
        {
            x: 0.9984727501869202,
            y: 2.9719438552856445,
            z: -2.640746593475342,
        },
        {
            x: 0.942505955696106,
            y: 2.9210782051086426,
            z: -2.744668960571289,
        },
        {
            x: 0.8874922394752502,
            y: 2.8657853603363037,
            z: -2.8452916145324707,
        },
        {
            x: 0.8332532048225403,
            y: 2.8060011863708496,
            z: -2.942553997039795,
        },
        {
            x: 0.7796108722686768,
            y: 2.7416610717773438,
            z: -3.0363972187042236,
        },
        {
            x: 0.726387083530426,
            y: 2.672701597213745,
            z: -3.1267619132995605,
        },
        {
            x: 0.6734036207199097,
            y: 2.599058151245117,
            z: -3.2135889530181885,
        },
        {
            x: 0.6204936504364014,
            y: 2.520718812942505,
            z: -3.2968332767486572,
        },
        {
            x: 0.5676653385162354,
            y: 2.4383764266967773,
            z: -3.376573085784912,
        },
        {
            x: 0.5150331854820251,
            y: 2.353181838989258,
            z: -3.452988862991333,
        },
        {
            x: 0.46271565556526184,
            y: 2.26629638671875,
            z: -3.526258707046509,
        },
        {
            x: 0.4108317196369171,
            y: 2.1788833141326904,
            z: -3.5965611934661865,
        },
        {
            x: 0.3594999611377716,
            y: 2.0921037197113037,
            z: -3.6640737056732178,
        },
        {
            x: 0.30883923172950745,
            y: 2.007120370864868,
            z: -3.7289745807647705,
        },
        {
            x: 0.2589658200740814,
            y: 1.92509126663208,
            z: -3.7914443016052246,
        },
        {
            x: 0.21000339090824127,
            y: 1.8471870422363281,
            z: -3.851656913757324,
        },
        {
            x: 0.16206811368465424,
            y: 1.774565577507019,
            z: -3.909792184829712,
        },
        {
            x: 0.11527884006500244,
            y: 1.7083888053894043,
            z: -3.9660282135009766,
        },
        {
            x: 0.06975433230400085,
            y: 1.649819254875183,
            z: -4.020543098449707,
        },
        {
            x: 0.025607381016016006,
            y: 1.5999934673309326,
            z: -4.073517799377441,
        },
        {
            x: -0.017211593687534332,
            y: 1.559352159500122,
            z: -4.125216007232666,
        },
        {
            x: -0.058932822197675705,
            y: 1.5275670289993286,
            z: -4.175989627838135,
        },
        {
            x: -0.09978994727134705,
            y: 1.5042766332626343,
            z: -4.226191997528076,
        },
        {
            x: -0.14002245664596558,
            y: 1.4891129732131958,
            z: -4.276180744171143,
        },
        {
            x: -0.17986780405044556,
            y: 1.4817107915878296,
            z: -4.32631254196167,
        },
        {
            x: -0.21956351399421692,
            y: 1.4817047119140625,
            z: -4.376943111419678,
        },
        {
            x: -0.2593470811843872,
            y: 1.4887287616729736,
            z: -4.42842960357666,
        },
        {
            x: -0.299457848072052,
            y: 1.5024186372756958,
            z: -4.4811296463012695,
        },
        {
            x: -0.34012967348098755,
            y: 1.5224074125289917,
            z: -4.535395622253418,
        },
        {
            x: -0.38160181045532227,
            y: 1.5483300685882568,
            z: -4.591585636138916,
        },
        {
            x: -0.42411184310913086,
            y: 1.5798208713531494,
            z: -4.650055408477783,
        },
        {
            x: -0.4678959846496582,
            y: 1.616517186164856,
            z: -4.711161136627197,
        },
        {
            x: -0.5130720138549805,
            y: 1.658290147781372,
            z: -4.775076866149902,
        },
        {
            x: -0.5595436096191406,
            y: 1.7054357528686523,
            z: -4.841660499572754,
        },
        {
            x: -0.6071944236755371,
            y: 1.7582966089248657,
            z: -4.910736560821533,
        },
        {
            x: -0.6559011340141296,
            y: 1.8172072172164917,
            z: -4.982120037078857,
        },
        {
            x: -0.7055472135543823,
            y: 1.8825109004974365,
            z: -5.055635929107666,
        },
        {
            x: -0.7560140490531921,
            y: 1.954547643661499,
            z: -5.131106853485107,
        },
        {
            x: -0.8071825504302979,
            y: 2.0336568355560303,
            z: -5.208353519439697,
        },
        {
            x: -0.8589344620704651,
            y: 2.1201794147491455,
            z: -5.2871994972229,
        },
        {
            x: -0.9111506342887878,
            y: 2.2144548892974854,
            z: -5.367465019226074,
        },
        {
            x: -0.9637147188186646,
            y: 2.3168280124664307,
            z: -5.448976516723633,
        },
        {
            x: -1.0165033340454102,
            y: 2.4276299476623535,
            z: -5.531547546386719,
        },
        {
            x: -1.0694001913070679,
            y: 2.5472054481506348,
            z: -5.6150054931640625,
        },
        {
            x: -1.1223629713058472,
            y: 2.675520896911621,
            z: -5.699195861816406,
        },
        {
            x: -1.1755845546722412,
            y: 2.8114023208618164,
            z: -5.784045219421387,
        },
        {
            x: -1.2293025255203247,
            y: 2.9534571170806885,
            z: -5.869494915008545,
        },
        {
            x: -1.2837539911270142,
            y: 3.100292444229126,
            z: -5.955483913421631,
        },
        {
            x: -1.3391796350479126,
            y: 3.250523328781128,
            z: -6.041958332061768,
        },
        {
            x: -1.3958113193511963,
            y: 3.402742862701416,
            z: -6.128849983215332,
        },
        {
            x: -1.45388925075531,
            y: 3.555565357208252,
            z: -6.216104030609131,
        },
        {
            x: -1.51365065574646,
            y: 3.707597255706787,
            z: -6.303658962249756,
        },
        {
            x: -1.5753337144851685,
            y: 3.857448101043701,
            z: -6.391458511352539,
        },
        {
            x: -1.639175534248352,
            y: 4.003723621368408,
            z: -6.479443073272705,
        },
        {
            x: -1.7054164409637451,
            y: 4.14503812789917,
            z: -6.567554473876953,
        },
        {
            x: -1.7742880582809448,
            y: 4.279986381530762,
            z: -6.655727386474609,
        },
        {
            x: -1.8458786010742188,
            y: 4.407388687133789,
            z: -6.743922233581543,
        },
        {
            x: -1.9194518327713013,
            y: 4.527166843414307,
            z: -6.832167625427246,
        },
        {
            x: -1.993999719619751,
            y: 4.639616012573242,
            z: -6.920528888702393,
        },
        {
            x: -2.068511962890625,
            y: 4.745027542114258,
            z: -7.009061336517334,
        },
        {
            x: -2.1419801712036133,
            y: 4.843695163726807,
            z: -7.0978240966796875,
        },
        {
            x: -2.2133967876434326,
            y: 4.935915946960449,
            z: -7.186883449554443,
        },
        {
            x: -2.281747341156006,
            y: 5.021977424621582,
            z: -7.276289463043213,
        },
        {
            x: -2.346025228500366,
            y: 5.102174282073975,
            z: -7.366106033325195,
        },
        {
            x: -2.4052205085754395,
            y: 5.176799774169922,
            z: -7.456390380859375,
        },
        {
            x: -2.458324432373047,
            y: 5.24614953994751,
            z: -7.547203540802002,
        },
        {
            x: -2.5043275356292725,
            y: 5.3105149269104,
            z: -7.638605117797852,
        },
        {
            x: -2.542219877243042,
            y: 5.370190620422363,
            z: -7.730652809143066,
        },
        {
            x: -2.5710811614990234,
            y: 5.4254655838012695,
            z: -7.823409080505371,
        },
        {
            x: -2.590837001800537,
            y: 5.476568222045898,
            z: -7.916884899139404,
        },
        {
            x: -2.601898670196533,
            y: 5.52370023727417,
            z: -8.011082649230957,
        },
        {
            x: -2.604682445526123,
            y: 5.567063808441162,
            z: -8.106005668640137,
        },
        {
            x: -2.5996034145355225,
            y: 5.6068572998046875,
            z: -8.201651573181152,
        },
        {
            x: -2.5870771408081055,
            y: 5.643281936645508,
            z: -8.298020362854004,
        },
        {
            x: -2.567519426345825,
            y: 5.676538467407227,
            z: -8.395112991333008,
        },
        {
            x: -2.5413453578948975,
            y: 5.706828594207764,
            z: -8.492935180664062,
        },
        {
            x: -2.5089714527130127,
            y: 5.734349727630615,
            z: -8.591474533081055,
        },
        {
            x: -2.470813512802124,
            y: 5.759303569793701,
            z: -8.690738677978516,
        },
        {
            x: -2.4272866249084473,
            y: 5.781890392303467,
            z: -8.790726661682129,
        },
        {
            x: -2.3788065910339355,
            y: 5.802310943603516,
            z: -8.891437530517578,
        },
        {
            x: -2.3257651329040527,
            y: 5.8207621574401855,
            z: -8.992887496948242,
        },
        {
            x: -2.268080711364746,
            y: 5.837368965148926,
            z: -9.095388412475586,
        },
        {
            x: -2.205240488052368,
            y: 5.852194309234619,
            z: -9.199517250061035,
        },
        {
            x: -2.136707305908203,
            y: 5.865293502807617,
            z: -9.30587100982666,
        },
        {
            x: -2.0619468688964844,
            y: 5.876725196838379,
            z: -9.415042877197266,
        },
        {
            x: -1.9804250001907349,
            y: 5.886549472808838,
            z: -9.527626991271973,
        },
        {
            x: -1.8916072845458984,
            y: 5.894822120666504,
            z: -9.644217491149902,
        },
        {
            x: -1.7949590682983398,
            y: 5.901602268218994,
            z: -9.765406608581543,
        },
        {
            x: -1.6899410486221313,
            y: 5.906948089599609,
            z: -9.891797065734863,
        },
        {
            x: -1.5760293006896973,
            y: 5.91091775894165,
            z: -10.023968696594238,
        },
        {
            x: -1.4526835680007935,
            y: 5.913568019866943,
            z: -10.162521362304688,
        },
        {
            x: -1.3193702697753906,
            y: 5.9149580001831055,
            z: -10.308049201965332,
        },
        {
            x: -1.1755688190460205,
            y: 5.9151458740234375,
            z: -10.461135864257812,
        },
        {
            x: -1.0215626955032349,
            y: 5.9142231941223145,
            z: -10.621807098388672,
        },
        {
            x: -0.8588526844978333,
            y: 5.912328243255615,
            z: -10.789241790771484,
        },
        {
            x: -0.6890345215797424,
            y: 5.909605026245117,
            z: -10.96256160736084,
        },
        {
            x: -0.5137268304824829,
            y: 5.906195640563965,
            z: -11.14085578918457,
        },
        {
            x: -0.334524929523468,
            y: 5.902245044708252,
            z: -11.3232421875,
        },
        {
            x: -0.15303216874599457,
            y: 5.897895336151123,
            z: -11.508832931518555,
        },
        {
            x: 0.02914860099554062,
            y: 5.893289566040039,
            z: -11.696734428405762,
        },
        {
            x: 0.2104140818119049,
            y: 5.888572692871094,
            z: -11.886056900024414,
        },
        {
            x: 0.38916105031967163,
            y: 5.883886337280273,
            z: -12.075910568237305,
        },
        {
            x: 0.5637946724891663,
            y: 5.879373550415039,
            z: -12.265410423278809,
        },
        {
            x: 0.7326954007148743,
            y: 5.875178813934326,
            z: -12.453654289245605,
        },
        {
            x: 0.8942691683769226,
            y: 5.871445655822754,
            z: -12.639756202697754,
        },
        {
            x: 1.0472755432128906,
            y: 5.8682756423950195,
            z: -12.823111534118652,
        },
        {
            x: 1.191393256187439,
            y: 5.86567497253418,
            z: -13.0038480758667,
        },
        {
            x: 1.3264440298080444,
            y: 5.863629341125488,
            z: -13.182204246520996,
        },
        {
            x: 1.452255129814148,
            y: 5.862124919891357,
            z: -13.35842227935791,
        },
        {
            x: 1.5686370134353638,
            y: 5.861152172088623,
            z: -13.532723426818848,
        },
        {
            x: 1.675417423248291,
            y: 5.860696792602539,
            z: -13.705354690551758,
        },
        {
            x: 1.7724182605743408,
            y: 5.860746383666992,
            z: -13.87655258178711,
        },
        {
            x: 1.8594616651535034,
            y: 5.861289978027344,
            z: -14.046558380126953,
        },
        {
            x: 1.936368703842163,
            y: 5.8623127937316895,
            z: -14.215600967407227,
        },
        {
            x: 2.002962350845337,
            y: 5.863803386688232,
            z: -14.383925437927246,
        },
        {
            x: 2.0590662956237793,
            y: 5.865750789642334,
            z: -14.551777839660645,
        },
        {
            x: 2.104497194290161,
            y: 5.868140697479248,
            z: -14.719375610351562,
        },
        {
            x: 2.138873815536499,
            y: 5.870950222015381,
            z: -14.88718032836914,
        },
        {
            x: 2.160902500152588,
            y: 5.874111652374268,
            z: -15.05659294128418,
        },
        {
            x: 2.169039726257324,
            y: 5.877544403076172,
            z: -15.229276657104492,
        },
        {
            x: 2.1617422103881836,
            y: 5.881167888641357,
            z: -15.406896591186523,
        },
        {
            x: 2.137465715408325,
            y: 5.8849005699157715,
            z: -15.591109275817871,
        },
        {
            x: 2.0946640968322754,
            y: 5.888661861419678,
            z: -15.783590316772461,
        },
        {
            x: 2.0317976474761963,
            y: 5.892370700836182,
            z: -15.98598575592041,
        },
        {
            x: 1.947320818901062,
            y: 5.895946025848389,
            z: -16.199960708618164,
        },
        {
            x: 1.8396904468536377,
            y: 5.899307727813721,
            z: -16.42718505859375,
        },
        {
            x: 1.7073620557785034,
            y: 5.902374744415283,
            z: -16.669315338134766,
        },
        {
            x: 1.5487922430038452,
            y: 5.905065059661865,
            z: -16.928016662597656,
        },
        {
            x: 1.362428069114685,
            y: 5.907299518585205,
            z: -17.204967498779297,
        },
        {
            x: 1.1472511291503906,
            y: 5.909005165100098,
            z: -17.501415252685547,
        },
        {
            x: 0.9062178730964661,
            y: 5.910179615020752,
            z: -17.815608978271484,
        },
        {
            x: 0.6441858410835266,
            y: 5.910854339599609,
            z: -18.144359588623047,
        },
        {
            x: 0.3660234212875366,
            y: 5.911059379577637,
            z: -18.484453201293945,
        },
        {
            x: 0.07659965753555298,
            y: 5.910824775695801,
            z: -18.832687377929688,
        },
        {
            x: -0.2192169427871704,
            y: 5.910183429718018,
            z: -19.18585777282715,
        },
        {
            x: -0.5165711641311646,
            y: 5.909162998199463,
            z: -19.5407657623291,
        },
        {
            x: -0.8105666637420654,
            y: 5.907797813415527,
            z: -19.894184112548828,
        },
        {
            x: -1.0963484048843384,
            y: 5.906116962432861,
            z: -20.2429141998291,
        },
        {
            x: -1.3690478801727295,
            y: 5.904150009155273,
            z: -20.58375358581543,
        },
        {
            x: -1.6237961053848267,
            y: 5.90192985534668,
            z: -20.913496017456055,
        },
        {
            x: -1.855724573135376,
            y: 5.899486064910889,
            z: -21.228933334350586,
        },
        {
            x: -2.060237407684326,
            y: 5.896849632263184,
            z: -21.527009963989258,
        },
        {
            x: -2.2369320392608643,
            y: 5.894057750701904,
            z: -21.806989669799805,
        },
        {
            x: -2.388702869415283,
            y: 5.891147613525391,
            z: -22.06998062133789,
        },
        {
            x: -2.5184788703918457,
            y: 5.888162612915039,
            z: -22.317033767700195,
        },
        {
            x: -2.6292781829833984,
            y: 5.885139465332031,
            z: -22.549375534057617,
        },
        {
            x: -2.724027395248413,
            y: 5.882119178771973,
            z: -22.76803970336914,
        },
        {
            x: -2.8057308197021484,
            y: 5.879141330718994,
            z: -22.974239349365234,
        },
        {
            x: -2.8773269653320312,
            y: 5.876246452331543,
            z: -23.169029235839844,
        },
        {
            x: -2.9418106079101562,
            y: 5.873472690582275,
            z: -23.353605270385742,
        },
        {
            x: -3.0021331310272217,
            y: 5.870862007141113,
            z: -23.5290470123291,
        },
        {
            x: -3.0612680912017822,
            y: 5.868453502655029,
            z: -23.696495056152344,
        },
        {
            x: -3.122184991836548,
            y: 5.866286277770996,
            z: -23.85708236694336,
        },
        {
            x: -3.1878161430358887,
            y: 5.8643999099731445,
            z: -24.011919021606445,
        },
        {
            x: -3.259725332260132,
            y: 5.862805366516113,
            z: -24.16154670715332,
        },
        {
            x: -3.3377292156219482,
            y: 5.8614821434021,
            z: -24.305776596069336,
        },
        {
            x: -3.4215385913848877,
            y: 5.860402584075928,
            z: -24.44437599182129,
        },
        {
            x: -3.5108330249786377,
            y: 5.8595428466796875,
            z: -24.577077865600586,
        },
        {
            x: -3.605349540710449,
            y: 5.858878135681152,
            z: -24.70369529724121,
        },
        {
            x: -3.7047553062438965,
            y: 5.858383655548096,
            z: -24.82394027709961,
        },
        {
            x: -3.8087899684906006,
            y: 5.858033180236816,
            z: -24.9376163482666,
        },
        {
            x: -3.917119264602661,
            y: 5.857803821563721,
            z: -25.044452667236328,
        },
        {
            x: -4.029484748840332,
            y: 5.857667446136475,
            z: -25.144243240356445,
        },
        {
            x: -4.145561218261719,
            y: 5.857601165771484,
            z: -25.236724853515625,
        },
        {
            x: -4.265059471130371,
            y: 5.857579231262207,
            z: -25.321670532226562,
        },
        {
            x: -4.387685775756836,
            y: 5.857577800750732,
            z: -25.39884376525879,
        },
        {
            x: -4.51330041885376,
            y: 5.857577800750732,
            z: -25.46814727783203,
        },
        {
            x: -4.642099380493164,
            y: 5.857578277587891,
            z: -25.5297794342041,
        },
        {
            x: -4.774319648742676,
            y: 5.857577800750732,
            z: -25.583984375,
        },
        {
            x: -4.910211086273193,
            y: 5.857577800750732,
            z: -25.63098907470703,
        },
        {
            x: -5.04997444152832,
            y: 5.857577800750732,
            z: -25.671030044555664,
        },
        {
            x: -5.1938982009887695,
            y: 5.857577800750732,
            z: -25.704364776611328,
        },
        {
            x: -5.342165946960449,
            y: 5.857577323913574,
            z: -25.731203079223633,
        },
        {
            x: -5.4950714111328125,
            y: 5.857578277587891,
            z: -25.751808166503906,
        },
        {
            x: -5.6527934074401855,
            y: 5.857577800750732,
            z: -25.766395568847656,
        },
        {
            x: -5.815629959106445,
            y: 5.857577800750732,
            z: -25.775218963623047,
        },
        {
            x: -5.983773708343506,
            y: 5.857578277587891,
            z: -25.77851104736328,
        },
        {
            x: -6.157475471496582,
            y: 5.857577323913574,
            z: -25.776500701904297,
        },
        {
            x: -6.336745262145996,
            y: 5.857431411743164,
            z: -25.769548416137695,
        },
        {
            x: -6.5207624435424805,
            y: 5.856460094451904,
            z: -25.758386611938477,
        },
        {
            x: -6.7085161209106445,
            y: 5.853864669799805,
            z: -25.74384880065918,
        },
        {
            x: -6.898998737335205,
            y: 5.848848342895508,
            z: -25.726770401000977,
        },
        {
            x: -7.091198444366455,
            y: 5.840609550476074,
            z: -25.70797348022461,
        },
        {
            x: -7.284107685089111,
            y: 5.828351020812988,
            z: -25.68829917907715,
        },
        {
            x: -7.476717472076416,
            y: 5.811273574829102,
            z: -25.668569564819336,
        },
        {
            x: -7.668017387390137,
            y: 5.788578987121582,
            z: -25.649627685546875,
        },
        {
            x: -7.8570146560668945,
            y: 5.759465217590332,
            z: -25.632287979125977,
        },
        {
            x: -8.0426664352417,
            y: 5.723138809204102,
            z: -25.617395401000977,
        },
        {
            x: -8.223980903625488,
            y: 5.678797721862793,
            z: -25.60578155517578,
        },
        {
            x: -8.399948120117188,
            y: 5.625644683837891,
            z: -25.598268508911133,
        },
        {
            x: -8.569725036621094,
            y: 5.563057899475098,
            z: -25.595565795898438,
        },
        {
            x: -8.73354434967041,
            y: 5.4915595054626465,
            z: -25.597583770751953,
        },
        {
            x: -8.892056465148926,
            y: 5.412118911743164,
            z: -25.603893280029297,
        },
        {
            x: -9.045912742614746,
            y: 5.32570743560791,
            z: -25.61408233642578,
        },
        {
            x: -9.195770263671875,
            y: 5.2332987785339355,
            z: -25.62774658203125,
        },
        {
            x: -9.342279434204102,
            y: 5.1358642578125,
            z: -25.64445686340332,
        },
        {
            x: -9.48609447479248,
            y: 5.0343732833862305,
            z: -25.66380500793457,
        },
        {
            x: -9.62786865234375,
            y: 4.929800033569336,
            z: -25.685375213623047,
        },
        {
            x: -9.7682523727417,
            y: 4.823114395141602,
            z: -25.708744049072266,
        },
        {
            x: -9.907915115356445,
            y: 4.715278625488281,
            z: -25.733505249023438,
        },
        {
            x: -10.047483444213867,
            y: 4.607285022735596,
            z: -25.75924301147461,
        },
        {
            x: -10.187621116638184,
            y: 4.500094890594482,
            z: -25.785533905029297,
        },
        {
            x: -10.328950881958008,
            y: 4.394577503204346,
            z: -25.811969757080078,
        },
        {
            x: -10.471683502197266,
            y: 4.290367603302002,
            z: -25.838171005249023,
        },
        {
            x: -10.615764617919922,
            y: 4.186291217803955,
            z: -25.863780975341797,
        },
        {
            x: -10.761134147644043,
            y: 4.081158638000488,
            z: -25.888446807861328,
        },
        {
            x: -10.907734870910645,
            y: 3.9737792015075684,
            z: -25.911806106567383,
        },
        {
            x: -11.055505752563477,
            y: 3.862963914871216,
            z: -25.933509826660156,
        },
        {
            x: -11.204387664794922,
            y: 3.747520923614502,
            z: -25.953189849853516,
        },
        {
            x: -11.354321479797363,
            y: 3.626262903213501,
            z: -25.970504760742188,
        },
        {
            x: -11.505248069763184,
            y: 3.4979982376098633,
            z: -25.985090255737305,
        },
        {
            x: -11.657108306884766,
            y: 3.3615376949310303,
            z: -25.99658966064453,
        },
        {
            x: -11.809842109680176,
            y: 3.215690851211548,
            z: -26.004650115966797,
        },
        {
            x: -11.963403701782227,
            y: 3.0592522621154785,
            z: -26.0089111328125,
        },
        {
            x: -12.117703437805176,
            y: 2.891129732131958,
            z: -26.0090274810791,
        },
        {
            x: -12.272642135620117,
            y: 2.7119617462158203,
            z: -26.00496482849121,
        },
        {
            x: -12.428040504455566,
            y: 2.52431321144104,
            z: -25.996994018554688,
        },
        {
            x: -12.583724021911621,
            y: 2.3308444023132324,
            z: -25.985414505004883,
        },
        {
            x: -12.739510536193848,
            y: 2.1342153549194336,
            z: -25.970523834228516,
        },
        {
            x: -12.895225524902344,
            y: 1.9370859861373901,
            z: -25.952625274658203,
        },
        {
            x: -13.050688743591309,
            y: 1.742116093635559,
            z: -25.932003021240234,
        },
        {
            x: -13.20572280883789,
            y: 1.5519659519195557,
            z: -25.908960342407227,
        },
        {
            x: -13.360151290893555,
            y: 1.3692954778671265,
            z: -25.883798599243164,
        },
        {
            x: -13.513792991638184,
            y: 1.1967647075653076,
            z: -25.8568058013916,
        },
        {
            x: -13.666471481323242,
            y: 1.0370336771011353,
            z: -25.82828712463379,
        },
        {
            x: -13.81800651550293,
            y: 0.8927621245384216,
            z: -25.79852867126465,
        },
        {
            x: -13.96823787689209,
            y: 0.7665830850601196,
            z: -25.767839431762695,
        },
        {
            x: -14.116935729980469,
            y: 0.6597091555595398,
            z: -25.736637115478516,
        },
        {
            x: -14.263880729675293,
            y: 0.5707475543022156,
            z: -25.705543518066406,
        },
        {
            x: -14.408836364746094,
            y: 0.4980551600456238,
            z: -25.675220489501953,
        },
        {
            x: -14.551566123962402,
            y: 0.439989298582077,
            z: -25.646326065063477,
        },
        {
            x: -14.691829681396484,
            y: 0.3949066996574402,
            z: -25.61949920654297,
        },
        {
            x: -14.829391479492188,
            y: 0.36116456985473633,
            z: -25.59540367126465,
        },
        {
            x: -14.96401309967041,
            y: 0.3371199369430542,
            z: -25.57468605041504,
        },
        {
            x: -15.095458030700684,
            y: 0.3211299180984497,
            z: -25.558008193969727,
        },
        {
            x: -15.223487854003906,
            y: 0.31155139207839966,
            z: -25.54601287841797,
        },
        {
            x: -15.347865104675293,
            y: 0.30674150586128235,
            z: -25.53936004638672,
        },
        {
            x: -15.468353271484375,
            y: 0.3050572872161865,
            z: -25.538700103759766,
        },
        {
            x: -15.58471393585205,
            y: 0.3048560321331024,
            z: -25.544687271118164,
        },
        {
            x: -15.696734428405762,
            y: 0.30485600233078003,
            z: -25.557865142822266,
        },
        {
            x: -15.804295539855957,
            y: 0.30485600233078003,
            z: -25.57848358154297,
        },
        {
            x: -15.907254219055176,
            y: 0.3048560321331024,
            z: -25.60671043395996,
        },
        {
            x: -16.005502700805664,
            y: 0.3048560321331024,
            z: -25.642719268798828,
        },
        {
            x: -16.098922729492188,
            y: 0.30485597252845764,
            z: -25.686695098876953,
        },
        {
            x: -16.187395095825195,
            y: 0.30485597252845764,
            z: -25.73881721496582,
        },
        {
            x: -16.27080535888672,
            y: 0.3048560321331024,
            z: -25.799259185791016,
        },
        {
            x: -16.349029541015625,
            y: 0.30485600233078003,
            z: -25.868207931518555,
        },
        {
            x: -16.42194938659668,
            y: 0.3048560321331024,
            z: -25.945829391479492,
        },
        {
            x: -16.48944854736328,
            y: 0.3048560321331024,
            z: -26.032304763793945,
        },
        {
            x: -16.55140495300293,
            y: 0.30485600233078003,
            z: -26.12782096862793,
        },
        {
            x: -16.607702255249023,
            y: 0.30485600233078003,
            z: -26.2325439453125,
        },
        {
            x: -16.658409118652344,
            y: 0.30485600233078003,
            z: -26.346525192260742,
        },
        {
            x: -16.704572677612305,
            y: 0.30485600233078003,
            z: -26.46910285949707,
        },
        {
            x: -16.74755859375,
            y: 0.30485597252845764,
            z: -26.599401473999023,
        },
        {
            x: -16.788726806640625,
            y: 0.3048560321331024,
            z: -26.73650550842285,
        },
        {
            x: -16.829444885253906,
            y: 0.30485600233078003,
            z: -26.87952423095703,
        },
        {
            x: -16.87108039855957,
            y: 0.3048560321331024,
            z: -27.0275821685791,
        },
        {
            x: -16.915002822875977,
            y: 0.3048560321331024,
            z: -27.179780960083008,
        },
        {
            x: -16.962568283081055,
            y: 0.3048560321331024,
            z: -27.335229873657227,
        },
        {
            x: -17.01515007019043,
            y: 0.3048560321331024,
            z: -27.4930419921875,
        },
        {
            x: -17.074113845825195,
            y: 0.30485600233078003,
            z: -27.65233039855957,
        },
        {
            x: -17.140819549560547,
            y: 0.30485600233078003,
            z: -27.81218910217285,
        },
        {
            x: -17.216638565063477,
            y: 0.30485600233078003,
            z: -27.971744537353516,
        },
        {
            x: -17.302875518798828,
            y: 0.30485600233078003,
            z: -28.130088806152344,
        },
        {
            x: -17.40030860900879,
            y: 0.30485600233078003,
            z: -28.286306381225586,
        },
        {
            x: -17.509414672851562,
            y: 0.3048560321331024,
            z: -28.439435958862305,
        },
        {
            x: -17.63067054748535,
            y: 0.3048560321331024,
            z: -28.588531494140625,
        },
        {
            x: -17.764558792114258,
            y: 0.3048560321331024,
            z: -28.732654571533203,
        },
        {
            x: -17.911535263061523,
            y: 0.3048560321331024,
            z: -28.870830535888672,
        },
        {
            x: -18.072078704833984,
            y: 0.30485600233078003,
            z: -29.002117156982422,
        },
        {
            x: -18.24667739868164,
            y: 0.30485600233078003,
            z: -29.125572204589844,
        },
        {
            x: -18.435794830322266,
            y: 0.30485600233078003,
            z: -29.24024200439453,
        },
        {
            x: -18.639911651611328,
            y: 0.30485600233078003,
            z: -29.345178604125977,
        },
        {
            x: -18.8595027923584,
            y: 0.3048560321331024,
            z: -29.439434051513672,
        },
        {
            x: -19.09503936767578,
            y: 0.30485600233078003,
            z: -29.522048950195312,
        },
        {
            x: -19.3469295501709,
            y: 0.3048560321331024,
            z: -29.592151641845703,
        },
        {
            x: -19.614206314086914,
            y: 0.30485600233078003,
            z: -29.650196075439453,
        },
        {
            x: -19.894657135009766,
            y: 0.30485597252845764,
            z: -29.697856903076172,
        },
        {
            x: -20.1860294342041,
            y: 0.30485600233078003,
            z: -29.736865997314453,
        },
        {
            x: -20.486064910888672,
            y: 0.30485600233078003,
            z: -29.76894187927246,
        },
        {
            x: -20.79253578186035,
            y: 0.30485597252845764,
            z: -29.795799255371094,
        },
        {
            x: -21.103130340576172,
            y: 0.30485600233078003,
            z: -29.819169998168945,
        },
        {
            x: -21.415620803833008,
            y: 0.30485600233078003,
            z: -29.84076499938965,
        },
        {
            x: -21.727746963500977,
            y: 0.30485600233078003,
            z: -29.862314224243164,
        },
        {
            x: -22.037254333496094,
            y: 0.30485597252845764,
            z: -29.885541915893555,
        },
        {
            x: -22.34189224243164,
            y: 0.30485600233078003,
            z: -29.91216278076172,
        },
        {
            x: -22.63939666748047,
            y: 0.30485600233078003,
            z: -29.94390296936035,
        },
        {
            x: -22.927534103393555,
            y: 0.30485597252845764,
            z: -29.982465744018555,
        },
        {
            x: -23.205204010009766,
            y: 0.30485600233078003,
            z: -30.0291805267334,
        },
        {
            x: -23.472984313964844,
            y: 0.30485597252845764,
            z: -30.08473014831543,
        },
        {
            x: -23.731582641601562,
            y: 0.30485600233078003,
            z: -30.14977264404297,
        },
        {
            x: -23.98171043395996,
            y: 0.30485600233078003,
            z: -30.224964141845703,
        },
        {
            x: -24.224088668823242,
            y: 0.30485600233078003,
            z: -30.310958862304688,
        },
        {
            x: -24.459421157836914,
            y: 0.30485600233078003,
            z: -30.408403396606445,
        },
        {
            x: -24.688444137573242,
            y: 0.30485600233078003,
            z: -30.517969131469727,
        },
        {
            x: -24.91183090209961,
            y: 0.30485600233078003,
            z: -30.640283584594727,
        },
        {
            x: -25.130308151245117,
            y: 0.30485597252845764,
            z: -30.776004791259766,
        },
        {
            x: -25.344600677490234,
            y: 0.3048560321331024,
            z: -30.925804138183594,
        },
        {
            x: -25.55540657043457,
            y: 0.30485600233078003,
            z: -31.090312957763672,
        },
        {
            x: -25.763444900512695,
            y: 0.30485600233078003,
            z: -31.270198822021484,
        },
        {
            x: -25.96883773803711,
            y: 0.30485600233078003,
            z: -31.465641021728516,
        },
        {
            x: -26.170272827148438,
            y: 0.3048560321331024,
            z: -31.675697326660156,
        },
        {
            x: -26.36618995666504,
            y: 0.30485600233078003,
            z: -31.899227142333984,
        },
        {
            x: -26.555055618286133,
            y: 0.30485597252845764,
            z: -32.135108947753906,
        },
        {
            x: -26.73533058166504,
            y: 0.30485600233078003,
            z: -32.38222122192383,
        },
        {
            x: -26.905460357666016,
            y: 0.3048560321331024,
            z: -32.63941955566406,
        },
        {
            x: -27.06390953063965,
            y: 0.30485597252845764,
            z: -32.90559005737305,
        },
        {
            x: -27.209136962890625,
            y: 0.30485600233078003,
            z: -33.179622650146484,
        },
        {
            x: -27.339588165283203,
            y: 0.3048560321331024,
            z: -33.46034622192383,
        },
        {
            x: -27.45371437072754,
            y: 0.3048560321331024,
            z: -33.746646881103516,
        },
        {
            x: -27.549983978271484,
            y: 0.3048560321331024,
            z: -34.03740692138672,
        },
        {
            x: -27.626848220825195,
            y: 0.30485600233078003,
            z: -34.33148956298828,
        },
        {
            x: -27.68309783935547,
            y: 0.30485600233078003,
            z: -34.62769317626953,
        },
        {
            x: -27.718944549560547,
            y: 0.30485600233078003,
            z: -34.92451095581055,
        },
        {
            x: -27.734975814819336,
            y: 0.30485600233078003,
            z: -35.22032928466797,
        },
        {
            x: -27.731796264648438,
            y: 0.3048560321331024,
            z: -35.513553619384766,
        },
        {
            x: -27.709983825683594,
            y: 0.30485600233078003,
            z: -35.80256271362305,
        },
        {
            x: -27.670146942138672,
            y: 0.30485600233078003,
            z: -36.08577346801758,
        },
        {
            x: -27.61287498474121,
            y: 0.30485600233078003,
            z: -36.361576080322266,
        },
        {
            x: -27.538759231567383,
            y: 0.3048560321331024,
            z: -36.62836837768555,
        },
        {
            x: -27.448381423950195,
            y: 0.30485600233078003,
            z: -36.88456726074219,
        },
        {
            x: -27.34235954284668,
            y: 0.3048560321331024,
            z: -37.12852096557617,
        },
        {
            x: -27.221271514892578,
            y: 0.30485600233078003,
            z: -37.3586540222168,
        },
        {
            x: -27.08572006225586,
            y: 0.30485600233078003,
            z: -37.5733642578125,
        },
        {
            x: -26.935667037963867,
            y: 0.30485600233078003,
            z: -37.77123260498047,
        },
        {
            x: -26.766281127929688,
            y: 0.30485600233078003,
            z: -37.95225143432617,
        },
        {
            x: -26.570510864257812,
            y: 0.30485600233078003,
            z: -38.11707305908203,
        },
        {
            x: -26.34128761291504,
            y: 0.30485600233078003,
            z: -38.2663459777832,
        },
        {
            x: -26.071544647216797,
            y: 0.30485600233078003,
            z: -38.40073013305664,
        },
        {
            x: -25.754220962524414,
            y: 0.30485600233078003,
            z: -38.520870208740234,
        },
        {
            x: -25.38224983215332,
            y: 0.3048560321331024,
            z: -38.6274299621582,
        },
        {
            x: -24.948558807373047,
            y: 0.3048560321331024,
            z: -38.72105407714844,
        },
        {
            x: -24.446088790893555,
            y: 0.30485600233078003,
            z: -38.80240249633789,
        },
        {
            x: -23.86777687072754,
            y: 0.30485600233078003,
            z: -38.87211990356445,
        },
        {
            x: -23.20648765563965,
            y: 0.30485600233078003,
            z: -38.930870056152344,
        },
        {
            x: -22.455276489257812,
            y: 0.30485600233078003,
            z: -38.97929382324219,
        },
        {
            x: -21.607892990112305,
            y: 0.30485600233078003,
            z: -39.018089294433594,
        },
        {
            x: -20.67104721069336,
            y: 0.30485600233078003,
            z: -39.04844665527344,
        },
        {
            x: -19.66135597229004,
            y: 0.30485600233078003,
            z: -39.07197189331055,
        },
        {
            x: -18.595674514770508,
            y: 0.30485600233078003,
            z: -39.09025192260742,
        },
        {
            x: -17.49087142944336,
            y: 0.3048560321331024,
            z: -39.10490798950195,
        },
        {
            x: -16.36380386352539,
            y: 0.30485597252845764,
            z: -39.11752700805664,
        },
        {
            x: -15.231337547302246,
            y: 0.30485600233078003,
            z: -39.12972640991211,
        },
        {
            x: -14.110333442687988,
            y: 0.30485600233078003,
            z: -39.143096923828125,
        },
        {
            x: -13.017656326293945,
            y: 0.30485600233078003,
            z: -39.159244537353516,
        },
        {
            x: -11.97016429901123,
            y: 0.30485600233078003,
            z: -39.17978286743164,
        },
        {
            x: -10.984724044799805,
            y: 0.30485600233078003,
            z: -39.206302642822266,
        },
        {
            x: -10.078116416931152,
            y: 0.30485600233078003,
            z: -39.24040985107422,
        },
        {
            x: -9.26705551147461,
            y: 0.30485600233078003,
            z: -39.2837028503418,
        },
        {
            x: -8.556661605834961,
            y: 0.3048560321331024,
            z: -39.33738708496094,
        },
        {
            x: -7.9379682540893555,
            y: 0.30485600233078003,
            z: -39.402217864990234,
        },
        {
            x: -7.401123046875,
            y: 0.3048560321331024,
            z: -39.4788932800293,
        },
        {
            x: -6.936267375946045,
            y: 0.30485600233078003,
            z: -39.56813430786133,
        },
        {
            x: -6.5335469245910645,
            y: 0.30485600233078003,
            z: -39.670650482177734,
        },
        {
            x: -6.183104038238525,
            y: 0.3048560321331024,
            z: -39.78715515136719,
        },
        {
            x: -5.875082015991211,
            y: 0.30485597252845764,
            z: -39.918357849121094,
        },
        {
            x: -5.599626541137695,
            y: 0.30485600233078003,
            z: -40.06497573852539,
        },
        {
            x: -5.346879959106445,
            y: 0.30485600233078003,
            z: -40.22772216796875,
        },
        {
            x: -5.1069865226745605,
            y: 0.30485600233078003,
            z: -40.40730285644531,
        },
        {
            x: -4.870090007781982,
            y: 0.30485597252845764,
            z: -40.604434967041016,
        },
        {
            x: -4.6263580322265625,
            y: 0.3048560321331024,
            z: -40.819828033447266,
        },
        {
            x: -4.3694634437561035,
            y: 0.30485600233078003,
            z: -41.05312728881836,
        },
        {
            x: -4.1004533767700195,
            y: 0.3048560321331024,
            z: -41.30173110961914,
        },
        {
            x: -3.8212039470672607,
            y: 0.30485600233078003,
            z: -41.56279373168945,
        },
        {
            x: -3.5336153507232666,
            y: 0.3048560321331024,
            z: -41.83346939086914,
        },
        {
            x: -3.23958683013916,
            y: 0.30485600233078003,
            z: -42.11091232299805,
        },
        {
            x: -2.941018581390381,
            y: 0.3048560321331024,
            z: -42.392269134521484,
        },
        {
            x: -2.639810800552368,
            y: 0.30485600233078003,
            z: -42.67469024658203,
        },
        {
            x: -2.3378639221191406,
            y: 0.30485600233078003,
            z: -42.955326080322266,
        },
        {
            x: -2.0370774269104004,
            y: 0.30485600233078003,
            z: -43.231327056884766,
        },
        {
            x: -1.739351511001587,
            y: 0.30485600233078003,
            z: -43.499847412109375,
        },
        {
            x: -1.446586012840271,
            y: 0.3048560321331024,
            z: -43.75802993774414,
        },
        {
            x: -1.1606807708740234,
            y: 0.3048560321331024,
            z: -44.003021240234375,
        },
        {
            x: -0.882956326007843,
            y: 0.30485597252845764,
            z: -44.23252868652344,
        },
        {
            x: -0.6126545667648315,
            y: 0.3048560321331024,
            z: -44.44620132446289,
        },
        {
            x: -0.34863799810409546,
            y: 0.30485600233078003,
            z: -44.64404296875,
        },
        {
            x: -0.0896940603852272,
            y: 0.3048560321331024,
            z: -44.82616424560547,
        },
        {
            x: 0.1653650403022766,
            y: 0.30485600233078003,
            z: -44.99259567260742,
        },
        {
            x: 0.4177267253398895,
            y: 0.3048560321331024,
            z: -45.14340591430664,
        },
        {
            x: 0.668578565120697,
            y: 0.30485600233078003,
            z: -45.278656005859375,
        },
        {
            x: 0.9191079139709473,
            y: 0.30485600233078003,
            z: -45.398406982421875,
        },
        {
            x: 1.1705021858215332,
            y: 0.3048560321331024,
            z: -45.502716064453125,
        },
        {
            x: 1.4239493608474731,
            y: 0.3048560321331024,
            z: -45.591644287109375,
        },
        {
            x: 1.6806364059448242,
            y: 0.3048560321331024,
            z: -45.665245056152344,
        },
        {
            x: 1.9417507648468018,
            y: 0.30485600233078003,
            z: -45.72358322143555,
        },
        {
            x: 2.2084004878997803,
            y: 0.3048560321331024,
            z: -45.76670837402344,
        },
        {
            x: 2.4811933040618896,
            y: 0.30485600233078003,
            z: -45.79458236694336,
        },
        {
            x: 2.760545492172241,
            y: 0.30485600233078003,
            z: -45.807151794433594,
        },
        {
            x: 3.0468995571136475,
            y: 0.3048560321331024,
            z: -45.80435562133789,
        },
        {
            x: 3.3406176567077637,
            y: 0.30485600233078003,
            z: -45.7861328125,
        },
        {
            x: 3.642141342163086,
            y: 0.3048560321331024,
            z: -45.7524299621582,
        },
        {
            x: 3.951887845993042,
            y: 0.30485600233078003,
            z: -45.703182220458984,
        },
        {
            x: 4.270271301269531,
            y: 0.30485597252845764,
            z: -45.63833236694336,
        },
        {
            x: 4.597707748413086,
            y: 0.30485600233078003,
            z: -45.55781936645508,
        },
        {
            x: 4.934613227844238,
            y: 0.3048560321331024,
            z: -45.46158218383789,
        },
        {
            x: 5.281402587890625,
            y: 0.30485600233078003,
            z: -45.349571228027344,
        },
        {
            x: 5.638491630554199,
            y: 0.30485600233078003,
            z: -45.22171401977539,
        },
        {
            x: 6.006264686584473,
            y: 0.30485600233078003,
            z: -45.07807540893555,
        },
        {
            x: 6.384729385375977,
            y: 0.3048560321331024,
            z: -44.9200325012207,
        },
        {
            x: 6.773651599884033,
            y: 0.30485600233078003,
            z: -44.74983215332031,
        },
        {
            x: 7.172794818878174,
            y: 0.30485597252845764,
            z: -44.56972885131836,
        },
        {
            x: 7.5819597244262695,
            y: 0.30485600233078003,
            z: -44.381961822509766,
        },
        {
            x: 8.000833511352539,
            y: 0.3048560321331024,
            z: -44.18882751464844,
        },
        {
            x: 8.429214477539062,
            y: 0.30485600233078003,
            z: -43.992549896240234,
        },
        {
            x: 8.866867065429688,
            y: 0.30485600233078003,
            z: -43.7953987121582,
        },
        {
            x: 9.313551902770996,
            y: 0.30485600233078003,
            z: -43.599632263183594,
        },
        {
            x: 9.769033432006836,
            y: 0.3048560321331024,
            z: -43.407493591308594,
        },
        {
            x: 10.233072280883789,
            y: 0.30485600233078003,
            z: -43.221248626708984,
        },
        {
            x: 10.705432891845703,
            y: 0.30485600233078003,
            z: -43.043148040771484,
        },
        {
            x: 11.185823440551758,
            y: 0.30485600233078003,
            z: -42.87539291381836,
        },
        {
            x: 11.67259407043457,
            y: 0.30485600233078003,
            z: -42.71865463256836,
        },
        {
            x: 12.16266918182373,
            y: 0.3048560321331024,
            z: -42.57200241088867,
        },
        {
            x: 12.652899742126465,
            y: 0.30485600233078003,
            z: -42.43442153930664,
        },
        {
            x: 13.140141487121582,
            y: 0.30485600233078003,
            z: -42.30491256713867,
        },
        {
            x: 13.621245384216309,
            y: 0.30485600233078003,
            z: -42.182456970214844,
        },
        {
            x: 14.093108177185059,
            y: 0.3048560321331024,
            z: -42.0660285949707,
        },
        {
            x: 14.552494049072266,
            y: 0.30485597252845764,
            z: -41.95465850830078,
        },
        {
            x: 14.99630355834961,
            y: 0.30485600233078003,
            z: -41.847312927246094,
        },
        {
            x: 15.42138671875,
            y: 0.30485600233078003,
            z: -41.742984771728516,
        },
        {
            x: 15.824601173400879,
            y: 0.3048560321331024,
            z: -41.64067077636719,
        },
        {
            x: 16.20279312133789,
            y: 0.30485600233078003,
            z: -41.53934860229492,
        },
        {
            x: 16.552839279174805,
            y: 0.30485600233078003,
            z: -41.438018798828125,
        },
        {
            x: 16.873159408569336,
            y: 0.3048560321331024,
            z: -41.33552932739258,
        },
        {
            x: 17.16485595703125,
            y: 0.30485600233078003,
            z: -41.230464935302734,
        },
        {
            x: 17.429288864135742,
            y: 0.30485600233078003,
            z: -41.12141418457031,
        },
        {
            x: 17.667829513549805,
            y: 0.30485600233078003,
            z: -41.0069465637207,
        },
        {
            x: 17.8818416595459,
            y: 0.30485600233078003,
            z: -40.88563919067383,
        },
        {
            x: 18.07268714904785,
            y: 0.30485600233078003,
            z: -40.75606155395508,
        },
        {
            x: 18.241750717163086,
            y: 0.3048560321331024,
            z: -40.61678695678711,
        },
        {
            x: 18.390365600585938,
            y: 0.30485600233078003,
            z: -40.466407775878906,
        },
        {
            x: 18.519914627075195,
            y: 0.30485600233078003,
            z: -40.30348205566406,
        },
        {
            x: 18.631759643554688,
            y: 0.30485597252845764,
            z: -40.12659454345703,
        },
        {
            x: 18.727272033691406,
            y: 0.30485600233078003,
            z: -39.934322357177734,
        },
        {
            x: 18.807815551757812,
            y: 0.3048560321331024,
            z: -39.72522735595703,
        },
        {
            x: 18.874420166015625,
            y: 0.30485600233078003,
            z: -39.498626708984375,
        },
        {
            x: 18.927141189575195,
            y: 0.30485600233078003,
            z: -39.25597381591797,
        },
        {
            x: 18.96586799621582,
            y: 0.30485597252845764,
            z: -38.99910354614258,
        },
        {
            x: 18.990476608276367,
            y: 0.30485600233078003,
            z: -38.7298583984375,
        },
        {
            x: 19.0008487701416,
            y: 0.30485600233078003,
            z: -38.4500846862793,
        },
        {
            x: 18.996868133544922,
            y: 0.30485600233078003,
            z: -38.16161346435547,
        },
        {
            x: 18.978408813476562,
            y: 0.30485600233078003,
            z: -37.86629867553711,
        },
        {
            x: 18.945362091064453,
            y: 0.30485600233078003,
            z: -37.56596755981445,
        },
        {
            x: 18.897598266601562,
            y: 0.30485600233078003,
            z: -37.26243591308594,
        },
        {
            x: 18.835006713867188,
            y: 0.30485597252845764,
            z: -36.957603454589844,
        },
        {
            x: 18.75746726989746,
            y: 0.30485600233078003,
            z: -36.65328598022461,
        },
        {
            x: 18.66486167907715,
            y: 0.30485600233078003,
            z: -36.351318359375,
        },
        {
            x: 18.557598114013672,
            y: 0.30485600233078003,
            z: -36.05331039428711,
        },
        {
            x: 18.438793182373047,
            y: 0.30485600233078003,
            z: -35.759700775146484,
        },
        {
            x: 18.312427520751953,
            y: 0.30485600233078003,
            z: -35.470542907714844,
        },
        {
            x: 18.182476043701172,
            y: 0.30485600233078003,
            z: -35.18589782714844,
        },
        {
            x: 18.052919387817383,
            y: 0.3048560321331024,
            z: -34.90583801269531,
        },
        {
            x: 17.927732467651367,
            y: 0.30485600233078003,
            z: -34.630401611328125,
        },
        {
            x: 17.81089973449707,
            y: 0.30485600233078003,
            z: -34.35966491699219,
        },
        {
            x: 17.706390380859375,
            y: 0.3048560321331024,
            z: -34.09367752075195,
        },
        {
            x: 17.618186950683594,
            y: 0.30485600233078003,
            z: -33.83250045776367,
        },
        {
            x: 17.550264358520508,
            y: 0.30485600233078003,
            z: -33.576171875,
        },
        {
            x: 17.506608963012695,
            y: 0.30485600233078003,
            z: -33.324798583984375,
        },
        {
            x: 17.491195678710938,
            y: 0.30485600233078003,
            z: -33.07841491699219,
        },
        {
            x: 17.507587432861328,
            y: 0.3048560321331024,
            z: -32.837120056152344,
        },
        {
            x: 17.555505752563477,
            y: 0.3048560321331024,
            z: -32.601318359375,
        },
        {
            x: 17.63259506225586,
            y: 0.3048560321331024,
            z: -32.37160873413086,
        },
        {
            x: 17.73648452758789,
            y: 0.3048560321331024,
            z: -32.148597717285156,
        },
        {
            x: 17.864795684814453,
            y: 0.30485600233078003,
            z: -31.932861328125,
        },
        {
            x: 18.015153884887695,
            y: 0.3048560321331024,
            z: -31.725000381469727,
        },
        {
            x: 18.1851863861084,
            y: 0.30485600233078003,
            z: -31.525602340698242,
        },
        {
            x: 18.372516632080078,
            y: 0.30485600233078003,
            z: -31.33527374267578,
        },
        {
            x: 18.574771881103516,
            y: 0.3048560321331024,
            z: -31.154600143432617,
        },
        {
            x: 18.78957176208496,
            y: 0.3048560321331024,
            z: -30.984174728393555,
        },
        {
            x: 19.014545440673828,
            y: 0.30485600233078003,
            z: -30.82459259033203,
        },
        {
            x: 19.24734115600586,
            y: 0.30485600233078003,
            z: -30.676433563232422,
        },
        {
            x: 19.48558807373047,
            y: 0.30485600233078003,
            z: -30.540332794189453,
        },
        {
            x: 19.7279109954834,
            y: 0.30485600233078003,
            z: -30.417089462280273,
        },
        {
            x: 19.9737548828125,
            y: 0.3048560321331024,
            z: -30.307708740234375,
        },
        {
            x: 20.222572326660156,
            y: 0.30485600233078003,
            z: -30.21318817138672,
        },
        {
            x: 20.473846435546875,
            y: 0.30485600233078003,
            z: -30.134559631347656,
        },
        {
            x: 20.727027893066406,
            y: 0.30485600233078003,
            z: -30.072813034057617,
        },
        {
            x: 20.981590270996094,
            y: 0.30485600233078003,
            z: -30.02896499633789,
        },
        {
            x: 21.236997604370117,
            y: 0.30485597252845764,
            z: -30.004024505615234,
        },
        {
            x: 21.492713928222656,
            y: 0.30485600233078003,
            z: -29.999004364013672,
        },
        {
            x: 21.74820327758789,
            y: 0.30485600233078003,
            z: -30.014904022216797,
        },
        {
            x: 22.00293731689453,
            y: 0.3048560321331024,
            z: -30.052743911743164,
        },
        {
            x: 22.256380081176758,
            y: 0.3048560321331024,
            z: -30.113529205322266,
        },
        {
            x: 22.508012771606445,
            y: 0.3048560321331024,
            z: -30.19824981689453,
        },
        {
            x: 22.757211685180664,
            y: 0.3048560321331024,
            z: -30.306467056274414,
        },
        {
            x: 23.00335693359375,
            y: 0.30485600233078003,
            z: -30.435741424560547,
        },
        {
            x: 23.24578857421875,
            y: 0.30485600233078003,
            z: -30.583459854125977,
        },
        {
            x: 23.483858108520508,
            y: 0.30485600233078003,
            z: -30.74700355529785,
        },
        {
            x: 23.716909408569336,
            y: 0.30485600233078003,
            z: -30.923768997192383,
        },
        {
            x: 23.944292068481445,
            y: 0.30485600233078003,
            z: -31.11114501953125,
        },
        {
            x: 24.16535186767578,
            y: 0.30485600233078003,
            z: -31.3065128326416,
        },
        {
            x: 24.379432678222656,
            y: 0.30485600233078003,
            z: -31.50725746154785,
        },
        {
            x: 24.58588981628418,
            y: 0.3048560321331024,
            z: -31.710771560668945,
        },
        {
            x: 24.7840576171875,
            y: 0.30485600233078003,
            z: -31.91443634033203,
        },
        {
            x: 24.973291397094727,
            y: 0.30485600233078003,
            z: -32.11565017700195,
        },
        {
            x: 25.152938842773438,
            y: 0.30485600233078003,
            z: -32.31179428100586,
        },
        {
            x: 25.323150634765625,
            y: 0.30485600233078003,
            z: -32.50082778930664,
        },
        {
            x: 25.486026763916016,
            y: 0.30485600233078003,
            z: -32.68207931518555,
        },
        {
            x: 25.64391326904297,
            y: 0.30485600233078003,
            z: -32.85504913330078,
        },
        {
            x: 25.799196243286133,
            y: 0.30485597252845764,
            z: -33.01927185058594,
        },
        {
            x: 25.954261779785156,
            y: 0.30485600233078003,
            z: -33.174285888671875,
        },
        {
            x: 26.111469268798828,
            y: 0.30485600233078003,
            z: -33.319602966308594,
        },
        {
            x: 26.273210525512695,
            y: 0.30485600233078003,
            z: -33.45475387573242,
        },
        {
            x: 26.44184112548828,
            y: 0.30485600233078003,
            z: -33.579261779785156,
        },
        {
            x: 26.6197509765625,
            y: 0.30485600233078003,
            z: -33.69265365600586,
        },
        {
            x: 26.809314727783203,
            y: 0.30485600233078003,
            z: -33.794456481933594,
        },
        {
            x: 27.012901306152344,
            y: 0.30485600233078003,
            z: -33.884185791015625,
        },
        {
            x: 27.232891082763672,
            y: 0.30485600233078003,
            z: -33.96138000488281,
        },
        {
            x: 27.471017837524414,
            y: 0.30485600233078003,
            z: -34.02568054199219,
        },
        {
            x: 27.726388931274414,
            y: 0.3048560321331024,
            z: -34.07732009887695,
        },
        {
            x: 27.997413635253906,
            y: 0.3048560321331024,
            z: -34.11662673950195,
        },
        {
            x: 28.28244400024414,
            y: 0.30485600233078003,
            z: -34.143978118896484,
        },
        {
            x: 28.579906463623047,
            y: 0.3048560321331024,
            z: -34.159725189208984,
        },
        {
            x: 28.88819122314453,
            y: 0.30485600233078003,
            z: -34.16421890258789,
        },
        {
            x: 29.2056941986084,
            y: 0.30485600233078003,
            z: -34.15781784057617,
        },
        {
            x: 29.53081512451172,
            y: 0.30485600233078003,
            z: -34.1408805847168,
        },
        {
            x: 29.861953735351562,
            y: 0.30485600233078003,
            z: -34.113765716552734,
        },
        {
            x: 30.197500228881836,
            y: 0.30485600233078003,
            z: -34.07682418823242,
        },
        {
            x: 30.535860061645508,
            y: 0.30485600233078003,
            z: -34.03041458129883,
        },
        {
            x: 30.87542152404785,
            y: 0.30485600233078003,
            z: -33.97489547729492,
        },
        {
            x: 31.214632034301758,
            y: 0.30485600233078003,
            z: -33.91044235229492,
        },
        {
            x: 31.55226707458496,
            y: 0.30485597252845764,
            z: -33.835933685302734,
        },
        {
            x: 31.887258529663086,
            y: 0.30485600233078003,
            z: -33.74964904785156,
        },
        {
            x: 32.218536376953125,
            y: 0.30485600233078003,
            z: -33.64986038208008,
        },
        {
            x: 32.545066833496094,
            y: 0.3048560321331024,
            z: -33.53484344482422,
        },
        {
            x: 32.86571502685547,
            y: 0.30485597252845764,
            z: -33.40289306640625,
        },
        {
            x: 33.179443359375,
            y: 0.3048560321331024,
            z: -33.25228500366211,
        },
        {
            x: 33.48518371582031,
            y: 0.30485600233078003,
            z: -33.08127975463867,
        },
        {
            x: 33.781864166259766,
            y: 0.30485600233078003,
            z: -32.88816452026367,
        },
        {
            x: 34.068424224853516,
            y: 0.30485600233078003,
            z: -32.671226501464844,
        },
        {
            x: 34.34379196166992,
            y: 0.3048560321331024,
            z: -32.428733825683594,
        },
        {
            x: 34.60689163208008,
            y: 0.30485600233078003,
            z: -32.158966064453125,
        },
        {
            x: 34.85667419433594,
            y: 0.30485600233078003,
            z: -31.860431671142578,
        },
        {
            x: 35.09231948852539,
            y: 0.30485600233078003,
            z: -31.534934997558594,
        },
        {
            x: 35.313167572021484,
            y: 0.3048560619354248,
            z: -31.186748504638672,
        },
        {
            x: 35.5185546875,
            y: 0.30485600233078003,
            z: -30.820199966430664,
        },
        {
            x: 35.70784378051758,
            y: 0.3048560321331024,
            z: -30.439638137817383,
        },
        {
            x: 35.8803825378418,
            y: 0.3048560321331024,
            z: -30.049345016479492,
        },
        {
            x: 36.03549575805664,
            y: 0.30485600233078003,
            z: -29.653738021850586,
        },
        {
            x: 36.17253875732422,
            y: 0.3048560321331024,
            z: -29.257110595703125,
        },
        {
            x: 36.29086685180664,
            y: 0.30485597252845764,
            z: -28.863798141479492,
        },
        {
            x: 36.38982391357422,
            y: 0.3048560321331024,
            z: -28.4781436920166,
        },
        {
            x: 36.468753814697266,
            y: 0.3048560321331024,
            z: -28.104469299316406,
        },
        {
            x: 36.527008056640625,
            y: 0.30485600233078003,
            z: -27.74711036682129,
        },
        {
            x: 36.563934326171875,
            y: 0.30485600233078003,
            z: -27.410348892211914,
        },
        {
            x: 36.578922271728516,
            y: 0.3048560321331024,
            z: -27.096298217773438,
        },
        {
            x: 36.57145309448242,
            y: 0.3048560619354248,
            z: -26.80448341369629,
        },
        {
            x: 36.54096984863281,
            y: 0.3048560321331024,
            z: -26.534236907958984,
        },
        {
            x: 36.48695373535156,
            y: 0.3048560321331024,
            z: -26.2849063873291,
        },
        {
            x: 36.40886688232422,
            y: 0.30485600233078003,
            z: -26.055845260620117,
        },
        {
            x: 36.30616760253906,
            y: 0.3048560619354248,
            z: -25.846385955810547,
        },
        {
            x: 36.17832565307617,
            y: 0.30485597252845764,
            z: -25.655895233154297,
        },
        {
            x: 36.024818420410156,
            y: 0.30485600233078003,
            z: -25.483722686767578,
        },
        {
            x: 35.845096588134766,
            y: 0.30485600233078003,
            z: -25.329198837280273,
        },
        {
            x: 35.638633728027344,
            y: 0.30485600233078003,
            z: -25.19167709350586,
        },
        {
            x: 35.40489196777344,
            y: 0.30485600233078003,
            z: -25.07050132751465,
        },
        {
            x: 35.143348693847656,
            y: 0.30485597252845764,
            z: -24.96502113342285,
        },
        {
            x: 34.85426712036133,
            y: 0.3048560321331024,
            z: -24.873676300048828,
        },
        {
            x: 34.53954315185547,
            y: 0.30485600233078003,
            z: -24.793123245239258,
        },
        {
            x: 34.2012825012207,
            y: 0.3048560321331024,
            z: -24.71982192993164,
        },
        {
            x: 33.84154510498047,
            y: 0.30485600233078003,
            z: -24.65019416809082,
        },
        {
            x: 33.462440490722656,
            y: 0.30485600233078003,
            z: -24.580692291259766,
        },
        {
            x: 33.06605911254883,
            y: 0.3048560321331024,
            z: -24.507761001586914,
        },
        {
            x: 32.65447235107422,
            y: 0.30485600233078003,
            z: -24.427825927734375,
        },
        {
            x: 32.22974395751953,
            y: 0.30485600233078003,
            z: -24.33733367919922,
        },
        {
            x: 31.794036865234375,
            y: 0.3048560321331024,
            z: -24.23274040222168,
        },
        {
            x: 31.34939956665039,
            y: 0.30485600233078003,
            z: -24.110477447509766,
        },
        {
            x: 30.89792823791504,
            y: 0.30485600233078003,
            z: -23.966989517211914,
        },
        {
            x: 30.44169807434082,
            y: 0.30485597252845764,
            z: -23.798709869384766,
        },
        {
            x: 29.982812881469727,
            y: 0.3048560321331024,
            z: -23.60362434387207,
        },
        {
            x: 29.52334213256836,
            y: 0.30485600233078003,
            z: -23.384986877441406,
        },
        {
            x: 29.06537437438965,
            y: 0.30485600233078003,
            z: -23.1472110748291,
        },
        {
            x: 28.61099624633789,
            y: 0.30485600233078003,
            z: -22.89470100402832,
        },
        {
            x: 28.16227912902832,
            y: 0.30485600233078003,
            z: -22.631866455078125,
        },
        {
            x: 27.7213134765625,
            y: 0.30485600233078003,
            z: -22.363115310668945,
        },
        {
            x: 27.290184020996094,
            y: 0.3048560321331024,
            z: -22.092853546142578,
        },
        {
            x: 26.870960235595703,
            y: 0.30485600233078003,
            z: -21.825489044189453,
        },
        {
            x: 26.4656982421875,
            y: 0.30485600233078003,
            z: -21.56540298461914,
        },
        {
            x: 26.076555252075195,
            y: 0.3048560321331024,
            z: -21.31705665588379,
        },
        {
            x: 25.705568313598633,
            y: 0.30485600233078003,
            z: -21.084829330444336,
        },
        {
            x: 25.354825973510742,
            y: 0.3048560321331024,
            z: -20.873126983642578,
        },
        {
            x: 25.026010513305664,
            y: 0.3048560321331024,
            z: -20.685758590698242,
        },
        {
            x: 24.718347549438477,
            y: 0.3048560321331024,
            z: -20.5228328704834,
        },
        {
            x: 24.43016242980957,
            y: 0.30485597252845764,
            z: -20.383081436157227,
        },
        {
            x: 24.15978240966797,
            y: 0.3048560619354248,
            z: -20.265243530273438,
        },
        {
            x: 23.90550422668457,
            y: 0.3048560321331024,
            z: -20.168033599853516,
        },
        {
            x: 23.665653228759766,
            y: 0.30485600233078003,
            z: -20.090187072753906,
        },
        {
            x: 23.438547134399414,
            y: 0.30485600233078003,
            z: -20.030433654785156,
        },
        {
            x: 23.22249984741211,
            y: 0.30485600233078003,
            z: -19.987499237060547,
        },
        {
            x: 23.015830993652344,
            y: 0.30485600233078003,
            z: -19.960115432739258,
        },
        {
            x: 22.816852569580078,
            y: 0.30485600233078003,
            z: -19.94700813293457,
        },
        {
            x: 22.62386703491211,
            y: 0.3048560321331024,
            z: -19.946908950805664,
        },
        {
            x: 22.435222625732422,
            y: 0.30485600233078003,
            z: -19.958541870117188,
        },
        {
            x: 22.249298095703125,
            y: 0.30485597252845764,
            z: -19.98061752319336,
        },
        {
            x: 22.065385818481445,
            y: 0.30485600233078003,
            z: -20.011581420898438,
        },
        {
            x: 21.883337020874023,
            y: 0.3048560321331024,
            z: -20.049718856811523,
        },
        {
            x: 21.703012466430664,
            y: 0.3048560619354248,
            z: -20.09330940246582,
        },
        {
            x: 21.524276733398438,
            y: 0.30485600233078003,
            z: -20.140636444091797,
        },
        {
            x: 21.34699058532715,
            y: 0.30485600233078003,
            z: -20.18998146057129,
        },
        {
            x: 21.171022415161133,
            y: 0.30485600233078003,
            z: -20.2396297454834,
        },
        {
            x: 20.996227264404297,
            y: 0.3048560321331024,
            z: -20.287857055664062,
        },
        {
            x: 20.822471618652344,
            y: 0.30485600233078003,
            z: -20.332948684692383,
        },
        {
            x: 20.649620056152344,
            y: 0.30485600233078003,
            z: -20.373191833496094,
        },
        {
            x: 20.477529525756836,
            y: 0.30485600233078003,
            z: -20.4068603515625,
        },
        {
            x: 20.30605125427246,
            y: 0.30485600233078003,
            z: -20.432241439819336,
        },
        {
            x: 20.135093688964844,
            y: 0.30485600233078003,
            z: -20.447649002075195,
        },
        {
            x: 19.964908599853516,
            y: 0.30485600233078003,
            z: -20.452314376831055,
        },
        {
            x: 19.796161651611328,
            y: 0.30485600233078003,
            z: -20.446393966674805,
        },
        {
            x: 19.629549026489258,
            y: 0.30485600233078003,
            z: -20.430103302001953,
        },
        {
            x: 19.465747833251953,
            y: 0.30485597252845764,
            z: -20.403644561767578,
        },
        {
            x: 19.305452346801758,
            y: 0.30485600233078003,
            z: -20.367219924926758,
        },
        {
            x: 19.14934539794922,
            y: 0.30485600233078003,
            z: -20.321043014526367,
        },
        {
            x: 18.99811553955078,
            y: 0.3048560321331024,
            z: -20.26531410217285,
        },
        {
            x: 18.852449417114258,
            y: 0.3048560619354248,
            z: -20.200241088867188,
        },
        {
            x: 18.713035583496094,
            y: 0.30485600233078003,
            z: -20.12602996826172,
        },
        {
            x: 18.5805606842041,
            y: 0.30485600233078003,
            z: -20.042890548706055,
        },
        {
            x: 18.455711364746094,
            y: 0.30485600233078003,
            z: -19.951021194458008,
        },
        {
            x: 18.339174270629883,
            y: 0.30485600233078003,
            z: -19.850635528564453,
        },
        {
            x: 18.231407165527344,
            y: 0.3048560321331024,
            z: -19.74203872680664,
        },
        {
            x: 18.132530212402344,
            y: 0.30485597252845764,
            z: -19.62574577331543,
        },
        {
            x: 18.04261016845703,
            y: 0.30485600233078003,
            z: -19.50226402282715,
        },
        {
            x: 17.961706161499023,
            y: 0.30485600233078003,
            z: -19.372108459472656,
        },
        {
            x: 17.889892578125,
            y: 0.30485597252845764,
            z: -19.235794067382812,
        },
        {
            x: 17.827238082885742,
            y: 0.30485600233078003,
            z: -19.09383773803711,
        },
        {
            x: 17.77381134033203,
            y: 0.30485600233078003,
            z: -18.946754455566406,
        },
        {
            x: 17.729677200317383,
            y: 0.3048560321331024,
            z: -18.795059204101562,
        },
        {
            x: 17.694910049438477,
            y: 0.30485597252845764,
            z: -18.639263153076172,
        },
        {
            x: 17.669572830200195,
            y: 0.30485600233078003,
            z: -18.479888916015625,
        },
        {
            x: 17.65374183654785,
            y: 0.30485600233078003,
            z: -18.31744956970215,
        },
        {
            x: 17.647478103637695,
            y: 0.30485600233078003,
            z: -18.15245819091797,
        },
        {
            x: 17.6508846282959,
            y: 0.30485600233078003,
            z: -17.98528289794922,
        },
        {
            x: 17.664154052734375,
            y: 0.30485600233078003,
            z: -17.81584358215332,
        },
        {
            x: 17.68749237060547,
            y: 0.3048560321331024,
            z: -17.64403533935547,
        },
        {
            x: 17.721101760864258,
            y: 0.30485597252845764,
            z: -17.469703674316406,
        },
        {
            x: 17.76519012451172,
            y: 0.30485600233078003,
            z: -17.29271697998047,
        },
        {
            x: 17.819963455200195,
            y: 0.30485597252845764,
            z: -17.112932205200195,
        },
        {
            x: 17.88563346862793,
            y: 0.30485600233078003,
            z: -16.930212020874023,
        },
        {
            x: 17.9623966217041,
            y: 0.30485600233078003,
            z: -16.74441909790039,
        },
        {
            x: 18.050464630126953,
            y: 0.30485600233078003,
            z: -16.555421829223633,
        },
        {
            x: 18.150043487548828,
            y: 0.30485600233078003,
            z: -16.36307716369629,
        },
        {
            x: 18.26133918762207,
            y: 0.3048560321331024,
            z: -16.167245864868164,
        },
        {
            x: 18.384557723999023,
            y: 0.30485600233078003,
            z: -15.967795372009277,
        },
        {
            x: 18.51955795288086,
            y: 0.30485600233078003,
            z: -15.764707565307617,
        },
        {
            x: 18.664470672607422,
            y: 0.30485600233078003,
            z: -15.558585166931152,
        },
        {
            x: 18.816896438598633,
            y: 0.3048560321331024,
            z: -15.350215911865234,
        },
        {
            x: 18.97443962097168,
            y: 0.30485600233078003,
            z: -15.140371322631836,
        },
        {
            x: 19.134666442871094,
            y: 0.30485600233078003,
            z: -14.929883003234863,
        },
        {
            x: 19.29518699645996,
            y: 0.30485600233078003,
            z: -14.719515800476074,
        },
        {
            x: 19.453596115112305,
            y: 0.30485600233078003,
            z: -14.510066032409668,
        },
        {
            x: 19.60748863220215,
            y: 0.3048560321331024,
            z: -14.302322387695312,
        },
        {
            x: 19.754457473754883,
            y: 0.3048560321331024,
            z: -14.097074508666992,
        },
        {
            x: 19.892099380493164,
            y: 0.3048560321331024,
            z: -13.895111083984375,
        },
        {
            x: 20.018007278442383,
            y: 0.30485600233078003,
            z: -13.697222709655762,
        },
        {
            x: 20.129779815673828,
            y: 0.30485600233078003,
            z: -13.504202842712402,
        },
        {
            x: 20.225175857543945,
            y: 0.30485600233078003,
            z: -13.316705703735352,
        },
        {
            x: 20.30345916748047,
            y: 0.30485600233078003,
            z: -13.134174346923828,
        },
        {
            x: 20.364696502685547,
            y: 0.30485600233078003,
            z: -12.955415725708008,
        },
        {
            x: 20.408950805664062,
            y: 0.3048560321331024,
            z: -12.779223442077637,
        },
        {
            x: 20.436294555664062,
            y: 0.3048560321331024,
            z: -12.604378700256348,
        },
        {
            x: 20.446792602539062,
            y: 0.30485600233078003,
            z: -12.42971420288086,
        },
        {
            x: 20.44051742553711,
            y: 0.30485600233078003,
            z: -12.254006385803223,
        },
        {
            x: 20.417537689208984,
            y: 0.3048560321331024,
            z: -12.076058387756348,
        },
        {
            x: 20.37791633605957,
            y: 0.30485600233078003,
            z: -11.89466381072998,
        },
        {
            x: 20.32172966003418,
            y: 0.30485600233078003,
            z: -11.70862102508545,
        },
        {
            x: 20.249046325683594,
            y: 0.3048560321331024,
            z: -11.516728401184082,
        },
        {
            x: 20.159927368164062,
            y: 0.30485600233078003,
            z: -11.317781448364258,
        },
        {
            x: 20.054338455200195,
            y: 0.30485597252845764,
            z: -11.110624313354492,
        },
        {
            x: 19.930301666259766,
            y: 0.3048560321331024,
            z: -10.89496898651123,
        },
        {
            x: 19.784135818481445,
            y: 0.30485597252845764,
            z: -10.671271324157715,
        },
        {
            x: 19.61211585998535,
            y: 0.30485600233078003,
            z: -10.440018653869629,
        },
        {
            x: 19.410503387451172,
            y: 0.30485600233078003,
            z: -10.201691627502441,
        },
        {
            x: 19.175567626953125,
            y: 0.30485597252845764,
            z: -9.956779479980469,
        },
        {
            x: 18.90355110168457,
            y: 0.30485600233078003,
            z: -9.705740928649902,
        },
        {
            x: 18.590776443481445,
            y: 0.30485600233078003,
            z: -9.449108123779297,
        },
        {
            x: 18.23348045349121,
            y: 0.30485600233078003,
            z: -9.187342643737793,
        },
        {
            x: 17.82793426513672,
            y: 0.30485600233078003,
            z: -8.920928001403809,
        },
        {
            x: 17.370407104492188,
            y: 0.30485600233078003,
            z: -8.650352478027344,
        },
        {
            x: 16.857166290283203,
            y: 0.30485600233078003,
            z: -8.376094818115234,
        },
        {
            x: 16.284603118896484,
            y: 0.30485600233078003,
            z: -8.098658561706543,
        },
        {
            x: 15.655092239379883,
            y: 0.30485600233078003,
            z: -7.819225788116455,
        },
        {
            x: 14.979500770568848,
            y: 0.30485600233078003,
            z: -7.539945125579834,
        },
        {
            x: 14.2693510055542,
            y: 0.3048560321331024,
            z: -7.263045310974121,
        },
        {
            x: 13.536152839660645,
            y: 0.30485600233078003,
            z: -6.990749835968018,
        },
        {
            x: 12.791435241699219,
            y: 0.30485600233078003,
            z: -6.7252888679504395,
        },
        {
            x: 12.046708106994629,
            y: 0.30485600233078003,
            z: -6.46888542175293,
        },
        {
            x: 11.313426971435547,
            y: 0.30485600233078003,
            z: -6.223743915557861,
        },
        {
            x: 10.60324764251709,
            y: 0.30485600233078003,
            z: -5.9921369552612305,
        },
        {
            x: 9.927616119384766,
            y: 0.30485600233078003,
            z: -5.776266574859619,
        },
        {
            x: 9.298050880432129,
            y: 0.30485600233078003,
            z: -5.578359127044678,
        },
        {
            x: 8.72607421875,
            y: 0.30485600233078003,
            z: -5.400640487670898,
        },
        {
            x: 8.223183631896973,
            y: 0.30485600233078003,
            z: -5.245333671569824,
        },
        {
            x: 7.796045303344727,
            y: 0.3048560321331024,
            z: -5.113524913787842,
        },
        {
            x: 7.4398674964904785,
            y: 0.30485600233078003,
            z: -5.0036139488220215,
        },
        {
            x: 7.148207187652588,
            y: 0.3048560321331024,
            z: -4.913611888885498,
        },
        {
            x: 6.914616107940674,
            y: 0.30485600233078003,
            z: -4.841529369354248,
        },
        {
            x: 6.732647895812988,
            y: 0.30485600233078003,
            z: -4.78537654876709,
        },
        {
            x: 6.595857620239258,
            y: 0.30485597252845764,
            z: -4.743165016174316,
        },
        {
            x: 6.497797966003418,
            y: 0.30485600233078003,
            z: -4.712905406951904,
        },
        {
            x: 6.432023525238037,
            y: 0.3048560321331024,
            z: -4.69260835647583,
        },
        {
            x: 6.392082214355469,
            y: 0.30485600233078003,
            z: -4.680283546447754,
        },
        {
            x: 6.37153959274292,
            y: 0.3048560321331024,
            z: -4.673943996429443,
        },
        {
            x: 6.3639397621154785,
            y: 0.30485600233078003,
            z: -4.6715989112854,
        },
        {
            x: 6.362839221954346,
            y: 0.3048560321331024,
            z: -4.671258926391602,
        },
        {
            x: 6.362809181213379,
            y: 0.30485600233078003,
            z: -4.671117305755615,
        },
        {
            x: 6.3625969886779785,
            y: 0.30485600233078003,
            z: -4.670110702514648,
        },
        {
            x: 6.362016677856445,
            y: 0.3048560321331024,
            z: -4.6673665046691895,
        },
        {
            x: 6.36088752746582,
            y: 0.30485600233078003,
            z: -4.662014007568359,
        },
        {
            x: 6.35902214050293,
            y: 0.30485600233078003,
            z: -4.6531805992126465,
        },
        {
            x: 6.356236934661865,
            y: 0.30485600233078003,
            z: -4.639993667602539,
        },
        {
            x: 6.352349281311035,
            y: 0.30485600233078003,
            z: -4.62158203125,
        },
        {
            x: 6.347174167633057,
            y: 0.30485600233078003,
            z: -4.597073554992676,
        },
        {
            x: 6.340527057647705,
            y: 0.30485600233078003,
            z: -4.565596103668213,
        },
        {
            x: 6.3322248458862305,
            y: 0.3048560321331024,
            z: -4.52627420425415,
        },
        {
            x: 6.32208251953125,
            y: 0.30485600233078003,
            z: -4.478241920471191,
        },
        {
            x: 6.3099164962768555,
            y: 0.30485600233078003,
            z: -4.420624732971191,
        },
        {
            x: 6.2957634925842285,
            y: 0.30485600233078003,
            z: -4.3525519371032715,
        },
        {
            x: 6.281264305114746,
            y: 0.30485600233078003,
            z: -4.273167610168457,
        },
        {
            x: 6.268775939941406,
            y: 0.30485600233078003,
            z: -4.181619167327881,
        },
        {
            x: 6.260653495788574,
            y: 0.3048560321331024,
            z: -4.077056407928467,
        },
        {
            x: 6.259252548217773,
            y: 0.30485600233078003,
            z: -3.958627462387085,
        },
        {
            x: 6.266929626464844,
            y: 0.3048560321331024,
            z: -3.825481653213501,
        },
        {
            x: 6.2860426902771,
            y: 0.3048560321331024,
            z: -3.676767587661743,
        },
        {
            x: 6.318944931030273,
            y: 0.30485600233078003,
            z: -3.5116333961486816,
        },
        {
            x: 6.3679962158203125,
            y: 0.3048560321331024,
            z: -3.3292293548583984,
        },
        {
            x: 6.435551166534424,
            y: 0.30485600233078003,
            z: -3.1287031173706055,
        },
        {
            x: 6.5239667892456055,
            y: 0.30485600233078003,
            z: -2.9092040061950684,
        },
        {
            x: 6.635610580444336,
            y: 0.30485600233078003,
            z: -2.6698570251464844,
        },
        {
            x: 6.7726263999938965,
            y: 0.30485600233078003,
            z: -2.410041570663452,
        },
        {
            x: 6.934505939483643,
            y: 0.30485600233078003,
            z: -2.1316592693328857,
        },
        {
            x: 7.118762016296387,
            y: 0.3048560619354248,
            z: -1.8385341167449951,
        },
        {
            x: 7.322860240936279,
            y: 0.30485597252845764,
            z: -1.5345321893692017,
        },
        {
            x: 7.5442728996276855,
            y: 0.30485600233078003,
            z: -1.2235230207443237,
        },
        {
            x: 7.780463695526123,
            y: 0.30485600233078003,
            z: -0.9093726873397827,
        },
        {
            x: 8.028902053833008,
            y: 0.30485597252845764,
            z: -0.5959497690200806,
        },
        {
            x: 8.287055969238281,
            y: 0.30485600233078003,
            z: -0.2871209383010864,
        },
        {
            x: 8.55239200592041,
            y: 0.30485600233078003,
            z: 0.013245537877082825,
        },
        {
            x: 8.822378158569336,
            y: 0.3048560321331024,
            z: 0.30128252506256104,
        },
        {
            x: 9.094482421875,
            y: 0.3048560321331024,
            z: 0.5731224417686462,
        },
        {
            x: 9.366170883178711,
            y: 0.3048560321331024,
            z: 0.8248977661132812,
        },
        {
            x: 9.634984970092773,
            y: 0.30485600233078003,
            z: 1.052800178527832,
        },
        {
            x: 9.899970054626465,
            y: 0.30485600233078003,
            z: 1.2542527914047241,
        },
        {
            x: 10.162134170532227,
            y: 0.30485600233078003,
            z: 1.428291916847229,
        },
        {
            x: 10.42257022857666,
            y: 0.30485600233078003,
            z: 1.5740231275558472,
        },
        {
            x: 10.682374000549316,
            y: 0.30485600233078003,
            z: 1.6905512809753418,
        },
        {
            x: 10.942642211914062,
            y: 0.3048560321331024,
            z: 1.7769829034805298,
        },
        {
            x: 11.204463958740234,
            y: 0.30485600233078003,
            z: 1.832422137260437,
        },
        {
            x: 11.468938827514648,
            y: 0.30485600233078003,
            z: 1.8559751510620117,
        },
        {
            x: 11.737161636352539,
            y: 0.30485600233078003,
            z: 1.846747636795044,
        },
        {
            x: 12.010223388671875,
            y: 0.30485600233078003,
            z: 1.8038440942764282,
        },
        {
            x: 12.28922176361084,
            y: 0.30485600233078003,
            z: 1.726370930671692,
        },
        {
            x: 12.575251579284668,
            y: 0.30485600233078003,
            z: 1.6134330034255981,
        },
        {
            x: 12.86939811706543,
            y: 0.30485600233078003,
            z: 1.4641472101211548,
        },
        {
            x: 13.171957015991211,
            y: 0.30485600233078003,
            z: 1.2791051864624023,
        },
        {
            x: 13.48167896270752,
            y: 0.3048560321331024,
            z: 1.061789870262146,
        },
        {
            x: 13.79703426361084,
            y: 0.30485600233078003,
            z: 0.8160873055458069,
        },
        {
            x: 14.116592407226562,
            y: 0.30485600233078003,
            z: 0.5458250045776367,
        },
        {
            x: 14.438889503479004,
            y: 0.30485600233078003,
            z: 0.2548482418060303,
        },
        {
            x: 14.762460708618164,
            y: 0.30485600233078003,
            z: -0.05299690365791321,
        },
        {
            x: 15.085838317871094,
            y: 0.3048560321331024,
            z: -0.3738649785518646,
        },
        {
            x: 15.407560348510742,
            y: 0.3048560321331024,
            z: -0.7039101123809814,
        },
        {
            x: 15.72616195678711,
            y: 0.3048560321331024,
            z: -1.0392862558364868,
        },
        {
            x: 16.040178298950195,
            y: 0.3048560321331024,
            z: -1.3761481046676636,
        },
        {
            x: 16.34814453125,
            y: 0.30485600233078003,
            z: -1.7106494903564453,
        },
        {
            x: 16.648595809936523,
            y: 0.30485600233078003,
            z: -2.038944721221924,
        },
        {
            x: 16.94053077697754,
            y: 0.30485600233078003,
            z: -2.3577146530151367,
        },
        {
            x: 17.224498748779297,
            y: 0.30485600233078003,
            z: -2.665412187576294,
        },
        {
            x: 17.501405715942383,
            y: 0.30485600233078003,
            z: -2.96089243888855,
        },
        {
            x: 17.772071838378906,
            y: 0.30485600233078003,
            z: -3.2429275512695312,
        },
        {
            x: 18.03740692138672,
            y: 0.30485600233078003,
            z: -3.510373592376709,
        },
        {
            x: 18.298290252685547,
            y: 0.30485600233078003,
            z: -3.7620584964752197,
        },
        {
            x: 18.55559730529785,
            y: 0.30485600233078003,
            z: -3.996809720993042,
        },
        {
            x: 18.810211181640625,
            y: 0.3048560321331024,
            z: -4.2134552001953125,
        },
        {
            x: 19.062999725341797,
            y: 0.30485597252845764,
            z: -4.410820960998535,
        },
        {
            x: 19.31485366821289,
            y: 0.30485600233078003,
            z: -4.587737560272217,
        },
        {
            x: 19.5666446685791,
            y: 0.3048560321331024,
            z: -4.743030548095703,
        },
        {
            x: 19.819250106811523,
            y: 0.3048560321331024,
            z: -4.875528335571289,
        },
        {
            x: 20.073379516601562,
            y: 0.3048560321331024,
            z: -4.984464168548584,
        },
        {
            x: 20.328712463378906,
            y: 0.30485600233078003,
            z: -5.071475028991699,
        },
        {
            x: 20.584562301635742,
            y: 0.30485600233078003,
            z: -5.13908576965332,
        },
        {
            x: 20.840232849121094,
            y: 0.30485597252845764,
            z: -5.189817905426025,
        },
        {
            x: 21.09505271911621,
            y: 0.30485600233078003,
            z: -5.226199150085449,
        },
        {
            x: 21.348283767700195,
            y: 0.30485597252845764,
            z: -5.250743389129639,
        },
        {
            x: 21.599260330200195,
            y: 0.30485600233078003,
            z: -5.265981674194336,
        },
        {
            x: 21.847288131713867,
            y: 0.3048560321331024,
            z: -5.274435520172119,
        },
        {
            x: 22.091672897338867,
            y: 0.3048560321331024,
            z: -5.278628349304199,
        },
        {
            x: 22.33171844482422,
            y: 0.30485600233078003,
            z: -5.281083106994629,
        },
        {
            x: 22.566740036010742,
            y: 0.30485600233078003,
            z: -5.284325122833252,
        },
        {
            x: 22.79604148864746,
            y: 0.3048560321331024,
            z: -5.290876388549805,
        },
        {
            x: 23.018938064575195,
            y: 0.30485600233078003,
            z: -5.303125858306885,
        },
        {
            x: 23.23490333557129,
            y: 0.3048560321331024,
            z: -5.321996212005615,
        },
        {
            x: 23.443483352661133,
            y: 0.30485600233078003,
            z: -5.347498893737793,
        },
        {
            x: 23.644237518310547,
            y: 0.3048560321331024,
            z: -5.379634857177734,
        },
        {
            x: 23.83671760559082,
            y: 0.3048560321331024,
            z: -5.418403148651123,
        },
        {
            x: 24.02050018310547,
            y: 0.3048560321331024,
            z: -5.463809967041016,
        },
        {
            x: 24.195093154907227,
            y: 0.30485597252845764,
            z: -5.51584529876709,
        },
        {
            x: 24.360082626342773,
            y: 0.3048560321331024,
            z: -5.574514389038086,
        },
        {
            x: 24.5150146484375,
            y: 0.3048560321331024,
            z: -5.6398162841796875,
        },
        {
            x: 24.659446716308594,
            y: 0.30485600233078003,
            z: -5.711750507354736,
        },
        {
            x: 24.792938232421875,
            y: 0.3048560321331024,
            z: -5.790318489074707,
        },
        {
            x: 24.915035247802734,
            y: 0.3048560321331024,
            z: -5.875519275665283,
        },
        {
            x: 25.025339126586914,
            y: 0.30485600233078003,
            z: -5.967341423034668,
        },
        {
            x: 25.124465942382812,
            y: 0.30485597252845764,
            z: -6.065515518188477,
        },
        {
            x: 25.214052200317383,
            y: 0.3048560321331024,
            z: -6.169508934020996,
        },
        {
            x: 25.2957706451416,
            y: 0.30485597252845764,
            z: -6.2787766456604,
        },
        {
            x: 25.371313095092773,
            y: 0.30485597252845764,
            z: -6.392775058746338,
        },
        {
            x: 25.44235610961914,
            y: 0.30485600233078003,
            z: -6.510958194732666,
        },
        {
            x: 25.51059341430664,
            y: 0.30485600233078003,
            z: -6.632784843444824,
        },
        {
            x: 25.57769775390625,
            y: 0.30485600233078003,
            z: -6.757719993591309,
        },
        {
            x: 25.645349502563477,
            y: 0.3048560321331024,
            z: -6.885196685791016,
        },
        {
            x: 25.71523094177246,
            y: 0.3048560321331024,
            z: -7.014682292938232,
        },
        {
            x: 25.789024353027344,
            y: 0.30485600233078003,
            z: -7.145631790161133,
        },
        {
            x: 25.86842155456543,
            y: 0.30485600233078003,
            z: -7.27750301361084,
        },
        {
            x: 25.955087661743164,
            y: 0.30485600233078003,
            z: -7.409749984741211,
        },
        {
            x: 26.050046920776367,
            y: 0.30485600233078003,
            z: -7.541920185089111,
        },
        {
            x: 26.153257369995117,
            y: 0.30485600233078003,
            z: -7.673701763153076,
        },
        {
            x: 26.264564514160156,
            y: 0.30485600233078003,
            z: -7.8047966957092285,
        },
        {
            x: 26.38382339477539,
            y: 0.30485600233078003,
            z: -7.934910297393799,
        },
        {
            x: 26.510883331298828,
            y: 0.30485597252845764,
            z: -8.06374454498291,
        },
        {
            x: 26.645605087280273,
            y: 0.3048560321331024,
            z: -8.191003799438477,
        },
        {
            x: 26.787824630737305,
            y: 0.30485600233078003,
            z: -8.316388130187988,
        },
        {
            x: 26.93741226196289,
            y: 0.30485600233078003,
            z: -8.439614295959473,
        },
        {
            x: 27.09419822692871,
            y: 0.30485600233078003,
            z: -8.560362815856934,
        },
        {
            x: 27.258047103881836,
            y: 0.30485597252845764,
            z: -8.67834758758545,
        },
        {
            x: 27.42880630493164,
            y: 0.30485600233078003,
            z: -8.793272018432617,
        },
        {
            x: 27.606327056884766,
            y: 0.30485600233078003,
            z: -8.904838562011719,
        },
        {
            x: 27.790283203125,
            y: 0.304857462644577,
            z: -9.012797355651855,
        },
        {
            x: 27.979816436767578,
            y: 0.30486583709716797,
            z: -9.11702823638916,
        },
        {
            x: 28.17399787902832,
            y: 0.3048872947692871,
            z: -9.217430114746094,
        },
        {
            x: 28.371891021728516,
            y: 0.3049279749393463,
            z: -9.31390380859375,
        },
        {
            x: 28.572553634643555,
            y: 0.3049941062927246,
            z: -9.406352996826172,
        },
        {
            x: 28.775056838989258,
            y: 0.3050917685031891,
            z: -9.494678497314453,
        },
        {
            x: 28.97846221923828,
            y: 0.30522722005844116,
            z: -9.578778266906738,
        },
        {
            x: 29.18183135986328,
            y: 0.3054066002368927,
            z: -9.65855598449707,
        },
        {
            x: 29.384244918823242,
            y: 0.30563604831695557,
            z: -9.733919143676758,
        },
        {
            x: 29.584735870361328,
            y: 0.3059217035770416,
            z: -9.804754257202148,
        },
        {
            x: 29.78238296508789,
            y: 0.3062698245048523,
            z: -9.87096881866455,
        },
        {
            x: 29.97624969482422,
            y: 0.30668649077415466,
            z: -9.932465553283691,
        },
        {
            x: 30.16560935974121,
            y: 0.30717533826828003,
            z: -9.989190101623535,
        },
        {
            x: 30.350759506225586,
            y: 0.3077278733253479,
            z: -10.041306495666504,
        },
        {
            x: 30.532302856445312,
            y: 0.3083316385746002,
            z: -10.08905029296875,
        },
        {
            x: 30.710844039916992,
            y: 0.30897435545921326,
            z: -10.132648468017578,
        },
        {
            x: 30.88698959350586,
            y: 0.3096436858177185,
            z: -10.17233943939209,
        },
        {
            x: 31.06134605407715,
            y: 0.31032729148864746,
            z: -10.208351135253906,
        },
        {
            x: 31.234519958496094,
            y: 0.31101295351982117,
            z: -10.24091911315918,
        },
        {
            x: 31.407114028930664,
            y: 0.3116881251335144,
            z: -10.270273208618164,
        },
        {
            x: 31.579729080200195,
            y: 0.312340646982193,
            z: -10.296645164489746,
        },
        {
            x: 31.752981185913086,
            y: 0.31295809149742126,
            z: -10.320270538330078,
        },
        {
            x: 31.92748260498047,
            y: 0.31352823972702026,
            z: -10.341379165649414,
        },
        {
            x: 32.10381317138672,
            y: 0.31403863430023193,
            z: -10.36020278930664,
        },
        {
            x: 32.28254699707031,
            y: 0.3144782483577728,
            z: -10.37696647644043,
        },
        {
            x: 32.46392822265625,
            y: 0.3148474097251892,
            z: -10.391834259033203,
        },
        {
            x: 32.64801788330078,
            y: 0.31515219807624817,
            z: -10.404934883117676,
        },
        {
            x: 32.83488082885742,
            y: 0.31539881229400635,
            z: -10.416398048400879,
        },
        {
            x: 33.02456283569336,
            y: 0.3155933618545532,
            z: -10.426351547241211,
        },
        {
            x: 33.21714782714844,
            y: 0.3157420754432678,
            z: -10.43492317199707,
        },
        {
            x: 33.41268539428711,
            y: 0.315851092338562,
            z: -10.44224739074707,
        },
        {
            x: 33.61123275756836,
            y: 0.31592655181884766,
            z: -10.448447227478027,
        },
        {
            x: 33.812862396240234,
            y: 0.3159746527671814,
            z: -10.453657150268555,
        },
        {
            x: 34.01762390136719,
            y: 0.3160015046596527,
            z: -10.458003044128418,
        },
        {
            x: 34.2255859375,
            y: 0.3160133361816406,
            z: -10.461614608764648,
        },
        {
            x: 34.43683624267578,
            y: 0.3160163462162018,
            z: -10.464622497558594,
        },
        {
            x: 34.65135192871094,
            y: 0.31601640582084656,
            z: -10.46714973449707,
        },
        {
            x: 34.868709564208984,
            y: 0.31601643562316895,
            z: -10.469257354736328,
        },
        {
            x: 35.08802032470703,
            y: 0.31601643562316895,
            z: -10.47094440460205,
        },
        {
            x: 35.30839538574219,
            y: 0.31601640582084656,
            z: -10.47221565246582,
        },
        {
            x: 35.5289306640625,
            y: 0.31601640582084656,
            z: -10.473066329956055,
        },
        {
            x: 35.74875259399414,
            y: 0.31601643562316895,
            z: -10.473499298095703,
        },
        {
            x: 35.966957092285156,
            y: 0.31601640582084656,
            z: -10.473512649536133,
        },
        {
            x: 36.18264389038086,
            y: 0.31601640582084656,
            z: -10.47310733795166,
        },
        {
            x: 36.39492416381836,
            y: 0.31601640582084656,
            z: -10.472283363342285,
        },
        {
            x: 36.60291290283203,
            y: 0.31601640582084656,
            z: -10.471041679382324,
        },
        {
            x: 36.80570602416992,
            y: 0.31601643562316895,
            z: -10.469379425048828,
        },
        {
            x: 37.002410888671875,
            y: 0.31601640582084656,
            z: -10.46729850769043,
        },
        {
            x: 37.19215393066406,
            y: 0.31601640582084656,
            z: -10.464800834655762,
        },
        {
            x: 37.374454498291016,
            y: 0.31601643562316895,
            z: -10.461897850036621,
        },
        {
            x: 37.54933547973633,
            y: 0.31601640582084656,
            z: -10.458622932434082,
        },
        {
            x: 37.7169303894043,
            y: 0.31601643562316895,
            z: -10.455011367797852,
        },
        {
            x: 37.87732696533203,
            y: 0.31601640582084656,
            z: -10.451095581054688,
        },
        {
            x: 38.030643463134766,
            y: 0.31601637601852417,
            z: -10.446911811828613,
        },
        {
            x: 38.176979064941406,
            y: 0.31601640582084656,
            z: -10.442496299743652,
        },
        {
            x: 38.316429138183594,
            y: 0.31601640582084656,
            z: -10.43787956237793,
        },
        {
            x: 38.449100494384766,
            y: 0.31601640582084656,
            z: -10.433096885681152,
        },
        {
            x: 38.57509994506836,
            y: 0.31601640582084656,
            z: -10.428182601928711,
        },
        {
            x: 38.69452667236328,
            y: 0.31601640582084656,
            z: -10.423172950744629,
        },
        {
            x: 38.80748748779297,
            y: 0.31601640582084656,
            z: -10.41810131072998,
        },
        {
            x: 38.91408157348633,
            y: 0.31601640582084656,
            z: -10.41300106048584,
        },
        {
            x: 39.014530181884766,
            y: 0.31601640582084656,
            z: -10.407896041870117,
        },
        {
            x: 39.109317779541016,
            y: 0.31601640582084656,
            z: -10.402793884277344,
        },
        {
            x: 39.19894027709961,
            y: 0.31601640582084656,
            z: -10.397690773010254,
        },
        {
            x: 39.28392028808594,
            y: 0.31601640582084656,
            z: -10.392586708068848,
        },
        {
            x: 39.364784240722656,
            y: 0.31601643562316895,
            z: -10.387483596801758,
        },
        {
            x: 39.44203567504883,
            y: 0.31601643562316895,
            z: -10.382379531860352,
        },
        {
            x: 39.51620101928711,
            y: 0.31601643562316895,
            z: -10.377277374267578,
        },
        {
            x: 39.5877799987793,
            y: 0.31601640582084656,
            z: -10.372173309326172,
        },
        {
            x: 39.65730667114258,
            y: 0.31601643562316895,
            z: -10.367070198059082,
        },
        {
            x: 39.725284576416016,
            y: 0.31601640582084656,
            z: -10.361966133117676,
        },
        {
            x: 39.79222869873047,
            y: 0.31601640582084656,
            z: -10.356863975524902,
        },
        {
            x: 39.85865783691406,
            y: 0.31601640582084656,
            z: -10.351760864257812,
        },
    ],
    closed: false,
};
