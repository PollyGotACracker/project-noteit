import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  initUser,
  isSignedInState,
  tokenSelector,
  userState,
} from "@recoils/user";
import useUserFetcher from "@/services/useUserFetcher";

const useUserSignOut = () => {
  const { userSignOut } = useUserFetcher();
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenSelector);
  const setIsSignedIn = useSetRecoilState(isSignedInState);

  const { mutate } = useMutation(
    userSignOut({
      id: userData.u_userid,
    })
  );

  const initAuth = () => {
    mutate();
    setUserData({ ...initUser(), u_userid: userData.u_userid });
    setToken();
    setIsSignedIn(false);
    navigate("/", { replace: true });
  };

  const signOut = () => {
    if (window.confirm("로그아웃 할까요?")) {
      initAuth();
    }
  };

  return { initAuth, signOut };
};

export default useUserSignOut;
