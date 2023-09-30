import "@styles/note/note.css";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { HiFolderPlus } from "react-icons/hi2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getClient } from "@services/core";
import { getCategories, insertCategory } from "@services/note.service";
<<<<<<< HEAD
import { catState } from "@recoils/note";
=======
import { userState } from "@recoils/user";
import { cat } from "@recoils/note";
>>>>>>> 8b102f0 (feat: Dashboard today 데이터 추가 및 리팩토링, User 데이터 정리)
import CatItem from "@components/note/catItem";

const NoteIndexPage = () => {
  const userData = useRecoilValue(userState);
  const queryClient = getClient();
<<<<<<< HEAD
  const [newCat, setNewCat] = useRecoilState(catState);
  const resetNewCat = useResetRecoilState(catState);
  const { data: catList = [] } = useQuery(getCategories({ userId }));
=======
  const [newCat, setNewCat] = useRecoilState(cat);
  const resetNewCat = useResetRecoilState(cat);
  const { data: catList = [] } = useQuery(
    getCategories({ userId: userData.u_userid })
  );
>>>>>>> 8b102f0 (feat: Dashboard today 데이터 추가 및 리팩토링, User 데이터 정리)
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
      const category = { ...newCat, c_userid: userData.u_userid };
      insertMutation({ category });
      resetNewCat();
    }
  };

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
      <section className="cat-list">
        {catList?.map((item) => (
          <CatItem key={item.c_catid} className="Item" item={item} />
        ))}
      </section>
    </main>
  );
};

export default NoteIndexPage;
