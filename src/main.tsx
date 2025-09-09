import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/route/router.tsx";

// Registering Syncfusion license key
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
