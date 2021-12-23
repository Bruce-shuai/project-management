import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[]; // 接口之间也能嵌套使用
  param: Partial<Pick<Project, "name" | "personId">>; // 参数全部可选
  setParam: (param: SearchPanelProps["param"]) => void; // 这里真的就非常讲究了
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        ></Input>
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
