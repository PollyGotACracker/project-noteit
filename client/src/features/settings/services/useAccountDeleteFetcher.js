import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useAccountDeleteFetcher() {
  const fetcher = useFetcher();

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
    deleteAccount,
  };
}
