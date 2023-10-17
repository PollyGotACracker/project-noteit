import "@styles/note/write.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useNoteFetcher from "@services/useNoteFetcher";
import { initKey, initSub } from "@recoils/note";
import Editor from "@libs/editor";
import { URLS } from "@/router";
import WriteKeywords from "@components/note/writeKeywords";

const NoteWritePage = () => {
  const { getCategoryData, getSubjectData, upsertSubject } = useNoteFetcher();
  const navigate = useNavigate();
  const { catId, subId = undefined } = useParams();
  const { data: category } = useQuery(getCategoryData({ catId }));
  const { data: { subject, keywords } = {} } = subId
    ? useQuery(getSubjectData({ subId }))
    : {};
  const { data: { subId: upsertSubId } = {}, mutate: upsertMutation } =
    useMutation(upsertSubject({ subId }));

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
      navigate(`${URLS.NOTE_DETAIL}/${catId}/${upsertSubId}`, {
        replace: true,
      });
    }
  }, [upsertSubId]);

  const addKeywordItemHandler = () =>
    setKeywordList([...keywordList, initKey()]);

  const onChangeSubHandler = ({ target: { name, value } }) => {
    setNoteSub({ ...noteSub, [name]: value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setNoteSub({ ...noteSub, s_content: data });
  };

  const validateSubject = () => {
    const checkValidArray = (arr) => {
      const _arr = Array.isArray(arr) ? arr : [arr];
      return _arr.some((ele) => {
        if (typeof ele === "object") {
          return Object.values(ele).every((val) =>
            typeof val === "string" ? val.replaceAll(" ", "") : true
          );
        } else return ele.replaceAll(" ", "");
      });
    };

    if (!checkValidArray(noteSub.s_subject)) {
      alert("공부 주제를 입력하세요.");
      return false;
    }
    if (!checkValidArray(keywordList)) {
      alert("비어있는 키워드가 있는지 확인해주세요.");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    if (!validateSubject()) return;
    let subjects = { ...noteSub, s_catid: catId, s_subid: subId ? subId : "" };
    const images = document?.querySelectorAll(".ck-content img");
    if (images) {
      const imageArr = Array?.from(images).map((item) => {
        const index = item?.src?.lastIndexOf("/");
        const url = item?.src?.slice(index + 1);
        return url;
      });
      subjects = {
        ...subjects,
        s_thumb: imageArr[0],
        s_attachs: `${imageArr}`,
      };
    }

    upsertMutation({
      subjects,
      keywords: keywordList,
    });
  };

  return (
    <main className="Write">
      <form>
        <label className="form-label" htmlFor="category">
          카테고리
        </label>
        <input
          id="category"
          name="s_category"
          value={noteSub?.s_category}
          readOnly={true}
          onChange={onChangeSubHandler}
        />
        <label className="form-label" htmlFor="subject">
          주제
        </label>
        <input
          id="subject"
          value={noteSub?.s_subject || ""}
          name="s_subject"
          onChange={onChangeSubHandler}
          autoComplete="false"
        />
        <section className="keyword-controller">
          <span className="form-label">키워드</span>
          <div className="keyword-info">
            <AiOutlineInfoCircle />
            <span>
              하나의 키워드를 소괄호 또는 쉼표로 분리하면 복수 정답으로
              인정됩니다.
            </span>
          </div>
          <div id="keyword-box" ref={keyboxRef}>
            <WriteKeywords
              keywordList={keywordList}
              setKeywordList={setKeywordList}
            />
          </div>
          <button
            id="add-keyword"
            type="button"
            onClick={addKeywordItemHandler}
          >
            키워드 추가
          </button>
        </section>
        <section>
          <label className="form-label" htmlFor="content">
            메모
          </label>
          <Editor
            data={noteSub?.s_content}
            handler={onChangeContentHandler}
            subId={noteSub?.s_subid}
          />
        </section>
        <section className="btn-box">
          <Link
            id="back"
            to={
              subId
                ? `${URLS.NOTE_DETAIL}/${catId}/${subId}`
                : `${URLS.NOTE_LIST}/${catId}`
            }
          >
            뒤로
          </Link>
          <button type="button" id="submit" onClick={submitHandler}>
            등록
          </button>
        </section>
      </form>
    </main>
  );
};

export default NoteWritePage;
