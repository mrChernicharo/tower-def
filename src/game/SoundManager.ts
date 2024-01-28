import { sounds } from "../constants/sounds";

export class SoundManager {
    soundOn!: boolean;
    musicOn!: boolean;
    constructor() {
        this.updateSettings();
    }

    updateSettings() {
        setTimeout(() => {
            const dataContainer = document.querySelector("#data-container") as HTMLDivElement;
            console.log(dataContainer);
            this.soundOn = dataContainer.dataset["sound"] === "on";
            this.musicOn = dataContainer.dataset["music"] === "on";

            console.log(this);
        }, 200);
    }

    play(soundName: keyof typeof sounds) {
        if (this.soundOn) {
            sounds[soundName]();
        }
    }
}
