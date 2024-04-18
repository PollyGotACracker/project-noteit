import { QueryKeys, queryClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";
import useToasts from "@hooks/useToasts";

export default function useScoresDeleteFetcher() {
  const fetcher = useFetcher();
  const { showToast } = useToasts();

  const getScores = ({ sort = "date", filter = "", queries = {} }) => ({
    queryKey: [QueryKeys.QUIZ, "get", sort, filter],
    queryFn: async ({ queryKey }) => {
      const sort = queryKey[2];
      const filter = queryKey[3];
      const endPoint = `/quiz/score/get?sort=${sort}&filter=${filter}`;
      const res = await fetcher({
        endPoint,
      });
      return res;
    },
    ...queries,
  });

  const deleteScores = ({ queries = {} } = {}) => ({
    mutationKey: [QueryKeys.QUIZ, "delete"],
    mutationFn: async ({ ids }) => {
      const endPoint = `/quiz/score/delete`;
      const options = {
        method: "DELETE",
        body: JSON.stringify(ids),
      };
      const res = await fetcher({
        endPoint,
        options,
      });
      return res;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(QueryKeys.QUIZ, refetchOptions);
      showToast(data.message);
    },
    ...queries,
  });

  return {
    getScores,
    deleteScores,
  };
}

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};
