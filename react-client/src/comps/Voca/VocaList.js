import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext";

const VocaList = (props) => {
  const { catid } = useParams();
  const { item } = props;
  const { deleteSubHandler } = useVocaContext();
  const [bookmark, setBookmark] = useState(item.s_bookmark);

  const bookmarkHandler = useCallback(
    async (e) => {
      const subid = e.target.closest(".Item").dataset.id;
      try {
        let res = await fetch(`/voca/sub/bookmark/${subid}`, { method: "PUT" });
        res = await res.json();
        if (res.error) {
          alert(res.error);
        } else {
          setBookmark(res.result);
        }
      } catch (error) {
        console.log(error);
        alert("서버 접속 중 오류가 발생했습니다.");
      }
    },
    [bookmark, setBookmark]
  );

  const deleteHandler = (e) => {
    const subid = e.target.closest(".Item").dataset.id;
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      deleteSubHandler(subid, catid);
    }
  };

  return (
    <li className="Item" data-id={item.s_subid}>
      <button
        className="bookmark"
        title="북마크"
        value={bookmark}
        onClick={bookmarkHandler}
      ></button>
      <Link
        className="Item subject"
        to={`/voca/subject/${catid}/${item.s_subid}`}
      >
        {item.s_subject}
      </Link>
      <div className="Item length">{item.length}</div>
      <button className="delete" title="삭제" onClick={deleteHandler}></button>
    </li>
  );
};

export default VocaList;
