import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import checkValidation from "@utils/checkValidation";
import userMsg from "@data/userMsg";
import useUserFetcher from "@services/useUserFetcher";
import { URLS } from "@/router";

const SignUpPage = () => {
  const { sendAuthCode, verifyAuthCode, userSignUp } = useUserFetcher();
  const [sendCodeLabel, setSendCodeLabel] = useState("인증번호 전송");
  const [authStatus, setAuthStatus] = useState("");

  const emailRef = useRef(null);
  const isVerified = useRef(false);
  const navigate = useNavigate();
  const { mutate: mutateSendAuthCode } = useMutation(
    sendAuthCode({
      queries: {
        onMutate: () => setSendCodeLabel("전송 중..."),
        onSuccess: () => setSendCodeLabel("인증번호 재전송"),
        onError: () => setSendCodeLabel("인증번호 전송"),
      },
    })
  );
  const { mutate: mutateVerifyAuthCode } = useMutation(
    verifyAuthCode({
      queries: {
        onSuccess: (data) => {
          isVerified.current = true;
          alert(data.message);
          setAuthStatus(data.message);
        },
      },
    })
  );
  const { mutate: mutateSubmitSignUp } = useMutation(
    userSignUp({
      queries: {
        onSuccess: (data, variables) => {
          alert(data.message);
          navigate(URLS.SIGN_IN, {
            state: { email: variables.email },
            replace: true,
          });
        },
      },
    })
  );

  const sendEmail = (e) => {
    e.preventDefault();
    if (isVerified.current) return;
    const isValid = checkValidation(e.target);
    if (!isValid) return;
    mutateSendAuthCode({ email: e.target.email.value });
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (isVerified.current) return;
    const isValid = checkValidation(e.target);
    if (!isValid) return;
    mutateVerifyAuthCode({ code: e.target.code.value });
  };

  const submitSignUpForm = (e) => {
    e.preventDefault();
    const { nickname, password, repassword } = e.target;
    if (password.value !== repassword.value) {
      alert(userMsg.WRONG_REPASSWORD);
      repassword.focus();
      return;
    }
    const inputs = [emailRef.current, nickname, password, repassword];
    const isValid = checkValidation(inputs);
    if (!isValid) return;
    if (!isVerified.current) {
      alert("이메일 인증이 필요합니다.");
      return;
    }

    mutateSubmitSignUp({
      email: emailRef.current.value,
      nickname: nickname.value,
      password: password.value,
    });
  };

  return (
    <main className="out Signup">
      <section className="container">
        <form className="form-column" onSubmit={sendEmail}>
          <label htmlFor="email">
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              autoComplete="on"
              spellCheck="false"
              readOnly={isVerified.current}
            />
          </label>
          <button
            className="action-btn"
            type="submit"
            disabled={isVerified.current}
          >
            {sendCodeLabel}
          </button>
        </form>
        <form className="form-row" onSubmit={verifyCode}>
          <label htmlFor="code">
            <input
              id="code"
              name="code"
              type="text"
              maxLength={6}
              placeholder="인증번호"
              autoComplete="off"
              spellCheck="false"
              readOnly={isVerified.current}
            />
          </label>
          <button
            className="action-btn"
            type="submit"
            disabled={isVerified.current}
          >
            확인
          </button>
          <div className="status">{authStatus}</div>
        </form>
        <form className="form-column" onSubmit={submitSignUpForm}>
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
          <button className="submit" type="submit">
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
