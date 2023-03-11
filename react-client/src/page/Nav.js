import { NavLink } from "react-router-dom";
import "../css/Nav.css";
import {
  RiHome4Fill,
  RiQuestionnaireFill,
  RiSettings5Fill,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { TbListCheck } from "react-icons/tb";

const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink className="home" to={`/home`}>
        <RiHome4Fill />
        메인
      </NavLink>
      <NavLink className="todo" to={`/todo`}>
        <div>
          <TbListCheck />
        </div>
        목표
      </NavLink>
      <NavLink className="note" to={`/note`}>
        <BsFillJournalBookmarkFill />
        노트
      </NavLink>
      <NavLink className="quiz" to={`/quiz`}>
        <RiQuestionnaireFill />
        퀴즈
      </NavLink>
      <NavLink className="setting" to={`/setting`}>
        <RiSettings5Fill />
        설정
      </NavLink>
      <NavLink className="logout" to={`/logout`}>
        <RiLogoutBoxLine />
        로그아웃
      </NavLink>
    </nav>
  );
};

export default Nav;
