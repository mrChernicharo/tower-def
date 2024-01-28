/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * desert:
 * - dino, squidle, bee, ninja
 *
 * forest
 * - runner, wizard, orc, tribal, bee
 *
 * winter
 * - alien, ninja, orc, wizard, ghost
 *
 * lava
 * - demon, , dino, tribal, dragon, squidle, demonBoss
 */

import { EnemyChar } from "../../shared/enums";
import { getEnemyTypeFromChar } from "../../shared/helpers";
import { WaveEnemy, FormationType, LaneChar } from "../../shared/types";
import { ENEMY_BLUEPRINTS } from "../enemies";

// enemyChar, pathIdx, spawnAt, xOffset
export const STAGE_WAVES_DATA: WaveEnemy[][][] = [
    /****************************************************/
    /********************** DESERT **********************/
    /****************************************************/
    // stage 01
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Runner, 3, 3, 0, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 3, 3, 1, 0, "r"),
            // ...waveSegment(EnemyChar.Dino, 6, 6, 0, 0),
            ...waveSegment(EnemyChar.Runner, 3, 3, 16, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 3, 3, 16, 0, "r"),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Dino, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 5, 5, 10, 0)],
    ],

    // stage 02
    [
        // wave 1
        [...waveSegment(EnemyChar.Dino, 3, 6, 0, 2), ...waveSegment(EnemyChar.Bee, 5, 3, 0, 0)],
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
        // [
        //     ...waveSegment(EnemyChar.Ninja, 5, 5, 2.5, 1),
        //     ...waveSegment(EnemyChar.Dino, 8, 5, 0, 2),
        //     ...waveSegment(EnemyChar.Bee, 2, 1, 0, 0),
        //     ...waveSegment(EnemyChar.Bee, 2, 1, 4, 3),
        //     ...waveSegment(EnemyChar.Bee, 2, 1, 8, 0),
        //     ...waveSegment(EnemyChar.Bee, 2, 1, 12, 3),
        // ],
        [...enemyFormations(FormationType.Square, 0, 3, EnemyChar.Orc)],
    ],

    /****************************************************/
    /********************** FOREST **********************/
    /****************************************************/

    // stage 05 - FOREST
    [
        // // wave 1
        [
            ...enemyFormations(FormationType.Diamond, 0, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Diamond, 6, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Diamond, 12, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Diamond, 6, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Diamond, 12, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Diamond, 18, 2, EnemyChar.Wizard),
        ],
        // wave 2
        [
            ...enemyFormations(FormationType.DiamondFull, 0, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.DiamondFull, 6, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.DiamondFull, 12, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.DiamondFull, 6, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.DiamondFull, 12, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.DiamondFull, 18, 2, EnemyChar.Wizard),
        ],
        // wave 3
        [
            ...enemyFormations(FormationType.Square, 0, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Square, 6, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Square, 12, 0, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Square, 6, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Square, 12, 2, EnemyChar.Wizard),
            ...enemyFormations(FormationType.Square, 18, 2, EnemyChar.Wizard),
        ],
    ],

    // stage 06 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Runner, 3, 1, 0, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 3, 1, 7, 0, "r"),
            ...waveSegment(EnemyChar.Runner, 3, 1, 14, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 3, 1, 21, 0, "r"),
            ...waveSegment(EnemyChar.Wizard, 2, 6, 6, 1),
            ...waveSegment(EnemyChar.Ghost, 2, 6, 3, 1),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Ghost, 5, 6, 0, 1), ...waveSegment(EnemyChar.Tribal, 3, 10, 2, 0)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Runner, 3, 1, 0, 0),
            ...waveSegment(EnemyChar.Runner, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Runner, 3, 1, 20, 0),
            ...waveSegment(EnemyChar.Runner, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Tribal, 4, 6, 6, 1),
        ],
    ],

    // stage 07 - FOREST
    [
        // wave 1
        [
            ...enemyFormations(FormationType.Diamond, 0, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Diamond, 6, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Diamond, 12, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Diamond, 6, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Diamond, 12, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Diamond, 18, 2, EnemyChar.Runner, EnemyChar.Tribal),
        ],
        // wave 2
        [
            ...enemyFormations(FormationType.DiamondFull, 0, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.DiamondFull, 6, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.DiamondFull, 12, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.DiamondFull, 6, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.DiamondFull, 12, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.DiamondFull, 18, 2, EnemyChar.Runner, EnemyChar.Tribal),
        ],
        // wave 3
        [
            ...enemyFormations(FormationType.Square, 0, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Square, 6, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Square, 12, 0, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Square, 6, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Square, 12, 2, EnemyChar.Runner, EnemyChar.Tribal),
            ...enemyFormations(FormationType.Square, 18, 2, EnemyChar.Runner, EnemyChar.Tribal),
        ],
    ],
    // stage 08 - FOREST
    [
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Runner, 2, 1, 0, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 2, 1, 0, 0, "r"),

            ...waveSegment(EnemyChar.Runner, 2, 1, 7, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 2, 1, 7, 0, "r"),

            ...waveSegment(EnemyChar.Runner, 2, 1, 14, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 2, 1, 14, 0, "r"),

            ...waveSegment(EnemyChar.Runner, 2, 1, 21, 0, "l"),
            ...waveSegment(EnemyChar.Runner, 2, 1, 21, 0, "r"),

            // ...waveSegment(EnemyChar.Runner, 2, 1, 0, 0),
            // ...waveSegment(EnemyChar.Runner, 2, 1, 7, 2),
            // ...waveSegment(EnemyChar.Runner, 2, 1, 14, 0),
            // ...waveSegment(EnemyChar.Runner, 2, 1, 21, 2),
            // ...waveSegment(EnemyChar.Wizard, 2, 6, 6, 0),
            // ...waveSegment(EnemyChar.Ghost, 2, 6, 3, 2),
            // ...waveSegment(EnemyChar.Orc, 4, 5, 13, 1),
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
            ...waveSegment(EnemyChar.Runner, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Runner, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 30, 1),
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
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 0, 1),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 5, 1),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 10, 1),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 15, 1),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 20, 1),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Runner, 30, 2, 0, 1)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Runner, 30, 2, 0, 0),
        ],
    ],
    // stage 11
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Orc, 7, 6, 0, 0),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 5, 2),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 15, 2),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 20, 2),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Orc, 8, 5, 5, 0),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 20, 2),
            ...waveSegment(EnemyChar.Ghost, 4, 5.3, 7, 1),
        ],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Runner, 35, 2, 0, 2),
            ...waveSegment(EnemyChar.Ghost, 4, 5, 0, 2),
        ],
    ],
    // stage 12
    [
        [
            ...waveSegment(EnemyChar.Orc, 6, 6, 0, 1),
            ...waveSegment(EnemyChar.Bee, 8, 4.5, 7, 1),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 0, 0),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 5, 0),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 10, 0),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 15, 0),
            ...waveSegment(EnemyChar.Runner, 4, 0.8, 20, 0),
            // ...waveSegment(EnemyChar.DemonBoss, 1, undefined, 0, 0),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Orc, 8, 5, 2, 1),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 0, 2),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 10, 2),
            ...waveSegment(EnemyChar.Runner, 10, 0.8, 20, 2),
            ...waveSegment(EnemyChar.Ghost, 6, 4, 5, 0),
        ],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 3, 1, 2, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 10, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 18, 0),
            ...waveSegment(EnemyChar.Orc, 3, 1, 24, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Runner, 35, 1.8, 0, 1),
            ...waveSegment(EnemyChar.Ghost, 4, 5, 0, 1),
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
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 6, 2, "l"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 12, 3, "r"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 18, 2, "l"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 24, 3, "r"),
        ],
    ],
    // stage 14
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Demon, 1, 0, 0, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 2.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 2, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 1, 0, 12, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 14.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 14, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 1, 0, 24, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 26.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 26, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 3, 15, 0, 1),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 1, 0, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 1, 0, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 30.5, 1, "l"),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Demon, 2, 10, 0, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 16, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 16.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 16, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 32, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 32.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 32, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 4, 15, 0, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 30.5, 1, "l"),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.DemonBoss, 1, 0, 0, 0, "r"),
            ...waveSegment(EnemyChar.Demon, 2, 10, 10, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 10.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 26, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 26.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 26, 0, "r"),

            ...waveSegment(EnemyChar.DemonBoss, 1, 0, 0, 1, "r"),
            ...waveSegment(EnemyChar.Demon, 2, 10, 42, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 42.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 42, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 4, 15, 0, 1),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 30.5, 1, "l"),
        ],
    ],
    // stage 15
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 12, 3),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 24, 3),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 6, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 12, 3),
            ...waveSegment(EnemyChar.Dragon, 2, 1, 18, 2),
            ...waveSegment(EnemyChar.Squidle, 2, 2.3, 24, 3),
        ],
        // wave 3
        [
            ...waveSegment(EnemyChar.Dino, 6, 4, 0, 0),
            ...waveSegment(EnemyChar.Demon, 6, 4, 8, 1),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 6, 2, "l"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 12, 3, "r"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 18, 2, "l"),
            ...waveSegment(EnemyChar.Dragon, 2, 5, 24, 3, "r"),
        ],
    ],
    // stage 16
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Demon, 1, 0, 0, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 2.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 2, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 1, 0, 12, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 14.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 14, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 1, 0, 24, 0),
            ...waveSegment(EnemyChar.Dino, 2, 3, 26.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 2, 3, 26, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 3, 15, 0, 1),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 1, 0, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 1, 0, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 1, 0, 30.5, 1, "l"),
        ],
        // wave 2
        [
            ...waveSegment(EnemyChar.Demon, 2, 10, 0, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 16, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 16.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 16, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 32, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 32.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 32, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 4, 15, 0, 1),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 30.5, 1, "l"),
        ],

        // wave 3
        [
            ...enemyFormations(FormationType.Diamond, 0, 0, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 10, 0, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 20, 0, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 30, 0, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 40, 0, EnemyChar.Runner),
            ...waveSegment(EnemyChar.Squidle, 12, 4, 4, 0, "l"),
            ...waveSegment(EnemyChar.Squidle, 12, 4, 0, 0, "r"),

            ...enemyFormations(FormationType.Diamond, 0, 1, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 10, 1, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 20, 1, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 30, 1, EnemyChar.Runner),
            ...enemyFormations(FormationType.Diamond, 40, 1, EnemyChar.Runner),
            ...waveSegment(EnemyChar.Squidle, 12, 4, 4, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 12, 4, 0, 1, "r"),
        ],

        // wave 4
        [
            ...waveSegment(EnemyChar.DemonBoss, 1, 0, 0, 0),
            ...waveSegment(EnemyChar.Demon, 2, 10, 10, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 10.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 0, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 2, 10, 26, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 26.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 26, 0, "r"),

            ...waveSegment(EnemyChar.DemonBoss, 1, 0, 0, 1),
            ...waveSegment(EnemyChar.Demon, 2, 10, 42, 0),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 42.5, 0, "l"),
            ...waveSegment(EnemyChar.Dino, 4, 1.5, 42, 0, "r"),

            ...waveSegment(EnemyChar.Demon, 4, 15, 0, 1),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 6, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 7.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 9, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 10.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 16, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 17.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 19, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 20.5, 1, "l"),

            ...waveSegment(EnemyChar.Squidle, 2, 5, 26, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 27.5, 1, "l"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 29, 1, "r"),
            ...waveSegment(EnemyChar.Squidle, 2, 5, 30.5, 1, "l"),
        ],
    ],
];

