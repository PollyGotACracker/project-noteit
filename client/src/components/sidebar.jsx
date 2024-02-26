import "@styles/components/sidebar.css";
import { useRecoilState } from "recoil";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { sidebarSelector } from "@recoils/global";
import useUserSignOut from "@hooks/useUserSignout";
import Clock from "@components/sidebar/clock";
import UserProfile from "@components/sidebar/userProfile";
import AudioPlayer from "@components/sidebar/audioPlayer";
import Search from "@components/sidebar/search";
import Theme from "@components/sidebar/theme";
import SignInNav from "@components/signInNav";

const Sidebar = () => {
  const [sidebarClass, toggleSidebar] = useRecoilState(sidebarSelector);
  const { signOut } = useUserSignOut();

  return (
    <aside className={`sidebar${sidebarClass}`}>
      <section className="close-box">
        <button type="button" className="close-btn" onClick={toggleSidebar}>
          <RxCross2 />
        </button>
      </section>
      <Clock />
      <AudioPlayer />
      <Search />
      <Theme />
      <UserProfile />
      <SignInNav />
      <button type="button" className="link signout" onClick={signOut}>
        <RiLogoutBoxLine />
        로그아웃
      </button>
    </aside>
  );
};

export default Sidebar;
