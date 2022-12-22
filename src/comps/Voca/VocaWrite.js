import "../../css/Voca/VocaWrite.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { vocaArr } from "../../data/VocaData";

const VocaWrite = () => {
  const { id } = useParams();
  let item;
  if (id) {
    item = vocaArr.filter((ele) => {
      return Number(ele.id) === Number(id);
    });
    item = item[0];
  }
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

  // useCallback(() => {
  //   if (id) {
  //     item = vocaArr.filter((ele) => {
  //       return Number(ele.id) === Number(id);
  //     });
  //     item = item[0];
  //     for (let keyword of item.keyword) {
  //       const input = addInput();
  //       input.value = keyword;
  //       setInputs([...inputs, input]);
  //     }
  //     const parent = document.querySelector("#keyword-box");
  //     console.log(inputs);
  //     parent.append(...inputs);
  //   }
  // }, []);

  return (
    <main className="Write">
      <form>
        <label htmlFor="category">카테고리</label>
        <input
          id="category"
          value={item ? item.category : ""}
          name="category"
          readOnly={true}
        />
        <label htmlFor="subject">주제</label>
        <input id="subject" value={item ? item.subject : ""} name="subject" />
        <label>키워드</label>
        <button id="add-btn" type="button" onClick={moreInput}>
          키워드 추가
        </button>
        <div id="keyword-box">
          <input className="keyword" name="keyword" type="text" />
        </div>
        <label htmlFor="memo">메모</label>
        <textarea id="memo" value={item ? item.memo : ""} name="memo" />
        <button id="submit">완료</button>
      </form>
    </main>
  );
};

export default VocaWrite;
