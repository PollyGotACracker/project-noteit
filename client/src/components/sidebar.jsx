import "@styles/components/sidebar.css";
import { useRecoilValue } from "recoil";
import { RiLogoutBoxLine } from "react-icons/ri";
import { sidebarSelector } from "@recoils/global";
import useUserSignOut from "@hooks/useUserSignout";
import Clock from "@components/sidebar/clock";
import UserProfile from "@components/sidebar/userProfile";
import AudioPlayer from "@components/sidebar/audioPlayer";
import SearchForm from "@components/sidebar/searchForm";
import ThemeToggle from "@components/sidebar/themeToggle";
import SignInNav from "@components/signInNav";

const Sidebar = () => {
  const sidebarClass = useRecoilValue(sidebarSelector);
  const { signOut } = useUserSignOut();

  return (
    <aside className={`sidebar${sidebarClass}`}>
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
};

export default Sidebar;
