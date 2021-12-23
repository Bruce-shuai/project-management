// 该文件主要针对项目和页面url?后面的相关自定义钩子，以及项目弹窗的自定义钩子
import { useMemo } from 'react';
import { useProject } from 'utils/project';    // 获取项目的数据
import { useUrlQueryParam } from 'utils/url';  // 用于对页面url，问号后的键值对的获取和修改

// 专门用于处理页面url问号后的内容和项目搜索之间的对应关系
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 获取的参数是字符串，所以要转化为字符类型
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}

// 专门用于处理页面url问号后的内容和项目弹窗的对应关系，以及
export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  // 获取相关数据
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))
  // 把数据放在url问号后
  const open = () => setProjectCreate({projectCreate: true})
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  // 清理掉url?后面的内容： 用undefined的方式感觉不错啊~
  const close = () => {
    setProjectCreate({projectCreate: undefined})
    setEditingProjectId({editingProjectId: undefined})
  }
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ['projects', params]
};
