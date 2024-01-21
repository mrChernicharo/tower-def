import { Outlet } from "react-router-dom";
import { usePlayerContext } from "./context/usePlayerContext";
import { isMobileDevice } from "../shared/helpers";
import { useState, useEffect, useCallback } from "react";

export function Root() {
    const { loaded } = usePlayerContext();
    const [isMobile, setIsMobile] = useState(false);
    const [orientationLocked, setOrientationLocked] = useState(false);

    const requestFullScreen = useCallback(() => {
        console.log("....request fullScreen");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const el = document.body as any;

        const requestMethod =
            el.requestFullscreen ||
            el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullscreen;

        requestMethod.call(el);

        setTimeout(() => {
            console.log("....lock screen orientation");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window.screen.orientation as any).lock("landscape");
            setOrientationLocked(true);
        }, 1000);
        return false;
    }, []);

    useEffect(() => {
        console.log("is mobile", isMobileDevice());

        if (isMobileDevice()) {
            setIsMobile(true);
        }
    }, []);

    if (!loaded) return <>Loading...</>;

    if (isMobile)
        return (
            <>
                {!orientationLocked && (
                    <div id="full-screen-request-modal-overlay">
                        <div id="full-screen-request-modal">
                            <h2>Mobile device detected</h2>
                            <button onClick={requestFullScreen}>go full screen</button>
                            {/* <button onClick={exitFullScreen}>minimize screen</button> */}
                        </div>
                    </div>
                )}
                <Outlet />
            </>
        );
    else
        return (
            <>
                <Outlet />
            </>
        );
}
