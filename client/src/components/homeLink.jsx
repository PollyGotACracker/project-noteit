import { useLocation, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { isSignedInState } from "@recoils/user";
import { URLS } from "@/router";

const HomeLink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignedIn = useRecoilValue(isSignedInState);

  const clickHomeHandler = () => {
    if (isSignedIn && location.pathname === URLS.DASHBOARD) return;
    if (isSignedIn) navigate(URLS.DASHBOARD);
    if (!isSignedIn) navigate("/");
  };

  return (
    <button className="home-link" onClick={clickHomeHandler} type="button">
      NoteIT
    </button>
  );
};

export default HomeLink;
