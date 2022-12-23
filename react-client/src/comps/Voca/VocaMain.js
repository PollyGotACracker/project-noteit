import { Link } from "react-router-dom";

const VocaCategory = () => {
  const catid = "0001";
  return (
    <main className="Voca">
      <Link
        className="category"
        data-catid={catid}
        to={`/voca/category/${catid}`}
      >
        정보처리기사
      </Link>
    </main>
  );
};

export default VocaCategory;
