/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, EnemyType, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, ProjectileBluePrint, Skill, TowerBluePrint } from "./types";
import { THREE } from "../three";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

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

// prettier-ignore
export const gameSkills: { [k in SkillPath]: Skill[] }  = {
    constructor: [
        { id: "constructor-1", name: "masonry basics", description: "reduce 10% build cost of level 1 towers", starCost: 2 },
        { id: "constructor-2", name: "reinforced walls", description: "1 extra ❤️", starCost: 2 },
        { id: "constructor-3", name: "advanced tools", description: "reduce 10% upgrade cost of level 2 towers", starCost: 3 },
        { id: "constructor-4", name: "fortified walls", description: "3 extra ❤️", starCost: 3 },
        { id: "constructor-5", name: "specialized artisans", description: "reduce 10% upgrade cost of level 3 towers", starCost: 4 },
        { id: "constructor-6", name: "masonry mastery", description: "reduce 10% cost of all towers", starCost: 5 },
    ],
    merchant: [
        { id: "merchant-1", name: "developing economy", description: "earn 10 gold every time you survive a wave", starCost: 2 },
        { id: "merchant-2", name: "trade with foreigners", description: "start with extra 50 gold", starCost: 2 },
        { id: "merchant-3", name: "oversees colony", description: "start with extra 100 gold", starCost: 3 },
        { id: "merchant-4", name: "bounty hunter", description: "earn 20 gold every time you survive a wave", starCost: 3 },
        { id: "merchant-5", name: "maximized profits", description: "earn 1 extra gold piece for every killed enemy", starCost: 4 },
        { id: "merchant-6", name: "advanced economy", description: "start with extra 150 gold", starCost: 5 },
    ],
    chemist: [
        { id: "chemist-1", name: "basic chemistry", description: "poison towers deal 10% extra damage", starCost: 2 },
        { id: "chemist-2", name: "herbal lore", description: "wizard towers deal 10% extra damage", starCost: 2 },
        { id: "chemist-3", name: "philosophy stone", description: "poison damage increased by 1", starCost: 3 },
        { id: "chemist-4", name: "laboratory trinkets", description: "poison towers deal 20% extra damage", starCost: 3 },
        { id: "chemist-5", name: "classical library", description: "wizard towers deal 20% extra damage", starCost: 4 },
        { id: "chemist-6", name: "chemical mastery", description: "poison damage increased by 3", starCost: 5 },
    ],
    blacksmith: [
        { id: "blacksmith-1", name: "basic smithery", description: "archer towers deal 10% extra damage", starCost: 2 },
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
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Ballista,
            level: 2,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Ballista,
            level: 3,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Ballista,
            level: 4,
            explosionIntensity: 0.5,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Straight,
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
        // // wave 2
        // waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 01
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
        // // wave 2
        waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 02
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
        // // wave 2
        // waveSegment(EnemyChar.Raptor, 4),
        // // wave 3
        // [...waveSegment(EnemyChar.Soldier, 3.2), ...waveSegment(EnemyChar.Spider, 4)],
    ],

    // stage 03
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
        // wave 2
        // waveSegment(EnemyChar.Raptor, 4),
        // // wave 3
        // [...waveSegment(EnemyChar.Soldier), ...waveSegment(EnemyChar.Spider)],
        // // wave 4
        // [...waveSegment(EnemyChar.Raptor), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
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
