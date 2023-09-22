import { QueryKeys, fetcher } from "@services/core";

const queryOptions = { cacheTime: 0, refetchOnMount: true };

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

export const getQuizCategories = ({ userId }) => ({
  queryKey: [QueryKeys.NOTE, "quiz"],
  queryFn: async () => {
    const endPoint = `/quiz/cats/${userId}/get`;
    const res = await fetcher({ endPoint });
    return res;
  },
  onError: (error) => {
    alert(error.message);
  },
  ...queryOptions,
});

export const getQuizRandom = ({ catId }) => ({
  queryKey: [QueryKeys.QUIZ, "random", catId],
  queryFn: async () => {
    const endPoint = `/quiz/random/${catId}/get`;
    const res = await fetcher({ endPoint });
    return res;
  },
  onError: (error) => {
    alert(error.message);
  },
  ...queryOptions,
});

export const insertScore = ({ score }) => ({
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
});

export const updateUserNote = ({ queryClient, score }) => ({
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
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.USER, refetchOptions);
  },
});
