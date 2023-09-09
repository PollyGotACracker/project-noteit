import "@styles/noteWrite.css";
import { useRef, useState } from "react";
import { useParams, Link, useNavigate, useLoaderData } from "react-router-dom";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getSubDetailHandler } from "@services/note.service";
import { initSub, initKey } from "@data/note";
import Editor from "@libs/editor";

export const writeLoader = async ({ params }) => {
  const catid = params?.catid;
  const subid = params?.subid;
  let subData = {};
  let keyData = [];
  try {
    // category 이름 select
    let res = await fetch(`/server/note/cat/write/${catid}`).then((data) =>
      data.json()
    );
    if (res.error) {
      return alert(res.error);
    } else {
      subData = { s_category: res[0].c_category };
      keyData = [];
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

const NoteWritePage = () => {
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
            required={true}
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
            required={true}
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
      if (idx === 0) return false;
      [_list[idx], _list[idx - 1]] = [_list[idx - 1], _list[idx]];
    }
    if (value === "down") {
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
      let url = `/server/note/sub/insert`;
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
        method = "PATCH";
        url = `/server/note/sub/update`;
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
          required={true}
          name="s_subject"
          onChange={onChangeSubHandler}
          autoComplete="false"
        />
        <section className="keyword-controller">
          <label>키워드</label>
          <div className="keyword-info">
            <AiOutlineInfoCircle />
            <span>
              하나의 키워드를 소괄호 또는 쉼표로 분리하면 복수 정답으로
              인정됩니다.
            </span>
          </div>
          <div id="keyword-box" ref={keyboxRef}>
            {KeywordItem}
          </div>
          <button id="add-keyword" type="button" onClick={addKeyword}>
            키워드 추가
          </button>
        </section>
        <section>
          <label htmlFor="content">메모</label>
          <Editor
            data={noteSub.s_content}
            handler={onChangeContentHandler}
            subid={noteSub.s_subid}
          />
        </section>

        <section className="btn-box">
          <Link
            id="back"
            to={
              subid
                ? `/note/subject/${catid}/${subid}`
                : `/note/category/${catid}`
            }
          >
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

export default NoteWritePage;
