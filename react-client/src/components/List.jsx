import React, { createRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from "./Spinner";

const ListContainer = ({ data, isLoading, render }) => {
  const todoContent = data.map((item, index) => {
    const nodeRef = createRef(null);
    return (
      <CSSTransition
        key={`${index}"-item"`}
        nodeRef={nodeRef}
        timeout={300}
        classNames="list-item"
      >
        <div className="list-item" ref={nodeRef}>
          {render(item)}
        </div>
      </CSSTransition>
    );
  });

  return (
    <section className="list">
      {!isLoading ? (
        <TransitionGroup>{todoContent}</TransitionGroup>
      ) : (
        <Spinner loading={isLoading} />
      )}
    </section>
  );
};

export default React.memo(ListContainer);
