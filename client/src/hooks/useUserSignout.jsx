import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { initUser, isSignedInState, userState } from "@recoils/user";
import { removeToken } from "@utils/manageToken";

const useUserSignOut = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);

  const signOut = () => {
    if (window.confirm("로그아웃 할까요?")) {
      setUserData({ ...initUser(), u_userid: userData.u_userid });
      setIsSignedIn(false);
      navigate("/", { replace: true });
      removeToken();
    }
  };

  return { signOut };
};

export default useUserSignOut;
