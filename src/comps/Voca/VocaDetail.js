import { useState } from "react";
import "../../css/VocaDetail.css";
import { vocaItem as vocaItemData } from "../../data/VocaData";

const VocaDetail = () => {
  const [vocaItem, setVocaItem] = useState(vocaItemData);

  const keywordList = vocaItem.keyword.map((keyword) => {
    return <span className="keyword">{keyword}</span>;
  });

  return (
    <main className="Detail">
      <section className="Detail title">
        <div className="category">{vocaItem.category}</div>
        <div className="subject">{vocaItem.subject}</div>
        <div className="length">{vocaItem.keyword.length}</div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </section>
      <section className="Detail slide">
        <button>앞</button>
        <div className="keywordList">{keywordList}</div>
        <button>뒤</button>
      </section>
      <section className="Detail memo">
        <div>{vocaItem.memo}</div>
      </section>
    </main>
  );
};
export default VocaDetail;
