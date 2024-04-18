import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function usePwdChangeFetcher() {
  const fetcher = useFetcher();

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

  return {
    changePassword,
  };
}
