import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/Voca/VocaDetail.css";
import { useVocaContext } from "../../context/VocaContext";

const VocaDetail = () => {
  const { catid, subid } = useParams();
  const [subject, setSubject] = useState({});
  const [keywords, setKeywords] = useState([]);
  const { clickWriteHandler, deleteSubHandler } = useVocaContext();

  const subDetail = useCallback(async () => {
    try {
      const res = await fetch(`/voca/sub/${subid}`);
      const result = await res.json();
      if (res.error) {
        alert(res.error);
      } else {
        setSubject({ ...result.subject[0] });
        setKeywords([...result.keywords]);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, []);

  useEffect(() => {
    (async () => {
      await subDetail();
    })();
  }, [subDetail]);

  const deleteHandler = (e) => {
    if (!window.confirm("이 주제를 삭제할까요?")) {
      return false;
    } else {
      deleteSubHandler(subid, catid);
    }
  };

  const keywordList = keywords.map((ele) => {
    return (
      <span key={ele.k_keyword} className="keyword">
        {ele.k_keyword}
      </span>
    );
  });

  return (
    <main className="Detail">
      <section className="Detail title">
        <div className="box">
          <div className="subject">{subject.s_subject}</div>
          <Link className="category" to={`/voca/category/${catid}`}>
            {subject.s_category}
          </Link>
        </div>
        <div className="box">
          <div className="length">{subject["f_key.length"]}</div>
          <div className="btn-box">
            <button
              className="write"
              title="수정"
              data-catid={catid}
              data-subid={subid}
              onClick={clickWriteHandler}
            >
              수정
            </button>
            <button className="delete" title="삭제" onClick={deleteHandler}>
              삭제
            </button>
            <button>PDF</button>
          </div>
        </div>
      </section>
      <section className="Detail slide">
        <button className="prev"></button>
        <div className="keyword-list">{keywordList}</div>
        <button className="next"></button>
      </section>
      <section className="Detail content">
        <div>{subject.s_content}</div>
      </section>
    </main>
  );
};
export default VocaDetail;
