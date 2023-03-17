import App, { getUserColorTheme } from "../App";
import Intro from "../comps/Intro";
import Login from "../comps/Login";
import Join from "../comps/Join";
import Index from "../comps/Index";
import Home from "../comps/Home";
import NoteMain from "../comps/Note/NoteMain";
import NoteCatMain, { catLoader } from "../comps/Note/Category/NoteCatMain";
import NoteSubMain, { subLoader } from "../comps/Note/Subject/NoteSubMain";
import NoteDetail, { detailLoader } from "../comps/Note/NoteDetail";
import NoteWrite, { writeLoader } from "../comps/Note/NoteWrite";
import QuizMain from "../comps/Quiz/QuizMain";
import QuizCat, { quizCatLoader } from "../comps/Quiz/QuizCat";
import QuizSub, { quizSubLoader } from "../comps/Quiz/QuizSub";
import QuizResult from "../comps/Quiz/QuizResult";
import TodoMain from "../comps/Todo/TodoMain";
import Set from "../comps/Set/Set";
import NotFound from "../page/NotFound";

export {
  App,
  getUserColorTheme,
  Intro,
  Login,
  Join,
  Index,
  Home,
  NoteMain,
  NoteCatMain,
  catLoader,
  NoteSubMain,
  subLoader,
  NoteDetail,
  detailLoader,
  NoteWrite,
  writeLoader,
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
