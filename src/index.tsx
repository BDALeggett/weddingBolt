import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Mobile } from "./Mobile";
import './index.css'

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Mobile />
  </StrictMode>,
);
