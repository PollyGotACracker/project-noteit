import "../../css/Voca/VocaDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { vocaItem } from "../../data/VocaData";

const VocaDetail = () => {
  const keywordList = vocaItem.keyword.map((keyword) => {
    return <span className="keyword">{keyword}</span>;
  });

  return (
    <main className="Detail">
      <section className="Detail title">
        <div className="box">
          <div className="subject">{vocaItem.subject}</div>
          <div className="category">{vocaItem.category}</div>
        </div>
        <div className="box">
          <div className="length">{vocaItem.keyword.length}</div>
          <div className="btnBox">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </section>
      <section className="Detail slide">
        <button>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="keywordList">{keywordList}</div>
        <button>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </section>
      <section className="Detail memo">
        <div>{vocaItem.memo}</div>
      </section>
    </main>
  );
};
export default VocaDetail;
