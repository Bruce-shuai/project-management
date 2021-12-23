import { User } from 'types/user';
import { useHttp } from './http';
import { useQuery } from "react-query";


// Partial 和 | undefined 这两者之间有什么关系吗？
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
}