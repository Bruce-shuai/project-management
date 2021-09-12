import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  // 有点困惑，这里的{...props}发挥着什么样的作用呢？
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
