/* eslint-disable @typescript-eslint/no-unused-vars */
import { MATERIALS, PROJECTILE_BLUEPRINTS, TOWER_BLUEPRINTS } from "./constants";
import { AppLayers, TargetingStrategy, TowerType, TrajectoryType } from "./enums";
import { TOWER_MODELS, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";
import { THREE } from "../three";
import { Enemy } from "./Enemy";
import { StraightProjectile, ParabolaProjectile } from "./Projectile";

export class Tower {
    id: string;
    // level: number;
    cooldown: number;
    towerName: TowerType;
    position: THREE.Vector3;
    model!: THREE.Mesh;
    blueprint: TowerBluePrint;
    tileIdx: string;
    rangeGizmo!: THREE.Mesh;
    strategy: TargetingStrategy;
    constructor(towerType: TowerType, position: THREE.Vector3, tileIdx: string) {
        this.id = idMaker();
        // this.level = 1;
        this.towerName = towerType;
        this.position = position;
        this.tileIdx = tileIdx;
        this.cooldown = 0;
        this.blueprint = { ...TOWER_BLUEPRINTS[towerType][0] };
        // this.strategy = TargetingStrategy.FirstInLine;
        this.strategy = this.blueprint.defaultStrategy;

        this._init();
    }

    async _init() {
        await this._setupModel();

        return this;
    }

    async _setupModel() {
        this.model = TOWER_MODELS[this.towerName]["level-1"].clone();
        this._setupModelData();
        this._setupRangeGizmo();
        console.log("created tower", this);
    }

    _setupRangeGizmo() {
        const circleGeometry = new THREE.CircleGeometry(this.blueprint.range);
        const circleMaterial = MATERIALS.towerRangeGizmo(this.blueprint.color);
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
        circleMesh.position.set(this.position.x, this.position.y + 0.5, this.position.z);
        circleMesh.rotation.x = -Math.PI * 0.5;

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
        this.blueprint = desiredBlueprint;
        this.model = desiredModel;

        this._setupModelData();
        this._setupRangeGizmo();
        // console.log("upgrade tower", { currLevel, nextLevel, desiredBlueprint, desiredModel });
        return this;
    }

    _setupModelData() {
        this.model.userData["tower_id"] = this.id;
        this.model.userData["tower_level"] = this.blueprint.level;
        this.model.userData["tile_idx"] = this.tileIdx;
        this.model.layers.set(AppLayers.Tower);
        this.model.material = MATERIALS.tower(towerTexture);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
        const s = this.blueprint.modelScale;
        this.model.scale.set(s, s, s);

        this.model.traverse((obj) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((obj as any).isMesh) {
                obj.castShadow = true;
            }
        });
    }

    tick(delta: number, targetEnemy: Enemy | undefined) {
        if (targetEnemy && this.cooldown <= 0) {
            // console.log("ShoooT!", targetEnemy.enemyType);
            this.fireProjectile(targetEnemy);

            this.cooldown = 1 / (this.blueprint.fireRate * 0.5);
        }
        this.cooldown -= delta;
    }

    fireProjectile(enemy: Enemy) {
        const projBlueprint = { ...PROJECTILE_BLUEPRINTS[this.towerName][this.blueprint.level - 1] };
        const origin = new THREE.Vector3(
            this.model.position.x,
            this.model.position.y + this.blueprint.firePointY,
            this.model.position.z
        );

        switch (projBlueprint.trajectoryType) {
            case TrajectoryType.Parabola: {
                const estimatedTimeToTarget = 1;
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

                const destination = enemy.getFuturePosition(timeToReachTargetViaParabola);

                const projectile = new ParabolaProjectile(this, new THREE.Vector3().copy(destination), enemy.id, curve);
                window.dispatchEvent(new CustomEvent("projectile", { detail: projectile }));
                return;
            }
            case TrajectoryType.Straight: {
                const timeToReachTargetViaStraightLine =
                    origin.distanceTo(new THREE.Vector3().copy(enemy.getFuturePosition(0))) / projBlueprint.speed;

                const destination = enemy.getFuturePosition(timeToReachTargetViaStraightLine);

                const projectile = new StraightProjectile(this, new THREE.Vector3().copy(destination), enemy.id);

                window.dispatchEvent(new CustomEvent("projectile", { detail: projectile }));
                return;
            }
            default:
                return;
        }
    }
}
