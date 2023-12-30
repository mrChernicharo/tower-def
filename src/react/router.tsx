import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { appRoutes } from "./utils/appRoutes";

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
