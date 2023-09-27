import "@styles/signin/signIn.css";
import { URLS } from "@/router";
import { NavLink, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    // 유효성 검사 및 fetch
    // 아래는 임시 코드
    navigate(URLS.DASHBOARD, { replace: true });
  };

  return (
    <main className="Signin">
      <form className="form-signin" onSubmit={loginHandler}>
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
        <NavLink to={URLS.FIND_PASSWORD}>비밀번호 찾기</NavLink>
        <button type="submit">로그인</button>
      </form>
    </main>
  );
};

export default SignInPage;
