import Nav from "../page/Nav";
// import Music from "../comps/Music";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <>
      {/* <Music /> */}
      <Nav />
      <Outlet />
    </>
  );
};

export default Index;
