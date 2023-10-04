import { QueryKeys, fetcher } from "@services/core";
import { getClient } from "@services/core";

const queryClient = getClient();
const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

export const getTodos = ({ userId }) => ({
  queryKey: [QueryKeys.TODO, userId],
  queryFn: async () => {
    const endPoint = `/todo`;
    const res = await fetcher({ endPoint });
    return res;
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const upsertTodo = () => ({
  mutationKey: [QueryKeys.TODO, "upsert"],
  mutationFn: async ({ todo }) => {
    const isNew = Number(todo.t_todoid) === 0;
    const endPoint = `/todo/${isNew ? "insert" : "update"}`;
    const options = {
      method: isNew ? "POST" : "PATCH",
      body: JSON.stringify(todo),
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO, refetchOptions);
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const deleteTodo = () => ({
  mutationKey: [QueryKeys.TODO, "delete"],
  mutationFn: async ({ todoId }) => {
    const endPoint = `/todo/delete/${todoId}`;
    const options = {
      method: "DELETE",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO, refetchOptions);
  },
  onError: (error) => {
    alert(error.message);
  },
});

export const updateTodoComplete = () => ({
  mutationKey: [QueryKeys.TODO, "complete"],
  mutationFn: async ({ todoId }) => {
    const endPoint = `/todo/complete/${todoId}`;
    const options = {
      method: "PATCH",
    };
    const res = await fetcher({ endPoint, options });
    return res;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(QueryKeys.TODO, refetchOptions);
  },
  onError: (error) => {
    alert(error.message);
  },
});
