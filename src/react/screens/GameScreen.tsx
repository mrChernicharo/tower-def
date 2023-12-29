import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { destroyGame, initGame } from "../../game/game";
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/PlayerStatsContext";

const topBarStyles = {
    display: "flex",
    justifyContent: "space-between",
};

const Game = () => {
    const { area, level } = useParams();

    const { gold, hp } = usePlayerContext();

    useEffect(() => {
        initGame(+level!, { gold, hp });

        return () => {
            destroyGame();
        };
    }, [area, level]);

    return (
        <>
            <div style={topBarStyles}>
                <Link to={`/area/${area}`}>←</Link>
                <div>Game Screen</div>
                <div>
                    {area} {level}
                </div>
                <div id="gold-display">${gold}</div>
                <div id="hp-display">❤️{hp}</div>
                <button id="play-pause-btn">Start</button>
            </div>

            <div id="game-canvas"></div>
        </>
    );
};

export default Game;
