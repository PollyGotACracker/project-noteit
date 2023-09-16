import { QueryKeys, fetcher } from "@services/core";

export const getTodos = ({ userId }) => ({
  queryKey: QueryKeys.TODO,
  queryFn: async () => {
    try {
      const endPoint = `/todo/${userId}`;
      const res = await fetcher({ endPoint });
      return res;
    } catch (err) {
      console.error(err);
      alert("Todo 목록을 불러오는 중 오류가 발생했습니다.");
      throw err;
    }
  },
});

export const upsertTodo = async ({ userId, todo }) => {
  try {
    const isNew = Number(todo.t_todoid) === 0;
    const endPoint = `/todo/${userId}/${isNew ? "insert" : "update"}`;
    const options = {
      method: isNew ? "POST" : "PATCH",
      body: JSON.stringify(todo),
    };
    const res = await fetcher({ endPoint, options });
    return res;
  } catch (err) {
    console.error(err);
    alert("Todo 아이템 추가 또는 수정 중 오류가 발생했습니다.");
    throw err;
  }
};

export const deleteTodo = async ({ userId, uid }) => {
  try {
    const endPoint = `/todo/${userId}/delete/${uid}`;
    const options = {
      method: "DELETE",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  } catch (err) {
    console.error(err);
    alert("Todo 아이템 삭제 중 오류가 발생했습니다.");
    throw err;
  }
};

export const updateTodoComplete = async ({ userId, uid }) => {
  try {
    const endPoint = `/todo/${userId}/complete/${uid}`;
    const options = {
      method: "PATCH",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  } catch (err) {
    console.error(err);
    alert("Todo 아이템 완료 업데이트 중 오류가 발생했습니다.");
    throw err;
  }
};
