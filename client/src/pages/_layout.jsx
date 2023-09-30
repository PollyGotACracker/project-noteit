import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "@components/fallback";

const Layout = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Outlet />
    </Suspense>
  );
};

export default Layout;
