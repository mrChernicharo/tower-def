/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { LevelStarCount, PlayerSkills, SkillId } from "../../shared/types";
import { imgs } from "../../shared/constants/general";
import { AiFillSound } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { GAME_LEVELS } from "../../shared/constants/levels/game-levels";

// import { IoMdClose } from "react-icons/io";
// <IoMdClose />
// ←

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

        import("../../game/game").then(({ initGame }) => {
            initGame({
                hp,
                area,
                level: +level,
                skills: skillsObj,
            });
            gameRunning.current = true;
        });

        return () => {
            import("../../game/game").then(({ destroyGame }) => {
                destroyGame();
                gameRunning.current = false;
            });
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
                            <span id="gold">{gold}</span>
                        </div>
                        <div id="hp-display">❤️{hp}</div>
                    </div>
                    <div className="bottom-line">
                        <div id="wave-display">Wave 1/{GAME_LEVELS[+level!].waves.length}</div>
                    </div>
                </div>

                <div id="stage-num-container">
                    <div>stage</div>
                    <div style={{ fontWeight: "bold" }}>{level && +level + 1}</div>
                </div>

                <div id="speed-btn-container">
                    <h4>Game Speed</h4>
                    <div id="speed-btn"></div>
                </div>

                <button id="play-pause-btn">⏸️ {/* ▶️ */}</button>
            </div>

            {/* ******************* GAME CANVAS ******************* */}
            <div id="game-canvas"></div>
            {/* ******************* GAME CANVAS ******************* */}

            <div id="game-screen-footer">
                <div className="action-btns">
                    {/* <button>
                        <img src={imgs.Plague} width={42} height={42} />
                    </button> */}
                    <button id="meteor-action-btn">
                        <div className="cancel-badge">
                            <RiCloseCircleFill />
                        </div>
                        <img src={imgs.Meteor} width={42} height={42} />
                        <svg>
                            <g className="cooldown-arc">
                                <path className="filled" />
                                <path className="empty" />
                            </g>
                        </svg>
                    </button>

                    <button id="blizzard-action-btn">
                        <div className="cancel-badge">
                            <RiCloseCircleFill />
                        </div>
                        <img src={imgs.Blizzard} width={42} height={42} />
                        <svg>
                            <g className="cooldown-arc">
                                <path className="filled" />
                                <path className="empty" />
                            </g>
                        </svg>
                    </button>
                </div>

                <div className="action-btns">
                    {/* <button>
                        <img src={imgs.Trap} width={42} height={42} />
                    </button> */}
                    {/* <button>
                        <img src={imgs.Rune} width={42} height={42} />
                    </button> */}
                    {/* <button>
                        <img src={imgs.Potion} width={42} height={42} />
                    </button> */}
                </div>
            </div>

            {/* OVERLAY SCREENS */}
            <div id="pause-game-screen" className="hidden">
                <div id="pause-content">
                    <h2 style={{ marginBottom: 10 }}>Pause</h2>

                    <div className="btn-row">
                        <button>
                            <AiFillSound />
                        </button>
                        <button>
                            <FaMusic />
                        </button>
                    </div>

                    <div className="btn-row">
                        <button id="resume-game-btn">Resume</button>
                    </div>

                    <div className="btn-row">
                        <button
                            id="restart-game-btn"
                            onClick={() => {
                                if (confirm("Are you sure you want to restart?")) location.reload();
                            }}
                        >
                            Restart
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure you want to quit?")) location.assign("#/area-selection");
                            }}
                        >
                            Quit
                        </button>
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
