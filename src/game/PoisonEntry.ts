import { idMaker } from "../shared/helpers";
import { PlayerSkills } from "../shared/types";

const POISON_DMG_COOLDOWN = 2.2;

export class PoisonEntry {
    id: string;
    enemyId: string;
    duration: number;
    elapsed = 0;
    cooldown = POISON_DMG_COOLDOWN;
    constructor(enemyId: string, durationInSeconds: number, skills: PlayerSkills) {
        this.id = idMaker();
        this.enemyId = enemyId;

        let duration = durationInSeconds;

        if (skills.poison[1]) {
            duration += skills.poison[1].effect.POISON_DURATION!.value; // skill::poison-2
        }
        if (skills.poison[4]) {
            duration += skills.poison[4].effect.POISON_DURATION!.value; // skill::poison-5
        }

        console.log("POISON ENTRY", { duration });
        this.duration = duration;
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
