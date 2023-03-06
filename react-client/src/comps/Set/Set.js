import "../../css/Set/Set.css";
import { useRef, useState, useCallback } from "react";
import { useUserContext } from "../../context/UserContext";

const Set = () => {
  const { userData } = useUserContext();
  const [profileData, setProfileData] = useState({
    src: userData.profileImg,
    // name: userData.profileStr,
    str: userData.profileStr,
  });
  const imgRef = useRef(null);

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

  const onClickSubmitProfile = async () => {
    const formData = new FormData();
    formData.append("upload", imgRef.current.files[0]);
    formData.append("str", profileData.str);
    const fetchOption = {
      method: "POST",
      body: formData,
    };
    await fetch(`/set/${userData.userid}/profile`, fetchOption);
  };

  return (
    <article className="Set">
      <section className="setting-box">
        <div className="wrapper">
          <div className="title">프로필 설정</div>
          <section className="attach-box">
            <label htmlFor="upload">첨부</label>
            <div className="upload-wrap">
              <img
                className="upload"
                src={profileData?.src}
                alt={profileData?.name}
              />
            </div>
            <input
              type="file"
              id="upload"
              name="upload"
              accept="image/*"
              // multiple
              ref={imgRef}
              onChange={(e) => onChangeImgHandler(e)}
            />
            <input
              value={profileData.str}
              placeholder="프로필 문구"
              onChange={(e) => onChangeStrHandler(e)}
            />
            <button type="button" onClick={onClickSubmitProfile}>
              등록
            </button>
          </section>
        </div>
        <div className="wrapper">
          <div className="title">PUSH 알림</div>
          <label htmlFor="push"></label>
          <input type="checkbox" id="push" value="1" name="push" />
        </div>
        <div className="wrapper">
          <div className="title">테마</div>
          <div className="theme-box">
            <label htmlFor="light">light</label>
            <input type="radio" id="light" value="light" name="theme" />
            <label htmlFor="dark">dark</label>
            <input type="radio" id="dark" value="dark" name="theme" />
          </div>
        </div>
        <div className="wrapper">
          <div className="title">데이터 삭제</div>
          <button>노트 삭제</button> <button>목표 삭제</button>
        </div>
        <div className="wrapper">
          <div className="title">계정 삭제</div>
          <input
            type="password"
            placeholder="비밀번호 입력"
            onPaste={(e) => {
              e.preventDefault();
            }}
          />
          <button>삭제</button>
        </div>
      </section>
    </article>
  );
};

export default Set;
