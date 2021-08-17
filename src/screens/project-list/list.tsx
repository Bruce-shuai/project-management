import { TableProps } from "antd/es/table"; // 注意这里的引用
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
export interface Project {
  id: number;
  name: string;
  personId: number; // 不该是number类型吗？
  pin: boolean; // 这个类型是怎么来的？
  organization: string;
  created: number;
}

// 这里的extends 用得的确挺巧妙的  TableProps 表示Table标签里所有属性的集合的类型
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

// 该组件只起到一个展示ui的作用
export const List = ({ users, ...props }: ListProps) => {
  // 向服务端发送一个项目编辑请求  PATCH 请求
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      loading
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, item) {
            return (
              <span>
                {users.find((user) => user.id === item.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
