import { Link } from "react-router-dom";
import "../../css/Voca/VocaNote.css";
import { clickWriteHandler } from "../../data/HandlerFunc";
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
        <div className="category">정보처리기사</div>
        <Link className="insert" onClick={clickWriteHandler}>
          추가
        </Link>
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
