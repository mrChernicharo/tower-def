export enum EnemyType {
    Spider = "spider",
    Orc = "orc",
    Raptor = "raptor",
    Raptor2 = "raptor2",
    Soldier = "soldier",
    Brigand = "brigand",
    Warrior = "warrior",
}

export enum EnemyChar {
    Spider = "s",
    Orc = "o",
    Soldier = "z",
    Brigand = "b",
    Warrior = "w",
    Raptor = "r",
    Raptor2 = "r2",
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

export enum GameArea {
    Desert = "desert",
    Forest = "forest",
    Winter = "winter",
    Lava = "lava",
}
