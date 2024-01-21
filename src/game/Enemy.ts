/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSS2DObject, GLTF } from "three/examples/jsm/Addons.js";
import { ENEMY_MODELS, slowOutlinePass, pathCurves, poisonOutlinePass } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { AppLayers, EnemyType } from "../shared/enums";
import { EnemyBluePrint } from "../shared/types";
import { BLIZZARD_SLOW_DURATION, MATERIALS, MAX_FOV } from "../shared/constants/general";
import { idMaker } from "../shared/helpers";
import { SkinnedMesh } from "three";
import { ENEMY_BLUEPRINTS } from "../shared/constants/enemies";

const flightHeight = 3;
const hpBarHeight = 4;
const FLYING_ENEMY_NAMES = ["bee", "ghost", "squidle", "dragon"];

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
    hp: number;
    timeSinceSpawn!: number;
    originalMaterial!: THREE.Material;
    path: THREE.CatmullRomCurve3;
    skinnedMeshes: THREE.SkinnedMesh[] = [];
    hpBar3D!: CSS2DObject;
    hpBarContainer!: HTMLDivElement;
    hpBar!: HTMLDivElement;
    isSlowed = false;
    timeSinceSlowed = 0;
    slowedBy = 0;
    slowDuration = 0;
    isPoisoned = false;
    constructor(enemyType: EnemyType, pathIdx = 0, fov: number) {
        this.id = idMaker();
        this.enemyType = enemyType;
        this.bluePrint = { ...ENEMY_BLUEPRINTS[this.enemyType] };
        this.hp = this.bluePrint.maxHp;
        this.path = pathCurves[pathIdx];
        this.#_init();
        this.updateHpBarLengthToMatchZoom(fov);
    }

    #_init() {
        this.model = this.#_setupModel();
        this.model.visible = false;
        this.mixer = new THREE.AnimationMixer(this.model);

        // if (this.enemyType === EnemyType.Raptor2) {
        //     this.mixer.timeScale = 0.4;
        // }

        const walkClip = this.glb.animations.find((anim) => anim.name === this.bluePrint.walkAnimationName)!;
        const walkAction = this.mixer.clipAction(walkClip);
        walkAction.play();

        // if (this.enemyType === EnemyType.Raptor || this.enemyType === EnemyType.Raptor2) {
        //     const idleClip = this.glb.animations.find((anim) => anim.name === "Idling")!;
        //     const idleAction = this.mixer.clipAction(idleClip);
        //     idleAction.play();
        // }

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
                obj.layers.disableAll();
                if (obj.type === "SkinnedMesh") {
                    const mesh = obj as SkinnedMesh;
                    // mesh.castShadow = true;
                    obj.layers.enable(AppLayers.EnemyInternals);

                    this.skinnedMeshes.push(mesh);
                    if (!this.originalMaterial) {
                        this.originalMaterial = mesh.material as THREE.Material;
                        // this.originalMaterial.emissive.setHex("0xffffff");
                    }
                }
            }
        });

        // hpBar
        this.hpBarContainer = document.createElement("div");
        this.hpBar = document.createElement("div");
        this.hpBarContainer.className = "hp-bar-container";
        this.hpBar.className = "hp-bar";
        this.hpBar.style.width = "100%";

        this.hpBar3D = new CSS2DObject(this.hpBarContainer);

        this.hpBarContainer.append(this.hpBar);

        if (this.enemyType === EnemyType.Spider) {
            this.hpBar3D.position.y = 2;
            this.hpBar3D.position.z = 1;
            model.children[0].children[0].children[0].add(this.hpBar3D);
        } else {
            this.hpBar3D.position.y = hpBarHeight;
            model.add(this.hpBar3D);
        }

        this.hpBar3D.visible = false;

        // flying enemies shadow
        if (FLYING_ENEMY_NAMES.includes(this.enemyType)) {
            const shadow = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.25), MATERIALS.transparentBlack);
            shadow.name = "EnemyShadow";
            shadow.position.y = -flightHeight;
            model.add(shadow);
        }

        return model;
    }

    tick(delta: number) {
        if (!this.ready()) return;

        if (!this.model.visible) {
            this.model.visible = true;
            // console.log("spawned", this, this.hpBar, this.hpBar3D);
        }

        if (this.isSlowed) {
            this.timeSinceSpawn += delta * (1 - this.slowedBy);
            this.mixer.update(delta * (1 - this.slowedBy));
            this.timeSinceSlowed += delta;
        } else {
            this.timeSinceSpawn += delta;
            this.mixer.update(delta);
        }

        this.handleEnemyMovement();
    }

    getFuturePosition(timeInSecs: number) {
        let t = this.getPercDist(timeInSecs);
        if (t > 1) t = 1;
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
            // case "knight":
            // case "elf":
            case "orc":
            case "alien":
            case "demon":
            case "demonBoss":
            case "dino":
            case "tribal":
            case "ninja": {
                const zeroYTan = new THREE.Vector3(tangent.x, 0, tangent.z);
                this.model.lookAt(position.clone().add(zeroYTan));
                break;
            }
            case "bee":
            case "ghost":
            case "squidle":
            case "dragon": {
                // flying
                const zeroYTan = new THREE.Vector3(tangent.x, 0, tangent.z);
                this.model.lookAt(position.clone().add(zeroYTan));
                this.model.position.y = flightHeight;
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
        if (this.model && this.hp > 0) {
            this.#_drawDamageEfx();
        }

        if (!this.hpBar3D.visible) {
            this.hpBar3D.visible = true;
        }

        this.hpBar.style.width = (this.hp / this.bluePrint.maxHp) * 100 + "%";

        if (this.hp <= 0) this.destroy(false);
    }

    setPoisoned() {
        if (!this.isPoisoned) {
            this.skinnedMeshes.forEach((obj) => {
                poisonOutlinePass.selectedObjects.push(obj);
                // console.log("setSlowed", obj.uuid);
            });
        }
        this.isPoisoned = true;
    }
    healPoison() {
        this.isPoisoned = false;
        this.skinnedMeshes.forEach((obj) => {
            const outlineObjIdx = poisonOutlinePass.selectedObjects.findIndex((o) => o.uuid === obj.uuid);
            if (outlineObjIdx > -1) {
                poisonOutlinePass.selectedObjects.splice(outlineObjIdx, 1);
            }
        });
    }

    setSlowed({ slowPower = 0.5, duration = BLIZZARD_SLOW_DURATION }) {
        if (!this.isSlowed) {
            this.skinnedMeshes.forEach((obj) => {
                slowOutlinePass.selectedObjects.push(obj);
                // console.log("setSlowed", obj.uuid);
            });
        }
        this.isSlowed = true;
        if (slowPower > this.slowedBy) this.slowedBy = slowPower;
        if (duration > this.slowDuration) this.slowDuration = duration;
        this.timeSinceSlowed = 0;
    }
    healSlow() {
        this.isSlowed = false;
        this.skinnedMeshes.forEach((obj) => {
            const outlineObjIdx = slowOutlinePass.selectedObjects.findIndex((o) => o.uuid === obj.uuid);
            if (outlineObjIdx > -1) {
                slowOutlinePass.selectedObjects.splice(outlineObjIdx, 1);
            }
        });
        this.slowedBy = 0;
        this.slowDuration = 0;
        this.timeSinceSlowed = 0;
    }

    updateHpBarLengthToMatchZoom(fov: number) {
        let rate = 1 - fov / MAX_FOV;
        if (rate > 1) rate = 1;
        if (rate < 0.2) rate = 0.2;

        const width = THREE.MathUtils.lerp(10, 90, rate);
        // console.log("updateHpBarLengthToMatchZoom", { fov, rate, width });
        this.hpBarContainer.style.width = width + "px";
    }

    #_drawDamageEfx() {
        // console.log("_drawDamageEfx", { enemyMesh, originalMaterial: this.originalMaterial });
        try {
            this.skinnedMeshes.forEach((obj) => {
                // (obj.material as any).emissive.setHex(0xff0000);
                (obj as THREE.Mesh).material = MATERIALS.damageMaterialStd;
            });
        } catch (error) {
            console.error({ error });
        } finally {
            setTimeout(() => {
                this.skinnedMeshes.forEach((obj) => {
                    (obj as THREE.Mesh).material = this.originalMaterial;
                    // (obj.material as any).emissive.setHex(0xfffff);
                });
            }, 160);
        }
    }

    destroy(endReached: boolean) {
        this.hpBarContainer.remove();
        window.dispatchEvent(new CustomEvent("enemy-destroyed", { detail: { enemy: this, endReached } }));
    }
}
