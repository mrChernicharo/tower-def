import ReactDOM from "react-dom/client";
import { Routes } from "./react/router.tsx";
import "./index.css";
import "./react/screens/screens.css";
import { PlayerStatsContextProvider } from "./react/context/PlayerStatsContext.tsx";
import { LayoutContextProvider } from "./react/context/LayoutContext.tsx";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <LayoutContextProvider>
        <PlayerStatsContextProvider>
            <Routes />
        </PlayerStatsContextProvider>
    </LayoutContextProvider>

    // </React.StrictMode>
);
