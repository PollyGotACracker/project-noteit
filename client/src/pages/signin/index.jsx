import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userTokenFlagState, userState } from "@recoils/user";
import useUserFetcher from "@services/useUserFetcher";
import checkValidation from "@utils/checkValidation";
import { URLS } from "@/router";

const SignInPage = () => {
  const { userSignIn } = useUserFetcher();
  const location = useLocation();
  const [userData, setUserData] = useRecoilState(userState);
  const setTokenFlag = useSetRecoilState(userTokenFlagState);
  const { mutate } = useMutation(
    userSignIn({
      onSuccess: (data, variables) => {
        setUserData({ ...userData, u_userid: variables.email });
        setTokenFlag(true);
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
    const isValid = checkValidation(e.target);
    if (isValid) {
      const { email, password } = e.target;
      mutate({ email: email.value, password: password.value });
    }
  };

  return (
    <main className="Signin">
      <section className="container">
        <form className="form-column" onSubmit={submitSignInForm}>
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
          <button className="submit" type="submit">
            로그인
          </button>
        </form>
        <NavLink className="reset-password" to={URLS.RESET_PASSWORD}>
          비밀번호를 잊으셨나요?
        </NavLink>
      </section>
    </main>
  );
};

export default SignInPage;