export function waveSegment(
    e: EnemyChar,
    enemyCount = 4,
    interval = 2,
    startSpawningAt = 0,
    pathIdx = 0,
    lane: LaneChar = "c"
): [EnemyChar, number, number, LaneChar][] {
    // console.log("waveSegment", { e, enemyCount, interval, startSpawningAt, xOffList });

    return Array.from({ length: enemyCount }, (_, index) => [e, pathIdx, index * interval + startSpawningAt, lane]);
}

export function getWaveStats(
    paths: THREE.CatmullRomCurve3[],
    wave: WaveEnemy[],
    enemyBlueprints: typeof ENEMY_BLUEPRINTS
) {
    // console.log(wave);
    let highestSpawnAt = -Infinity;
    let totalDmg = 0;
    let maxDuration = -Infinity;

    for (const e of wave) {
        const [eChar, pathIdx, spawnAt] = [e[0] as EnemyChar, e[1], e[2]];
        const eType = getEnemyTypeFromChar(eChar);
        const eBlueprint = enemyBlueprints[eType];
        const path = paths[pathIdx % paths.length];
        const len = path.getLength();
        const timeToComplete = len / eBlueprint.speed;

        // console.log({ len, timeToComplete, eType });

        totalDmg += eBlueprint.maxHp;
        if (spawnAt > highestSpawnAt) highestSpawnAt = spawnAt;
        if (timeToComplete > maxDuration) maxDuration = spawnAt + timeToComplete;
    }

    return { totalDmg, maxDuration, highestSpawnAt };
}

