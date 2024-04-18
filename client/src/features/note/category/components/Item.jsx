import style from "./item.module.css";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { FaTags } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useSubjectFetcher from "../../common/services/useSubjectFetcher";
import { URLS } from "@/router";
import useModals from "@hooks/useModals";

export default function Item({ item, savePos }) {
  const { openModal } = useModals();
  const { updateSubjectBookmark, deleteSubject } = useSubjectFetcher();
  const { s_catid: catId, s_subid: subId } = item;
  const mutationParams = { catId, subId };

  const { mutate: updateBookmarkMutation } = useMutation(
    updateSubjectBookmark({ catId, subId })
  );
  const { mutate: deleteMutation } = useMutation(deleteSubject(mutationParams));

  const handleBookmark = () => {
    updateBookmarkMutation({ bookmark: !item.s_bookmark });
  };

  const handleDelete = () => {
    openModal({
      content: `${item.s_subject}\n이 주제를 삭제할까요?`,
      okClick: deleteMutation,
    });
  };

  return (
    <li className={style.item} onClick={savePos}>
      <button
        className={style.bookmark}
        title="북마크"
        value={item.s_bookmark}
        onClick={handleBookmark}
      >
        {item.s_bookmark ? <RxBookmarkFilled /> : <RxBookmark />}
      </button>
      <Link
        className={style.subject}
        to={`${URLS.NOTE_SUBJECT}/${catId}/${subId}`}
      >
        {item.s_subject}
      </Link>
      <div className={style.keycount}>
        <FaTags />
        {item.s_keycount}
      </div>
      <button className={style.delete} title="삭제" onClick={handleDelete}>
        <MdDelete />
      </button>
    </li>
  );
}
