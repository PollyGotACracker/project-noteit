import {
  GlobalLayout,
  SignInGnb,
  SignOutGnb,
  Landing,
  SignIn,
  SignUp,
  Dashboard,
  Note,
  NoteList,
  NoteDetail,
  NoteWrite,
  Search,
  Quiz,
  QuizGame,
  QuizResult,
  Todo,
  Settings,
  Error,
} from "@/routeList.js";

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <SignOutGnb />,
        children: [
          { path: "", element: <Landing /> },
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
      {
        path: "",
        element: <SignInGnb />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "todo", element: <Todo /> },
          { path: "note", element: <Note /> },
          {
            path: "note/list/:catId",
            element: <NoteList />,
          },
          {
            path: "note/detail/:catId/:subId",
            element: <NoteDetail />,
          },
          {
            path: "note/write/:catId/:subId?",
            element: <NoteWrite />,
          },
          {
            path: "search",
            element: <Search />,
          },
          { path: "quiz", element: <Quiz /> },
          { path: "quiz/game/:catid", element: <QuizGame /> },
          { path: "quiz/result", element: <QuizResult /> },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
];

export const URLS = {
  UPLOAD_ROUTE: "/server/note/upload",
  UPLOADS: "/server/uploads",
  NOTE_LIST: "/note/list",
  NOTE_DETAIL: "/note/detail",
  NOTE_WRITE: "/note/write",
  QUIZ_GAME: "/quiz/game",
  QUIZ_RESULT: "/quiz/result",
  SEARCH: "/search",
};
