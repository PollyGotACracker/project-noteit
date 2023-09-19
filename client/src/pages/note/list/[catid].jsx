import "@styles/note/list.css";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { URLS } from "@/router";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { IoFileTrayFull } from "react-icons/io5";
import { getSubjects } from "@services/note.service";
import SubItem from "@components/note/subItem";
import SubNoData from "@components/note/subNoData";

const NoteSubPage = () => {
  const { catId } = useParams();
  const { data: { category, subjects } = {}, isLoading } = useQuery(
    getSubjects({ catId })
  );
  const isNoData = !isLoading && subjects.length === 0;

  return (
    <article className="Note List">
      <section className="title">
        <div className="category">{category?.c_category}</div>
        <div className="subcount">
          <IoFileTrayFull />
          {category?.c_subcount}
        </div>
        <Link
          className="insert-btn"
          to={`${URLS.NOTE_WRITE}/${catId}`}
          title="추가"
        >
          <BsFillFileEarmarkPlusFill />
          주제 추가
        </Link>
      </section>
      <section className="content">
        {isNoData ? (
          <SubNoData />
        ) : (
          <ul>
            {subjects?.map((item) => (
              <SubItem item={item} key={item.s_subid} />
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};
export default NoteSubPage;
