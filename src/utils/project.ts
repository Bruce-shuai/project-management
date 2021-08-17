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

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'    // 尽管路径一样，但方法不同，所以请求的内容也是不同的
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}