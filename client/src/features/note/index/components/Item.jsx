import style from "./item.module.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import { RxBookmarkFilled } from "react-icons/rx";
import { RiCheckFill, RiBallPenFill } from "react-icons/ri";
import useCategoryFetcher from "../../common/services/useCategoryFetcher";
import { getStyle } from "@utils/manageStyle";
import { URLS } from "@/router";
import useModals from "@hooks/useModals";

const updateLabelText = { update: "수정", done: "완료" };

export default function Item({ item, savePos: handleSavePos }) {
  const { updateCategoryBookmark, updateCategory, deleteCategory } =
    useCategoryFetcher();
  const navigate = useNavigate();
  const [isUpdateDone, setIsUpdateDone] = useState(true);
  const [catName, setCatName] = useState(item.c_category);
  const { c_catid: catId } = item;

  const { mutate: mutateUpdateBookmark } = useMutation(
    updateCategoryBookmark({ catId })
  );
  const { mutate: mutateUpdate } = useMutation(
    updateCategory({
      catId,
      queries: {
        onError: () => setCatName(item.c_category),
      },
    })
  );
  const { mutate: mutateDelete } = useMutation(deleteCategory({ catId }));

  const onclick = () => {
    if (!isUpdateDone) return;
    else navigate(`${URLS.NOTE_CATEGORY}/${catId}`);
  };

  return (
    <li className={style.item} onClick={handleSavePos}>
      <div
        className={style.link}
        onClick={onclick}
        style={{
          cursor: !isUpdateDone ? "default" : "pointer",
        }}
      >
        <Bookmark
          value={item.c_bookmark}
          mutateUpdateBookmark={mutateUpdateBookmark}
        />
        <div className={style.name_box}>
          <Name
            setCatName={setCatName}
            catName={catName}
            isUpdateDone={isUpdateDone}
          />
          <div className={style.date}>{item.c_date}</div>
          <div className={style.subcount}>[ {item.c_subcount} ]</div>
        </div>
        <div className={style.button_box} onClick={(e) => e.stopPropagation()}>
          <UpdateButton
            isUpdateDone={isUpdateDone}
            setIsUpdateDone={setIsUpdateDone}
            catName={catName}
            mutateUpdate={mutateUpdate}
          />
          <DeleteButton
            category={item.c_category}
            mutateDelete={mutateDelete}
          />
        </div>
      </div>
    </li>
  );
}

function Bookmark({ value, mutateUpdateBookmark }) {
  const handleBookmark = (e) => {
    // 이벤트 버블링 방지. 모두 적용해야
    e.stopPropagation();
    e.preventDefault();
    mutateUpdateBookmark({
      bookmark: !value,
    });
  };

  return (
    <button
      className={style.bookmark}
      type="button"
      title="북마크"
      value={value}
      onClick={handleBookmark}
    >
      <RxBookmarkFilled />
    </button>
  );
}

function Name({ catName, setCatName, isUpdateDone }) {
  const catInputRef = useRef();
  const handleChangeName = ({ target: { value } }) => setCatName(value);

  useEffect(() => {
    if (!isUpdateDone && catInputRef.current) {
      catInputRef.current.focus();
    }
  }, [isUpdateDone, catInputRef.current]);

  return (
    <>
      {!isUpdateDone ? (
        <input
          className={style.name}
          value={catName}
          maxLength={30}
          spellCheck={false}
          onChange={handleChangeName}
          ref={catInputRef}
        />
      ) : (
        <div className={style.name}>{catName}</div>
      )}
    </>
  );
}

function UpdateButton({
  isUpdateDone,
  setIsUpdateDone,
  catName,
  mutateUpdate,
}) {
  const [updateLabel, setUpdateLabel] = useState(updateLabelText.update);

  const handleUpdate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (updateLabel === updateLabelText.update) {
      setUpdateLabel(updateLabelText.done);
    } else if (updateLabel === updateLabelText.done) {
      mutateUpdate({ catName });
      setUpdateLabel(updateLabelText.update);
    }
  };

  useEffect(() => {
    if (updateLabel === updateLabelText.update) {
      setIsUpdateDone(true);
    } else if (updateLabel === updateLabelText.done) {
      setIsUpdateDone(false);
    }
  }, [updateLabel]);

  return (
    <button
      className={style.update}
      type="button"
      disabled={catName.length < 1}
      title="수정"
      style={{
        color: !isUpdateDone ? getStyle("--accent") : "",
      }}
      onClick={handleUpdate}
    >
      {!isUpdateDone ? <RiCheckFill /> : <RiBallPenFill />}
      <span>{updateLabel}</span>
    </button>
  );
}

function DeleteButton({ category, mutateDelete }) {
  const { openModal } = useModals();

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    openModal({
      content: `${category}\n이 카테고리를 삭제할까요?`,
      okClick: mutateDelete,
    });
  };

  return (
    <button
      className={style.delete}
      type="button"
      title="삭제"
      onClick={handleDelete}
    >
      <MdDelete />
      <span>삭제</span>
    </button>
  );
}
