import style from "./signOutLayout.module.css";
import { useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import useUserStatus from "@hooks/useUserStatus";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import SignOutNav from "@components/navigation/SignOutNav";
import HomeLink from "@components/homeLink/HomeLink";

export default function SignOutLayout({ isNotFound = false, children }) {
  const navigate = useNavigate();
  const { initial, userTokenFlag, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);

  useEffect(() => {
    setUserTokenFlag(true);
  }, []);

  useLayoutEffect(() => {
    if (!initial && isSignedIn) navigate(URLS.DASHBOARD, { replace: true });
  }, [initial, isSignedIn]);

  if (isSignedIn || userTokenFlag) return <></>;
  return (
    <div className={style.page}>
      <header className={style.header_signout}>
        <HomeLink isNotFound={isNotFound} />
        <SignOutNav />
      </header>
      {children}
    </div>
  );
}
