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
    Raptor = "r",
    Orc = "o",
    Soldier = "z",
    Brigand = "b",
    Warrior = "w",
}

export enum GameState {
    // Dormant = "dormant",
    Loading = "loading",
    Active = "active",
    Paused = "paused",
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
