import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import {
  Splash,
  Home,
  VocaMain,
  VocaNote,
  VocaDetail,
  VocaWrite,
  QuizMain,
  Set,
} from "../comps/Index";

const NavRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/voca" element={<VocaMain />} />
      <Route path="/category" element={<VocaNote />} />
      <Route path="/subject/:id" element={<VocaDetail />} />
      <Route path="/write" element={<VocaWrite />} />
      <Route path="/quiz" element={<QuizMain />} />
      <Route path="/setting" element={<Set />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NavRouter;
