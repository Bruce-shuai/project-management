import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

// login 无论放在LoginScreen里面还是外面似乎都是可以的
const login = async (param: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    // 这一步的headers似乎是POST请求必写的内容
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param), // 把传入的对象json化
  });
  if (response.ok) {
  }
};

export const LoginScreen = () => {
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
