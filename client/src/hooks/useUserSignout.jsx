import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  initUser,
  isSignedInState,
  tokenSelector,
  userState,
} from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";

const useUserSignOut = ({ accountDeleted = false } = {}) => {
  const { userSignOut } = useUserFetcher();
  const [userData, setUserData] = useRecoilState(userState);
  const removeToken = useSetRecoilState(tokenSelector);
  const setIsSignedIn = useSetRecoilState(isSignedInState);

  const { mutate: initAuth } = useMutation(
    userSignOut({
      id: userData.u_userid,
      queries: {
        onSuccess: () => {
          const data = { ...initUser() };
          if (!accountDeleted) data.u_userid = userData.u_userid;
          setUserData(data);
          setIsSignedIn(false);
          removeToken();
        },
      },
    })
  );

  const signOut = () => {
    if (window.confirm("로그아웃 할까요?")) {
      initAuth();
    }
  };

  return { initAuth, signOut };
};

export default useUserSignOut;
