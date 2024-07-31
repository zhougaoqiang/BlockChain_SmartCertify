import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./stores/authContext.jsx";
import { FetchContextProvider } from "./stores/fetchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FetchContextProvider>
        <App />
      </FetchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
