import { Link } from "react-router-dom";
import { RiMarkPenLine } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { URLS } from "@/router";
import { ReactComponent as NoThumbSvg } from "@assets/images/no_thumb.svg";
import { getStyle } from "@utils/manageStyle";
import NoStat from "@components/dashboard/noStat";

const DashBoardArticle = ({ data, error }) => {
  return (
    <div className="article">
      <div className="title">
        <RiMarkPenLine />
        랜덤 주제
      </div>
      {error ? (
        <NoStat msg={error} />
      ) : (
        <>
          <div className="thumb">
            {data?.s_thumb ? (
              <img
                alt="article-thumb"
                src={data?.s_thumb ? `${URLS.UPLOADS}/${data?.s_thumb}` : ""}
              />
            ) : (
              <NoThumbSvg
                className="no-thumb-img"
                stroke={getStyle("--primary")}
              />
            )}
          </div>
          <div className="content">
            <span className="subject">{data?.s_subject}</span>
            <span className="keycount">
              <FaTags />
              {data?.s_keycount}
            </span>
            <Link to={`${URLS.NOTE_DETAIL}/${data?.s_catid}/${data?.s_subid}`}>
              노트 보기
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoardArticle;
