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
