import { QueryKeys, fetcher } from "@services/core";

const queryOptions = {
  staleTime: 0,
  cacheTime: 1000,
};

const getDashboardQueries = (userId) => [
  {
    queryKey: [QueryKeys.DASHBOARD, "todos"],
    queryFn: async () => {
      try {
        const endPoint = `/dashboard/${userId}/todos`;
        const res = await fetcher({ endPoint });
        return res;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "wrongs"],
    queryFn: async () => {
      try {
        const endPoint = `/dashboard/${userId}/stat/wrongs`;
        const res = await fetcher({ endPoint });
        return res;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "scores"],
    queryFn: async () => {
      try {
        const endPoint = `/dashboard/${userId}/stat/scores`;
        const res = await fetcher({ endPoint });
        return res;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    ...queryOptions,
  },
];

export default getDashboardQueries;
