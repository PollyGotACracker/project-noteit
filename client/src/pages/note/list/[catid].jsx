import "@styles/note/list.css";
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { URLS } from "@/router";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import useNoteFetcher from "@services/useNoteFetcher";
import useObserver from "@hooks/useObserver";
import useScrollPosition from "@hooks/useScrollPosition";
import SubItem from "@components/note/subItem";
import SubNoData from "@components/note/subNoData";
import Fallback from "@components/fallback";

const NoteSubPage = () => {
  const listRef = useRef(null);
  const fetchListRef = useRef(null);
  const saveScrollPos = useScrollPosition(listRef);
  const { catId } = useParams();
  const { getCategoryData, getSubjects } = useNoteFetcher();
  const isIntersecting = useObserver(fetchListRef);
  const { data: category } = useQuery(getCategoryData({ catId }));
  const {
    data,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    getSubjects({
      catId,
      queries: {
        getNextPageParam: (lastPage) => {
          if (lastPage.totalPages === lastPage.currentPage) return;
          return lastPage.offset + lastPage.limit;
        },
      },
    })
  );
  const isNoData = isSuccess && data?.pages[0]?.data?.length === 0;

  useEffect(() => {
    if (!isIntersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [isIntersecting]);

  return (
    <Fallback isLoading={isLoading}>
      <main className="Note List">
        <section className="title">
          <div className="category">{category?.c_category}</div>
          <div className="subcount">{`[ ${category?.c_subcount} ]`}</div>
          <Link
            className="insert-btn"
            to={`${URLS.NOTE_WRITE}/${catId}`}
            title="주제 추가"
          >
            <BsFillFileEarmarkPlusFill />
          </Link>
        </section>
        {isNoData ? (
          <SubNoData />
        ) : (
          <ul className="content overflow-list full-list" ref={listRef}>
            {data?.pages.map((page) =>
              page.data.map((item) => (
                <SubItem
                  item={item}
                  key={item.s_subid}
                  savePos={saveScrollPos}
                />
              ))
            )}
          </ul>
        )}
        <div className="load-more" ref={fetchListRef} />
      </main>
    </Fallback>
  );
};
export default NoteSubPage;
