import { Outlet } from "react-router-dom";
import { usePlayerContext } from "./context/PlayerStatsContext";
export function Root() {
    const { loaded } = usePlayerContext();

    if (!loaded) return <>Loading...</>;

    return (
        <>
            <div>Root</div>

            <Outlet />
        </>
    );
}
