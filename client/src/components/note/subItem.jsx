import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  deleteSubHandler,
  getSubHandler,
  updateSubBookmark,
} from "@services/note.service";
import { useNoteContext } from "@contexts/noteContext";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { FaTags } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteSubItem = ({ item }) => {
  const { catid } = useParams();
  const { setNoteSubList } = useNoteContext();
  const [bookmark, setBookmark] = useState(item.s_bookmark);

  const bookmarkHandler = useCallback(
    async (e) => {
      const subId = e.target.closest(".item").dataset.id;
      const res = await updateSubBookmark(subId);
      if (res?.error) alert(res.error);
      else setBookmark(res);
    },
    [setBookmark]
  );

  const deleteHandler = async (e) => {
    const subid = e.target.closest(".item").dataset.id;
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      const res = await deleteSubHandler(catid, subid);
      if (res) {
        alert(res);
        const { sub } = await getSubHandler(catid);
        setNoteSubList([...sub]);
      }
    }
  };

  return (
    <li className="item" data-id={item.s_subid}>
      <button
        className="bookmark-btn"
        title="북마크"
        value={bookmark}
        onClick={bookmarkHandler}
      >
        {bookmark === 0 ? <RxBookmark /> : <RxBookmarkFilled />}
      </button>
      <Link className="subject" to={`/note/subject/${catid}/${item.s_subid}`}>
        {item.s_subject}
      </Link>
      <div className="keycount">
        <FaTags />
        {item.s_keycount}
      </div>
      <button className="delete-btn" title="삭제" onClick={deleteHandler}>
        <MdDelete />
      </button>
    </li>
  );
};

export default NoteSubItem;
