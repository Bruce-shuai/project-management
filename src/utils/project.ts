// 该文件主要是针对 项目栏(项目显示、项目创建) 的工具

import { useHttp } from './http';                                      // 对于http请求的封装(携带了token)
import { Project } from 'screens/project-list/list';                   // 项目的类型接口
import { cleanObject } from "utils/index";
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';   // 利用 react-query 进行api数据的缓存等系列操作
import { useProjectsSearchParams } from 'screens/project-list/util';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

/* 获取所有项目的数据 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();  

  return useQuery<Project[], Error>(['projects', param], () => client('projects', {data: param}))  // 获取并缓存所有项目数据 额外说明：key值(即useQuery 的第一个参数)是非常重要的
}

/* 编辑项目(自定义钩子) */
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Project>) => client(`projects`, {
    method: 'PATCH',   // 由于是修改部分数据，所以这里使用的是PATCH
    data:params
  }),
  useEditConfig(queryKey)
  )
}

/* 添加新项目(自定义钩子)*/
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(   
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      data: params,
      method: 'POST'    // 尽管路径一样，但方法不同，所以请求的内容也是不同的
    }),
    useAddConfig(queryKey)
    )
}


/* 删除项目 */
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}: {id: number}) => 
      client(`projects/${id}`, {
        method: "DELETE"
      }),
      useDeleteConfig(queryKey)
  )
}

/* 获取某一个项目的数据(自定义钩子) */
export const useProject = (id?:number) => {
  const client = useHttp();
  return useQuery<Project>(['project', {id}], () => client(`projects/${id}`), {
    // 第三参数为自定义配置
    enabled: Boolean(id)  // id 为布尔类型的时候才会触发这个query
  })
}