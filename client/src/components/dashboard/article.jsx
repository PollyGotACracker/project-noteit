import { Link } from "react-router-dom";
import { RiMarkPenLine } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { ReactComponent as NoThumbSvg } from "@assets/images/no_thumb.svg";

const DashBoardArticle = ({ data }) => {
  return (
    <div className="study">
      <div className="title">
        <RiMarkPenLine />
        랜덤 주제
      </div>
      <div className="thumb">
        {data?.s_thumb ? (
          <img
            alt="study-thumb"
            src={data?.s_thumb ? `/server/uploads/${data?.s_thumb}` : ""}
          />
        ) : (
          <NoThumbSvg
            className="no-thumb-img"
            stroke={getComputedStyle(document.documentElement).getPropertyValue(
              "--primary"
            )}
          />
        )}
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

export default DashBoardArticle;
