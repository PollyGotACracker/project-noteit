import { lazy } from "react";

/* layouts */
const SignOutLayout = lazy(() => import("@layouts/SignOutLayout"));
const SignInLayout = lazy(() => import("@layouts/SignInLayout"));

/* features */
import Landing from "@features/landing/containers";
import SignIn from "@features/signin/containers";
import SignUp from "@features/signup/containers";
import PwdReset from "@features/pwdReset/containers";
import PwdResetLink from "@features/pwdReset/containers/link";
const Dashboard = lazy(() => import("@features/dashboard/containers"));
const Todo = lazy(() => import("@features/todo/containers"));
const Note = lazy(() => import("@features/note/index/containers"));
const NoteCategory = lazy(() =>
  import("@features/note/category/containers/[catid]")
);
const NoteSubject = lazy(() =>
  import("@features/note/subject/containers/[catid][subid]")
);
const NoteWrite = lazy(() => import("@features/note/write/containers/[...id]"));
const Search = lazy(() => import("@features/search/containers"));
const Quiz = lazy(() => import("@features/quiz/index/containers"));
const QuizGame = lazy(() => import("@features/quiz/game/containers/[catid]"));
const QuizResult = lazy(() => import("@features/quiz/result/containers"));
const Settings = lazy(() => import("@features/settings/containers"));

/* not found */
import NotFound from "@components/error/NotFound";

export {
  SignOutLayout,
  SignInLayout,
  Landing,
  SignIn,
  SignUp,
  PwdReset,
  PwdResetLink,
  Dashboard,
  Todo,
  Note,
  NoteCategory,
  NoteSubject,
  NoteWrite,
  Search,
  Quiz,
  QuizGame,
  QuizResult,
  Settings,
  NotFound,
};
