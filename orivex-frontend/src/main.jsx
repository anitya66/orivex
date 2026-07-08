import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
globalThis.global = globalThis;
import App from "./App";
import AppProviders from "./providers/AppProviders";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);