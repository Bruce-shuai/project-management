import "./App.css"; // 文件样式
import { AuthenticatedApp } from "./authenticated-app"; // 登录成功后，进入的app首页
import { UnauthenticatedApp } from "./unauthenticated-app"; // 未登录页面
import { useAuth } from "./context/auth-context"; // 全局钩子，方便全局数据的使用(这里主要指用户授权信息)
import { ErrorBoundary } from "./components/error-boundary"; // 错误边界
import { FullPageErrorFallback } from "components/lib"; // 错误边界显示页面

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
