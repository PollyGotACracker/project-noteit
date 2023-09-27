import "@styles/components/signOutNav.css";
import { NavLink } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { URLS } from "@/router";

const SignOutNav = () => {
  return (
    <nav className="nav-signout">
      <NavLink to={URLS.SIGN_UP}>회원가입</NavLink>
      <NavLink to={URLS.SIGN_IN}>
        로그인
        <MdLogin />
      </NavLink>
    </nav>
  );
};

export default SignOutNav;
