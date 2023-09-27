import "@styles/signup/signUp.css";
import { ReactComponent as JoinSvg } from "@assets/images/join.svg";
import { getStyle } from "@utils/manageStyle";

const SignUpPage = () => {
  return (
    <main className="Signup">
      <form className="form-signup">
        <div className="greeting-msg">반갑습니다!</div>
        <input
          id="u_userid"
          name="u_userid"
          type="text"
          placeholder="이메일"
          autoComplete="true"
        />
        <input
          id="u_pwd"
          name="u_pwd"
          type="password"
          placeholder="비밀번호"
          autoComplete="false"
        />
        <input
          id="u_repwd"
          name="u_repwd"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <button type="submit">회원가입</button>
      </form>
      <JoinSvg className="img-signup" fill={getStyle("--accentalpha")} />
    </main>
  );
};

export default SignUpPage;
