import { EnemyType, TowerName } from "./enums";

export type EnemyBluePrint = {
    name: EnemyType;
    modelURL: string;
    modelScale: number;
    walkAnimationName: string;
    speed: number;
    maxHp: number;
};

export type TowerBluePrint = {
    name: TowerName;
    level: number;
    modelURL: string;
    modelScale: number;
    color: string;
    fireRate: number; // shots/s
    damage: [number, number]; // min - max
    range: number;
    price: number;
    skills?: unknown[];
};
