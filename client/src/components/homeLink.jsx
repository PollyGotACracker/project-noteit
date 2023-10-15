import { Link } from "react-router-dom";

const HomeLink = () => {
  return (
    <Link className="home-link" to={"/"}>
      NoteIT
    </Link>
  );
};

export default HomeLink;
