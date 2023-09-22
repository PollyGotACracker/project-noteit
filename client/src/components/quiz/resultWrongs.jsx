import { Link } from "react-router-dom";
import { BsJournalText } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import { RiGoogleLine } from "react-icons/ri";
import { URLS } from "@/router";

const QuizResultWrongs = ({ wrongs }) => {
  return (
    <div className="wrong-list">
      <div className="title">틀린 문제 목록</div>
      {wrongs.map((item) => (
        <div className="wrong-item" key={item?.s_subid}>
          <div className="subject">
            <Link to={`${URLS.NOTE_DETAIL}/${item?.s_catid}/${item?.s_subid}`}>
              <BsJournalText />
              {item?.s_subject}
            </Link>
            <div>· 키워드 수: {item?.s_keycount}</div>
            <div>· 오답 수: {item?.wrong.length}</div>
          </div>
          {item?.wrong.map((keyword) => (
            <div className="wrong-keyword" key={keyword?.k_keyid}>
              <span className="keyword">
                <FaTag /> {keyword?.k_keyword}
              </span>
              <a
                href={`https://www.google.com/search?q=${item?.s_subject} ${keyword.k_keyword}`}
                target="_blank"
                rel="noreferrer"
              >
                <RiGoogleLine />
                검색
              </a>
              <div className="desc">{keyword?.k_desc}</div>
              <div className="answer">제출: {keyword?.answer}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizResultWrongs;
