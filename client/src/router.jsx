import {
  GlobalLayout,
  SignInGnb,
  SignOutGnb,
  Main,
  SignIn,
  SignUp,
  Dashboard,
  Note,
  NoteCat,
  NoteSub,
  NoteDetail,
  NoteWrite,
  writeLoader,
  Search,
  Quiz,
  QuizCat,
  quizCatLoader,
  QuizSub,
  quizSubLoader,
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
          { path: "", element: <Main /> },
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
          {
            path: "note",
            element: <Note />,
            children: [
              { path: "", element: <NoteCat /> },
              {
                path: "category/:catid",
                element: <NoteSub />,
              },
              {
                path: "subject/:catid/:subid",
                element: <NoteDetail />,
              },
              {
                path: "write/:catid/:subid?",
                loader: writeLoader,
                element: <NoteWrite />,
              },
            ],
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "quiz",
            element: <Quiz />,
            children: [
              { path: "", loader: quizCatLoader, element: <QuizCat /> },
              { path: ":catid", loader: quizSubLoader, element: <QuizSub /> },
              { path: "result", element: <QuizResult /> },
            ],
          },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
];
