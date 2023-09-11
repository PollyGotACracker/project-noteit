import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import "@styles/app.css";
import { routes } from "@/router";
import { getClient } from "@services/core";
import { useUserContext } from "@contexts/userContext";
import { getThemeStorage, setThemeStorage } from "@utils/manageThemeStorage";

const App = () => {
  const route = useRoutes(routes);
  const queryClient = getClient();
  const { setColorTheme } = useUserContext();

  useEffect(() => {
    const userTheme = getThemeStorage();
    setThemeStorage(userTheme);
    setColorTheme(userTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{route}</QueryClientProvider>
  );
};

export default App;
