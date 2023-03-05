import Nav from "../page/Nav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Nav />
      <main className="Index">
        <Outlet />
        <Sidebar />
      </main>
    </>
  );
};

export default Index;
