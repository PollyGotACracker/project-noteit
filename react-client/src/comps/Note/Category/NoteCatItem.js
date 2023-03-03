import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { deleteCatHandler } from "../../../service/note.service";
import { MdDelete } from "react-icons/md";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { RiBallPenFill } from "react-icons/ri";

const NoteCatItem = (props) => {
  const { item } = props;
  const [title, setTitle] = useState(item.c_category);
  const [update, setUpdate] = useState("수정");

  const catRef = useRef();

  const onChangeHandler = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );
  const updateHandler = async () => {
    const input = catRef.current;
    const catid = input.dataset.id;

    if (update === "수정") {
      setUpdate("완료");
      input.parentNode.style.pointerEvents = "none";
      input.readOnly = false;
      input.focus();
    }
    if (update === "완료") {
      const fetchOption = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ c_catid: catid, c_category: title }),
      };
      let res = await fetch(`/note/cat/update`, fetchOption);
      res = res.json();
      if (res.error) {
        alert(res.error);
      } else {
        input.parentNode.style.pointerEvents = "auto";
        input.readOnly = true;
        setUpdate("수정");
      }
    }
  };

  const deleteHandler = () => {
    const catid = catRef.current.dataset.id;
    if (!window.confirm("이 카테고리를 삭제할까요?")) {
      return false;
    } else {
      deleteCatHandler(catid);
    }
  };

  return (
    <section key={item.c_catid}>
      <Link
        className={`Cat link-${item.c_catid}`}
        to={`/note/category/${item.c_catid}`}
      >
        <button type="button" title="북마크">
          <RxBookmark />
        </button>
        <input
          className={`title-${item.c_catid}`}
          data-id={item.c_catid}
          value={title}
          readOnly={true}
          onChange={onChangeHandler}
          onBlur={updateHandler}
          ref={catRef}
        />
        <div className="subcount">{item.c_subcount}</div>
      </Link>

      <div className="btn-box">
        <button
          className="update"
          type="button"
          disabled={title < 1}
          title="수정"
          onClick={updateHandler}
        >
          <RiBallPenFill /> {update}
        </button>
        <button
          className="delete"
          type="button"
          title="삭제"
          onClick={deleteHandler}
        >
          <MdDelete /> 삭제
        </button>
      </div>
    </section>
  );
};
export default NoteCatItem;
