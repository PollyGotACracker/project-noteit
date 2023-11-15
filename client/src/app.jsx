import { RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { QueryClientProvider } from "react-query";
import { routers } from "@/router";
import { queryClient } from "@services/core";
import { setThemeStorage } from "@utils/manageThemeStorage";
import { themeState } from "@recoils/theme";

const App = () => {
  const userTheme = useRecoilValue(themeState);
  setThemeStorage(userTheme);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
    </QueryClientProvider>
  );
};

export default App;
