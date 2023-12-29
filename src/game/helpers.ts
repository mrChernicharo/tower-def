// export function makeWaveEnemy(enemyType: EnemyType, spawnAt: number) {
//     const enemy = new Enemy(enemyType);
// }

import { EnemyChar, EnemyType, ModalType, TowerName } from "./enums";
import { THREE } from "../three";
import { GLTF } from "three/examples/jsm/Addons.js";
import { cancelableModalNames, modalTemplates } from "./templates";

export function getEnemyTypeFromChar(char: EnemyChar): EnemyType {
    switch (char) {
        case "r":
            return EnemyType.Raptor;
        case "o":
            return EnemyType.Orc;
        case "z":
            return EnemyType.Soldier;
        case "b":
            return EnemyType.Brigand;
        case "w":
            return EnemyType.Warrior;
        case "s":
        default:
            return EnemyType.Spider;
    }
}

export function handleModelGun(model: GLTF) {
    if (model.userData.enemyType === "soldier") {
        equipGun(model.scene, "Knife_1");
    }
    if (model.userData.enemyType === "brigand") {
        equipGun(model.scene, "Shovel");
    }
    if (model.userData.enemyType === "warrior") {
        equipGun(model.scene, "Knife_2");
    }
}

export function equipGun(model: THREE.Group, gunName: string) {
    // console.log("======================");
    const handObject = model.getObjectByName("Index1R")!;

    [...handObject.children].forEach((gunObj) => {
        // console.log(gunObj.name);
        if (gunObj.name !== gunName) {
            gunObj.visible = false;
        }
    });
}

export function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}

// idMaker
const ID_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

export const idMaker = (length = 12) =>
    Array(length)
        .fill(0)
        .map(() => ID_CHARS.split("")[Math.round(Math.random() * ID_CHARS.length)])
        .join("");

export function revertCancelableModals(clickedModal: HTMLDivElement | undefined) {
    const allModals = Array.from(document.querySelectorAll<HTMLDivElement>(".modal2D"));
    // console.log("REVERT CANCELABLE MODALS");
    // console.log(":::", { allModals, e, clickedTowerBase, clickedModal });
    allModals.forEach((modalEl) => {
        if (modalEl === clickedModal) return;
        // console.log(":::", { modalEl });

        for (const cancelableModalName of cancelableModalNames) {
            if (modalEl.children[0].classList.contains(cancelableModalName)) {
                // console.log(":::: cancel this one!", { cancelableModalName, modalEl });

                if (cancelableModalName === ModalType.ConfirmTowerBuild) {
                    modalEl.innerHTML = modalTemplates.towerBuild();
                } else {
                    for (const className of modalEl.children[0].classList.entries()) {
                        if (className[1] in TowerName) {
                            const towerName = className[1] as TowerName;
                            // const tower =
                            console.log({ modalEl });
                            modalEl.innerHTML = modalTemplates.towerDetails(towerName);
                        }
                    }
                }
                break;
            }
        }
    });
}
