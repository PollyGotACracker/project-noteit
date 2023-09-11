export const getTodos = async (userId) => {
  try {
    const res = await fetch(`/server/todo/${userId}`).then((data) =>
      data.json()
    );
    return res;
  } catch (err) {
    console.error(err);
    alert("서버 접속 오류");
  }
};

export const insertTodo = async ({ userId, todo }) => {
  try {
    let url = `/server/todo/${userId}/insert`;
    let method = "POST";

    if (Number(todo.t_todoid) !== 0) {
      url = `/server/todo/${userId}/update`;
      method = "PATCH";
    }

    const fetchOption = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    };
    const res = await fetch(url, fetchOption);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    alert("서버 오류");
  }
};

export const deleteTodo = async ({ userId, uid }) => {
  try {
    const res = await fetch(`/server/todo/${userId}/delete/${uid}`, {
      method: "DELETE",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    alert("서버 오류");
  }
};

export const updateTodoComplete = async ({ userId, uid }) => {
  try {
    const res = await fetch(`/server/todo/${userId}/complete/${uid}`, {
      method: "PATCH",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    alert("서버 오류");
  }
};
