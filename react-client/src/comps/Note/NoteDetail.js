import { useState, useReducer, useCallback, useRef } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import "../../css/Note/NoteDetail.css";
import { deleteSubHandler } from "../../service/note.service";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { RiBallPenFill, RiGoogleFill } from "react-icons/ri";
import { FaTags, FaClipboard, FaCaretLeft, FaCaretRight } from "react-icons/fa";

export const detailLoader = async ({ params }) => {
  const subid = params?.subid;
  try {
    const res = await fetch(`/note/sub/${subid}`);
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

const changeKeyword = (state, action) => {
  switch (action.type) {
    case "PREV":
      if (state > 1) return state - 1;
      else if (state === 1) return action.payload;
    case "NEXT":
      if (state < action.payload) return state + 1;
      else if (state === action.payload) return 1;
    case "SELECT":
      return action.payload;
    default:
      return state;
  }
};

const showMsg = (ele) => {
  ele.style.animationName = "popUp";
  ele.style.animationDuration = "3s";
  setTimeout(() => {
    ele.style.animationName = "";
    ele.style.animationDuration = "";
  }, 3000);
};

const NoteDetail = () => {
  const { catid, subid } = useParams();
  const { data, keys } = useLoaderData();
  const nav = useNavigate();
  const [subject] = useState({ ...data });
  const [keywords] = useState([...keys]);
  const [bookmark, setBookmark] = useState(subject.s_bookmark);
  const [msg, setMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("키워드 복사");
  const [state, dispatch] = useReducer(changeKeyword, 1);
  const BookmarkMsg = useRef(null);

  const bookmarkHandler = async () => {
    try {
      let res = await fetch(`/note/sub/bookmark/${subid}`, { method: "PUT" });
      res = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setBookmark(res.result);
        setMsg(res.MESSAGE);
        showMsg(BookmarkMsg.current);
      }
    } catch (error) {
      console.log(error);
      alert("서버 접속 중 오류가 발생했습니다.");
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      const res = await deleteSubHandler(subid, catid);
      if (res) {
        alert(res);
        nav(`/note/category/${catid}`, { replace: true });
      }
    }
  };

  const copyKeyword = (value) => {
    navigator.clipboard.writeText(value);
    setCopyMsg("복사되었습니다.");
  };

  const keywordList = keywords.map((ele) => {
    return (
      <>
        <div className="copy-wrap">
          <button
            className="copy-btn"
            onClick={() => copyKeyword(ele.k_keyword)}
          >
            <FaClipboard />
            <span className="copy-msg">{copyMsg}</span>
          </button>
        </div>
        <div key={ele.k_keyid} data-id={ele.k_index} className="keyword">
          <div className="name">
            <span>{ele.k_keyword}</span>
          </div>
          <div className="desc">{ele.k_desc}</div>
        </div>
      </>
    );
  });
  const [keywordSlide] = useState([...keywordList]);

  const keywordDot = keywords.map((ele) => {
    return (
      <button
        key={ele.k_keyid}
        className={state === ele.k_index ? "keyword-dot active" : "keyword-dot"}
        onClick={() => dispatch({ type: "SELECT", payload: ele.k_index })}
      >
        {state === ele.k_index ? <RxDotFilled /> : <RxDot />}
        {ele.k_keyword}
      </button>
    );
  });

  return (
    <main className="Detail">
      <section className="Detail menu">
        <div className="bookmark-wrap">
          <button
            className={bookmark === 0 ? "bookmark-btn" : "bookmark-btn active"}
            value={bookmark}
            onClick={bookmarkHandler}
          >
            {bookmark === 0 ? <RxBookmark /> : <RxBookmarkFilled />}
            북마크
          </button>
          <div className="bookmark msg" ref={BookmarkMsg}>
            {msg}
          </div>
        </div>
        <Link className="write" to={`/note/write/${catid}/${subid}`}>
          <RiBallPenFill />
          수정
        </Link>
        <button className="delete" onClick={deleteHandler}>
          <MdDelete />
          삭제
        </button>
        <button>
          <IoPrint />
          인쇄
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
        <Link className="category" to={`/note/category/${catid}`}>
          {subject.s_category}
        </Link>
      </section>
      <div className="keyword-count">
        <FaTags />
        {state}/{subject["tbl_keywords.length"]}
      </div>
      <section className="Detail slide">
        <button
          className="prev"
          onClick={() => dispatch({ type: "PREV", payload: keywords?.length })}
        >
          <FaCaretLeft />
        </button>
        <div className="keyword-list-wrap">
          <div className="keyword-list">{keywordSlide[state - 1]}</div>
        </div>
        <button
          className="next"
          onClick={() => dispatch({ type: "NEXT", payload: keywords?.length })}
        >
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
export default NoteDetail;
