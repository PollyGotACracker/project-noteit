import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const useDashboardFetcher = () => {
  const fetcher = useFetcher();

  const getDashboardQueries = () => [
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, "today"],
      queryFn: async () => {
        const endPoint = `/dashboard/today`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.TODO, "todos"],
      queryFn: async () => {
        const endPoint = `/dashboard/todos`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, "wrongs"],
      queryFn: async () => {
        const endPoint = `/dashboard/stat/wrongs`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, "scores"],
      queryFn: async () => {
        const endPoint = `/dashboard/stat/scores`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
  ];

  return getDashboardQueries;
};

export default useDashboardFetcher;
