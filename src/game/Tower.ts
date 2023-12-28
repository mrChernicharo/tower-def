import { TOWER_BLUEPRINTS } from "./constants";
import { AppLayers, TowerName } from "./enums";
import { towerModels, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";
import { THREE } from "../three";

export class Tower {
    id: string;
    towerName: TowerName;
    position: THREE.Vector3;
    model!: THREE.Mesh;
    blueprint: TowerBluePrint;
    tileIdx: string;
    constructor(towerName: TowerName, position: THREE.Vector3, tileIdx: string) {
        this.id = idMaker();
        this.towerName = towerName;
        this.position = position;
        this.tileIdx = tileIdx;
        this.blueprint = TOWER_BLUEPRINTS[towerName][0];

        this._init();
    }

    async _init() {
        await this._setupModel();

        return this;
    }

    async _setupModel() {
        this.model = towerModels[this.towerName]["level-1"].clone();
        this.model.scale.set(0.005, 0.005, 0.005);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
        this.model.userData["tower_id"] = this.id;
        this.model.userData["tile_idx"] = this.tileIdx;
        this.model.layers.set(AppLayers.Tower);
        this.model.material = new THREE.MeshBasicMaterial({
            // color: COLORS[this.blueprint.color as keyof typeof COLORS],
            // color: 0xffffff,
            color: 0xca947d,
            map: towerTexture,
        });

        // console.log({ texture, tileIdx: this.tileIdx });
    }
}
