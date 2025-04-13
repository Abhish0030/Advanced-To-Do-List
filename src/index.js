import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

// 1. Get the root DOM element
const rootElement = document.getElementById("root");

// 2. Create a root instance
const root = createRoot(rootElement);

// 3. Render your app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
