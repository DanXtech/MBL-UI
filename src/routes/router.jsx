import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home/Home";
import Signup from "../Pages/auth/Signup";
import Login from "../Pages/auth/Login";
import Features from "../Pages/Features";
import Community from "../Pages/Community";
import Gamingselection from "../Pages/Gamingselection";
import NotFound from "../Pages/NotFound"; // Import a 404 page component
import ProtectedRoute from "../Pages/auth/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/features", element: <Features /> },
            {
                path: "/community",
                element: <Community />
            },
            // Add a wildcard route for 404 within the nested structure

        ]
    },
    { path: "*", element: <NotFound /> },
    {
        path: "/playsection",
        element:
            <ProtectedRoute>
                <Gamingselection />
            </ProtectedRoute>

    },
    {
        path: "/register",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    // Fallback route for 404 at the root level
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;
