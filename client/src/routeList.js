import App from "@/app";
import SignInGnb from "@pages/signInGnb";
import SignOutGnb from "@pages/signOutGnb";
import Main from "@pages";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import Dashboard from "@pages/dashboard";
import Note from "@pages/note/layout";
import NoteCat from "@pages/note";
import NoteSub from "@pages/note/category/[catid]";
import NoteDetail from "@pages/note/subject/[catid][subid]";
import NoteWrite, { writeLoader } from "@pages/note/write/[...id]";
import Search from "@pages/search";
import Quiz from "@pages/quiz/layout";
import QuizCat, { quizCatLoader } from "@pages/quiz";
import QuizSub, { quizSubLoader } from "@pages/quiz/[catid]";
import QuizResult from "@pages/quiz/result";
import Todo from "@pages/todo";
import Settings from "@pages/settings";
import Error from "@pages/error";

export {
  App,
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
};
