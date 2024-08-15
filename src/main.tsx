import { MyRouter } from "@/router.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "tippy.js/animations/shift-away.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <MyRouter />
    </BrowserRouter>,
);
