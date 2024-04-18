import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useGameFetcher() {
  const fetcher = useFetcher();

  const getQuizRandom = ({ catId, queries = {} }) => ({
    queryKey: [QueryKeys.QUIZ, "random", catId],
    queryFn: async () => {
      const endPoint = `/quiz/random/${catId}/get`;
      const res = await fetcher({ endPoint });
      return res;
    },
    cacheTime: 0,
    staleTime: 0,
    ...queries,
  });

  return {
    getQuizRandom,
  };
}
