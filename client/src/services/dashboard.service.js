import { QueryKeys, fetcher } from "@services/core";

const queryOptions = {
  cacheTime: 0,
  refetchOnMount: true,
};

const getDashboardQueries = (userId) => [
  {
    queryKey: [QueryKeys.DASHBOARD, "todos"],
    queryFn: async () => {
      const endPoint = `/dashboard/${userId}/todos`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "wrongs"],
    queryFn: async () => {
      const endPoint = `/dashboard/${userId}/stat/wrongs`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "scores"],
    queryFn: async () => {
      const endPoint = `/dashboard/${userId}/stat/scores`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
];

export default getDashboardQueries;
