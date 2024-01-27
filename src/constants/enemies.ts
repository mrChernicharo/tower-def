import { EnemyType } from "../shared/enums";
import { EnemyBluePrint } from "../shared/types";

export const ENEMY_BLUEPRINTS: { [k in EnemyType]: EnemyBluePrint } = {
    // ground enemies
    // spider: {
    //     name: EnemyType.Spider,
    //     reward: 5,
    //     modelURL: "/assets/glb/enemies/spider.glb",
    //     speed: 3,
    //     maxHp: 40,
    //     modelScale: 80,
    //     walkAnimationName: "Wolf Runner Armature|Runner running",
    // },
    runner: {
        name: EnemyType.Runner,
        reward: 5,
        modelURL: "/assets/glb/enemies/Tribal.gltf",
        speed: 3,
        maxHp: 40,
        modelScale: 0.5,
        walkAnimationName: "Run",
    },
    wizard: {
        name: EnemyType.Wizard,
        reward: 35,
        modelURL: "/assets/glb/enemies/Wizard.gltf",
        speed: 1,
        maxHp: 130,
        modelScale: 0.8,
        // modelScale: 1,
        walkAnimationName: "Walk",
    },
    dino: {
        name: EnemyType.Dino,
        reward: 8,
        modelURL: "/assets/glb/enemies/Dino.gltf",
        speed: 1.5, // mid
        maxHp: 60,
        modelScale: 0.8,
        // modelScale: 1,
        walkAnimationName: "Walk",
    },
    orc: {
        name: EnemyType.Orc,
        reward: 10,
        modelURL: "/assets/glb/enemies/Orc.gltf",
        speed: 1,
        maxHp: 200,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    demon: {
        name: EnemyType.Demon,
        reward: 25,
        modelURL: "/assets/glb/enemies/Demon.gltf",
        speed: 2,
        maxHp: 160,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    tribal: {
        name: EnemyType.Tribal,
        reward: 20,
        modelURL: "/assets/glb/enemies/Tribal.gltf",
        speed: 1,
        maxHp: 400,
        modelScale: 1.2,
        walkAnimationName: "Walk",
    },
    ninja: {
        name: EnemyType.Ninja,
        reward: 16,
        modelURL: "/assets/glb/enemies/Ninja.gltf",
        speed: 4,
        maxHp: 140,
        modelScale: 1,
        walkAnimationName: "Run",
    },
    alien: {
        name: EnemyType.Alien,
        reward: 17,
        modelURL: "/assets/glb/enemies/Alien.gltf",
        speed: 1,
        maxHp: 900,
        modelScale: 1,
        walkAnimationName: "Walk",
    },
    demonBoss: {
        name: EnemyType.DemonBoss,
        reward: 10,
        modelURL: "/assets/glb/enemies/Demon.gltf",
        speed: 1,
        maxHp: 3000,
        modelScale: 2,
        walkAnimationName: "Walk",
    },

    // flying enemies
    bee: {
        name: EnemyType.Bee,
        reward: 6,
        modelURL: "/assets/glb/enemies/Bee.gltf",
        speed: 2,
        maxHp: 60,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    squidle: {
        name: EnemyType.Squidle,
        reward: 7,
        modelURL: "/assets/glb/enemies/Squidle.gltf",
        speed: 2,
        maxHp: 100,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    ghost: {
        name: EnemyType.Ghost,
        reward: 8,
        modelURL: "/assets/glb/enemies/Ghost.gltf",
        speed: 2,
        maxHp: 140,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    dragon: {
        name: EnemyType.Dragon,
        reward: 35,
        modelURL: "/assets/glb/enemies/Dragon.gltf",
        speed: 1,
        maxHp: 480,
        modelScale: 1,
        walkAnimationName: "Flying_Idle",
    },
    // elf: {
    //     name: EnemyType.Elf,
    //     reward: 32,
    //     modelURL: "/assets/glb/enemies/Elf.gltf",
    //     speed: 1,
    //     maxHp: 280,
    //     modelScale: 1,
    //     walkAnimationName: "Walk",
    // },
} as const;

/**
 * desert:
 * - dino,  ninja, squidle, bee
 *
 * forest
 * - runner, wizard, orc, tribal, bee, ghost
 *
 * winter
 * - alien, ninja, orc, wizard, ghost
 *
 * lava
 * - demon, dino, tribal, dragon, squidle, demonBoss
 */
