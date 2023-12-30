import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { destroyGame, initGame } from "../../game/game";
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";

const topBarStyles = {
    display: "flex",
    justifyContent: "space-between",
};

const Game = () => {
    const { area, level } = useParams();
    const { gold, hp } = usePlayerContext();
    const gameRunning = useRef(false);

    useEffect(() => {
        if (gameRunning.current) return;

        initGame(+level!, { gold, hp });
        gameRunning.current = true;

        return () => {
            destroyGame();
            gameRunning.current = false;
        };
    }, [area, gold, hp, level]);

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

            <div id="end-game-banner" className="hidden"></div>
        </>
    );
};

export default Game;
