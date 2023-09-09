import { useLayoutEffect, useRef } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { MdLogin } from "react-icons/md";

const SignOutGnb = () => {
  const nav = useNavigate();
  const IntroRef = useRef(null);

  useLayoutEffect(() => {
    const COUNT = 100;
    let i = 0;
    while (i < COUNT) {
      const star = document.createElement("DIV");
      star.className = "star";
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 5;
      /**
       * cf)
       * DOM style Object
       * Object.assign 을 이용하여 대상 객체의 동일 키를 갖는 속성에 값을 덮어쓸 수 있다.
       * Object.assign(target, ...sources)
       * */
      Object.assign(star.style, {
        width: size + "px",
        height: size + "px",
        top: y + "px",
        left: x + "px",
        animationDuration: duration + 5 + "s",
        animationDelay: duration + "s",
      });
      IntroRef.current.appendChild(star);
      i++;
    }
  }, []);

  const onClickHandler = () => {
    // 유효성 검사 및 fetch
    // 아래는 임시 코드
    nav(`/dashboard`, { replace: true });
  };

  return (
    <main className="Intro" ref={IntroRef}>
      <div className="link-box">
        <NavLink to={"/password/find"}>비밀번호 찾기</NavLink>
        <NavLink to={"/signup"}>회원가입</NavLink>
        <button type="button" onClick={onClickHandler}>
          로그인
          <MdLogin />
        </button>
      </div>
      <Outlet />
    </main>
  );
};

export default SignOutGnb;
