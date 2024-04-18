import style from "./form.module.css";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { HiFolderPlus } from "react-icons/hi2";
import { userState } from "@recoils/user";
import { catState } from "../recoils/note";
import useCategoryFetcher from "../../common/services/useCategoryFetcher";

export default function Form() {
  const { insertCategory } = useCategoryFetcher();
  const userData = useRecoilValue(userState);
  const [newCat, setNewCat] = useRecoilState(catState);
  const resetNewCat = useResetRecoilState(catState);

  const { mutate: insertMutation } = useMutation(insertCategory());

  const handleSetNewCat = ({ target }) => {
    setNewCat({ ...newCat, [target.name]: target.value });
  };

  const handleAddCat = (e) => {
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
    <form className={style.category_add}>
      <input
        className={style.translucent}
        name="c_category"
        maxLength={30}
        onChange={handleSetNewCat}
        onKeyDown={handleAddCat}
        value={newCat.c_category}
        spellCheck={false}
        placeholder="노트 추가"
      />
      <button
        type="button"
        className={style.insert}
        onClick={handleAddCat}
        disabled={newCat.c_category.length < 1}
      >
        <HiFolderPlus />
      </button>
    </form>
  );
}
