/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, GameArea } from "../../enums";
import { GameLevel, WaveEnemy } from "../../types";
import { winterLevelPaths } from "../paths/winter-paths";
import { lavaLevelPaths } from "../paths/lava-paths";
import { desertLevelPaths00, desertLevelPaths01 } from "../paths/desert-paths";
import { forestLevelPaths } from "../paths/forest-paths";
import { waveSegment, printWavesStatistics } from "../../helpers";
import { ENEMY_BLUEPRINTS } from "../enemies";
// import { THREE } from "../three";

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
    desert: "/assets/glb/levels/lv1.desert-level.glb",
    forest: "/assets/glb/levels/lv2.forest-level.glb",
    winter: "/assets/glb/levels/lv3.winter-level.glb",
    lava: "/assets/glb/levels/lv4.lava-level.glb",
};

const smallBounds = { left: -15, right: 15, top: -5, bottom: 85 };
const mediumBounds = { left: -20, right: 20, top: 0, bottom: 80 };
const largeBounds = { left: -30, right: 30, top: 0, bottom: 110 };

const towerBasePositions = {
    desert: [
        [-4.23, 0.1, -32],
        [-10.03, 0.1, 9.045719146728516],
        [-14.67, 0.1, 8.63398265838623],
        [-15.78, 0.1, 3.8990440368652344],
        [-10.65, 0.1, 3.6790854930877686],
        [-4.93, 0.1, -25.139816284179688],
        [-12.06, 0.1, -25.139816284179688],
        [-11.54, 0.1, -31.42244529724121],
        [14.094917297363281, 0.1, 20.26247787475586],
        [8.91, 0.1, 20.561803817749023],
        [9.13, 0.1, 26.90176010131836],
        [14.72, 0.1, 26.308197021484375],
        [13.21, 0.1, 33.36888122558594],
        [7.62, 0.1, 33.96244812011719],
        [-5.4, 0.1, 9.045719146728516],
        [-11.05, 0.1, -18.505279541015625],
        [-8.77, 0.1, -4.2777299880981445],
        [5.64, 0.1, 12.768688201904297],
    ] as [number, number, number][],
    desert2: [
        // [-17.5, 0.1, -20],
        [-16.769852409018597, 0, -22.1100205012947],
        [-10.084115639998581, 0, -19.25634365751264],
        [-0.055603980089027116, 0, -17.736693319780095],
        [-16.5, 0.1, -7],
        [-8, 0.1, -5],
        [-16, 0.1, 7],
        [-7, 0.1, 5],
        [-11, 0.1, 12],
        [7, 0.1, 13],
        [0, 0.1, 10],
        [2.1066766393286835, 0, 1.3845094820838533],
        [11.270140720927576, 0, 7.101552849333572],
        [12.251040080251133, 0, -0.028416352144908785],
        [12.45412333038625, 0, 23.101484393737536],
        [-5.6441889522027076, 0, 30.42731280929469],
        [-1.3580527298250695, 0, 21.598511061270955],
        [-16.995856344543678, 0, 20.83100040563857],
        [15.121864459180443, 0, 15.531729381782675],
        // [-16.23, 0.1, -16],
        // [-10.03, 0.1, 9.045719146728516],
        // [-14.67, 0.1, 8.63398265838623],
        // [-15.78, 0.1, 3.8990440368652344],
        // [-10.65, 0.1, 3.6790854930877686],
        // [-4.93, 0.1, -25.139816284179688],
        // [-12.06, 0.1, -25.139816284179688],
        // [-11.54, 0.1, -31.42244529724121],
        // [14.094917297363281, 0.1, 20.26247787475586],
        // [8.91, 0.1, 20.561803817749023],
        // [9.13, 0.1, 26.90176010131836],
        // [14.72, 0.1, 26.308197021484375],
        // [13.21, 0.1, 33.36888122558594],
        // [7.62, 0.1, 33.96244812011719],
        // [-5.4, 0.1, 9.045719146728516],
        // [-11.05, 0.1, -18.505279541015625],
        // [-8.77, 0.1, -4.2777299880981445],
        // [5.64, 0.1, 12.768688201904297],
    ] as [number, number, number][],
    forest: [
        [4.2, 0.1, -25],
        [-4.2, 0.1, -25],
        [3.9, 0.1, -19],
        [-3.9, 0.1, -19],
        [4, 0.1, -5],
        [-4, 0.1, -4],
        [0, 0.1, -10],
        [4, 0.1, 5],
        [-4, 0.1, 4],
        [10.8, 0.1, 10],
        [11.2, 0.1, 15.8],
        [-10.4, 0.1, 7.5],
        [-11.1, 0.1, 15.5],
    ] as [number, number, number][],
    winter: [
        [6.5, 0.3, -25],
        [-10, 0.3, -24.7],
        [-7, 0.3, -18],
        [3.6, 0.3, -18],
        [-10.5, 0.3, -11],
        [7, 0.3, -10.5],
        [7, 0.3, 0],
        [14, 0.3, 2],
        [-11.5, 0.3, 8],
        [9, 0.3, 8.5],
        [-8.5, 0.3, 18],
        [5, 0.3, 18],
        [-13.5, 0.3, 24.7],
        [10, 0.3, 24.7],
    ] as [number, number, number][],
    lava: [
        [-7.9717559814453125, 0.3, 14.692939758300781],
        [-10.693512916564941, 0.3, -26.959732055664062],
        [-8.4456787109375, 0.3, -0.522979736328125],
        [-0.5159873962402344, 0.3, -26.063919067382812],
        [-5.448331832885742, 0.3, -18.18609619140625],
        [-5.110391616821289, 0.3, -11.77816390991211],
        [-4.4046173095703125, 0.3, 24.684951782226562],
        [-9.512611389160156, 0.3, 6.874664306640625],
        [-1.3322467803955078, 0.3, -1.8963775634765625],
        [-1.0214557647705078, 0.3, 15.341323852539062],
        [6.30039119720459, 0.3, 14.46826171875],
        [7.553034782409668, 0.3, 6.8575439453125],
        [6.064409255981445, 0.3, -1.31390380859375],
        [6.050017356872559, 0.3, -11.656843185424805],
        [6.0035505294799805, 0.3, -18.754493713378906],
        [11.484609603881836, 0.3, -26.89056396484375],
        [5.920717239379883, 0.3, 24.551246643066406],
        [-18.172679901123047, 0.3, -0.7079014778137207],
        [16.111492156982422, 0.3, -0.7079014778137207],
    ] as [number, number, number][],
};

