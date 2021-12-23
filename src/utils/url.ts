import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { useMemo } from 'react';
import { cleanObject } from 'utils';

/**
 * 返回页面url中，指定键的参数值
 */
// 这里的 K 代表的是string类型。  K[] K可以代表各种各样的字符串  例如 name、personId
// <K extends string> 是限制了泛型类型
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  
  // return [param1, param2]   ->  param1 指 页面url 问号后的键值对， param2 指 设置页面url 问号后的键值对的方法
  return [
    useMemo(
      () => keys.reduce((prev: {[key in K]: string}, key: K) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in K]: string}),
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
      return setSearchParam(o);
    }
  ] as const
}
