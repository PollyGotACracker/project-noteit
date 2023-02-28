import "../../css/Voca/VocaWrite.css";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useVocaContext } from "../../context/VocaContext.js";
import uuid from "react-uuid";
import { MdDelete } from "react-icons/md";

export const writeLoader = () => {};

const VocaWrite = () => {
  const keyboxRef = useRef(null);
  const { catid, subid } = useParams();
  const navigate = useNavigate();
  const { vocaSub, setVocaSub, vocaKey, setVocaKey, InitKey } =
    useVocaContext();
  const [keywordList, setKeywordList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [keyIndex, setKeyIndex] = useState(1);
  const [keyMap, setKeyMap] = useState(new Map());

  const KeywordItem = (key = {}) => {
    setKeyIndex(keyIndex + 1);
    const id = key?.k_keyid || uuid().substring(0, 8);
    // subid 는 수정 시 subject 의 id
    keyMap.set(id, {
      ...InitKey(),
      k_keyid: id,
      k_subid: subid || vocaSub.s_subid,
    });

    return (
      <div className="keyword-item" key={id}>
        <div className="head-keyword">
          <div className="keyword-index">{keyIndex}</div>
          <button id="keyword-delete">
            <MdDelete />
          </button>
        </div>
        <div className="wrap-keyword">
          <input
            className="keyword"
            name={id}
            value={key?.k_keyword || ""}
            type="text"
            autoFocus
            autoComplete="false"
            spellCheck="false"
            onChange={onChangeKeyHandler}
          />
          <textarea
            className="desc"
            name={id}
            value={key?.k_desc || ""}
            autoComplete="false"
            spellCheck="false"
            onChange={onChangeKeyHandler}
          />
        </div>
      </div>
    );
  };

  // keywordItem 추가
  const addKeyword = useCallback(() => {
    const item = KeywordItem();
    setKeywordList([...keywordList, item]);
  }, [keywordList, setKeywordList]);

  const OnChangeAttHandler = useCallback(
    (e) => {
      const fileData = Array.from(e.target.files);
      console.log(fileData);
      const uploadFiles = fileData.map((file) => {
        const item = {
          url: URL.createObjectURL(file),
          a_original_name: file.name,
          a_ext: file.type,
        };
        return item;
      });
      console.log(uploadFiles);
      setFileList([...uploadFiles]);
    },
    [fileList]
  );

  // fetch
  const fetchs = useCallback(async () => {
    try {
      let res = await fetch(`/voca/cat/write/${catid}`);
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        // vocaSub 에 category 추가 및 해당 태그에 데이터 표시
        setVocaSub({ ...vocaSub, s_category: res[0].c_category });
      }
      // path 에 subid 가 있을 경우(UPDATE)
      if (subid) {
        let res = await fetch(`/voca/sub/${subid}`);
        res = await res.json();
        if (res.error) {
          alert(res.error);
        } else {
          setVocaSub({ ...res.subject[0] });
          return { keys: res.keywords };
        }
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, [catid, setVocaSub, subid]);

  useLayoutEffect(() => {
    (async () => {
      const { keys } = await fetchs();
      console.log(keys);
      const item = keys.map((key) => KeywordItem(key));
      setKeywordList([...item]);
    })();
  }, []);

  // useEffect 내에서 console, 이후 밖에서 console 을 찍으면
  // 밖에 있는 console 이 먼저 실행되고, useEffect 는 rendering 이후 실행되므로 console 이 나중에 실행된다.

  const onChangeSubHandler = (e) => {
    setVocaSub({ ...vocaSub, [e.target.name]: e.target.value });
  };

  const onChangeKeyHandler = (e) => {
    const key = e.target.name;
    let subKey;
    if (e.target.tagName === "INPUT") subKey = "k_keyword";
    if (e.target.tagName === "TEXTAREA") subKey = "k_desc";
    keyMap.set(key, {
      ...keyMap.get(`${key}`),
      [subKey]: e.target.value,
    });
    console.log("전체 키워드", keyMap);
  };

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let method = "POST";
        let url = `/voca/sub/insert`;
        let subjects = { ...vocaSub, s_catid: catid };
        let keywords = Array.from(keyMap.values());
        // files 가 빈 배열로 뜸
        let files = fileList;
        if (subid) {
          method = "PUT";
          url = `/voca/sub/update`;
          subjects = { ...vocaSub, s_subid: subid };
        }
        const fetchOption = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjects, keywords, files }),
        };
        let res = await fetch(url, fetchOption);
        res = await res.json();
        alert(res.result);
      } catch (error) {
        console.log(error);
        alert("서버에 문제가 발생했습니다.\n다시 시도해주세요.");
      }
      navigate(`/voca/subject/${catid}/${vocaSub.s_subid}`, { replace: true });
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
          value={vocaSub.s_category}
          readOnly={true}
          onChange={onChangeSubHandler}
        />
        <label htmlFor="subject">주제</label>
        <input
          id="subject"
          value={vocaSub.s_subject || ""}
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
            autoComplete="false"
            onChange={onChangeSubHandler}
          />
        </section>
        <section className="attach-box">
          <label htmlFor="attach">첨부</label>
          <input
            type="file"
            id="attach"
            name="attach"
            accept="image/*"
            multiple
            onChange={OnChangeAttHandler}
          />
        </section>
        <section className="btn-box">
          <Link id="back" to={`/voca/subject/${catid}/${subid}`}>
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

export default VocaWrite;
