// export function makeWaveEnemy(enemyType: EnemyType, spawnAt: number) {
//     const enemy = new Enemy(enemyType);
// }

import { EnemyChar, EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";
import { THREE } from "../three";

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
} as const;

export const STAGE_WAVES_DATA: [string, number][][][] = [
    // stage 00
    [
        // wave 0
        [
            ["s", 0],
            ["s", 2],
            ["s", 4],
            ["s", 6],
            ["s", 8],
            ["s", 10],
            ["s", 12],
            ["s", 14],
        ],
        // wave 1
        [
            ["r", 0],
            ["r", 3],
            ["r", 6],
            ["r", 9],
            ["r", 12],
        ],
        // wave 2
        [
            ["s", 0],
            ["s", 2],
            ["s", 4],
            ["s", 6],
            ["s", 8],
            ["s", 10],
            ["s", 12],
            ["s", 14],
            ["r", 3],
            ["r", 9],
            ["r", 15],
        ],
    ],

    // stage 01
    [
        // wave 0
        [
            ["r", 0],
            ["r", 3],
            ["r", 6],
            ["r", 9],
            ["r", 12],
        ],
        // wave 1
        [
            ["s", 0],
            ["s", 2],
            ["s", 4],
            ["s", 6],
            ["s", 8],
            ["s", 10],
            ["s", 12],
            ["s", 14],
        ],
        // wave 2
        [
            ["s", 0],
            ["s", 2],
            ["s", 4],
            ["s", 6],
            ["s", 8],
            ["s", 10],
            ["s", 12],
            ["s", 14],
            ["r", 3],
            ["r", 9],
            ["r", 15],
        ],
    ],

    // stage 02
    [
        // wave 0
        [
            ["o", 0],
            ["o", 2],
            ["o", 4],
            ["o", 6],
        ],
        // wave 1
        [
            ["r", 0],
            ["s", 1],
            ["r", 3],
            ["s", 4],
            ["r", 6],
            ["s", 7],
            ["r", 9],
            ["s", 10],
        ],
    ],

    // stage 03
    [
        // wave 0
        [
            ["z", 0],
            ["s", 1],
            ["z", 3],
            ["s", 4],
            ["r", 6],
            ["s", 7],
            ["z", 9],
            ["s", 10],
        ],
    ],
    // stage 04
    [
        // wave 0
        [
            ["z", 0],
            ["s", 1],
            ["z", 3],
            ["s", 4],
            ["r", 6],
            ["s", 7],
            ["z", 9],
            ["s", 10],
        ],
    ],
];

export function getEnemyTypeFromChar(char: EnemyChar): EnemyType {
    switch (char) {
        case "r":
            return EnemyType.Raptor;
        case "o":
            return EnemyType.Orc;
        case "z":
            return EnemyType.Soldier;
        case "s":
        default:
            return EnemyType.Spider;
    }
}

export function equipGun(model: THREE.Group, gunName: string) {
    console.log("======================");
    const handObject = model.getObjectByName("Index1R")!;
    [...handObject.children].forEach((gunObj) => {
        console.log(gunObj.name);
        if (gunObj.name !== gunName) {
            gunObj.visible = false;
        }
    });
}
