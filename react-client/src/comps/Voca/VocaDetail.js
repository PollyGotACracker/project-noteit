import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../css/Voca/VocaDetail.css";
import { clickWriteHandler } from "../../data/HandlerFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { vocaArr } from "../../data/VocaData";

const VocaDetail = () => {
  const { catid, subid } = useParams();
  // console.log(id);
  // console.log(vocaArr);
  let item = vocaArr.filter((ele) => {
    return Number(ele.id) === Number(subid);
  });
  item = item[0];
  const keywordList = item.keyword.map((ele) => {
    return <span className="keyword">{ele}</span>;
  });

  return (
    <main className="Detail">
      <section className="Detail title">
        <div className="box">
          <div className="subject">{item.subject}</div>
          <div className="category">{item.category}</div>
        </div>
        <div className="box">
          <div className="length">{item.keyword.length}</div>
          <div className="btnBox">
            <Link
              data-catid={catid}
              data-subid={item.id}
              onClick={clickWriteHandler}
            >
              수정
            </Link>
            <Link>삭제</Link>
            <Link>PDF</Link>
          </div>
        </div>
      </section>
      <section className="Detail slide">
        <button>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="keywordList">{keywordList}</div>
        <button>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </section>
      <section className="Detail memo">
        <div>{item.memo}</div>
      </section>
    </main>
  );
};
export default VocaDetail;
