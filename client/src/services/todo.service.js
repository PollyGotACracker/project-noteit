import { QueryKeys, fetcher } from "@services/core";

export const getTodos = ({ userId }) => ({
  queryKey: QueryKeys.TODO,
  queryFn: async () => {
    const endPoint = `/todo/${userId}`;
    const res = await fetcher({ endPoint });
    return res;
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const upsertTodo = ({ queryClient, userId }) => ({
  mutationKey: [...QueryKeys.TODO, "upsert"],
  mutationFn: async ({ todo }) => {
    const isNew = Number(todo.t_todoid) === 0;
    const endPoint = `/todo/${userId}/${isNew ? "insert" : "update"}`;
    const options = {
      method: isNew ? "POST" : "PATCH",
      body: JSON.stringify(todo),
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO);
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const deleteTodo = ({ queryClient, userId }) => ({
  mutationKey: [...QueryKeys.TODO, "delete"],
  mutationFn: async ({ todoId }) => {
    const endPoint = `/todo/${userId}/delete/${todoId}`;
    const options = {
      method: "DELETE",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO);
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const updateTodoComplete = ({ queryClient, userId }) => ({
  mutationKey: [...QueryKeys.TODO, "complete"],
  mutationFn: async ({ todoId }) => {
    const endPoint = `/todo/${userId}/complete/${todoId}`;
    const options = {
      method: "PATCH",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO);
  },
  onError: (error) => {
    alert(error.message);
  },
});
