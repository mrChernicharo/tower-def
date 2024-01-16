import { getD } from "./helpers";

const METEOR_COOLDOWN = 16;
// const BLIZZARD_COOLDOWN = 2;
const BLIZZARD_COOLDOWN = 8;

export class PlayerStats {
    hp: number;
    gold: number;
    hpDisplay: HTMLDivElement;
    goldDisplay: HTMLDivElement;
    meteorCooldown: number;
    blizzardCooldown: number;
    blizzardCooldownArc: SVGGElement;
    meteorCooldownArc: SVGGElement;
    constructor(playerStats: { hp: number; gold: number }) {
        this.hp = playerStats.hp;
        this.gold = playerStats.gold;
        this.hpDisplay = document.querySelector("#hp-display")!;
        this.goldDisplay = document.querySelector("#gold-display > #gold")!;
        this.goldDisplay.innerHTML = `${this.gold}`;
        this.meteorCooldown = 0;
        this.blizzardCooldown = 0;
        this.blizzardCooldownArc = document.querySelector("#blizzard-action-btn > svg > .cooldown-arc") as SVGGElement;
        this.meteorCooldownArc = document.querySelector("#meteor-action-btn > svg > .cooldown-arc") as SVGGElement;
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

            this._updateCooldownUI(meteorArcs, METEOR_COOLDOWN, this.meteorCooldown);
            this.meteorCooldown -= delta;
        } else if (!meteorBtn.classList.contains("ready")) {
            this.meteorCooldown = 0;
            console.log("METEOR READY");

            meteorBtn.classList.add("ready");
            this.meteorCooldownArc.classList.add("hidden");
            meteorArcs[1].setAttribute("d", "");
        }

        if (this.blizzardCooldown > 0) {
            if (this.blizzardCooldown === BLIZZARD_COOLDOWN) {
                console.log("blizzard cooldown started", this.blizzardCooldown);
            }

            if (blizzardBtn.classList.contains("ready")) {
                blizzardBtn.classList.remove("ready");
                this.blizzardCooldownArc.classList.remove("hidden");
            }

            this._updateCooldownUI(blizzardArcs, BLIZZARD_COOLDOWN, this.blizzardCooldown);
            this.blizzardCooldown -= delta;
        } else if (!blizzardBtn.classList.contains("ready")) {
            console.log("blizzard READY", this.blizzardCooldown);
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
        this.meteorCooldown = METEOR_COOLDOWN;
    }

    fireBlizzard() {
        this.blizzardCooldown = BLIZZARD_COOLDOWN;
    }
}
