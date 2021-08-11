import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useHttp } from "utils/http";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const client = useHttp(); // 没参数，只是为了返回一个函数

  const debounceParam = useDebounce(param, 500);

  /* 通过参数获取List组件数据 */
  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParam),
    }).then((list) => {
      console.log("list", list);
      setList(list);
    });
  }, [debounceParam]);

  /* 获取SearchPanel的数据, 自定义 useMount 省去奇怪的空数组了 */
  useMount(() => {
    client("users", {}).then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
