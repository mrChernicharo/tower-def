import { THREE } from "../three";
import { TowerType } from "./enums";
import { idMaker } from "./helpers";

export class Projectile {
    id: string;
    type: TowerType;
    origin: THREE.Vector3;
    destination: THREE.Vector3;
    mesh!: THREE.Mesh;
    trajectory!: THREE.Line;
    curve!: THREE.CatmullRomCurve3;
    timeSinceSpawn: number;
    speed: number;

    constructor(towerType: TowerType, origin: THREE.Vector3, destination: THREE.Vector3) {
        this.id = idMaker();
        this.type = towerType;
        this.origin = new THREE.Vector3().copy(origin);
        this.destination = new THREE.Vector3().copy(destination);
        this.speed = 20;
        this.timeSinceSpawn = 0;

        this._init();
    }

    _init() {
        this._setupModel();

        return this;
    }
    async _setupModel() {
        const sphereGeometry = new THREE.SphereGeometry(0.5);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.8,
            color: 0xff0000,
        });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(this.origin.x, this.origin.y + 10, this.origin.z);
        this.mesh = sphereMesh;

        this._setupTrajectory();
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
        this.mesh.lookAt(position.clone().sub(tangent));

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
