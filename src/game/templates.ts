import { TowerName } from "./enums";
import { capitalize } from "./helpers";

export const modalTemplates = {
    towerBuild: () => `
        <h3>Build Tower</h3>
        <div>
            <button id="archer-tower-build-btn" class="tower-build-btn">Archer</button>
            <button id="bomb-tower-build-btn" class="tower-build-btn">Bomb</button>
        </div>
        <div>
            <button id="ice-tower-build-btn" class="tower-build-btn">Ice</button>
            <button id="electric-tower-build-btn" class="tower-build-btn">Electric</button>
        </div>
    `,
    confirmTowerBuild: (towerName: TowerName) => `
        <h3>Build ${capitalize(towerName)}</h3>
        <button class="cancel-tower-build-btn">←</button>
        <div>
            <button id="confirm-tower-build-btn" class="confirm-tower-build-btn">Confirm</button>
        </div>
    `,
    towerDetails: (towerName: TowerName) => `
        <h3>${capitalize(towerName)}</h3>
        <div>
            <button id="tower-upgrade-btn" class="tower-details-btn">Upgrade</button>
            <button id="tower-info-btn" class="tower-details-btn">Info</button>
            <button id="tower-sell-btn" class="tower-details-btn">Sell</button>
        </div>
    `,
    confirmTowerSell: (towerName: TowerName) => `
        <h3>Sell ${capitalize(towerName)}</h3>
        <button class="cancel-tower-sell-btn">←</button>
        <div>
            <button id="confirm-tower-sell-btn" class="confirm-tower-sell-btn">Confirm</button>
        </div>
    `,
};
