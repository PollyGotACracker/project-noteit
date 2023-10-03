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
  FIND_PASSWORD: "/password/find",
};

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <SignOutLayout />,
        children: [
          { path: "/", index: true, element: <Landing /> },
          { path: URLS.SIGN_IN, index: true, element: <SignIn /> },
          { path: URLS.SIGN_UP, index: true, element: <SignUp /> },
        ],
      },
      {
        path: "/",
        element: <SignInLayout />,
        children: [
          { path: URLS.DASHBOARD, index: true, element: <Dashboard /> },
          { path: URLS.TODO, index: true, element: <Todo /> },
          { path: URLS.NOTE, index: true, element: <Note /> },
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
            index: true,
            element: <Search />,
          },
          { path: URLS.QUIZ, index: true, element: <Quiz /> },
          { path: `${URLS.QUIZ_GAME}/:catid`, element: <QuizGame /> },
          { path: URLS.QUIZ_RESULT, element: <QuizResult /> },
          { path: URLS.SETTINGS, index: true, element: <Settings /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
];
