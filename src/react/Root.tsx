import { Outlet } from "react-router-dom";
import { usePlayerContext } from "./context/usePlayerContext";
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
