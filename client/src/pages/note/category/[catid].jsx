import "@styles/noteSubject.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { IoFileTrayFull } from "react-icons/io5";
import { useNoteContext } from "@contexts/noteContext";
import { getSubHandler } from "@services/note.service";
import { ReactComponent as NoDataSvg } from "@assets/images/no_data.svg";
import SubItem from "@components/note/subItem";

const NoteSubPage = () => {
  const { catid } = useParams();
  const { catVal, setCatVal, noteSubList, setNoteSubList } = useNoteContext();

  useEffect(() => {
    (async () => {
      if (catid) {
        const { cat, sub } = await getSubHandler(catid);
        setCatVal({ ...cat });
        setNoteSubList([...sub]);
      }
    })();
  }, [catid]);

  const noteList = noteSubList.map((item) => {
    return <SubItem item={item} key={item.s_subid} />;
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
          주제 추가
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
        <NoDataSvg
          className="no-data-img"
          fill={getComputedStyle(document.documentElement).getPropertyValue(
            "--primary"
          )}
        />
        <div className="no-data-msg">새로운 주제를 만들어보세요!</div>
      </section>
    </article>
  );
};
export default NoteSubPage;
