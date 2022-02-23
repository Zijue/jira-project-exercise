import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { Project } from "types/project";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };
  return useQuery<Task[]>(["tasks", debouncedParam], () =>
    client("tasks", { data: debouncedParam })
  );
};
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
