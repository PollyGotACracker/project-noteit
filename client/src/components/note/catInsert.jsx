import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { HiFolderPlus } from "react-icons/hi2";
import { userState } from "@recoils/user";
import { catState } from "@recoils/note";
import useNoteFetcher from "@services/useNoteFetcher";

const CatInsert = () => {
  const { insertCategory } = useNoteFetcher();
  const userData = useRecoilValue(userState);
  const [newCat, setNewCat] = useRecoilState(catState);
  const resetNewCat = useResetRecoilState(catState);

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

  return (
    <form>
      <input
        name="c_category"
        maxLength={30}
        onChange={changeNewCatTitleHandler}
        onKeyDown={insertCatHandler}
        value={newCat.c_category}
        spellCheck={false}
        placeholder="노트 추가"
      />
      <button
        type="button"
        className="insert-btn"
        onClick={insertCatHandler}
        disabled={newCat.c_category.length < 1}
      >
        <HiFolderPlus />
      </button>
    </form>
  );
};

export default CatInsert;
