import { GLTF } from "three/examples/jsm/Addons.js";
import { ENEMY_MODELS, pathCurve } from "./game";
import { THREE } from "../three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { EnemyType } from "./enums";
import { EnemyBluePrint } from "./types";
import { DRAW_FUTURE_GIZMO, ENEMY_BLUEPRINTS } from "./constants";
import { idMaker } from "./helpers";

export class Enemy {
    #ready = false;
    id: string;
    glb!: GLTF;
    enemyType: EnemyType;
    bluePrint: EnemyBluePrint;
    mixer!: THREE.AnimationMixer;
    model!: THREE.Object3D;
    walkAnimation!: THREE.AnimationClip;
    futureGizmo!: THREE.Mesh;
    timestamp = Date.now();
    hp: number;
    timeSinceSpawn!: number;

    constructor(enemyType: EnemyType) {
        this.id = idMaker();
        this.enemyType = enemyType;
        this.bluePrint = ENEMY_BLUEPRINTS[this.enemyType];
        this.hp = this.bluePrint.maxHp;

        this._init();
    }

    _init() {
        this.model = this._setupModel();
        this.model.visible = false;

        this.mixer = new THREE.AnimationMixer(this.model);

        const walkClip = this.glb.animations.find((anim) => anim.name === this.bluePrint.walkAnimationName)!;
        const walkAction = this.mixer.clipAction(walkClip);
        walkAction.play();

        if (DRAW_FUTURE_GIZMO) {
            this.futureGizmo = new THREE.Mesh(
                new THREE.SphereGeometry(0.5),
                new THREE.MeshToonMaterial({ color: 0x00ffff })
                // new THREE.MeshToonMaterial({ color: 0xff0000 })
            );
            this.futureGizmo.visible = false;
        }
        this.timeSinceSpawn = 0;
        this.#ready = true;

        return this;
    }

    _setupModel() {
        this.glb = ENEMY_MODELS[this.enemyType];

        const model = SkeletonUtils.clone(this.glb.scene);

        const s = this.bluePrint.modelScale;
        model.scale.set(s, s, s);

        return model;
    }

    tick(delta: number) {
        if (!this.ready()) return;

        if (!this.model.visible) {
            this.model.visible = true;
        }

        this.timeSinceSpawn += delta;
        this.mixer.update(delta);

        handleEnemyMovement(this.enemyType, this.model, this.bluePrint.speed, this.timeSinceSpawn);

        if (DRAW_FUTURE_GIZMO) {
            if (!this.futureGizmo.visible) this.futureGizmo.visible = true;
            this._drawFuturePosition(1);
        }
    }

    _drawFuturePosition(timeInSecs: number) {
        const t = getPercDist(this.bluePrint.speed, this.timeSinceSpawn + timeInSecs);
        const position = pathCurve.getPointAt(t);
        this.futureGizmo.position.copy(position);
    }

    ready() {
        return this.#ready;
    }
}

function handleEnemyMovement(enemyType: EnemyType, model: THREE.Object3D, speed: number, timeSinceSpawn: number) {
    const t = getPercDist(speed, timeSinceSpawn);

    const position = pathCurve.getPointAt(t);
    const tangent = pathCurve.getTangentAt(t);

    model.position.copy(position);

    switch (enemyType) {
        case "spider":
            model.lookAt(position.clone().sub(tangent));
            break;
        case "orc":
            model.lookAt(position.clone().add(tangent));
            model.position.y += 3;
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

function getPercDist(speed: number, timeSinceSpawn: number) {
    const pathLen = pathCurve.getLength();
    const distCovered = speed * timeSinceSpawn;
    const distPerc = distCovered / pathLen;

    // console.log({ pathLen, distCovered, distPerc });
    return distPerc % 1;
}
