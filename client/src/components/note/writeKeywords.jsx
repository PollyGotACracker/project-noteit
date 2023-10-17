import { MdDelete } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const WriteKeywords = ({ keywordList, setKeywordList }) => {
  /**
   * destructuring 을 이용한 배열 요소 순서 변경
   * 변수의 값을 재할당하는 방식
   * 단, 객체 리터럴일 경우 코드 전체를 소괄호로 묶어야
   * 중괄호를 코드 블록이 아닌 표현식으로 인식
   */
  const moveKeyword = (e, idx) => {
    const value = e.currentTarget.name;
    const _list = [...keywordList];
    if (value === "up") {
      if (idx === 0) return;
      [_list[idx], _list[idx - 1]] = [_list[idx - 1], _list[idx]];
    }
    if (value === "down") {
      if (idx === _list.length - 1) return;
      [_list[idx + 1], _list[idx]] = [_list[idx], _list[idx + 1]];
    }
    setKeywordList([..._list]);
  };

  const onChangeKeyHandler = (e, idx) => {
    const _list = [...keywordList];
    _list[idx][e.target.name] = e.target.value;
    setKeywordList([..._list]);
  };

  const onDeleteKeyHandler = (idx) => {
    const _list = [...keywordList];
    _list.splice(idx, 1);
    setKeywordList([..._list]);
  };

  return (
    <>
      {keywordList?.map((item, idx) => (
        // key 가 고유값이 아니면 input 동작에 영향을 줌
        <div className="keyword-item" key={item.k_keyid}>
          <div className="keyword-btn-box">
            <div className="keyword-index">{idx + 1}</div>
            <button
              className="keyword-delete"
              onClick={() => onDeleteKeyHandler(idx)}
            >
              <MdDelete />
            </button>
          </div>
          <div className="keyword-wrap">
            <label className="keyword-label">
              <input
                className="keyword"
                name="k_keyword"
                defaultValue={item.k_keyword}
                type="text"
                placeholder="키워드 제목"
                maxLength={225}
                autoComplete="false"
                spellCheck="false"
                onChange={(e) => onChangeKeyHandler(e, idx)}
              />
            </label>
            <textarea
              className="desc"
              name="k_desc"
              placeholder="키워드 내용"
              defaultValue={item.k_desc}
              autoComplete="false"
              spellCheck="false"
              onChange={(e) => onChangeKeyHandler(e, idx)}
            />
          </div>
          <div className="keyword-btn-box">
            <button
              className="keyword-up"
              name="up"
              type="button"
              onClick={(e) => moveKeyword(e, idx)}
            >
              <FaCaretUp />
            </button>
            <button
              className="keyword-down"
              name="down"
              type="button"
              onClick={(e) => moveKeyword(e, idx)}
            >
              <FaCaretDown />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default WriteKeywords;
