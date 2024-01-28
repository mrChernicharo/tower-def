import { ReactNode, createContext, useEffect, useState } from "react";

export type AudioContextType = {
    sound: boolean;
    music: boolean;
    soundOn: () => void;
    soundOff: () => void;
    musicOn: () => void;
    musicOff: () => void;
};

export const AudioContext = createContext<AudioContextType>({
    sound: true,
    music: true,
    soundOn: () => {},
    soundOff: () => {},
    musicOn: () => {},
    musicOff: () => {},
});

export const AudioContextProvider = ({ children }: { children: ReactNode }) => {
    const [sound, setSound] = useState(true);
    const [music, setMusic] = useState(true);

    const soundOn = () => {
        setSound(true);
    };
    const soundOff = () => {
        setSound(false);
    };
    const musicOn = () => {
        setMusic(true);
    };
    const musicOff = () => {
        setMusic(false);
    };

    useEffect(() => {
        window.addEventListener("sound-on", soundOn);
        window.addEventListener("sound-off", soundOff);
        window.addEventListener("sound-on", soundOn);
        window.addEventListener("sound-off", soundOff);
        return () => {
            window.removeEventListener("sound-on", soundOn);
            window.removeEventListener("sound-off", soundOff);
            window.removeEventListener("sound-on", soundOn);
            window.removeEventListener("sound-off", soundOff);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const dataEl = document.querySelector("#data-container") as HTMLDivElement;
            if (dataEl) {
                dataEl.dataset["sound"] = sound ? "on" : "off";
            }
        }, 120);
    }, [sound]);

    useEffect(() => {
        setTimeout(() => {
            const dataEl = document.querySelector("#data-container") as HTMLDivElement;
            if (dataEl) {
                dataEl.dataset["music"] = music ? "on" : "off";
            }
        }, 120);
    }, [music]);

    const value = { sound, music, soundOn, soundOff, musicOn, musicOff };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
