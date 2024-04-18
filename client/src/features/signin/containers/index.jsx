import style from "./page.module.css";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userTokenFlagState, userState } from "@recoils/user";
import useSignInFetcher from "../services/useSignInFetcher";
import checkValidation from "@utils/checkValidation";
import { URLS } from "@/router";
import useToasts from "@hooks/useToasts";

export default function SignIn() {
  const { showToast } = useToasts();
  const { userSignIn } = useSignInFetcher();
  const location = useLocation();
  const [userData, setUserData] = useRecoilState(userState);
  const setTokenFlag = useSetRecoilState(userTokenFlagState);
  const { mutate } = useMutation(
    userSignIn({
      queries: {
        onSuccess: (data, variables) => {
          setUserData({ ...userData, u_userid: variables.email });
          setTokenFlag(true);
        },
      },
    })
  );

  useEffect(() => {
    if (location?.state?.email) {
      setUserData({ ...userData, u_userid: location?.state?.email });
    }
  }, [location?.state?.email]);

  const submitSignInForm = (e) => {
    e.preventDefault();
    try {
      checkValidation(e.target);
      const { email, password } = e.target;
      mutate({ email: email.value, password: password.value });
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <main className={style.account}>
      <section className={style.container}>
        <form className={style.column} onSubmit={submitSignInForm}>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={location?.state?.email || userData.u_userid || ""}
              placeholder="이메일"
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
              minLength={8}
            />
          </label>
          <button className={style.submit} type="submit">
            로그인
          </button>
        </form>
        <div className={style.link_wrapper}>
          <NavLink className={style.linkl_signup} to={URLS.SIGN_UP}>
            회원가입
          </NavLink>
          <NavLink
            className={style.link_reset_password}
            to={URLS.RESET_PASSWORD}
          >
            비밀번호를 잊으셨나요?
          </NavLink>
        </div>
      </section>
    </main>
  );
}
