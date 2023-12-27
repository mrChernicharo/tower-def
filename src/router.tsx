import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Start } from "./screens/Start";
import { Root } from "./Root";
import Achievements from "./screens/Achievements";
import AreaSelection from "./screens/AreaSelection";
import LevelSelection from "./screens/LevelSelection";
import Settings from "./screens/Settings";
import Skills from "./screens/Skills";
import Game from "./screens/GameScreen";

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
