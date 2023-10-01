import { useState, useRef, useEffect } from "react";
import { RxDot, RxDotFilled } from "react-icons/rx";
import {
  FaTags,
  FaClipboard,
  FaCheck,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import useCarousel from "@hooks/useCarousel";

const DetailKeywords = ({ subject, keywords }) => {
  const containerRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const [copyMsg, setCopyMsg] = useState("키워드 복사");
  const { newList, state, setPrevSlide, setNextSlide, setSelectSlide } =
    useCarousel({
      ref: containerRef,
      list: keywords,
    });

  useEffect(() => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      setCopyMsg("키워드 복사");
    }
    return () => clearTimeout(copyTimeoutRef.current);
  }, [state]);

  const copyKeyword = () => {
    const keyword = keywords[state - 1]?.k_keyword;
    navigator.clipboard.writeText(keyword);
    setCopyMsg("복사 완료!");
    copyTimeoutRef.current = setTimeout(() => setCopyMsg("키워드 복사"), 3000);
  };

  const keywordList = newList?.map((ele, idx) => (
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
  ));

  const keywordDot = keywords?.map((ele) => {
    const isCurrent = state === ele.k_index;
    return (
      <button
        key={ele.k_keyid}
        className={isCurrent ? "keyword-dot active" : "keyword-dot"}
        onClick={() => setSelectSlide(ele.k_index)}
      >
        {isCurrent ? <RxDotFilled /> : <RxDot />}
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
        <button className="prev" onClick={setPrevSlide}>
          <FaCaretLeft />
        </button>
        <div className="keyword-list-wrap">
          <div className="keyword-list" ref={containerRef}>
            {keywordList}
          </div>
        </div>
        <button className="next" onClick={setNextSlide}>
          <FaCaretRight />
        </button>
      </section>
      <div className="keyword-list-bottom">{keywordDot}</div>
    </>
  );
};

export default DetailKeywords;
