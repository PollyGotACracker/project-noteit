import "@styles/components/signOutNav.css";
import { NavLink } from "react-router-dom";
import { routerData } from "@/router";

const SignOutNav = () => {
  return (
    <nav className="nav-signout">
      {routerData
        .filter((router) => {
          return !router.withAuth && router.withLanding;
        })
        .map((router) => (
          <NavLink key={router.id} to={router.path}>
            {router.label}
          </NavLink>
        ))}
    </nav>
  );
};

export default SignOutNav;
