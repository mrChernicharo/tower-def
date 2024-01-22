import { DEFAULT_POISON_DAMAGE } from "../shared/constants/general";
import { idMaker } from "../shared/helpers";
import { PlayerSkills } from "../shared/types";

const POISON_DMG_COOLDOWN = 1.9;

export class PoisonEntry {
    id: string;
    enemyId: string;
    duration: number;
    damage: number;
    elapsed = 0;
    cooldown = POISON_DMG_COOLDOWN;
    constructor(enemyId: string, durationInSeconds: number, towerLevel: number, skills: PlayerSkills) {
        this.id = idMaker();
        this.enemyId = enemyId;
        let duration = durationInSeconds;

        if (skills.poison[1]) {
            duration += skills.poison[1].effect.POISON_DURATION!.value; // skill::poison-2
        }
        if (skills.poison[4]) {
            duration += skills.poison[4].effect.POISON_DURATION!.value; // skill::poison-5
        }

        const defaultDamage = DEFAULT_POISON_DAMAGE[towerLevel - 1];
        let poisonDamage = defaultDamage;

        if (skills.poison[0]) {
            poisonDamage += (defaultDamage * skills.poison[0].effect.POISON_DAMAGE!.value) / 100; // skill::poison-1
        }
        if (skills.poison[3]) {
            poisonDamage += (defaultDamage * skills.poison[3].effect.POISON_DAMAGE!.value) / 100; // skill::poison-4
        }
        if (skills.poison[4]) {
            poisonDamage += (defaultDamage * skills.poison[4].effect.POISON_DAMAGE!.value) / 100; // skill::poison-5
        }

        this.duration = duration;
        this.damage = poisonDamage;
        // console.log("POISON ENTRY", this);
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
