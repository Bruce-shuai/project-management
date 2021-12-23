import { User } from './types/user'

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

/* 从localStorage里获取token */
export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
}

/* 服务器响应的数据(token)放在localStorage里 */
// 这里的es6 解构user 的ts类型定义 比较有特点，记一记
export const handleUserResponse = ({user}: {user: User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '')    // || 在这里用得挺妙的， 而且键值好像必须是字符串
  // console.log('user', user);   user 就三个信息： 1. id   2. name  3. token
  
  return user;   
}

/* 用户登录的函数 */
export const login = async (data: {username: string, password: string}) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'    // post 请求需要在这儿写一行内容
    },
    body: JSON.stringify(data)              // json.stringify 在POST请求这儿是基本的使用格式了
  })
  
  if (response.ok) {
    // 感觉这里不用return应该也可以吧？！
    return handleUserResponse(await response.json());   // 注意这里解析的是response.json()
  } else {
    return Promise.reject(await response.json());    // 这里的效果类似 throw new Error
  }
}

/* 用户注册的函数 */
export const register = async (data: {username: string, password: string}) => {
  console.log('进入注册函数');
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  if (response.ok) {
    // 感觉这里不用return应该也可以吧？！
    return handleUserResponse(await response.json())
  } else {
    return Promise.reject(await response.json());    // 这里的效果类似 throw new Error
  }
}

/* 用户注销的函数 */
export const logout = () => window.localStorage.removeItem(localStorageKey)


