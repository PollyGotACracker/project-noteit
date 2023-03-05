import "../../css/Set/Set.css";
import { useState, useCallback } from "react";

const Set = () => {
  const [fileList, setFileList] = useState([]);
  const OnChangeAttHandler = useCallback(
    (e) => {
      const fileData = Array.from(e.target.files);
      console.log(fileData);
      const uploadFiles = fileData.map((file) => {
        const item = {
          url: URL.createObjectURL(file),
          a_original_name: file.name,
          a_ext: file.type,
        };
        return item;
      });
      console.log(uploadFiles);
      setFileList([...uploadFiles]);
    },
    [fileList]
  );

  return (
    <article className="Setting">
      <section className="setting-box">
        <div className="wrapper">
          <div className="title">프로필 설정</div>
          <section className="attach-box">
            <label htmlFor="attach">첨부</label>
            <input
              type="file"
              id="attach"
              name="attach"
              accept="image/*"
              multiple
              onChange={OnChangeAttHandler}
            />
            <input placeholder="프로필 문구" />
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
          <div className="title">회원탈퇴</div>
        </div>
      </section>
    </article>
  );
};

export default Set;
