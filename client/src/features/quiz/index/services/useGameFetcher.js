import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useQuizFetcher() {
  const fetcher = useFetcher();

  const getQuizCategories = ({ userId, queries = {} }) => ({
    queryKey: [...QueryKeys.NOTE_QUIZ, userId],
    queryFn: async () => {
      const endPoint = `/quiz/cats/get`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  return {
    getQuizCategories,
  };
}
