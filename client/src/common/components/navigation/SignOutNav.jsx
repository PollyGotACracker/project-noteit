import style from "./signOutNav.module.css";
import { NavLink } from "react-router-dom";
import { routerData } from "@/router";

export default function SignOutNav() {
  return (
    <nav className={style.signout}>
      {routerData
        .filter((router) => {
          return !router.withAuth && router.withLanding;
        })
        .map((router) => (
          <NavLink key={router.id} to={router.path} className={style.link}>
            <span>{router.label}</span>
          </NavLink>
        ))}
    </nav>
  );
}
