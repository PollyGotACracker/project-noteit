import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { UserContextProvider } from "./contexts/UserContext.js";
import NavRouterProvider from "./router";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <NavRouterProvider />
  </UserContextProvider>
  // </React.StrictMode>
);
