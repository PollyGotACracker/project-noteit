import { queryClient, QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";
import useToasts from "@hooks/useToasts";

export default function useSubjectFetcher() {
  const fetcher = useFetcher();
  const { showToast } = useToasts();

  const getCategoryData = ({ catId, queries = {} }) => ({
    queryKey: [...QueryKeys.NOTE_CAT, catId],
    queryFn: async () => {
      const endPoint = `/note/cat/info/${catId}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const getSubjects = ({ catId, queries = {} }) => ({
    queryKey: [...QueryKeys.NOTE_SUB, catId],
    queryFn: async ({ pageParam = 0 }) => {
      const limit = 20;
      const endPoint = `/note/subs/${catId}?limit=${limit}&offset=${pageParam}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const getSubjectData = ({ subId, queries = {} }) => ({
    queryKey: [...QueryKeys.NOTE_SUB, subId],
    queryFn: async () => {
      const endPoint = `/note/sub/detail/${subId}`;
      const { subject, keywords } = await fetcher({ endPoint });
      return { subject, keywords };
    },
    ...queries,
  });

  const updateSubjectBookmark = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_SUB, "bookmark"],
    mutationFn: async ({ bookmark }) => {
      const endPoint = `/note/sub/bookmark`;
      const options = {
        method: "PATCH",
        body: JSON.stringify({ s_subid: subId, s_bookmark: bookmark }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(QueryKeysSub(subId), refetchOptions),
        queryClient.invalidateQueries(QueryKeysSubCat(catId), refetchOptions),
        queryClient.invalidateQueries(QueryKeys.NOTE_QUIZ, refetchOptions),
      ]);
    },
    ...queries,
  });

  const upsertSubject = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_SUB, "upsert"],
    mutationFn: async ({ subjects, keywords }) => {
      const endPoint = !subId ? `/note/sub/insert` : `/note/sub/update`;
      const options = {
        method: !subId ? "POST" : "PATCH",
        body: JSON.stringify({ subjects, keywords }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(QueryKeysSub(subId), refetchOptions),
        queryClient.invalidateQueries(QueryKeysSubCat(catId), refetchOptions),
        queryClient.invalidateQueries(QueryKeysCat(catId), refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  const deleteSubject = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_SUB, "delete"],
    mutationFn: async () => {
      const endPoint = `/note/sub/${catId}/${subId}/delete`;
      const options = {
        method: "DELETE",
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(QueryKeysSubCat(catId), refetchOptions),
        queryClient.invalidateQueries(QueryKeysCat(catId), refetchOptions),
        queryClient.invalidateQueries(QueryKeys.NOTE_QUIZ, refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  return {
    getCategoryData,
    getSubjects,
    getSubjectData,
    updateSubjectBookmark,
    upsertSubject,
    deleteSubject,
  };
}

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

const QueryKeysCat = (catId) => [...QueryKeys.NOTE_CAT, catId];
const QueryKeysSubCat = (catId) => [...QueryKeys.NOTE_SUB, catId];
const QueryKeysSub = (subId) => [...QueryKeys.NOTE_SUB, subId];
