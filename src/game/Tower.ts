/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOWER_BLUEPRINTS } from "./constants";
import { AppLayers, TowerName } from "./enums";
import { gui, scene, towerModels, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";
import { THREE } from "../three";

export class Tower {
    id: string;
    // level: number;
    towerName: TowerName;
    position: THREE.Vector3;
    model!: THREE.Mesh;
    blueprint: TowerBluePrint;
    tileIdx: string;
    rangeGizmo!: THREE.Mesh;
    constructor(towerName: TowerName, position: THREE.Vector3, tileIdx: string) {
        this.id = idMaker();
        // this.level = 1;
        this.towerName = towerName;
        this.position = position;
        this.tileIdx = tileIdx;
        this.blueprint = { ...TOWER_BLUEPRINTS[towerName][0] };

        this._init();
    }

    async _init() {
        await this._setupModel();

        return this;
    }

    async _setupModel() {
        this.model = towerModels[this.towerName]["level-1"].clone();
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

        console.log("upgrade tower", { currLevel, nextLevel, currBluePrint: { ...this.blueprint } });

        // this.level = nextLevel;

        const desiredBlueprint = { ...TOWER_BLUEPRINTS[this.towerName][currLevel] };
        const desiredModel = towerModels[this.towerName][`level-${nextLevel}`].clone();
        this.blueprint = desiredBlueprint;
        this.model = desiredModel;

        setupModelData(this.model, this.id, nextLevel, this.tileIdx, this.position);
        this._setupRangeGizmo();
        console.log("upgrade tower", { currLevel, nextLevel, desiredBlueprint, desiredModel });
        return this;
    }

    tick(delta: number) {
        //
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
