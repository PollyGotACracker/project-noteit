import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { deleteCatHandler } from "../../../service/note.service";

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
  const updateHandler = useCallback(async () => {
    const input = catRef.current;
    const catid = input.dataset.id;
    // const link = document.querySelector(`.link-${catid}`);

    if (update === "수정") {
      setUpdate("완료");
      // link.style.pointerEvents = "none";
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
        input.readOnly = true;
        setUpdate("수정");
      }
    }
  }, [update, setUpdate, title]);
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
      <div className="Cat">
        <Link
          className={`link-${item.c_catid}`}
          to={`/note/category/${item.c_catid}`}
        >
          <input
            className={`title-${item.c_catid}`}
            data-id={item.c_catid}
            value={title}
            readOnly={true}
            onChange={onChangeHandler}
            ref={catRef}
          />
          <div className="subcount">{item.c_subcount}</div>
        </Link>
      </div>
      <div className="btn-box">
        <button
          className="update"
          disabled={title < 1}
          title="수정"
          onClick={updateHandler}
        >
          {update}
        </button>
        <button className="delete" title="삭제" onClick={deleteHandler}>
          삭제
        </button>
      </div>
    </section>
  );
};
export default NoteCatItem;
