import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "@components/fallback";
import useUserStatus from "@hooks/useUserStatus";

const Layout = () => {
  useUserStatus();

  return (
    <Suspense fallback={<Fallback />}>
      <Outlet />
    </Suspense>
  );
};

export default Layout;
