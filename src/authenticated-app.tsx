import styled from "@emotion/styled/";
import { ProjectList } from "./screens/project-list";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-context";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useState } from "react";
import ProjectModal from "screens/project-list/project-modal";
import ProjectPopover from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        projectButton={
          <Button type="link" onClick={() => setProjectModalOpen(true)}>
            创建项目
          </Button>
        }
      />
      <Button
        onClick={() => {
          setProjectModalOpen(true);
        }}
      >
        打开
      </Button>
      <Main>
        <Router>
          {/* 在React-Router 6里面，所有的Route都需要用Routes来包裹 */}
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectList
                  projectButton={
                    <Button
                      type="link"
                      onClick={() => setProjectModalOpen(true)}
                    >
                      创建项目
                    </Button>
                  }
                />
              }
            />
            {/* 接参数 *这个符号在这里有什么意思呢？ /* 的意思是匹配 /projects/:projectId 后面必须带点东西，比如/project/18/kanban  */}
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            {/* 默认路由 */}
            <Route
              index
              element={
                <ProjectList
                  projectButton={
                    <Button
                      type="link"
                      onClick={() => setProjectModalOpen(true)}
                    >
                      创建项目
                    </Button>
                  }
                />
              }
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
        }}
      />
    </div>
  );
};

// 首页顶部
const PageHeader = (props: { projectButton: JSX.Element }) => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          {/* <div style={{transform: 'translate'}}> */}
          <SoftwareLogo
            width="20rem"
            style={{ transform: "translateY(-8px)" }}
            color="rgb(38, 132, 255)"
          />
          {/* </div> */}
        </Button>
        <ProjectPopover {...props} />
        <span>用户</span>
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

// -----------------CSS-in-JS------------------
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
