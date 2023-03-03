import { useLayoutEffect, useCallback } from "react";
import { useNoteContext } from "../../../context/NoteContext.js";
import "../../../css/Note/NoteCatMain.css";
import NoteCatItem from "./NoteCatItem";
import { initCat } from "../../../data/NoteData";
import { HiFolderPlus } from "react-icons/hi2";

const NoteCatMain = () => {
  const { noteCatList, setNoteCatList, noteCat, setNoteCat } = useNoteContext();

  const fetchs = useCallback(async () => {
    try {
      let res = await fetch("/note/cat");
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setNoteCatList([...res]);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [setNoteCatList]);

  useLayoutEffect(() => {
    (async () => {
      await fetchs();
    })();
  }, [fetchs]);

  const list = noteCatList.map((item) => {
    return <NoteCatItem key={item.c_catid} className="Item" item={item} />;
  });

  const onChangeHandler = (e) => {
    setNoteCat({ ...noteCat, [e.target.name]: e.target.value });
  };

  const insertCat = useCallback(async () => {
    try {
      const fetchOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteCat),
      };
      let res = await fetch("/note/cat/insert", fetchOption);
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        alert(res.result);
      }
      setNoteCat({ ...initCat() });
      fetchs();
      document.querySelector("input[name='c_category']").value = "";
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [setNoteCat, noteCat, initCat]);

  const onKeyDownHandler = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      insertCat();
    }
  };
  const onClickHandler = () => {
    insertCat();
  };

  return (
    <main className="Note Cat">
      <section className="top">
        <div className="title">카테고리를 선택하세요!</div>
        <form>
          <input
            name="c_category"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            placeholder="카테고리 추가..."
          />
          <button
            type="button"
            id="insert-btn"
            onClick={onClickHandler}
            disabled={noteCat.c_category.length < 1}
          >
            <HiFolderPlus />
          </button>
        </form>
      </section>
      <section className="cat-list">{list}</section>
    </main>
  );
};

export default NoteCatMain;
