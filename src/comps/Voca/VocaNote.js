import { useState } from "react";
import "../../css/VocaNote.css";
import VocaList from "./VocaList";
import {
  vocaArr as vocaArrData,
  vocaItem as vocaItemData,
} from "../../data/VocaData";

const VocaNote = () => {
  const [vocaArr, setVocaArr] = useState(vocaArrData);
  const [vocaItem, setVocaItem] = useState(vocaItemData);

  const vocaList = vocaArr.map((item) => {
    return (
      <VocaList
        className="Item"
        item={item}
        vocaArr={vocaArr}
        setVocaArr={setVocaArr}
        vocaItem={vocaItem}
        setVocaItem={setVocaItem}
      />
    );
  });

  return (
    <main className="Note">
      <section className="Note title">
        <div className="category">카테고리</div>
        <button>추가</button>
      </section>
      <section className="Note form">
        <form>
          <input />
          <button>검색</button>
        </form>
      </section>
      <section className="Note content">
        <ul>{vocaList}</ul>
      </section>
    </main>
  );
};
export default VocaNote;
