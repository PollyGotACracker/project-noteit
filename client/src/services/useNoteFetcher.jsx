import { QueryKeys, queryClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";
import useToasts from "@hooks/useToasts";

const QueryCat = [QueryKeys.NOTE, "category"];
const QuerySub = [QueryKeys.NOTE, "subject"];
const QueryQuiz = [QueryKeys.NOTE, "quiz"];
const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

const useNoteFetcher = () => {
  const fetcher = useFetcher();
  const { showToast } = useToasts();

  const getCategories = ({ userId, filter = false, queries = {} }) => ({
    queryKey: [...QueryCat, userId, filter],
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const filter = queryKey.at(-1);
      const limit = 20;
      const endPoint = `/note/cats?limit=${limit}&offset=${pageParam}&filter=${filter}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const getCategoryData = ({ catId, queries = {} }) => ({
    queryKey: [...QueryCat, catId],
    queryFn: async () => {
      const endPoint = `/note/cat/info/${catId}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const insertCategory = ({ queries = {} } = {}) => ({
    mutationKey: [...QueryCat, "insert"],
    mutationFn: async ({ category }) => {
      const endPoint = `/note/cat/insert`;
      const options = {
        method: "POST",
        body: JSON.stringify(category),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(QueryCat, refetchOptions);
      showToast(data.message);
    },
    ...queries,
  });

  const updateCategoryBookmark = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryCat, "bookmark"],
    mutationFn: async ({ bookmark }) => {
      const endPoint = `/note/cat/bookmark`;
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          c_catid: catId,
          c_bookmark: bookmark,
        }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(QueryCat, refetchOptions),
        queryClient.invalidateQueries(QueryQuiz, refetchOptions),
      ]);
    },
    ...queries,
  });

  const updateCategory = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryCat, "update"],
    mutationFn: async ({ catTitle }) => {
      const endPoint = `/note/cat/update`;
      const options = {
        method: "PATCH",
        body: JSON.stringify({ c_catid: catId, c_category: catTitle }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(QueryCat, refetchOptions),
        queryClient.invalidateQueries(QueryQuiz, refetchOptions),
      ]);
    },
    ...queries,
  });

  const deleteCategory = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryCat, "delete"],
    mutationFn: async () => {
      const endPoint = `/note/cat/${catId}/delete`;
      const options = { method: "DELETE" };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(QueryCat, refetchOptions),
        queryClient.invalidateQueries(QueryQuiz, refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  const getSubjects = ({ catId, queries = {} }) => ({
    queryKey: [...QuerySub, catId],
    queryFn: async ({ pageParam = 0 }) => {
      const limit = 20;
      const endPoint = `/note/subs/${catId}?limit=${limit}&offset=${pageParam}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const getSubjectData = ({ subId, queries = {} }) => ({
    queryKey: [...QuerySub, subId],
    queryFn: async () => {
      const endPoint = `/note/sub/detail/${subId}`;
      const { subject, keywords } = await fetcher({ endPoint });
      return { subject, keywords };
    },
    ...queries,
  });

  const updateSubjectBookmark = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QuerySub, "bookmark"],
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
        queryClient.invalidateQueries([...QuerySub, subId], refetchOptions),
        queryClient.invalidateQueries([...QuerySub, catId], refetchOptions),
        queryClient.invalidateQueries(QueryQuiz, refetchOptions),
      ]);
    },
    ...queries,
  });

  const upsertSubject = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QuerySub, "upsert"],
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
        queryClient.invalidateQueries([...QuerySub, subId], refetchOptions),
        queryClient.invalidateQueries([...QuerySub, catId], refetchOptions),
        queryClient.invalidateQueries([...QueryCat, catId], refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  const deleteSubject = ({ catId, subId, queries = {} }) => ({
    mutationKey: [...QuerySub, "delete"],
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
        queryClient.invalidateQueries([...QuerySub, catId], refetchOptions),
        queryClient.invalidateQueries([...QueryCat, catId], refetchOptions),
        queryClient.invalidateQueries(QueryQuiz, refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  return {
    getCategories,
    getCategoryData,
    insertCategory,
    updateCategoryBookmark,
    updateCategory,
    deleteCategory,
    getSubjects,
    getSubjectData,
    updateSubjectBookmark,
    upsertSubject,
    deleteSubject,
  };
};

export default useNoteFetcher;
