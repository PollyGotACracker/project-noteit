import style from "./keywords.module.css";
import { MdDelete } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function Keywords({ keywordList, setKeywordList }) {
  /**
   * destructuring 을 이용한 배열 요소 순서 변경
   * 변수의 값을 재할당하는 방식
   * 단, 객체 리터럴일 경우 코드 전체를 소괄호로 묶어야
   * 중괄호를 코드 블록이 아닌 표현식으로 인식
   */

  return (
    <>
      {keywordList?.map((item, index) => (
        <div className={style.keyword_item} key={item.k_keyid}>
          <DeleteButtonBox
            index={index}
            keywordList={keywordList}
            setKeywordList={setKeywordList}
          />
          <Item
            index={index}
            item={item}
            keywordList={keywordList}
            setKeywordList={setKeywordList}
          />
          <UpDownButtonBox
            index={index}
            keywordList={keywordList}
            setKeywordList={setKeywordList}
          />
        </div>
      ))}
    </>
  );
}

function DeleteButtonBox({ index, keywordList, setKeywordList }) {
  const handleDelete = (index) => {
    const _list = [...keywordList];
    _list.splice(index, 1);
    setKeywordList([..._list]);
  };

  return (
    <div className={style.button_box}>
      <div className={style.index}>{index + 1}</div>
      <button className={style.delete} onClick={() => handleDelete(index)}>
        <MdDelete />
      </button>
    </div>
  );
}

function Item({ index, item, keywordList, setKeywordList }) {
  const handleSetKeyword = (e, index) => {
    const _list = [...keywordList];
    _list[index][e.target.name] = e.target.value;
    setKeywordList([..._list]);
  };

  return (
    <div className={style.item}>
      <label className={style.label}>
        <input
          className={style.keyword}
          name="k_keyword"
          defaultValue={item.k_keyword}
          type="text"
          placeholder="키워드 제목"
          maxLength={225}
          autoComplete="false"
          spellCheck="false"
          onChange={(e) => handleSetKeyword(e, index)}
        />
      </label>
      <textarea
        className={style.description}
        name="k_desc"
        placeholder="키워드 내용"
        defaultValue={item.k_desc}
        autoComplete="false"
        spellCheck="false"
        onChange={(e) => handleSetKeyword(e, index)}
      />
    </div>
  );
}

function UpDownButtonBox({ index, keywordList, setKeywordList }) {
  const handleMoveKeyword = (e, index) => {
    const target = e.currentTarget.name;
    const _list = [...keywordList];
    if (target === "up") {
      if (index === 0) return;
      [_list[index], _list[index - 1]] = [_list[index - 1], _list[index]];
    }
    if (target === "down") {
      if (index === _list.length - 1) return;
      [_list[index + 1], _list[index]] = [_list[index], _list[index + 1]];
    }
    setKeywordList([..._list]);
  };

  return (
    <div className={style.button_box}>
      <button
        className={style.up}
        name="up"
        type="button"
        onClick={(e) => handleMoveKeyword(e, index)}
      >
        <FaCaretUp />
      </button>
      <button
        className={style.down}
        name="down"
        type="button"
        onClick={(e) => handleMoveKeyword(e, index)}
      >
        <FaCaretDown />
      </button>
    </div>
  );
}
