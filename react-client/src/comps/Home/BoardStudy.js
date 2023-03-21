import { Link } from "react-router-dom";
import { RiMarkPenLine } from "react-icons/ri";
import { FaTags } from "react-icons/fa";

const BoardStudy = ({ data }) => {
  return (
    <div className="study">
      <div className="title">
        <RiMarkPenLine />
        자주 틀린 주제
      </div>
      <div className="thumb">
        {/* 이미지가 없거나 세로로 길 때? */}
        <img
          alt="study-thumb"
          src={
            data?.s_thumb
              ? `http://localhost:3000/uploads/${data?.s_thumb}`
              : ""
          }
        />
      </div>
      <div className="content">
        <span className="subject">{data?.s_subject}</span>
        <span className="keycount">
          <FaTags />
          {data?.s_keycount}
        </span>
        <Link to={`/note/subject/${data?.s_catid}/${data?.s_subid}`}>
          노트 보기
        </Link>
      </div>
    </div>
  );
};

export default BoardStudy;
