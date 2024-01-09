import { THREE } from "../three";
import { AppLayers, TowerType } from "./enums";
import { PROJECTILE_MODELS, towerTexture } from "./game";
import { idMaker } from "./helpers";
import { ProjectileBluePrint } from "./types";
import { COLORS, PROJECTILE_BLUEPRINTS } from "./constants";
import { Tower } from "./Tower";

class ProjectileBase {
    id: string;
    targetEnemyId: string;
    type: TowerType;
    level: number;
    originPos: THREE.Vector3;
    destination: THREE.Vector3;
    model!: THREE.Mesh;
    trajectory!: THREE.Line;
    timeSinceSpawn: number;
    blueprint: ProjectileBluePrint;
    explosion: THREE.Mesh;
    damage: number;
    constructor(tower: Tower, destination: THREE.Vector3, targetId: string) {
        this.id = `proj-${tower.towerName}-${idMaker()}`;
        this.targetEnemyId = targetId;
        this.type = tower.blueprint.name;
        this.level = tower.blueprint.level;
        this.blueprint = { ...PROJECTILE_BLUEPRINTS[this.type][this.level - 1] };
        this.model = PROJECTILE_MODELS[this.type][`level-${this.level}`].clone();

        this.timeSinceSpawn = 0;
        this.damage = Math.round(
            THREE.MathUtils.lerp(tower.blueprint.damage[0], tower.blueprint.damage[1], Math.random())
        );
        this.destination = new THREE.Vector3(destination.x, destination.y, destination.z);
        this.originPos = new THREE.Vector3(
            tower.position.x,
            tower.position.y + tower.blueprint.firePointY,
            tower.position.z
        );

        const size = this.blueprint.modelScale;
        const geometry = this.model.geometry.clone();
        geometry.rotateX(Math.PI * 0.5);
        this.model.geometry = geometry;
        this.model.material = new THREE.MeshBasicMaterial({
            color: COLORS[this.blueprint.color as keyof typeof COLORS],
            map: towerTexture,
        });
        this.model.position.set(this.originPos.x, this.originPos.y, this.originPos.z);
        this.model.scale.set(size, size, size);
        this.model.userData["projectile_id"] = this.id;
        this.model.userData["projectile_level"] = this.level;
        this.model.layers.set(AppLayers.Projectile);

        // SETUP EXPLOSION
        const explosionGeometry = new THREE.SphereGeometry(0.1);
        const explosionMaterial = new THREE.MeshToonMaterial({
            color: COLORS[this.blueprint.explosionColor as keyof typeof COLORS],
            transparent: true,
            opacity: 0.6,
        });
        this.explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    }
}

export class StraightProjectile extends ProjectileBase {
    constructor(tower: Tower, destination: THREE.Vector3, targetId: string) {
        super(tower, destination, targetId);
        this._setupTrajectory();
    }

    _setupTrajectory() {
        // const points = this.curve.getPoints(50);
        const dest = new THREE.Vector3().copy(this.destination);
        const curPos = new THREE.Vector3().copy(this.model.position);
        const geometry = new THREE.BufferGeometry().setFromPoints([curPos, dest]);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.trajectory = new THREE.Line(geometry, material);
    }

    tick(delta: number) {
        this.timeSinceSpawn += delta;

        const distanceToTarget = this.handleMovement(delta);

        if (distanceToTarget < 0.5) {
            this.explode();
        }
    }

    handleMovement(delta: number) {
        const dest = new THREE.Vector3(this.destination.x, this.destination.y, this.destination.z);
        const curPos = new THREE.Vector3(this.model.position.x, this.model.position.y, this.model.position.z);
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
            // velocity
            // result
            this.destination
            // this.model.position.clone().sub(velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI * 0.5).sub(velocity))
            // this.model.position.clone().add(velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI * 0.5).add(velocity))
            // this.model.position.clone().add(dest.applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI * 0.5).add(dest))
            // this.model.position.clone().add(dest.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI * 0.5).add(dest))
        );

        return distance;
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("projectile-explode", { detail: this }));
    }
}

export class ParabolaProjectile extends ProjectileBase {
    curve!: THREE.CatmullRomCurve3;
    constructor(tower: Tower, destination: THREE.Vector3, targetId: string, curve: THREE.CatmullRomCurve3) {
        super(tower, destination, targetId);
        this.curve = curve;
        this._setupTrajectory();
    }

    _setupTrajectory() {
        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        this.trajectory = new THREE.Line(geometry, material);
    }

    timeToTarget() {
        const timeToReachTarget = this.curve.getLength() / this.blueprint.speed;
        // console.log({ timeToReachTarget });
        return timeToReachTarget;
    }

    tick(delta: number) {
        this.timeSinceSpawn += delta;

        const distanceToTarget = this.handleMovement();
        // console.log("parabola projectile tick", {
        //     distanceToTarget,
        //     timeToTarget: this.timeToTarget(),
        //     timeSinceSpawn: this.timeSinceSpawn,
        // });

        if (distanceToTarget < 1.5 || this.timeToTarget() - 0.1 < this.timeSinceSpawn) {
            this.explode();
        }
    }

    handleMovement() {
        const t = getPercDist(this.curve, this.blueprint.speed, this.timeSinceSpawn);

        const position = this.curve.getPointAt(t);
        const tangent = this.curve.getTangentAt(t);

        this.model.position.copy(position);
        this.model.lookAt(
            position.clone().add(tangent.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI * 0.5).add(tangent))
        );

        return position.distanceTo(new THREE.Vector3().copy(this.destination));
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("projectile-explode", { detail: this }));
    }
}

export class BounceProjectile {}

function getPercDist(pathCurve: THREE.CatmullRomCurve3, speed: number, timeSinceSpawn: number) {
    const pathLen = pathCurve.getLength();
    const distCovered = speed * timeSinceSpawn;
    const distPerc = distCovered / pathLen;

    // console.log({ pathLen, distCovered, distPerc });
    return distPerc;
}
