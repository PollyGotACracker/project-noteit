import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useSignUpFetcher() {
  const fetcher = useFetcher();

  const sendAuthCode = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "signup", "send-code"],
    mutationFn: async ({ email }) => {
      const endPoint = `/user/signup/send-code`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const verifyAuthCode = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "signup", "verify-code"],
    mutationFn: async ({ code }) => {
      const endPoint = `/user/signup/verify-code`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          code,
        }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const userSignUp = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "signup"],
    mutationFn: async ({ email, nickname, password }) => {
      const endPoint = `/user/signup`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          u_userid: email,
          u_nickname: nickname,
          u_password: password,
        }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  return {
    sendAuthCode,
    verifyAuthCode,
    userSignUp,
  };
}
