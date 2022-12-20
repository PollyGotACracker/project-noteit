const VocaList = (props) => {
  const { item, vocaArr, setVocaArr, vocaItem, setVocaItem } = props;

  return (
    <li className="Item" key={item.id}>
      <button type="checkbox">북마크</button>
      <div className="Item subject">{item.subject}</div>
      <div className="Item length">{item.keyword.length}</div>
      <button>삭제</button>
    </li>
  );
};

export default VocaList;
