import { useEffect, useCallback } from "react";
import { useVocaContext } from "../../context/VocaContext.js";
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
  }, []);

  useEffect(() => {
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

  const onKeyDownHandler = () => {};
  const onClickHandler = useCallback(async () => {
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
      console.log(vocaCat);
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, []);

  return (
    <main className="Voca">
      <form>
        <input
          name="c_category"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button
          type="button"
          id="submit"
          onClick={onClickHandler}
          disabled={vocaCat.c_category.length < 1}
        >
          추가
        </button>
      </form>
      <div>{list}</div>
    </main>
  );
};

export default VocaCategory;
