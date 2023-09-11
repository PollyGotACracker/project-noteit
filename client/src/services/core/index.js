import { QueryClient } from "react-query";

export const getClient = (() => {
  let client = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowsFocus: false,
          },
        },
      });
    return client;
  };
})();

const BASE_URL = `/server`; //import.meta.env.VITE_SERVER_URL

export const fetcher = async ({ endPoint, options }) => {
  const result = await fetch(`${BASE_URL}${endPoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
      ...options?.headers,
    },
  }).then((data) => data.json());
  return result;
};

export const QueryKeys = {
  USER: "USER",
  DASHBOARD: "DASHBOARD",
  TODO: "TODO",
  NOTE: "NOTE",
  QUIZ: "QUIZ",
};
