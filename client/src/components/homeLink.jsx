import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";
import classNames from "classnames";

const HomeLink = ({ isNotFound = false }) => {
  const navigate = useNavigate();
  const isSignedIn = useRecoilValue(isSignedInState);

  const clickHomeHandler = () => {
    if (isSignedIn) navigate(URLS.DASHBOARD);
    if (!isSignedIn) navigate("/");
  };

  return (
    <button
      className={classNames([
        "home_link",
        { notfound_signout: isNotFound && !isSignedIn },
      ])}
      onClick={clickHomeHandler}
      type="button"
    >
      NoteIT
    </button>
  );
};

export default HomeLink;
