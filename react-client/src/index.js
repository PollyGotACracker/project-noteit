import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { VocaContextProvider } from "./context/VocaContext.js";
import NavRouterProvider from "./page/NavRouter";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  //   <React.StrictMode>
  <VocaContextProvider>
    <NavRouterProvider />
  </VocaContextProvider>
  //   </React.StrictMode>
);
