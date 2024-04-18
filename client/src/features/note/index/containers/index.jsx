import style from "./page.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { userState } from "@recoils/user";
import useCategoryFetcher from "../../common/services/useCategoryFetcher";
import useObserver from "@hooks/useObserver";
import useScrollPosition from "@hooks/useScrollPosition";
import Form from "../components/Form";
import Item from "../components/Item";
import cx from "classnames";

export default function NoteList() {
  const listRef = useRef(null);
  const fetchListRef = useRef(null);
  const filterRef = useRef(false);
  const [filterLabel, setFilterLabel] = useState("북마크 노트 보기");
  const isIntersecting = useObserver(fetchListRef);
  const saveScrollPos = useScrollPosition(listRef);
  const { getCategories } = useCategoryFetcher();
  const userData = useRecoilValue(userState);
  const {
    data,
    refetch,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    getCategories({
      userId: userData.u_userid,
      filter: filterRef.current,
      queries: {
        getNextPageParam: (lastPage) => {
          if (lastPage.totalPages === lastPage.currentPage) return;
          return lastPage.offset + lastPage.limit;
        },
      },
    })
  );

  useLayoutEffect(() => {
    refetch();
    if (filterRef.current) setFilterLabel("전체 노트 보기");
    else setFilterLabel("북마크 노트 보기");
  }, [filterRef.current]);

  useEffect(() => {
    if (!isIntersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [isIntersecting]);

  const handleSetFilter = () => {
    filterRef.current = !filterRef.current;
    saveScrollPos(0);
  };

  return (
    <main className={style.main}>
      <div className={style.info}>
        <AiOutlineInfoCircle />
        북마크된 아이템의 키워드는 퀴즈에 표시됩니다.
      </div>
      <ul className={cx(style.list, style.overflow, style.full)} ref={listRef}>
        {data?.pages.map((page) =>
          page.data.map((item) => (
            <Item
              key={item.c_catid}
              className="item"
              item={item}
              savePos={saveScrollPos}
            />
          ))
        )}
        <div className="load_more" ref={fetchListRef} />
      </ul>
      <button className={style.filter} type="button" onClick={handleSetFilter}>
        {filterLabel}
      </button>
      <Form />
    </main>
  );
}
