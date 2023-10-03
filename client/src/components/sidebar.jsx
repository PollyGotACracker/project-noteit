import "@styles/components/sidebar.css";
import { forwardRef } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import useUserSignOut from "@hooks/useUserSignout";
import Clock from "@components/sidebar/clock";
import UserProfile from "@components/sidebar/userProfile";
import AudioPlayer from "@components/sidebar/audioPlayer";
import SearchForm from "@components/sidebar/searchForm";
import ThemeToggle from "@components/sidebar/themeToggle";
import SignInNav from "@components/signInNav";

// forwardRef: 부모 comp 에서 useRef 를 받아 내부 요소에 사용
// 반드시 props 와 ref 를 인수로 받음
const Sidebar = forwardRef((props, ref) => {
  const { signOut } = useUserSignOut();

  return (
    <aside className="sidebar" ref={ref}>
      <Clock />
      <AudioPlayer />
      <SearchForm />
      <ThemeToggle />
      <UserProfile />
      <SignInNav />
      <button type="button" className="link signout" onClick={signOut}>
        <RiLogoutBoxLine />
        로그아웃
      </button>
    </aside>
  );
});

export default Sidebar;
