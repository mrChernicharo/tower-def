import { ReactNode, createContext, useEffect, useState } from "react";
import { getTotalStageCount, wait } from "../../game/helpers";
import { GlobalPlayerStats, LevelStarCount, LevelStarMap } from "../../game/types";

export type PlayerStatsContextType = {
    loaded: boolean;
    gold: number;
    hp: number;
    stars: LevelStarMap;
    unlockedStages: number;
    updateStars: (stage: number, starCount: LevelStarCount) => void;
};

const defaultPlayerStats: GlobalPlayerStats = {
    gold: 250,
    hp: 10,
    stars: Array(getTotalStageCount()).fill(0),
    unlockedStages: 0,
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    ...defaultPlayerStats,
    loaded: false,
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
        unlockedStages: playerStats?.unlockedStages ?? 0,
        stars: playerStats?.stars ?? [],
        updateStars(stage, starCount) {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.stars && starCount > copy.stars[stage]) {
                    copy.stars?.splice(stage, 1, starCount);
                }
                return { ...copy, stars: copy.stars, unlockedStages: stage + 1 } as GlobalPlayerStats;
            });
        },
    };

    return <PlayerStatsContext.Provider value={value}>{children}</PlayerStatsContext.Provider>;
};

async function loadUserStats() {
    const stats = localStorage.getItem("playerStats")
        ? JSON.parse(localStorage.getItem("playerStats")!)
        : defaultPlayerStats;

    console.log("set initial playerStats", { stats });

    await wait(1000);

    return Promise.resolve(stats);
}
