import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { RiCheckFill, RiBallPenFill } from "react-icons/ri";
import useNoteFetcher from "@services/useNoteFetcher";
import { getStyle } from "@utils/manageStyle";
import { URLS } from "@/router";
import useModals from "@hooks/useModals";

const NoteCatItem = ({ item, savePos }) => {
  const { openModal } = useModals();
  const { updateCategoryBookmark, updateCategory, deleteCategory } =
    useNoteFetcher();
  const navigate = useNavigate();
  const catId = item.c_catid;
  const isBookmarked = item.c_bookmark !== 0;
  const [catTitle, setCatTitle] = useState(item.c_category);
  const [updateLabel, setUpdateLabel] = useState("수정");
  const catInputRef = useRef();

  const { mutate: updateMutation } = useMutation(
    updateCategory({
      catId,
      queries: {
        onError: () => {
          setCatTitle(item.c_category);
        },
      },
    })
  );
  const { mutate: updateBookmarkMutation } = useMutation(
    updateCategoryBookmark({ catId })
  );
  const { mutate: deleteMutation } = useMutation(deleteCategory({ catId }));

  useEffect(() => {
    if (catInputRef.current) catInputRef.current.focus();
  }, [updateLabel, catInputRef.current]);

  const ChangeNameHandler = ({ target: { value } }) => setCatTitle(value);

  const updateHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (updateLabel === "수정") {
      setUpdateLabel("완료");
    }
    if (updateLabel === "완료") {
      updateMutation({ catTitle });
      setUpdateLabel("수정");
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
    openModal({
      content: "이 카테고리를 삭제할까요?",
      okClick: deleteMutation,
    });
  };

  const clickItemHandler = () => {
    if (updateLabel === "완료") return;
    else navigate(`${URLS.NOTE_LIST}/${catId}`);
  };

  return (
    <li className="item" onClick={savePos}>
      <div
        className="link-wrapper"
        onClick={clickItemHandler}
        style={{ cursor: updateLabel === "완료" ? "default" : "pointer" }}
      >
        <button
          className={isBookmarked ? "bookmark-btn active" : "bookmark-btn"}
          type="button"
          title="북마크"
          onClick={updateBookmarkHandler}
        >
          <BsBookmarkFill />
        </button>
        {updateLabel === "완료" ? (
          <input
            className="title"
            data-id={catId}
            value={catTitle}
            maxLength={30}
            spellCheck={false}
            onChange={ChangeNameHandler}
            ref={catInputRef}
          />
        ) : (
          <div className="title">{catTitle}</div>
        )}
        <div className="bottom-wrapper">
          <div className="date">{item.c_date}</div>
          <div className="subcount">{item.c_subcount}</div>
          <div className="btn-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="update-btn"
              type="button"
              disabled={catTitle.length < 1}
              title="수정"
              style={{
                color: updateLabel === "완료" ? getStyle("--accent") : "",
              }}
              onClick={updateHandler}
            >
              {updateLabel === "완료" ? <RiCheckFill /> : <RiBallPenFill />}{" "}
              {updateLabel}
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
      </div>
    </li>
  );
};
export default NoteCatItem;
