import EditorModule from "./EditorModule";
import "../../css/Note/NoteWrite.css";
import "../../css/Note/Content.css";
import moment from "moment";
import { useRef, useState, useLayoutEffect } from "react";
import { useParams, Link, useNavigate, useLoaderData } from "react-router-dom";
import { initSub, initKey } from "../../data/NoteData";
import { MdDelete } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { getSubDetailHandler } from "../../service/note.service";

export const writeLoader = async ({ params }) => {
  const catid = params?.catid;
  const subid = params?.subid;
  let subData = {};
  let keyData = [];
  try {
    // category 이름 select
    let res = await fetch(`/note/cat/write/${catid}`).then((data) =>
      data.json()
    );
    if (res.error) {
      return alert(res.error);
    } else {
      subData = { s_category: res[0].c_category };
      keyData = [{ ...initKey() }];
    }

    // path 에 subid 가 있을 경우(UPDATE)
    if (subid) {
      const res = await getSubDetailHandler(subid);
      if (res) {
        subData = {
          ...res.data,
          s_date: moment().format("YYYY[-]MM[-]DD"),
        };
        keyData = res.keys;
      }
    }
    return { subData, keyData };
  } catch (error) {
    console.log(error);
    return alert("서버 연결에 문제가 발생했습니다.");
  }
};

const NoteWrite = () => {
  const { subData, keyData } = useLoaderData();
  const keyboxRef = useRef(null);
  const { catid, subid } = useParams();
  const nav = useNavigate();
  const [noteSub, setNoteSub] = useState({ ...initSub(), ...subData });
  const [keywordList, setKeywordList] = useState([...keyData]);

  const KeywordItem = keywordList.map((item, idx) => {
    // key 가 고유값이 아니면 input 동작에 영향을 줌
    return (
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
          <input
            className="keyword"
            name="k_keyword"
            defaultValue={item.k_keyword}
            type="text"
            placeholder="키워드 제목"
            autoFocus
            maxLength={225}
            autoComplete="false"
            spellCheck="false"
            onChange={(e) => onChangeKeyHandler(e, idx)}
          />
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
    );
  });

  // keywordItem 추가
  const addKeyword = () => {
    setKeywordList([...keywordList, initKey()]);
  };

  const moveKeyword = (e, idx) => {
    const value = e.currentTarget.name;
    const _list = [...keywordList];
    if (value === "up") {
      if (idx === 0) return false;
      [_list[idx], _list[idx - 1]] = [_list[idx - 1], _list[idx]];
    } else if (value === "down") {
      if (idx === _list.length - 1) return false;
      [_list[idx + 1], _list[idx]] = [_list[idx], _list[idx + 1]];
    }
    setKeywordList([..._list]);
  };

  const onChangeSubHandler = (e) => {
    setNoteSub({ ...noteSub, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setNoteSub({ ...noteSub, s_content: data });
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

  const submitHandler = async () => {
    try {
      let method = "POST";
      let url = `/note/sub/insert`;
      let subjects = { ...noteSub, s_catid: catid };

      const keywords = keywordList.map((key, idx) => {
        key.k_subid = noteSub.s_subid;
        key.k_index = idx + 1;
        return key;
      });

      const images = document?.querySelectorAll(".ck-content img");
      if (images) {
        const imageArr = Array?.from(images).map((item) => {
          const index = item?.src?.lastIndexOf("/");
          const url = item?.src?.slice(index + 1);
          return url;
        });
        subjects = {
          ...subjects,
          s_thumb: imageArr[0],
          s_attachs: `${imageArr}`,
        };
      }

      if (subid) {
        method = "PUT";
        url = `/note/sub/update`;
        subjects = { ...subjects, s_subid: subid };
      }

      const fetchOption = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects, keywords }),
      };

      let res = await fetch(url, fetchOption).then((data) => data.json());
      alert(res.result);
      nav(`/note/subject/${catid}/${noteSub.s_subid}`, { replace: true });
    } catch (error) {
      console.log(error);
      alert("서버에 문제가 발생했습니다.\n다시 시도해주세요.");
    }
  };

  return (
    <article className="Write">
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
            {KeywordItem}
          </div>
          <button id="add-keyword" type="button" onClick={addKeyword}>
            키워드 추가
          </button>
        </section>
        <section>
          <label htmlFor="content">메모</label>
          <EditorModule
            data={noteSub.s_content}
            handler={onChangeContentHandler}
            subid={noteSub.s_subid}
          />
        </section>

        <section className="btn-box">
          {/* INSERT 시에는 subid 없어야 */}
          <Link id="back" to={`/note/subject/${catid}/${subid}`}>
            뒤로
          </Link>
          <button type="button" id="submit" onClick={submitHandler}>
            등록
          </button>
        </section>
      </form>
    </article>
  );
};

export default NoteWrite;
