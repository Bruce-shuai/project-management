import styled from "@emotion/styled";
import { Typography } from "antd";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const client = useHttp(); // 没参数，只是为了返回一个函数

  const debounceParam = useDebounce(param, 500);

  /* 通过参数获取List组件数据 */
  useEffect(() => {
    setIsLoading(true);
    client("projects", {
      data: cleanObject(debounceParam),
    })
      .then((list) => {
        setError(null);
        setList(list);
      })
      .catch((e) => {
        setList([]);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }, [debounceParam]);

  /* 获取SearchPanel的数据, 自定义 useMount 省去奇怪的空数组了 */
  useMount(() => {
    client("users", {}).then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">请求失败{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
