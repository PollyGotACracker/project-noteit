import style from "./menu.module.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { RiBallPenFill, RiGoogleFill } from "react-icons/ri";
import { URLS } from "@/router";
import useSubjectFetcher from "../../common/services/useSubjectFetcher";
import useModals from "@hooks/useModals";

export default function Menu({ subject, mutationParams }) {
  const { openModal } = useModals();
  const navigate = useNavigate();
  const { deleteSubject, updateSubjectBookmark } = useSubjectFetcher();
  const { catId, subId } = mutationParams;

  const { mutate: updateBookmarkMutation } = useMutation(
    updateSubjectBookmark({ catId, subId })
  );
  const { isSuccess: deleteSuccess, mutate: deleteMutation } = useMutation(
    deleteSubject(mutationParams)
  );

  useEffect(() => {
    if (deleteSuccess) {
      navigate(`${URLS.NOTE_CATEGORY}/${catId}`, { replace: true });
    }
  }, [deleteSuccess]);

  const handleBookmark = () => {
    updateBookmarkMutation({ bookmark: !subject?.s_bookmark });
  };

  const handleDelete = () => {
    openModal({
      content: "이 주제를 삭제할까요?",
      okClick: deleteMutation,
    });
  };

  return (
    <section className={style.menu}>
      <button
        className={style.bookmark}
        value={subject?.s_bookmark}
        onClick={handleBookmark}
      >
        {subject?.s_bookmark ? <RxBookmarkFilled /> : <RxBookmark />}
        북마크
      </button>
      <Link className={style.write} to={`/note/write/${catId}/${subId}`}>
        <RiBallPenFill />
        수정
      </Link>
      <button className={style.delete} onClick={handleDelete}>
        <MdDelete />
        삭제
      </button>
      <button className={style.print} onClick={() => window.print()}>
        <IoPrint />
        인쇄
      </button>
      <a
        className={style.search}
        href={`https://google.com/search?q=${subject?.s_subject}`}
        target="_blank"
        rel="noreferrer"
      >
        <RiGoogleFill />
        검색
      </a>
    </section>
  );
}
