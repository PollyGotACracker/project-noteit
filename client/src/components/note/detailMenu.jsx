import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { RiBallPenFill, RiGoogleFill } from "react-icons/ri";
import { URLS } from "@/router";
import { deleteSubject, updateSubjectBookmark } from "@services/note.service";

const showMsg = (ele) => {
  ele.style.animationName = "popUp";
  ele.style.animationDuration = "3s";
  setTimeout(() => {
    ele.style.animationName = "";
    ele.style.animationDuration = "";
  }, 3000);
};

const DetailMenu = ({ subject, mutationParams }) => {
  const navigate = useNavigate();
  const { catId, subId } = mutationParams;
  const isBookmarked = subject?.s_bookmark !== 0;
  const [msg, setMsg] = useState("");
  const bookmarkRef = useRef(null);

  const { data: bookmarkedData, mutate: updateBookmarkMutation } = useMutation(
    updateSubjectBookmark(mutationParams)
  );
  const { isSuccess: deleteSuccess, mutate: deleteMutation } = useMutation(
    deleteSubject(mutationParams)
  );

  useEffect(() => {
    if (bookmarkedData) {
      setMsg(bookmarkedData.message);
      showMsg(bookmarkRef.current);
    }
  }, [bookmarkedData]);

  useEffect(() => {
    if (deleteSuccess) {
      navigate(`${URLS.NOTE_LIST}/${catId}`, { replace: true });
    }
  }, [deleteSuccess]);

  const bookmarkHandler = () => {
    const bookmark = isBookmarked ? 0 : 1;
    updateBookmarkMutation({ bookmark });
  };

  const deleteHandler = () => {
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      deleteMutation();
    }
  };

  return (
    <section className="menu">
      <div className="bookmark-wrap">
        <button
          className={isBookmarked ? "bookmark-btn active" : "bookmark-btn"}
          value={subject?.s_bookmark}
          onClick={bookmarkHandler}
        >
          {isBookmarked ? <RxBookmarkFilled /> : <RxBookmark />}
          북마크
        </button>
        <div className="bookmark msg" ref={bookmarkRef}>
          {msg}
        </div>
      </div>
      <Link className="write" to={`/note/write/${catId}/${subId}`}>
        <RiBallPenFill />
        수정
      </Link>
      <button className="delete" onClick={deleteHandler}>
        <MdDelete />
        삭제
      </button>
      <button onClick={() => window.print()}>
        <IoPrint />
        인쇄
      </button>
      <a
        className="search"
        href={`https://google.com/search?q=${subject?.s_subject}`}
        target="_blank"
        rel="noreferrer"
      >
        <RiGoogleFill />
        검색
      </a>
    </section>
  );
};

export default DetailMenu;
