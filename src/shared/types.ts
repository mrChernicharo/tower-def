import { ParabolaProjectile, StraightProjectile } from "../game/Projectile";
import { defaultPlayerSkills } from "../constants/general";
import { EnemyType, GameArea, SkillEffectName, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";

export type EnemyBluePrint = {
    name: EnemyType;
    modelURL: string;
    modelScale: number;
    walkAnimationName: string;
    speed: number;
    maxHp: number;
    reward: number;
};

export type TowerBluePrint = {
    name: TowerType;
    level: number;
    color: string;
    fireRate: number; // shots/s
    damage: [number, number]; // min - max
    range: number;
    price: number;
    defaultStrategy: TargetingStrategy;
    modelScale: number;
    firePointY: number;
    specials?: unknown[];
    // modelURL?: string;
};

export type ProjectileBluePrint = {
    type: TowerType;
    level: number;
    trajectoryType: TrajectoryType;
    color: string;
    speed: number;
    modelScale: number;
    explosionColor: string;
    explosionRadius: number;
    maxHeight?: number;
};

export type Projectile = ParabolaProjectile | StraightProjectile;

// type, path, spawnAt, lane
export type WaveEnemy = [string, number, number, LaneChar];

export type WaveEnemyObj = {
    enemyType: EnemyType;
    pathIdx: number;
    spawnAt: number;
    lane: LaneChar;
};

export type LevelStarCount = 0 | 1 | 2 | 3;
export type LevelStarMap = LevelStarCount[];

export type PlayerSkills = { [k in SkillPath]: Skill[] };

export type PlayerSkillIDsMap = {
    "archer-1": boolean;
    "archer-2": boolean;
    "archer-3": boolean;
    "archer-4": boolean;
    "archer-5": boolean;
    "ballista-1": boolean;
    "ballista-2": boolean;
    "ballista-3": boolean;
    "ballista-4": boolean;
    "ballista-5": boolean;
    "cannon-1": boolean;
    "cannon-2": boolean;
    "cannon-3": boolean;
    "cannon-4": boolean;
    "cannon-5": boolean;
    "poison-1": boolean;
    "poison-2": boolean;
    "poison-3": boolean;
    "poison-4": boolean;
    "poison-5": boolean;
    "wizard-1": boolean;
    "wizard-2": boolean;
    "wizard-3": boolean;
    "wizard-4": boolean;
    "wizard-5": boolean;
    "meteor-1": boolean;
    "meteor-2": boolean;
    "meteor-3": boolean;
    "meteor-4": boolean;
    "meteor-5": boolean;
    "blizzard-1": boolean;
    "blizzard-2": boolean;
    "blizzard-3": boolean;
    "blizzard-4": boolean;
    "blizzard-5": boolean;
};

export type Skill = {
    id: keyof PlayerSkillIDsMap;
    name: string;
    description: string;
    starCost: number;
    effectStr: string;
    effect: Partial<Record<SkillEffectName, SkillEffect>>;
};

export type SkillEffect = { value: number; unit: string };

export type GameInitProps = {
    level: number;
    hp: number;
    skills: Partial<PlayerSkillIDsMap>;
    // area: string;
    // gold: number;
    // skills: Skill[];
};

export type GlobalPlayerStats = {
    hp: number;
    gold: number;
    stars: LevelStarMap;
    skills: PlayerSkillIDsMap;
};

export type GameSpeed = 1 | 2 | 4;

export type SkillId = keyof typeof defaultPlayerSkills;

export type JSONPath = {
    points: {
        x: number;
        y: number;
        z: number;
    }[];
    closed: boolean;
};

export type GameLevel = {
    area: GameArea;
    stage: number;
    levelIdx: number;
    initialGold: number;
    ground: [number, number, number][];
    waves: [string, number, number, string][][];
    paths: {
        center: JSONPath[];
        left: JSONPath[];
        right: JSONPath[];
    };
    initialCamPos: [number, number, number];
    cameraBounds: { left: number; right: number; top: number; bottom: number };
    towerBasePositions: [number, number, number][];
};

export type LevelObject = {
    name: string;
    url: string;
    instances: {
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
    }[];
};

export type LaneChar = "c" | "l" | "r";

export enum FormationType {
    "Diamond",
    "DiamondFull",
    "Square",
    // "2Rows",
    // "3Rows",
    // "Shell",
}
/*

Diamond
    *
*       *
    *

DiamondFull
    *
*   *   *
    *
Diamond | DiamondFull
    *   
*   X   *
    *   


Square
*   *   *
*       *
*   *   *   

*   *   *
*   X   *
*   *   *


2Rows
*       * 
*       * 
*       * 

*       * 
*   X   * 
*       * 


3Rows
*   *   *
*   *   *
*   *   *   

*   *   *
*   X   *
*   *   *   


Shell
    *
*       *
*   X   *
*       *
    *


*/

// ['dm', 0, 24, 'c'],
// ['dn', 0, 26.5, 'l'],
//  ['dn', 0, 29.5, 'l'],
// ['dn', 0, 26, 'r'],
// ['dn', 0, 29, 'r'],
// ['dm', 1, 0, 'c'],
// ['dm', 1, 15, 'c'],
// ['dm', 1, 30, 'c'],
// ['s', 1, 6, 'r'],
//  ['s', 1, 7.5, 'l'],
// ['s', 1, 9, 'r']
