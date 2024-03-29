import { TowerType, TargetingStrategy, TrajectoryType } from "../shared/enums";
import { TowerBluePrint, ProjectileBluePrint } from "../shared/types";

export const towerModelsURLs = {
    [TowerType.Archer]: [
        // "/assets/glb/towers/scene (12).gltf",
        "/assets/glb/towers/Archer_Tower_lv1.gltf",
        "/assets/glb/towers/Archer_Tower_lv2.gltf",
        "/assets/glb/towers/Archer_Tower_lv3.gltf",
        "/assets/glb/towers/Archer_Tower_lv4.gltf",
    ],
    [TowerType.Ballista]: [
        "/assets/glb/towers/Ballista_Tower_LVL_1.gltf",
        "/assets/glb/towers/Ballista_Tower_LVL_2.gltf",
        "/assets/glb/towers/Ballista_Tower_LVL_3.gltf",
        "/assets/glb/towers/Ballista_Tower_LVL_4.gltf",
    ],
    [TowerType.Cannon]: [
        "/assets/glb/towers/Cannon_Tower_LVL_1.gltf",
        "/assets/glb/towers/Cannon_Tower_LVL_2.gltf",
        "/assets/glb/towers/Cannon_Tower_LVL_3.gltf",
        "/assets/glb/towers/Cannon_Tower_LVL_4.gltf",
    ],
    [TowerType.Poison]: [
        "/assets/glb/towers/Poison_Tower_lv1.gltf",
        "/assets/glb/towers/Poison_Tower_lv2.gltf",
        "/assets/glb/towers/Poison_Tower_lv3.gltf",
        "/assets/glb/towers/Poison_Tower_lv4.gltf",
    ],
    [TowerType.Wizard]: [
        "/assets/glb/towers/Wizard_Tower_lv1.gltf",
        "/assets/glb/towers/Wizard_Tower_lv2.gltf",
        "/assets/glb/towers/Wizard_Tower_lv3.gltf",
        "/assets/glb/towers/Wizard_Tower_lv4.gltf",
    ],
};

