import ReactDOM from "react-dom/client";
import { Routes } from "./react/router.tsx";
import "./index.css";
import "./react/screens/screens.css";
import { PlayerStatsContextProvider } from "./react/context/PlayerStatsContext.tsx";
import { LayoutContextProvider } from "./react/context/LayoutContext.tsx";
import { AudioContextProvider } from "./react/context/AudioContext.tsx";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <LayoutContextProvider>
        <AudioContextProvider>
            <PlayerStatsContextProvider>
                <Routes />
            </PlayerStatsContextProvider>
        </AudioContextProvider>
    </LayoutContextProvider>
    // </React.StrictMode>
);
