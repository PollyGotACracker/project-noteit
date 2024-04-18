import style from "./page.module.css";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Highlighter from "react-highlight-words";
import { URLS } from "@/router";

export default function SearchPage() {
  const location = useLocation();
  const { data, value, regexp } = location.state;
  const valueArr = value?.split(" ")?.filter((word) => word !== "");
  const isDataExist = data?.length !== 0;

  const resultText = isDataExist
    ? `${data?.length} 개의 주제가 검색되었습니다.`
    : "검색 결과가 없습니다.";

  return (
    <main>
      <div className={style.value_text}>
        '<span>{value}</span>' 검색 결과
      </div>
      <div className={style.result_text}>{resultText}</div>
      {isDataExist && (
        <div className={style.list}>
          {data?.map((sub) => (
            <Subject key={sub.s_subid} item={sub} valueArr={valueArr}>
              <KeywordList
                item={sub?.tbl_keywords}
                regexp={regexp}
                valueArr={valueArr}
              />
            </Subject>
          ))}
        </div>
      )}
    </main>
  );
}

function Subject({ item, valueArr, children }) {
  return (
    <div className={style.item}>
      <Link
        className={style.subject}
        to={`${URLS.NOTE_SUBJECT}/${item.s_catid}/${item.s_subid}`}
      >
        <Highlighter
          highlightClassName="content"
          searchWords={valueArr}
          autoEscape={true}
          textToHighlight={item.s_subject}
        />
      </Link>
      <div className={style.category}>{item.s_category}</div>
      <div className={style.keyword_box}>{children}</div>
    </div>
  );
}

const KeywordList = ({ item, regexp, valueArr }) => {
  return item?.map((key) => {
    if (key?.k_keyword?.match(regexp)) {
      return (
        <div className={style.keyword} key={key.k_keyid}>
          <MdOutlineSubdirectoryArrowRight />
          <Highlighter
            highlightClassName="content"
            searchWords={valueArr}
            autoEscape={true}
            textToHighlight={key.k_keyword}
          />
        </div>
      );
    }
  });
};
