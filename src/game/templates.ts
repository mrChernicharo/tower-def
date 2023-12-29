import { ModalType, TowerName } from "./enums";
import { capitalize } from "./helpers";

export const modalTemplates = {
    // export const modalTemplates: { [k in ModalType]: (...args: any) => string } = {
    towerBuild: () => `
        <div class="${ModalType.TowerBuild} modal-content">
            <h3>Build Tower</h3>
            <div>
                <button id="${TowerName.Archer}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerName.Archer)}
                </button>
                <button id="${TowerName.Ballista}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerName.Ballista)}
                </button>
            </div>
            <div>
                <button id="${TowerName.Cannon}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerName.Cannon)}
                </button>
                <button id="${TowerName.Poison}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerName.Poison)}
                </button>
                <button id="${TowerName.Wizard}-tower-build-btn" class="tower-build-btn">
                    ${capitalize(TowerName.Wizard)}
                </button>
            </div>
        </div>
    `,
    confirmTowerBuild: (towerName: TowerName) => `
        <div class="${ModalType.ConfirmTowerBuild} ${towerName} modal-content">
            <h3>Build ${capitalize(towerName)} Tower</h3>
            
            <button class="cancel-tower-build-btn">←</button>
            <div>
                <button id="confirm-tower-build-btn" class="confirm-tower-build-btn">Confirm</button>
            </div>
        </div>
    `,
    towerDetails: (towerName: TowerName) => `
        <div class="${ModalType.TowerDetails} ${towerName}  modal-content">
            <h3>${capitalize(towerName)} Tower</h3>

            <div>
                <button id="tower-upgrade-btn" class="tower-details-btn">Upgrade</button>
                <button id="tower-info-btn" class="tower-details-btn">Info</button>
                <button id="tower-sell-btn" class="tower-details-btn">Sell</button>
            </div>
        </div>
    `,
    confirmTowerSell: (towerName: TowerName) => `
        <div class="${ModalType.ConfirmTowerSell} ${towerName} modal-content">
            <h3>Sell ${capitalize(towerName)} Tower</h3>

            <button class="cancel-tower-sell-btn">←</button>
            <div>
                <button id="confirm-tower-sell-btn" class="confirm-tower-sell-btn">Confirm</button>
            </div>
        </div>
    `,
    towerInfo: (towerName: TowerName) => `
        <div class="${ModalType.TowerInfo}  ${towerName} modal-content">
            <h3>${capitalize(towerName)} Tower</h3>
            
            <button class="cancel-tower-info-btn">←</button>
            <div>
                info here...
            </div>
        </div>
    `,
    confirmTowerUpgrade: (towerName: TowerName) => `
        <div class="${ModalType.ConfirmTowerUpgrade} ${towerName} modal-content">
            <h3>Upgrade ${capitalize(towerName)} Tower</h3>

            <button class="cancel-tower-upgrade-btn">←</button>
            <div>
                <button class="confirm-tower-upgrade-btn">Confirm!</button>
            </div>
        </div>
    `,
} as const;

export const cancelableModalNames = [
    ModalType.ConfirmTowerUpgrade,
    ModalType.ConfirmTowerBuild,
    ModalType.ConfirmTowerSell,
    ModalType.TowerInfo,
];
