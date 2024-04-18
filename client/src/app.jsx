import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { QueryClientProvider } from "react-query";
import { routers } from "@/router";
import { queryClient } from "@services/core";
import { setThemeStorage } from "@utils/manageThemeStorage";
import { themeState } from "@recoils/theme";
import ModalsProvider from "@contexts/ModalContext";
import ToastsProvider from "@contexts/ToastContext";

export default function App() {
  const userTheme = useRecoilValue(themeState);
  setThemeStorage(userTheme);

  return (
    <Suspense fallback={<div></div>}>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <ToastsProvider>
            <RouterProvider router={routers} />
          </ToastsProvider>
        </ModalsProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
