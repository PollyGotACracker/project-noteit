import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { layoutSelector } from "@recoils/global";
import useUserStatus from "@hooks/useUserStatus";
import Fallback from "@components/fallback";

const Layout = () => {
  const [overlayClass, resetUI] = useRecoilState(layoutSelector);
  useUserStatus();

  return (
    <Suspense fallback={<Fallback />}>
      <Outlet />
      <div className={`overlay ${overlayClass}`} onClick={resetUI}></div>
    </Suspense>
  );
};

export default Layout;
