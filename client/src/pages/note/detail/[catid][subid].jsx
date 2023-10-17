import "@styles/note/detail.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { URLS } from "@/router";
import { getClient } from "@services/core";
import useNoteFetcher from "@services/useNoteFetcher";
import DetailMenu from "@components/note/detailMenu";
import DetailKeywords from "@components/note/detailKeywords";
import Fallback from "@components/fallback";

const NoteDetailPage = () => {
  const { getSubjectData } = useNoteFetcher();
  const queryClient = getClient();
  const { catId, subId } = useParams();
  const mutationParams = { queryClient, catId, subId };

  const { data: { subject, keywords } = {}, isLoading } = useQuery(
    getSubjectData({ subId })
  );

  return (
    <Fallback isLoading={isLoading}>
      <main className="Detail">
        <DetailMenu subject={subject} mutationParams={mutationParams} />
        <section className="title">
          <div className="subject">{subject?.s_subject}</div>
          <Link className="category" to={`${URLS.NOTE_LIST}/${catId}`}>
            {subject?.s_category}
          </Link>
        </section>
        {keywords?.length !== 0 && <DetailKeywords keywords={keywords} />}
        <section className="content">
          <div dangerouslySetInnerHTML={{ __html: subject?.s_content }}></div>
        </section>
      </main>
    </Fallback>
  );
};

export default NoteDetailPage;
