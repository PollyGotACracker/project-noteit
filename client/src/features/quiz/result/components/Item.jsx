import style from "./item.module.css";
import { Link } from "react-router-dom";
import { BsJournalText } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import { RiGoogleLine } from "react-icons/ri";
import { URLS } from "@/router";

export default function Item({ item }) {
  return (
    <div className={style.subject}>
      <div className={style.subject_name}>
        <Link
          className={style.link_subject}
          to={`${URLS.NOTE_SUBJECT}/${item?.s_catid}/${item?.s_subid}`}
        >
          <BsJournalText />
          {item?.s_subject}
        </Link>
        <p className={style.text}>· 키워드 수: {item?.s_keycount}</p>
        <p className={style.text}>· 오답 수: {item?.wrong.length}</p>
      </div>
      {item?.wrong.map((keyword) => (
        <div className={style.keyword} key={keyword?.k_keyid}>
          <span className={style.keyword_name}>
            <FaTag /> {keyword?.k_keyword}
          </span>
          <a
            className={style.link_search}
            href={`https://www.google.com/search?q=${item?.s_subject} ${keyword.k_keyword}`}
            target="_blank"
            rel="noreferrer"
          >
            <RiGoogleLine />
            검색
          </a>
          <p className={style.keyword_description}>{keyword?.k_desc}</p>
          <p className={style.keyword_answered}>
            제출: <span>{keyword?.answer}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
