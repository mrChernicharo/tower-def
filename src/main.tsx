import ReactDOM from "react-dom/client";
import { Routes } from "./router.tsx";
import "./index.css";
import { PlayerStatsContextProvider } from "./react/context/PlayerStatsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <PlayerStatsContextProvider>
        <Routes />
    </PlayerStatsContextProvider>
    // </React.StrictMode>
);
