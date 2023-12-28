import { TOWER_BLUEPRINTS } from "./constants";
import { TowerName } from "./enums";
import { towerModels } from "./game";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";
import { THREE } from "../three";

export class Tower {
    id: string;
    towerName: TowerName;
    position: THREE.Vector3;
    model!: THREE.Mesh;
    blueprint: TowerBluePrint;
    constructor(towerName: TowerName, position: THREE.Vector3) {
        this.id = idMaker();
        this.towerName = towerName;
        this.position = position;
        this.blueprint = TOWER_BLUEPRINTS[towerName][0];

        this._init();
    }

    async _init() {
        this._setupModel();

        return this;
    }

    async _setupModel() {
        this.model = towerModels[this.towerName]["level-1"];
        console.log({ model: this.model });
        this.model.scale.set(0.005, 0.005, 0.005);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
        const texture = await new THREE.TextureLoader().loadAsync("/assets/fbx/towers-texture.png");
        this.model.material = new THREE.MeshBasicMaterial({
            // color: COLORS[this.blueprint.color as keyof typeof COLORS],
            // color: 0xffffff,
            color: 0xca947d,
            map: texture,
        });

        console.log({ texture });
    }
}