export function printWavesStatistics(paths: THREE.CatmullRomCurve3[], enemyBlueprints: typeof ENEMY_BLUEPRINTS) {
    const res: any[] = [[0]];
    STAGE_WAVES_DATA.forEach((stage) => {
        const waves: any[] = [];
        stage.forEach((wave) => {
            const { totalDmg, maxDuration } = getWaveStats(paths, wave, enemyBlueprints);
            waves.push(`${totalDmg}-${maxDuration.toFixed(0)}`);
        });
        res.push(waves);
    });

    console.table(res);
}

export function enemyFormations(
    formationType: FormationType,
    spawnAt: number,
    pathIdx: number,
    enemy: EnemyChar,
    eliteEnemy?: EnemyChar
): WaveEnemy[] {
    const enemyType = getEnemyTypeFromChar(enemy);
    const eSpeed = ENEMY_BLUEPRINTS[enemyType].speed;

    let unit = 1;
    if (eSpeed === 1) {
        unit = 2;
    } else if (eSpeed === 1.5) {
        unit = 1.5;
    } else if (eSpeed === 2) {
        unit = 1;
    } else if (eSpeed === 3) {
        unit = 0.75;
    } else if (eSpeed === 4) {
        unit = 0.5;
    }
    // console.log({ eSpeed, unit });

    switch (formationType) {
        case FormationType.Diamond: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
            ];

            if (eliteEnemy) {
                formation.push([eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
        case FormationType.DiamondFull: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
            ];

            if (eliteEnemy) {
                formation.splice(2, 1, [eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
        case FormationType.Square: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "l"],
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt, "r"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "l"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
                [enemy, pathIdx, spawnAt + 2 * unit, "r"],
            ];

            if (eliteEnemy) {
                formation.splice(4, 1, [eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
    }
}
