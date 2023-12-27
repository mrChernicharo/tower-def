import { GLTF } from "three/examples/jsm/Addons.js";
import { EnemyBluePrint, EnemyType, enemies, enemyBlueprints, gltfLoader, pathCurve, scene } from "./game";
import { THREE } from "./three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

const DRAW_FUTURE_GIZMO = true;

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

    constructor(enemyType: EnemyType) {
        this.enemyType = enemyType;
        this.bluePrint = enemyBlueprints[this.enemyType];
        this.hp = this.bluePrint.maxHp;

        this._init();
    }

    async _init() {
        await this._setupModel();

        this.mixer = new THREE.AnimationMixer(this.model);

        console.log("::Enemy _init", { glb: this.glb, enemyType: this.enemyType, t: this });

        const walkClipName = getWalkClipName(this.enemyType);
        const walkClip = this.glb.animations.find((anim) => anim.name === walkClipName)!;
        const walkAction = this.mixer.clipAction(walkClip);

        console.log("::Enemy _init", { glb: this.glb, walkClip, walkClipName, enemyType: this.enemyType, t: this });

        walkAction.play();

        this.futureGizmo = new THREE.Mesh(
            new THREE.SphereGeometry(0.2),
            new THREE.MeshToonMaterial({ color: 0x00ff00 })
        );
        scene.add(this.futureGizmo);

        scene.add(this.model);
        enemies.push(this);
        this.#ready = true;
    }

    async _setupModel() {
        this.glb = await gltfLoader.loadAsync(this.bluePrint.modelURL);
        console.log("::Enemy _init", { glb: this.glb });

        this.model = SkeletonUtils.clone(this.glb.scene);

        const s = getModelScale(this.enemyType);
        this.model.scale.set(s, s, s);
    }

    tick(delta: number) {
        if (!this.ready()) return;

        this.mixer.update(delta);

        moveEnemy(this.enemyType, this.model, this.timestamp, this.bluePrint.speed);

        if (DRAW_FUTURE_GIZMO) this.drawFuturePosition(1000);
    }

    getFuturePoint(time: number) {
        const t = (((Date.now() + time - this.timestamp) * this.bluePrint.speed * 0.001) % 100) / 100;
        const position = pathCurve.getPointAt(t);
        return position;
    }

    drawFuturePosition(time: number) {
        const position = this.getFuturePoint(time);
        this.futureGizmo.position.copy(position);
    }

    ready() {
        return this.#ready;
    }
}

function getModelScale(enemyType: EnemyType) {
    switch (enemyType) {
        case "spider":
            return 50;
        case "orc":
            return 0.75;
        case "raptor":
            return 0.01;
        default:
            return 1;
    }
}

function getWalkClipName(enemyType: EnemyType) {
    switch (enemyType) {
        case "spider":
            return "Wolf Spider Armature|Spider running";
        case "orc":
            return "ANM_WALK";
        case "raptor":
            return "Running";
        default:
            return "Walk";
    }
}

function moveEnemy(enemyType: EnemyType, model: THREE.Object3D, timestamp: number, speed: number) {
    const t = (((Date.now() - timestamp) * speed * 0.001) % 100) / 100;

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
            break;
        default:
            model.lookAt(position.clone().sub(tangent));
            break;
    }
}
