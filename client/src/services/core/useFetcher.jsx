import { useRecoilState, useSetRecoilState } from "recoil";
import { userTokenFlagState, tokenSelector } from "@recoils/user";
import { accessTokenError } from "@services/core";

const useFetcher = () => {
  const setUserTokenFlag = useSetRecoilState(userTokenFlagState);
  const [token, setToken] = useRecoilState(tokenSelector);
  const BASE_URL = `/server`; //import.meta.env.VITE_SERVER_URL

  const fetcher = async ({ endPoint, options }) => {
    const result = await fetch(`${BASE_URL}${endPoint}`, {
      ...options,
      headers: {
        ...(!(options?.body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        ...(token && {
          authorization: `${token}`,
        }),
        "Access-Control-Allow-Origin": BASE_URL,
        ...options?.headers,
      },
    }).then(async (data) => {
      if (!data.ok) {
        return data.json().then(async (error) => {
          if (accessTokenError.includes(error?.code)) {
            setUserTokenFlag(true);
          }
          if (error?.message) alert(error.message);
          if (error?.error) console.error(error.error);
          if (data?.status > 400 && error?.message) {
            throw new Error(error?.message);
          }
        });
      }
      if (data.ok) {
        const accessToken = data.headers.get("Authorization");
        if (accessToken) setToken(accessToken);
      }
      return data.json();
    });

    return result;
  };

  return fetcher;
};

export default useFetcher;

/**
 * cf) Error: Multipart: Boundary not found
 * formData 전송 시, 서버 router 미들웨어에서 err.stack 을 통해 에러 확인 가능
 *
 * form 에 encType="multipart/form-data" 를 설정하지 않고,
 * e.preventDefault 로 기본 동작을 막은 후
 * headers 에 "Content-Type": "multipart/form-data" 를 직접 지정할 경우
 * 각 part 의 경계 문자열(Boundary)이 정의되지 않아 문제 발생
 *
 * ==> Content-Type 을 지정하지 않으면 문제가 발생하지 않음
 * 대부분의 HTTP 라이브러리, 브라우저에서는 데이터에 맞는 Content-Type 을 자동 지정해줌
 * 그러나 Content-Type 을 완전히 생략하면 formData 는 전송 가능했지만, JSON 은 불가능했음
 *
 * 나는 Content-Type 기본값으로 "application/json" 을 지정하고 싶었기 때문에
 * !(options?.body instanceof FormData) 조건을 만족할 경우에만 지정되도록 함
 */