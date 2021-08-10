import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card } from "antd";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card>
        {" "}
        {/* Card 组件感觉还挺有意思的 */}
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "切换至登录页面" : "切换至注册页面"}
        </button>
      </Card>
    </div>
  );
};
