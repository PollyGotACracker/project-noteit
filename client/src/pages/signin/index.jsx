import "@styles/signin/signIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSignedInState, queryEnabledState, userState } from "@recoils/user";
import { getUserInfo } from "@services/user.service";
import { URLS } from "@/router";

const SignInPage = () => {
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const [queryEnabled, setQueryEnabled] = useRecoilState(queryEnabledState);
  useQuery(
    getUserInfo({
      enabled: queryEnabled,
      onSuccess: (data) => {
        setUserData({ ...data });
        setIsSignedIn(true);
        navigate(URLS.DASHBOARD, { replace: true });
      },
    })
  );

  const loginHandler = (e) => {
    e.preventDefault();
    // 유효성 검사 및 fetch 추가할 것
    setQueryEnabled(true);
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
