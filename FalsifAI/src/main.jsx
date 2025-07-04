import { StrictMode } from "react";
import { Provider } from "./components/ui/provider";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </StrictMode>
);
