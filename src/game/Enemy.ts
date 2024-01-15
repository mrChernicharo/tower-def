/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF } from "three/examples/jsm/Addons.js";
import { ENEMY_MODELS, pathCurves } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";
import { ENEMY_BLUEPRINTS, MATERIALS } from "./constants";
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
    originalMaterial: { meshName: string; material: THREE.Material }[] = [];
    path: THREE.CatmullRomCurve3;

    constructor(enemyType: EnemyType, pathIdx = 0) {
        this.id = idMaker();
        this.enemyType = enemyType;
        this.bluePrint = { ...ENEMY_BLUEPRINTS[this.enemyType] };
        this.hp = this.bluePrint.maxHp;
        this.path = pathCurves[pathIdx];
        this.#_init();
    }

    #_init() {
        this.model = this.#_setupModel();
        this.model.visible = false;
        // console.log(this.model);
        this.model.traverse((obj) => {
            if ((obj as any).isMesh) {
                this.originalMaterial.push({
                    meshName: obj.name,
                    material: ((obj as THREE.Mesh).material as THREE.Material).clone(),
                });
                return;
            }
        });

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

        model.traverse((obj) => {
            if ((obj as any).isMesh) {
                obj.castShadow = true;
            }
        });

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
        return this.path.getPointAt(t);
    }

    ready() {
        return this.#ready;
    }

    handleEnemyMovement() {
        const t = this.getPercDist();
        const position = this.path.getPointAt(t);
        const tangent = this.path.getTangentAt(t);

        this.model.position.copy(position);

        switch (this.enemyType) {
            case "spider": {
                this.model.lookAt(position.clone().sub(tangent));
                break;
            }
            case "orc": {
                const zeroYTan = new THREE.Vector3(tangent.x, 0, tangent.z);
                this.model.lookAt(position.clone().add(zeroYTan));
                this.model.position.y += 3;
                break;
            }
            case "raptor":
            case "raptor2": {
                const zeroYTan = new THREE.Vector3(tangent.x, 0, tangent.z);
                this.model.lookAt(
                    position.clone().add(zeroYTan.applyAxisAngle(this.model.up, -Math.PI * 0.5).add(zeroYTan))
                );
                this.model.position.y += 0.1;
                break;
            }
            case "soldier":
            case "brigand":
            case "warrior": {
                const zeroYTan = new THREE.Vector3(tangent.x, 0, tangent.z);
                this.model.lookAt(position.clone().add(zeroYTan));
                this.model.position.y += 0.175;
                break;
            }
            default:
                this.model.lookAt(position.clone().sub(tangent));
                break;
        }
    }

    getPercDist(timeInSecs = 0) {
        const pathLen = this.path.getLength();
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

        // console.log("takeDamage", dmg, this.hp);

        if (this.model && this.hp > 0)
            this.model.traverse((obj) => {
                if ((obj as any).isMesh) {
                    this.#_drawDamageEfx(obj as THREE.Mesh);
                }
            });

        if (this.hp <= 0) this.destroy(false);
    }

    #_drawDamageEfx(enemyMesh: THREE.Mesh) {
        // console.log("_drawDamageEfx", { enemyMesh, originalMaterial: this.originalMaterial });
        try {
            enemyMesh.material = MATERIALS.damageMaterialStd;
        } catch (error) {
            console.error({ error });
        } finally {
            setTimeout(() => {
                this.model.traverse((obj) => {
                    if ((obj as any).isMesh) {
                        const found = this.originalMaterial.find((entry) => entry.meshName === obj.name);
                        if (found) {
                            (obj as THREE.Mesh).material = found.material;
                        }
                    }
                });
            }, 160);
        }
    }

    destroy(endReached: boolean) {
        window.dispatchEvent(new CustomEvent("enemy-destroyed", { detail: { enemy: this, endReached } }));
    }
}
