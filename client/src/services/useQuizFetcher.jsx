import { QueryKeys, queryClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";
import useToasts from "@hooks/useToasts";

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

const useQuizFetcher = () => {
  const fetcher = useFetcher();
  const { showToast } = useToasts();

  const getQuizCategories = ({ userId, queries = {} }) => ({
    queryKey: [QueryKeys.NOTE, "quiz", userId],
    queryFn: async () => {
      const endPoint = `/quiz/cats/get`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

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

  const insertScore = ({ score, queries = {} }) => ({
    mutationKey: [QueryKeys.QUIZ, "insert"],
    mutationFn: async () => {
      const insertEndPoint = `/quiz/score/insert`;
      const insertOptions = {
        method: "POST",
        body: JSON.stringify(score),
      };
      const res = await fetcher({
        endPoint: insertEndPoint,
        options: insertOptions,
      });
      return res.message;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries([QueryKeys.QUIZ], refetchOptions),
        queryClient.invalidateQueries(
          [QueryKeys.NOTE, QueryKeys.QUIZ],
          refetchOptions
        ),
      ]);
    },

    ...queries,
  });

  const updateUserNote = ({ score, queries = {} }) => ({
    mutationKey: [QueryKeys.QUIZ, "update"],
    mutationFn: async ({ keyids }) => {
      const {
        sc_userid: userid,
        sc_catid: catid,
        sc_score: quizscore,
        sc_date: date,
      } = score;
      const updateEndPoint = `/quiz/score/update`;
      const updateOptions = {
        method: "PATCH",
        body: JSON.stringify({ userid, catid, quizscore, keyids, date }),
      };
      const res = await fetcher({
        endPoint: updateEndPoint,
        options: updateOptions,
      });
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(QueryKeys.NOTE, refetchOptions);
    },
    ...queries,
  });

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
    getQuizCategories,
    getQuizRandom,
    insertScore,
    updateUserNote,
    getScores,
    deleteScores,
  };
};

export default useQuizFetcher;
