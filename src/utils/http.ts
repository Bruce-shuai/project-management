// 此文件的工具函数用了抽象http请求

// 这里同样用了es6的一些语法
// ...customConfig 具备覆盖上面数据的能力
import * as qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

// RequestInit 是从fetch的ts类型提示里获取的
interface Config extends RequestInit {  
  data?: object,
  token?: string
}

// 给参数加了默认值 {data, token, headers, ...customConfig}:Config = {} 参数就变成可选的了
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {  
  const config = {
    method: 'GET',
    headers: {
      // Authorization  HTTP授权的授权证书  内置在Header里的属性 似乎token 就是放在 Authorization里面的
      Authorization: token ? `Bearer ${token}` : '',   // token的标准用法 话说，Authorization是自定义的吗？对后端有啥用(我感觉后端的nodejs知识我还得好好学学才行啊)
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig    // es6 的语法 ...customConfig 具备覆盖上面数据的能力(例如POST覆盖GET)
  }

  if (config.method.toUpperCase() === 'GET') { // toUpperCase的使用是为了保证全部都是大写字母吗？
    endpoint += `?${qs.stringify(data)}`;   // qs.stringify 会把对象 转换成 url 传入的参数格式 ..&..(?需要自己来补充)
    // console.log('endpoint', endpoint); 
  } else {
    config.body = JSON.stringify(data || {})
  }

  // 使用window.fetch 和 fetch 二者有什么区别？
  const response = await window.fetch(`${apiUrl}/${endpoint}`, config);
  if (response.status === 401) {
    await auth.logout();     
    window.location.reload();    // 页面进行重新刷新， 为什么要重新刷新呢？ 用于清理状态吗？
    return Promise.reject({message: '请重新登录'})
  }
  // 这里的数据有啥用呢？
  const res_data = await response.json();
  if (response.ok) {
    return res_data;
  } else {
    return Promise.reject(data);
  }
} 

// 自定义一个hook, 用于给登录、注册函数自动传入token，而非自己手动传入token
export const useHttp = () => {
  const { user } = useAuth();
  // [string, Config] 类型是什么个用法？ 似乎就是tuple类型，等下研究研究
  // 为什么恒等于 Parameters<typeof http> ？
  // ts rest 操作符的概念
  
  return (...[endpoint, config]:[string, Config]) => {
    return http(endpoint, {...config, token: user?.token})
  }
}