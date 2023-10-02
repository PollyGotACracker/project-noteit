import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSignedInState, queryEnabledState, userState } from "@recoils/user";
import { getUserInfo } from "@services/user.service";
import { URLS } from "@/router";

const SignInPage = () => {
  const location = useLocation();
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
  const email = location?.state?.email;

  const loginHandler = (e) => {
    e.preventDefault();
    // 유효성 검사 및 fetch 추가할 것
    setQueryEnabled(true);
  };

  return (
    <main className="Signin">
      <form className="form-signin" onSubmit={loginHandler}>
        <div className="greeting-msg">안녕하세요!</div>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={email || ""}
            placeholder="user@email.com"
            autoComplete="on"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="········"
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
