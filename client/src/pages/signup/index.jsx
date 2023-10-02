import "@styles/signup/signUp.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ReactComponent as JoinSvg } from "@assets/images/join.svg";
import { getStyle } from "@utils/manageStyle";
import userMsg from "@data/userMsg";
import { userSignUp } from "@services/user.service";
import { URLS } from "@/router";

const SignUpPage = () => {
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

  const checkValidation = (target) => {
    const { email, nickname, password, repassword } = target;
    const removeSpace = (value) => value.replaceAll(" ", "");

    for (let input of [email, nickname, password, repassword]) {
      const value = removeSpace(input.value);
      if (!value) {
        alert(`${input.placeholder} 란을 입력해주세요.`);
        input.focus();
        return false;
      }
    }
    if (removeSpace(password.value).length < 8) {
      alert(userMsg.SHORT_PASSWORD);
      password.focus();
      return false;
    }
    if (password.value !== repassword.value) {
      alert(userMsg.WRONG_REPASSWORD);
      repassword.focus();
      return false;
    }
    return true;
  };

  const submitSignUpForm = (e) => {
    e.preventDefault();
    const isValid = checkValidation(e.target);
    if (isValid) {
      const { email, nickname, password } = e.target;
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
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
          />
        </label>
        <label htmlFor="repassword">
          <input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="off"
          />
        </label>
        <button type="submit">회원가입</button>
      </form>
      <JoinSvg className="img-signup" fill={getStyle("--accentalpha")} />
    </main>
  );
};

export default SignUpPage;
