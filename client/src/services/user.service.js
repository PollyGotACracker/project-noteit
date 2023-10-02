import { QueryKeys, fetcher } from "@services/core";

export const userSignUp = (queries) => ({
  mutationKey: [...QueryKeys.USER, "signup"],
  mutationFn: async ({ email, nickname, password }) => {
    const endPoint = `/user/signup`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        u_userid: email,
        u_nickname: nickname,
        u_pwd: password,
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

export const getUserInfo = (queries) => ({
  queryKey: QueryKeys.USER,
  queryFn: async ({ email, password }) => {
    const endPoint = `/user/get`;
    const res = await fetcher({ endPoint });
    return res;
  },
  onError: (error) => {
    alert(error.message);
  },
  ...queries,
});

export const setUserInfo = (queries) => ({
  mutationKey: [...QueryKeys.USER, "set"],
  mutationFn: async ({ userId, data }) => {
    const endPoint = `/user/${userId}/profile`;
    const options = {
      method: "POST",
      body: data,
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  ...queries,
});
