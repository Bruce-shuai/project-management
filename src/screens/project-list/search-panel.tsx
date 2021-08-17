import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string; // 这下面的属性是自创的？！  可以自创，属性比使用时候多了没事，如果使用时没定义这个属性就有问题
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[]; // 接口之间也能嵌套使用
  // Partial 是一个什么用法？
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void; // 这里真的就非常讲究了
}

// 说实话，能把setParam 进行组件之间的传递，是非常牛逼的功能
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name} // 这里的value 会显示在input里
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        ></Input>
      </Form.Item>
      <Form.Item>
        {/* 注意：select 的value值 必须对应option的value值 */}
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value, // 注意，这里是e.target.value 而不是 e.currentTarget.value
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
