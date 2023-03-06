import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  App,
  Login,
  Index,
  Home,
  NoteMain,
  NoteCatMain,
  catLoader,
  NoteSubMain,
  subLoader,
  NoteDetail,
  detailLoader,
  NoteWrite,
  writeLoader,
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
      { path: "login", element: <Login /> },
      {
        path: "",
        element: <Index />,
        children: [
          { path: "", element: <Home /> },
          {
            path: "note",
            element: <NoteMain />,
            children: [
              { path: "", loader: catLoader, element: <NoteCatMain /> },
              {
                path: "category/:catid",
                loader: subLoader,
                element: <NoteSubMain />,
              },
              {
                path: "category/:catid/search",

                element: <NoteSubMain />,
              },
              {
                path: "subject/:catid/:subid",
                loader: detailLoader,
                element: <NoteDetail />,
              },
              {
                path: "write/:catid/:subid?",
                loader: writeLoader,
                element: <NoteWrite />,
              },
            ],
          },
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
