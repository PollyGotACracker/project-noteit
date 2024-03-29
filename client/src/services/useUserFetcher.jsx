import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const useUserFetcher = () => {
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

  const sendResetLink = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "password", "send-link"],
    mutationFn: async ({ email }) => {
      const endPoint = `/user/password/send-code`;
      const options = {
        method: "POST",
        body: JSON.stringify({ email }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const resetPassword = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "password", "reset"],
    mutationFn: async ({ token, value }) => {
      const endPoint = `/user/password/reset?verify=${token}`;
      const options = {
        method: "POST",
        body: JSON.stringify({ value }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const userSignIn = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "signin"],
    mutationFn: async ({ email, password }) => {
      const endPoint = `/user/signin`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          u_userid: email,
          u_password: password,
        }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const getUserToken = ({ id, initial, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "token", id],
    mutationFn: async () => {
      const endPoint = `/user/token`;
      const options = {
        method: "POST",
        headers: {
          "x-initial-entry": initial ? "true" : "false",
        },
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const getUserInfo = ({ id, queries = {} }) => ({
    queryKey: [QueryKeys.USER, "get", id],
    queryFn: async () => {
      const endPoint = `/user/profile`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const setUserInfo = ({ id, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "set", id],
    mutationFn: async ({ data }) => {
      const endPoint = `/user/profile`;
      const options = {
        method: "POST",
        body: data,
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const userSignOut = ({ id, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "signout", id],
    mutationFn: async () => {
      const endPoint = `/user/signout`;
      const options = { method: "POST" };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const changePassword = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "password", "change"],
    mutationFn: async ({ password, value }) => {
      const endPoint = `/user/password/change`;
      const options = {
        method: "POST",
        body: JSON.stringify({ u_password: password, value }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const deleteAccount = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.USER, "account"],
    mutationFn: async ({ password }) => {
      const endPoint = `/user/account`;
      const options = {
        method: "DELETE",
        body: JSON.stringify({ u_password: password }),
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
    sendResetLink,
    resetPassword,
    userSignIn,
    getUserToken,
    getUserInfo,
    setUserInfo,
    userSignOut,
    changePassword,
    deleteAccount,
  };
};

export default useUserFetcher;
