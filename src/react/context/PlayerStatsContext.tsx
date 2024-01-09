import { ReactNode, createContext, useEffect, useState } from "react";
import { getTotalStageCount, wait } from "../../game/helpers";
import { GlobalPlayerStats, LevelStarCount, LevelStarMap } from "../../game/types";

export type PlayerStatsContextType = {
    loaded: boolean;
    gold: number;
    hp: number;
    stars: LevelStarMap;
    updateStars: (stage: number, starCount: LevelStarCount) => void;
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    loaded: false,
    gold: 0,
    hp: 0,
    stars: [],
    updateStars() {},
});

export const PlayerStatsContextProvider = ({ children }: { children: ReactNode }) => {
    const [playerStats, setPlayerStats] = useState<GlobalPlayerStats | null>(null);

    useEffect(() => {
        loadUserStats().then((stats) => {
            setPlayerStats(stats);
        });
    }, []);

    // localStorage Sync
    useEffect(() => {
        if (playerStats) {
            console.log("update localStorage", { playerStats });
            localStorage.setItem("playerStats", JSON.stringify(playerStats));
        }
    }, [playerStats]);

    const value: PlayerStatsContextType = {
        loaded: !!playerStats,
        gold: playerStats?.gold ?? 0,
        hp: playerStats?.hp ?? 0,
        stars: playerStats?.stars ?? [],
        updateStars(stage, starCount) {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.stars && starCount > copy.stars[stage]) {
                    copy.stars?.splice(stage, 1, starCount);
                }
                return { ...copy, stars: copy.stars } as GlobalPlayerStats;
            });
        },
    };

    return <PlayerStatsContext.Provider value={value}>{children}</PlayerStatsContext.Provider>;
};

async function loadUserStats() {
    const defaultPlayerStats: GlobalPlayerStats = {
        gold: 250,
        hp: 10,
        stars: Array(getTotalStageCount()).fill(0),
    };

    const stats = localStorage.getItem("playerStats")
        ? JSON.parse(localStorage.getItem("playerStats")!)
        : defaultPlayerStats;

    console.log("set initial playerStats", { stats });

    await wait(1000);

    return Promise.resolve(stats);
}
