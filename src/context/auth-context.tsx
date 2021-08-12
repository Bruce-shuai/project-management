// 创建一个 关于 用户登录 的全局管理
// ReactNode的使用挺有意思的
import React, { useState, useContext, ReactNode, useEffect } from "react";
import { useMount } from "utils";
import { http } from "utils/http";
import * as auth from "../auth-provider"; // 这里的别名用得恰到好处
import { User } from "../screens/project-list/search-panel";

interface ContextType {
  user: User | null;
  login: (form: AuthForm) => Promise<void>; // 这里的类型可以用鼠标看ts的指定类型
  register: (form: AuthForm) => Promise<void>;
  logout: () => void;
}

// 创建一个context对象 AuthContext
const AuthContext = React.createContext<ContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext"; // 用于devtools

interface AuthForm {
  username: string;
  password: string;
}

// 这个函数的作用是在localstorage里面找token
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token }); // me 是后端提供的
    // console.log('datata', data);  // data 里有id name  taken
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (form: AuthForm) => {
    const data = await auth.login(form); // 这里用await的原因是因为auth.login 返回的就是一个Promise对象，根据ts的提升可以知道
    setUser(data);
  };
  const register = async (form: AuthForm) => {
    const data = await auth.register(form);
    // console.log('data', data);
    setUser(data);
    // 发现一个问题当使用usestate对数据进行更新，并不能立刻获取到最新的数据。
    // console.log('user', user);  // user undefined
    // 解决方法： https://segmentfault.com/a/1190000040013137    总共两种方法： 1. 使用useEffect  2. 创建一个新的变量保存最新的数据(感觉意义不大)
  };
  const logout = () => {
    auth.logout();
    setUser(null);
  };

  useMount(() => {
    // 把找到的user 赋值给user  then里面使用setUser是使用了point free的方法
    bootstrapUser().then(setUser);
  });
  // 提供context的生产者   value 是一个对象 value的类型跟createContext 传入的参数类型有关，所以给createContext 这里指定一个泛型
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

/* 自定义一个hook(useAuth 让调用这个钩子的组件可以直接使用context value的内容) */
export const useAuth = () => {
  const context = useContext(AuthContext); // 通过useContext 钩子直接获取 AuthContext 的 value值
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
