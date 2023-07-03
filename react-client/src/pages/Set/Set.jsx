import "../../styles/Set/Set.css";
import { useRef, useState } from "react";
import profile from "../../assets/images/profile.png";
import { getUserData } from "../../service/user.service";
import { useUserContext } from "../../contexts/UserContext";
import { FaUserEdit, FaBell, FaDatabase, FaUserTimes } from "react-icons/fa";

const Set = () => {
  const { userData, setUserData, profileData, setProfileData } =
    useUserContext();
  const [imagePrev, setImagePrev] = useState({ width: "", height: "" });
  const imgPreview = useRef(null);
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

  const onClickSubmitProfile = async () => {
    const formData = new FormData();
    formData.append("upload", imgInput.current.files[0]);
    formData.append("str", profileData.str);
    const fetchOption = {
      method: "POST",
      body: formData,
    };
    await fetch(`/set/${userData.u_userid}/profile`, fetchOption);
    const result = await getUserData();
    setUserData({
      ...userData,
      ...result,
    });
  };

  return (
    <article className="Set">
      <section className="setting-box">
        <div className="title">
          <FaUserEdit />
          프로필 설정
        </div>
        <div className="upload-img-wrap">
          <img
            className="upload"
            src={
              profileData.src !== ""
                ? profileData.src
                : userData.u_profileimg !== ""
                ? `http://localhost:3000/uploads/${userData.u_profileimg}`
                : profile
            }
            alt={profileData?.name}
            ref={imgPreview}
            onLoad={() => {
              setImagePrev({
                ...imagePrev,
                width: imgPreview.current?.naturalWidth,
                height: imgPreview.current?.naturalHeight,
              });
            }}
            style={{
              transform:
                imagePrev.width < imagePrev.height
                  ? `scale(${(imagePrev.height / imagePrev.width) * 1.1})`
                  : "",
            }}
          />
        </div>
        <div className="profile-box">
          <input
            type="file"
            id="img-input"
            name="upload"
            accept="image/*"
            // multiple
            ref={imgInput}
            onChange={(e) => onChangeImgHandler(e)}
          />
          <label htmlFor="img-input">업로드</label>
        </div>
        <div className="profile-box">
          <input
            id="str-input"
            value={profileData?.str}
            placeholder="프로필 문구"
            onChange={(e) => onChangeStrHandler(e)}
          />
        </div>
        <button
          id="profile-update-btn"
          type="button"
          onClick={onClickSubmitProfile}
        >
          등록
        </button>
      </section>
      <section className="setting-box">
        <div className="title">
          <FaBell />
          PUSH 알림
        </div>
        <label htmlFor="push">
          <FaBell />
        </label>
        <input type="checkbox" id="push" value="1" name="push" />
      </section>

      <section className="setting-box">
        <div className="title">
          <FaDatabase />
          데이터 삭제
        </div>
        <div className="data-box">
          <button>노트 삭제</button>
          <button>목표 삭제</button>
          <button>점수 삭제</button>
        </div>
      </section>
      <section className="setting-box">
        <div className="title">
          <FaUserTimes />
          계정 삭제
        </div>
        <div className="account-box">
          <form>
            <input
              type="password"
              autoComplete="false"
              placeholder="비밀번호 입력"
              onPaste={(e) => {
                e.preventDefault();
              }}
            />
            <button type="button">삭제</button>
          </form>
        </div>
      </section>
    </article>
  );
};

export default Set;
