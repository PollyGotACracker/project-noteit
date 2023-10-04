import { QueryKeys, fetcher } from "@services/core";

const queryOptions = {
  cacheTime: 0,
  refetchOnMount: true,
};

const getDashboardQueries = (userId) => [
  {
    queryKey: [QueryKeys.DASHBOARD, "today", userId],
    queryFn: async () => {
      const endPoint = `/dashboard/today`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "todos", userId],
    queryFn: async () => {
      const endPoint = `/dashboard/todos`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "wrongs", userId],
    queryFn: async () => {
      const endPoint = `/dashboard/stat/wrongs`;
      const res = await fetcher({ endPoint });
      return res;
    },
    onError: (error) => {
      alert(error.message);
    },
    ...queryOptions,
  },
  {
    queryKey: [QueryKeys.DASHBOARD, "scores", userId],
    queryFn: async () => {
      const endPoint = `/dashboard/stat/scores`;
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
