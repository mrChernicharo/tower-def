import { Link } from "react-router-dom";
import { appRoutes } from "../utils/appRoutes";

export function Start() {
    return (
        <div>
            <h1>Start</h1>

            {appRoutes
                .filter((r) => r.path && !/\/./g.test(r.path))
                .map((r) => (
                    <li key={r.path}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))}
        </div>
    );
}
