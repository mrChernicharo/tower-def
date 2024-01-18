import { EnemyChar, GameArea } from "./enums";
import { GameLevel } from "./types";
import { mapURLs } from "./constants";
import { winterLevelPath } from "./paths/winter/paths";
import { lavaLevelPaths } from "./paths/lava/paths";
import { desertLevelPath } from "./paths/desert/paths";
import { forestLevelPaths } from "./paths/forest/paths";

// enemyChar, pathIdx, spawnAt, xOffset
export const STAGE_WAVES_DATA: [string, number, number, number][][][] = [
    /****************************************************/
    /********************** DESERT **********************/
    /****************************************************/
    // stage 01
    [
        // wave 1
        waveSegment(EnemyChar.Bee, 1),
        // wave 2
        waveSegment(EnemyChar.Orc, 3, 8),
        // wave 3
        waveSegment(EnemyChar.Dino, 3, 8),
    ],

    // stage 02
    [
        // wave 1
        waveSegment(EnemyChar.Squidle, 2),
        // wave 2
        waveSegment(EnemyChar.Alien, 3, 8),
        // wave 3
        waveSegment(EnemyChar.Demon, 3, 8),
    ],

    // stage 03
    [
        // wave 1
        waveSegment(EnemyChar.Ghost, 2),
        // wave 1
        waveSegment(EnemyChar.Wizard, 4),
        // wave 3
        waveSegment(EnemyChar.Tribal, 3, 8),
        // wave 4
        waveSegment(EnemyChar.Elf, 3, 8),
    ],

    // stage 04
    [
        // wave 1
        waveSegment(EnemyChar.Ninja, 3, 6),
        // wave 2
        waveSegment(EnemyChar.Dragon, 5, 3),
        // wave 3
        waveSegment(EnemyChar.Elf, 3, 8),
        // wave 4
        [
            ...waveSegment(EnemyChar.Spider, 1),
            ...waveSegment(EnemyChar.Orc, 4, 5),
            ...waveSegment(EnemyChar.Spider, 1, 10, 20),
        ],
    ],

    /****************************************************/
    /********************** FOREST **********************/
    /****************************************************/

    // stage 05 - FOREST
    [
        // wave 1
        [...waveSegment(EnemyChar.Ninja, 4, 8)],
        // wave 2
        [...waveSegment(EnemyChar.Spider, 3, 13, 0, 0), ...waveSegment(EnemyChar.Spider, 3, 11, 6, 2)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Spider, 3, 13, 0, 1),
            ...waveSegment(EnemyChar.Bee, 3, 11, 8, 3),
            ...waveSegment(EnemyChar.Spider, 3, 11, 16, 0),
            ...waveSegment(EnemyChar.Spider, 3, 11, 24, 2),
            ...waveSegment(EnemyChar.Ninja, 4, 8, 6, 3),
        ],
    ],

    // stage 06 - FOREST
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1.4, 30, 0, 3),
        // wave 2
        [...waveSegment(EnemyChar.Tribal, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 8, 2, 0, 2, []),
            ...waveSegment(EnemyChar.Orc, 8, 2, 6, 0, []),
            ...waveSegment(EnemyChar.Orc, 8, 2, 12, 3),
            ...waveSegment(EnemyChar.Orc, 8, 2, 18, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 8, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],

    // stage 07 - FOREST
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1.4, 30, 0, 3),
        // wave 2
        [...waveSegment(EnemyChar.Tribal, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 8, 2, 0, 2, []),
            ...waveSegment(EnemyChar.Orc, 8, 2, 6, 0, []),
            ...waveSegment(EnemyChar.Orc, 8, 2, 12, 3),
            ...waveSegment(EnemyChar.Orc, 8, 2, 18, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 8, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],
    // stage 08 - FOREST
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 0, 2),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 28, 1),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 28, 3),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Tribal, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 8, 3, 0, 1, []),
            ...waveSegment(EnemyChar.Orc, 8, 3, 6, 1, []),
            ...waveSegment(EnemyChar.Orc, 8, 3, 12, 2),
            ...waveSegment(EnemyChar.Wizard, 8, 3, 18, 3),
            ...waveSegment(EnemyChar.Spider, 2, 10, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 10, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 10, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 10, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],

    /****************************************************/
    /********************** WINTER **********************/
    /****************************************************/

    // stage 09
    [
        // wave 1
        waveSegment(EnemyChar.Alien),
        // wave 2
        waveSegment(EnemyChar.Orc, 2),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 10
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 11
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Demon, 2),
        //     ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 12
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
    ],

    /****************************************************/
    /*********************** LAVA ***********************/
    /****************************************************/

    // stage 13
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        [...waveSegment(EnemyChar.Orc, 2), ...waveSegment(EnemyChar.Spider, 1.6, 20, 10)],
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 14
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 15
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 16
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
        [...waveSegment(EnemyChar.Orc, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
    ],
];

const smallBounds = {
    left: -15,
    right: 15,
    top: -5,
    bottom: 85,
};
const mediumBounds = {
    left: -20,
    right: 20,
    top: 0,
    bottom: 80,
};
const largeBounds = {
    left: -30,
    right: 30,
    top: 0,
    bottom: 110,
};

export const GAME_LEVELS: GameLevel[] = [
    {
        area: GameArea.Desert,
        level: 0,
        initialGold: 250,
        mapURL: mapURLs.desert,
        paths: [desertLevelPath],
        waves: STAGE_WAVES_DATA[0],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
    },
    {
        area: GameArea.Desert,
        level: 1,
        initialGold: 260,
        mapURL: mapURLs.desert,
        paths: [desertLevelPath],
        waves: STAGE_WAVES_DATA[1],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
    },
    {
        area: GameArea.Desert,
        level: 2,
        initialGold: 270,
        mapURL: mapURLs.desert,
        paths: [desertLevelPath],
        waves: STAGE_WAVES_DATA[2],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
    },
    {
        area: GameArea.Desert,
        level: 3,
        initialGold: 280,
        mapURL: mapURLs.desert,
        paths: [desertLevelPath],
        waves: STAGE_WAVES_DATA[3],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
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
    },
    {
        area: GameArea.Forest,
        level: 6,
        initialGold: 360,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[6],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
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
    },
    {
        area: GameArea.Winter,
        level: 8,
        initialGold: 400,
        mapURL: mapURLs.winter,
        paths: [winterLevelPath],
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 9,
        initialGold: 420,
        mapURL: mapURLs.winter,
        paths: [winterLevelPath],
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 10,
        initialGold: 440,
        mapURL: mapURLs.winter,
        paths: [winterLevelPath],
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 11,
        initialGold: 460,
        mapURL: mapURLs.winter,
        paths: [winterLevelPath],
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Lava,
        level: 12,
        initialGold: 480,
        mapURL: mapURLs.forest,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 13,
        initialGold: 500,
        mapURL: mapURLs.forest,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 14,
        initialGold: 520,
        mapURL: mapURLs.forest,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 15,
        initialGold: 550,
        mapURL: mapURLs.forest,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
];

function waveSegment(
    e: EnemyChar,
    interval = 2,
    enemyCount = 10,
    startSpawningAt = 0,
    pathIdx = 0,
    xOffList = [0]
): [EnemyChar, number, number, number][] {
    // console.log("waveSegment", { e, enemyCount, interval, startSpawningAt, xOffList });

    return Array.from({ length: enemyCount }, (_, index) => [
        e,
        pathIdx,
        index * interval + startSpawningAt,
        xOffList[index % xOffList.length],
    ]);
}
