import "@styles/sidebar.css";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import Clock from "@components/sidebar/clock";
import UserProfile from "@components/sidebar/userProfile";
import AudioPlayer from "@components/sidebar/audioPlayer";
import SearchInput from "@components/sidebar/searchInput";
import ThemeToggle from "@components/sidebar/themeToggle";

// forwardRef: 부모 comp 에서 useRef 를 받아 내부 요소에 사용
// 반드시 props 와 ref 를 인수로 받음
const Sidebar = forwardRef((props, ref) => {
  const { sidebar, blocker } = ref;

  return (
    <aside className="Sidebar" ref={sidebar}>
      <Clock />
      <UserProfile />
      <AudioPlayer />
      {/* useRef 전달 */}
      <SearchInput ref={{ sidebar: sidebar, blocker: blocker }} />
      <ThemeToggle />
      <section className="logout">
        <RiLogoutBoxLine />
        <Link to={"/logout"}>로그아웃</Link>
      </section>
    </aside>
  );
});

export default Sidebar;
