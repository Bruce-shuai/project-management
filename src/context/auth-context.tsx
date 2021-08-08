// 创建一个 关于 用户登录 的全局管理
import React, { useState, useContext, ReactNode } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";

interface ContextType {
  user: User | null;
  login: (form: AuthForm) => Promise<void>; // 这里的类型可以用鼠标看ts的指定类型
  register: (form: AuthForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<ContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext"; // 用于devtools

interface AuthForm {
  username: string;
  password: string;
}

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
  };
  const logout = () => {
    auth.logout();
    setUser(null);
  };

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
