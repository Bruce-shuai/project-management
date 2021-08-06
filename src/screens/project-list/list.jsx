import React from 'react';

export const List = ({list, users}) => {
  // 注意这里是table 标签,怎么用要知道
  return <table>
    {/* 语义化标签，很好！！ 但是优势是什么呢？ */}
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map((item) => {
          return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{users.find(user => user.id === item.personId)?.name || '未知'}</td>
          </tr>
        })
      }
    </tbody>
  </table>

}