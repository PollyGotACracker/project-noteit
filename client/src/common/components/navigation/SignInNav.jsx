import style from "./signInNav.module.css";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import useUserSignOut from "@hooks/useUserSignout";
import { routerData } from "@/router";
import cx from "classnames";

export default function SignInNav({ isSidebar = false }) {
  return (
    <>
      <nav className={isSidebar ? style.signin_sidebar : style.signin}>
        {routerData
          .filter((router) => {
            return router.withAuth && router.class;
          })
          .map((router) => (
            <NavLink
              key={router.id}
              to={router.path}
              className={({ isActive }) =>
                cx(style.link, style[router.class], {
                  [style.active]: isActive,
                })
              }
            >
              {router.icon}
              <span>{router.label}</span>
            </NavLink>
          ))}
        {!isSidebar && <SignOutButton isSidebar={isSidebar} />}
      </nav>
      {isSidebar && <SignOutButton isSidebar={isSidebar} />}
    </>
  );
}

function SignOutButton({ isSidebar }) {
  const { signOut } = useUserSignOut();

  return (
    <button
      type="button"
      className={`${style.link} ${
        isSidebar ? style.signout_sidebar : style.signout
      }`}
      onClick={signOut}
    >
      <RiLogoutBoxLine />
      로그아웃
    </button>
  );
}
