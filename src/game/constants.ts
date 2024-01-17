/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, EnemyType, GameArea, SkillPath, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { EnemyBluePrint, GameLevel, ProjectileBluePrint, Skill, TowerBluePrint } from "./types";
import { THREE } from "../three";
import { desertLevelPath, villageLevelPath, forestLevelPaths } from "./levelPaths";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const DRAW_PROJECTILE_TRAJECTORIES = false;
// export const DRAW_PROJECTILE_TRAJECTORIES = true;

export const DRAW_METEOR_GIZMOS = true;

export const BLIZZARD_SLOW_DURATION = 6; // seconds
export const BLIZZARD_EFFECT_DURATION = 1200; // milliseconds

// export const defaultPlayerSkills = {
//     "constructor-1": false,
//     "constructor-2": false,
//     "constructor-3": false,
//     "constructor-4": false,
//     "constructor-5": false,
//     "constructor-6": false,
//     "merchant-1": false,
//     "merchant-2": false,
//     "merchant-3": false,
//     "merchant-4": false,
//     "merchant-5": false,
//     "merchant-6": false,
//     "chemist-1": false,
//     "chemist-2": false,
//     "chemist-3": false,
//     "chemist-4": false,
//     "chemist-5": false,
//     "chemist-6": false,
//     "blacksmith-1": false,
//     "blacksmith-2": false,
//     "blacksmith-3": false,
//     "blacksmith-4": false,
//     "blacksmith-5": false,
//     "blacksmith-6": false,
// };

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

