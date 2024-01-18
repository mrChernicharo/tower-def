import { idMaker } from "../utils/helpers";

const POISON_DMG_COOLDOWN = 2.2;

export class PoisonEntry {
    id: string;
    enemyId: string;
    duration: number;
    elapsed = 0;
    cooldown = POISON_DMG_COOLDOWN;
    constructor(enemyId: string, durationInSeconds = 10) {
        this.id = idMaker();
        this.enemyId = enemyId;
        this.duration = durationInSeconds;
    }

    tick(delta: number) {
        this.elapsed += delta;
        this.cooldown -= delta;

        if (this.cooldown <= 0) {
            window.dispatchEvent(new CustomEvent("poison-entry-damage", { detail: this }));
            this.cooldown = POISON_DMG_COOLDOWN;
        }

        if (this.elapsed >= this.duration) {
            this.expire();
        }
    }

    expire() {
        window.dispatchEvent(new CustomEvent("poison-entry-expired", { detail: this }));
    }
}
