import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { destroyGame, initGame } from "../game";

const Game = () => {
    const { area, level } = useParams();

    useEffect(() => {
        initGame();

        return () => {
            destroyGame();
        };
    }, []);

    return (
        <>
            <div>Game Screen</div>
            <div>
                {area} {level}
            </div>

            <div id="game-canvas"></div>
        </>
    );
};

export default Game;
