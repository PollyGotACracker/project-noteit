import "@styles/signOutLayout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import useUserStatus from "@hooks/useUserStatus";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import SignOutNav from "@components/signOutNav";
import HomeLink from "@components/homeLink";

const SignOutLayout = ({ children }) => {
  const navigate = useNavigate();
  const { initial, userTokenFlag, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);

  useEffect(() => {
    setUserTokenFlag(true);
  }, []);

  useEffect(() => {
    if (!initial && isSignedIn) navigate(URLS.DASHBOARD, { replace: true });
  }, [initial, isSignedIn]);

  if (isSignedIn || userTokenFlag) return <></>;
  return (
    <div id="page">
      <header className="header-signout">
        <HomeLink />
        <SignOutNav />
      </header>
      {children}
    </div>
  );
};

export default SignOutLayout;
