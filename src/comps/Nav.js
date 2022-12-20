import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faMessage,
  faHouse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav>
      <button className="Nav voca" type="button">
        <FontAwesomeIcon icon={faListUl} />
        단어장
      </button>
      <button className="Nav quiz" type="button">
        <FontAwesomeIcon icon={faMessage} />
        퀴즈
      </button>
      <button className="Nav home" type="button">
        <FontAwesomeIcon icon={faHouse} />홈
      </button>
      <button className="Nav set" type="button">
        <FontAwesomeIcon icon={faGear} />
        설정
      </button>
    </nav>
  );
};

export default Nav;
