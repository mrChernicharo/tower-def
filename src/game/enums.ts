export enum EnemyType {
    Spider = "spider",
    Orc = "orc",
    Raptor = "raptor",
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
    Default = 0,
    TowerBase = 1,
    Tower = 2,
    Modals = 3,
    Projectile = 4,
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
