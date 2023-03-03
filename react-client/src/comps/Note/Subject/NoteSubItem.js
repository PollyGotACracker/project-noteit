import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteSubHandler } from "../../../service/note.service";
import { useNoteContext } from "../../../context/NoteContext";

const NoteSubItem = (props) => {
  const { catid } = useParams();
  const { item } = props;
  const { setCatData, setNoteSubList } = useNoteContext();
  const [bookmark, setBookmark] = useState(item.s_bookmark);

  const bookmarkHandler = useCallback(
    async (e) => {
      const subid = e.target.closest(".item").dataset.id;
      try {
        let res = await fetch(`/note/sub/bookmark/${subid}`, { method: "PUT" });
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
    [setBookmark]
  );

  const deleteHandler = async (e) => {
    const subid = e.target.closest(".item").dataset.id;
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      try {
        await deleteSubHandler(subid, catid);
        const res = await fetch(`/note/cat/${catid}`);
        const result = await res.json();
        if (res.error) {
          console.log(res.error);
          alert(res.error);
        } else {
          setCatData({ ...result.category[0] });
          setNoteSubList([...result.subList]);
        }
      } catch (error) {
        console.log(error);
        alert("서버 연결에 문제가 발생했습니다.");
      }
    }
  };

  return (
    <li className="item" data-id={item.s_subid}>
      <button
        className="bookmark"
        title="북마크"
        value={bookmark}
        onClick={bookmarkHandler}
      ></button>
      <Link className="subject" to={`/note/subject/${catid}/${item.s_subid}`}>
        {item.s_subject}
      </Link>
      <div className="length">{item.length}</div>
      <button className="delete" title="삭제" onClick={deleteHandler}></button>
    </li>
  );
};

export default NoteSubItem;
