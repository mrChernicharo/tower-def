import { Outlet } from "react-router-dom";
import { usePlayerContext } from "./context/usePlayerContext";
import { useCallback, useEffect } from "react";
import { sounds } from "../constants/sounds";
import { useAudioContext } from "./context/useAudioContext";
export function Root() {
    const { loaded } = usePlayerContext();
    const { sound } = useAudioContext();

    const onBtnClick = useCallback(
        (e: MouseEvent) => {
            const clickedButton = [...e.composedPath()].some((el) => (el as Element).tagName === "BUTTON");
            if (clickedButton) {
                if (sound) {
                    sounds.click();
                }
            }
        },
        [sound]
    );

    useEffect(() => {
        window.addEventListener("click", onBtnClick);
        return () => {
            window.removeEventListener("click", onBtnClick);
        };
    }, [onBtnClick]);

    if (!loaded) return <>Loading...</>;
    return (
        <>
            <Outlet />
            <div id="data-container"></div>
        </>
    );
}