/**
 * desert:
 * - dino, squidle, bee, ninja
 *
 * forest
 * - spider, wizard, orc, tribal, bee
 *
 * winter
 * - alien, ninja, orc, wizard, ghost
 *
 * lava
 * - demon, , dino, tribal, dragon, squidle, demonBoss
 */

// enemyChar, pathIdx, spawnAt, xOffset
export const STAGE_WAVES_DATA: WaveEnemy[][][] = [
    /****************************************************/
    /********************** DESERT **********************/
    /****************************************************/
    // stage 01
    [
        // wave 1
        [...waveSegment(EnemyChar.Dino, 6, 6, 0, 0)],
        // wave 2
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Dino, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
    ],

    // stage 02
    [
        // wave 1
        [...waveSegment(EnemyChar.Dino, 3, 6, 0, 0), ...waveSegment(EnemyChar.Bee, 5, 3, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Dino, 5, 6, 0, 0), ...waveSegment(EnemyChar.Bee, 7, 3, 0, 2)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 5, 0, 0),
            ...waveSegment(EnemyChar.Ninja, 2, 5, 15, 1),
            ...waveSegment(EnemyChar.Bee, 2, 1, 0, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 4, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 8, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 12, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 16, 2),
        ],
    ],

    // stage 03
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 1, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 1, 4, 0),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Dino, 8, 4, 0, 0), ...waveSegment(EnemyChar.Squidle, 4, 8, 2, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Ninja, 5, 5, 2.5, 0), ...waveSegment(EnemyChar.Squidle, 6, 5, 0, 0)],
    ],

    // stage 04
    [
        // wave 1
        [...waveSegment(EnemyChar.Dino, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 4, 6, 3, 2)],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 3, 6, 0, 0),
            ...waveSegment(EnemyChar.Bee, 5, 3, 0, 2),
            ...waveSegment(EnemyChar.Ninja, 4, 7, 2.5, 1),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Ninja, 5, 5, 2.5, 1),
            ...waveSegment(EnemyChar.Dino, 8, 5, 0, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 1, 4, 3),
            ...waveSegment(EnemyChar.Bee, 2, 1, 8, 0),
            ...waveSegment(EnemyChar.Bee, 2, 1, 12, 3),
        ],
    ],

    /****************************************************/
    /********************** FOREST **********************/
    /****************************************************/

    // stage 05 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Wizard, 2, 5, 4, 2),
            ...waveSegment(EnemyChar.Bee, 2, 1, 0, 1),
            ...waveSegment(EnemyChar.Bee, 2, 1, 12, 1),
            ...waveSegment(EnemyChar.Bee, 2, 1, 24, 1),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Wizard, 3, 5, 4, 0),
            ...waveSegment(EnemyChar.Bee, 6, 6, 0, 1),
            ...waveSegment(EnemyChar.Orc, 2, 6, 6, 2),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Spider, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Spider, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Orc, 4, 4, 2, 2),
        ],
    ],

    // stage 06 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 3, 1, 0, 0),
            ...waveSegment(EnemyChar.Spider, 3, 1, 7, 0),
            ...waveSegment(EnemyChar.Spider, 3, 1, 14, 0),
            ...waveSegment(EnemyChar.Spider, 3, 1, 21, 0),
            ...waveSegment(EnemyChar.Wizard, 2, 6, 6, 1),
            ...waveSegment(EnemyChar.Ghost, 2, 6, 3, 2),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Ghost, 5, 6, 0, 1), ...waveSegment(EnemyChar.Tribal, 3, 10, 2, 2)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Spider, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Spider, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Tribal, 4, 6, 6, 2),
        ],
    ],

    // stage 07 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 2, 1, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2, 1, 7, 2),
            ...waveSegment(EnemyChar.Spider, 2, 1, 14, 0),
            ...waveSegment(EnemyChar.Spider, 2, 1, 21, 2),
            ...waveSegment(EnemyChar.Wizard, 2, 6, 6, 0),
            ...waveSegment(EnemyChar.Ghost, 2, 6, 3, 2),
            ...waveSegment(EnemyChar.Orc, 2, 5, 13, 1),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Ghost, 5, 6, 0, 1),
            ...waveSegment(EnemyChar.Tribal, 2, 6, 6, 2),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Spider, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Spider, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Tribal, 4, 6, 6, 2),
            ...waveSegment(EnemyChar.Orc, 2, 5, 16, 1),
        ],
    ],
    // stage 08 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 2, 1, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2, 1, 7, 2),
            ...waveSegment(EnemyChar.Spider, 2, 1, 14, 0),
            ...waveSegment(EnemyChar.Spider, 2, 1, 21, 2),
            ...waveSegment(EnemyChar.Wizard, 2, 6, 6, 0),
            ...waveSegment(EnemyChar.Ghost, 2, 6, 3, 2),
            ...waveSegment(EnemyChar.Orc, 4, 5, 13, 1),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Ghost, 5, 6, 2, 1),
            ...waveSegment(EnemyChar.Bee, 6, 6, 0, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 8, 6, 2),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Spider, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Spider, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Spider, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Tribal, 3, 6, 6, 2),
            ...waveSegment(EnemyChar.Orc, 6, 5, 16, 1),
        ],
    ],

    /****************************************************/
    /********************** WINTER **********************/
    /****************************************************/

    // stage 09
    [
        // wave 1
        [...waveSegment(EnemyChar.Orc, 6, 5, 5, 0), ...waveSegment(EnemyChar.Wizard, 5, 6, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 9, 5, 5, 0), ...waveSegment(EnemyChar.Ghost, 6, 7, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 9, 5, 5, 0),
            ...waveSegment(EnemyChar.Ghost, 6, 7, 0, 2),
            ...waveSegment(EnemyChar.Ninja, 6, 7, 0, 1),
        ],
    ],
    // stage 10
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Orc, 6, 6, 0, 0),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 5, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 15, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 20, 2),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 30, 2, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
        ],
    ],
    // stage 11
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Orc, 7, 6, 0, 0),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 5, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 15, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 20, 2),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Orc, 8, 5, 5, 0),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 20, 2),
            ...waveSegment(EnemyChar.Ghost, 4, 5.3, 7, 1),
        ],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
            ...waveSegment(EnemyChar.Ghost, 4, 5, 0, 2),
        ],
    ],
    // stage 12
    [
        [
            ...waveSegment(EnemyChar.Orc, 6, 6, 0, 0),
            ...waveSegment(EnemyChar.Bee, 8, 4.5, 7, 0),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 5, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 15, 2),
            ...waveSegment(EnemyChar.Spider, 4, 0.8, 20, 2),
            // ...waveSegment(EnemyChar.DemonBoss, 1, undefined, 0, 0),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Orc, 8, 5, 2, 0),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Spider, 10, 0.8, 20, 2),
            ...waveSegment(EnemyChar.Ghost, 6, 4, 5, 1),
        ],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 3, 1, 2, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 10, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 18, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 24, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 1.8, 0, 2),
            ...waveSegment(EnemyChar.Ghost, 4, 5, 0, 2),
        ],
    ],

    /****************************************************/
    /*********************** LAVA ***********************/
    /****************************************************/

    // stage 13
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 6, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 18, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 24, 3),
        ],
    ],
    // stage 14
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 6, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 18, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 24, 3),
        ],
    ],
    // stage 15
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 6, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 18, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 24, 3),
        ],
    ],
    // stage 16
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 1, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 6, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 18, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 24, 3),
        ],
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 1),
            ...waveSegment(EnemyChar.Demon, 6, 4, 20, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 6, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 18, 2),
            ...waveSegment(EnemyChar.Dragon, 2, 2, 24, 3),
            ...waveSegment(EnemyChar.DemonBoss, 1, undefined, 0, 0),
        ],
    ],
];

