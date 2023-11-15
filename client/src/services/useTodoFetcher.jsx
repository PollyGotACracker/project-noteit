import { QueryKeys, queryClient } from "@services/core";
import useFetcher from "@services/core/useFetcher";

const refetchOptions = {
  exact: false,
  refetchInactive: true,
};

const useTodoFetcher = () => {
  const fetcher = useFetcher();

  const getTodos = ({ userId, queries = {} }) => ({
    queryKey: [QueryKeys.TODO, userId],
    queryFn: async () => {
      const endPoint = `/todo`;
      const res = await fetcher({ endPoint });
      return res;
    },
    ...queries,
  });

  const upsertTodo = ({ queries = {} } = {}) => ({
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
    ...queries,
  });

  const deleteTodo = ({ queries = {} } = {}) => ({
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
    ...queries,
  });

  const updateTodoComplete = ({ queries = {} } = {}) => ({
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
    ...queries,
  });

  return {
    getTodos,
    upsertTodo,
    deleteTodo,
    updateTodoComplete,
  };
};

export default useTodoFetcher;
