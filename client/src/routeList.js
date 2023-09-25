import GlobalLayout from "@pages/_layout";
import SignInGnb from "@pages/signInGnb";
import SignOutGnb from "@pages/signOutGnb";
import Landing from "@pages";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import Dashboard from "@pages/dashboard";
import Todo from "@pages/todo";
import Note from "@pages/note";
import NoteList from "@pages/note/list/[catid]";
import NoteDetail from "@pages/note/detail/[catid][subid]";
import NoteWrite from "@pages/note/write/[...id]";
import Search from "@pages/search";
import Quiz from "@pages/quiz";
import QuizGame from "@pages/quiz/game/[catId]";
import QuizResult from "@pages/quiz/result";
import Settings from "@pages/settings";
import Error from "@pages/error";

export {
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
};
