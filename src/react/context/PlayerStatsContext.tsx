import { ReactNode, createContext, useEffect, useState } from "react";
import { wait } from "../../game/helpers";
import { GlobalPlayerStats, LevelStarMap } from "../../game/types";

export type PlayerStatsContextType = {
    loaded: boolean;
    gold: number;
    hp: number;
    stars: LevelStarMap;
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    loaded: false,
    gold: 0,
    hp: 0,
    stars: [],
});

export const PlayerStatsContextProvider = ({ children }: { children: ReactNode }) => {
    const [playerStats, setPlayerStats] = useState<GlobalPlayerStats | null>(null);

    useEffect(() => {
        loadUserStats().then((stats) => {
            setPlayerStats(stats);
        });
    }, []);

    useEffect(() => {
        console.log("update localStorage", { playerStats });
        localStorage.setItem("playerStats", JSON.stringify(playerStats));
    }, [playerStats]);

    const value = {
        loaded: !!playerStats,
        gold: playerStats?.gold ?? 0,
        hp: playerStats?.hp ?? 0,
        stars: playerStats?.stars ?? [],
    };

    return <PlayerStatsContext.Provider value={value}>{children}</PlayerStatsContext.Provider>;
};

async function loadUserStats() {
    const stats: GlobalPlayerStats = {
        gold: 250,
        hp: 10,
        stars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    await wait(1000);

    return Promise.resolve(stats);
}
