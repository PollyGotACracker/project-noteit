import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const useDashboardFetcher = () => {
  const fetcher = useFetcher();

  const getDashboardQueries = ({ userId }) => [
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, userId, "today"],
      queryFn: async () => {
        const endPoint = `/dashboard/today`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.TODO, userId, "todos"],
      queryFn: async () => {
        const endPoint = `/dashboard/todos`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, userId, "wrongs"],
      queryFn: async () => {
        const endPoint = `/dashboard/stat/wrongs`;
        const res = await fetcher({ endPoint });
        return res;
      },
    },
    {
      queryKey: [QueryKeys.NOTE, QueryKeys.QUIZ, userId, "scores"],
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
