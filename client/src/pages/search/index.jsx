import "@styles/search.css";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Highlighter from "react-highlight-words";

const SearchPage = () => {
  const location = useLocation();
  const { data, value, regexp } = location.state;
  const valArr = value?.split(" ")?.filter((item) => item !== "");

  return (
    <article className="Search">
      <div className="search-value">
        '<span>{value}</span>' 검색 결과
      </div>
      <div className="search-result">
        {data?.length !== 0
          ? `${data?.length} 개의 주제가 검색되었습니다.`
          : "검색된 주제가 없습니다."}
      </div>
      {data ? (
        <div className="search-data">
          {data?.map((item) => {
            return (
              <div className="subject-box" key={item.s_subid}>
                <Link
                  className="subject"
                  to={`/note/subject/${item?.s_catid}/${item?.s_subid}`}
                >
                  <Highlighter
                    highlightClassName="content"
                    searchWords={valArr}
                    autoEscape={true}
                    textToHighlight={item?.s_subject}
                  />
                </Link>
                <div className="category">{item?.s_category}</div>
                <div className="keyword-box">
                  {/* 키워드에 단어가 있을 경우 */}
                  {item?.tbl_keywords?.map((key) => {
                    if (key?.k_keyword?.match(regexp)) {
                      return (
                        <div className="keyword" key={key?.k_keyid}>
                          <MdOutlineSubdirectoryArrowRight />
                          <Highlighter
                            highlightClassName="content"
                            searchWords={valArr}
                            autoEscape={true}
                            textToHighlight={key?.k_keyword}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </article>
  );
};

export default SearchPage;
