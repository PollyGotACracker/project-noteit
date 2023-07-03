import { CSSTransition } from "react-transition-group";

const ListItem = ({ nodeRef, children }) => {
  return (
    <CSSTransition nodeRef={nodeRef} timeout={300} classNames="list-item">
      <div className="list-item" ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default ListItem;
