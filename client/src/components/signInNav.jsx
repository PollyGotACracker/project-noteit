import "@styles/components/signInNav.css";
import { NavLink } from "react-router-dom";
import {
  RiHome4Fill,
  RiQuestionnaireFill,
  RiLogoutBoxLine,
  RiSettings5Fill,
} from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { TbListCheck } from "react-icons/tb";
import useUserSignOut from "@hooks/useUserSignout";
import { URLS } from "@/router";

const signInNav = () => {
  const { signOut } = useUserSignOut();

  return (
    <nav className="nav-signin">
      <NavLink className="link home" to={URLS.DASHBOARD}>
        <RiHome4Fill />
        대시보드
      </NavLink>
      <NavLink className="link todo" to={URLS.TODO}>
        <div>
          <TbListCheck />
        </div>
        목표
      </NavLink>
      <NavLink className="link note" to={URLS.NOTE}>
        <BsFillJournalBookmarkFill />
        노트
      </NavLink>
      <NavLink className="link quiz" to={URLS.QUIZ}>
        <RiQuestionnaireFill />
        퀴즈
      </NavLink>
      <NavLink className="link settings" to={URLS.SETTINGS}>
        <RiSettings5Fill />
        설정
      </NavLink>
      <button type="button" className="link signout" onClick={signOut}>
        <RiLogoutBoxLine />
        로그아웃
      </button>
    </nav>
  );
};

export default signInNav;
