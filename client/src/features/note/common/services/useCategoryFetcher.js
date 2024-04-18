import { queryClient, QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";
import useToasts from "@hooks/useToasts";

export default function useCategoryFetcher() {
  const fetcher = useFetcher();
  const { showToast } = useToasts();

  const getCategories = ({ userId, filter = false, queries = {} }) => ({
    queryKey: [...QueryKeys.NOTE_CAT, userId, filter],
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const filter = queryKey.at(-1);
      const limit = 20;
      const endPoint = `/note/cats?limit=${limit}&offset=${pageParam}&filter=${filter}`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const insertCategory = ({ queries = {} } = {}) => ({
    mutationKey: [...QueryKeys.NOTE_CAT, "insert"],
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
      await queryClient.invalidateQueries(QueryKeys.NOTE_CAT, refetchOptions);
      showToast(data.message);
    },
    ...queries,
  });

  const updateCategoryBookmark = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_CAT, "bookmark"],
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
        queryClient.invalidateQueries(QueryKeys.NOTE_CAT, refetchOptions),
        queryClient.invalidateQueries(QueryKeys.NOTE_QUIZ, refetchOptions),
      ]);
    },
    ...queries,
  });

  const updateCategory = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_CAT, "update"],
    mutationFn: async ({ catName }) => {
      const endPoint = `/note/cat/update`;
      const options = {
        method: "PATCH",
        body: JSON.stringify({ c_catid: catId, c_category: catName }),
      };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(QueryKeys.NOTE_CAT, refetchOptions),
        queryClient.invalidateQueries(QueryKeys.NOTE_QUIZ, refetchOptions),
      ]);
    },
    ...queries,
  });

  const deleteCategory = ({ catId, queries = {} }) => ({
    mutationKey: [...QueryKeys.NOTE_CAT, "delete"],
    mutationFn: async () => {
      const endPoint = `/note/cat/${catId}/delete`;
      const options = { method: "DELETE" };
      const res = await fetcher({ endPoint, options });
      return res;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(QueryKeys.NOTE_CAT, refetchOptions),
        queryClient.invalidateQueries(QueryKeys.NOTE_QUIZ, refetchOptions),
      ]);
      showToast(data.message);
    },
    ...queries,
  });

  return {
    getCategories,
    insertCategory,
    updateCategoryBookmark,
    updateCategory,
    deleteCategory,
  };
}

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};
