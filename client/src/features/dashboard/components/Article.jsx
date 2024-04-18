import style from "./article.module.css";
import { Link } from "react-router-dom";
import { RiMarkPenLine } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { UPLOAD_URL, URLS } from "@/router";
import { ReactComponent as NoThumbSvg } from "@assets/images/no_thumb.svg";
import useThemeStyle from "@hooks/useThemeStyle";
import NoContent from "@components/noContent/NoContent";

export default function Article({ article, error }) {
  const { s_catid, s_subid, s_subject, s_keycount, s_thumb } = article;

  return (
    <div className={style.article}>
      <div className={style.title}>
        <RiMarkPenLine />
        <span>랜덤 주제</span>
      </div>
      {error ? (
        <NoContent msg={error} />
      ) : !s_subid ? (
        <NoContent msg={"북마크된 주제가 없습니다."} />
      ) : (
        <>
          <Thumb thumbUrl={s_thumb} />
          <Content
            catId={s_catid}
            subId={s_subid}
            subject={s_subject}
            keycount={s_keycount}
          />
        </>
      )}
    </div>
  );
}

function Thumb({ thumbUrl }) {
  const primary = useThemeStyle("--primary");

  return (
    <div className={style.thumb_wrapper}>
      {thumbUrl ? (
        <img
          alt={style.thumb}
          src={thumbUrl ? `${UPLOAD_URL}/${thumbUrl}` : ""}
        />
      ) : (
        <NoThumbSvg className={style.thumb_default} stroke={primary} />
      )}
    </div>
  );
}

function Content({ catId, subId, subject, keycount }) {
  return (
    <div className={style.content}>
      <span className={style.subject}>{subject}</span>
      <span className={style.keycount}>
        <FaTags />
        <span>{keycount}</span>
      </span>
      <Link
        className={style.link_note}
        to={`${URLS.NOTE_SUBJECT}/${catId}/${subId}`}
      >
        노트 보기
      </Link>
    </div>
  );
}
