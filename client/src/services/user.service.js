import { QueryKeys, fetcher } from "@services/core";

export const userSignUp = (queries) => ({
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
  onError: (error) => {
    alert(error.message);
  },
  ...queries,
});

export const userSignIn = (queries) => ({
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
  onError: (error) => {
    alert(error.message);
  },
  ...queries,
});

export const getUserInfo = ({ id, queries }) => ({
  queryKey: [QueryKeys.USER, "get", id],
  queryFn: async () => {
    const endPoint = `/user/get`;
    const res = await fetcher({ endPoint });
    return res;
  },
  ...queries,
});

export const setUserInfo = ({ id, queries }) => ({
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
