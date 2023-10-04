import { QueryKeys, fetcher } from "@services/core";

export const getSearchResult = ({ userId, variables, queries }) => ({
  queryKey: [QueryKeys.SEARCH, variables],
  queryFn: async () => {
    const endPoint = `/search/${userId}?value=${variables}`;
    const res = await fetcher({ endPoint });
    return { result: res.result, regexp: res.regexp };
  },
  onError: (error) => {
    alert(error.message);
  },
  ...queries,
});
