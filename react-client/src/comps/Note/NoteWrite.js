import "../../css/Note/NoteWrite.css";
import { useRef, useState, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNoteContext } from "../../context/NoteContext";
import { initSub, initKey } from "../../data/NoteData";
import uuid from "react-uuid";
import { MdDelete } from "react-icons/md";

export const writeLoader = () => {};

const NoteWrite = () => {
  const { noteSub, setNoteSub } = useNoteContext();
  const keyboxRef = useRef(null);
  const { catid, subid } = useParams();
  const navigate = useNavigate();
  const [keywordList, setKeywordList] = useState([]);
  const [keyIndex, setKeyIndex] = useState(1);
  const [keyMap] = useState(new Map());

  const KeywordItem = (key = {}) => {
    const id = key?.k_keyid || uuid().substring(0, 8);
    // subid 는 수정 시 subject 의 id
    keyMap.set(id, {
      ...initKey(),
      k_keyid: id,
      k_subid: subid || noteSub.s_subid,
      k_index: key?.k_index || keyIndex,
      k_keyword: key?.k_keyword,
      k_desc: key?.k_desc,
    });
    // 요소 추가 이후 실행됨
    setKeyIndex(keyIndex + 1);
    return (
      <div className="keyword-item" key={id}>
        {id}
        <div className="head-keyword">
          <div className="keyword-index">{keyMap.get(id).k_index}</div>
          <button id="keyword-delete">
            <MdDelete />
          </button>
        </div>
        <div className="wrap-keyword">
          <input
            className="keyword"
            name={id}
            value={keyMap.get(id).k_keyword}
            type="text"
            autoFocus
            autoComplete="false"
            spellCheck="false"
            onChange={onChangeKeyHandler}
          />
          <textarea
            className="desc"
            name={id}
            value={keyMap.get(id).k_desc}
            autoComplete="false"
            spellCheck="false"
            onChange={onChangeKeyHandler}
          />
        </div>
      </div>
    );
  };

  // keywordItem 추가
  const addKeyword = () => {
    const item = KeywordItem();
    setKeywordList([...keywordList, item]);
  };

  // fetch
  const fetchs = async () => {
    try {
      let res = await fetch(`/note/cat/write/${catid}`);
      res = await res.json();
      if (res.error) {
        return alert(res.error);
      } else {
        // noteSub 에 category 추가 및 해당 태그에 데이터 표시
        setNoteSub({ ...initSub(), s_category: res[0].c_category });
      }
      // path 에 subid 가 있을 경우(UPDATE)
      if (subid) {
        let res = await fetch(`/note/sub/${subid}`);
        res = await res.json();
        if (res.error) {
          alert(res.error);
        } else {
          setNoteSub({ ...initSub(), ...res.subject[0] });
          for (let key of res.keywords) {
            keyMap.set(key.k_keyid, key);
          }
          return 1;
        }
      }
      return 0;
    } catch (error) {
      console.log(error);
      return alert("서버 연결에 문제가 발생했습니다.");
    }
  };

  useLayoutEffect(() => {
    (async () => {
      const result = await fetchs();
      if (result === 1) {
        const keys = Array.from(keyMap.values());
        const item = keys.map((key) => KeywordItem(key));
        setKeywordList([...item]);
        setKeyIndex(keys.length + 1);
      }
    })();
  }, []);

  const onChangeSubHandler = (e) => {
    setNoteSub({ ...noteSub, [e.target.name]: e.target.value });
  };

  const onChangeKeyHandler = (e) => {
    const key = e.target.name;
    let subKey;
    if (e.target.tagName === "INPUT") subKey = "k_keyword";
    if (e.target.tagName === "TEXTAREA") subKey = "k_desc";
    keyMap.set(key, {
      ...keyMap.get(key),
      [subKey]: e.target.value,
    });
    console.log("전체 키워드", keyMap);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let method = "POST";
      let url = `/note/sub/insert`;
      let subjects = { ...noteSub, s_catid: catid };
      let keywords = Array.from(keyMap.values());
      if (subid) {
        method = "PUT";
        url = `/note/sub/update`;
        subjects = { ...noteSub, s_subid: subid };
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
    navigate(`/note/subject/${catid}/${noteSub.s_subid}`, { replace: true });
  };

  return (
    <main className="Write">
      <form>
        <label htmlFor="category">카테고리</label>
        <input
          id="category"
          name="s_category"
          value={noteSub.s_category}
          readOnly={true}
          onChange={onChangeSubHandler}
        />
        <label htmlFor="subject">주제</label>
        <input
          id="subject"
          value={noteSub.s_subject || ""}
          name="s_subject"
          onChange={onChangeSubHandler}
          autoComplete="false"
        />
        <section className="keyword-controller">
          <label>키워드</label>
          <div id="keyword-box" ref={keyboxRef}>
            {keywordList}
          </div>
          <button id="add-keyword" type="button" onClick={addKeyword}>
            키워드 추가
          </button>
        </section>
        <section>
          {/* ckeditor 로 교체 */}
          <label htmlFor="content">메모</label>
          <textarea
            id="content"
            name="s_content"
            value={noteSub.s_content || ""}
            autoComplete="false"
            onChange={onChangeSubHandler}
          />
        </section>

        <section className="btn-box">
          <Link id="back" to={`/note/subject/${catid}/${subid}`}>
            뒤로
          </Link>
          <button type="button" id="submit" onClick={submitHandler}>
            등록
          </button>
        </section>
      </form>
    </main>
  );
};

export default NoteWrite;