export const mapURLs = {
    desert: "/assets/glb/lv1.desert-level.glb",
    forest: "/assets/glb/lv2.castle-level.glb",
    winter: "/assets/glb/lv4.village-level.glb",
    lava: "/assets/glb/lv4.village-level.glb",
};

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
    spider: {
        name: EnemyType.Spider,
        reward: 5,
        modelURL: "/assets/glb/spider.glb",
        // speed: 10,
        speed: 3,
        maxHp: 40,
        modelScale: 80,
        walkAnimationName: "Wolf Spider Armature|Spider running",
    },
    orc: {
        name: EnemyType.Orc,
        reward: 10,
        // modelURL: "/assets/glb/hand-painted_orc.glb",
        modelURL: "/assets/glb/low-poly_orc.glb",
        speed: 2,
        maxHp: 200,
        modelScale: 1.5,
        walkAnimationName: "ANM_WALK",
    },
    raptor: {
        name: EnemyType.Raptor,
        reward: 10,
        modelURL: "/assets/glb/raptoid.glb",
        speed: 4,
        maxHp: 100,
        modelScale: 0.02,
        walkAnimationName: "Running",
    },
    raptor2: {
        name: EnemyType.Raptor2,
        reward: 100,
        modelURL: "/assets/glb/raptoid.glb",
        speed: 2,
        maxHp: 1500,
        modelScale: 0.04,
        walkAnimationName: "Running",
    },
    soldier: {
        name: EnemyType.Soldier,
        reward: 15,
        modelURL: "/assets/glb/Character_Soldier.gltf",
        speed: 2,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    brigand: {
        name: EnemyType.Brigand,
        reward: 15,
        modelURL: "/assets/glb/Character_Hazmat.gltf",
        speed: 2,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
    warrior: {
        name: EnemyType.Warrior,
        reward: 15,
        modelURL: "/assets/glb/Character_Enemy.gltf",
        speed: 1.6,
        maxHp: 150,
        modelScale: 1.5,
        walkAnimationName: "Walk",
    },
} as const;

export const MATERIALS = {
    damageMaterialStd: new THREE.MeshStandardMaterial({ color: "red" }),
    poisonDmgMaterialStd: new THREE.MeshStandardMaterial({ color: COLORS.poisonGreen }),
    damageMaterialPhysical: new THREE.MeshStandardMaterial({ color: "red" }),
    poisonDmgMaterialPhysical: new THREE.MeshStandardMaterial({ color: "green" }),
    meteor: new THREE.MeshMatcapMaterial({ color: COLORS.red }),
    concrete: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    concrete2: new THREE.MeshMatcapMaterial({ color: COLORS.concrete2 }),
    black: new THREE.MeshMatcapMaterial({ color: COLORS.black }),
    transparentBlack: new THREE.MeshMatcapMaterial({ color: COLORS.black, transparent: true, opacity: 0.5 }),
    desert: new THREE.MeshMatcapMaterial({ color: COLORS.desert }),
    forest: new THREE.MeshMatcapMaterial({ color: COLORS.forest }),
    winter: new THREE.MeshMatcapMaterial({ color: COLORS.winter }),
    lava: new THREE.MeshMatcapMaterial({ color: COLORS.lava }),
    path: new THREE.MeshMatcapMaterial({ color: COLORS.concrete }),
    beacon: new THREE.MeshMatcapMaterial({ color: COLORS.green }),
    icicle: new THREE.MeshMatcapMaterial({ color: "dodgerblue", transparent: true, opacity: 0.5 }),
    concreteTransparent: new THREE.MeshMatcapMaterial({
        color: COLORS.concrete,
        transparent: true,
        opacity: 0.5,
    }),
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

export const TOWER_BLUEPRINTS: { [k in TowerType]: TowerBluePrint[] } = {
    Archer: [
        {
            name: TowerType.Archer,
            level: 1,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6,
            damage: [3, 7],
            fireRate: 6,
            color: "blue",
            price: 100,
            range: 8,
            modelScale: 0.005,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 6.5,
            level: 2,
            damage: [6, 13],
            fireRate: 6,
            color: "blue",
            price: 160,
            range: 9,
            modelScale: 0.0055,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 7,
            level: 3,
            damage: [14, 22],
            fireRate: 7,
            color: "blue",
            price: 220,
            modelScale: 0.006,
            range: 10,
        },
        {
            name: TowerType.Archer,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 7.5,
            level: 4,
            damage: [20, 34],
            fireRate: 8,
            color: "blue",
            price: 380,
            modelScale: 0.0065,
            range: 10,
            skills: [],
        },
    ],
    Ballista: [
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 6,
            level: 1,
            damage: [10, 20],
            fireRate: 2,
            color: "red",
            price: 100,
            range: 10,
            modelScale: 0.005,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 6.5,
            level: 2,
            damage: [20, 38],
            fireRate: 2.25,
            color: "red",
            price: 160,
            range: 10.5,
            modelScale: 0.0055,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 7,
            level: 3,
            damage: [34, 55],
            fireRate: 2.5,
            color: "red",
            price: 220,
            modelScale: 0.006,
            range: 11,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 7.5,
            level: 4,
            damage: [51, 76],
            fireRate: 2.75,
            color: "red",
            price: 380,
            modelScale: 0.0065,
            range: 12,
            skills: [],
        },
    ],
    Cannon: [
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8,
            level: 1,
            damage: [18, 36],
            fireRate: 0.8,
            color: "orange",
            price: 100,
            range: 9,
            modelScale: 0.005,
        },
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8.5,
            level: 2,
            damage: [29, 54],
            fireRate: 0.8,
            color: "orange",
            price: 160,
            modelScale: 0.0055,
            range: 10,
        },
        {
            name: TowerType.Cannon,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 9,
            level: 3,
            damage: [48, 86],
            fireRate: 0.8,
            color: "orange",
            price: 220,
            modelScale: 0.006,
            range: 11,
        },
        {
            name: TowerType.Ballista,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 9.5,
            level: 4,
            damage: [60, 100],
            fireRate: 0.8,
            color: "orange",
            price: 380,
            modelScale: 0.0065,
            range: 12,
            skills: [],
        },
    ],
    Poison: [
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8,
            level: 1,
            damage: [4, 7],
            fireRate: 3,
            color: "green",
            price: 100,
            modelScale: 0.005,
            range: 10,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 8.5,
            level: 2,
            damage: [11, 22],
            fireRate: 2.5,
            color: "green",
            price: 160,
            modelScale: 0.0055,
            range: 12,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 9,
            level: 3,
            damage: [21, 37],
            fireRate: 2,
            color: "green",
            price: 220,
            modelScale: 0.006,
            range: 13,
        },
        {
            name: TowerType.Poison,
            defaultStrategy: TargetingStrategy.LastInLine,
            firePointY: 10,
            level: 4,
            damage: [33, 60],
            fireRate: 2,
            color: "green",
            price: 380,
            modelScale: 0.0065,
            range: 14,
            skills: [],
        },
    ],
    Wizard: [
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 9.5,
            level: 1,
            damage: [9, 18],
            fireRate: 2,
            color: "purple",
            price: 100,
            modelScale: 0.005,
            range: 12,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 11,
            level: 2,
            damage: [14, 30],
            fireRate: 1.8,
            color: "purple",
            price: 160,
            modelScale: 0.0055,
            range: 13,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 12,
            level: 3,
            damage: [26, 49],
            fireRate: 1.6,
            color: "purple",
            price: 220,
            modelScale: 0.006,
            range: 14,
        },
        {
            name: TowerType.Wizard,
            defaultStrategy: TargetingStrategy.FirstInLine,
            firePointY: 13.5,
            level: 4,
            damage: [40, 65],
            fireRate: 1.5,
            color: "purple",
            price: 380,
            modelScale: 0.0065,
            range: 14,
            skills: [],
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

// enemyChar, pathIdx, spawnAt, xOffset
export const STAGE_WAVES_DATA: [string, number, number, number][][][] = [
    // stage 01
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1),
    ],

    // stage 02
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 2),
        // wave 2
        waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 03
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 2),
        // wave 1
        waveSegment(EnemyChar.Raptor, 4),
    ],

    // stage 04
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 2),
        // wave 2
        [
            ...waveSegment(EnemyChar.Spider, 1),
            ...waveSegment(EnemyChar.Raptor, 4, 5),
            ...waveSegment(EnemyChar.Spider, 1, 10, 20),
        ],
    ],

    // stage 05 - FOREST
    [
        // wave 1
        [...waveSegment(EnemyChar.Spider, 3, 13, 0, 0), ...waveSegment(EnemyChar.Spider, 3, 11, 6, 2)],
        // wave 2
        [
            ...waveSegment(EnemyChar.Spider, 3, 13, 0, 1),
            ...waveSegment(EnemyChar.Spider, 3, 11, 8, 3),
            ...waveSegment(EnemyChar.Spider, 3, 11, 16, 2),
            ...waveSegment(EnemyChar.Spider, 3, 11, 24, 2),
        ],
    ],

    // stage 06 - FOREST
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        [
            ...waveSegment(EnemyChar.Raptor, 8, 2, 0, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 6, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 12, 2),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 18, 3),
            ...waveSegment(EnemyChar.Spider, 2, 8, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 16, 2),
            ...waveSegment(EnemyChar.Spider, 2, 8, 24, 3),
        ],
        // wave 3
        // [...waveSegment(EnemyChar.Soldier, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        [...waveSegment(EnemyChar.Soldier, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor2, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],

    // stage 07 - FOREST
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        [...waveSegment(EnemyChar.Soldier, 3.2, 5), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Raptor, 8, 2, 0, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 7, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 14, 2),
            ...waveSegment(EnemyChar.Raptor, 8, 2, 21, 3),
            ...waveSegment(EnemyChar.Spider, 2.2, 8, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2.2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2.2, 8, 16, 2),
            ...waveSegment(EnemyChar.Spider, 2.2, 8, 24, 3),
        ],
        [...waveSegment(EnemyChar.Soldier, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor2, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],
    // stage 08 - FOREST
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 0, 1),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 28, 2),
            ...waveSegment(EnemyChar.Spider, 2.8, 10, 28, 3),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Soldier, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Raptor, 8, 3, 0, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 3, 6, 1, []),
            ...waveSegment(EnemyChar.Raptor, 8, 3, 12, 2),
            ...waveSegment(EnemyChar.Raptor, 8, 3, 18, 3),
            ...waveSegment(EnemyChar.Spider, 2, 10, 0, 0),
            ...waveSegment(EnemyChar.Spider, 2, 10, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 10, 16, 2),
            ...waveSegment(EnemyChar.Spider, 2, 10, 24, 3),
        ],
        [...waveSegment(EnemyChar.Soldier, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Raptor2, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],
    // stage 09
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 10
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 11
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // // wave 6
        // [
        //     ...waveSegment(EnemyChar.Warrior, 2),
        //     ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
        //     ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
        //     ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, [-1, 1]),
        // ],
    ],
    // stage 12
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
    ],
    // stage 13
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 14
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 15
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 16
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Brigand, 2),
        // wave 3
        [...waveSegment(EnemyChar.Soldier, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Warrior, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Brigand, 2),
            ...waveSegment(EnemyChar.Warrior, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Warrior, 2),
            ...waveSegment(EnemyChar.Soldier, 2, 10, 22),
            ...waveSegment(EnemyChar.Brigand, 2, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
        [...waveSegment(EnemyChar.Raptor2, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
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
    },
    {
        area: GameArea.Forest,
        level: 7,
        initialGold: 380,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[7],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Winter,
        level: 8,
        initialGold: 400,
        mapURL: mapURLs.winter,
        paths: [villageLevelPath],
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 9,
        initialGold: 420,
        mapURL: mapURLs.winter,
        paths: [villageLevelPath],
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 10,
        initialGold: 440,
        mapURL: mapURLs.winter,
        paths: [villageLevelPath],
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Winter,
        level: 11,
        initialGold: 460,
        mapURL: mapURLs.winter,
        paths: [villageLevelPath],
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
    },
    {
        area: GameArea.Lava,
        level: 12,
        initialGold: 480,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 13,
        initialGold: 500,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 14,
        initialGold: 520,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
    },
    {
        area: GameArea.Lava,
        level: 15,
        initialGold: 550,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
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

// console.log(STAGE_WAVES_DATA);
