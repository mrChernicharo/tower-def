import { GLTF } from "three/examples/jsm/Addons.js";
import { glbModels, pathCurve } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";
import { DRAW_FUTURE_GIZMO, enemyBlueprints } from "./constants";

export class Enemy {
    #ready = false;
    glb!: GLTF;
    enemyType!: EnemyType;
    bluePrint!: EnemyBluePrint;
    mixer!: THREE.AnimationMixer;
    model!: THREE.Object3D;
    walkAnimation!: THREE.AnimationClip;
    futureGizmo!: THREE.Mesh;
    timestamp = Date.now();
    hp: number;
    timeSinceSpawn!: number;

    constructor(enemyType: EnemyType) {
        this.enemyType = enemyType;
        this.bluePrint = enemyBlueprints[this.enemyType];
        this.hp = this.bluePrint.maxHp;

        this._init();
    }

    _init() {
        this.model = this._setupModel();

        this.mixer = new THREE.AnimationMixer(this.model);

        const walkClip = this.glb.animations.find((anim) => anim.name === this.bluePrint.walkAnimationName)!;
        const walkAction = this.mixer.clipAction(walkClip);
        walkAction.play();

        if (DRAW_FUTURE_GIZMO)
            this.futureGizmo = new THREE.Mesh(
                new THREE.SphereGeometry(0.2),
                new THREE.MeshToonMaterial({ color: 0x00ff00 })
            );

        this.timeSinceSpawn = 0;
        this.#ready = true;

        return this;
    }

    _setupModel() {
        this.glb = glbModels[this.enemyType];

        const model = SkeletonUtils.clone(this.glb.scene);

        const s = this.bluePrint.modelScale;
        model.scale.set(s, s, s);

        return model;
    }

    tick(delta: number) {
        if (!this.ready()) return;

        this.timeSinceSpawn += delta;
        console.log({ timeSinceSpawn: this.timeSinceSpawn });

        this.mixer.update(delta);

        handleEnemyMovement(this.enemyType, this.model, this.bluePrint.speed);

        if (DRAW_FUTURE_GIZMO) this._drawFuturePosition(1000);
    }

    getFuturePoint(time: number) {
        const t = (((Date.now() + time - this.timestamp) * this.bluePrint.speed * 0.001) % 100) / 100;
        const position = pathCurve.getPointAt(t);
        return position;
    }

    _drawFuturePosition(time: number) {
        const position = this.getFuturePoint(time);
        this.futureGizmo.position.copy(position);
    }

    ready() {
        return this.#ready;
    }
}

function handleEnemyMovement(enemyType: EnemyType, model: THREE.Object3D, speed: number) {
    const t = ((Date.now() * speed * 0.001) % 100) / 100;

    const position = pathCurve.getPointAt(t);
    const tangent = pathCurve.getTangentAt(t);

    model.position.copy(position);

    switch (enemyType) {
        case "spider":
            model.lookAt(position.clone().sub(tangent));
            break;
        case "orc":
            model.lookAt(position.clone().add(tangent));
            model.position.y += 1.5;
            break;
        case "raptor":
            model.lookAt(position.clone().add(tangent.applyAxisAngle(model.up, -Math.PI * 0.5).add(tangent)));
            model.position.y += 0.1;
            break;
        case "soldier":
        case "brigand":
        case "warrior":
            model.lookAt(position.clone().add(tangent));
            model.position.y += 0.175;
            break;
        default:
            model.lookAt(position.clone().sub(tangent));
            break;
    }
}
