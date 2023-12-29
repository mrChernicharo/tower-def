import { EnemyType, TowerType, TrajectoryType } from "./enums";

export type EnemyBluePrint = {
    name: EnemyType;
    modelURL: string;
    modelScale: number;
    walkAnimationName: string;
    speed: number;
    maxHp: number;
};

export type TowerBluePrint = {
    name: TowerType;
    level: number;
    color: string;
    fireRate: number; // shots/s
    damage: [number, number]; // min - max
    range: number;
    price: number;
    skills?: unknown[];
};

export type ProjectileBluePrint = {
    type: TowerType;
    level: number;
    trajectoryType: TrajectoryType;
    speed: number;
    modelScale: number;
    maxHeight?: number;
};
