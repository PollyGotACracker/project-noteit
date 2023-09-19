import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { RiCheckFill, RiBallPenFill } from "react-icons/ri";
import { URLS } from "@/router";
import {
  updateCategoryBookmark,
  updateCategory,
  deleteCategory,
} from "@services/note.service.js";
import { getClient } from "@services/core";

const NoteCatItem = ({ item }) => {
  const navigate = useNavigate();
  const queryClient = getClient();
  const catId = item.c_catid;
  const isBookmarked = item.c_bookmark !== 0;
  const mutationParams = { queryClient, catId };
  const [catTitle, setCatTitle] = useState(item.c_category);
  const [update, setUpdate] = useState("수정");
  const catInputRef = useRef();

  const { mutate: updateMutation } = useMutation(
    updateCategory(mutationParams)
  );
  const { mutate: updateBookmarkMutation } = useMutation(
    updateCategoryBookmark(mutationParams)
  );
  const { mutate: deleteMutation } = useMutation(
    deleteCategory(mutationParams)
  );

  const ChangeNameHandler = ({ target: { value } }) => setCatTitle(value);

  const updateHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (update === "수정") {
      setUpdate("완료");
      catInputRef.current.readOnly = false;
      catInputRef.current.focus();
    }
    if (update === "완료") {
      updateMutation({ catTitle });
      catInputRef.current.readOnly = true;
      setUpdate("수정");
    }
  };

  const updateBookmarkHandler = (e) => {
    // 이벤트 버블링 방지. 모두 적용해야
    e.stopPropagation();
    e.preventDefault();
    updateBookmarkMutation({
      bookmark: isBookmarked ? 0 : 1,
    });
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm("이 카테고리를 삭제할까요?")) {
      return false;
    } else {
      deleteMutation();
    }
  };

  const clickItemHandler = () => {
    if (update === "완료") {
      return false;
    } else {
      navigate(`${URLS.NOTE_LIST}/${catId}`);
    }
  };

  return (
    <section className="cat-item">
      <div
        className={`link-box`}
        onClick={clickItemHandler}
        style={{ cursor: update === "완료" ? "default" : "pointer" }}
      >
        <button
          className={isBookmarked ? "bookmark-btn active" : "bookmark-btn"}
          type="button"
          title="북마크"
          onClick={updateBookmarkHandler}
        >
          <BsBookmarkFill />
        </button>
        <input
          className={`title-${catId}`}
          data-id={catId}
          value={catTitle}
          maxLength={225}
          spellCheck="false"
          readOnly={true}
          onChange={ChangeNameHandler}
          style={{ cursor: update === "완료" ? "text" : "pointer" }}
          ref={catInputRef}
        />
        <div className="date">{item.c_date}</div>
        <div className="subcount">{item.c_subcount}</div>
        <div className="btn-box">
          <button
            className="update-btn"
            type="button"
            disabled={catTitle.length < 1}
            title="수정"
            style={{ color: update === "완료" ? "#e69215" : "" }}
            onClick={updateHandler}
          >
            {update === "완료" ? <RiCheckFill /> : <RiBallPenFill />} {update}
          </button>
          <button
            className="delete-btn"
            type="button"
            title="삭제"
            onClick={deleteHandler}
          >
            <MdDelete /> 삭제
          </button>
        </div>
      </div>
    </section>
  );
};
export default NoteCatItem;
