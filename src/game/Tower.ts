/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOWER_BLUEPRINTS } from "./constants";
import { AppLayers, TowerType } from "./enums";
import { gui, scene, TOWER_MODELS, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";
import { THREE } from "../three";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

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
    constructor(towerType: TowerType, position: THREE.Vector3, tileIdx: string) {
        this.id = idMaker();
        // this.level = 1;
        this.towerName = towerType;
        this.position = position;
        this.tileIdx = tileIdx;
        this.cooldown = 0;
        this.blueprint = { ...TOWER_BLUEPRINTS[towerType][0] };

        this._init();
    }

    async _init() {
        await this._setupModel();

        return this;
    }

    async _setupModel() {
        this.model = TOWER_MODELS[this.towerName]["level-1"].clone();
        setupModelData(this.model, this.id, 1, this.tileIdx, this.position);
        this._setupRangeGizmo();
        console.log("created tower", this);
    }

    _setupRangeGizmo() {
        const circleGeometry = new THREE.CircleGeometry(this.blueprint.range);
        const circleMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.15,
            color: this.blueprint.color,
        });
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
        circleMesh.position.set(this.position.x, this.position.y + 0.5, this.position.z);
        circleMesh.rotation.x = -Math.PI * 0.5;

        // if (this.rangeGizmo) {
        //     scene.remove(this.rangeGizmo);
        // }
        this.rangeGizmo = circleMesh;
        // scene.add(this.rangeGizmo);
        // const rangeFolder = gui.addFolder("Tower" + this.id);
        // rangeFolder.add(circleMesh.rotation, "x", -Math.PI * 2, Math.PI * 2);
        // rangeFolder.add(circleMesh.rotation, "y", -Math.PI * 2, Math.PI * 2);
        // rangeFolder.add(circleMesh.rotation, "z", -Math.PI * 2, Math.PI * 2);
    }

    upgrade() {
        const currLevel = this.blueprint.level;
        const nextLevel = currLevel + 1;

        if (currLevel === 4) {
            throw Error("MAX LEVEL REACHED");
        }

        // console.log("upgrade tower", { currLevel, nextLevel, currBluePrint: { ...this.blueprint } });

        // this.level = nextLevel;

        const desiredBlueprint = { ...TOWER_BLUEPRINTS[this.towerName][currLevel] };
        const desiredModel = TOWER_MODELS[this.towerName][`level-${nextLevel}`].clone();
        this.blueprint = desiredBlueprint;
        this.model = desiredModel;

        setupModelData(this.model, this.id, nextLevel, this.tileIdx, this.position);
        this._setupRangeGizmo();
        // console.log("upgrade tower", { currLevel, nextLevel, desiredBlueprint, desiredModel });
        return this;
    }

    tick(delta: number, enemies: Enemy[]) {
        for (const enemy of enemies) {
            if (this.position.distanceTo(enemy.model.position) < this.blueprint.range) {
                // console.log("enemyInSight", enemy.enemyType, enemy.id, this.position.distanceTo(enemy.model.position));
                if (this.cooldown <= 0) {
                    // console.log("ShoooT!", enemy.enemyType);
                    this.cooldown = 1 / (this.blueprint.fireRate * 0.5);

                    const origin = new THREE.Vector3(
                        this.model.position.x,
                        this.model.position.y + 8,
                        this.model.position.z
                    );

                    const maxHeight = 7;
                    const midPoint = origin.clone().add(enemy.getFuturePosition(1).clone()).divideScalar(2);
                    midPoint.y += maxHeight;

                    const curve = new THREE.CatmullRomCurve3([
                        origin.clone(),
                        midPoint,
                        enemy.getFuturePosition(1).clone(),
                    ]);

                    const speed = 20;
                    const timeToREachTarget = curve.getLength() / speed;

                    const projectile = new Projectile(
                        this.towerName,
                        this.blueprint.level,
                        this.position,
                        enemy.getFuturePosition(timeToREachTarget),
                        curve
                    );

                    // const timeToTarget = projectile.timeToTarget();
                    const timeToTarget = 1;
                    const futurePosition = enemy.getFuturePosition(timeToTarget);
                    projectile.destination.set(futurePosition.x, futurePosition.y, futurePosition.z);
                    window.dispatchEvent(new CustomEvent("projectile", { detail: projectile }));
                }
            }
        }

        if (this.cooldown > 0) {
            this.cooldown -= delta;
        }
        // console.log(this.cooldown);
    }
}

function setupModelData(model: THREE.Mesh, id: string, level: number, tileIdx: string, position: THREE.Vector3) {
    model.userData["tower_id"] = id;
    model.userData["tower_level"] = level;
    model.userData["tile_idx"] = tileIdx;
    model.layers.set(AppLayers.Tower);
    model.material = new THREE.MeshBasicMaterial({
        // color: COLORS[this.blueprint.color as keyof typeof COLORS],
        // color: 0xffffff,
        color: 0xca947d,
        map: towerTexture,
    });
    model.position.set(position.x, position.y, position.z);
    model.scale.set(0.005, 0.005, 0.005);
}
