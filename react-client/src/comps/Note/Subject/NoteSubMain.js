import { useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    setCatVal({ ...cat });
    setNoteSubList([...sub]);
  }, [cat, sub, setCatVal, setNoteSubList, location.key]);

  const noteList = noteSubList.map((item) => {
    return <NoteSubItem item={item} key={item.s_subid} />;
  });

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
      </section>
      <section
        className="content"
        style={{ display: noteSubList.length !== 0 ? "flex" : "none" }}
      >
        <ul>{noteList}</ul>
      </section>
      <section
        className="no-data"
        style={{ display: noteSubList.length === 0 ? "flex" : "none" }}
      >
        <div className="no-data-img"></div>
        <div className="no-data-msg">새로운 주제를 만들어보세요!</div>
      </section>
    </article>
  );
};
export default NoteSubMain;
