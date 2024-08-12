import Actor from "@/pages/Actor";
import Home from "@/pages/Home";
import Movie from "@/pages/Movie";
import { AnimatePresence } from "framer-motion";
import { createBrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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

export const MyRouter = () => {
    const location = useLocation()

    return (
            <AnimatePresence mode="sync">
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:movieId" element={<Movie />} />
                    <Route path="/actor/:actorId" element={<Actor />} />
                </Routes>
            </AnimatePresence>
    );
};

export default router;
