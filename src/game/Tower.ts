import { TOWER_BLUEPRINTS } from "./constants";
import { TowerName } from "./enums";
import { idMaker } from "./helpers";
import { TowerBluePrint } from "./types";

export class Tower {
    id: string;
    towerName: TowerName;
    position: THREE.Vector3;
    blueprint: TowerBluePrint;
    constructor(towerName: TowerName, position: THREE.Vector3) {
        this.id = idMaker();
        this.towerName = towerName;
        this.position = position;
        this.blueprint = TOWER_BLUEPRINTS[towerName][0];

        this._init();
    }

    _init() {
        this._setupModel();

        return this;
    }

    _setupModel() {}
}
