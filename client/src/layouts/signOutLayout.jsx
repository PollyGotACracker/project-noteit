import "@styles/signOutLayout.css";
import { useEffect, useRef } from "react";
import genStars from "@utils/genStars";
import SignOutNav from "@components/signOutNav";
import useUserStatus from "@hooks/useUserStatus";

const SignOutLayout = ({ children }) => {
  const IntroRef = useRef(null);
  useUserStatus();

  useEffect(() => {
    if (IntroRef.current) genStars(IntroRef.current);
  }, []);

  return (
    <>
      <header className="header-signout">
        <SignOutNav />
      </header>
      {children}
      <div className="stars-container" ref={IntroRef}></div>
    </>
  );
};

export default SignOutLayout;
