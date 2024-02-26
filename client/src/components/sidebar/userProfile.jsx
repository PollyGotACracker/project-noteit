import style from "@styles/components/userProfile.module.css";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { GiStarsStack } from "react-icons/gi";
import profile from "@assets/images/profile.png";
import { UPLOAD_URL, URLS } from "@/router";
import { userState } from "@recoils/user";
import UserAvatar from "@components/userAvatar";

const UserProfile = () => {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <section className={style.user_profile}>
      <button
        className={style.image_button}
        onClick={() => navigate(URLS.SETTINGS)}
      >
        <UserAvatar
          src={
            userData?.u_profileimg
              ? `${UPLOAD_URL}/${userData?.u_profileimg}`
              : profile
          }
        />
      </button>
      <div className={style.nickname}>{userData?.u_nickname}</div>
      <div className={style.score} title="점수">
        <GiStarsStack /> {userData?.u_score}
      </div>
    </section>
  );
};

export default UserProfile;
