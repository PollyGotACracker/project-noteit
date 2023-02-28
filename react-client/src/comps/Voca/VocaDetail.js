import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import "../../css/Voca/VocaDetail.css";
import { useVocaContext } from "../../context/VocaContext";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { MdDelete, MdPictureAsPdf } from "react-icons/md";
import { RiBookmarkLine, RiBookmarkFill, RiGoogleFill } from "react-icons/ri";
import {
  FaTags,
  FaPenAlt,
  FaClipboard,
  FaClipboardCheck,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";

export const detailLoader = async ({ params }) => {
  const subid = params?.subid;
  try {
    const res = await fetch(`/voca/sub/${subid}`);
    const result = await res.json();
    if (res.error) {
      alert(res.error);
    } else {
      return { data: result.subject[0], keys: result.keywords };
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

const VocaDetail = () => {
  const { catid, subid } = useParams();
  const { data, keys } = useLoaderData();
  const [subject, setSubject] = useState({ ...data });
  const [keywords, setKeywords] = useState([...keys]);
  const [keyIndex, setKeyIndex] = useState(1);
  const { clickWriteHandler, deleteSubHandler } = useVocaContext();
  const [bookmark, setBookmark] = useState(subject.s_bookmark);
  const [msg, setMsg] = useState("");
  const MsgRef = useRef(null);

  const bookmarkHandler = useCallback(async () => {
    try {
      let res = await fetch(`/voca/sub/bookmark/${subid}`, { method: "PUT" });
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setBookmark(res.result);
        setMsg(res.MESSAGE);
        MsgRef.current.style.animationName = "popUp";
        MsgRef.current.style.animationDuration = "3s";
        setTimeout(() => {
          MsgRef.current.style.animationName = "";
          MsgRef.current.style.animationDuration = "";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      alert("서버 접속 중 오류가 발생했습니다.");
    }
  }, [setBookmark, subid]);

  const deleteHandler = () => {
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      deleteSubHandler(subid, catid);
    }
  };

  // state 리스트 로 만들기(index 칼럼 추가?)
  const keywordList = keywords.map((ele, idx) => {
    return (
      <div key={ele.k_keyid} className="keyword">
        <div className="name">
          <span>{ele.k_keyword}</span>
          <button id="copy">
            <FaClipboard />
          </button>
        </div>
        <div className="desc">{ele.k_desc}</div>
      </div>
    );
  });
  const keywordDot = keywords.map((ele) => {
    return (
      <button key={ele.k_keyid} className="keyword-dot">
        <RxDot />
      </button>
    );
  });
  return (
    <main className="Detail">
      <section className="Detail menu">
        <div className="bookmark-wrap">
          <button
            className={bookmark === 0 ? "bookmark" : "bookmark active"}
            value={bookmark}
            onClick={bookmarkHandler}
          >
            {bookmark === 0 ? <RiBookmarkLine /> : <RiBookmarkFill />}
            북마크
          </button>
          <div className="msg" ref={MsgRef}>
            {msg}
          </div>
        </div>
        <button
          className="write"
          data-catid={catid}
          data-subid={subid}
          onClick={clickWriteHandler}
        >
          <FaPenAlt />
          수정
        </button>
        <button className="delete" onClick={deleteHandler}>
          <MdDelete />
          삭제
        </button>
        <button>
          <MdPictureAsPdf />
          PDF
        </button>
        <a
          className="search"
          href={`https://google.com/search?q=${subject.s_subject}`}
          target="_blank"
          rel="noreferrer"
        >
          <RiGoogleFill />
          검색
        </a>
      </section>
      <section className="Detail title">
        <div className="subject">{subject.s_subject}</div>
        <Link className="category" to={`/voca/category/${catid}`}>
          {subject.s_category}
        </Link>
      </section>
      <div className="keyword-count">
        <FaTags />
        {keyIndex}/{subject["tbl_keywords.length"]}
      </div>
      <section className="Detail slide">
        <button className="prev">
          <FaCaretLeft />
        </button>
        <div className="keyword-list-wrap">
          <div className="keyword-list">{keywordList}</div>
        </div>
        <button className="next">
          <FaCaretRight />
        </button>
      </section>
      <div className="keyword-button">{keywordDot}</div>
      <section className="Detail content">
        <div>{subject.s_content}</div>
      </section>
    </main>
  );
};
export default VocaDetail;
