import styled from "@emotion/styled/";
import { ProjectList } from "./screens/project-list";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-context";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {
  return (
    <div>
      <PageHeader />
      <Main>
        {/* 在React-Router 6里面，所有的Route都需要用Routes来包裹 */}
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            {/* 接参数 *这个符号在这里有什么意思呢？ /* 的意思是匹配 /projects/:projectId 后面必须带点东西，比如/project/18/kanban  */}
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            {/* 默认路由 */}
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <HeaderItem>项目</HeaderItem>
        <HeaderItem>用户</HeaderItem>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  退出登录
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          {/* 这里是为了防止页面重新刷新？？牛逼 */}
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Main = styled.main`
  display: grid;
  /* 这里的减法用得很妙 */
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;
