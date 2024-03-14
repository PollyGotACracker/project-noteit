import { useRecoilState, useSetRecoilState } from "recoil";
import { userTokenFlagState, tokenSelector } from "@recoils/user";
import { accessTokenError } from "@services/core";
import { SERVER_URL } from "@/router";

const useFetcher = () => {
  const setUserTokenFlag = useSetRecoilState(userTokenFlagState);
  const [token, setToken] = useRecoilState(tokenSelector);

  const fetcher = async ({ endPoint, options }) => {
    const res = await fetch(`${SERVER_URL}${endPoint}`, {
      credentials: "include",
      ...options,
      headers: {
        ...(!(options?.body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        authorization: `${token}`,
        ...options?.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      if (accessTokenError.includes(data?.code)) {
        setUserTokenFlag(true);
      }
      if (data?.message) alert(data.message);
      if (res?.status > 400 && data?.message) {
        throw new Error(data?.message);
      }
    }

    const accessToken = res.headers.get("Authorization");
    if (accessToken) setToken(accessToken);

    return data;
  };

  return fetcher;
};

export default useFetcher;
