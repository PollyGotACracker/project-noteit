import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const useUserFetcher = () => {
  const fetcher = useFetcher();

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

  return {
    getUserToken,
    getUserInfo,
    setUserInfo,
    userSignOut,
  };
};

export default useUserFetcher;
