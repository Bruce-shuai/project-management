import React from "react";
import { User } from "./search-panel";
interface Project {
  id: string;
  name: string;
  personId: string; // 不该是number类型吗？
  pin: boolean; // 这个类型是怎么来的？
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  // 注意这里是table 标签,怎么用要知道
  return (
    <table>
      {/* 语义化标签，很好！！ 但是优势是什么呢？ */}
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {users.find((user) => user.id === item.personId)?.name ||
                  "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
