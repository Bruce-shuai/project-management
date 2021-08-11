import styled from "@emotion/styled/";
import { ProjectList } from "./screens/project-list";
import { logout } from "auth-provider";
import { Row } from "components/lib";
export const AuthenticatedApp = () => {
  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <HeaderItem>Logo</HeaderItem>
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <button
            onClick={() => {
              logout();
            }}
          >
            退出登录
          </button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </div>
  );
};

const Main = styled.main`
  display: grid;
  /* 这里的减法用得很妙 */
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const Header = styled(Row)``;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;
