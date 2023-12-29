import { Vector3 } from "three";
import { THREE } from "../three";
import { AppLayers, TowerType } from "./enums";
import { PROJECTILE_MODELS, towerTexture } from "./game";
import { idMaker } from "./helpers";

export class Projectile {
    id: string;
    type: TowerType;
    level: number;
    origin: THREE.Vector3;
    destination: THREE.Vector3;
    mesh!: THREE.Mesh;
    trajectory!: THREE.Line;
    curve!: THREE.CatmullRomCurve3;
    timeSinceSpawn: number;
    speed: number;

    constructor(towerType: TowerType, towerLevel: number, origin: THREE.Vector3, destination: THREE.Vector3) {
        this.id = idMaker();
        this.type = towerType;
        this.level = towerLevel;
        this.origin = new THREE.Vector3(origin.x, origin.y + 8, origin.z);
        this.destination = new THREE.Vector3().copy(destination);
        this.speed = 8;
        this.timeSinceSpawn = 0;

        this._init();
    }

    _init() {
        this._setupModel();
        this._setupTrajectory();

        return this;
    }
    async _setupModel() {
        this.mesh = PROJECTILE_MODELS[this.type][`level-${this.level}`].clone();
        setupModelData(this.mesh, this.id, this.level, this.origin.clone());
    }

    _setupTrajectory() {
        const midPoint = this.mesh.position.clone().add(this.destination.clone()).divideScalar(2);
        midPoint.y += 10;

        this.curve = new THREE.CatmullRomCurve3([this.mesh.position.clone(), midPoint, this.destination.clone()]);
        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        this.trajectory = new THREE.Line(geometry, material);
    }

    tick(delta: number) {
        this.timeSinceSpawn += delta;

        // const dest = new THREE.Vector3().copy(this.destination);
        // const curPos = new THREE.Vector3().copy(this.mesh.position);
        // const distance = curPos.distanceTo(dest);
        // const velocity = dest.sub(curPos).normalize();

        // this.mesh.position.set(
        //     curPos.x + velocity.x * this.speed * delta,
        //     curPos.y + velocity.y * this.speed * delta,
        //     curPos.z + velocity.z * this.speed * delta
        // );

        const distance = this.handleMovement();

        if (distance < 0.5) {
            this.explode();
        }

        // this.destination.sub(this.mesh.position)
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("projectile-explode", { detail: this }));
    }

    handleMovement() {
        const t = getPercDist(this.curve, this.speed, this.timeSinceSpawn);

        const position = this.curve.getPointAt(t);
        const tangent = this.curve.getTangentAt(t);

        this.mesh.position.copy(position);
        this.mesh.lookAt(
            position.clone().add(tangent.applyAxisAngle(new Vector3(1, 0, 0), -Math.PI * 0.5).add(tangent))
        );

        return this.mesh.position.distanceTo(this.destination);
    }
}
function getPercDist(pathCurve: THREE.CatmullRomCurve3, speed: number, timeSinceSpawn: number) {
    const pathLen = pathCurve.getLength();
    const distCovered = speed * timeSinceSpawn;
    const distPerc = distCovered / pathLen;

    // console.log({ pathLen, distCovered, distPerc });
    return distPerc % 1;
}

function setupModelData(model: THREE.Mesh, id: string, level: number, position: THREE.Vector3) {
    model.userData["projectile_id"] = id;
    model.userData["projectile_level"] = level;

    model.layers.set(AppLayers.Projectile);
    model.material = new THREE.MeshBasicMaterial({
        // color: COLORS[this.blueprint.color as keyof typeof COLORS],
        // color: 0xffffff,
        color: 0xca947d,
        map: towerTexture,
    });
    model.position.set(position.x, position.y, position.z);
    model.scale.set(0.005, 0.005, 0.005);
}
