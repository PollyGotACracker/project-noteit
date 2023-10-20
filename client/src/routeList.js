import { lazy } from "react";
import SignOutLayout from "@layouts/signOutLayout";
import SignInLayout from "@layouts/signInLayout";
import Landing from "@pages";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import PwdReset from "@pages/pwdreset";
import PwdResetLink from "@pages/pwdreset/link";
const Dashboard = lazy(() => import("@pages/dashboard"));
const Todo = lazy(() => import("@pages/todo"));
const Note = lazy(() => import("@pages/note"));
const NoteList = lazy(() => import("@pages/note/list/[catid]"));
const NoteDetail = lazy(() => import("@pages/note/detail/[catid][subid]"));
const NoteWrite = lazy(() => import("@pages/note/write/[...id]"));
const Search = lazy(() => import("@pages/search"));
const Quiz = lazy(() => import("@pages/quiz"));
const QuizGame = lazy(() => import("@pages/quiz/game/[catid]"));
const QuizResult = lazy(() => import("@pages/quiz/result"));
const Settings = lazy(() => import("@pages/settings"));
import Error from "@pages/error";

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
  NoteList,
  NoteDetail,
  NoteWrite,
  Search,
  Quiz,
  QuizGame,
  QuizResult,
  Settings,
  Error,
};
