import { lazy } from "react";
import GlobalLayout from "@pages/_layout";
const SignOutLayout = lazy(() => import("@pages/signOutLayout"));
const SignInLayout = lazy(() => import("@pages/signInLayout"));
import Landing from "@pages";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
const Dashboard = lazy(() => import("@pages/dashboard"));
const Todo = lazy(() => import("@pages/todo"));
const Note = lazy(() => import("@pages/note"));
const NoteList = lazy(() => import("@pages/note/list/[catid]"));
const NoteDetail = lazy(() => import("@pages/note/detail/[catid][subid]"));
const NoteWrite = lazy(() => import("@pages/note/write/[...id]"));
const Search = lazy(() => import("@pages/search"));
const Quiz = lazy(() => import("@pages/quiz"));
const QuizGame = lazy(() => import("@pages/quiz/game/[catId]"));
const QuizResult = lazy(() => import("@pages/quiz/result"));
const Settings = lazy(() => import("@pages/settings"));
import Error from "@pages/error";

export {
  GlobalLayout,
  SignOutLayout,
  SignInLayout,
  Landing,
  SignIn,
  SignUp,
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
