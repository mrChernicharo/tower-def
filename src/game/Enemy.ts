/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLTF } from "three/examples/jsm/Addons.js";
import { ENEMY_MODELS, slowOutlinePass, pathCurves, poisonOutlinePass } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { AppLayers, EnemyType } from "./enums";
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
    poisonMaterial: { meshName: string; material: THREE.Material }[] = [];
    path: THREE.CatmullRomCurve3;
    isPoisoned = false;
    isSlowed = false;
    timeSinceSlowed = 0;
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
                this.poisonMaterial.push({
                    meshName: obj.name,
                    material: MATERIALS.poisonDmgMaterialStd,
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
        model.layers.disableAll();
        model.layers.enable(AppLayers.Enemy);

        model.traverse((obj) => {
            if ((obj as any).isMesh) {
                obj.castShadow = true;
                obj.layers.disableAll();
                obj.layers.enable(AppLayers.Enemy);
            }
        });

        return model;
    }

    tick(delta: number) {
        if (!this.ready()) return;

        if (!this.model.visible) {
            this.model.visible = true;
        }

        if (this.isSlowed) {
            this.timeSinceSpawn += delta / 2;
            this.mixer.update(delta / 2);
            this.timeSinceSlowed += delta;
        } else {
            this.timeSinceSpawn += delta;
            this.mixer.update(delta);
        }

        this.handleEnemyMovement();
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
        let distPerc = distCovered / pathLen;

        if (distPerc > 1 && !this.#endReached) {
            distPerc = 1;
            this.#endReached = true;
            this.destroy(true);
        }

        // console.log({ pathLen, distCovered, distPerc });
        return distPerc;
    }

    takeDamage(dmg: number) {
        this.hp -= dmg;

        // console.log("takeDamage", dmg, this.hp);

        // if (this.model && this.hp > 0) {
        //     this.#_drawDamageEfx();
        // }

        if (this.hp <= 0) this.destroy(false);
    }

    setPoisoned() {
        if (!this.isPoisoned) {
            this.model.traverse((obj) => {
                if ((obj as any).isMesh && obj.type === "SkinnedMesh") {
                    poisonOutlinePass.selectedObjects.push(obj);
                    console.log("setSlowed", obj.uuid);
                }
            });
        }
        this.isPoisoned = true;
    }
    healPoison() {
        this.isPoisoned = false;
        this.model.traverse((obj) => {
            if ((obj as any).isMesh && obj.type === "SkinnedMesh") {
                const outlineObjIdx = poisonOutlinePass.selectedObjects.findIndex((o) => o.uuid === obj.uuid);
                if (outlineObjIdx > -1) {
                    poisonOutlinePass.selectedObjects.splice(outlineObjIdx, 1);
                }
            }
        });
    }

    setSlowed() {
        if (!this.isSlowed) {
            this.model.traverse((obj) => {
                if ((obj as any).isMesh && obj.type === "SkinnedMesh") {
                    slowOutlinePass.selectedObjects.push(obj);
                    console.log("setSlowed", obj.uuid);
                }
            });
        }
        this.isSlowed = true;
        this.timeSinceSlowed = 0;
    }
    healSlow() {
        this.isSlowed = false;
        this.model.traverse((obj) => {
            if ((obj as any).isMesh && obj.type === "SkinnedMesh") {
                const outlineObjIdx = slowOutlinePass.selectedObjects.findIndex((o) => o.uuid === obj.uuid);
                if (outlineObjIdx > -1) {
                    slowOutlinePass.selectedObjects.splice(outlineObjIdx, 1);
                }
            }
        });
        this.timeSinceSlowed = 0;
    }

    // #_drawDamageEfx() {
    //     // console.log("_drawDamageEfx", { enemyMesh, originalMaterial: this.originalMaterial });
    //     try {
    //         // enemyMesh.material = MATERIALS.damageMaterialStd;
    //         this.model.traverse((obj) => {
    //             if ((obj as any).isMesh) {
    //                 (obj as THREE.Mesh).material = MATERIALS.damageMaterialStd;
    //             }
    //         });
    //     } catch (error) {
    //         console.error({ error });
    //     } finally {
    //         setTimeout(() => {
    //             this.model.traverse((obj) => {
    //                 if ((obj as any).isMesh) {
    //                     const found = this.isPoisoned
    //                         ? this.poisonMaterial.find((entry) => entry.meshName === obj.name)
    //                         : this.originalMaterial.find((entry) => entry.meshName === obj.name);
    //                     if (found) {
    //                         (obj as THREE.Mesh).material = found.material;
    //                     }
    //                 }
    //             });
    //         }, 160);
    //     }
    // }

    destroy(endReached: boolean) {
        window.dispatchEvent(new CustomEvent("enemy-destroyed", { detail: { enemy: this, endReached } }));
    }
}
