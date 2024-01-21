import { DEFAULT_METEOR_COOLDOWN, DEFAULT_BLIZZARD_COOLDOWN } from "../shared/constants/general";
import { getD } from "../shared/helpers";
import { PlayerSkills } from "../shared/types";

export class PlayerStats {
    hp: number;
    gold: number;
    skills: PlayerSkills;
    hpDisplay: HTMLDivElement;
    goldDisplay: HTMLDivElement;
    meteorCooldown: number;
    meteorCooldownTime: number;
    meteorCooldownArc: SVGGElement;
    blizzardCooldown: number;
    blizzardCooldownTime: number;
    blizzardCooldownArc: SVGGElement;
    constructor(playerStats: { hp: number; gold: number; skills: PlayerSkills }) {
        this.hp = playerStats.hp;
        this.gold = playerStats.gold;
        this.skills = playerStats.skills;

        this.hpDisplay = document.querySelector("#hp-display")!;
        this.goldDisplay = document.querySelector("#gold-display > #gold")!;
        this.blizzardCooldownArc = document.querySelector("#blizzard-action-btn > svg > .cooldown-arc") as SVGGElement;
        this.meteorCooldownArc = document.querySelector("#meteor-action-btn > svg > .cooldown-arc") as SVGGElement;
        this.goldDisplay.innerHTML = `${this.gold}`;

        // Calc MeteorCooldownTime
        let meteorCooldownTime = DEFAULT_METEOR_COOLDOWN;
        if (this.skills.meteor[1]) {
            meteorCooldownTime -= this.skills.meteor[1].effect.COOLDOWN!.value; // skill::meteor-2
        }
        if (this.skills.meteor[3]) {
            meteorCooldownTime -= this.skills.meteor[3].effect.COOLDOWN!.value; // skill::meteor-4
        }
        this.meteorCooldownTime = meteorCooldownTime;

        let blizzardCooldownTime = DEFAULT_BLIZZARD_COOLDOWN;
        if (this.skills.blizzard[1]) {
            blizzardCooldownTime -= this.skills.blizzard[1].effect.COOLDOWN!.value; // skill::blizzard-2
        }
        if (this.skills.blizzard[3]) {
            blizzardCooldownTime -= this.skills.blizzard[1].effect.COOLDOWN!.value; // skill::blizzard-4
        }
        this.blizzardCooldownTime = blizzardCooldownTime;

        this.meteorCooldown = 0;
        this.blizzardCooldown = 0;
        console.log(this);
    }

    gainGold(n: number) {
        this.gold += n;
        this.goldDisplay.innerHTML = `${this.gold}`;
    }
    spendGold(n: number) {
        this.gold -= n;
        this.goldDisplay.innerHTML = `${this.gold}`;
    }
    gainHP(n: number) {
        this.hp += n;
        this.hpDisplay.innerHTML = `❤️${this.hp}`;
    }
    loseHP(n: number) {
        this.hp -= n;
        this.hpDisplay.innerHTML = `❤️${this.hp}`;
    }

    tick(delta: number) {
        const meteorBtn = document.querySelector("#meteor-action-btn") as HTMLButtonElement;
        const blizzardBtn = document.querySelector("#blizzard-action-btn") as HTMLButtonElement;
        const meteorArcs = this.meteorCooldownArc.children;
        const blizzardArcs = this.blizzardCooldownArc.children;

        if (this.meteorCooldown > 0) {
            if (meteorBtn.classList.contains("ready")) {
                meteorBtn.classList.remove("ready");
                this.meteorCooldownArc.classList.remove("hidden");
            }

            this._updateCooldownUI(meteorArcs, this.meteorCooldownTime, this.meteorCooldown);
            this.meteorCooldown -= delta;
        } else if (!meteorBtn.classList.contains("ready")) {
            this.meteorCooldown = 0;
            // console.log("METEOR READY");
            meteorBtn.classList.add("ready");
            this.meteorCooldownArc.classList.add("hidden");
            meteorArcs[1].setAttribute("d", "");
        }

        if (this.blizzardCooldown > 0) {
            if (blizzardBtn.classList.contains("ready")) {
                blizzardBtn.classList.remove("ready");
                this.blizzardCooldownArc.classList.remove("hidden");
            }

            this._updateCooldownUI(blizzardArcs, this.blizzardCooldownTime, this.blizzardCooldown);
            this.blizzardCooldown -= delta;
        } else if (!blizzardBtn.classList.contains("ready")) {
            // console.log("blizzard READY", this.blizzardCooldown);
            this.blizzardCooldown = 0;
            blizzardBtn.classList.add("ready");
            this.blizzardCooldownArc.classList.add("hidden");
            blizzardArcs[1].setAttribute("d", "");
        }
    }

    _updateCooldownUI(arcs: HTMLCollection, time: number, cooldown: number) {
        const cooldownPerc = (time - cooldown) / time;
        const cooldownDeg = cooldownPerc * 360;

        // const d1 = getD(22, 0, cooldownDeg);
        const d2 = getD(22, cooldownDeg, 360);
        // arcs[0].setAttribute("d", d1);
        arcs[1].setAttribute("d", d2);
    }

    readyToMeteor() {
        return this.meteorCooldown <= 0;
    }

    readyToBlizzard() {
        return this.blizzardCooldown <= 0;
    }

    fireMeteor() {
        console.log("meteor cooldownTime", this.meteorCooldownTime);
        this.meteorCooldown = this.meteorCooldownTime;
    }

    fireBlizzard() {
        this.blizzardCooldown = this.blizzardCooldownTime;
    }
}
