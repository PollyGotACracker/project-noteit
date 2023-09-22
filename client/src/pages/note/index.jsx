import "@styles/note/note.css";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";
import { HiFolderPlus } from "react-icons/hi2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getClient } from "@services/core";
import { getCategories, insertCategory } from "@services/note.service";
import { catState } from "@recoils/note";
import CatItem from "@components/note/catItem";

const NoteIndexPage = () => {
  const userId = "polly@gmail.com";
  const queryClient = getClient();
  const [newCat, setNewCat] = useRecoilState(catState);
  const resetNewCat = useResetRecoilState(catState);
  const { data: catList = [] } = useQuery(getCategories({ userId }));
  const { mutate: insertMutation } = useMutation(
    insertCategory({ queryClient })
  );

  const changeNewCatTitleHandler = ({ target }) => {
    setNewCat({ ...newCat, [target.name]: target.value });
  };

  const insertCatHandler = (e) => {
    const eventType = e.type;
    const keyCode = e.keyCode;
    if (keyCode === 13 || eventType === "click") {
      e.preventDefault();
      const category = { ...newCat, c_userid: userId };
      insertMutation({ category });
      resetNewCat();
    }
  };

  return (
    <article className="Note Index">
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
      <section className="cat-list">
        {catList?.map((item) => (
          <CatItem key={item.c_catid} className="Item" item={item} />
        ))}
      </section>
    </article>
  );
};

export default NoteIndexPage;
