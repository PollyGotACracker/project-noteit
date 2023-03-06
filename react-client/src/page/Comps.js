import App from "../App";
import Login from "../comps/Login";
import Index from "../comps/Index";
import Home from "../comps/Home";
import NoteMain from "../comps/Note/NoteMain";
import NoteCatMain, { catLoader } from "../comps/Note/Category/NoteCatMain";
import NoteSubMain, { subLoader } from "../comps/Note/Subject/NoteSubMain";
import NoteDetail, { detailLoader } from "../comps/Note/NoteDetail";
import NoteWrite, { writeLoader } from "../comps/Note/NoteWrite";
import QuizMain from "../comps/Quiz/QuizMain";
import TodoMain from "../comps/Todo/TodoMain";
import Set from "../comps/Set/Set";
import NotFound from "../page/NotFound";

export {
  App,
  Login,
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
  TodoMain,
  Set,
  NotFound,
};
