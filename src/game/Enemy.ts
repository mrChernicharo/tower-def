/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF } from "three/examples/jsm/Addons.js";
import { ENEMY_MODELS, pathCurve } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";
import { ENEMY_BLUEPRINTS } from "./constants";
import { idMaker } from "./helpers";

export class Enemy {
    #ready = false;
    #endReached = false;
    id: string;
    glb!: GLTF;
    enemyType: EnemyType;
    bluePrint: EnemyBluePrint;
    mixer!: THREE.AnimationMixer;
    model!: THREE.Object3D;
    walkAnimation!: THREE.AnimationClip;
    futureGizmo!: THREE.Mesh;
    timestamp = Date.now();
    hp: number;
    timeSinceSpawn!: number;
    isHurt = false;

    constructor(enemyType: EnemyType) {
        this.id = idMaker();
        this.enemyType = enemyType;
        this.bluePrint = { ...ENEMY_BLUEPRINTS[this.enemyType] };
        this.hp = this.bluePrint.maxHp;

        this.#_init();
    }

    #_init() {
        this.model = this.#_setupModel();
        this.model.visible = false;

        this.mixer = new THREE.AnimationMixer(this.model);

        if (this.enemyType === EnemyType.Raptor2) {
            this.mixer.timeScale = 0.4;
        }

        const walkClip = this.glb.animations.find((anim) => anim.name === this.bluePrint.walkAnimationName)!;
        const walkAction = this.mixer.clipAction(walkClip);
        walkAction.play();

        this.timeSinceSpawn = 0;
        this.#ready = true;

        return this;
    }

    #_setupModel() {
        this.glb = ENEMY_MODELS[this.enemyType];

        const model = SkeletonUtils.clone(this.glb.scene);

        const s = this.bluePrint.modelScale;
        model.scale.set(s, s, s);

        return model;
    }

    tick(delta: number) {
        if (!this.ready()) return;

        if (!this.model.visible) {
            this.model.visible = true;
        }

        this.timeSinceSpawn += delta;
        this.mixer.update(delta);

        this.handleEnemyMovement();

        // if (DRAW_FUTURE_GIZMO) {
        //     if (!this.futureGizmo.visible) this.futureGizmo.visible = true;
        //     this._drawFuturePosition(1);
        // }
    }

    getFuturePosition(timeInSecs: number) {
        const t = this.getPercDist(timeInSecs);
        return pathCurve.getPointAt(t);
    }

    ready() {
        return this.#ready;
    }

    handleEnemyMovement() {
        const t = this.getPercDist();
        const position = pathCurve.getPointAt(t);
        const tangent = pathCurve.getTangentAt(t);

        this.model.position.copy(position);

        switch (this.enemyType) {
            case "spider":
                this.model.lookAt(position.clone().sub(tangent));
                break;
            case "orc":
                this.model.lookAt(position.clone().add(tangent));
                this.model.position.y += 3;
                break;
            case "raptor":
            case "raptor2":
                this.model.lookAt(
                    position.clone().add(tangent.applyAxisAngle(this.model.up, -Math.PI * 0.5).add(tangent))
                );
                this.model.position.y += 0.1;
                break;
            case "soldier":
            case "brigand":
            case "warrior":
                this.model.lookAt(position.clone().add(tangent));
                this.model.position.y += 0.175;
                break;
            default:
                this.model.lookAt(position.clone().sub(tangent));
                break;
        }
    }

    getPercDist(timeInSecs = 0) {
        const pathLen = pathCurve.getLength();
        const distCovered = this.bluePrint.speed * (this.timeSinceSpawn + timeInSecs);
        const distPerc = distCovered / pathLen;

        if (distPerc > 1 && !this.#endReached) {
            this.#endReached = true;
            this.destroy(true);
        }

        // console.log({ pathLen, distCovered, distPerc });
        return distPerc % 1;
    }

    takeDamage(dmg: number) {
        this.hp -= dmg;
        this.isHurt = true;

        setTimeout(() => {
            this.isHurt = false;
        }, 160);

        // console.log("takeDamage", dmg, this.hp);

        if (this.model)
            this.model.traverse((obj) => {
                if ((obj as any).isMesh && (obj as any).material) {
                    switch (this.enemyType) {
                        case EnemyType.Spider:
                            this.#_drawDamageEfx(obj, "MeshPhysicalMaterial");
                            break;
                        case EnemyType.Orc:
                        case EnemyType.Soldier:
                        case EnemyType.Brigand:
                        case EnemyType.Warrior:
                        case EnemyType.Raptor:
                        case EnemyType.Raptor2:
                            this.#_drawDamageEfx(obj, "MeshStandardMaterial");
                            break;
                        default:
                            // console.log(obj);
                            break;
                    }
                }
            });

        if (this.hp <= 0) this.destroy(false);
    }

    #_drawDamageEfx(obj: any, materialType: "MeshStandardMaterial" | "MeshPhysicalMaterial") {
        const enemyMesh = obj as THREE.Mesh;

        try {
            const material = new (THREE[materialType] as any)().copy(enemyMesh.material as any);

            enemyMesh.material = new THREE.MeshStandardMaterial({ color: "red" });

            setTimeout(() => {
                if (!this.isHurt) {
                    enemyMesh.material = material;
                }
            }, 160);

            // console.log({ obj, material });
        } catch (error) {
            console.log({ error });
        }
    }

    destroy(endReached: boolean) {
        window.dispatchEvent(new CustomEvent("enemy-destroyed", { detail: { enemy: this, endReached } }));
    }
}
