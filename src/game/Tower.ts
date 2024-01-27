/* eslint-disable @typescript-eslint/no-unused-vars */
import { MATERIALS } from "../constants/general";
import { AppLayers, TargetingStrategy, TowerType, TrajectoryType } from "../shared/enums";
import { TOWER_MODELS } from "./game";
import { idMaker } from "../shared/helpers";
import { PlayerSkills, TowerBluePrint } from "../shared/types";
import { THREE } from "../three";
import { Enemy } from "./Enemy";
import { StraightProjectile, ParabolaProjectile } from "./Projectile";
import { TOWER_BLUEPRINTS, PROJECTILE_BLUEPRINTS } from "../constants/towers-and-projectiles";
import { Vector3 } from "three";
import { sound } from "../constants/sounds";

const estimatedTimeToTarget = 1;
const turnSpeed = 0.05;

export class Tower {
    id: string;
    cooldown: number;
    towerName: TowerType;
    position: THREE.Vector3;
    model!: THREE.Group;
    firePoint!: THREE.Vector3;
    bodyMesh!: THREE.Mesh;
    headMesh: THREE.Mesh | undefined;
    blueprint: TowerBluePrint;
    tileIdx: string;
    range!: number;
    damage!: [number, number];
    price!: number;
    rateOfFire!: number;
    rangeGizmo!: THREE.Mesh;
    strategy: TargetingStrategy;
    targetLocked = false;
    damageDealt = 0;
    constructor(towerType: TowerType, position: THREE.Vector3, tileIdx: string, playSound = true) {
        this.id = idMaker();
        this.towerName = towerType;
        this.position = position;
        this.tileIdx = tileIdx;
        this.cooldown = 0;
        this.blueprint = { ...TOWER_BLUEPRINTS[towerType][0] };
        this.strategy = this.blueprint.defaultStrategy;
        if (playSound) sound.build();

        this._init();
    }

    async _init() {
        await this._setupModel();
        console.log("created tower", this);
        return this;
    }

    async _setupModel() {
        this.model = TOWER_MODELS[this.towerName]["level-1"].clone();
        this.model.userData["tower_id"] = this.id;
        this.model.userData["tile_idx"] = this.tileIdx;

        this._setupModelData();
        this._setupRangeGizmo();
    }

    _setupModelData() {
        this.damage = this.blueprint.damage;
        this.range = this.blueprint.range;
        this.rateOfFire = this.blueprint.fireRate;
        this.price = this.blueprint.price;

        this.model.userData["tower_level"] = this.blueprint.level;
        this.model.layers.set(AppLayers.Tower);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
        const s = this.blueprint.modelScale;
        this.model.scale.set(s, s, s);

        this.model.traverse((obj) => {
            //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //     if ((obj as any).isMesh) {
            //         obj.castShadow = true;
            //      }
            // console.log({ obj });
            obj.userData["tower_id"] = this.id;
            obj.userData["tower_level"] = this.blueprint.level;
            obj.userData["tile_idx"] = this.tileIdx;

            if (obj.name.includes("_Body")) {
                this.bodyMesh = obj as THREE.Mesh;
            }
            if (obj.name.includes("_Head")) {
                this.headMesh = obj as THREE.Mesh;
            }
        });

        this.firePoint = new Vector3(
            this.model.position.x,
            this.model.position.y + this.blueprint.firePointY,
            this.model.position.z
        );

        // this.firePoint = new Vector3(
        //     this.towerName === TowerType.Cannon ? this.model.position.x : this.model.position.x,
        //     this.model.position.y + this.blueprint.firePointY,
        //     this.towerName === TowerType.Cannon ? this.model.position.z + 1 : this.model.position.z
        // );
    }

    _setupRangeGizmo() {
        const circleGeometry = new THREE.CircleGeometry(this.range);
        const circleMaterial = MATERIALS.towerRangeGizmo(this.blueprint.color);
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
        circleMesh.position.set(this.position.x, this.position.y + 0.5, this.position.z);
        circleMesh.rotation.x = -Math.PI * 0.5;
        circleMesh.name = "rangeGizmo";

        this.rangeGizmo = circleMesh;
    }

    upgrade() {
        const currLevel = this.blueprint.level;
        const nextLevel = currLevel + 1;

        if (currLevel === 4) {
            throw Error("MAX LEVEL REACHED");
        }

        const desiredBlueprint = { ...TOWER_BLUEPRINTS[this.towerName][currLevel] };
        const desiredModel = TOWER_MODELS[this.towerName][`level-${nextLevel}`].clone();

        console.log("upgrade tower", {
            currLevel,
            currBlueprint: this.blueprint,
            currModel: this.model,
            currGizmo: this.rangeGizmo,
            nextLevel,
            desiredBlueprint,
            desiredModel,
        });

        this.blueprint = desiredBlueprint;
        this.model = desiredModel;

        this._setupModelData();
        this._setupRangeGizmo();
        sound.upgrade();

        return this;
    }

