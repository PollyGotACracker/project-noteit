import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useNotificationFetcher() {
  const fetcher = useFetcher();

  const getSubscription = ({ id, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "subscription", "get", id],
    mutationFn: async ({ subscription = null } = {}) => {
      const endPoint = `/notification/get`;
      const options = {
        method: "POST",
        body: JSON.stringify({ subscription }),
      };
      const res = fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const setSubscription = ({ id, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "subscription", "set", id],
    mutationFn: async ({ subscription, hour }) => {
      const endPoint = `/notification/set`;
      const options = {
        method: "POST",
        body: JSON.stringify({ subscription, n_hour: hour }),
      };
      const res = fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });

  const deleteSubscription = ({ id, queries = {} }) => ({
    mutationKey: [QueryKeys.USER, "subscription", "delete", id],
    mutationFn: async ({ subscription }) => {
      const endPoint = `/notification/delete`;
      const options = {
        method: "POST",
        body: JSON.stringify({ subscription }),
      };
      const res = fetcher({ endPoint, options });
      return res;
    },
    ...queries,
  });
  return { getSubscription, setSubscription, deleteSubscription };
}
