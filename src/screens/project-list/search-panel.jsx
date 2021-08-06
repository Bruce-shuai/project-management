import React from 'react';

export const SearchPanel = ({users, param, setParam}) => {

  return <form>
    <input type="text" value={param.name} onChange={(e) => {
      setParam({
        ...param,
        name: e.target.value
      })
      console.log('e', e.target.value);
    }}></input>
    {/* 注意：select 的value值 必须是序号 */}
    <select value={param.personId} onChange={(e) => {
      setParam({
        ...param,
        personId: e.target.value
      })
    }}>
      <option value="">负责人</option>
      {
        users.map((user) => (
          // option 的value表示的是什么？
          <option key={user.id} value={user.id}>{user.name}</option>
        ))
      }
    </select>
  </form>
}