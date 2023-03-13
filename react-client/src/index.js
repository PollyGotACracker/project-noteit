import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { UserContextProvider } from "./context/UserContext.js";
import NavRouterProvider from "./page/NavRouter";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <NavRouterProvider />
  </UserContextProvider>
  // </React.StrictMode>
);
