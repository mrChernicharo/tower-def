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

import { EnemyChar } from "../../enums";
import { waveSegment } from "../../helpers";
import { WaveEnemy } from "../../types";

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
            ...waveSegment(EnemyChar.Runner, 6, 4, 0, 0),
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
            ...waveSegment(EnemyChar.Runner, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Runner, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 30, 1),
            ...waveSegment(EnemyChar.Wizard, 4, 5, 4, 0),
            ...waveSegment(EnemyChar.Orc, 4, 4, 2, 2),
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
        // count, interval, spawn_at, path
        // wave 1
        [
            ...waveSegment(EnemyChar.Runner, 2, 1, 0, 0),
            ...waveSegment(EnemyChar.Runner, 2, 1, 7, 2),
            ...waveSegment(EnemyChar.Runner, 2, 1, 14, 0),
            ...waveSegment(EnemyChar.Runner, 2, 1, 21, 2),
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
            ...waveSegment(EnemyChar.Runner, 3, 1, 0, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 10, 1),
            ...waveSegment(EnemyChar.Runner, 3, 1, 20, 3),
            ...waveSegment(EnemyChar.Runner, 3, 1, 30, 1),
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
];
