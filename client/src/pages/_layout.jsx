import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { layoutSelector } from "@recoils/global";
import useUserStatus from "@hooks/useUserStatus";

const Layout = () => {
  const [overlayClass, resetUI] = useRecoilState(layoutSelector);
  useUserStatus();

  return (
    <Suspense
      fallback={
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Loading...</p>
        </div>
      }
    >
      <Outlet />
      <div className={`overlay ${overlayClass}`} onClick={resetUI}></div>
    </Suspense>
  );
};

export default Layout;
