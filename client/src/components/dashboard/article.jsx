import "@styles/dashboard/article.css";
import { Link } from "react-router-dom";
import { RiMarkPenLine } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { URLS } from "@/router";
import { ReactComponent as NoThumbSvg } from "@assets/images/no_thumb.svg";
import useThemeStyle from "@hooks/useThemeStyle";
import NoContent from "@components/noContent";

const DashBoardArticle = ({ article, error }) => {
  const primary = useThemeStyle("--primary");

  const thumbImage = (
    <div className="thumb">
      {article?.s_thumb ? (
        <img
          alt="article-thumb"
          src={article?.s_thumb ? `${URLS.UPLOADS}/${article?.s_thumb}` : ""}
        />
      ) : (
        <NoThumbSvg className="no-thumb-img" stroke={primary} />
      )}
    </div>
  );

  const content = (
    <div className="content">
      <span className="subject">{article?.s_subject}</span>
      <span className="keycount">
        <FaTags />
        {article?.s_keycount}
      </span>
      <Link to={`${URLS.NOTE_DETAIL}/${article?.s_catid}/${article?.s_subid}`}>
        노트 보기
      </Link>
    </div>
  );

  return (
    <div className="article">
      <div className="title">
        <RiMarkPenLine />
        랜덤 주제
      </div>
      {error ? (
        <NoContent msg={error} />
      ) : !article?.s_subid ? (
        <NoContent msg={"북마크된 주제가 없습니다."} />
      ) : (
        <>
          {thumbImage}
          {content}
        </>
      )}
    </div>
  );
};

export default DashBoardArticle;
