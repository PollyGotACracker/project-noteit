import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isSignedInState,
  userInfoFlagState,
  tokenSelector,
  userState,
  userTokenFlagState,
} from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";
import useUserSignOut from "@hooks/useUserSignout";
import { URLS } from "@/router";

const useUserStatus = () => {
  const { getUserToken, getUserInfo } = useUserFetcher();
  const { initAuth } = useUserSignOut();
  const navigate = useNavigate();
  const token = useRecoilValue(tokenSelector);
  const [userData, setUserData] = useRecoilState(userState);
  const [userInfoFlag, setUserInfoFlag] = useRecoilState(userInfoFlagState);
  const [userTokenFlag, setUserTokenFlag] = useRecoilState(userTokenFlagState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [initial, setInitial] = useState(true);
  const signedOut = ["/", URLS.SIGN_IN, URLS.SIGN_UP, URLS.FIND_PASSWORD];
  const isToSignedOut = signedOut.includes(window.location.pathname);

  const { mutate } = useMutation(
    getUserToken({
      id: userData.u_userid || token,
      initial: initial,
      queries: {
        onSuccess: (data) => {
          if (data.code === "ACCESS_TOKEN") {
            setIsSignedIn(true);
            setUserInfoFlag(true);
            if (isToSignedOut) navigate(URLS.DASHBOARD);
          }
        },
        onError: () => {
          if (isSignedIn) initAuth();
          if (!isSignedIn) {
            if (isToSignedOut) navigate(window.location.pathname);
            if (!isToSignedOut) navigate("/", { replace: true });
          }
        },
        onSettled: () => {
          setUserTokenFlag(false);
          setInitial(false);
        },
        retry: false,
      },
    })
  );

  const { refetch } = useQuery(
    getUserInfo({
      id: userData.u_userid || token,
      queries: {
        enabled: userInfoFlag,
        onSuccess: (data) => {
          setUserData({ ...data });
        },
        onSettled: () => {
          setUserInfoFlag(false);
        },
      },
    })
  );

  useEffect(() => {
    if (userTokenFlag) mutate();
  }, [userTokenFlag]);

  useEffect(() => {
    if (userInfoFlag) refetch();
  }, [userInfoFlag]);
};

export default useUserStatus;
