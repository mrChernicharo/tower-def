import Achievements from "../screens/Achievements";
import AreaSelection from "../screens/AreaSelection";
import Game from "../screens/GameScreen";
import LevelSelection from "../screens/LevelSelection";
import Settings from "../screens/Settings";
import Skills from "../screens/Skills";
import { Start } from "../screens/Start";

export const appRoutes = [
    {
        path: "",
        element: <Start />,
    },
    {
        path: "area",
        element: <AreaSelection />,
    },
    {
        path: "area/:area",
        element: <LevelSelection />,
    },
    {
        path: "area/:area/level/:level",
        element: <Game />,
    },
    {
        path: "skills",
        element: <Skills />,
    },
    {
        path: "achievements",
        element: <Achievements />,
    },
    {
        path: "settings",
        element: <Settings />,
    },
];
