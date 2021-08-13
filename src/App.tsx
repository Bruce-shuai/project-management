import "./App.css";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
/* App.tsx文件 做判断页面是否登录恰到好处 */
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
