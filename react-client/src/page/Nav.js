import { NavLink } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink className="home" to="/home">
        메인
      </NavLink>
      <NavLink className="quiz" to="/quiz">
        퀴즈
      </NavLink>
      <NavLink className="voca" to="/voca">
        노트
      </NavLink>
      <NavLink className="setting" to="/setting">
        설정
      </NavLink>
    </nav>
  );
};

export default Nav;
