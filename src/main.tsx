import ReactDOM from "react-dom/client";
import { Routes } from "./react/router.tsx";
import "./index.css";
import { PlayerStatsContextProvider } from "./react/context/PlayerStatsContext.tsx";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <PlayerStatsContextProvider>
        <Routes />
    </PlayerStatsContextProvider>
    // </React.StrictMode>
);
