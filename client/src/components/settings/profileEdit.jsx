import "@styles/settings/profileEdit.css";
import { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { FaUserEdit } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import profile from "@assets/images/profile.png";
import { UPLOAD_URL } from "@/router";
import useUserFetcher from "@services/useUserFetcher";
import { userInfoFlagState, userState } from "@recoils/user";
import SettingBox from "@components/settings/wrapper";
import UserAvatar from "@components/userAvatar";

const ProfileEdit = () => {
  const { setUserInfo } = useUserFetcher();
  const userData = useRecoilValue(userState);
  const setUserInfoFlag = useSetRecoilState(userInfoFlagState);
  const [profileData, setProfileData] = useState({
    src: "",
    name: "",
    str: userData.u_profilestr || "",
  });
  const imgInput = useRef(null);
  const { mutate } = useMutation(
    setUserInfo({
      id: userData.u_userid,
      queries: {
        onSuccess: (data) => {
          alert(data.message);
          setUserInfoFlag(true);
        },
      },
    })
  );

  const onChangeStrHandler = (e) => {
    setProfileData({ ...profileData, str: e.target.value });
  };
  const onChangeImgHandler = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    const name = e.target.files[0].name;
    setProfileData({
      ...profileData,
      src,
      name,
    });
  };

  const onClickSubmitProfile = () => {
    const formData = new FormData();
    formData.append("upload", imgInput.current.files[0]);
    formData.append("str", profileData.str);
    mutate({ data: formData });
  };

  return (
    <SettingBox
      icon={<FaUserEdit />}
      title={"나의 프로필"}
      className={"profile-edit"}
    >
      <div className="upload-img-wrapper">
        <UserAvatar
          src={
            profileData.src
              ? profileData.src
              : userData.u_profileimg
              ? `${UPLOAD_URL}/${userData.u_profileimg}`
              : profile
          }
        />
      </div>
      <div className="nickname">{userData?.u_nickname}</div>
      <div className="profile-str">{userData?.u_profilestr}</div>
      <div title="점수" className="score">
        <GiStarsStack /> {userData?.u_score}
      </div>
      <div className="profile-edit-wrapper">
        <input
          type="file"
          id="img-input"
          name="upload"
          accept="image/*"
          // multiple
          ref={imgInput}
          onChange={onChangeImgHandler}
        />
        <label htmlFor="img-input">업로드</label>
      </div>
      <div className="profile-edit-wrapper">
        <input
          id="str-input"
          value={profileData?.str}
          placeholder="프로필 문구"
          onChange={onChangeStrHandler}
        />
      </div>
      <button
        className="profile-update-btn"
        type="button"
        onClick={onClickSubmitProfile}
      >
        등록
      </button>
    </SettingBox>
  );
};

export default ProfileEdit;
