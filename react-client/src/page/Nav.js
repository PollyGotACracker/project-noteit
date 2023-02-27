import { NavLink } from "react-router-dom";
import "../css/Nav.css";
import {
  RiHome4Fill,
  RiQuestionnaireFill,
  RiBookletFill,
  RiBookMarkFill,
  RiSettings5Fill,
  RiLogoutBoxLine,
} from "react-icons/ri";

const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink className="home" to="/home">
        <RiHome4Fill />
        메인
      </NavLink>
      <NavLink className="quiz" to="/quiz">
        <RiQuestionnaireFill />
        퀴즈
      </NavLink>
      <NavLink className="voca" to="/voca">
        <RiBookMarkFill />
        노트
      </NavLink>
      <NavLink className="diary" to="/diary">
        <RiBookletFill />
        일기
      </NavLink>
      <NavLink className="setting" to="/setting">
        <RiSettings5Fill />
        설정
      </NavLink>
      <NavLink className="logout" to="/logout">
        <RiLogoutBoxLine />
        로그아웃
      </NavLink>
    </nav>
  );
};

export default Nav;
