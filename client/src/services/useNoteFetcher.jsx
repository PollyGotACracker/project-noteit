import { QueryKeys, getClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const queryClient = getClient();
const QueryCat = [QueryKeys.NOTE, "category"];
const QuerySub = [QueryKeys.NOTE, "subject"];
const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

const useNoteFetcher = () => {
  const fetcher = useFetcher();

  const getCategories = ({ userId }) => ({
    queryKey: [...QueryCat, userId],
    queryFn: async () => {
      const endPoint = `/note/cats`;
      const res = await fetcher({ endPoint });
      return res;
    },
  });

  const getCategoryData = ({ catId }) => ({
    queryKey: [...QueryCat, catId],
    queryFn: async () => {
      const endPoint = `/note/cat/detail/${catId}`;
      const res = await fetcher({ endPoint });
      return res;
    },
  });

  const insertCategory = () => ({
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat);
      alert(data.message);
    },
  });

  const updateCategoryBookmark = ({ catId }) => ({
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat);
      alert(data.message);
    },
  });

  const updateCategory = ({ catId, queries }) => ({
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat);
      alert(data.message);
    },
    ...queries,
  });

  const deleteCategory = ({ catId }) => ({
    mutationKey: [...QueryCat, "delete"],
    mutationFn: async () => {
      const endPoint = `/note/cat/${catId}/delete`;
      const options = { method: "DELETE" };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat);
      alert(data.message);
    },
  });

  const getSubjects = ({ catId }) => ({
    queryKey: [...QuerySub, catId],
    queryFn: async () => {
      const endPoint = `/note/subs/${catId}`;
      const { category, subjects } = await fetcher({ endPoint });
      return { category, subjects };
    },
  });

  const getSubjectData = ({ subId }) => ({
    queryKey: [...QuerySub, subId],
    queryFn: async () => {
      const endPoint = `/note/sub/detail/${subId}`;
      const { subject, keywords } = await fetcher({ endPoint });
      return { subject, keywords };
    },
  });

  const updateSubjectBookmark = ({ subId }) => ({
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
    onSuccess: () => {
      queryClient.invalidateQueries(QueryCat, refetchOptions);
      queryClient.invalidateQueries(QuerySub, refetchOptions);
    },
  });

  const upsertSubject = ({ subId }) => ({
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat, refetchOptions);
      queryClient.invalidateQueries(QuerySub, refetchOptions);
      alert(data.message);
    },
  });

  const deleteSubject = ({ catId, subId }) => ({
    mutationKey: [...QuerySub, "delete"],
    mutationFn: async () => {
      const endPoint = `/note/sub/${catId}/${subId}/delete`;
      const options = {
        method: "DELETE",
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryCat, refetchOptions);
      queryClient.invalidateQueries(QuerySub, refetchOptions);
      alert(data.message);
    },
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
