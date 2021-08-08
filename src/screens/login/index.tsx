import { useAuth } from "context/auth-context";
import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // 这样就非常简洁了
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

  // 这里的基础格式非常重要
  // 通过 e => ... 方法来获取e的ts类型定义
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {user ? (
        <div>
          登录成功，用户名: {user?.name}{" "}
          {/* 因为user 类型是User | null 所以这里是?.*/}
        </div>
      ) : (
        <div>登录失败</div>
      )}
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
