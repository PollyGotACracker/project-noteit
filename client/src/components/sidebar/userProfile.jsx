import { GiStarsStack } from "react-icons/gi";
import profile from "@assets/images/profile.png";
import { URLS } from "@/router";
import { useUserContext } from "@contexts/userContext";
import UserAvatar from "@components/userAvatar";

const UserProfile = () => {
  const { userData } = useUserContext();

  return (
    <section className="profile">
      <div className="profile-img">
        <UserAvatar
          src={
            userData?.u_profileimg
              ? `${URLS.UPLOADS}/${userData?.u_profileimg}`
              : profile
          }
        />
      </div>
      <div className="nickname">{userData?.u_nickname}</div>
      <div className="profile-str">
        <span>{userData?.u_profilestr}</span>
      </div>
      <div title="점수" className="score">
        <GiStarsStack /> {userData?.u_score}
      </div>
    </section>
  );
};

export default UserProfile;
