import { TransitionGroup } from "react-transition-group";
import Spinner from "./Spinner";

const ListContainer = ({ isLoading, children }) => {
  return (
    <section className="list">
      {!isLoading ? (
        <TransitionGroup>{children}</TransitionGroup>
      ) : (
        <Spinner loading={isLoading} />
      )}
    </section>
  );
};

export default ListContainer;
