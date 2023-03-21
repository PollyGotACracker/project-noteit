import { useNavigate, Outlet } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Intro = () => {
  const nav = useNavigate();

  const onClickHandler = () => {
    // 유효성 검사 및 fetch
    // 아래는 임시 코드
    nav(`/home`, { replace: true });
  };

  return (
    <main className="Intro">
      <div className="link-box">
        <NavLink to={"/password/find"}>비밀번호 찾기</NavLink>
        <NavLink to={"/join"}>회원가입</NavLink>
        <button type="button" onClick={onClickHandler}>
          로그인
          <MdLogin />
        </button>
      </div>
      <Outlet />
    </main>
  );
};

export default Intro;
