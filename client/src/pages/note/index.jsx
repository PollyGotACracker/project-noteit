import "@styles/note/note.css";
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { HiFolderPlus } from "react-icons/hi2";
import useNoteFetcher from "@services/useNoteFetcher";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { userState } from "@recoils/user";
import { catState } from "@recoils/note";
import useObserver from "@hooks/useObserver";
import useScrollPosition from "@hooks/useScrollPosition";
import CatItem from "@components/note/catItem";

const NoteIndexPage = () => {
  const listRef = useRef(null);
  const fetchListRef = useRef(null);
  const isIntersecting = useObserver(fetchListRef);
  const saveScrollPos = useScrollPosition(listRef);
  const { getCategories, insertCategory } = useNoteFetcher();
  const userData = useRecoilValue(userState);
  const [newCat, setNewCat] = useRecoilState(catState);
  const resetNewCat = useResetRecoilState(catState);

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      getCategories({
        userId: userData.u_userid,
        queries: {
          getNextPageParam: (lastPage) => {
            if (lastPage.totalPages === lastPage.currentPage) return;
            return lastPage.offset + lastPage.limit;
          },
        },
      })
    );

  const { mutate: insertMutation } = useMutation(insertCategory());

  const changeNewCatTitleHandler = ({ target }) => {
    setNewCat({ ...newCat, [target.name]: target.value });
  };

  const insertCatHandler = (e) => {
    const eventType = e.type;
    const keyCode = e.keyCode;
    if (keyCode === 13 || eventType === "click") {
      e.preventDefault();
      const category = { ...newCat, c_userid: userData.u_userid };
      insertMutation({ category });
      resetNewCat();
    }
  };

  useEffect(() => {
    if (!isIntersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [isIntersecting]);

  return (
    <main className="Note Index">
      <section className="top">
        <div className="title">노트 목록</div>
        <div className="info">
          <AiOutlineInfoCircle />
          북마크된 아이템의 키워드는 퀴즈에 표시됩니다.
        </div>
        <form>
          <input
            name="c_category"
            maxLength={225}
            onChange={changeNewCatTitleHandler}
            onKeyDown={insertCatHandler}
            value={newCat.c_category}
            placeholder="카테고리 추가"
          />
          <button
            type="button"
            id="insert-btn"
            onClick={insertCatHandler}
            disabled={newCat.c_category.length < 1}
          >
            <HiFolderPlus />
          </button>
        </form>
      </section>
      <section className="cat-list" ref={listRef}>
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
      </section>
    </main>
  );
};

export default NoteIndexPage;
