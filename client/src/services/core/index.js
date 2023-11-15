import { QueryClient } from "react-query";

export const QueryKeys = {
  USER: "USER",
  TODO: "TODO",
  NOTE: "NOTE",
  QUIZ: "QUIZ",
  SEARCH: "SEARCH",
};

export const accessTokenError = [
  "INVALID_ACCESS_TOKEN",
  "UNKNOWN_ACCESS_TOKEN",
];
export const refreshTokenError = [
  "INVALID_REFRESH_TOKEN",
  "UNKNOWN_REFRESH_TOKEN",
];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

/**
 * cf) queryClient.invalidateQueries
 * queryKey 는 첫 번째 요소부터 비교된다.
 * 만약 refetch 하고자 하는 쿼리의 queryKey 가 배열이고,
 * invalidateQueries 옵션을 exact: false 로 주어
 * 개별 키에 대해 업데이트 하고자 할 때
 * 첫 번째 요소가 일치하지 않을 경우
 * 해당 옵션이 있어도 쿼리는 refetch 되지 않는다.
 */
