import "@styles/noteCategory.css";
import { useEffect, useCallback } from "react";
import { HiFolderPlus } from "react-icons/hi2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNoteContext } from "@contexts/noteContext";
import { getCatHandler } from "@services/note.service";
import { initCat } from "@data/note";
import CatItem from "@components/note/catItem";

const NoteCatPage = () => {
  const { noteCatList, setNoteCatList, noteCat, setNoteCat } = useNoteContext();

  useEffect(() => {
    (async () => {
      const data = await getCatHandler();
      setNoteCatList([...data]);
    })();
  }, []);

  const list = noteCatList.map((item) => {
    return <CatItem key={item.c_catid} className="Item" item={item} />;
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
      let res = await fetch("/server/note/cat/insert", fetchOption);
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        alert(res.result);
      }
      setNoteCat({ ...initCat() });
      const data = await getCatHandler();
      setNoteCatList([...data]);
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
    <article className="Note Cat">
      <section className="top">
        <div className="title">노트 목록</div>
        <div className="info">
          <AiOutlineInfoCircle />
          북마크된 아이템의 키워드는 퀴즈에 표시됩니다.
        </div>
        <form>
          <input
            name="c_category"
            maxLength={225}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            placeholder="카테고리 추가"
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
    </article>
  );
};

export default NoteCatPage;
