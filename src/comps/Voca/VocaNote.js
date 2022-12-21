import "../../css/Voca/VocaNote.css";
import VocaList from "./VocaList";
import { vocaArr } from "../../data/VocaData";
// import { useVocaContext } from "../../context/VocaContext";

const VocaNote = () => {
  // const { vocaArr } = useVocaContext();
  const vocaList = vocaArr.map((item) => {
    return <VocaList className="Item" item={item} />;
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
