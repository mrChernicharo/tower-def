import { GlobalPlayerStats } from "../react/utils/types";

export class PlayerStats {
    hp: number;
    gold: number;
    hpDisplay: HTMLDivElement;
    goldDisplay: HTMLDivElement;
    constructor(playerStats: GlobalPlayerStats) {
        this.hp = playerStats.hp;
        this.gold = playerStats.gold;
        this.hpDisplay = document.querySelector("#hp-display")!;
        this.goldDisplay = document.querySelector("#gold-display")!;
    }

    gainGold(n: number) {
        this.gold += n;
        this.goldDisplay.innerHTML = `$${this.gold}`;
    }
    spendGold(n: number) {
        this.gold -= n;
        this.goldDisplay.innerHTML = `$${this.gold}`;
    }
    gainHP(n: number) {
        this.hp += n;
        this.hpDisplay.innerHTML = `$${this.hp}`;
    }
    spendHP(n: number) {
        this.hp -= n;
        this.hpDisplay.innerHTML = `$${this.hp}`;
    }
}
