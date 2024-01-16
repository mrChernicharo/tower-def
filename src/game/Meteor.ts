import { THREE } from "../three";
import { COLORS, MATERIALS } from "./constants";
import { idMaker } from "./helpers";

const size = 0.5;
const speed = 25;
const spawnHeight = 40;
const meteorGeometry = new THREE.SphereGeometry(size);

export class Meteor {
    id: string;
    destination: THREE.Vector3;
    initialPos: THREE.Vector3;
    model: THREE.Mesh;
    explosion: THREE.Mesh;
    timeToTarget = Infinity;
    constructor(destination: THREE.Vector3, color: number = COLORS.orangered) {
        this.id = idMaker();
        this.destination = destination;
        this.initialPos = new THREE.Vector3(this.destination.x, this.destination.y + spawnHeight, this.destination.z);
        this.model = new THREE.Mesh(meteorGeometry, new THREE.MeshMatcapMaterial({ color }));
        this.model.position.x = this.initialPos.x;
        this.model.position.y = this.initialPos.y;
        this.model.position.z = this.initialPos.z;

        // SETUP EXPLOSION
        const explosionGeometry = new THREE.SphereGeometry(0.15);
        const explosionMaterial = MATERIALS.explosion(color);
        this.explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);

        const distanceToTarget = this.initialPos.distanceTo(this.destination);
        this.timeToTarget = distanceToTarget / speed;
    }

    tick(delta: number) {
        this.model.position.y -= speed * delta;
    }

    explode() {
        // draw efx here
        window.dispatchEvent(new CustomEvent("meteor-explode", { detail: this }));
    }
}
