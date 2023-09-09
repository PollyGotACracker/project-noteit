import React from "react";
import ReactDOM from "react-dom/client";
import "@styles/global.css";
import { UserContextProvider } from "@contexts/userContext";
import NavRouterProvider from "@/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserContextProvider>
    <NavRouterProvider />
  </UserContextProvider>
  // </React.StrictMode>
);
