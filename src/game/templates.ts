import { Tower } from "./Tower";
import { TOWER_BLUEPRINTS, imgs } from "./constants";
import { ModalType, TowerType } from "./enums";
import { capitalize, getStarIcons } from "./helpers";
import { LevelStarCount } from "./types";

// <img src="${IMAGES}" />
export const modalTemplates = {
    towerBuild: () => `
        <div class="${ModalType.TowerBuild} modal-content">
            <h3>Build Tower</h3>
            <div class="modal-content-row btn-row">
                <button id="${TowerType.Archer}-tower-build-btn" class="tower-build-btn">
                    <img width="50" height="50" src="${imgs.Archer}" />
                </button>
                <button id="${TowerType.Ballista}-tower-build-btn" class="tower-build-btn">
                    <img width="50" height="50" src="${imgs.Ballista}" />
                </button>
            </div>
            <div class="btn-row">
                <button id="${TowerType.Cannon}-tower-build-btn" class="tower-build-btn">
                    <img width="50" height="50" src="${imgs.Cannon}" />
                </button>
                <button id="${TowerType.Poison}-tower-build-btn" class="tower-build-btn">
                    <img width="50" height="50" src="${imgs.Poison}" />
                </button>
                <button id="${TowerType.Wizard}-tower-build-btn" class="tower-build-btn">
                    <img width="50" height="50" src="${imgs.Wizard}" />
                </button>
            </div>
        </div>
    `,
    confirmTowerBuild: (towerType: TowerType) => `
        <div class="${ModalType.ConfirmTowerBuild} ${towerType} modal-content">
            <div class="cancel-btn-container">
                <button class="cancel-btn cancel-tower-build-btn">←</button>
            </div>

            <h3>Build ${capitalize(towerType)} Tower</h3>

            <div class="warning-msg-area"></div>

            <div>
                <button id="confirm-tower-build-btn" class="confirm-tower-build-btn">Confirm</button>
            </div>
        </div>
    `,
    towerDetails: (tower: Tower) => {
        const t = tower.blueprint;
        // const t2 = TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level];

        return `
        <div class="${ModalType.TowerDetails} ${tower.towerName} modal-content">
            <h3>${capitalize(tower.towerName)} Tower 
                <span>Lv ${t.level}</span>
            </h3>

            <div class="btn-row">
                <button id="tower-info-btn" class="tower-details-btn">Info</button>
                <button id="tower-sell-btn" class="tower-details-btn">Sell $${t.price * 0.7}</button>
            </div>

            <div class="btn-row">
            ${
                tower.blueprint.level < 4
                    ? `<button id="tower-upgrade-btn" class="tower-details-btn">Upgrade $${t.price}</button>`
                    : `<span>SKILLS</span>`
            }
           </div>
        </div>
    `;
    },
    confirmTowerSell: (tower: Tower) => `
        <div class="${ModalType.ConfirmTowerSell} ${tower.towerName} modal-content">
            <div class="cancel-btn-container">
                <button class="cancel-btn cancel-tower-sell-btn">←</button>
            </div>
            
            <h3>Sell ${capitalize(tower.towerName)} Tower</h3>

            <div>Sell Price $${Math.round(tower.blueprint.price * 0.7)}</div>

            <div>
                <button id="confirm-tower-sell-btn" class="confirm-tower-sell-btn">Confirm</button>
            </div>
        </div>
    `,
    towerInfo: (tower: Tower) => `
        <div class="${ModalType.TowerInfo} ${tower.towerName} modal-content">
            <div class="cancel-btn-container">
                <button class="cancel-btn cancel-tower-info-btn">←</button>
            </div>
            
            <h3>${capitalize(tower.towerName)} Tower</h3>

            <pre style="font-size: 9px;">${JSON.stringify(tower.blueprint, null, 2)}</pre>

        </div>
    `,
    confirmTowerUpgrade: (tower: Tower) => {
        const t = tower.blueprint;
        const t2 = TOWER_BLUEPRINTS[tower.towerName][tower.blueprint.level];

        return `
        <div class="${ModalType.ConfirmTowerUpgrade} ${tower.towerName} modal-content">
            <div class="cancel-btn-container">
                <button class="cancel-btn cancel-tower-upgrade-btn">←</button>
            </div>

            <h3>Upgrade ${capitalize(tower.towerName)} Tower</h3>

            <h2>Cost $${tower.blueprint.price}</h2>
            
            <div>
                <div>Level ${t.level} → ${t2.level}</div>
                <div>Damage ${t.damage.join(" - ")} → ${t2.damage.join(" - ")}</div>
                <div>FireRate ${t.fireRate} → ${t2.fireRate}</div>
                <div>Range ${t.range} → ${t2.range}</div>
            </div>


            <div class="warning-msg-area"></div>

            <div>
                <button class="confirm-tower-upgrade-btn">Confirm!</button>
            </div>
        </div>
    `;
    },
} as const;

export const beaconTemplate = {
    callWave: () => {
        return `
            <div id="call-wave-beacon">
                <!-- <h4>Call Wave!</h4> -->
                <img src="${imgs.CallWave}" width="65px" height="65px" />
                <div id="arrow-down"></div>
            </div>
        `;
    },
};

export const gameEndTemplates = {
    gameWin: (stars: LevelStarCount) => `
        <h2>You Win!</h2>
        <div id="earned-stars">${getStarIcons(stars)}</div>
        <button id="confirm-end-game-btn">Ok</button>
    `,
    gameLose: () => `
        <h2>You Lose!</h2>
        <button id="confirm-end-game-btn">Ok</button>
    `,
};

export const speedBtnsTemplate = {
    speedBtns: () => `
            <label for="speed-1x">1x</label>
            <input type="radio" name="speed" id="speed-1x" />
            <label for="speed-2x">2x</label>
            <input type="radio" name="speed" id="speed-2x" />
            <label for="speed-4x">4x</label>
            <input type="radio" name="speed" id="speed-4x" />
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

// <pre style="font-size: 9px;">${JSON.stringify(tower.blueprint, null, 2)}</pre>
