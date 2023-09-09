import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "@contexts/noteContext";
import { getCatHandler, deleteCatHandler } from "@services/note.service.js";
import { MdDelete } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { RiCheckFill, RiBallPenFill } from "react-icons/ri";

const NoteCatItem = ({ item }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState(item.c_category);
  const [bookmark, setBookmark] = useState(item.c_bookmark);
  const [update, setUpdate] = useState("수정");
  const catRef = useRef();
  const { setNoteCatList } = useNoteContext();

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const updateHandler = async (e) => {
    await e.stopPropagation();
    await e.preventDefault();
    const input = catRef.current;
    const catid = input.dataset.id;

    if (update === "수정") {
      setUpdate("완료");
      input.readOnly = false;
      input.focus();
    }
    if (update === "완료") {
      const fetchOption = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ c_catid: catid, c_category: title }),
      };
      const res = await fetch(`/server/note/cat/update`, fetchOption).then(
        (data) => data.json()
      );
      if (res?.error) alert(res.error);
      else {
        input.readOnly = true;
        setUpdate("수정");
      }
    }
  };

  const deleteHandler = async (e) => {
    await e.stopPropagation();
    await e.preventDefault();
    const catid = catRef.current.dataset.id;
    if (!window.confirm("이 카테고리를 삭제할까요?")) {
      return false;
    } else {
      await deleteCatHandler(catid);
      const data = await getCatHandler();
      setNoteCatList([...data]);
    }
  };

  const setCatBookmark = async (e) => {
    // 이벤트 버블링 방지. 모두 적용해야
    await e.stopPropagation();
    await e.preventDefault();
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        catid: catRef.current.dataset.id,
        bookmark: bookmark,
      }),
    };
    const res = await fetch(`/server/note/cat/bookmark`, fetchOption).then(
      (data) => data.json()
    );
    if (res.error) {
      alert(res.error);
      return false;
    } else {
      setBookmark(res.result);
    }
  };

  return (
    <section className="cat-item" key={item.c_catid}>
      <div
        className={`link-box`}
        onClick={() => {
          if (update === "완료") {
            return false;
          } else {
            nav(`/note/category/${item.c_catid}`);
          }
        }}
        style={{ cursor: update === "완료" ? "default" : "pointer" }}
      >
        <button
          className={bookmark === 0 ? "bookmark-btn" : "bookmark-btn active"}
          type="button"
          title="북마크"
          onClick={setCatBookmark}
        >
          <BsBookmarkFill />
        </button>
        <input
          className={`title-${item.c_catid}`}
          data-id={item.c_catid}
          value={title}
          maxLength={225}
          spellCheck="false"
          readOnly={true}
          onChange={onChangeHandler}
          style={{ cursor: update === "완료" ? "text" : "pointer" }}
          ref={catRef}
        />
        <div className="date">{item.c_date}</div>
        <div className="subcount">{item.c_subcount}</div>
        <div className="btn-box">
          <button
            className="update-btn"
            type="button"
            disabled={title.length < 1}
            title="수정"
            style={{ color: update === "완료" ? "#e69215" : "" }}
            onClick={(e) => updateHandler(e)}
          >
            {update === "완료" ? <RiCheckFill /> : <RiBallPenFill />} {update}
          </button>
          <button
            className="delete-btn"
            type="button"
            title="삭제"
            onClick={(e) => deleteHandler(e)}
          >
            <MdDelete /> 삭제
          </button>
        </div>
      </div>
    </section>
  );
};
export default NoteCatItem;
