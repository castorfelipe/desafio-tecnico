import router from "@/router.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    // <App />
    <RouterProvider router={router} />,
    // </StrictMode>
);
