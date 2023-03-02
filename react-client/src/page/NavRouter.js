import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  App,
  Intro,
  Index,
  Home,
  NoteMain,
  NoteCatMain,
  NoteSubMain,
  NoteDetail,
  detailLoader,
  NoteWrite,
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
          {
            path: "note",
            element: <NoteMain />,
            children: [
              { path: "", element: <NoteCatMain /> },
              {
                path: "category/:catid",
                element: <NoteSubMain />,
              },
              { path: "category/:catid/search", element: <NoteSubMain /> },
              {
                path: "subject/:catid/:subid",
                loader: detailLoader,
                element: <NoteDetail />,
              },
              { path: "write/:catid/:subid?", element: <NoteWrite /> },
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
