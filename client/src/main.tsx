import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { getFromLocalStorage } from "./hooks/useLocalStorage.ts";

const authData = getFromLocalStorage("user");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider storedAuthData={authData}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
