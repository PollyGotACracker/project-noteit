import style from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useSubjectFetcher from "../../common/services/useSubjectFetcher";
import { initKey, initSub } from "../utils/initData";
import Editor from "../components/Editor";
import Keywords from "../components/Keywords";
import useToasts from "@hooks/useToasts";
import { URLS } from "@/router";

export default function NoteWrite() {
  const { getCategoryData, getSubjectData, upsertSubject } =
    useSubjectFetcher();
  const navigate = useNavigate();
  const { catId, subId = undefined } = useParams();
  const { data: category } = useQuery(getCategoryData({ catId }));
  const { data: { subject, keywords } = {} } = subId
    ? useQuery(getSubjectData({ subId }))
    : {};
  const { data: { subId: upsertSubId } = {}, mutate: upsertMutation } =
    useMutation(upsertSubject({ catId, subId }));

  const [noteSub, setNoteSub] = useState(initSub(subId));
  const [keywordList, setKeywordList] = useState([]);
  const keyboxRef = useRef(null);

  useEffect(() => {
    if (category) {
      setNoteSub({
        ...noteSub,
        ...(subject && subject),
        s_catid: category?.c_catid,
        s_category: category?.c_category,
      });
    }
  }, [subject, category]);

  useEffect(() => {
    if (keywords) setKeywordList([...keywords]);
  }, [keywords]);

  useEffect(() => {
    if (upsertSubId) {
      navigate(`${URLS.NOTE_SUBJECT}/${catId}/${upsertSubId}`, {
        replace: true,
      });
    }
  }, [upsertSubId]);

  const handleAddKeyword = () => setKeywordList([...keywordList, initKey()]);

  const handleSetCatSub = ({ target: { name, value } }) => {
    setNoteSub({ ...noteSub, [name]: value });
  };

  return (
    <main>
      <form className={style.form}>
        <label className={style.label} htmlFor={style.category}>
          카테고리
        </label>
        <input
          id={style.category}
          className={style.underline}
          name="s_category"
          value={noteSub?.s_category}
          readOnly={true}
          onChange={handleSetCatSub}
        />
        <label className={style.label} htmlFor={style.subject}>
          주제
        </label>
        <input
          id={style.subject}
          className={style.underline}
          value={noteSub?.s_subject || ""}
          name="s_subject"
          onChange={handleSetCatSub}
          autoComplete="false"
        />
        <KeywordBox
          keywordList={keywordList}
          setKeywordList={setKeywordList}
          keyboxRef={keyboxRef}
          onAdd={handleAddKeyword}
        />
        <EditorBox noteSub={noteSub} setNoteSub={setNoteSub} />
        <ButtonBox
          catId={catId}
          subId={subId}
          noteSub={noteSub}
          keywordList={keywordList}
          upsertMutation={upsertMutation}
        />
      </form>
    </main>
  );
}

function KeywordBox({ keywordList, setKeywordList, keyboxRef, onAdd }) {
  return (
    <>
      <span className={style.label}>키워드</span>
      <div className={style.keyword_info}>
        <AiOutlineInfoCircle />
        <span>
          하나의 키워드를 소괄호 또는 쉼표로 분리하면 복수 정답으로 인정됩니다.
        </span>
      </div>
      <div className={style.keywords} ref={keyboxRef}>
        <Keywords keywordList={keywordList} setKeywordList={setKeywordList} />
      </div>
      <button className={style.add_keyword} type="button" onClick={onAdd}>
        키워드 추가
      </button>
    </>
  );
}

function EditorBox({ noteSub, setNoteSub }) {
  const handleSetContent = (_, editor) => {
    const data = editor.getData();
    setNoteSub({ ...noteSub, s_content: data });
  };

  return (
    <>
      <label className={style.label} htmlFor="content">
        메모
      </label>
      <Editor
        data={noteSub?.s_content}
        handler={handleSetContent}
        subId={noteSub?.s_subid}
      />
    </>
  );
}

function ButtonBox({ catId, subId, noteSub, keywordList, upsertMutation }) {
  const { showToast } = useToasts();

  const checkNoteValidation = () => {
    const isValidText = (str) => !!str.replaceAll(" ", "");
    const isValidKeywords = (arr) => {
      return arr.every((ele) => {
        return isValidText(ele.k_keyword) && isValidText(ele.k_desc);
      });
    };

    if (!isValidText(noteSub.s_subject)) {
      showToast("공부 주제를 입력하세요.");
      return false;
    }
    if (!isValidKeywords(keywordList)) {
      showToast("비어있는 키워드가 있는지 확인해주세요.");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!checkNoteValidation()) return;
    const images = document?.querySelectorAll(".ck-content img");
    const imageArr =
      images.length !== 0
        ? Array.from(images).map((item) => {
            const index = item.src.lastIndexOf("/");
            const url = item.src.slice(index + 1);
            return url;
          })
        : "";
    upsertMutation({
      subjects: {
        ...noteSub,
        s_catid: catId,
        s_subid: subId ? subId : "",
        s_thumb: imageArr[0],
        s_attachs: `${imageArr}`,
      },
      keywords: keywordList,
    });
  };

  const backUrl = subId
    ? `${URLS.NOTE_SUBJECT}/${catId}/${subId}`
    : `${URLS.NOTE_CATEGORY}/${catId}`;

  return (
    <section className={style.button_box}>
      <Link className={style.back} to={backUrl}>
        뒤로
      </Link>
      <button type="button" className={style.submit} onClick={onSubmit}>
        등록
      </button>
    </section>
  );
}
