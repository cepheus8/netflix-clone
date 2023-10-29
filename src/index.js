import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/appContext";
import { DataContextProvider } from "./context/dataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
