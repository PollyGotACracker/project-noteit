import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const usePwdResetFetcher = () => {
  const fetcher = useFetcher();

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

  return {
    sendResetLink,
    resetPassword,
  };
};

export default usePwdResetFetcher;
