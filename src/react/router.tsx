import { createHashRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { appRoutes } from "./utils/appRoutes";

// createBrowserRouter messes up refreshing off of subpages in netlify build
const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: appRoutes,
    },
]);

export const Routes = () => {
    return <RouterProvider router={router} />;
};
