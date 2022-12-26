import { useState, useCallback } from "react";
import { createRoutesFromChildren, Link } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext";

const VocaCat = (props) => {
  const { item } = props;
  const [title, setTitle] = useState(item.c_category);
  const [update, setUpdate] = useState("수정");
  const { deleteCatHandler } = useVocaContext();

  const onChangeHandler = useCallback(
    (e) => {
      const catid = e.target.closest(".Cat").dataset.id;
      setTitle(e.target.value);
    },
    [title, setTitle]
  );
  const updateHandler = useCallback(
    async (e) => {
      const cat = e.target.closest(".Cat");
      const catid = cat.dataset.id;
      // const link = document.querySelector(`.link-${catid}`);
      const input = document.querySelector(`.title-${catid}`);
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
        let res = await fetch(`/voca/cat/update`, fetchOption);
        res = res.json();
        if (res.error) {
          alert(res.error);
        } else {
          input.readOnly = true;
          setUpdate("수정");
        }
      }
    },
    [update, setUpdate, title, setTitle]
  );
  const deleteHandler = (e) => {
    const catid = e.target.closest(".Cat").dataset.id;
    if (!window.confirm("이 카테고리를 삭제할까요?")) {
      return false;
    } else {
      deleteCatHandler(catid);
    }
  };
  //
  return (
    <div key={item.c_catid} className="Cat" data-id={item.c_catid}>
      <Link
        className={`link-${item.c_catid}`}
        to={`/voca/category/${item.c_catid}`}
      >
        <input
          className={`title-${item.c_catid}`}
          value={title}
          readOnly={true}
          onChange={onChangeHandler}
        />
        <div className="length">{item["f_sub.length"]}</div>
      </Link>
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
    </div>
  );
};
export default VocaCat;
