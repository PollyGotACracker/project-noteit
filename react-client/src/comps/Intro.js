import "../css/Intro.css";
import { Link } from "react-router-dom";

const Intro = () => {
  const onClickHandler = () => {
    // 유효성 검사 및 fetch
    window.location.replace = "/home";
  };

  return (
    <main className="Intro" onClick={onClickHandler}>
      <div className="cover-img"></div>
      <div className="title">Project Note</div>
      <form method="GET">
        <input name="c_userid" placeholder="user@email.com" />
        <input name="c_pwd" placeholder="password" />
        <button type="submit" onClick="onClickHandler">
          로그인
        </button>
        <Link to="">회원가입</Link>
        <Link to="">비밀번호 찾기</Link>
      </form>
    </main>
  );
};

export default Intro;
