// 此文件的工具函数用了抽象http请求

// 这里同样用了es6的一些语法
// ...customConfig 具备覆盖上面数据的能力
import * as qs from 'qs';
import * as auth from '../auth-provider';
const apiUrl = process.env.REACT_APP_API;

// RequestInit 是从fetch的ts类型提示里获取的
interface Config extends RequestInit {  
  data?: object,
  token?: string
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}:Config) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}}` : '',   // token的标准用法 话说，Authorization是自定义的吗？对后端有啥用(我感觉后端的nodejs知识我还得好好学学才行啊)
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig    // es6 的语法 ...customConfig 具备覆盖上面数据的能力(例如POST覆盖GET)
  }

  if (config.method.toUpperCase() === 'GET') { // toUpperCase的使用是为了保证全部都是大写字母吗？
    endpoint += qs.stringify(data);
  } else {
    config.body = JSON.stringify(data || {})
  }

  // 使用window.fetch 和 fetch 二者有什么区别？
  const response = await fetch(`${apiUrl}/endpoint`, config);
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
