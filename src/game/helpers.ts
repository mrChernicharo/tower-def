/* eslint-disable @typescript-eslint/no-unused-vars */
import { EnemyChar, EnemyType, TowerType } from "./enums";
import { THREE } from "../three";
import { GLTF } from "three/examples/jsm/Addons.js";
import { allAreaLevels, gameSkills } from "./constants";
import { LevelStarCount, LevelStarMap, PlayerSkills, Skill } from "./types";

export function getEnemyTypeFromChar(char: EnemyChar): EnemyType {
    switch (char) {
        case "r":
            return EnemyType.Raptor;
        case "r2":
            return EnemyType.Raptor2;
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

export function getProjectileTowerName(modelName: string) {
    switch (true) {
        case modelName.includes("Ballista"):
            return TowerType.Ballista;
        case modelName.includes("Caoon"):
            return TowerType.Cannon;
        case modelName.includes("poison"):
            return TowerType.Poison;
        case modelName.includes("wizard"):
            return TowerType.Wizard;
        case modelName.includes("Archer"):
        default:
            return TowerType.Archer;
    }
}

/** wait for x milliseconds */
export const wait = async (timeInMilliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));
};

export function getTotalStageCount() {
    let count = 0;
    for (const area of Object.keys(allAreaLevels)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        allAreaLevels[area as keyof typeof allAreaLevels].forEach((_) => {
            count++;
        });
    }
    return count;
}

export function calcEarnedStarsForGameWin(hp: number) {
    if (hp >= 9) return 3;
    else if (hp >= 5) return 2;
    else return 1;
}

// export function getStarIcons(stars: LevelStarCount) {
//     switch (stars) {
//         case 1:
//             return "★ ☆ ☆";
//         case 2:
//             return "★ ★ ☆";
//         case 3:
//             return "★ ★ ★";
//         case 0:
//         default:
//             return "☆ ☆ ☆";
//     }
// }

export function getStarIcons(stars: LevelStarCount) {
    switch (stars) {
        case 1:
            return "★";
        case 2:
            return "★ ★";
        case 3:
            return "★ ★ ★";
        case 0:
        default:
            return "";
    }
}
export function getAreaByLevel(level: number) {
    if (level < 4) return "desert";
    if (level > 3 && level < 8) return "forest";
    if (level > 8 && level < 12) return "winter";
    else return "lava";
}

export function getUnlockedStages(stars: LevelStarMap) {
    return stars.filter((v) => v > 0).length;
}

export function getSkillInfo(skillId: string) {
    const skillPath = skillId.split("-")[0];
    const skillLevel = Number(skillId.split("-")[1]);
    return { skillPath, skillLevel };
}

export function getEarnedStars(stars: number[]) {
    return stars.reduce((acc, next) => acc + next, 0);
}

export function getSpentStars(skills: PlayerSkills) {
    return Object.entries(skills)
        .filter(([_id, bool]) => bool)
        .reduce(
            (acc, [id, _bool]) =>
                acc + gameSkills[id.split("-")[0] as keyof typeof gameSkills].find((s) => s.id === id)!.starCost,
            0
        );
}
