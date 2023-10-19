import "@styles/signOutLayout.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { BsThreeDotsVertical } from "react-icons/bs";
import genStars from "@utils/genStars";
import useUserStatus from "@hooks/useUserStatus";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import SignOutNav from "@components/signOutNav";
import HomeLink from "@components/homeLink";

const SignOutLayout = ({ children }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
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

  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    window.addEventListener("resize", closeDropdown);
    document.body.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("resize", closeDropdown);
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  const showNavDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  if (isSignedIn || userTokenFlag) return <></>;
  return (
    <>
      <header className="header-signout">
        <HomeLink />
        <div className={`dropdown-wrapper${showDropdown ? " active" : ""}`}>
          <button
            className="dropdown-btn"
            onClick={showNavDropdown}
            type="button"
          >
            <BsThreeDotsVertical />
          </button>
          <SignOutNav />
        </div>
      </header>
      {children}
      <div className="stars-container" ref={IntroRef}></div>
    </>
  );
};

export default SignOutLayout;
