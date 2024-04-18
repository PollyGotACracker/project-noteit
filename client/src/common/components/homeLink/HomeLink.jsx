import style from "./homeLink.module.css";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import cx from "classnames";

export default function HomeLink({ isNotFound = false }) {
  const navigate = useNavigate();
  const isSignedIn = useRecoilValue(isSignedInState);

  const onClick = () => {
    if (isSignedIn) navigate(URLS.DASHBOARD);
    if (!isSignedIn) navigate("/");
  };

  return (
    <button
      className={cx(style.link_home, {
        [style.signout_not_found]: isNotFound && !isSignedIn,
      })}
      onClick={onClick}
      type="button"
    >
      NoteIT
    </button>
  );
}
