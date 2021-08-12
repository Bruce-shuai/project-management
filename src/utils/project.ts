import { useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './useAsync';

// Partial<Project> 表示参数 Project 这个对象的属性是可选的
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();  // 用于获取用户信息
  // 为什么这里要放Project[]?  
  // 这里的data:list 是个什么意思呢？
  const {run, ...result} = useAsync<Project[]>();

  /* 通过参数获取List组件数据 */
  useEffect(() => {
    run(client('projects', {
      data: cleanObject(param || {}),
    }))
  }, [param]);
  return result;
}