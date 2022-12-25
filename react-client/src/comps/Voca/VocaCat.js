import { Link } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext";

const VocaCat = (props) => {
  const { item } = props;
  const { deleteCatHandler } = useVocaContext();

  const deleteHandler = (e) => {
    const catid = e.target.closest(".Cat").dataset.id;
    if (!window.confirm("이 카테고리를 삭제할까요?")) {
      return false;
    } else {
      deleteCatHandler(catid);
    }
  };

  return (
    <div key={item.c_catid} className="Cat" data-id={item.c_catid}>
      <Link to={`/voca/category/${item.c_catid}`}>{item.c_category}</Link>
      <div className="Item length">{item["f_sub.length"]}</div>
      <button className="delete" title="삭제" onClick={deleteHandler}>
        삭제
      </button>
    </div>
  );
};
export default VocaCat;
