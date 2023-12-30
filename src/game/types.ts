import { ParabolaProjectile, StraightProjectile } from "./Projectile";
import { EnemyType, TargetingStrategy, TowerType, TrajectoryType } from "./enums";

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
    explosionIntensity: number;
    maxHeight?: number;
};

export type Projectile = ParabolaProjectile | StraightProjectile;
