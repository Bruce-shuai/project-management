import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // 这一步使用process.env 很有意思！
  const apiUrl = process.env.REACT_APP_API_URL;

  // 感觉下面两个useEffect 其实结构都差不多，不知道能否更加精简点
  const debounceParam = useDebounce(param, 500);
  // console.log('debounce', debounceParam);
  /* 获取List组件数据 */
  useEffect(() => {
    // 这里展示了在useEffect里如何使用 async……await
    const fetchData = async () => {
      const response = await fetch(
        `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
      );
      if (response.ok) {
        // 这里的try……catch该怎么设置才好呢？
        const data = await response.json();
        // console.log('data', data);
        setList(data);
      }
    };
    fetchData(); // 执行fetch函数
  }, [debounceParam]);

  /* 获取SearchPanel的数据, 自定义 useMount 省去奇怪的空数组了 */
  useMount(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/users`);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setUsers(data);
      }
    };
    fetchData();
  });

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  );
};
