import ReactDOM from "react-dom/client";
import { Routes } from "./router.tsx";
import "../index.css";
import "./screens/screens.css";
import { PlayerStatsContextProvider } from "./context/PlayerStatsContext.tsx";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <PlayerStatsContextProvider>
        <Routes />
    </PlayerStatsContextProvider>
    // </React.StrictMode>
);
