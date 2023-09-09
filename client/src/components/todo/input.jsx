import { useTodoContext } from "@contexts/todoContext";
import { useUserContext } from "@contexts/userContext";
import React, { useState } from "react";

const TodoInput = () => {
  const {
    todoNewItem,
    isEdit,
    todoInsertHandler,
    changeValueHandler,
    changePriorHandler,
  } = useTodoContext();
  const { userData } = useUserContext();
  const [showPrior, setShowPrior] = useState(false);

  return (
    <div className="input">
      <input
        placeholder="목표"
        className="t_content"
        name="t_content"
        onChange={(e) => changeValueHandler(e, userData.u_userid)}
        value={todoNewItem.t_content}
      />
      <input
        type="date"
        className={
          todoNewItem?.t_deadline !== "" ? "t_deadline" : "t_deadline empty"
        }
        name="t_deadline"
        onChange={(e) => changeValueHandler(e, userData.u_userid)}
        value={todoNewItem?.t_deadline}
        data-placeholder="마감일"
      />
      <div className="prior-wrap" onClick={() => setShowPrior(!showPrior)}>
        <div className="prior-value" data-prior={todoNewItem.t_prior}>
          중요도
        </div>
        <div
          className="prior-option"
          style={{ display: showPrior ? "flex" : "none" }}
        >
          {[1, 2, 3, 4, 5].map((ele) => (
            <button
              key={ele}
              data-prior={ele}
              onClick={() => {
                changePriorHandler(ele);
                setShowPrior(false);
              }}
            >
              <span>{ele}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        className="submit"
        onClick={() => todoInsertHandler(userData.u_userid)}
        disabled={todoNewItem.t_content.length < 1}
      >
        {isEdit ? "수정" : "추가"}
      </button>
    </div>
  );
};

export default React.memo(TodoInput);
