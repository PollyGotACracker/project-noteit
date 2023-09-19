import { useState, useReducer, useEffect } from "react";
import { RxDot, RxDotFilled } from "react-icons/rx";
import {
  FaTags,
  FaClipboard,
  FaCheck,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";

const DetailKeywords = ({ subject, keywords }) => {
  const [copyMsg, setCopyMsg] = useState("키워드 복사");
  const [position, setPosition] = useState(0);

  const changeKeyword = (state, action) => {
    switch (action.type) {
      case "PREV":
        if (state > 1) {
          setPosition(position + 100);
          return state - 1;
        }
        if (state === 1) {
          setPosition((action.payload - 1) * 100 * -1);
          return action.payload;
        }
        break;
      case "NEXT":
        if (state < action.payload) {
          setPosition(position - 100);
          return state + 1;
        }
        if (state === action.payload) {
          setPosition(0);
          return 1;
        }
        break;
      case "SELECT": {
        setPosition((action.payload - 1) * 100 * -1);
        return action.payload;
      }
      default: {
        setPosition(state * 100 * -1);
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(changeKeyword, 1);

  const copyKeyword = () => {
    const value = keywords[state - 1]?.k_keyword;
    navigator.clipboard.writeText(value);
    setCopyMsg("복사 완료!");
    setTimeout(() => {
      setCopyMsg("키워드 복사");
    }, 3000);
  };

  const [keywordSlide, setKeywordSlide] = useState([]);

  useEffect(() => {
    if (keywords) setKeywordSlide([...keywordList]);
  }, [keywords]);

  const keywordList = keywords?.map((ele, idx) => {
    return (
      <div
        key={`${ele.k_keyid}-${idx}`}
        data-id={ele.k_index}
        className="keyword"
      >
        <div className="top-box">
          <div className="key">{ele.k_keyword}</div>
          <div className="wrong">틀린 횟수: {ele.k_wrongcount}</div>
        </div>
        <div className="desc">{ele.k_desc}</div>
      </div>
    );
  });

  const keywordDot = keywords?.map((ele, idx) => {
    return (
      <button
        key={`${ele.k_keyid}-${idx}`}
        className={state === ele.k_index ? "keyword-dot active" : "keyword-dot"}
        onClick={() => dispatch({ type: "SELECT", payload: ele.k_index })}
      >
        {state === ele.k_index ? <RxDotFilled /> : <RxDot />}
        {ele.k_keyword}
      </button>
    );
  });

  return (
    <>
      <section className="keyword-list-top">
        <div className="keyword-count">
          <FaTags />
          {state} / {subject?.s_keycount}
        </div>

        <button className="copy-btn" onClick={copyKeyword}>
          {copyMsg === "키워드 복사" ? <FaClipboard /> : <FaCheck />}
          <span className="copy-msg">{copyMsg}</span>
        </button>
      </section>
      <section className="keyword-slide">
        <button
          className="prev"
          onClick={() => dispatch({ type: "PREV", payload: keywords?.length })}
        >
          <FaCaretLeft />
        </button>
        <div className="keyword-list-wrap">
          <div
            className="keyword-list"
            style={{ transform: `translateX(${position}%)` }}
          >
            {keywordSlide}
          </div>
        </div>
        <button
          className="next"
          onClick={() => dispatch({ type: "NEXT", payload: keywords?.length })}
        >
          <FaCaretRight />
        </button>
      </section>
      <div className="keyword-list-bottom">{keywordDot}</div>
    </>
  );
};

export default DetailKeywords;