    getUpgradedPreview() {
        const currLevel = this.blueprint.level;
        const nextLevel = currLevel + 1;
        if (currLevel === 4) {
            throw Error("MAX LEVEL REACHED");
        }
        const desiredBlueprint = { ...TOWER_BLUEPRINTS[this.towerName][currLevel] };
        const desiredModel = TOWER_MODELS[this.towerName][`level-${nextLevel}`].clone();
        desiredModel.layers.set(AppLayers.Tower);
        desiredModel.position.set(this.position.x, this.position.y, this.position.z);
        const s = desiredBlueprint.modelScale;
        desiredModel.scale.set(s, s, s);

        console.log({
            currLevel,
            nextLevel,
            range: this.range,
            currRange: this.blueprint.range,
            desiredRange: desiredBlueprint.range,
        });

        // @TODO -> apply real range
        const circleGeometry = new THREE.CircleGeometry(desiredBlueprint.range);
        const circleMaterial = MATERIALS.towerRangeGizmo(desiredBlueprint.color);
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
        circleMesh.position.set(this.position.x, this.position.y + 0.5, this.position.z);
        circleMesh.rotation.x = -Math.PI * 0.5;
        circleMesh.name = "rangeGizmo Preview";
        // return new Tower(this.towerName, this.position, this.tileIdx);
        return { model: desiredModel, rangeGizmo: circleMesh };
    }

    tick(delta: number, target: Enemy | Enemy[] | undefined) {
        // MULTI-SHOT
        if (target instanceof Array) {
            if (this.cooldown <= 0) {
                target.forEach((e, i) => {
                    // console.log("ShoooT!", targetEnemy.enemyType);
                    this.fireProjectile(e, i !== 0);
                });
                this.cooldown = 1 / this.rateOfFire;
            }
        }
        // NORMAL-ONE-TARGET-SHOT
        else if (target instanceof Enemy) {
            if (this.headMesh) {
                this._rotateTowardsTarget(target);
            } else {
                this.targetLocked = true;
            }

            if (this.cooldown <= 0 && this.targetLocked) {
                // console.log("ShoooT!", targetEnemy.enemyType);
                this.fireProjectile(target);

                this.cooldown = 1 / this.rateOfFire;
            }
        }
        this.cooldown -= delta;
    }

    _rotateTowardsTarget(targetEnemy: Enemy) {
        if (!this.headMesh) return;

        const dx = this.model.position.x - targetEnemy.getFuturePosition(estimatedTimeToTarget).x;
        const dz = this.model.position.z - targetEnemy.getFuturePosition(estimatedTimeToTarget).z;

        let theta = Math.atan2(dz, dx) + Math.PI * 0.5;
        // let theta = Math.atan2(dz, dx) - Math.PI * 0.5;
        if (theta < 0) theta += Math.PI * 2;

        let rotationDiff = theta + this.headMesh.rotation.y;
        if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
        if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

        if (Math.abs(rotationDiff) < 0.02) {
            this.targetLocked = true;
            this.headMesh.rotation.y = theta * -1;
        } else {
            this.targetLocked = false;
            this.headMesh.rotation.y -= rotationDiff > 0 ? turnSpeed : -turnSpeed;
        }
    }

