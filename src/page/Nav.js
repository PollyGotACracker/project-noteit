import { useNavigate } from "react-router-dom";
import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faMessage,
  faHouse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const url = useNavigate();
  const onClickHandler = (e) => {
    alert(e.target.tagName);
    if (e.target.tagName === "BUTTON") {
      const text = e.target.textContent;
      switch (text) {
        case "메인":
          url("/");
          break;
        case "단어장":
          url("/voca");
          break;
        case "퀴즈":
          url("/quiz");
          break;
        case "설정":
          url("/setting");
          break;
      }
    }
  };

  return (
    <nav>
      <button className="Nav voca" type="button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={faListUl} />
        단어장
      </button>
      <button className="Nav quiz" type="button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={faMessage} />
        퀴즈
      </button>
      <button className="Nav home" type="button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={faHouse} />
        메인
      </button>
      <button className="Nav set" type="button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={faGear} />
        설정
      </button>
    </nav>
  );
};

export default Nav;
