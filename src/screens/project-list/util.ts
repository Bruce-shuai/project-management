import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 获取的参数是字符串，所以要转化为字符类型
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}