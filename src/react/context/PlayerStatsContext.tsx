import { ReactNode, createContext, useEffect, useState } from "react";
import { getTotalStageCount, wait } from "../../game/helpers";
import { GlobalPlayerStats, LevelStarCount, LevelStarMap, PlayerSkills, Skill } from "../../game/types";

export type PlayerStatsContextType = {
    hp: number;
    gold: number;
    stars: LevelStarMap;
    unlockedStages: number;
    loaded: boolean;
    skills: PlayerSkills;
    updateStars: (stage: number, starCount: LevelStarCount) => void;
    addSkill: (skill: Skill) => void;
};

const defaultPlayerSkills = {
    "constructor-1": false,
    "constructor-2": false,
    "constructor-3": false,
    "constructor-4": false,
    "constructor-5": false,
    "constructor-6": false,
    "merchant-1": false,
    "merchant-2": false,
    "merchant-3": false,
    "merchant-4": false,
    "merchant-5": false,
    "merchant-6": false,
    "chemist-1": false,
    "chemist-2": false,
    "chemist-3": false,
    "chemist-4": false,
    "chemist-5": false,
    "chemist-6": false,
    "blacksmith-1": false,
    "blacksmith-2": false,
    "blacksmith-3": false,
    "blacksmith-4": false,
    "blacksmith-5": false,
    "blacksmith-6": false,
};

const defaultPlayerStats: GlobalPlayerStats = {
    hp: 10,
    gold: 250,
    stars: Array(getTotalStageCount()).fill(0),
    unlockedStages: 0,
    skills: defaultPlayerSkills,
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    ...defaultPlayerStats,
    loaded: false,
    updateStars() {},
    addSkill() {},
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
        hp: playerStats?.hp ?? defaultPlayerStats.hp,
        gold: playerStats?.gold ?? defaultPlayerStats.gold,
        stars: playerStats?.stars ?? defaultPlayerStats.stars,
        unlockedStages: playerStats?.unlockedStages ?? defaultPlayerStats.unlockedStages,
        skills: playerStats?.skills ?? defaultPlayerStats.skills,
        loaded: !!playerStats,
        updateStars(stage, starCount) {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.stars && starCount > copy.stars[stage]) {
                    copy.stars?.splice(stage, 1, starCount);
                }
                return {
                    ...copy,
                    stars: copy.stars,
                    unlockedStages: copy.stars?.filter((v) => v > 0).length,
                } as GlobalPlayerStats;
            });
        },
        addSkill(skill) {
            console.log({ skill });

            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.skills) {
                    copy.skills[skill.id as keyof PlayerSkills] = true;
                }

                return { ...copy } as GlobalPlayerStats;
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
