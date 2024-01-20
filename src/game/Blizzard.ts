import { THREE } from "../three";
import { MATERIALS } from "../shared/constants/general";
import { idMaker } from "../shared/helpers";

const speed = 3;
const radius = 5;
const icicleGeometry = new THREE.CylinderGeometry(0.01, 0.5, radius);
const icicles = Array(12)
    .fill(0)
    .map(() => new THREE.Mesh(icicleGeometry, MATERIALS.icicle));

export class Blizzard {
    id: string;
    initialPos: THREE.Vector3;
    radius: number;
    model: THREE.Group;
    timeSinceSpawn = 0;
    constructor(position: THREE.Vector3) {
        this.id = idMaker();
        this.initialPos = new THREE.Vector3(position.x, position.y, position.z);
        this.model = new THREE.Group();
        this.radius = radius;

        for (const icicle of icicles) {
            const pos = new THREE.Vector3(
                THREE.MathUtils.lerp(-3, 3, Math.random()),
                THREE.MathUtils.lerp(-0.5, 0.5, Math.random()),
                THREE.MathUtils.lerp(-3, 3, Math.random())
            );
            icicle.name = "icicle";
            icicle.userData["speed"] = THREE.MathUtils.lerp(speed * 0.5, speed, Math.random());
            icicle.position.set(pos.x, pos.y, pos.z);

            this.model.add(icicle);
        }

        const effectRingGeometry = new THREE.TorusGeometry(1);
        effectRingGeometry.rotateX(Math.PI / 2);
        const effectRing = new THREE.Mesh(effectRingGeometry, MATERIALS.icicle);
        effectRing.name = "blizzardEffectRing";
        this.model.add(effectRing);

        this.model.position.x = this.initialPos.x;
        this.model.position.y = this.initialPos.y;
        this.model.position.z = this.initialPos.z;
    }

    tick(delta: number) {
        this.timeSinceSpawn += delta;

        this.model.traverse((o) => {
            const obj = o as THREE.Mesh;
            if (obj.isMesh) {
                if (obj.name === "icicle") {
                    obj.position.y += obj.userData.speed * delta;
                } else if (obj.name === "blizzardEffectRing") {
                    obj.scale.set(1 + this.timeSinceSpawn * 2, 1, 1 + this.timeSinceSpawn * 2);
                }
            }
        });
    }

    finish() {
        window.dispatchEvent(new CustomEvent("blizzard-finish", { detail: this }));
    }
}
