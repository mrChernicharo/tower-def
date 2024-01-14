/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { destroyGame, initGame } from "../../game/game";
import { usePlayerContext } from "../context/usePlayerContext";
import { LevelStarCount, PlayerSkills, SkillId } from "../../game/types";
import { GAME_LEVELS, imgs } from "../../game/constants";
import { AiFillSound } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";

const Game = () => {
    const { area, level } = useParams();
    const { gold, hp, skills, updateStars } = usePlayerContext();
    const gameRunning = useRef(false);

    const onGameWon = useCallback(
        (e: CustomEvent<LevelStarCount>) => {
            console.log("game-win", { e, stars: e.detail });
            updateStars(Number(level), e.detail);
        },
        [level, updateStars]
    ) as () => void;

    useEffect(() => {
        if (gameRunning.current || !area || !level) return;

        const skillsObj: Partial<PlayerSkills> = {};
        Object.entries(skills).forEach(([id, bool]) => {
            if (bool) {
                skillsObj[id as SkillId] = true;
            }
        });
        // console.log({ skillsObj });

        initGame({
            gold,
            hp,
            area,
            level: +level,
            skills: skillsObj,
        });
        gameRunning.current = true;

        return () => {
            destroyGame();
            gameRunning.current = false;
        };
    }, [area, gold, hp, level, skills]);

    useEffect(() => {
        window.addEventListener("game-win", onGameWon);
        return () => {
            window.removeEventListener("game-win", onGameWon);
        };
    }, [onGameWon]);

    return (
        <>
            <div id="game-screen-header">
                <div id="stats-displays-container">
                    <div className="top-line">
                        <div id="gold-display">
                            <img src={imgs.Coins} width={16} height={16} />
                            {gold}
                        </div>
                        <div id="hp-display">❤️{hp}</div>
                    </div>
                    <div className="bottom-line">
                        <div id="wave-display">Wave 1/{GAME_LEVELS[+level!].waves.length}</div>
                    </div>
                </div>

                <div id="speed-btn-container">
                    <h4>Game Speed</h4>
                    <div id="speed-btn"></div>
                </div>

                {/* <button id="play-pause-btn">▶️</button> */}
                <button id="play-pause-btn">⏸️</button>
            </div>

            {/* GAME CANVAS */}
            <div id="game-canvas"></div>
            {/* GAME CANVAS */}

            <div id="game-screen-footer"></div>

            {/* OVERLAY SCREENS */}
            <div id="pause-game-screen" className="hidden">
                <div id="pause-content">
                    <h2>Pause</h2>
                    <div>
                        <button>
                            <AiFillSound />
                        </button>
                        <button>
                            <FaMusic />
                        </button>
                    </div>
                    <div>
                        <button id="resume-game-btn">Resume</button>
                        <Link to={`/area-selection`}>
                            <button>Quit</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div id="end-game-screen" className="hidden"></div>

            <div id="loading-screen">
                <div id="progress-bar-container">
                    <label htmlFor="progress-bar">Loading...</label>
                    <progress id="progress-bar" value={0} max={100}></progress>
                </div>
            </div>
        </>
    );
};

export default Game;

// const skillList = Object.entries(skills)
//     .filter(([_id, bool]) => bool)
//     .map(([id, _bool]) => ({
//         ...gameSkills[id.split("-")[0] as keyof typeof gameSkills][Number(id.split("-")[1]) - 1],
//     }));
// console.log(skillList);
