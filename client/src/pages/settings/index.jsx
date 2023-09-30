import "@styles/settings/settings.css";
import { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { GiStarsStack } from "react-icons/gi";
import { FaUserEdit, FaBell, FaDatabase, FaUserTimes } from "react-icons/fa";
import profile from "@assets/images/profile.png";
import { URLS } from "@/router";
import { setUserInfo } from "@services/user.service";
import SettingBox from "@components/settings/wrapper";
import UserAvatar from "@components/userAvatar";
import { queryEnabledState, userState } from "@recoils/user";
import { QueryKeys, getClient } from "@services/core";

const SettingsPage = () => {
  const queryClient = getClient();
  const userData = useRecoilValue(userState);
  const setQueryEnabled = useSetRecoilState(queryEnabledState);
  const { mutate } = useMutation(
    setUserInfo({
      onSuccess: (data) => {
        alert(data.message);
        queryClient.invalidateQueries(QueryKeys.USER);
        setQueryEnabled(true);
      },
      onError: (error) => {
        alert(error.message);
      },
    })
  );

  const [profileData, setProfileData] = useState({
    src: "",
    name: "",
    str: userData.u_profilestr,
  });
  const imgInput = useRef(null);

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
    console.log(imgInput.current.files[0], profileData.str);
    mutate({ userId: userData.u_userid, data: formData });
  };

  return (
    <main className="Settings">
      <SettingBox icon={<FaUserEdit />} title={"나의 프로필"}>
        <div className="upload-img-wrap">
          <UserAvatar
            src={
              profileData.src
                ? profileData.src
                : userData.u_profileimg
                ? `${URLS.UPLOADS}/${userData.u_profileimg}`
                : profile
            }
          />
        </div>
        <div className="nickname">{userData?.u_nickname}</div>
        <div className="profile-str">{userData?.u_profilestr}</div>
        <div title="점수" className="score">
          <GiStarsStack /> {userData?.u_score}
        </div>
        <div className="profile-box">
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
        <div className="profile-box">
          <input
            id="str-input"
            value={profileData?.str}
            placeholder="프로필 문구"
            onChange={onChangeStrHandler}
          />
        </div>
        <button
          id="profile-update-btn"
          type="button"
          onClick={onClickSubmitProfile}
        >
          등록
        </button>
      </SettingBox>
      <SettingBox icon={<FaBell />} title={"PUSH 알림"}>
        <label htmlFor="push">
          <FaBell />
        </label>
        <input type="checkbox" id="push" value="1" name="push" />
      </SettingBox>
      <SettingBox icon={<FaDatabase />} title={"데이터 삭제"}>
        <div className="data-box">
          <button>노트 삭제</button>
          <button>목표 삭제</button>
          <button>점수 삭제</button>
        </div>
      </SettingBox>
      <SettingBox icon={<FaUserTimes />} title={"계정 삭제"}>
        <div className="account-box">
          <form>
            <input
              type="password"
              autoComplete="false"
              placeholder="비밀번호 입력"
              onPaste={(e) => e.preventDefault()}
            />
            <button type="button">삭제</button>
          </form>
        </div>
      </SettingBox>
    </main>
  );
};

export default SettingsPage;
