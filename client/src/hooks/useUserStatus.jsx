import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  initUser,
  isSignedInState,
  queryEnabledState,
  userState,
} from "@recoils/user";
import { getUserInfo } from "@services/user.service";
import { getToken, removeToken } from "@utils/manageToken";
import { URLS } from "@/router";

const useUserStatus = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [userData, setUserData] = useRecoilState(userState);
  const [queryEnabled, setQueryEnabled] = useRecoilState(queryEnabledState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const signedOut = ["/", URLS.SIGN_IN, URLS.SIGN_UP, URLS.FIND_PASSWORD];
  const isToSignedOut = signedOut.includes(window.location.pathname);

  const { refetch } = useQuery(
    getUserInfo({
      id: userData.u_userid || token,
      queries: {
        enabled: queryEnabled,
        onSuccess: (data) => {
          setUserData({ ...data });
          setIsSignedIn(true);
          if (isToSignedOut) navigate(URLS.DASHBOARD);
        },
        onError: (error) => {
          setUserData({ ...initUser(), u_userid: userData.u_userid });
          setIsSignedIn(false);
          navigate("/", { replace: true });
          alert(error.message);
          removeToken();
        },
        onSettled: () => {
          setQueryEnabled(false);
        },
      },
    })
  );

  useEffect(() => {
    if (token) setQueryEnabled(true);
    if (!token && !isToSignedOut) navigate("/", { replace: true });
  }, []);

  useEffect(() => {
    if (queryEnabled) refetch();
  }, [queryEnabled]);
};

export default useUserStatus;
