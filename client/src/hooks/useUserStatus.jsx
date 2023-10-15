import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isSignedInState,
  tokenSelector,
  userState,
  userTokenFlagState,
} from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";
import useUserInfo from "@hooks/useUserInfo";
import useUserSignOut from "@hooks/useUserSignout";

const useUserStatus = () => {
  const { getUserToken } = useUserFetcher();
  const { initAuth } = useUserSignOut();
  const { setUserInfoFlag } = useUserInfo();
  const token = useRecoilValue(tokenSelector);
  const userData = useRecoilValue(userState);
  const [userTokenFlag, setUserTokenFlag] = useRecoilState(userTokenFlagState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [initial, setInitial] = useState(true);

  const { mutate } = useMutation(
    getUserToken({
      id: userData.u_userid || token,
      initial: initial,
      queries: {
        onSuccess: (data) => {
          if (data.code === "ACCESS_TOKEN") {
            setIsSignedIn(true);
            setUserInfoFlag(true);
          }
        },
        onError: () => {
          if (isSignedIn) initAuth();
        },
        onSettled: () => {
          setUserTokenFlag(false);
          setInitial(false);
        },
        retry: false,
      },
    })
  );

  useEffect(() => {
    if (userTokenFlag) mutate();
  }, [userTokenFlag]);

  return { initial, userTokenFlag, setUserTokenFlag };
};

export default useUserStatus;
