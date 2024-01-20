/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyType, GameArea, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, ProjectileBluePrint, Skill, TowerBluePrint } from "./types";
import { THREE } from "../three";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const DRAW_PROJECTILE_TRAJECTORIES = false;
// export const DRAW_PROJECTILE_TRAJECTORIES = true;

export const DRAW_METEOR_GIZMOS = true;

export const BLIZZARD_SLOW_DURATION = 6;
export const BLIZZARD_EFFECT_DURATION = 1.5;

export const MAX_FOV = 75;
export const MIN_FOV = 10;

export const defaultPlayerSkills = {
    "archer-1": false,
    "archer-2": false,
    "archer-3": false,
    "archer-4": false,
    "archer-5": false,
    "ballista-1": false,
    "ballista-2": false,
    "ballista-3": false,
    "ballista-4": false,
    "ballista-5": false,
    "cannon-1": false,
    "cannon-2": false,
    "cannon-3": false,
    "cannon-4": false,
    "cannon-5": false,
    "poison-1": false,
    "poison-2": false,
    "poison-3": false,
    "poison-4": false,
    "poison-5": false,
    "wizard-1": false,
    "wizard-2": false,
    "wizard-3": false,
    "wizard-4": false,
    "wizard-5": false,
    "meteor-1": false,
    "meteor-2": false,
    "meteor-3": false,
    "meteor-4": false,
    "meteor-5": false,
    "blizzard-1": false,
    "blizzard-2": false,
    "blizzard-3": false,
    "blizzard-4": false,
    "blizzard-5": false,
};

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

export const imgs = {
    Splash: "/assets/imgs/splash.png",
    World: "/assets/imgs/world-map.jpeg",
    Stage: "/assets/svg/stage.svg",
    Settings: "/assets/svg/gear.svg",
    // Stage: "/assets/imgs/sword32.webp",
    CallWave: "/assets/imgs/twin-swords.webp",
    Coins: "/assets/svg/coins.svg",
    Meteor: "/assets/imgs/fireball.webp",
    Blizzard: "/assets/imgs/ice-wing.webp",
    Plague: "/assets/imgs/skull.webp",
    Rune: "/assets/imgs/rune.webp",
    Trap: "/assets/imgs/trap.webp",
    Potion: "/assets/imgs/potion.webp",

    // Towers
    Archer: "/assets/imgs/archer.webp",
    Ballista: "/assets/imgs/ballista.webp",
    Cannon: "/assets/imgs/cannon.webp",
    Poison: "/assets/imgs/poison.webp",
    Wizard: "/assets/imgs/wizard.webp",
    // Skill paths
    ConstructorPath: "/assets/imgs/rune.webp",
    MerchantPath: "/assets/imgs/crown.webp",
    ChemistPath: "/assets/imgs/orb.webp",
    BlacksmithPath: "/assets/imgs/sledge-hammer.webp",
};

