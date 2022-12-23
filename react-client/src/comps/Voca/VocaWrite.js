import "../../css/Voca/VocaWrite.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { vocaArr } from "../../data/VocaData";

const VocaWrite = () => {
  const { catid, subid } = useParams();

  const addInput = () => {
    const input = document.createElement("input");
    const attr = {
      className: "keyword",
      type: "text",
      name: "s_keyword",
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
    const inputList = parent.childNodes;
    inputList[inputList.length - 1].focus();
  }, [inputs, setInputs]);

  // useEffect() 가 뭔지는 알겠는데 어떻게 써야하는지 모르겠다.
  // useEffect 내에서 console, 이후 밖에서 console 을 찍으면
  // 밖에 있는 console 이 먼저 실행되고, useEffect 는 rendering 이후 실행되므로 console 이 나중에 실행된다.
  // 그래서 전역변수로 값이 들어오지 않는 것 같아요?

  let item = vocaArr.filter((ele) => {
    return Number(ele.id) === Number(subid);
  });
  item = item[0];
  useEffect(() => {
    if (subid) {
      let keywords = item.keyword;
      keywords = Array.from(keywords);
      keywords = keywords.map((keyword) => {
        const input = addInput();
        input.value = keyword;
        return input;
      });
      const parent = document.querySelector("#keyword-box");
      parent.prepend(...keywords);
    }
  }, []);

  return (
    <main className="Write">
      <form>
        <label htmlFor="category">카테고리</label>
        <input
          id="category"
          value={subid ? item.category : ""}
          name="s_category"
          readOnly={true}
        />
        <label htmlFor="subject">주제</label>
        <input
          id="subject"
          value={subid ? item.subject : ""}
          name="s_subject"
        />
        <label>키워드</label>
        <div id="keyword-box">
          <input className="keyword" name="s_keyword" type="text" />
        </div>
        <button id="add-btn" type="button" onClick={moreInput}>
          키워드 추가
        </button>
        <label htmlFor="memo">메모</label>
        <textarea id="memo" value={subid ? item.memo : ""} name="s_memo" />
        <button id="submit">완료</button>
      </form>
    </main>
  );
};

export default VocaWrite;
