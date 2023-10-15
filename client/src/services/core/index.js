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

const checkTokenError = (code) => {
  return [...accessTokenError, ...refreshTokenError].includes(code);
};

export const getClient = (() => {
  let client = null;
  return () => {
    if (!client) client = new QueryClient();
    client.setDefaultOptions({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
          refetchOnMount: false,
          refetchOnReconnect: true,
          refetchOnWindowsFocus: false,
          onError: (error) => {
            if (checkTokenError(error?.code)) {
              client.cancelQueries();
            }
          },
          retry: (error) => {
            if (checkTokenError(error?.code)) {
              return false;
            }
          },
        },
      },
    });
    return client;
  };
})();
