import Achievements from "../screens/Achievements";
import AreaSelection from "../screens/AreaSelection";
import Game from "../screens/GameScreen";
import Settings from "../screens/Settings";
import Skills from "../screens/Skills";
import { Start } from "../screens/Start";

export const appRoutes = [
    {
        name: "Start",
        path: "",
        element: <Start />,
    },
    {
        name: "Area Selection",
        path: "area-selection",
        element: <AreaSelection />,
    },
    {
        name: "Game",
        path: "area/:area/level/:level",
        element: <Game />,
    },
    {
        name: "Skills",
        path: "skills",
        element: <Skills />,
    },
    {
        name: "Achievements",
        path: "achievements",
        element: <Achievements />,
    },
    {
        name: "Settings",
        path: "settings",
        element: <Settings />,
    },
];
