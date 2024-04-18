import {
  SignOutLayout,
  SignInLayout,
  Landing,
  SignIn,
  SignUp,
  PwdReset,
  PwdResetLink,
  Dashboard,
  Note,
  NoteCategory,
  NoteSubject,
  NoteWrite,
  Search,
  Quiz,
  QuizGame,
  QuizResult,
  Todo,
  Settings,
  NotFound,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { TbListCheck } from "react-icons/tb";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";
import { RiSettings5Fill } from "react-icons/ri";

export const SERVER_URL = "/server";
export const UPLOAD_URL = "/server/uploads";
export const URLS = {
  DASHBOARD: "/dashboard",
  TODO: "/todo",
  NOTE: "/note",
  NOTE_CATEGORY: "/note/category",
  NOTE_SUBJECT: "/note/subject",
  NOTE_WRITE: "/note/write",
  QUIZ: "/quiz",
  QUIZ_GAME: "/quiz/game",
  QUIZ_RESULT: "/quiz/result",
  SEARCH: "/search",
  SETTINGS: "/settings",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  RESET_PASSWORD: "/password-reset",
  RESET_PASSWORD_LINK: "/password-reset/link",
};

export const routerData = [
  {
    id: 0,
    path: "/",
    label: "홈",
    element: <Landing />,
    withAuth: false,
    withLanding: false,
  },
  {
    id: 1,
    path: URLS.SIGN_UP,
    label: "회원가입",
    element: <SignUp />,
    withAuth: false,
    withLanding: false,
  },
  {
    id: 2,
    path: URLS.SIGN_IN,
    label: "로그인",
    element: <SignIn />,
    withAuth: false,
    withLanding: true,
  },
  {
    id: 3,
    path: URLS.RESET_PASSWORD,
    label: "비밀번호 초기화",
    element: <PwdReset />,
    withAuth: false,
    withLanding: false,
  },
  {
    id: 4,
    path: URLS.RESET_PASSWORD_LINK,
    label: "비밀번호 초기화 링크",
    element: <PwdResetLink />,
    withAuth: false,
    withLanding: false,
  },
  {
    id: 5,
    path: URLS.DASHBOARD,
    label: "대시보드",
    element: <Dashboard />,
    withAuth: true,
    class: "dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 6,
    path: URLS.TODO,
    label: "목표",
    element: <Todo />,
    withAuth: true,
    class: "todo",
    icon: (
      <div>
        <TbListCheck />
      </div>
    ),
  },
  {
    id: 7,
    path: URLS.NOTE,
    label: "노트",
    element: <Note />,
    withAuth: true,
    class: "note",
    icon: <BsFillJournalBookmarkFill />,
  },
  {
    id: 8,
    path: `${URLS.NOTE_CATEGORY}/:catId`,
    label: "노트 카테고리",
    element: <NoteCategory />,
    withAuth: true,
  },
  {
    id: 9,
    path: `${URLS.NOTE_SUBJECT}/:catId/:subId`,
    label: "노트 주제",
    element: <NoteSubject />,
    withAuth: true,
  },
  {
    id: 10,
    path: `${URLS.NOTE_WRITE}/:catId/:subId?`,
    label: "노트 작성",
    element: <NoteWrite />,
    withAuth: true,
  },
  {
    id: 11,
    path: URLS.SEARCH,
    label: "검색",
    element: <Search />,
    withAuth: true,
  },
  {
    id: 12,
    path: URLS.QUIZ,
    label: "퀴즈",
    element: <Quiz />,
    withAuth: true,
    class: "quiz",
    icon: <AiFillQuestionCircle />,
  },
  {
    id: 13,
    path: `${URLS.QUIZ_GAME}/:catid`,
    label: "퀴즈 게임",
    element: <QuizGame />,
    withAuth: true,
  },
  {
    id: 14,
    path: URLS.QUIZ_RESULT,
    label: "퀴즈 결과",
    element: <QuizResult />,
    withAuth: true,
  },
  {
    id: 15,
    path: URLS.SETTINGS,
    label: "설정",
    index: true,
    element: <Settings />,
    withAuth: true,
    class: "settings",
    icon: <RiSettings5Fill />,
  },
];

export const routers = createBrowserRouter([
  ...routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <SignInLayout>{router.element}</SignInLayout>,
      };
    } else {
      return {
        path: router.path,
        element: <SignOutLayout>{router.element}</SignOutLayout>,
      };
    }
  }),
  {
    path: "*",
    element: <NotFound />,
  },
]);
