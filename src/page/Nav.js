import { useNavigate } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  const url = useNavigate();
  const onClickHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const btns = document.querySelectorAll("button.Nav");
      for (let btn of btns) {
        btn.classList.remove("active");
      }
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
      e.target.classList.add("active");
    }
  };

  return (
    <nav>
      <button className="Nav voca" type="button" onClick={onClickHandler}>
        단어장
      </button>
      <button className="Nav quiz" type="button" onClick={onClickHandler}>
        퀴즈
      </button>
      <button className="Nav home" type="button" onClick={onClickHandler}>
        메인
      </button>
      <button className="Nav set" type="button" onClick={onClickHandler}>
        설정
      </button>
    </nav>
  );
};

export default Nav;
