import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useSignInFetcher() {
  const fetcher = useFetcher();

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

  return {
    userSignIn,
  };
}
