import { EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const COLORS = {
    bg: 0x333355,
    desert: 0xdd6600,
    concrete: 0xacacac,
};

export const enemyBlueprints: { [k in EnemyType]: EnemyBluePrint } = {
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
        speed: 4,
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

export const STAGE_WAVES_DATA: [string, number, number][][][] = [
    // stage 00
    [
        // wave 0
        [
            ["s", 0, 0],
            // ["s", 2, 1],
            // ["s", 2, -1],
            // ["s", 6, 0],
            // ["s", 8, 1],
            // ["s", 8, -1],
            // ["s", 12, 0],
            // ["s", 14, 1],
            // ["s", 14, -1],
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
