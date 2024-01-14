import { Link } from "react-router-dom";
// import { appRoutes } from "../utils/appRoutes";
import { imgs } from "../../game/constants";

export function Start() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Tower Defense</h1>

            <img src={imgs.Splash} width={800} />

            <Link to="area">
                <button>Start</button>
            </Link>

            {/* {appRoutes
                .filter((r) => r.path && !/\/./g.test(r.path))
                .map((r) => (
                    <li key={r.path}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))} */}
        </div>
    );
}
