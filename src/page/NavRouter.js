import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import {
  Home,
  VocaMain,
  VocaNote,
  VocaDetail,
  QuizMain,
  Set,
} from "../comps/Index";

const NavRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/voca" element={<VocaMain />} />
      <Route path="/category" element={<VocaNote />} />
      <Route path="/subject" element={<VocaDetail />} />
      <Route path="/quiz" element={<QuizMain />} />
      <Route path="/setting" element={<Set />} />
      <Route path="*" element={<NotFound />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default NavRouter;
