import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./react/Root";
import { appRoutes } from "./react/utils/appRoutes";

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
