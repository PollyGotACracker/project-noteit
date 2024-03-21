import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  initUser,
  isSignedInState,
  tokenSelector,
  userState,
} from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";
import useModals from "@hooks/useModals";

const useUserSignOut = ({ accountDeleted = false } = {}) => {
  const { openModal } = useModals();
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
    openModal({
      content: "로그아웃 할까요?",
      okClick: initAuth,
    });
  };

  return { initAuth, signOut };
};

export default useUserSignOut;
