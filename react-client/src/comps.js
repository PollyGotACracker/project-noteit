import App, { getUserColorTheme } from "./App";
import Intro from "./pages/Intro";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Index from "./pages/Index";
import HomeMain from "./pages/Home/HomeMain";
import NoteMain from "./pages/Note/NoteMain";
import NoteCatMain, { catLoader } from "./pages/Note/Category/NoteCatMain";
import NoteSubMain, { subLoader } from "./pages/Note/Subject/NoteSubMain";
import NoteDetail, { detailLoader } from "./pages/Note/NoteDetail";
import NoteWrite, { writeLoader } from "./pages/Note/NoteWrite";
import NoteSearch from "./pages/Note/NoteSearch";
import QuizMain from "./pages/Quiz/QuizMain";
import QuizCat, { quizCatLoader } from "./pages/Quiz/QuizCat";
import QuizSub, { quizSubLoader } from "./pages/Quiz/QuizSub";
import QuizResult from "./pages/Quiz/QuizResult";
import TodoMain from "./pages/Todo/TodoMain";
import Set from "./pages/Set/Set";
import NotFound from "./pages/NotFound";

export {
  App,
  getUserColorTheme,
  Intro,
  Main,
  Login,
  Join,
  Index,
  HomeMain,
  NoteMain,
  NoteCatMain,
  catLoader,
  NoteSubMain,
  subLoader,
  NoteDetail,
  detailLoader,
  NoteWrite,
  writeLoader,
  NoteSearch,
  QuizMain,
  QuizCat,
  quizCatLoader,
  QuizSub,
  quizSubLoader,
  QuizResult,
  TodoMain,
  Set,
  NotFound,
};
