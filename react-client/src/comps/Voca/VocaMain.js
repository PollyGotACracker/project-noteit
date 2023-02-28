import { useLayoutEffect, useCallback } from "react";
import { useVocaContext } from "../../context/VocaContext.js";
import "../../css/Voca/VocaMain.css";
import VocaCat from "./VocaCat";

const VocaCategory = () => {
  const { vocaCatList, setVocaCatList, InitCat, vocaCat, setVocaCat } =
    useVocaContext();

  const fetchs = useCallback(async () => {
    try {
      let res = await fetch("/voca/cat");
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setVocaCatList([...res]);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [setVocaCatList]);

  useLayoutEffect(() => {
    (async () => {
      await fetchs();
    })();
  }, [fetchs]);

  const list = vocaCatList.map((item) => {
    return <VocaCat key={item.c_catid} className="Item" item={item} />;
  });

  const onChangeHandler = (e) => {
    setVocaCat({ ...vocaCat, [e.target.name]: e.target.value });
  };

  const insertCat = useCallback(async () => {
    try {
      const fetchOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vocaCat),
      };
      let res = await fetch("/voca/cat/insert", fetchOption);
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        alert(res.result);
      }
      setVocaCat({ ...InitCat() });
      fetchs();
      document.querySelector("input[name='c_category']").value = "";
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [setVocaCat, vocaCat, InitCat]);

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
    <main className="Voca">
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
            id="submit"
            onClick={onClickHandler}
            disabled={vocaCat.c_category.length < 1}
          ></button>
        </form>
      </section>
      <section className="cat-list">{list}</section>
    </main>
  );
};

export default VocaCategory;
