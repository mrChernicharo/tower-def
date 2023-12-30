import { useContext } from "react";
import { PlayerStatsContext } from "./PlayerStatsContext";

export const usePlayerContext = () => useContext(PlayerStatsContext);
