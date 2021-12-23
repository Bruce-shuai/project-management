import styled from "@emotion/styled/"; // css-in-js
import { ProjectList } from "./screens/project-list"; // 项目列表
import { Row } from "components/lib"; // 行样式封装成组件，
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"; // 将svg组件化
import { Dropdown, Menu, Button } from "antd"; // antd
import { useAuth } from "context/auth-context"; // 全局钩子，方便全局数据的使用(这里主要指用户授权信息)
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // react-router-v6
import { resetRoute } from "utils"; // 功能函数：用于url返回到首页
import { ProjectScreen } from "screens/project"; // 项目列表每一项的具体内容
import ProjectModal from "screens/project-list/project-modal"; // 项目创建弹窗
import ProjectPopover from "components/project-popover"; // 首页头部 项目栏 鼠标触碰后展示的内容

export const AuthenticatedApp = () => {
  return (
    <div>
      <Router>
        {/* 项目头部 */}
        <PageHeader />
        <Main>
          <Routes>
            {/* 项目列表 */}
            <Route path="/projects" element={<ProjectList />} />
            {/* 项目列表每一项的具体内容 */}
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            {/* 默认路由 */}
            <Route index element={<ProjectList />} />
          </Routes>
        </Main>
        {/* 项目创建弹窗 */}
        <ProjectModal />
      </Router>
    </div>
  );
};

/* 首页顶部 */
const PageHeader = () => {
  const { logout, user } = useAuth(); // 从全局数据中获取 退出登录 以及 user 信息数据
  return (
    <Header between={true}>
      {/* 首页头部 左侧 */}
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo
            width="20rem"
            style={{ transform: "translateY(-8px)" }}
            color="rgb(38, 132, 255)"
          />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>

      {/* 首页头部 右侧 */}
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
          {/* 防止点击后，页面重新刷新 */}
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
