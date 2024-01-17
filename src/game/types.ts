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
    cameraBounds: { left: number; right: number; top: number; bottom: number };
};
