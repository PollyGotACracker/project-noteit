import style from "./page.module.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { URLS } from "@/router";
import { queryClient } from "@services/core";
import useSubjectFetcher from "../../common/services/useSubjectFetcher";
import Menu from "../components/Menu";
import Keywords from "../components/Keywords";
import Fallback from "@components/fallback/Fallback";

export default function NoteSubject() {
  const { getSubjectData } = useSubjectFetcher();
  const { catId, subId } = useParams();
  const mutationParams = { queryClient, catId, subId };

  const { data: { subject, keywords } = {}, isLoading } = useQuery(
    getSubjectData({ subId })
  );

  return (
    <Fallback isLoading={isLoading}>
      <main className={style.main}>
        <Menu subject={subject} mutationParams={mutationParams} />
        <section className={style.title}>
          <div className={style.subject}>{subject?.s_subject}</div>
          <Link
            className={style.category}
            to={`${URLS.NOTE_CATEGORY}/${catId}`}
          >
            {subject?.s_category}
          </Link>
        </section>
        {keywords?.length !== 0 && <Keywords keywords={keywords} />}
        <section>
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: subject?.s_content }}
          ></div>
        </section>
      </main>
    </Fallback>
  );
}
