import "@styles/signOutLayout.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import genStars from "@utils/genStars";
import useUserStatus from "@hooks/useUserStatus";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import SignOutNav from "@components/signOutNav";
import HomeLink from "@components/homeLink";

const SignOutLayout = ({ children }) => {
  const navigate = useNavigate();
  const IntroRef = useRef(null);
  const { initial, userTokenFlag, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);

  useEffect(() => {
    setUserTokenFlag(true);
  }, []);

  useEffect(() => {
    if (!initial && isSignedIn) navigate(URLS.DASHBOARD, { replace: true });
  }, [initial, isSignedIn]);

  useEffect(() => {
    if (IntroRef.current) genStars(IntroRef.current);
  }, [userTokenFlag]);

  if (isSignedIn || userTokenFlag) return <></>;
  return (
    <>
      <header className="header-signout">
        <HomeLink />
        <SignOutNav />
      </header>
      {children}
      <div className="stars-container" ref={IntroRef}></div>
    </>
  );
};

export default SignOutLayout;