export const TOWER_BLUEPRINTS: { [k in TowerType]: TowerBluePrint[] } = {
    Archer: [
        {
            name: TowerType.Archer,
            level: 1,
            color: "blue",
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 3.9,
            // firePointY: 6,
            // modelScale: 1,
            damage: [2, 5],
            fireRate: 1.2, // Fast
            range: 8, // Average
            modelScale: 0.75,
            price: 80,
        },
        {
            name: TowerType.Archer,
            level: 2,
            color: "blue",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 6.5,
            // modelScale: 1.1,
            modelScale: 0.85,
            firePointY: 4.8,
            damage: [3, 9],
            fireRate: 1.25, // Fast
            range: 9, // Average
            price: 135,
        },
        {
            name: TowerType.Archer,
            level: 3,
            color: "blue",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 7,
            // modelScale: 1.2,
            firePointY: 5.2,
            damage: [5, 13],
            fireRate: 1.3, // Very Fast
            range: 10, // Long
            modelScale: 0.95,
            price: 200,
        },
        {
            name: TowerType.Archer,
            level: 4,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "blue",
            // firePointY: 7.5,
            // modelScale: 1.3,
            firePointY: 5.5,
            modelScale: 1.05,
            damage: [8, 18],
            fireRate: 1.35, // Very Fast
            range: 11, // Long
            price: 280,
            specials: [],
        },
    ],
    Ballista: [
        {
            name: TowerType.Ballista,
            level: 1,
            color: "red",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 8,
            firePointY: 5.75,
            // modelScale: 1,
            modelScale: 0.75,
            damage: [6, 15],
            fireRate: 0.6, // Slow
            range: 12, // Long
            price: 100,
        },
        {
            name: TowerType.Ballista,
            level: 2,
            color: "red",
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6.25,
            modelScale: 0.85,
            // modelScale: 1.1,
            damage: [12, 23],
            fireRate: 0.6, // Slow
            range: 13, // Great
            price: 160,
        },
        {
            name: TowerType.Ballista,
            level: 3,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "red",
            // firePointY: 9,
            // modelScale: 1.2,
            firePointY: 6.75,
            modelScale: 0.95,
            damage: [18, 37],
            fireRate: 0.6, // Slow
            range: 14, // Excellent
            price: 220,
        },
        {
            name: TowerType.Ballista,
            level: 4,
            color: "red",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 9.5,
            firePointY: 8,
            modelScale: 1.05,
            // modelScale: 1.3,
            damage: [30, 68],
            fireRate: 0.6, // Slow
            range: 15, // Extreme
            specials: [],
            price: 300,
        },
    ],
    Cannon: [
        {
            name: TowerType.Cannon,
            level: 1,
            color: "orange",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 8,
            // modelScale: 1,
            firePointY: 5,
            modelScale: 0.75,
            damage: [10, 17],
            fireRate: 0.4, // Very Slow
            range: 9, // short
            price: 110,
        },
        {
            name: TowerType.Cannon,
            level: 2,
            color: "orange",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 8.5,
            // modelScale: 1.1,
            firePointY: 5.6,
            modelScale: 0.85,
            damage: [18, 30],
            fireRate: 0.4, // Very Slow
            range: 10, // Average
            price: 190,
        },
        {
            name: TowerType.Cannon,
            level: 3,
            color: "orange",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 9,
            // modelScale: 1.2,
            firePointY: 6.2,
            modelScale: 0.95,
            damage: [30, 50],
            fireRate: 0.4, // Very Slow
            range: 11, // Long
            price: 250,
        },
        {
            name: TowerType.Cannon,
            level: 4,
            color: "orange",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 9.5,
            // modelScale: 1.3,
            firePointY: 6.8,
            modelScale: 1.05,
            damage: [62, 106],
            fireRate: 0.4, // Very Slow
            range: 12, // Long
            price: 340,
            specials: [],
        },
    ],
    Poison: [
        {
            name: TowerType.Poison,
            level: 1,
            color: "green",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 8,
            // modelScale: 1,
            firePointY: 5.5,
            damage: [4, 8],
            fireRate: 1, // Average
            modelScale: 0.75,
            range: 9, // Short
            price: 100,
        },
        {
            name: TowerType.Poison,
            level: 2,
            color: "green",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 8.5,
            // modelScale: 1.1,
            firePointY: 5.6,
            modelScale: 0.85,
            damage: [10, 21],
            fireRate: 1, // Average
            range: 10,
            price: 160,
        },
        {
            name: TowerType.Poison,
            level: 3,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "green",
            // firePointY: 9,
            // modelScale: 1.2,
            firePointY: 6.3,
            modelScale: 0.95,
            damage: [16, 33],
            fireRate: 1, // Average
            range: 11,
            price: 220,
        },
        {
            name: TowerType.Poison,
            level: 4,
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 10,
            // modelScale: 1.3,
            firePointY: 7,
            modelScale: 1.05,
            color: "green",
            damage: [27, 48],
            fireRate: 1, // Average
            range: 12,
            price: 300,
            specials: [],
        },
    ],
    Wizard: [
        {
            name: TowerType.Wizard,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "purple",
            // firePointY: 9.5,
            // modelScale: 1,
            firePointY: 7.5,
            modelScale: 0.75,
            damage: [8, 12],
            fireRate: 0.8, // Average
            range: 9, // Short
            price: 100,
        },
        {
            name: TowerType.Wizard,
            level: 2,
            color: "purple",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 11,
            // modelScale: 1.1,
            firePointY: 9,
            modelScale: 0.85,
            damage: [18, 30],
            fireRate: 0.8, // Average
            range: 10, // Average
            price: 160,
        },
        {
            name: TowerType.Wizard,
            level: 3,
            color: "purple",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 12,
            // modelScale: 1.2,
            firePointY: 10,
            modelScale: 0.95,
            damage: [34, 56],
            fireRate: 0.8, // Average
            range: 11, // Long
            price: 220,
        },
        {
            name: TowerType.Wizard,
            level: 4,
            color: "purple",
            defaultStrategy: TargetingStrategy.FirstInLine,
            // firePointY: 13.5,
            // modelScale: 1.3,
            firePointY: 11.2,
            modelScale: 1.05,
            damage: [47, 74],
            fireRate: 0.8, // Average
            range: 12, // Long
            price: 300,
            specials: [],
        },
    ],
};

