import "@styles/note/note.css";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { userState } from "@recoils/user";
import useNoteFetcher from "@services/useNoteFetcher";
import useObserver from "@hooks/useObserver";
import useScrollPosition from "@hooks/useScrollPosition";
import CatInsert from "@components/note/catInsert";
import CatItem from "@components/note/catItem";

const NoteIndexPage = () => {
  const listRef = useRef(null);
  const fetchListRef = useRef(null);
  const filterRef = useRef(false);
  const [filterLabel, setFilterLabel] = useState("북마크 노트 보기");
  const isIntersecting = useObserver(fetchListRef);
  const saveScrollPos = useScrollPosition(listRef);
  const { getCategories } = useNoteFetcher();
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

  useEffect(() => {
    refetch();
    if (filterRef.current) setFilterLabel("전체 노트 보기");
    else setFilterLabel("북마크 노트 보기");
  }, [filterRef.current]);

  useEffect(() => {
    if (!isIntersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [isIntersecting]);

  const setFilterHandler = () => {
    filterRef.current = !filterRef.current;
    saveScrollPos(0);
  };

  return (
    <main className="Note Index">
      <ul className="cat-list" ref={listRef}>
        <div className="info">
          <AiOutlineInfoCircle />
          북마크된 아이템의 키워드는 퀴즈에 표시됩니다.
        </div>
        {data?.pages.map((page) =>
          page.data.map((item) => (
            <CatItem
              key={item.c_catid}
              className="Item"
              item={item}
              savePos={saveScrollPos}
            />
          ))
        )}
        <div className="load-more" ref={fetchListRef} />
      </ul>
      <button className="filter-btn" type="button" onClick={setFilterHandler}>
        {filterLabel}
      </button>
      <CatInsert />
    </main>
  );
};

export default NoteIndexPage;
