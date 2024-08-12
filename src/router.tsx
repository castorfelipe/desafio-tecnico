import Actor from "@/pages/Actor";
import Home from "@/pages/Home";
import Movie from "@/pages/Movie";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {
        path: "/actor/:actorId",
        element: <Actor />,
    },
    {
        path: "/movie/:movieId",
        element: <Movie />,
    },
]);

export default router;
