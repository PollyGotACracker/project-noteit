import {
  GlobalLayout,
  SignOutLayout,
  SignInLayout,
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

export const URLS = {
  UPLOAD_ROUTE: "/server/note/upload",
  UPLOADS: "/server/uploads",
  DASHBOARD: "/dashboard",
  TODO: "/todo",
  NOTE: "/note",
  NOTE_LIST: "/note/list",
  NOTE_DETAIL: "/note/detail",
  NOTE_WRITE: "/note/write",
  QUIZ: "/quiz",
  QUIZ_GAME: "/quiz/game",
  QUIZ_RESULT: "/quiz/result",
  SEARCH: "/search",
  SETTINGS: "/settings",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  SIGN_OUT: "/signout",
  FIND_PASSWORD: "/password/find",
};

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <SignOutLayout />,
        children: [
          { path: "", exact: true, element: <Landing /> },
          { path: URLS.SIGN_IN, element: <SignIn /> },
          { path: URLS.SIGN_UP, element: <SignUp /> },
        ],
      },
      {
        path: "",
        element: <SignInLayout />,
        children: [
          { path: URLS.DASHBOARD, element: <Dashboard /> },
          { path: URLS.TODO, element: <Todo /> },
          { path: URLS.NOTE, element: <Note /> },
          {
            path: `${URLS.NOTE_LIST}/:catId`,
            element: <NoteList />,
          },
          {
            path: `${URLS.NOTE_DETAIL}/:catId/:subId`,
            element: <NoteDetail />,
          },
          {
            path: `${URLS.NOTE_WRITE}/:catId/:subId?`,
            element: <NoteWrite />,
          },
          {
            path: URLS.SEARCH,
            element: <Search />,
          },
          { path: URLS.QUIZ, element: <Quiz /> },
          { path: `${URLS.QUIZ_GAME}/:catid`, element: <QuizGame /> },
          { path: URLS.QUIZ_RESULT, element: <QuizResult /> },
          { path: URLS.SETTINGS, element: <Settings /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
];
