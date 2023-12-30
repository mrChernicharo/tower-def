import { Tower } from "./Tower";
import { TOWER_BLUEPRINTS } from "./constants";
import { ModalType, TowerType } from "./enums";
import { capitalize } from "./helpers";

export const modalTemplates = {
    towerBuild: () => `
        <div class="${ModalType.TowerBuild} modal-content">
            <h3>Build Tower</h3>
            <div>
                <button id="${TowerType.Archer}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerType.Archer)}
                </button>
                <button id="${TowerType.Ballista}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerType.Ballista)}
                </button>
            </div>
            <div>
                <button id="${TowerType.Cannon}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerType.Cannon)}
                </button>
                <button id="${TowerType.Poison}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerType.Poison)}
                </button>
                <button id="${TowerType.Wizard}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerType.Wizard)}
                </button>
            </div>
        </div>
    `,
    confirmTowerBuild: (towerType: TowerType) => `
        <div class="${ModalType.ConfirmTowerBuild} ${towerType} modal-content">
            <button class="cancel-tower-build-btn">←</button>

            <h3>Build ${capitalize(towerType)} Tower</h3>

            <div class="warning-msg-area"></div>

            <div>
                <button id="confirm-tower-build-btn" class="confirm-tower-build-btn">Confirm</button>
            </div>
        </div>
    `,
    towerDetails: (tower: Tower) => `
        <div class="${ModalType.TowerDetails} ${tower.towerName}  modal-content">
            <h3>${capitalize(tower.towerName)} Tower 
                <span>Lv ${tower.blueprint.level}</span>
            </h3>

            <div>
                ${
                    tower.blueprint.level < 4
                        ? `<button id="tower-upgrade-btn" class="tower-details-btn">Upgrade</button>`
                        : `<span>SKILLS</span>`
                }
                <button id="tower-info-btn" class="tower-details-btn">Info</button>
                <button id="tower-sell-btn" class="tower-details-btn">Sell</button>
            </div>
        </div>
    `,
    confirmTowerSell: (tower: Tower) => `
        <div class="${ModalType.ConfirmTowerSell} ${tower.towerName} modal-content">
            <h3>Sell ${capitalize(tower.towerName)} Tower</h3>

            <div>Sell Price $${Math.round(tower.blueprint.price * 0.7)}</div>

            <button class="cancel-tower-sell-btn">←</button>
            <div>
                <button id="confirm-tower-sell-btn" class="confirm-tower-sell-btn">Confirm</button>
            </div>
        </div>
    `,
    towerInfo: (tower: Tower) => `
        <div class="${ModalType.TowerInfo} ${tower.towerName} modal-content">
            <h3>${capitalize(tower.towerName)} Tower</h3>
            
            <button class="cancel-tower-info-btn">←</button>

            <pre style="font-size: 9px;">${JSON.stringify(tower.blueprint, null, 2)}</pre>

        </div>
    `,
    confirmTowerUpgrade: (tower: Tower) => `
        <div class="${ModalType.ConfirmTowerUpgrade} ${tower.towerName} modal-content">
            <button class="cancel-tower-upgrade-btn">←</button>

            <h3>Upgrade ${capitalize(tower.towerName)} Tower</h3>
            <div>Cost $${tower.blueprint.price}</div>

            <pre style="font-size: 9px;">${JSON.stringify(tower.blueprint, null, 2)}</pre>
            
            <div>next lv ${tower.blueprint.level + 1}</div>

            <pre style="font-size: 9px;">${JSON.stringify(
                TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level],
                null,
                2
            )}
            </pre>

            <div class="warning-msg-area"></div>

            <div>
                <button class="confirm-tower-upgrade-btn">Confirm!</button>
            </div>
        </div>
    `,
} as const;

export const gameEndTemplates = {
    gameWin: () => `
        <h2>You Win!</h2>
        <button id="confirm-end-game-btn">Ok</button>
    `,
    gameLose: () => `
        <h2>You Lose!</h2>
        <button id="confirm-end-game-btn">Ok</button>
    `,
};

export const cancelableModalNames = [
    ModalType.ConfirmTowerUpgrade,
    ModalType.ConfirmTowerBuild,
    ModalType.ConfirmTowerSell,
    ModalType.TowerInfo,
];

// <div>
// <div>Lv ${tower.blueprint.level}</div>
// <div>Dmg ${tower.blueprint.damage}</div>
// <div>FRate ${tower.blueprint.fireRate}</div>
// <div>Rng ${tower.blueprint.range}</div>
// <div>Pr ${tower.blueprint.price}</div>
// </div>
