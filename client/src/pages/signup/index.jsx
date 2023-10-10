import "@styles/signup/signUp.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ReactComponent as JoinSvg } from "@assets/images/join.svg";
import { getStyle } from "@utils/manageStyle";
import checkValidation from "@utils/checkValidation";
import userMsg from "@data/userMsg";
import useUserFetcher from "@services/useUserFetcher";
import { URLS } from "@/router";

const SignUpPage = () => {
  const { userSignUp } = useUserFetcher();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    userSignUp({
      onSuccess: (data, variables) => {
        alert(data.message);
        navigate(URLS.SIGN_IN, {
          state: { email: variables.email },
          replace: true,
        });
      },
    })
  );

  const submitSignUpForm = (e) => {
    e.preventDefault();
    const { email, nickname, password, repassword } = e.target;
    if (password.value !== repassword.value) {
      alert(userMsg.WRONG_REPASSWORD);
      repassword.focus();
      return false;
    }
    const isValid = checkValidation(e.target);
    if (isValid) {
      mutate({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      });
    }
  };

  return (
    <main className="Signup">
      <form className="form-signup" onSubmit={submitSignUpForm}>
        <div className="greeting-msg">반갑습니다!</div>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일"
            autoComplete="on"
            spellCheck="false"
          />
        </label>
        <label htmlFor="nickname">
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            autoComplete="on"
            spellCheck="false"
            maxLength={12}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
            minLength={8}
          />
        </label>
        <label htmlFor="repassword">
          <input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="off"
            minLength={8}
          />
        </label>
        <button type="submit">회원가입</button>
      </form>
      <JoinSvg className="img-signup" fill={getStyle("--accentalpha")} />
    </main>
  );
};

export default SignUpPage;
