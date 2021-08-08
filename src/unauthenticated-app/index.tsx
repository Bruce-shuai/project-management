import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >
        {isRegister ? "切换至登录页面" : "切换至注册页面"}
      </button>
    </>
  );
};
