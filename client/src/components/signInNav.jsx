import "@styles/components/signInNav.css";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import useUserSignOut from "@hooks/useUserSignout";
import { routerData } from "@/router";

const signInNav = () => {
  const { signOut } = useUserSignOut();

  return (
    <nav className="nav-signin">
      {routerData
        .filter((router) => {
          return router.withAuth && router.class;
        })
        .map((router) => (
          <NavLink
            key={router.id}
            className={`link ${router.class}`}
            to={router.path}
          >
            {router.icon}
            {router.label}
          </NavLink>
        ))}
      <button type="button" className="link signout" onClick={signOut}>
        <RiLogoutBoxLine />
        로그아웃
      </button>
    </nav>
  );
};

export default signInNav;
