import React, { useState, useEffect } from 'react';
import { cleanObject } from '../../utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import * as qs from 'qs';

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  
  // 这一步使用process.env 很有意思！
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('apiUrl', apiUrl);

  // 感觉下面两个useEffect 其实结构都差不多，不知道能否更加精简点
  /* 获取List组件数据 */
  useEffect(() => {
    // 这里展示了在useEffect里如何使用 async……await
    const fetchData = async () => {
      // 注意一件事情，即personId 和 id 是不一样的
      // cleanObject用来排除name 为空什么数据都不返回的情况(该项目的要求是name为空时所有数据都要返回)的情况
      // const response = await fetch(`${apiUrl}/projects?personId=${cleanObject(param).personId}&name=${cleanObject(param).name}`);
      const response = await fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`);   // 使用qs来代替上面一长串的内容
      if (response.ok) {     // 这里的try……catch该怎么设置才好呢？   
        const data = await response.json();
        // console.log('data', data);
        setList(data);
      }
    }
    fetchData();   // 执行fetch函数
  }, [param])

  /* 获取SearchPanel的数据 */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/users`);
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setUsers(data)
      }
    }
    fetchData();
  }, [])

  return <>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </>
}