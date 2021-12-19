import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
// import { Test } from "./text";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";

export const ProjectList = () => {
  useDocumentTitle("项目列表", true);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));

  const { data: users } = useUsers();
  return (
    <Container>
      {/* <Test /> */}
      <h1>项目列表</h1>
      <Button type="link" onClick={open}>
        创建项目
      </Button>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">请求失败{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
