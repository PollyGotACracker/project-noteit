import { useState, useLayoutEffect } from "react";
import { useLoaderData, useParams, Link, useLocation } from "react-router-dom";
import { useNoteContext } from "../../../context/NoteContext";
import "../../../css/Note/NoteSubMain.css";
import NoteSubItem from "./NoteSubItem";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { IoFileTrayFull } from "react-icons/io5";
import { getSubHandler } from "../../../service/note.service";

export const subLoader = async ({ params }) => {
  const catid = params?.catid;
  const { cat, sub } = await getSubHandler(catid);
  return { cat, sub };
};

const NoteSubMain = () => {
  const { cat, sub } = useLoaderData();
  const location = useLocation();
  const { catid } = useParams();
  const { catVal, setCatVal, noteSubList, setNoteSubList } = useNoteContext();
  const [searchValue, setSearchValue] = useState("");

  useLayoutEffect(() => {
    setCatVal({ ...cat });
    setNoteSubList([...sub]);
  }, [cat, sub, location.key]);

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
    <article className="Note Sub">
      <section className="title">
        <div className="category">{catVal.c_category}</div>
        <div className="subcount">
          <IoFileTrayFull />
          {catVal.c_subcount}
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
    </article>
  );
};
export default NoteSubMain;
