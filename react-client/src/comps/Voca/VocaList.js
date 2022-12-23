import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const VocaList = (props) => {
  const { catid } = useParams();
  const { item, vocaArr, setVocaArr, vocaItem, setVocaItem } = props;

  return (
    <li className="Item" key={item.id}>
      <button className="bookmark" title="북마크"></button>
      <Link className="Item subject" to={`/voca/subject/${catid}/${item.id}`}>
        {item.subject}
      </Link>
      <div className="Item length">{item.keyword.length}</div>
      <button className="delete" title="삭제"></button>
    </li>
  );
};

export default VocaList;
