import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "flowbite";

createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </Router>,
  //     <StrictMode>
  // </StrictMode>,
);