export const PROJECTILE_BLUEPRINTS: { [k in TowerType]: ProjectileBluePrint[] } = {
    Archer: [
        {
            type: TowerType.Archer,
            level: 1,
            explosionRadius: 0.25,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 2,
            explosionRadius: 0.25,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 3,
            explosionRadius: 0.25,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Archer,
            level: 4,
            explosionRadius: 0.25,
            explosionColor: "orangered",
            color: "blue",
            modelScale: 0.005,
            speed: 14,
            trajectoryType: TrajectoryType.Straight,
        },
    ],
    Ballista: [
        {
            type: TowerType.Ballista,
            level: 1,
            explosionRadius: 0.35,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 2,
            explosionRadius: 0.35,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 3,
            explosionRadius: 0.35,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Ballista,
            level: 4,
            explosionRadius: 0.35,
            explosionColor: "orangered",
            color: "red",
            modelScale: 0.0075,
            speed: 13,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
    Cannon: [
        {
            type: TowerType.Cannon,
            level: 1,
            explosionRadius: 1.5,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.0065,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 2,
            explosionRadius: 1.5,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.01,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 3,
            explosionRadius: 1.5,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.012,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Cannon,
            level: 4,
            explosionRadius: 1.5,
            explosionColor: "yellow",
            color: "black",
            modelScale: 0.015,
            speed: 12,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
    Wizard: [
        {
            type: TowerType.Wizard,
            level: 1,
            explosionRadius: 0.6,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.005,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 2,
            explosionRadius: 0.6,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.0055,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 3,
            explosionRadius: 0.6,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.006,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
        {
            type: TowerType.Wizard,
            level: 4,
            explosionRadius: 0.6,
            explosionColor: "purple",
            color: "purple",
            modelScale: 0.0065,
            speed: 18,
            trajectoryType: TrajectoryType.Straight,
        },
    ],
    Poison: [
        {
            type: TowerType.Poison,
            level: 1,
            explosionRadius: 0.45,
            explosionColor: "green",
            color: "green",
            modelScale: 0.005,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 2,
            explosionRadius: 0.45,
            explosionColor: "green",
            color: "green",
            modelScale: 0.0055,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 3,
            explosionRadius: 0.45,
            explosionColor: "green",
            color: "green",
            modelScale: 0.006,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
        {
            type: TowerType.Poison,
            level: 4,
            explosionRadius: 0.45,
            explosionColor: "green",
            color: "green",
            modelScale: 0.0065,
            speed: 15,
            trajectoryType: TrajectoryType.Parabola,
        },
    ],
};

function getTowerStats(tower: TowerBluePrint) {
    const avgDamage = (tower.damage[0] + tower.damage[1]) / 2;
    const shotsPerSec = tower.fireRate;
    const dps = +(avgDamage * shotsPerSec).toFixed(2);
    const buckPerDps = tower.price / dps;
    return {
        tower: `${tower.name}-${tower.level}`,
        avgDmg: avgDamage,
        shotsPerSec,
        dps,
        range: tower.range,
        price: tower.price,
        buckPerDps,
    };
}

export function printTowersStats() {
    for (const [, towers] of Object.entries(TOWER_BLUEPRINTS)) {
        const stats: {
            tower: string;
            avgDmg: number;
            shotsPerSec: number;
            dps: number;
            range: number;
            price: number;
            buckPerDps: number;
        }[] = [];
        towers.forEach((t) => {
            stats.push(getTowerStats(t));
        });
        console.table(stats);
    }
}
