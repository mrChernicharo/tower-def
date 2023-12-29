import { Vector3 } from "three";
import { THREE } from "../three";
import { AppLayers, TowerType, TrajectoryType } from "./enums";
import { PROJECTILE_MODELS, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { ProjectileBluePrint } from "./types";
import { PROJECTILE_BLUEPRINTS } from "./constants";

export class Projectile {
    id: string;
    type: TowerType;
    level: number;
    origin: THREE.Vector3;
    destination: THREE.Vector3;
    model!: THREE.Mesh;
    trajectory!: THREE.Line;
    curve!: THREE.CatmullRomCurve3;
    timeSinceSpawn: number;
    blueprint: ProjectileBluePrint;
    // maxHeight: number;

    constructor(
        towerType: TowerType,
        towerLevel: number,
        origin: THREE.Vector3,
        destination: THREE.Vector3,
        curve: THREE.CatmullRomCurve3
    ) {
        this.id = idMaker();
        this.type = towerType;
        this.level = towerLevel;
        this.origin = new THREE.Vector3(origin.x, origin.y + 8, origin.z);
        this.destination = new THREE.Vector3().copy(destination);
        this.curve = curve;
        this.timeSinceSpawn = 0;

        this.blueprint = PROJECTILE_BLUEPRINTS[this.type][this.level - 1];
        this.model = PROJECTILE_MODELS[this.type][`level-${this.level}`].clone();

        this._init();
    }

    _init() {
        this._setupModelData();
        this._setupTrajectory();

        return this;
    }

    _setupTrajectory() {
        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        this.trajectory = new THREE.Line(geometry, material);
    }

    timeToTarget() {
        const timeToREachTarget = this.curve.getLength() / this.blueprint.speed;
        console.log({ timeToREachTarget });
        return timeToREachTarget;
    }

    tick(delta: number) {
        this.timeSinceSpawn += delta;

        let distanceToTarget!: number;
        if (this.blueprint.trajectoryType === TrajectoryType.Straight) {
            distanceToTarget = this.handleStraightMovement(delta);
        } else if (this.blueprint.trajectoryType === TrajectoryType.Parabola) {
            distanceToTarget = this.handleParabolaMovement();
        }

        if (distanceToTarget < 0.5) {
            this.explode();
        }
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("projectile-explode", { detail: this }));
    }

    handleStraightMovement(delta: number) {
        const dest = new THREE.Vector3().copy(this.destination);
        const curPos = new THREE.Vector3().copy(this.model.position);
        const distance = curPos.distanceTo(dest);
        const velocity = dest.sub(curPos).normalize();
        const result = new THREE.Vector3(
            curPos.x + velocity.x * this.blueprint.speed * delta,
            curPos.y + velocity.y * this.blueprint.speed * delta,
            curPos.z + velocity.z * this.blueprint.speed * delta
        );

        this.model.position.set(result.x, result.y, result.z);
        // this.model.lookAt(result);
        this.model.lookAt(
            // this.model.position.clone().sub(velocity.applyAxisAngle(new Vector3(0, 0, 1), -Math.PI * 0.5).sub(velocity))
            // this.model.position.clone().add(velocity.applyAxisAngle(new Vector3(0, 0, 1), -Math.PI * 0.5).add(velocity))
            this.model.position.clone().add(dest.applyAxisAngle(new Vector3(0, 0, 1), -Math.PI * 0.5).add(dest))
        );

        return distance;
    }

    handleParabolaMovement() {
        const t = getPercDist(this.curve, this.blueprint.speed, this.timeSinceSpawn);

        const position = this.curve.getPointAt(t);
        const tangent = this.curve.getTangentAt(t);

        this.model.position.copy(position);
        this.model.lookAt(
            position.clone().add(tangent.applyAxisAngle(new Vector3(1, 0, 0), -Math.PI * 0.5).add(tangent))
        );

        return this.model.position.distanceTo(this.destination);
    }

    // setPosition(pos: THREE.Vector3) {
    //     this.model.position
    // }
    _setupModelData() {
        this.model.userData["projectile_id"] = this.id;
        this.model.userData["projectile_level"] = this.level;

        this.model.layers.set(AppLayers.Projectile);
        this.model.material = new THREE.MeshBasicMaterial({
            // color: COLORS[this.blueprint.color as keyof typeof COLORS],
            // color: 0xffffff,
            color: 0xca947d,
            map: towerTexture,
        });
        const pos = this.origin.clone();
        this.model.position.set(pos.x, pos.y, pos.z);
        const s = this.blueprint.modelScale;
        this.model.scale.set(s, s, s);
    }
}
function getPercDist(pathCurve: THREE.CatmullRomCurve3, speed: number, timeSinceSpawn: number) {
    const pathLen = pathCurve.getLength();
    const distCovered = speed * timeSinceSpawn;
    const distPerc = distCovered / pathLen;

    // console.log({ pathLen, distCovered, distPerc });
    return distPerc % 1;
}
