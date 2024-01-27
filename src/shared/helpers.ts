/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EnemyChar, EnemyType, TowerType } from "./enums";
import { THREE } from "../three";
import { GLTF } from "three/examples/jsm/Addons.js";
import { LevelStarCount, LevelStarMap, PlayerSkillIDsMap, WaveEnemy, LaneChar, FormationType } from "./types";
import { Enemy } from "../game/Enemy";
import { GAME_SKILLS } from "../constants/skills";
import { allAreaLevels } from "../constants/levels/levels";
import { ENEMY_BLUEPRINTS } from "../constants/enemies";
import { STAGE_WAVES_DATA } from "../constants/levels/waves";

export function getEnemyTypeFromChar(char: EnemyChar): EnemyType {
    switch (char) {
        case "o":
            return EnemyType.Orc;
        case "a":
            return EnemyType.Alien;
        case "dm":
            return EnemyType.Demon;
        case "db":
            return EnemyType.DemonBoss;
        case "dn":
            return EnemyType.Dino;
        // case "k":
        //     return EnemyType.Knight;
        case "w":
            return EnemyType.Wizard;
        case "t":
            return EnemyType.Tribal;
        case "n":
            return EnemyType.Ninja;
        // case "e":
        //     return EnemyType.Elf;
        case "b":
            return EnemyType.Bee;
        case "g":
            return EnemyType.Ghost;
        case "dr":
            return EnemyType.Dragon;
        case "s":
            return EnemyType.Squidle;
        case "r":
        default:
            return EnemyType.Runner;
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

export function rowDice(sides = 6) {
    return Math.floor(Math.random() * sides);
}

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
    if (level > 7 && level < 12) return "winter";
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

export function getSpentStars(skills: PlayerSkillIDsMap) {
    return Object.entries(skills)
        .filter(([_id, bool]) => bool)
        .reduce(
            (acc, [id, _bool]) =>
                acc + GAME_SKILLS[id.split("-")[0] as keyof typeof GAME_SKILLS].find((s) => s.id === id)!.starCost,
            0
        );
}

export function getD(radius: number, startAngle: number, endAngle: number) {
    const isCircle = endAngle - startAngle === 360;
    if (isCircle) {
        endAngle--;
    }
    const start = polarToCartesian(radius, startAngle);
    const end = polarToCartesian(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y];
    if (isCircle) {
        d.push("Z");
    } else {
        d.push("L", radius, radius, "L", start.x, start.y, "Z");
    }
    return d.join(" ");
}

function polarToCartesian(radius: number, angleInDegrees: number) {
    const radians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
        x: radius + radius * Math.cos(radians),
        y: radius + radius * Math.sin(radians),
    };
}

export function applyAreaDamage(enemies: Enemy[], pos: THREE.Vector3, radius: number, damage: number) {
    const enemiesHit = enemies.filter((e) => e.model.position.distanceTo(pos) < radius);

    enemiesHit.forEach((e) => {
        const dist = e.model.position.distanceTo(pos);
        const percDist = (radius - dist) / radius;
        const fullHit = percDist >= 0.65;
        if (fullHit) {
            e.takeDamage(damage);
        } else {
            e.takeDamage(damage / 2);
        }
        // console.log(e.id, { dist, percDist, fullHit, damage });
    });
    // console.log("applyAreaDamage", { enemies, enemiesHit, pos, splashRadius, radius });
    return enemiesHit;
}

export function determineDamage(damage: [number, number]) {
    return Math.round(THREE.MathUtils.lerp(damage[0], damage[1], Math.random()));
}

export function mousePosToWorldPos(mouseRay: THREE.Raycaster, scene: THREE.Scene) {
    const pos = new THREE.Vector3();
    mouseRay.intersectObjects(scene.children).forEach((ch) => {
        if (ch.object.name === "Plane") {
            if (!pos.x) pos.x = ch.point.x;
            if (!pos.y) pos.z = ch.point.z;
        } else {
            pos.y = ch.point.y;
            pos.x = ch.point.x;
            pos.z = ch.point.z;
        }
    });
    // console.log("mousePosToWorldPos", pos);
    return pos;
}

// prettier-ignore
export function isModal(obj: any) {
    return (
        (obj as any).isCSS2DObject &&
        obj.visible &&
        obj.name.includes("-modal") && 
        obj.name !== "call-wave-2D-modal"
    ); 
}

export function waveSegment(
    e: EnemyChar,
    enemyCount = 4,
    interval = 2,
    startSpawningAt = 0,
    pathIdx = 0,
    lane: LaneChar = "c"
): [EnemyChar, number, number, LaneChar][] {
    // console.log("waveSegment", { e, enemyCount, interval, startSpawningAt, xOffList });

    return Array.from({ length: enemyCount }, (_, index) => [e, pathIdx, index * interval + startSpawningAt, lane]);
}

export function getWaveStats(wave: WaveEnemy[], enemyBlueprints: typeof ENEMY_BLUEPRINTS) {
    // console.log(wave);
    let highestSpawnAt = -Infinity;
    const totalDmg = wave.reduce((p, n) => {
        if (n[2] > highestSpawnAt) highestSpawnAt = n[2];
        return (p += enemyBlueprints[getEnemyTypeFromChar(n[0] as EnemyChar)].maxHp);
    }, 0);
    return { totalDmg, highestSpawnAt };
}

export function printWavesStatistics(enemyBlueprints: typeof ENEMY_BLUEPRINTS) {
    // const TOP_LIMIT = 5;
    // const BOTTOM_LIMIT = 2;

    const res: any[] = [[0]];
    STAGE_WAVES_DATA.forEach((stage) => {
        // if (sIdx > TOP_LIMIT || sIdx < BOTTOM_LIMIT) return;

        const waves: any[] = [];
        stage.forEach((wave) => {
            const { totalDmg, highestSpawnAt } = getWaveStats(wave, enemyBlueprints);
            waves.push(`${totalDmg}-${highestSpawnAt}`);
            // waves.push(totalDmg, highestSpawnAt);
            // console.log({ wave: `${sIdx + 1}-${wIdx + 1}`, totalDmg });
        });
        res.push(waves);
    });

    console.table(res);
}

export function enemyFormations(
    formationType: FormationType,
    spawnAt: number,
    pathIdx: number,
    enemy: EnemyChar,
    eliteEnemy?: EnemyChar
): WaveEnemy[] {
    const enemyType = getEnemyTypeFromChar(enemy);
    const eSpeed = ENEMY_BLUEPRINTS[enemyType].speed;
    console.log({ eSpeed });

    let unit = 1;
    if (eSpeed === 1) {
        unit = 2;
    } else if (eSpeed === 1.5) {
        unit = 1;
    } else if (eSpeed === 2) {
        unit = 0.75;
    } else if (eSpeed === 3) {
        unit = 0.5;
    } else if (eSpeed === 4) {
        unit = 0.35;
    }

    switch (formationType) {
        case FormationType.Diamond: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
            ];

            if (eliteEnemy) {
                formation.push([eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
        case FormationType.DiamondFull: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
            ];

            if (eliteEnemy) {
                formation.splice(2, 1, [eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
        case FormationType.Square: {
            const formation: WaveEnemy[] = [
                [enemy, pathIdx, spawnAt, "l"],
                [enemy, pathIdx, spawnAt, "c"],
                [enemy, pathIdx, spawnAt, "r"],
                [enemy, pathIdx, spawnAt + 1 * unit, "l"],
                [enemy, pathIdx, spawnAt + 1 * unit, "c"],
                [enemy, pathIdx, spawnAt + 1 * unit, "r"],
                [enemy, pathIdx, spawnAt + 2 * unit, "l"],
                [enemy, pathIdx, spawnAt + 2 * unit, "c"],
                [enemy, pathIdx, spawnAt + 2 * unit, "r"],
            ];

            if (eliteEnemy) {
                formation.splice(4, 1, [eliteEnemy, pathIdx, spawnAt + 1 * unit, "c"]);
            }

            return formation;
        }
    }
}