// prettier-ignore
export const gameSkills: { [k in SkillPath]: Skill[] }  = {
    archer: [
        { id: "archer-1", name: "precision shot", description: "Increase accuracy for archer towers by 15%", starCost: 1 },
        { id: "archer-2", name: "swift arrows", description: "Archers shoot 20% faster", starCost: 2 },
        { id: "archer-3", name: "piercing shots", description: "Archers' shots pierce through enemy armor, dealing extra damage", starCost: 3 },
        { id: "archer-4", name: "eagle eye", description: "Archers have a chance to deal critical hits, causing double damage", starCost: 4 },
        { id: "archer-5", name: "archer commander", description: "Command all archers to focus fire, dealing massive damage to a single target", starCost: 5 },
    ],
    ballista: [
        { id: "ballista-1", name: "heavy bolts", description: "Ballista towers shoot heavy bolts, dealing increased damage", starCost: 1 },
        { id: "ballista-2", name: "rapid reload", description: "Reduce the reload time for ballista towers by 20%", starCost: 2 },
        { id: "ballista-3", name: "piercing impact", description: "Ballista bolts pierce through multiple enemies, causing collateral damage", starCost: 3 },
        { id: "ballista-4", name: "siege mastery", description: "Ballista towers become highly effective against enemy fortifications", starCost: 4 },
        { id: "ballista-5", name: "ballista engineer", description: "Upgrade ballista towers with advanced technology, greatly increasing their power", starCost: 5 },
    ],
    cannon: [
        { id: "cannon-1", name: "armor-piercing rounds", description: "Cannon shots ignore enemy armor, dealing full damage", starCost: 1 },
        { id: "cannon-2", name: "shrapnel explosion", description: "Cannon shots explode on impact, causing shrapnel damage to nearby enemies", starCost: 2 },
        { id: "cannon-3", name: "heavy artillery", description: "Upgrade cannons to heavy artillery, greatly increasing their damage", starCost: 3 },
        { id: "cannon-4", name: "volley fire", description: "Cannons unleash a rapid volley of shots, overwhelming enemies", starCost: 4 },
        { id: "cannon-5", name: "cannon general", description: "Command all cannons to focus fire on a single target, dealing massive damage", starCost: 5 },
    ],
    poison: [
        { id: "poison-1", name: "toxic arrows", description: "Archers use poisoned arrows, dealing damage over time to enemies", starCost: 1 },
        { id: "poison-2", name: "venomous clouds", description: "Create poisonous clouds that linger, damaging enemies over time", starCost: 2 },
        { id: "poison-3", name: "corrosive mixture", description: "Poison damage has a chance to reduce enemy armor temporarily", starCost: 3 },
        { id: "poison-4", name: "toxin spread", description: "Enemies hit by poison attacks spread the toxin to nearby foes", starCost: 4 },
        { id: "poison-5", name: "poison alchemist", description: "Become a master alchemist, creating deadly poisons with devastating effects", starCost: 5 },
    ],
    wizard: [
        { id: "wizard-1", name: "arcane missile", description: "Wizards shoot powerful arcane missiles, seeking out enemies", starCost: 1 },
        { id: "wizard-2", name: "mana shield", description: "Wizards create a protective mana shield, reducing incoming damage", starCost: 2 },
        { id: "wizard-3", name: "time warp", description: "Manipulate time to slow down enemy movement and attacks", starCost: 3 },
        { id: "wizard-4", name: "elemental mastery", description: "Master the elements, enhancing wizard spells with elemental power", starCost: 4 },
        { id: "wizard-5", name: "archmage", description: "Attain the rank of archmage, unlocking the most powerful wizard spells", starCost: 5 },
    ],
    meteor: [
        { id: "meteor-1", name: "meteor shower", description: "Summon a meteor shower, devastating enemies in a targeted area", starCost: 1 },
        { id: "meteor-2", name: "celestial judgment", description: "Call upon celestial forces to deliver a powerful judgment, dealing massive damage", starCost: 2 },
        { id: "meteor-3", name: "cosmic explosion", description: "Upgrade meteors to explode upon impact, causing additional damage", starCost: 3 },
        { id: "meteor-4", name: "supernova", description: "Reach the pinnacle of meteor mastery, unleashing a devastating supernova", starCost: 4 },
        { id: "meteor-5", name: "celestial sorcerer", description: "Become a master of celestial magic, wielding unmatched power with meteors", starCost: 5 },
    ],
    blizzard: [
        { id: "blizzard-1", name: "icy winds", description: "Summon icy winds that slow down and freeze enemies in their tracks", starCost: 1 },
        { id: "blizzard-2", name: "frostbite aura", description: "Create a chilling aura that inflicts frostbite, reducing enemy movement speed", starCost: 2 },
        { id: "blizzard-3", name: "snowstorm", description: "Unleash a snowstorm, impairing visibility and slowing enemy attacks", starCost: 3 },
        { id: "blizzard-4", name: "absolute zero", description: "Reach the absolute zero temperature, freezing enemies on the battlefield", starCost: 4 },
        { id: "blizzard-5", name: "cryomancer", description: "Attain the title of cryomancer, mastering the art of ice and cold magic", starCost: 5 },
    ],
};

export const COLORS = {
    bg: 0x333355,
    desert: 0xdd6600,
    lightConcrete: 0xcdcdcd,
    concrete: 0xacacac,
    concrete2: 0x8a8a8a,
    blue: 0x3484d4,
    red: 0xd43434,
    orange: 0xd47f34,
    orangered: 0xff5a00,
    green: 0x34d4af,
    forest: 0x007900,
    purple: 0xb834d4,
    lava: 0x7778c8,
    yellow: 0xfffc00,
    black: 0x000000,
    white: 0xffffff,
    winter: 0xffffff,
    poisonGreen: 0x6ee400,
} as const;

