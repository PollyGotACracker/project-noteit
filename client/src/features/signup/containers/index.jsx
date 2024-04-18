import style from "./page.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import checkValidation from "@utils/checkValidation";
import accountMessage from "@constants/accountMessage";
import useSignUpFetcher from "../services/useSignUpFetcher";
import useTimer from "@hooks/useTimer";
import { URLS } from "@/router";
import useToasts from "@hooks/useToasts";

export default function SignUp() {
  const { showToast } = useToasts();
  const { sendAuthCode, verifyAuthCode, userSignUp } = useSignUpFetcher();
  const { timer, startTimer, clearTimer } = useTimer(5 * 60);
  const [sendCodeLabel, setSendCodeLabel] = useState("인증번호 전송");
  const [authStatus, setAuthStatus] = useState("");
  const emailRef = useRef(null);
  const isVerified = useRef(false);
  const navigate = useNavigate();
  const { isSuccess: isCodeSent, mutate: mutateSendAuthCode } = useMutation(
    sendAuthCode({
      queries: {
        onMutate: () => {
          clearTimer();
          setSendCodeLabel("전송 중...");
        },
        onSuccess: () => {
          startTimer();
          setSendCodeLabel("인증번호 재전송");
        },
        onError: () => setSendCodeLabel("인증번호 전송"),
      },
    })
  );
  const { isSuccess: isVerifiedUser, mutate: mutateVerifyAuthCode } =
    useMutation(
      verifyAuthCode({
        queries: {
          onSuccess: (data) => {
            clearTimer();
            isVerified.current = true;
            showToast(data.message);
            setAuthStatus(data.message);
          },
        },
      })
    );
  const { mutate: mutateSubmitSignUp } = useMutation(
    userSignUp({
      queries: {
        onSuccess: (data, variables) => {
          showToast(data.message);
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
    try {
      checkValidation(e.target);
      mutateSendAuthCode({ email: e.target.email.value });
    } catch (err) {
      showToast(err.message);
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (isVerified.current) return;
    try {
      checkValidation(e.target);
      mutateVerifyAuthCode({ code: e.target.code.value });
    } catch (err) {
      showToast(err.message);
    }
  };

  const submitSignUpForm = (e) => {
    e.preventDefault();
    const { nickname, password, repassword } = e.target;
    if (password.value !== repassword.value) {
      showToast(accountMessage.WRONG_REPASSWORD);
      repassword.focus();
      return;
    }
    const inputs = [emailRef.current, nickname, password, repassword];

    try {
      checkValidation(inputs);
    } catch (err) {
      showToast(err.message);
    }
    if (!isVerified.current) {
      showToast("이메일 인증이 필요합니다.");
      return;
    }

    mutateSubmitSignUp({
      email: emailRef.current.value,
      nickname: nickname.value,
      password: password.value,
    });
  };

  return (
    <main className={style.account}>
      <section className={style.container}>
        <form className={style.column} onSubmit={sendEmail}>
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
            className={style.action}
            type="submit"
            disabled={isVerified.current}
          >
            {sendCodeLabel}
          </button>
        </form>
        <form className={style.row} onSubmit={verifyCode}>
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
            className={style.action}
            type="submit"
            disabled={isVerified.current}
          >
            확인
          </button>
          <div className={style.status}>
            {timer === "00:00"
              ? "인증 시간이 만료되었습니다."
              : !isVerifiedUser && isCodeSent
              ? timer
              : authStatus}
          </div>
        </form>
        <form className={style.column} onSubmit={submitSignUpForm}>
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
          <button className={style.submit} type="submit">
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
}
