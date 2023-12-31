import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { destroyGame, initGame } from "../../game/game";
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { LevelStarCount } from "../../game/types";

const topBarStyles = {
    display: "flex",
    justifyContent: "space-between",
};

const Game = () => {
    const { area, level } = useParams();
    const { gold, hp, updateStars } = usePlayerContext();
    const gameRunning = useRef(false);

    useEffect(() => {
        if (gameRunning.current || !area || !level) return;

        initGame({ gold, hp, area, level: +level });
        gameRunning.current = true;

        return () => {
            destroyGame();
            gameRunning.current = false;
        };
    }, [area, gold, hp, level]);

    const onGameWon = useCallback(
        (e: CustomEvent<LevelStarCount>) => {
            console.log("game-win", { e, stars: e.detail });
            updateStars(Number(level), e.detail);
        },
        [level, updateStars]
    ) as () => void;

    useEffect(() => {
        window.addEventListener("game-win", onGameWon);
        return () => {
            window.removeEventListener("game-win", onGameWon);
        };
    }, [onGameWon]);

    return (
        <>
            <div style={topBarStyles}>
                <Link to={`/area/${area}`}>←</Link>
                <div>
                    {area} {level}
                </div>
                <div id="gold-display">${gold}</div>
                <div id="hp-display">❤️{hp}</div>
                <div id="wave-display"></div>
                <button id="play-pause-btn">Start Game</button>
            </div>

            <div id="game-canvas"></div>

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
