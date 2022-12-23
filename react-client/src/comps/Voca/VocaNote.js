import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../css/Voca/VocaNote.css";
import VocaList from "./VocaList";
import { clickWriteHandler } from "../../data/HandlerFunc";
import { VocaContextProvider } from "../../context/VocaContext";
import { vocaArr } from "../../data/VocaData";
// import { useVocaContext } from "../../context/VocaContext";

const VocaNote = () => {
  const { catid } = useParams();
  // const { vocaArr } = useVocaContext();
  const vocaList = vocaArr.map((item) => {
    return <VocaList className="Item" item={item} />;
  });

  return (
    <VocaContextProvider>
      <main className="Note">
        <section className="Note title">
          <div className="category">정보처리기사</div>
          <Link
            className="insert"
            onClick={clickWriteHandler}
            data-catid={catid}
          >
            추가
          </Link>
          <form>
            <input />
            <button className="search" title="검색"></button>
          </form>
        </section>
        <section className="Note content">
          <ul>{vocaList}</ul>
        </section>
      </main>
    </VocaContextProvider>
  );
};
export default VocaNote;
