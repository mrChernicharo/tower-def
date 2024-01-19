/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, GameArea } from "./enums";
import { GameLevel } from "./types";
import { winterLevelPath } from "./paths/winter/paths";
import { lavaLevelPaths } from "./paths/lava/paths";
import { desertLevelPath } from "./paths/desert/paths";
import { forestLevelPaths } from "./paths/forest/paths";

export const mapURLs = {
    desert: "/assets/glb/levels/lv1.desert-level.glb",
    forest: "/assets/glb/levels/lv2.forest-level.glb",
    winter: "/assets/glb/levels/lv3.winter-level.glb",
    lava: "/assets/glb/levels/lv4.lava-level.glb",
};

const towerBasePositions = {
    desert: [
        [-4.239693641662598, 0.1, -32],
        [-10.030718803405762, 0.1, 9.045719146728516],
        [-14.679625511169434, 0.1, 8.63398265838623],
        [-15.787954330444336, 0.1, 3.8990440368652344],
        [-10.658951759338379, 0.1, 3.6790854930877686],
        [-4.939311981201172, 0.1, -25.139816284179688],
        [-12.067779541015625, 0.1, -25.139816284179688],
        [-11.546309471130371, 0.1, -31.42244529724121],
        [14.094917297363281, 0.1, 20.26247787475586],
        [8.918469429016113, 0.1, 20.561803817749023],
        [9.130585670471191, 0.1, 26.90176010131836],
        [14.723150253295898, 0.1, 26.308197021484375],
        [13.216029167175293, 0.1, 33.36888122558594],
        [7.623464584350586, 0.1, 33.96244812011719],
        [-5.406293869018555, 0.1, 9.045719146728516],
        [-11.051060676574707, 0.1, -18.505279541015625],
        [-8.77873706817627, 0.1, -4.2777299880981445],
        [5.645008087158203, 0.1, 12.768688201904297],
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
        [-23.01464080810547, 0.3, -34.86179733276367],
        [-19.42210578918457, 0.3, -33.057193756103516],
        [3.03891658782959, 0.3, -41.71015548706055],
        [12.669759750366211, 0.3, 5.26015567779541],
        [21.851736068725586, 0.3, -34.869293212890625],
        [21.62307357788086, 0.3, -25.5587100982666],
        [28.83831787109375, 0.3, -28.39833641052246],
        [25.587474822998047, 0.3, -12.408538818359375],
        [22.06781005859375, 0.3, -8.736695289611816],
        [22.750030517578125, 0.3, -16.384763717651367],
        [-7.9996442794799805, 0.3, 39.601844787597656],
        [-4.146993637084961, 0.3, 42.73162841796875],
        [1.235826015472412, 0.3, 42.73162841796875],
        [21.435108184814453, 0.3, 43.52125549316406],
        [11.66355037689209, 0.3, -2.1947503089904785],
        [-16.186887741088867, 0.3, 32.19786071777344],
        [-21.5650634765625, 0.3, 23.653812408447266],
        [-28.55293083190918, 0.3, 15.219037055969238],
        [21.875337600708008, 6.485910415649414, 22.26441764831543],
        [21.875337600708008, 6.6229448318481445, 27.55340576171875],
        [21.875337600708008, 3.8913960456848145, 32.8218879699707],
        [14.459419250488281, 4.8555521965026855, 13.536456108093262],
        [-11.375808715820312, 5.825353145599365, -23.09593963623047],
        [-16.135986328125, 5.321722507476807, -22.202123641967773],
    ] as [number, number, number][],
    lava: [
        [-7.9717559814453125, 0.30000001192092896, 14.692939758300781],
        [-10.693512916564941, 0.30000001192092896, -26.959732055664062],
        [-8.4456787109375, 0.30000001192092896, -0.522979736328125],
        [-0.5159873962402344, 0.30000001192092896, -26.063919067382812],
        [-5.448331832885742, 0.30000001192092896, -18.18609619140625],
        [-5.110391616821289, 0.30000001192092896, -11.77816390991211],
        [-4.4046173095703125, 0.30000001192092896, 24.684951782226562],
        [-9.512611389160156, 0.30000001192092896, 6.874664306640625],
        [-1.3322467803955078, 0.30000001192092896, -1.8963775634765625],
        [-1.0214557647705078, 0.30000001192092896, 15.341323852539062],
        [6.30039119720459, 0.30000001192092896, 14.46826171875],
        [7.553034782409668, 0.30000001192092896, 6.8575439453125],
        [6.064409255981445, 0.30000001192092896, -1.31390380859375],
        [6.050017356872559, 0.30000001192092896, -11.656843185424805],
        [6.0035505294799805, 0.30000001192092896, -18.754493713378906],
        [11.484609603881836, 0.30000001192092896, -26.89056396484375],
        [5.920717239379883, 0.30000001192092896, 24.551246643066406],
        [-18.172679901123047, 0.30000001192092896, -0.7079014778137207],
        [16.111492156982422, 0.30000001192092896, -0.7079014778137207],
    ] as [number, number, number][],
};

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
        [...waveSegment(EnemyChar.Spider, 1.4, 30, 0, 0), ...waveSegment(EnemyChar.Bee, 6, 6, 0, 2)],
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
        towerBasePositions: towerBasePositions.desert,
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
        towerBasePositions: towerBasePositions.desert,
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
        towerBasePositions: towerBasePositions.desert,
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
        towerBasePositions: towerBasePositions.desert,
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
        initialGold: 360,
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
        paths: [winterLevelPath],
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
        paths: [winterLevelPath],
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
        paths: [winterLevelPath],
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
        paths: [winterLevelPath],
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
