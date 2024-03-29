import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { FaTags } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useNoteFetcher from "@services/useNoteFetcher";
import { URLS } from "@/router";
import useModals from "@hooks/useModals";

const NoteSubItem = ({ item, savePos }) => {
  const { openModal } = useModals();
  const { updateSubjectBookmark, deleteSubject } = useNoteFetcher();
  const { s_catid: catId, s_subid: subId } = item;
  const mutationParams = { catId, subId };
  const isBookmarked = item.s_bookmark !== 0;

  const { mutate: updateBookmarkMutation } = useMutation(
    updateSubjectBookmark({ catId, subId })
  );
  const { mutate: deleteMutation } = useMutation(deleteSubject(mutationParams));

  const updateBookmarkHandler = () => {
    const bookmark = isBookmarked ? 0 : 1;
    updateBookmarkMutation({ bookmark });
  };

  const deleteHandler = () => {
    openModal({
      content: "이 주제를 삭제할까요?",
      okClick: deleteMutation,
    });
  };

  return (
    <li className="item" data-id={subId} onClick={savePos}>
      <button
        className="bookmark-btn"
        title="북마크"
        value={item.s_bookmark}
        onClick={updateBookmarkHandler}
      >
        {isBookmarked ? <RxBookmarkFilled /> : <RxBookmark />}
      </button>
      <Link className="subject" to={`${URLS.NOTE_DETAIL}/${catId}/${subId}`}>
        {item.s_subject}
      </Link>
      <div className="keycount">
        <FaTags />
        {item.s_keycount}
      </div>
      <button className="delete-btn" title="삭제" onClick={deleteHandler}>
        <MdDelete />
      </button>
    </li>
  );
};

export default NoteSubItem;
