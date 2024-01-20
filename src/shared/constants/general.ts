/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { THREE } from "../../three";

export const DRAW_FUTURE_GIZMO = false;
// export const DRAW_FUTURE_GIZMO = true;

export const DRAW_PROJECTILE_TRAJECTORIES = false;
// export const DRAW_PROJECTILE_TRAJECTORIES = true;

export const DRAW_METEOR_GIZMOS = true;

export const BLIZZARD_SLOW_DURATION = 6;
export const BLIZZARD_EFFECT_DURATION = 1.5;

export const MAX_FOV = 72;
export const MIN_FOV = 8;

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