export const ENEMY_BLUEPRINTS: { [k in EnemyType]: EnemyBluePrint } = {
    // ground enemies
    spider: {
        name: EnemyType.Spider,
        reward: 5,
        modelURL: "/assets/glb/enemies/spider.glb",
        speed: 3,
        maxHp: 40,
        modelScale: 80,
        walkAnimationName: "Wolf Spider Armature|Spider running",
    },
    wizard: {
        name: EnemyType.Wizard,
        reward: 35,
        modelURL: "/assets/glb/enemies/Wizard.gltf",
        speed: 1.4,
        maxHp: 180,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    dino: {
        name: EnemyType.Dino,
        reward: 8,
        modelURL: "/assets/glb/enemies/Dino.gltf",
        speed: 1.6, // mid
        maxHp: 60,
        modelScale: 0.8,
        // modelScale: 1,
        walkAnimationName: "Walk",
    },
    orc: {
        name: EnemyType.Orc,
        reward: 10,
        modelURL: "/assets/glb/enemies/Orc.gltf",
        speed: 2,
        maxHp: 200,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    tribal: {
        name: EnemyType.Tribal,
        reward: 16,
        modelURL: "/assets/glb/enemies/Tribal.gltf",
        speed: 1.6,
        maxHp: 300,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    ninja: {
        name: EnemyType.Ninja,
        reward: 21,
        modelURL: "/assets/glb/enemies/Ninja.gltf",
        speed: 4,
        maxHp: 140,
        modelScale: 1,
        walkAnimationName: "Run",
    },
    alien: {
        name: EnemyType.Alien,
        reward: 17,
        modelURL: "/assets/glb/enemies/Alien.gltf",
        speed: 1.6,
        maxHp: 200,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    demon: {
        name: EnemyType.Demon,
        reward: 25,
        modelURL: "/assets/glb/enemies/Demon.gltf",
        speed: 1.8,
        maxHp: 250,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    demonBoss: {
        name: EnemyType.DemonBoss,
        reward: 10,
        modelURL: "/assets/glb/enemies/Demon.gltf",
        speed: 1.8,
        maxHp: 3000,
        modelScale: 2,
        walkAnimationName: "Walk",
    },

    // flying enemies
    bee: {
        name: EnemyType.Bee,
        reward: 6,
        modelURL: "/assets/glb/enemies/Bee.gltf",
        speed: 2.8,
        maxHp: 80,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    squidle: {
        name: EnemyType.Squidle,
        reward: 7,
        modelURL: "/assets/glb/enemies/Squidle.gltf",
        speed: 2.5,
        maxHp: 120,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    ghost: {
        name: EnemyType.Ghost,
        reward: 8,
        modelURL: "/assets/glb/enemies/Ghost.gltf",
        speed: 2,
        maxHp: 130,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    dragon: {
        name: EnemyType.Dragon,
        reward: 35,
        modelURL: "/assets/glb/enemies/Dragon.gltf",
        speed: 1.8,
        maxHp: 480,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    // elf: {
    //     name: EnemyType.Elf,
    //     reward: 32,
    //     modelURL: "/assets/glb/enemies/Elf.gltf",
    //     speed: 1.7,
    //     maxHp: 280,
    //     modelScale: 1,
    //     walkAnimationName: "Walk",
    // },
} as const;

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
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6,
            damage: [2, 5],
            fireRate: 6, // Fast
            color: "blue",
            price: 70,
            range: 10, // Average
            modelScale: 1,
            // modelURL: "/assets/glb/towers/Archer_Tower.gltf",
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6.5,
            level: 2,
            damage: [4, 9],
            fireRate: 6, // Fast
            color: "blue",
            price: 110,
            range: 11, // Long
            modelScale: 1.1,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 7,
            level: 3,
            damage: [5, 11],
            fireRate: 9, // Very Fast
            color: "blue",
            price: 160,
            modelScale: 1.2,
            range: 12, // Long
        },
        {
            name: TowerType.Archer,
            level: 4,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "blue",
            firePointY: 7.5,
            modelScale: 1.3,
            price: 230,
            damage: [7, 16],
            fireRate: 9, // Very Fast
            range: 13, // Great
            specials: [],
        },
    ],
    Ballista: [
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8,
            level: 1,
            damage: [4, 9],
            fireRate: 1.2, // Slow
            color: "red",
            price: 100,
            range: 12, // Long
            modelScale: 1,
        },
        {
            name: TowerType.Ballista,
            level: 2,
            color: "red",
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8.5,
            modelScale: 1.1,
            damage: [8, 13],
            fireRate: 1.2, // Slow
            range: 13, // Great
            price: 160,
        },
        {
            name: TowerType.Ballista,
            level: 3,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "red",
            firePointY: 9,
            modelScale: 1.2,
            damage: [11, 20],
            fireRate: 1.2, // Slow
            range: 14, // Excellent
            price: 220,
        },
        {
            name: TowerType.Ballista,
            level: 4,
            color: "red",
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 9.5,
            modelScale: 1.3,
            damage: [21, 34],
            fireRate: 1.2, // Slow
            range: 15, // Extreme
            specials: [],
            price: 380,
        },
    ],
    Cannon: [
        {
            name: TowerType.Cannon,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "orange",
            firePointY: 8,
            modelScale: 1,
            damage: [7, 12],
            fireRate: 0.8, // Very Slow
            range: 9, // short
            price: 125,
        },
        {
            name: TowerType.Cannon,
            level: 2,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "orange",
            firePointY: 8.5,
            modelScale: 1.1,
            damage: [18, 30],
            fireRate: 0.8, // Very Slow
            range: 10, // Average
            price: 220,
        },
        {
            name: TowerType.Cannon,
            level: 3,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "orange",
            firePointY: 9,
            damage: [30, 50],
            fireRate: 0.8, // Very Slow
            modelScale: 1.2,
            range: 11, // Long
            price: 320,
        },
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 9.5,
            level: 4,
            damage: [62, 106],
            fireRate: 0.8, // Very Slow
            color: "orange",
            modelScale: 1.3,
            range: 12, // Long
            price: 375,
            specials: [],
        },
    ],
    Poison: [
        {
            name: TowerType.Poison,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8,
            color: "green",
            damage: [4, 8],
            fireRate: 2, // Average
            modelScale: 1,
            range: 9, // Short
            price: 100,
        },
        {
            name: TowerType.Poison,
            level: 2,
            color: "green",
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 8.5,
            modelScale: 1.1,
            damage: [11, 22],
            fireRate: 2, // Average
            range: 10,
            price: 160,
        },
        {
            name: TowerType.Poison,
            level: 3,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "green",
            firePointY: 9,
            modelScale: 1.2,
            damage: [21, 37],
            fireRate: 2, // Average
            range: 11,
            price: 220,
        },
        {
            name: TowerType.Poison,
            level: 4,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 10,
            modelScale: 1.3,
            color: "green",
            damage: [32, 61],
            fireRate: 2, // Average
            range: 12,
            price: 380,
            specials: [],
        },
    ],
    Wizard: [
        {
            name: TowerType.Wizard,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "purple",
            firePointY: 9.5,
            modelScale: 1,
            damage: [8, 12],
            fireRate: 2, // Average
            range: 9, // Short
            price: 100,
        },
        {
            name: TowerType.Wizard,
            level: 2,
            defaultStrategy: TargetingStrategy.FirstInLine,
            color: "purple",
            firePointY: 11,
            modelScale: 1.1,
            damage: [18, 30],
            fireRate: 2, // Average
            range: 10, // Average
            price: 160,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 12,
            level: 3,
            damage: [34, 56],
            fireRate: 2, // Average
            color: "purple",
            price: 220,
            modelScale: 1.2,
            range: 11, // Long
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 13.5,
            level: 4,
            damage: [47, 74],
            fireRate: 2, // Average
            color: "purple",
            price: 380,
            modelScale: 1.3,
            range: 12, // Long
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

export const MATERIALS = {
    damageMaterialStd: new THREE.MeshStandardMaterial({ color: "red" }),
    poisonDmgMaterialStd: new THREE.MeshStandardMaterial({ color: COLORS.poisonGreen }),
    damageMaterialPhysical: new THREE.MeshStandardMaterial({ color: "red" }),
    poisonDmgMaterialPhysical: new THREE.MeshStandardMaterial({ color: "green" }),
    meteor: new THREE.MeshMatcapMaterial({ color: COLORS.red }),
    concrete: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    concrete2: new THREE.MeshMatcapMaterial({ color: COLORS.concrete2 }),
    lightConcrete: new THREE.MeshMatcapMaterial({ color: COLORS.lightConcrete }),
    concreteTransparent: new THREE.MeshMatcapMaterial({
        color: COLORS.concrete,
        transparent: true,
        opacity: 0.5,
    }),
    black: new THREE.MeshMatcapMaterial({ color: COLORS.black }),
    transparentBlack: new THREE.MeshMatcapMaterial({ color: COLORS.black, transparent: true, opacity: 0.5 }),
    desert: new THREE.MeshMatcapMaterial({ color: COLORS.desert }),
    forest: new THREE.MeshMatcapMaterial({ color: COLORS.forest }),
    winter: new THREE.MeshMatcapMaterial({ color: COLORS.winter }),
    lava: new THREE.MeshMatcapMaterial({ color: COLORS.lava }),
    path: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    beacon: new THREE.MeshMatcapMaterial({ color: COLORS.green }),
    wood: new THREE.MeshMatcapMaterial({ color: "brown" }),
    icicle: new THREE.MeshMatcapMaterial({ color: "dodgerblue", transparent: true, opacity: 0.5 }),

    projectileGizmo: new THREE.MeshToonMaterial({ color: 0x00ffff }),
    tower: (towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color: 0xdba58c,
            map: towerTexture,
        }),
    towerHighlight: (towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color: 0xca947d,
            map: towerTexture,
        }),
    towerRangeGizmo: (color: string) =>
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.15,
            color,
        }),
    projectile: (color: number, towerTexture: THREE.Texture) =>
        new THREE.MeshBasicMaterial({
            color,
            map: towerTexture,
        }),
    explosion: (color: number) =>
        new THREE.MeshToonMaterial({
            color,
            transparent: true,
            opacity: 0.6,
        }),
    trajectoryLine: () => new THREE.LineBasicMaterial({ color: 0xff0000 }),
};
