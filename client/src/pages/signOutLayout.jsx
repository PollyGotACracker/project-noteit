import "@styles/signOutLayout.css";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import genStars from "@utils/genStars";
import SignOutNav from "@components/signOutNav";

const SignOutLayout = () => {
  const IntroRef = useRef(null);

  useEffect(() => {
    if (IntroRef.current) genStars(IntroRef.current);
  }, []);

  return (
    <>
      <header className="header-signout">
        <SignOutNav />
      </header>
      <Outlet />
      <div className="stars-container" ref={IntroRef}></div>
    </>
  );
};

export default SignOutLayout;
