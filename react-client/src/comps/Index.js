import Nav from "../page/Nav";
import Player from "./Player";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Player />
      <Nav />
      <Outlet />
    </>
  );
};

export default Index;
