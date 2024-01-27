import { Outlet } from "react-router-dom";
import { usePlayerContext } from "./context/usePlayerContext";
import { useEffect } from "react";
import { sound } from "../constants/sounds";
export function Root() {
    const { loaded } = usePlayerContext();

    function onBtnClick(e: MouseEvent) {
        const clickedButton = [...e.composedPath()].some((el) => (el as Element).tagName === "BUTTON");
        if (clickedButton) {
            sound.click();
        }
    }

    useEffect(() => {
        window.addEventListener("click", onBtnClick);
        return () => {
            window.removeEventListener("click", onBtnClick);
        };
    }, []);

    if (!loaded) return <>Loading...</>;
    return (
        <>
            <Outlet />
        </>
    );
}
