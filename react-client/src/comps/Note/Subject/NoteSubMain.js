import { useState, useLayoutEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useNoteContext } from "../../../context/NoteContext";
import "../../../css/Note/NoteSubMain.css";
import NoteSubItem from "./NoteSubItem";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { IoFileTrayFull } from "react-icons/io5";

const NoteSubMain = () => {
  const { catid } = useParams();
  const { catData, setCatData, noteSubList, setNoteSubList } = useNoteContext();
  const [searchValue, setSearchValue] = useState("");

  const subList = useCallback(async () => {
    try {
      const res = await fetch(`/note/cat/${catid}`);
      const result = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setCatData({ ...result.category[0] });
        setNoteSubList([...result.subList]);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [catid]);

  // 뒤로 가기 시 최신 데이터를 가져오려면?
  useLayoutEffect(() => {
    (async () => {
      await subList();
    })();
  }, [subList]);

  const noteList = noteSubList.map((item) => {
    return <NoteSubItem item={item} key={item.s_subid} />;
  });

  // const searchData = async (value) => {
  //   setSearchValue(value);
  //   const fetchOption = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ value: searchValue, catid: catid }),
  //   };
  //   await fetch(`/note/sub/search`, fetchOption)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setNoteSubList([...data]);
  //     });
  // };

  // useLayoutEffect(() => {
  //   searchData(searchValue);
  // }, [searchValue]);

  // const searchKeyword = (e) => {
  //   if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
  //     searchData(searchValue);
  //   }
  // };

  return (
    <main className="Note Sub">
      <section className="title">
        <div className="category">{catData.c_category}</div>
        <div className="subcount">
          <IoFileTrayFull />
          {catData.c_subcount}
        </div>
        <Link className="insert-btn" to={`/note/write/${catid}`} title="추가">
          <BsFillFileEarmarkPlusFill />
        </Link>
        <form>
          <input
            className="input"
            placeholder="검색어를 입력하세요..."
            onChange={(e) => setSearchValue(e.target.value)}
            // onKeyDown={searchKeyword}
          />
          <button
            className="search"
            title="검색"
            // onClick={searchKeyword}
          ></button>
        </form>
      </section>
      <section className="Note content">
        <ul>{noteList}</ul>
      </section>
    </main>
  );
};
export default NoteSubMain;
