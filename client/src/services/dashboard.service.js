import { QueryKeys, fetcher } from "@services/core";

const queryOptions = {
  staleTime: 0,
  cacheTime: 1000,
};

const getDashboardQueries = (userId) => [
  {
    queryKey: [QueryKeys.DASHBOARD, "todos"],
    queryFn: async () => {
      const endPoint = `/${userId}/todo`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "wrongs"],
    queryFn: async () => {
      const endPoint = `/${userId}/stat/wrong`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "scores"],
    queryFn: async () => {
      const endPoint = `/${userId}/stat/round`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queryOptions,
  },
];

export default getDashboardQueries;
