import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  App,
  Intro,
  Main,
  Login,
  Join,
  Index,
  HomeMain,
  NoteMain,
  NoteCatMain,
  catLoader,
  NoteSubMain,
  subLoader,
  NoteDetail,
  detailLoader,
  NoteWrite,
  writeLoader,
  NoteSearch,
  QuizMain,
  QuizCat,
  quizCatLoader,
  QuizSub,
  quizSubLoader,
  QuizResult,
  TodoMain,
  Set,
  NotFound,
} from "./comps.js";

const NavRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Intro />,
        children: [
          { path: "", element: <Main /> },
          { path: "login", element: <Login /> },
          { path: "join", element: <Join /> },
        ],
      },
      {
        path: "",
        element: <Index />,
        children: [
          { path: "home", element: <HomeMain /> },
          { path: "todo", element: <TodoMain /> },
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
                path: "subject/:catid/:subid",
                loader: detailLoader,
                element: <NoteDetail />,
              },
              {
                path: "write/:catid/:subid?",
                loader: writeLoader,
                element: <NoteWrite />,
              },
              {
                path: "search",
                element: <NoteSearch />,
              },
            ],
          },
          {
            path: "quiz",
            element: <QuizMain />,
            children: [
              { path: "", loader: quizCatLoader, element: <QuizCat /> },
              { path: ":catid", loader: quizSubLoader, element: <QuizSub /> },
              { path: "result", element: <QuizResult /> },
            ],
          },
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
