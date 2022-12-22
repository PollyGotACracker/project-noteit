import "../../css/Voca/VocaWrite.css";
import { useState, useCallback } from "react";

const VocaWrite = () => {
  const addInput = () => {
    const input = document.createElement("input");
    const attr = {
      className: "keyword",
      type: "text",
      name: "keyword",
    };
    Object.assign(input, attr);
    return input;
  };
  const [inputs, setInputs] = useState([addInput()]);

  const moreInput = useCallback(() => {
    const input = addInput();
    setInputs([...inputs, input]);
    const parent = document.querySelector("#keyword-box");
    parent.append(...inputs);
  }, [inputs, setInputs]);

  return (
    <main className="Write">
      <form>
        <label htmlFor="category">카테고리</label>
        <input
          id="category"
          value="정보처리기사"
          name="category"
          readOnly={true}
        />
        <label htmlFor="subject">주제</label>
        <input id="subject" name="subject" />
        <label>키워드</label>
        <button id="add-btn" type="button" onClick={moreInput}>
          키워드 추가
        </button>
        <div id="keyword-box">
          <input className="keyword" name="keyword" type="text" />
        </div>
        <label htmlFor="memo">메모</label>
        <textarea id="memo" name="memo" />
        <button id="submit">완료</button>
      </form>
    </main>
  );
};

export default VocaWrite;
