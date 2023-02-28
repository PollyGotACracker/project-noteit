import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  App,
  Intro,
  Index,
  Home,
  VocaMain,
  VocaNote,
  VocaDetail,
  detailLoader,
  VocaWrite,
  QuizMain,
  TodoMain,
  Set,
  NotFound,
} from "./Comps.js";

const NavRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Intro /> },
      {
        path: "",
        element: <Index />,
        children: [
          { path: "home", element: <Home /> },
          { path: "voca", element: <VocaMain /> },
          {
            path: "voca/category/:catid",
            element: <VocaNote />,
          },
          { path: "voca/category/:catid/search", element: <VocaNote /> },
          {
            path: "voca/subject/:catid/:subid",
            loader: detailLoader,
            element: <VocaDetail />,
          },
          { path: "voca/write/:catid/:subid?", element: <VocaWrite /> },
          { path: "todo", element: <TodoMain /> },
          { path: "quiz", element: <QuizMain /> },
          { path: "setting", element: <Set /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const NavRouterProvider = () => {
  return <RouterProvider router={NavRouter}></RouterProvider>;
};
export default NavRouterProvider;
