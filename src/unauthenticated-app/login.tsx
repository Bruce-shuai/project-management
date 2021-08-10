import React from "react";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  const { login, user } = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单提交的默认行为(跳转到新页面)
    console.log("e.currentTarget", e.currentTarget);
    // 这里的数据获取方法有待研究
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    console.log("username", username);
    console.log("password", password);
    // 进行登录操作
    login({ username, password });
  };

  return (
    // form格式里的 onSubmit 事件是在form标签上使用，而非button标签
    <form onSubmit={(e) => handleSubmit(e)}>
      {user ? <div>登录成功，用户名: {user?.name} </div> : <div>登录失败</div>}
      <div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