    fireProjectile(enemy: Enemy, isMultiShot = false) {
        const projBlueprint = { ...PROJECTILE_BLUEPRINTS[this.towerName][this.blueprint.level - 1] };
        const origin = new THREE.Vector3(this.firePoint.x, this.firePoint.y, this.firePoint.z);

        if (!isMultiShot) {
            switch (projBlueprint.type) {
                case TowerType.Archer:
                    sound.woosh02();
                    break;
                case TowerType.Cannon:
                    sound.cannon();
                    break;
                case TowerType.Ballista:
                    sound.woosh01();
                    break;
                default: {
                    sound.woosh03();
                    // const dice = rowDice(2);

                    // switch (dice) {
                    //     case 0:
                    //         sound.woosh01();
                    //         break;
                    //     case 1:
                    //         sound.woosh03();
                    //         break;
                    // }
                }
            }
        }

        switch (projBlueprint.trajectoryType) {
            case TrajectoryType.Parabola: {
                const diff = new THREE.Vector3()
                    .copy(origin)
                    .sub(new THREE.Vector3().copy(enemy.getFuturePosition(estimatedTimeToTarget)));

                const curve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(origin.x - diff.x * (1 / 7), origin.y * 1, origin.z - diff.z * (1 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (2 / 7), origin.y * 1.2, origin.z - diff.z * (2 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (3 / 7), origin.y * 1.3, origin.z - diff.z * (3 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (4 / 7), origin.y * 1.2, origin.z - diff.z * (4 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (5 / 7), origin.y * 1, origin.z - diff.z * (5 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (6 / 7), origin.y * 0.6, origin.z - diff.z * (6 / 7)),
                    new THREE.Vector3(origin.x - diff.x * (7 / 7), 0, origin.z - diff.z * (7 / 7)),
                ]);

                // console.log({ diff, curve });

                const timeToReachTargetViaParabola = curve.getLength() / projBlueprint.speed;

                const destination = new THREE.Vector3().copy(enemy.getFuturePosition(timeToReachTargetViaParabola));
                const projectile = new ParabolaProjectile(this, origin, destination, enemy.id, curve);

                window.dispatchEvent(new CustomEvent("projectile", { detail: projectile }));
                return;
            }
            case TrajectoryType.Straight: {
                const timeToReachTargetViaStraightLine =
                    origin.distanceTo(new THREE.Vector3().copy(enemy.getFuturePosition(0.2))) / projBlueprint.speed;

                const destination = new THREE.Vector3().copy(enemy.getFuturePosition(timeToReachTargetViaStraightLine));

                const projectile = new StraightProjectile(this, origin, destination, enemy.id);

                if (isMultiShot) {
                    projectile.damage *= 0.5;
                }
                window.dispatchEvent(new CustomEvent("projectile", { detail: projectile }));
                return;
            }
            default:
                return;
        }
    }

    showGizmo() {
        this.rangeGizmo.visible = true;
    }
    hideGizmo() {
        this.rangeGizmo.visible = false;
    }

    static getTowerValuesBasedOnPlayerStats(playerSkills: PlayerSkills, bluePrint: TowerBluePrint) {
        let range = bluePrint.range;
        let damage = bluePrint.damage;
        let rateOfFire = bluePrint.fireRate;
        let price = bluePrint.price;
        switch (bluePrint.name) {
            case TowerType.Archer: {
                if (playerSkills.archer[0]) {
                    range += playerSkills.archer[0].effect.RANGE!.value;
                }
                if (playerSkills.archer[1]) {
                    damage = [
                        damage[0] + (damage[0] * playerSkills.archer[1].effect.DAMAGE!.value) / 100,
                        damage[1] + (damage[1] * playerSkills.archer[1].effect.DAMAGE!.value) / 100,
                    ];
                }
                if (playerSkills.archer[3]) {
                    price -= (price * playerSkills.archer[3].effect.PRICE!.value) / 100;
                    rateOfFire += (rateOfFire * playerSkills.archer[3].effect.RATE_OF_FIRE!.value) / 100;
                }
                break;
            }
            case TowerType.Ballista: {
                if (playerSkills.ballista[0]) {
                    damage = [
                        damage[0] + (damage[0] * playerSkills.ballista[0].effect.DAMAGE!.value) / 100,
                        damage[1] + (damage[1] * playerSkills.ballista[0].effect.DAMAGE!.value) / 100,
                    ];
                }
                if (playerSkills.ballista[1]) {
                    rateOfFire += (rateOfFire * playerSkills.ballista[1].effect.RATE_OF_FIRE!.value) / 100;
                }
                if (playerSkills.ballista[3]) {
                    price -= (price * playerSkills.ballista[3].effect.PRICE!.value) / 100;
                    rateOfFire += (rateOfFire * playerSkills.ballista[3].effect.RATE_OF_FIRE!.value) / 100;
                }
                if (playerSkills.ballista[4]) {
                    range += playerSkills.ballista[4].effect.RANGE!.value;
                }
                break;
            }
            case TowerType.Cannon: {
                if (playerSkills.cannon[0]) {
                    damage = [
                        damage[0] + (damage[0] * playerSkills.cannon[0].effect.DAMAGE!.value) / 100,
                        damage[1] + (damage[1] * playerSkills.cannon[0].effect.DAMAGE!.value) / 100,
                    ];
                }
                if (playerSkills.cannon[2]) {
                    range += playerSkills.cannon[2].effect.RANGE!.value;
                }

                if (playerSkills.cannon[4]) {
                    price -= (price * playerSkills.cannon[4].effect.PRICE!.value) / 100;
                    rateOfFire += (rateOfFire * playerSkills.cannon[4].effect.RATE_OF_FIRE!.value) / 100;
                }
                break;
            }
            case TowerType.Poison: {
                if (playerSkills.poison[2]) {
                    range += playerSkills.poison[2].effect.RANGE!.value; // skill::poison-3
                }

                if (playerSkills.poison[3]) {
                    price -= (price * playerSkills.poison[3].effect.PRICE!.value) / 100; // skill::poison-4
                }
                break;
            }
            case TowerType.Wizard: {
                if (playerSkills.wizard[0]) {
                    range += playerSkills.wizard[0].effect.RANGE!.value;
                }

                if (playerSkills.wizard[2]) {
                    damage = [
                        damage[0] + (damage[0] * playerSkills.wizard[2].effect.DAMAGE!.value) / 100,
                        damage[1] + (damage[1] * playerSkills.wizard[2].effect.DAMAGE!.value) / 100,
                    ];
                }

                if (playerSkills.wizard[3]) {
                    range += playerSkills.wizard[3].effect.RANGE!.value;
                }

                if (playerSkills.wizard[4]) {
                    price -= (price * playerSkills.wizard[4].effect.PRICE!.value) / 100;
                }

                break;
            }
        }

        price = Math.round(price);

        return { range, damage, rateOfFire, price };
    }
}
