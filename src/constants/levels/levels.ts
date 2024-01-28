/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { GameArea } from "../../shared/enums";
import { GameLevel } from "../../shared/types";
import { STAGE_WAVES_DATA } from "./waves";
import { towerBasePositions } from "./tower-positions";
import { desert01, desert02 } from "../paths/desert-paths";
import { forest01, forest02 } from "../paths/forest-paths";
import { winter01, winter02 } from "../paths/winter-paths";
import { lava01, lava02 } from "../paths/lava-paths";

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

//
const smallBounds = { left: -15, right: 15, top: -5, bottom: 85 };
const mediumBounds = { left: -20, right: 20, top: 0, bottom: 80 };
const largeBounds = { left: -30, right: 30, top: 0, bottom: 110 };

export const GAME_LEVELS: GameLevel[] = [
    {
        area: GameArea.Desert,
        levelIdx: 0,
        stage: 1,
        initialGold: 1000,
        // initialGold: 250,
        ground: [[50, 0, 80]],
        waves: STAGE_WAVES_DATA[0],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
        paths: {
            center: desert01.center,
            left: desert01.left,
            right: desert01.right,
        },
    },
    {
        area: GameArea.Desert,
        levelIdx: 1,
        stage: 2,
        initialGold: 1060,
        ground: [[50, 0, 80]],
        waves: STAGE_WAVES_DATA[1],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
        paths: {
            center: desert02.center,
            left: desert02.left,
            right: desert02.right,
        },
    },
    {
        area: GameArea.Desert,
        levelIdx: 2,
        stage: 3,
        initialGold: 270,
        ground: [[50, 0, 80]],
        waves: STAGE_WAVES_DATA[2],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
        paths: {
            center: desert01.center,
            left: desert01.left,
            right: desert01.right,
        },
    },
    {
        area: GameArea.Desert,
        levelIdx: 3,
        stage: 4,
        initialGold: 280,
        ground: [[50, 0, 80]],
        waves: STAGE_WAVES_DATA[3],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
        paths: {
            center: desert02.center,
            left: desert02.left,
            right: desert02.right,
        },
    },
    {
        area: GameArea.Forest,
        levelIdx: 4,
        stage: 5,
        initialGold: 12320,
        // initialGold: 320,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[4],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
        paths: {
            center: forest01.center,
            left: forest01.left,
            right: forest01.right,
        },
    },
    {
        area: GameArea.Forest,
        levelIdx: 5,
        stage: 6,
        initialGold: 340,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[5],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest2,
        paths: {
            center: forest02.center,
            left: forest02.left,
            right: forest02.right,
        },
    },
    {
        area: GameArea.Forest,
        levelIdx: 6,
        stage: 7,
        // initialGold: 400,
        initialGold: 3800,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[6],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
        paths: {
            center: forest01.center,
            left: forest01.left,
            right: forest01.right,
        },
    },
    {
        area: GameArea.Forest,
        levelIdx: 7,
        stage: 8,
        // initialGold: 400,
        initialGold: 3800,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[7],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest2,
        paths: {
            center: forest02.center,
            left: forest02.left,
            right: forest02.right,
        },
    },
    {
        area: GameArea.Winter,
        levelIdx: 8,
        stage: 9,
        initialGold: 400,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
        paths: {
            center: winter01.center,
            left: winter01.left,
            right: winter01.right,
        },
    },
    {
        area: GameArea.Winter,
        levelIdx: 9,
        stage: 10,
        initialGold: 420,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter2,
        paths: {
            center: winter02.center,
            left: winter02.left,
            right: winter02.right,
        },
    },
    {
        area: GameArea.Winter,
        levelIdx: 10,
        stage: 11,
        initialGold: 440,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
        paths: {
            center: winter01.center,
            left: winter01.left,
            right: winter01.right,
        },
    },
    {
        area: GameArea.Winter,
        levelIdx: 11,
        stage: 12,
        initialGold: 460,
        ground: [[40, 0, 60]],
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter2,
        paths: {
            center: winter02.center,
            left: winter02.left,
            right: winter02.right,
        },
    },
    {
        area: GameArea.Lava,
        levelIdx: 12,
        stage: 13,
        initialGold: 480,
        ground: [[60, 0, 70]],
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
    {
        area: GameArea.Lava,
        levelIdx: 13,
        stage: 14,
        initialGold: 500,
        ground: [[50, 0, 75]],
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava2,
        paths: {
            center: lava02.center,
            left: lava02.left,
            right: lava02.right,
        },
    },
    {
        area: GameArea.Lava,
        levelIdx: 14,
        stage: 15,
        initialGold: 520,
        ground: [[60, 0, 70]],
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
    {
        area: GameArea.Lava,
        levelIdx: 15,
        stage: 16,
        initialGold: 550,
        ground: [[50, 0, 75]],
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava2,
        paths: {
            center: lava02.center,
            left: lava02.left,
            right: lava02.right,
        },
    },
];
