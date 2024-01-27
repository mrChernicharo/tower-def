import { Link } from "react-router-dom";
import { imgs } from "../../shared/constants/general";

export function Start() {
    return (
        <div id="start-screen">
            <div id="top-section">
                <h1>Tower Defense</h1>
            </div>

            <div id="splash-container">
                <img id="splash-img" src={imgs.Splash} />
            </div>

            <div id="start-btn-container">
                <Link to="/level-selection">
                    <button className="glow">Start Game</button>
                </Link>
            </div>

            <div id="bottom-container">
                <button>
                    <Link to="/settings">
                        <img src={imgs.Settings} width={24} height={24} />
                    </Link>
                </button>
            </div>
        </div>
    );
}
