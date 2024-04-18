import { QueryKeys, queryClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";

export default function useResultFetcher() {
  const fetcher = useFetcher();

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

  return {
    insertScore,
    updateUserNote,
  };
}

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};
