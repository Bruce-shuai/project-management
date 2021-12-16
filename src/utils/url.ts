import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { useMemo } from 'react';
import { cleanObject } from 'utils';

/**
 * 返回页面url中，指定键的参数值
 */

// 这里的 K 代表的是string类型。  K[] K可以代表各种各样的字符串  例如 name、personId
// <K extends string> 是限制了泛型类型
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 这里用的react-router 用得牛逼
  // searchParams 就包含了 url 后面所带的所有参数信息
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    // useMemo 在这里起到了什么效果？
    useMemo(
      () => keys.reduce((prev: {[key in K]: string}, key: K) => {
        // 这里的[key]括号打得非常巧妙，如果没有，则认为key是字符串。而非变量。为什么这里非要是变量而非字符串呢？？？ 因为如果写成 key:... 则对象属性名字就叫key
        return {...prev, [key]: searchParams.get(key) || ''}
        // 为什么这里的{} 要用as？     因为reduce 函数 的初始值是什么类型，则返回值就是什么类型 (看ts是如何定义的)
      }, {} as {[key in K]: string}),
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      // iterator 遍历器
      // 凡是用了iterator的都可以用for of 进行遍历
      // var a = [1, 2, 3];
      // for (v of a) {console.log(v)}
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
      return setSearchParam(o);
    }
  ] as const
}
