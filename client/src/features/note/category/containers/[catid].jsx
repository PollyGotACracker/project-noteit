import style from "./page.module.css";
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { URLS } from "@/router";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import useSubjectFetcher from "../../common/services/useSubjectFetcher";
import useObserver from "@hooks/useObserver";
import useScrollPosition from "@hooks/useScrollPosition";
import Item from "../components/Item";
import Fallback from "@components/fallback/Fallback";
import NoContent from "@components/noContent/NoContent";
import cx from "classnames";

export default function NoteCategory() {
  const listRef = useRef(null);
  const fetchListRef = useRef(null);
  const saveScrollPos = useScrollPosition(listRef);
  const { catId } = useParams();
  const { getCategoryData, getSubjects } = useSubjectFetcher();
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
      <main>
        <section className={style.top}>
          <div className={style.category}>{category?.c_category}</div>
          <div className={style.subcount}>{`[ ${category?.c_subcount} ]`}</div>
          <Link
            className={style.insert}
            to={`${URLS.NOTE_WRITE}/${catId}`}
            title="주제 추가"
          >
            <BsFillFileEarmarkPlusFill />
          </Link>
        </section>
        {isNoData ? (
          <NoContent isFull={true} msg="새로운 주제를 만들어보세요!" />
        ) : (
          <ul
            className={cx(style.list, style.overflow, style.full)}
            ref={listRef}
          >
            {data?.pages.map((page) =>
              page.data.map((item) => (
                <Item item={item} key={item.s_subid} savePos={saveScrollPos} />
              ))
            )}
          </ul>
        )}
        <div className="load_more" ref={fetchListRef} />
      </main>
    </Fallback>
  );
}
