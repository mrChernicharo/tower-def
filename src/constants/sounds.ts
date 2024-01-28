const arrowHitSound = new Audio("/assets/audio/hit.01.mp3");
arrowHitSound.volume = 0.25;

export const sounds = {
    woosh01: () => new Audio("/assets/audio/woosh.01.mp3").play(),
    woosh02: () => {
        const s = new Audio("/assets/audio/woosh.02.mp3");
        s.volume = 0.65;
        s.play();
    },
    woosh03: () => {
        const s = new Audio("/assets/audio/woosh.03.mp3");
        s.play();
    },
    coin: () => {
        const s = new Audio("/assets/audio/coin.mp3");
        s.volume = 0.2;
        s.play();
    },
    click: () => new Audio("/assets/audio/click.mp3").play(),
    gameWin: () => new Audio("/assets/audio/game-win.mp3").play(),
    gameLose: () => new Audio("/assets/audio/game-lose.mp3").play(),
    crow: () => {
        const s = new Audio("/assets/audio/crow.mp3");
        s.play();

        setTimeout(() => {
            const s = new Audio("/assets/audio/crow.mp3");
            s.play();
        }, 600);

        setTimeout(() => {
            const s = new Audio("/assets/audio/crow.mp3");
            s.volume = 0.65;
            s.play();
        }, 1400);
    },
    build: () => {
        const s = new Audio("/assets/audio/build.mp3");
        s.playbackRate = 2;
        s.play();
    },
    upgrade: () => new Audio("/assets/audio/upgrade.mp3").play(),
    sell: () => new Audio("/assets/audio/sell.mp3").play(),
    blizzard: () => new Audio("/assets/audio/blizzard.mp3").play(),
    meteor: () => {
        const s = new Audio("/assets/audio/meteor.mp3");
        // s.playbackRate = 1.2;
        s.play();
    },
    cannon: () => new Audio("/assets/audio/cannon.mp3").play(),
    arrowHit: () => {
        arrowHitSound.play();
    },
    hit00: () => {
        const s = new Audio("/assets/audio/hit.00.wav");
        s.volume = 0.5;
        s.play();
    },
    hit01: () => {
        const s = new Audio("/assets/audio/hit.01.mp3");
        s.volume = 0.5;
        s.play();
    },
    hit02: () => {
        const s = new Audio("/assets/audio/hit.02.mp3");
        s.play();
    },
    hit03: () => {
        const s = new Audio("/assets/audio/hit.03.mp3");
        s.play();
    },
    explosion: () => {
        const s = new Audio("/assets/audio/explosion.mp3");
        s.playbackRate = 1.5;
        s.play();
    },
    loseHP: () => {
        const s = new Audio("/assets/audio/hit-gore.wav");
        s.playbackRate = 1.4;
        s.play();
    },
};
