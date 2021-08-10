import styled from "@emotion/styled/";
import { ProjectList } from "./screens/project-list";
import { logout } from "auth-provider";
export const AuthenticatedApp = () => {
  return (
    <div>
      <PageHeader>
        <button
          onClick={() => {
            logout();
          }}
        >
          退出登录
        </button>
      </PageHeader>
      <Main>
        <ProjectList />
      </Main>
    </div>
  );
};

const PageHeader = styled.header`
  background-color: gray;
  height: 6rem;
`;

const Main = styled.main`
  display: grid;
  /* 这里的减法用得很妙 */
  grid-template-rows: 6rem calc(100vh - 6rem);
`;
