import { QueryKeys } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const useSearchFetcher = () => {
  const fetcher = useFetcher();

  const getSearchResult = ({ userId, variables, queries = {} }) => ({
    queryKey: [QueryKeys.SEARCH, variables],
    queryFn: async () => {
      const endPoint = `/search/${userId}?value=${variables}`;
      const res = await fetcher({ endPoint });
      return { result: res.result, regexp: res.regexp };
    },
    staleTime: 0,
    cacheTime: 0,
    ...queries,
  });

  return getSearchResult;
};

export default useSearchFetcher;
