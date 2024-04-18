import style from "./profileEdit.module.css";
import { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { FaUserEdit } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import profile from "@assets/images/profile.png";
import { UPLOAD_URL } from "@/router";
import useUserFetcher from "@services/useUserFetcher";
import { userInfoFlagState, userState } from "@recoils/user";
import SettingBox from "./SettingBox";
import UserAvatar from "@components/user/UserAvatar";
import useToasts from "@hooks/useToasts";

export default function ProfileEdit() {
  const { showToast } = useToasts();
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
          showToast(data.message);
          setUserInfoFlag(true);
        },
      },
    })
  );

  const onChangeImage = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    const name = e.target.files[0].name;
    setProfileData({
      ...profileData,
      src,
      name,
    });
  };

  const onChangeText = (e) => {
    setProfileData({ ...profileData, str: e.target.value });
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("upload", imgInput.current.files[0]);
    formData.append("str", profileData.str);
    mutate({ data: formData });
  };

  return (
    <SettingBox icon={<FaUserEdit />} title={"나의 프로필"} isColumn={true}>
      <div className={style.upload_image_wrapper}>
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
      <p className={style.nickname}>{userData?.u_nickname}</p>
      <p className="text">{userData?.u_profilestr}</p>
      <p className={style.score} title="점수">
        <GiStarsStack /> <span>{userData?.u_score}</span>
      </p>
      <div className={style.input_wrapper}>
        <input
          type="file"
          id={style.input_image}
          name="upload"
          accept="image/*"
          // multiple
          ref={imgInput}
          onChange={onChangeImage}
        />
        <label className={style.upload_image} htmlFor={style.input_image}>
          업로드
        </label>
      </div>
      <div className={style.input_wrapper}>
        <input
          id={style.input_text}
          value={profileData?.str}
          placeholder="프로필 문구"
          onChange={onChangeText}
        />
      </div>
      <button className="submit" type="button" onClick={onSubmit}>
        등록
      </button>
    </SettingBox>
  );
}
