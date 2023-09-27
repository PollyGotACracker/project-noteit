import "@styles/note/detail.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { URLS } from "@/router";
import { getClient } from "@services/core";
import { getSubjectData } from "@services/note.service";
import DetailMenu from "@components/note/detailMenu";
import DetailKeywords from "@components/note/detailKeywords";

const NoteDetailPage = () => {
  const queryClient = getClient();
  const { catId, subId } = useParams();
  const mutationParams = { queryClient, catId, subId };

  const { data: { subject, keywords } = {} } = useQuery(
    getSubjectData({ subId })
  );

  return (
    <main className="Detail">
      <DetailMenu subject={subject} mutationParams={mutationParams} />
      <section className="title">
        <div className="subject">{subject?.s_subject}</div>
        <Link className="category" to={`${URLS.NOTE_LIST}/${catId}`}>
          {subject?.s_category}
        </Link>
      </section>
      <DetailKeywords subject={subject} keywords={keywords} />
      <section className="content">
        <div dangerouslySetInnerHTML={{ __html: subject?.s_content }}></div>
      </section>
    </main>
  );
};

export default NoteDetailPage;
