import React, {useState, useEffect} from 'react';

export const SearchPanel = () => {

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const [users, setUsers] = useState([])

  const [list, setList] = useState([])

  useEffect(() => {
    // 在useEffect中使用async的方法
    const fetchData = async () => {
      const response = await fetch('');
      if (response.ok) {     // 这个是代替了try……catch？
        const {data} = await response.json();
        setList(data);
      }
    }
    fetchData();
  }, [param])

  return <form>
  {/* 其实这里对js的要求挺严的 */}
  {/* 注意input 标签的 onChange事件 */}
    <input type="text" value={param.name} onChange={(e) => {
      // console.log('e', e);
      // console.log('e.target.value', e.target.value);   // 这里的e.target.value 有讲究的
      setParam({
        ...param,
        name: e.target.value
      })
    }}></input>
    {/* 有个问题是，我没有在网上找到关于 select标签 value属性 */}
    <select value={param.personId} onChange={(e) => {
      setParam({
        ...param,
        personId: e.target.value
      })
    }}>
      <option value="负责人">负责人</option>
      {
        users.map((user) => (
          <option key={user.personId} value={user.id}>{user.name}</option>
        ))
      }
    </select>
    {
      console.log('param', {name: param.name, personId: param.personId})
    }
  </form>
}