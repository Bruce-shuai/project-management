import {QueryKey, useQueryClient} from 'react-query';

export const useConfig = (queryKey:QueryKey, callback:(target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();
  return { 
    onMutate: async (target:any) => {
      const previousTodos = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {  // 这里的?: 其实是非常有学问的...对于 ...|undefined 
        return callback(target, old)
      })
      return {previousTodos} 
    },
    onError: (err:any, newTodo: any, context:any) => {
      queryClient.setQueryData(queryKey, context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));