// export function makeWaveEnemy(enemyType: EnemyType, spawnAt: number) {
//     const enemy = new Enemy(enemyType);
// }

import { EnemyChar, EnemyType } from "./enums";
import { THREE } from "../three";
import { GLTF } from "three/examples/jsm/Addons.js";

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