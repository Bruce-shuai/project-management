import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react';
/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(() => keys.reduce((prev: {[key in K]: string}, key: K) => {
      return {...prev, [key]: searchParams.get(key) || ''}}
    , {} as {[key in K]: string}), [searchParams]),
    setSearchParam
  ] as const
}
