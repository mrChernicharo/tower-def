import { ReactNode, createContext, useEffect, useState } from "react";
import { getTotalStageCount } from "../../shared/helpers";
import { GlobalPlayerStats, LevelStarCount, LevelStarMap, PlayerSkillIDsMap, Skill } from "../../shared/types";
import { defaultPlayerSkills } from "../../shared/constants/general";

const defaultPlayerStats: GlobalPlayerStats = {
    hp: 10,
    gold: 0,
    stars: Array(getTotalStageCount()).fill(0),
    skills: defaultPlayerSkills,
};

export type PlayerStatsContextType = {
    hp: number;
    gold: number;
    stars: LevelStarMap;
    loaded: boolean;
    skills: PlayerSkillIDsMap;
    updateStars: (stage: number, starCount: LevelStarCount) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (skill: Skill) => void;
    resetAllSkills: () => void;
};

export const PlayerStatsContext = createContext<PlayerStatsContextType>({
    ...defaultPlayerStats,
    loaded: false,
    updateStars() {},
    addSkill() {},
    removeSkill() {},
    resetAllSkills: () => {},
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
                } as GlobalPlayerStats;
            });
        },
        addSkill(skill) {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.skills) {
                    copy.skills[skill.id as keyof PlayerSkillIDsMap] = true;
                }

                return { ...copy } as GlobalPlayerStats;
            });
        },
        removeSkill(skill) {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                if (copy.skills) {
                    // remove skill
                    copy.skills[skill.id as keyof PlayerSkillIDsMap] = false;

                    // remove greater skills in the same column
                    Object.entries(copy.skills).forEach(([id]) => {
                        const skillId = id as keyof typeof copy.skills;
                        const skillPath = skillId.split("-")[0];

                        if (skillPath !== skill.id.split("-")[0]) return;

                        const skillLevel = Number(skillId.split("-")[1]);

                        if (skillLevel > Number(skill.id.split("-")[1])) {
                            if (copy.skills && copy.skills[skillId]) {
                                copy.skills[skillId] = false;
                            }
                        }
                    });
                    console.log("ha", copy.skills);
                }

                return { ...copy } as GlobalPlayerStats;
            });
        },
        resetAllSkills() {
            setPlayerStats((prev) => {
                const copy = { ...prev };

                return { ...copy, skills: {} } as GlobalPlayerStats;
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

    return Promise.resolve(stats);
}
