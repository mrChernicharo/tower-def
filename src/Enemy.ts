import { GLTF } from "three/examples/jsm/Addons.js";
import { enemies, gltfLoader, pathCurve, scene } from "./game";
import { THREE } from "./three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

const enemyBlueprints = {
    spider: {
        name: "spider",
        modelURL: "/assets/glb/spider.glb",
        speed: 3.5,
    },
} as const;

export class Enemy {
    glb!: GLTF;
    enemyType!: keyof typeof enemyBlueprints;
    bluePrint!: (typeof enemyBlueprints)[keyof typeof enemyBlueprints];
    mixer!: THREE.AnimationMixer;
    model!: THREE.Object3D;
    walkAnimation!: THREE.AnimationClip;
    timestamp = Date.now();
    #ready = false;

    constructor(enemyType: keyof typeof enemyBlueprints) {
        this.enemyType = enemyType;
        this.bluePrint = enemyBlueprints[this.enemyType];

        this._init();
    }

    async _init() {
        this.glb = await gltfLoader.loadAsync(this.bluePrint.modelURL);

        this.model = SkeletonUtils.clone(this.glb.scene);
        this.model.scale.set(50, 50, 50);

        this.mixer = new THREE.AnimationMixer(this.model);

        const walkClipName = getWalkClipName(this.enemyType);
        const walkClip = this.glb.animations.find((anim) => anim.name === walkClipName)!;
        const walkAction = this.mixer.clipAction(walkClip);
        walkAction.play();

        scene.add(this.model);
        enemies.push(this);

        this.#ready = true;
    }

    tick(elapsed: number, delta: number) {
        this.mixer.update(delta);

        const t = (((Date.now() - this.timestamp) * this.bluePrint.speed * 0.001) % 100) / 100;

        const position = pathCurve.getPointAt(t);
        const tangent = pathCurve.getTangentAt(t).normalize();

        this.model.position.copy(position);
        this.model.lookAt(position.clone().sub(tangent));
    }

    ready() {
        return this.#ready;
    }
}

function getWalkClipName(enemyType: keyof typeof enemyBlueprints) {
    switch (enemyType) {
        case "spider":
            return "Wolf Spider Armature|Spider running";
        default:
            return "Walk";
    }
}
