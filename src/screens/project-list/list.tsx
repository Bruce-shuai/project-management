import { TableProps } from "antd/es/table"; // antd 中 Table 的类型定义
import { User } from "./search-panel"; // User 的类型定义
import { Table, Dropdown, Button, Menu } from "antd"; // antd
import dayjs from "dayjs"; // 格式化时间的第三方库
import { Link } from "react-router-dom"; // react-router v6
import { Pin } from "components/pin"; // 小星星：项目收藏或取消收藏
import { useDeleteProject, useEditProject } from "utils/project"; // 编辑项目
import { useProjectModal, useProjectsQueryKey } from "./util"; // url问号后的内容对应项目弹窗
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

// 这里的extends 用得的确挺巧妙的  TableProps 表示Table标签里所有属性的集合的类型
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  // 向服务端发送一个项目编辑请求  PATCH 请求
  const { mutate } = useEditProject(useProjectsQueryKey());
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  return (
    <Table
      loading
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            console.log("project", project);

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
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
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
        {
          // 感觉table的灵活性还是非常强的
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={editProject(project.id)} key="edit">
                      编辑
                    </Menu.Item>
                    <Menu.Item
                      key="delte"
                      onClick={() => deleteProject({ id: project.id })}
                    >
                      删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type="link">...</Button>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
