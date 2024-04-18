import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenSelector, userInfoFlagState, userState } from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";

const useUserInfo = () => {
  const { getUserInfo } = useUserFetcher();
  const token = useRecoilValue(tokenSelector);
  const [userData, setUserData] = useRecoilState(userState);
  const [userInfoFlag, setUserInfoFlag] = useRecoilState(userInfoFlagState);

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
    if (userInfoFlag) refetch();
  }, [userInfoFlag]);

  return { userInfoFlag, setUserInfoFlag };
};

export default useUserInfo;
