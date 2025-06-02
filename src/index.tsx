import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Mobile } from "./screens/Mobile";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Mobile />
  </StrictMode>,
);
