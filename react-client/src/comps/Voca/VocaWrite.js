import "../../css/Voca/VocaWrite.css";
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext.js";

const VocaWrite = () => {
  const { catid, subid } = useParams();
  const { vocaSub, setVocaSub } = useVocaContext();

  // input 생성
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

  // input 추가
  const moreInput = useCallback(() => {
    const input = addInput();
    setInputs([...inputs, input]);
    const parent = document.querySelector("#keyword-box");
    parent.append(...inputs);
    const inputList = parent.childNodes;
    inputList[inputList.length - 1].focus();
  }, [inputs, setInputs]);

  // fetch
  const fetchs = useCallback(async () => {
    try {
      let res = await fetch(`/voca/cat/write/${catid}`);
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        document.querySelector("#category").value = res[0].c_category;
      }
      // path 에 subid 가 있을 경우(UPDATE)
      if (subid) {
        let res = await fetch(`/voca/sub/${subid}`);
        res = await res.json();
        if (res.error) {
          alert(res.error);
        } else {
          setVocaSub({ ...res.subject[0] });
          let keywords = res.keywords;
          keywords = keywords.map((keyword) => {
            const input = addInput();
            input.value = keyword.k_keyword;
            console.log(input);
            return input;
          });
          const parent = document.querySelector("#keyword-box");
          parent.prepend(...keywords);
        }
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [catid, setVocaSub, subid]);

  useEffect(() => {
    (async () => {
      await fetchs();
    })();
  }, [fetchs]);

  // useEffect 내에서 console, 이후 밖에서 console 을 찍으면
  // 밖에 있는 console 이 먼저 실행되고, useEffect 는 rendering 이후 실행되므로 console 이 나중에 실행된다.

  // change event 가 없으면 값이 추가가 안됨
  const onChangeHandler = (e) => {
    setVocaSub({ ...vocaSub, [e.target.name]: e.target.value });
  };

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const category = document.querySelector("#category").value;
        const keyInputs = Array.from(document.querySelectorAll(".keyword"));
        const keywordList = keyInputs
          .map((input) => {
            if (input.value !== "") {
              return input.value;
            }
          })
          .filter((value) => value);
        let method = "POST";
        let url = `/voca/sub/insert`;
        let subjects = { ...vocaSub, s_catid: catid, s_category: category };
        let keywords = keywordList;
        if (subid) {
          method = "PUT";
          url = `/voca/sub/update`;
          subjects = { ...vocaSub, s_subid: subid };
        }
        const fetchOption = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjects, keywords }),
        };
        let res = await fetch(url, fetchOption);
        res = await res.json();
        alert(res.result);
      } catch (error) {
        console.log(error);
        alert("서버에 문제가 발생했습니다.\n다시 시도해주세요.");
      }
      window.location.href = `/voca/subject/${catid}/${vocaSub.s_subid}`;
    },
    [vocaSub, catid, subid]
  );

  return (
    <main className="Write">
      <form>
        <label htmlFor="category">카테고리</label>
        <input
          id="category"
          name="s_category"
          readOnly={true}
          onChange={onChangeHandler}
        />
        <label htmlFor="subject">주제</label>
        <input
          id="subject"
          value={vocaSub.s_subject || ""}
          name="s_subject"
          onChange={onChangeHandler}
          autoComplete="false"
        />
        <div className="keyword-controller">
          <label>키워드</label>
          <button id="add-keyword" type="button" onClick={moreInput}>
            키워드 추가
          </button>
        </div>
        <div id="keyword-box">
          <input
            className="keyword"
            name="keyword"
            type="text"
            onChange={onChangeHandler}
          />
        </div>
        <label htmlFor="content">메모</label>
        <textarea
          id="content"
          value={vocaSub.s_content || ""}
          name="s_content"
          onChange={onChangeHandler}
          spellCheck="false"
          autoComplete="false"
        />
        <div className="attach-box">
          <label htmlFor="attach">첨부</label>
          <input
            type="file"
            id="attach"
            name="attach"
            accept="image/*"
            multiple
          />
        </div>
        <div className="btn-box">
          <Link id="back" to={`/voca/subject/${catid}/${subid}`}>
            뒤로
          </Link>
          <button type="button" id="submit" onClick={submitHandler}>
            등록
          </button>
        </div>
      </form>
    </main>
  );
};

export default VocaWrite;
