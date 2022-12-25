import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { VocaContextProvider } from "../src/context/VocaContext.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  //   <React.StrictMode>
  <VocaContextProvider>
    <App />
  </VocaContextProvider>
  //   </React.StrictMode>
);
