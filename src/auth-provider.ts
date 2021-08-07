import { User } from './screens/project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

/* 获取token */
export const getToken = () => {
  window.localStorage.getItem(localStorageKey);
}

/* 服务器响应的数据(token)放在localStorage里 */
// 这里的es6 解构user 的ts类型定义 比较有特点，记一记
export const handleUserResponse = ({user}: {user: User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
}

/* 用户登录的函数 */
const login = async (data: {username: string, password: string}) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    // 感觉这里不用return应该也可以吧？！
    return handleUserResponse(await response.json())
  }
}

/* 用户注册的函数 */
const register = async (data: {username: string, password: string}) => {
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
  }
}

/* 用户注销的函数 */
const logout = () => window.localStorage.removeItem(localStorageKey)