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
      <Route path="/voca/category/:catid" element={<VocaNote />} />
      <Route path="/voca/category/:catid/search" element={<VocaNote />} />
      <Route path="/voca/subject/:catid/:subid" element={<VocaDetail />} />
      <Route path="/voca/write/:catid/:subid?" element={<VocaWrite />} />
      <Route path="/quiz" element={<QuizMain />} />
      <Route path="/setting" element={<Set />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NavRouter;
