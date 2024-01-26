export enum EnemyType {
    Runner = "runner",
    Orc = "orc",
    Alien = "alien",
    Demon = "demon",
    DemonBoss = "demonBoss",
    Dino = "dino",
    // Knight = "knight",
    Wizard = "wizard",
    Tribal = "tribal",
    Ninja = "ninja",
    // Elf = "elf",
    Bee = "bee",
    Dragon = "dragon",
    Ghost = "ghost",
    Squidle = "squidle",
}

export enum EnemyChar {
    Runner = "r",
    Orc = "o",
    Alien = "a",
    Demon = "dm",
    Dino = "dn",
    // Knight = "k",
    Wizard = "w",
    Tribal = "t",
    Ninja = "n",
    DemonBoss = "db",
    // Elf = "e",
    Bee = "b",
    Dragon = "dr",
    Ghost = "g",
    Squidle = "s",
    // //
    // Soldier = "z",
    // Brigand = "b",
    // Warrior = "w",
}

export enum GameState {
    Idle = "idle",
    Active = "active",
    Paused = "paused",
    // Dormant = "dormant",
    // Loading = "loading",
    // Win = "win",
    // Lose = "lose",
}

export enum AppLayers {
    Terrain = 0,
    TowerBase = 1,
    Tower = 2,
    Modals = 3,
    Projectile = 4,
    Buildings = 5,
    Enemy = 6,
    EnemyInternals = 7,
}

export enum TowerType {
    Archer = "Archer",
    Ballista = "Ballista",
    Cannon = "Cannon",
    Poison = "Poison",
    Wizard = "Wizard",
}

export enum ModalType {
    TowerBuild = "tower-build",
    ConfirmTowerBuild = "confirm-tower-build",
    TowerDetails = "tower-details",
    ConfirmTowerSell = "confirm-tower-sell",
    TowerInfo = "tower-info",
    ConfirmTowerUpgrade = "confirm-tower-upgrade",
}

export enum TrajectoryType {
    Straight = "Straight",
    Parabola = "Parabola",
}

export enum TargetingStrategy {
    FirstInLine = "first-in-line",
    LastInLine = "last-in-line",
}

export enum SkillPath {
    Archer = "archer",
    Ballista = "ballista",
    Cannon = "cannon",
    Poison = "poison",
    Wizard = "wizard",
    Meteor = "meteor",
    Blizzard = "blizzard",
}

export enum SkillEffectName {
    Range = "RANGE",
    Damage = "DAMAGE",
    RateOfFire = "RATE_OF_FIRE",
    Price = "PRICE",
    // Archer
    MultiTarget = "MULTI_TARGET",
    // Ballista
    CriticalHit = "CRITICAL_HIT",
    // Cannon
    SplashArea = "SPLASH_AREA",
    // Poison
    PoisonDamage = "POISON_DAMAGE", // Applies to Poison
    PoisonDuration = "POISON_DURATION", // Applies to Poison
    // Wizard
    Ricochet = "RICOCHET", // Applies to Wizard
    // Meteor
    MeteorCount = "METEOR_COUNT",
    RandomTargets = "RANDOM_TARGETS",
    // Blizzard
    SlowPower = "SLOW_POWER", // also Applies to Cannon and Meteor
    SlowDuration = "SLOW_DURATION", // also Applies to Cannon and Meteor
    Cooldown = "COOLDOWN",
}

export enum GameArea {
    Desert = "desert",
    Forest = "forest",
    Winter = "winter",
    Lava = "lava",
}
