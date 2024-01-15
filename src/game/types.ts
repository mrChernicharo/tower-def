import { ParabolaProjectile, StraightProjectile } from "./Projectile";
import { defaultPlayerSkills } from "./constants";
import { EnemyType, GameArea, TargetingStrategy, TowerType, TrajectoryType } from "./enums";

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
    skills?: unknown[];
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

export type WaveEnemy = {
    enemyType: EnemyType;
    pathIdx: number;
    spawnAt: number;
    xOffset: number;
};

export type LevelStarCount = 0 | 1 | 2 | 3;
export type LevelStarMap = LevelStarCount[];

export type PlayerSkills = {
    "constructor-1": boolean;
    "constructor-2": boolean;
    "constructor-3": boolean;
    "constructor-4": boolean;
    "constructor-5": boolean;
    "constructor-6": boolean;
    "merchant-1": boolean;
    "merchant-2": boolean;
    "merchant-3": boolean;
    "merchant-4": boolean;
    "merchant-5": boolean;
    "merchant-6": boolean;
    "chemist-1": boolean;
    "chemist-2": boolean;
    "chemist-3": boolean;
    "chemist-4": boolean;
    "chemist-5": boolean;
    "chemist-6": boolean;
    "blacksmith-1": boolean;
    "blacksmith-2": boolean;
    "blacksmith-3": boolean;
    "blacksmith-4": boolean;
    "blacksmith-5": boolean;
    "blacksmith-6": boolean;
};

export type Skill = {
    id: string;
    name: string;
    description: string;
    starCost: number;
};

export type GameInitProps = {
    area: string;
    level: number;
    hp: number;
    skills: Partial<PlayerSkills>;
    // gold: number;
    // skills: Skill[];
};

export type GlobalPlayerStats = {
    hp: number;
    gold: number;
    stars: LevelStarMap;
    skills: PlayerSkills;
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
    level: number;
    initialGold: number;
    mapURL: string;
    paths: JSONPath[];
    waves: [string, number, number, number][][];
    initialCamPos: [number, number, number];
};
