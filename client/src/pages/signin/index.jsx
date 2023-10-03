import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSignedInState, queryEnabledState, userState } from "@recoils/user";
import { userSignIn } from "@services/user.service";
import checkValidation from "@utils/checkValidation";
import { setToken } from "@utils/manageToken";
import { URLS } from "@/router";

const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const setQueryEnabled = useSetRecoilState(queryEnabledState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const { mutate } = useMutation(
    userSignIn({
      onSuccess: (data, variables) => {
        setUserData({ ...userData, u_userid: variables.email });
        setQueryEnabled(true);
        setToken(data.token);
        setIsSignedIn(true);
        navigate(URLS.DASHBOARD, { replace: true });
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
      <form className="form-signin" onSubmit={submitSignInForm}>
        <div className="greeting-msg">안녕하세요!</div>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={userData.u_userid || ""}
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
          />
        </label>
        <NavLink to={URLS.FIND_PASSWORD}>비밀번호 찾기</NavLink>
        <button type="submit">로그인</button>
      </form>
    </main>
  );
};

export default SignInPage;
