import "./App.css";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {user ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          退出登录
        </button>
      ) : null}
    </div>
  );
}

export default App;
