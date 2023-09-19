import { fetcher } from "@services/core";

export const getSearchResult = async (value) => {
  const endPoint = `/search?value=${value}`;
  const res = await fetcher({ endPoint });
  return { data: res.result, regexp: res.regexp };
};
