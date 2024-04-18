import style from "./keywords.module.css";
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
import { checkMobile } from "@utils/getUserAgent";
import cx from "classnames";

export default function Keywords({ keywords }) {
  const isMobile = useRef(checkMobile());
  const containerRef = useRef(null);
  const { newList, state, setPrevSlide, setNextSlide, setSelectSlide } =
    useCarousel({
      ref: containerRef,
      list: keywords,
    });

  return (
    <>
      <KeywordToolbar state={state} keywords={keywords} />
      <section className={style.keyword_slide}>
        <KeywordSlideButton isMobile={isMobile.current} onClick={setPrevSlide}>
          <FaCaretLeft />
        </KeywordSlideButton>
        <div
          className={cx(style.keyword_list_wrapper, {
            [style.full]: isMobile.current,
          })}
        >
          <KeywordList list={newList} containerRef={containerRef} />
        </div>
        <KeywordSlideButton isMobile={isMobile.current} onClick={setNextSlide}>
          <FaCaretRight />
        </KeywordSlideButton>
      </section>
      <div className={style.navigation}>
        <KeywordNav
          state={state}
          keywords={keywords}
          onClick={setSelectSlide}
        />
      </div>
    </>
  );
}

function KeywordToolbar({ state, keywords }) {
  const initMessage = "키워드 복사";
  const copyTimeoutRef = useRef(null);
  const [copyMsg, setCopyMsg] = useState(initMessage);

  useEffect(() => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      setCopyMsg(initMessage);
    }
    return () => clearTimeout(copyTimeoutRef.current);
  }, [state]);

  const handleCopyKeyword = () => {
    const keyword = keywords[state - 1]?.k_keyword;
    navigator.clipboard.writeText(keyword);
    setCopyMsg("복사 완료!");
    copyTimeoutRef.current = setTimeout(() => setCopyMsg(initMessage), 3000);
  };

  return (
    <section className={style.toolbar}>
      <div className={style.keyword_count}>
        <FaTags />
        <span>
          {state} / {keywords?.length}
        </span>
      </div>
      <button className={style.copy} onClick={handleCopyKeyword}>
        {copyMsg === initMessage ? <FaClipboard /> : <FaCheck />}
        <span className={style.copy_message}>{copyMsg}</span>
      </button>
    </section>
  );
}

function KeywordSlideButton({ isMobile, onClick, children }) {
  if (!isMobile)
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
}

function KeywordList({ list, containerRef }) {
  return (
    <div className={style.keyword_list} ref={containerRef}>
      {list?.map((ele, idx) => (
        <div
          key={`${ele.k_keyid}-${idx}`}
          data-id={ele.k_index}
          className={style.keyword}
        >
          <div className={style.title}>
            <div className={style.name}>{ele.k_keyword}</div>
            <div className={style.wrong}>틀린 횟수: {ele.k_wrongcount}</div>
          </div>
          <div className={style.description}>{ele.k_desc}</div>
        </div>
      ))}
    </div>
  );
}

function KeywordNav({ state, keywords, onClick }) {
  return keywords?.map((ele) => {
    const isCurrent = state === ele.k_index;
    const keywords = ele.k_keyword.split(/\(|,/);
    const firstKeyword = keywords[0].trim();
    return (
      <button
        key={ele.k_keyid}
        className={cx(style.keyword_dot, { [style.active]: isCurrent })}
        onClick={() => onClick(ele.k_index)}
      >
        {isCurrent ? <RxDotFilled /> : <RxDot />}
        {firstKeyword}
      </button>
    );
  });
}
