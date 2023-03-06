import "../css/Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  // title 에 span tag 추가 후 각각 css animation 설정
  const TitleContent = () => {
    const titleChar = "NoteIT";
    let string = Array.from(titleChar);

    let content = string.map((char, index) => {
      // 1 은 cover-img 의 animation duration
      const duration = 0.3;
      const delay = 1 + duration * Number(index);
      return (
        <span
          className="char"
          key={index}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {char === " " ? "\u2002" : char}
        </span>
      );
    });
    return content;
  };

  const onClickHandler = () => {
    // 유효성 검사 및 fetch
    // 아래는 임시 코드
    nav(`/`, { replace: true });
  };

  return (
    <main className="Login">
      <div className="cover-img"></div>
      <div className="title">
        <TitleContent />
      </div>
      <form className="login">
        <input
          id="u_userid"
          name="u_userid"
          type="text"
          placeholder="user@email.com"
          autoComplete="true"
        />
        <input
          id="u_pwd"
          name="u_pwd"
          type="password"
          placeholder="password"
          autoComplete="false"
        />
        <div className="wrap-links">
          <Link to="">비밀번호 찾기</Link>
          <Link to="">회원가입</Link>
          <button type="button" onClick={onClickHandler}>
            로그인
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
