import "@styles/components/userProfile.css";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { GiStarsStack } from "react-icons/gi";
import profile from "@assets/images/profile.png";
import { URLS } from "@/router";
import { userState } from "@recoils/user";
import UserAvatar from "@components/userAvatar";

const UserProfile = () => {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <section className="profile-box">
      <button className="profile-img" onClick={() => navigate(URLS.SETTINGS)}>
        <UserAvatar
          src={
            userData?.u_profileimg
              ? `${URLS.UPLOADS}/${userData?.u_profileimg}`
              : profile
          }
        />
      </button>
      <div className="nickname">{userData?.u_nickname}</div>
      <div title="점수" className="score">
        <GiStarsStack /> {userData?.u_score}
      </div>
    </section>
  );
};

export default UserProfile;
