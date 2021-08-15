import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { useMemo } from 'react';
import { cleanObject } from 'utils';
/**
 * 返回页面url中，指定键的参数值
 */
// 这里的K 代表的是string类型。  K[] K可以代表各种各样的字符串  例如 name、personId
// <K extends string> 是限制了泛型类型
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // searchParams 就包含了 url 后面所带的所有参数信息
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () => keys.reduce((prev: {[key in K]: string}, key: K) => {
        // 这里的[key]括号打得非常巧妙，如果没有，则认为key是字符串。而非变量
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in K]: string}),
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}
