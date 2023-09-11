import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "@styles/global.css";
import { UserContextProvider } from "@contexts/userContext";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserContextProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </UserContextProvider>
  // </React.StrictMode>
);
