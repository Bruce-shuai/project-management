import styled from "@emotion/styled"; // css-in-js
import { Button } from "antd"; // antd
import { SearchPanel } from "./search-panel"; // 首页列表查询
import { List } from "./list"; // 首页列表
import { useProjects } from "utils/project"; // 获取项目的数据
import { useUsers } from "utils/user"; // 获取负责人的数据
import { useProjectModal, useProjectsSearchParams } from "./util"; // 控制url问号后面的内容和项目当前的对照关系
import { ErrorBox } from "components/lib"; // 封装的错误信息显示组件
import { useDebounce, useDocumentTitle } from "../../utils"; // 防抖函数、浏览器任务框 标题名显示

export const ProjectList = () => {
  // 浏览器 任务框 标题命名
  useDocumentTitle("项目列表", true);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500)); // useProjects 是使用了react-query的，所以具备 isLoading、error、data 属性
  const { data: users } = useUsers(); // 获取负责人的信息
  console.log("list", list);
  console.log("users", users);

  return (
    <Container>
      <h1>项目列表</h1>
      <Button type="link" onClick={open}>
        创建项目
      </Button>
      {/* 列表查询 */}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {/* 出错内容显示 */}
      <ErrorBox error={error} />
      {/* 列表具体内容 */}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

// 检查无限循环原因 wdyr
ProjectList.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
