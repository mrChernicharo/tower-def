import { ReactNode, createContext, useEffect, useState } from "react";
import { wait } from "../../game/helpers";
import { GlobalPlayerStats } from "../utils/types";

export type PlayerStatsContextType = {
    loaded: boolean;
    gold: number;
    hp: number;
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    loaded: false,
    gold: 0,
    hp: 0,
});

export const PlayerStatsContextProvider = ({ children }: { children: ReactNode }) => {
    const [playerStats, setPlayerStats] = useState<GlobalPlayerStats | null>(null);
    useEffect(() => {
        loadUserStats().then((stats) => {
            setPlayerStats(stats);
        });
    }, []);

    return (
        <PlayerStatsContext.Provider
            value={{
                loaded: !!playerStats,
                gold: playerStats?.gold ?? 0,
                hp: playerStats?.hp ?? 0,
            }}
        >
            {children}
        </PlayerStatsContext.Provider>
    );
};

async function loadUserStats() {
    const stats: GlobalPlayerStats = {
        gold: 1000,
        hp: 10,
    };

    await wait(1000);

    return Promise.resolve(stats);
}
