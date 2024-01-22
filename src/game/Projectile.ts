import { THREE } from "../three";
import { AppLayers, TowerType } from "../shared/enums";
import { PROJECTILE_MODELS, towerTexture } from "./game";
import { determineDamage, idMaker } from "../shared/helpers";
import { ProjectileBluePrint } from "../shared/types";
import { COLORS, MATERIALS } from "../shared/constants/general";
import { Tower } from "./Tower";
import { PROJECTILE_BLUEPRINTS } from "../shared/constants/towers";

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
    constructor(tower: Tower, origin: THREE.Vector3, destination: THREE.Vector3, targetId: string) {
        // INITIALIZE CLASS MEMBERS
        this.id = `proj-${tower.towerName}-${idMaker()}`;
        this.targetEnemyId = targetId;
        this.type = tower.blueprint.name;
        this.level = tower.blueprint.level;
        this.blueprint = { ...PROJECTILE_BLUEPRINTS[this.type][this.level - 1] };
        this.model = PROJECTILE_MODELS[this.type][`level-${this.level}`].clone();

        this.timeSinceSpawn = 0;
        this.damage = determineDamage(tower.damage);

        this.destination = new THREE.Vector3(destination.x, destination.y, destination.z);
        this.originPos = new THREE.Vector3(origin.x, origin.y, origin.z);

        // SETUP MODEL
        const geometry = this.model.geometry.clone();
        geometry.rotateX(-Math.PI * 0.5);
        // geometry.rotateX(this.blueprint.trajectoryType === TrajectoryType.Straight ? Math.PI * 0.5 : -Math.PI * 0.5);
        this.model.geometry = geometry;
        this.model.material = MATERIALS.projectile(COLORS[this.blueprint.color as keyof typeof COLORS], towerTexture);
        this.model.position.set(this.originPos.x, this.originPos.y, this.originPos.z);
        const size = this.blueprint.modelScale;
        this.model.scale.set(size, size, size);
        this.model.userData["projectile_id"] = this.id;
        this.model.userData["projectile_level"] = this.level;
        this.model.userData["tower_id"] = tower.id;
        this.model.layers.set(AppLayers.Projectile);

        // SETUP EXPLOSION
        const explosionGeometry = new THREE.SphereGeometry(this.blueprint.explosionRadius);
        const explosionMaterial = MATERIALS.explosion(COLORS[this.blueprint.explosionColor as keyof typeof COLORS]);
        this.explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    }
}

export class StraightProjectile extends ProjectileBase {
    constructor(tower: Tower, origin: THREE.Vector3, destination: THREE.Vector3, targetId: string) {
        super(tower, origin, destination, targetId);
        this._setupTrajectory();
    }

    _setupTrajectory() {
        // const points = this.curve.getPoints(50);
        const dest = new THREE.Vector3().copy(this.destination);
        const curPos = new THREE.Vector3().copy(this.model.position);
        const geometry = new THREE.BufferGeometry().setFromPoints([curPos, dest]);
        const material = MATERIALS.trajectoryLine();
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
        this.model.lookAt(this.destination);

        return distance;
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("projectile-explode", { detail: this }));
    }
}

export class ParabolaProjectile extends ProjectileBase {
    curve!: THREE.CatmullRomCurve3;
    constructor(
        tower: Tower,
        origin: THREE.Vector3,
        destination: THREE.Vector3,
        targetId: string,
        curve: THREE.CatmullRomCurve3
    ) {
        super(tower, origin, destination, targetId);
        this.curve = curve;
        this._setupTrajectory();
    }

    _setupTrajectory() {
        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = MATERIALS.trajectoryLine();

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
        try {
            let t = getPercDist(this.curve, this.blueprint.speed, this.timeSinceSpawn);
            if (t > 1) t = 1;

            const position = this.curve.getPointAt(t);
            const direction = this.curve.getPointAt(t > 0.95 ? 1 : t + 0.04);

            this.model.position.copy(position);
            this.model.lookAt(direction);

            return position.distanceTo(new THREE.Vector3().copy(this.destination));
        } catch (err) {
            console.error("i could use some love!!!", { err });
            return 1.6;
        }
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
