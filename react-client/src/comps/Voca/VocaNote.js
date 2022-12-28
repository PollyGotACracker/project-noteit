import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext";
import "../../css/Voca/VocaNote.css";
import VocaList from "./VocaList";

const VocaNote = () => {
  const { catid } = useParams();
  const { vocaSubList, setVocaSubList, clickWriteHandler } = useVocaContext();
  const [catData, setCatData] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const subList = useCallback(async () => {
    try {
      const res = await fetch(`/voca/cat/${catid}`);
      const result = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setCatData({ ...result.category[0] });
        setVocaSubList([...result.subList]);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [catid, setVocaSubList]);

  useEffect(() => {
    (async () => {
      await subList();
    })();
  }, [subList]);

  const vocaList = vocaSubList.map((item) => {
    return <VocaList item={item} key={item.s_subid} />;
  });

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchData = useCallback(async () => {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: searchValue, catid: catid }),
    };
    let res = await fetch(`/voca/sub/search`, fetchOption);
    res = await res.json();
    setVocaSubList([...res]);
  }, [searchValue, catid, setVocaSubList]);

  const onKeyDownHandler = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      if (e.currentTarget.value === "") {
        alert("검색할 내용을 입력하세요");
        return false;
      }
      searchData();
    }
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    if (e.currentTarget.value === "") {
      alert("검색할 내용을 입력하세요");
      return false;
    }
    searchData();
  };

  return (
    <main className="Note">
      <section className="Note title">
        <div className="category">{catData.c_category}</div>
        <div className="length">({catData["f_sub.length"]})</div>
        <Link
          className="insert"
          onClick={clickWriteHandler}
          data-catid={catid}
          title="추가"
        ></Link>
        <form>
          <input
            className="input"
            placeholder="검색어를 입력하세요..."
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
          />
          <button
            className="search"
            title="검색"
            onClick={onClickHandler}
          ></button>
        </form>
      </section>
      <section className="Note content">
        <ul>{vocaList}</ul>
      </section>
    </main>
  );
};
export default VocaNote;
