import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  const url = useNavigate();
  const onClickHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const text = e.target.textContent;
      switch (text) {
        case "메인":
          url("/home");
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

  useEffect(() => {
    const btns = document.querySelectorAll("nav button");
    const path = window.location.pathname.split("/")[1];
    for (let btn of btns) {
      if (Array.from(btn.classList).includes(path)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });

  return (
    <nav className="Nav">
      <button className="voca" type="button" onClick={onClickHandler}>
        단어장
      </button>
      <button className="quiz" type="button" onClick={onClickHandler}>
        퀴즈
      </button>
      <button className="home" type="button" onClick={onClickHandler}>
        메인
      </button>
      <button className="setting" type="button" onClick={onClickHandler}>
        설정
      </button>
    </nav>
  );
};

export default Nav;
