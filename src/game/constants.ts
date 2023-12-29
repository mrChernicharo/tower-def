import { EnemyType, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, ProjectileBluePrint, TowerBluePrint } from "./types";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const COLORS = {
    bg: 0x333355,
    desert: 0xdd6600,
    concrete: 0xacacac,
    blue: 0x3484d4,
    red: 0xd43434,
    orange: 0xd47f34,
    green: 0x34d4af,
    purple: 0xb834d4,
} as const;

export const ENEMY_BLUEPRINTS: { [k in EnemyType]: EnemyBluePrint } = {
    spider: {
        name: EnemyType.Spider,
        modelURL: "/assets/glb/spider.glb",
        speed: 3.5,
        maxHp: 40,
        modelScale: 80,
        walkAnimationName: "Wolf Spider Armature|Spider running",
    },
    orc: {
        name: EnemyType.Orc,
        // modelURL: "/assets/glb/hand-painted_orc.glb",
        modelURL: "/assets/glb/low-poly_orc.glb",
        speed: 2,
        maxHp: 200,
        modelScale: 1.5,
        walkAnimationName: "ANM_WALK",
    },
    raptor: {
        name: EnemyType.Raptor,
        modelURL: "/assets/glb/raptoid.glb",
        speed: 6,
        maxHp: 100,
        modelScale: 0.02,
        walkAnimationName: "Running",
    },
    soldier: {
        name: EnemyType.Soldier,
        modelURL: "/assets/glb/Character_Soldier.gltf",
        speed: 2,
        maxHp: 100,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    brigand: {
        name: EnemyType.Brigand,
        modelURL: "/assets/glb/Character_Hazmat.gltf",
        speed: 2,
        maxHp: 100,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    warrior: {
        name: EnemyType.Warrior,
        modelURL: "/assets/glb/Character_Enemy.gltf",
        speed: 1.6,
        maxHp: 100,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
} as const;

export const TOWER_BLUEPRINTS: { [k in TowerType]: TowerBluePrint[] } = {
    Archer: [
        {
            name: TowerType.Archer,
            level: 1,
            damage: [4, 7],
            fireRate: 6,
            color: "blue",
            price: 100,
            range: 8,
        },
        {
            name: TowerType.Archer,
            level: 2,
            damage: [8, 13],
            fireRate: 6,
            color: "blue",
            price: 160,
            range: 9,
        },
        {
            name: TowerType.Archer,
            level: 3,
            damage: [14, 22],
            fireRate: 7,
            color: "blue",
            price: 220,
            range: 10,
        },
        {
            name: TowerType.Archer,
            level: 4,
            damage: [20, 34],
            fireRate: 8,
            color: "blue",
            price: 380,
            range: 10,
            skills: [],
        },
    ],
    Ballista: [
        {
            name: TowerType.Ballista,
            level: 1,
            damage: [10, 20],
            fireRate: 2,
            color: "red",
            price: 100,
            range: 8,
        },
        {
            name: TowerType.Ballista,
            level: 2,
            damage: [20, 38],
            fireRate: 2.25,
            color: "red",
            price: 160,
            range: 9,
        },
        {
            name: TowerType.Ballista,
            level: 3,
            damage: [34, 55],
            fireRate: 2.5,
            color: "red",
            price: 220,
            range: 10,
        },
        {
            name: TowerType.Ballista,
            level: 4,
            damage: [51, 76],
            fireRate: 2.75,
            color: "red",
            price: 380,
            range: 10,
            skills: [],
        },
    ],
    Cannon: [
        {
            name: TowerType.Cannon,
            level: 1,
            damage: [18, 36],
            fireRate: 0.8,
            color: "orange",
            price: 100,
            range: 9,
        },
        {
            name: TowerType.Cannon,
            level: 2,
            damage: [29, 54],
            fireRate: 0.8,
            color: "orange",
            price: 160,
            range: 10,
        },
        {
            name: TowerType.Cannon,
            level: 3,
            damage: [48, 86],
            fireRate: 0.8,
            color: "orange",
            price: 220,
            range: 11,
        },
        {
            name: TowerType.Ballista,
            level: 4,
            damage: [60, 100],
            fireRate: 0.8,
            color: "orange",
            price: 380,
            range: 12,
            skills: [],
        },
    ],
    Wizard: [
        {
            name: TowerType.Wizard,
            level: 1,
            damage: [10, 21],
            fireRate: 2,
            color: "purple",
            price: 100,
            range: 12,
        },
        {
            name: TowerType.Wizard,
            level: 2,
            damage: [18, 36],
            fireRate: 1.8,
            color: "purple",
            price: 160,
            range: 13,
        },
        {
            name: TowerType.Wizard,
            level: 3,
            damage: [33, 57],
            fireRate: 1.6,
            color: "purple",
            price: 220,
            range: 14,
        },
        {
            name: TowerType.Wizard,
            level: 4,
            damage: [49, 75],
            fireRate: 1.5,
            color: "purple",
            price: 380,
            range: 14,
            skills: [],
        },
    ],
    Poison: [
        {
            name: TowerType.Poison,
            level: 1,
            damage: [4, 7],
            fireRate: 3,
            color: "green",
            price: 100,
            range: 10,
        },
        {
            name: TowerType.Poison,
            level: 2,
            damage: [11, 22],
            fireRate: 2.5,
            color: "green",
            price: 160,
            range: 12,
        },
        {
            name: TowerType.Poison,
            level: 3,
            damage: [21, 37],
            fireRate: 2,
            color: "green",
            price: 220,
            range: 13,
        },
        {
            name: TowerType.Poison,
            level: 4,
            damage: [33, 60],
            fireRate: 2,
            color: "green",
            price: 380,
            range: 14,
            skills: [],
        },
    ],
};

export const PROJECTILE_BLUEPRINTS: { [k in TowerType]: ProjectileBluePrint[] } = {
    Archer: [
        { type: TowerType.Archer, level: 1, modelScale: 0.005, speed: 14, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Archer, level: 2, modelScale: 0.005, speed: 14, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Archer, level: 3, modelScale: 0.005, speed: 14, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Archer, level: 4, modelScale: 0.005, speed: 14, trajectoryType: TrajectoryType.Straight },
    ],
    Ballista: [
        { type: TowerType.Ballista, level: 1, modelScale: 0.0075, speed: 18, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Ballista, level: 2, modelScale: 0.0075, speed: 18, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Ballista, level: 3, modelScale: 0.0075, speed: 18, trajectoryType: TrajectoryType.Straight },
        { type: TowerType.Ballista, level: 4, modelScale: 0.0075, speed: 18, trajectoryType: TrajectoryType.Straight },
    ],
    Cannon: [
        { type: TowerType.Ballista, level: 1, modelScale: 0.008, speed: 12, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 2, modelScale: 0.01, speed: 12, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 3, modelScale: 0.012, speed: 12, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 4, modelScale: 0.015, speed: 12, trajectoryType: TrajectoryType.Parabola },
    ],
    Wizard: [
        { type: TowerType.Ballista, level: 1, modelScale: 0.005, speed: 18, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 2, modelScale: 0.006, speed: 18, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 3, modelScale: 0.007, speed: 18, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Ballista, level: 4, modelScale: 0.008, speed: 18, trajectoryType: TrajectoryType.Parabola },
    ],
    Poison: [
        { type: TowerType.Poison, level: 1, modelScale: 0.005, speed: 15, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Poison, level: 2, modelScale: 0.006, speed: 15, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Poison, level: 3, modelScale: 0.007, speed: 15, trajectoryType: TrajectoryType.Parabola },
        { type: TowerType.Poison, level: 4, modelScale: 0.008, speed: 15, trajectoryType: TrajectoryType.Parabola },
    ],
};

export const STAGE_WAVES_DATA: [string, number, number][][][] = [
    // stage 00
    [
        // wave 0
        [
            ["s", 0, 0],
            ["s", 2, 1],
            // ["s", 2, -1],
            // ["r", 3, -1],
            ["s", 6, 0],
            ["s", 8, 1],
            // ["s", 8, -1],
            ["s", 12, 0],
            ["s", 14, 1],
            // ["s", 14, -1],
            ["s", 19, 0],
        ],
        // wave 1
        [
            ["r", 0, 0],
            ["r", 3, 0],
            ["r", 6, 0],
            ["r", 9, 0],
            ["r", 12, 0],
        ],
        // wave 2
        [
            ["s", 0, 0],
            ["s", 2, 0],
            ["s", 4, 0],
            ["s", 6, 0],
            ["s", 8, 0],
            ["s", 10, 0],
            ["s", 12, 0],
            ["s", 14, 0],
            ["r", 3, 0],
            ["r", 9, 0],
            ["r", 15, 0],
        ],
    ],

    // stage 01
    [
        // wave 0
        [
            ["r", 0, 0],
            ["r", 3, 0],
            ["r", 6, 0],
            ["r", 9, 0],
            ["r", 12, 0],
        ],
    ],

    // stage 02
    [
        // wave 0
        [
            ["o", 0, 0],
            ["o", 2, 0],
            ["o", 4, 0],
            ["o", 6, 0],
        ],
    ],

    // stage 03
    [
        // wave 0
        [
            ["z", 0, 0],
            ["s", 1, 0],
            ["z", 3, 0],
            ["s", 4, 0],
            ["r", 6, 0],
            ["s", 7, 0],
            ["z", 9, 0],
            ["s", 10, 0],
        ],
    ],
    // stage 04
    [
        // wave 0
        [
            ["b", 0, 0],
            ["s", 1, 0],
            ["b", 3, 0],
            ["s", 4, 0],
            ["r", 6, 0],
            ["s", 7, 0],
            ["b", 9, 0],
            ["s", 10, 0],
        ],
    ],
    // stage 05
    [
        // wave 0
        [
            ["w", 0, 0],
            ["s", 1, 0],
            ["w", 3, 0],
            ["s", 4, 0],
            ["r", 6, 0],
            ["s", 7, 0],
            ["w", 9, 0],
            ["s", 10, 0],
        ],
    ],
];
