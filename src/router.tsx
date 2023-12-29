import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Start } from "./react/screens/Start";
import { Root } from "./react/Root";
import Achievements from "./react/screens/Achievements";
import AreaSelection from "./react/screens/AreaSelection";
import LevelSelection from "./react/screens/LevelSelection";
import Settings from "./react/screens/Settings";
import Skills from "./react/screens/Skills";
import Game from "./react/screens/GameScreen";

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
        path: "achievements",
        element: <Achievements />,
    },
    {
        path: "skills",
        element: <Skills />,
    },
    {
        path: "settings",
        element: <Settings />,
    },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: appRoutes,
    },
]);

export const Routes = () => {
    return <RouterProvider router={router} />;
};
