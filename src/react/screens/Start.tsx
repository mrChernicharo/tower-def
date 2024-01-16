import { Link } from "react-router-dom";
import { imgs } from "../../game/constants";

export function Start() {
    return (
        <div id="start-screen">
            <h1>Tower Defense</h1>

            <div id="splash-container">
                <img id="splash-img" src={imgs.Splash} />
            </div>

            <div id="start-btn-container">
                <Link to="/area-selection">
                    <button>Start Game</button>
                </Link>
            </div>
        </div>
    );
}
