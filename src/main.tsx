import router, { MyRouter } from "@/router.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";

// createRoot(document.getElementById("root")!).render(
//     // <StrictMode>
//     // <App />
//     // <RouterProvider router={router} />,
//     // </StrictMode>
// );

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <MyRouter />
    </BrowserRouter>,
);