export const GAME_LEVELS: GameLevel[] = [
    {
        area: GameArea.Desert,
        level: 0,
        initialGold: 4060,
        // initialGold: 250,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths00,
        waves: STAGE_WAVES_DATA[0],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
    },
    {
        area: GameArea.Desert,
        level: 1,
        // initialGold: 260,
        initialGold: 4060,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths01,
        waves: STAGE_WAVES_DATA[1],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
    },
    {
        area: GameArea.Desert,
        level: 2,
        initialGold: 270,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths00,
        waves: STAGE_WAVES_DATA[2],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
    },
    {
        area: GameArea.Desert,
        level: 3,
        initialGold: 280,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths01,
        waves: STAGE_WAVES_DATA[3],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
    },
    {
        area: GameArea.Forest,
        level: 4,
        initialGold: 320,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[4],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 5,
        initialGold: 340,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[5],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 6,
        // initialGold: 360,
        initialGold: 3800,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[6],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 7,
        // initialGold: 380,
        initialGold: 3800,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[7],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Winter,
        level: 8,
        initialGold: 400,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 9,
        initialGold: 420,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 10,
        initialGold: 440,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 11,
        initialGold: 460,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Lava,
        level: 12,
        initialGold: 480,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 13,
        initialGold: 500,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 14,
        initialGold: 520,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 15,
        initialGold: 550,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
];

printWavesStatistics(ENEMY_BLUEPRINTS);
