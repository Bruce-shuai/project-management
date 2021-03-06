import { useState, useEffect, useRef } from "react";

export const isFalse = (value: unknown) => {
  return value === 0 ? false : !value;
};

// 此函数用于排除对象的键值对出现false 值 (防止本身 false值就是有意义却被删除的情况)
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 这里直接对对象定义为object类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    // console.log('---');
    // @ts-ignore   ts-ignore 用法也感觉挺神奇的
    if (isVoid(newObject[key])) {
      // @ts-ignore
      delete newObject[key];
    }
  });
  // console.log('newObject', newObject);
  return newObject;
};

/**
 * 返回组件的挂载状态,如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    // 这又是useRef的什么用法呢？
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};

/* 自定义空数组useEffect钩子 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/* 自定义防抖钩子 */
// 可以作为模板，但最好自己写熟，且知道每行代码有啥意义!  // 参数可传递可不传递用？
export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 这里的回调函数有无返回值应该都没什么问题
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    }; // 返回值 必须是函数吗？
  }, [value, delay]);
  return debounceValue;
};

// 似乎箭头函数使用泛型 不能直接写成 <T> 而是应该写成 T extends unknown
export const useArray = <T extends unknown>(param: T[]) => {
  // array 命名 首字母应该不用大写
  const [array, setArray] = useState(param); // 有一个问题，这useState应该不会对传入的参数进行修改吧？！
  console.log("param", param);
  console.log("array", array);

  return {
    add: (item: T) => {
      setArray([...array, item]);
    }, // 这里 双越教程好像在setState那里有讲不可变值增加数据的方法
    removeIndex: (num: number) => {
      setArray(array.slice(num + 1));
    }, // slice 是 返回一个新的数组，符合不可变值的思想
    clear: () => {
      setArray([]);
    }, // 清空数组内容
    value: array,
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // useRef  返回的ref对象在组件的整个生命周期内保持不变
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 这招重置路由 感觉有点牛逼(不仅可以重置路由，还可以刷新页面)
// window.location 的用法可以学习学习
/*
  window.location.href returns the href (URL) of the current page
  window.location.hostname returns the domain name of the web host
  window.location.pathname returns the path and filename of the current page
  window.location.protocol returns the web protocol used (http: or https:)
  window.location.assign() loads a new document
  window.location.origin   Return the protocol, hostname and port number of a URL.
*/
/*
  两者区别
  window.location.origin
  "https://www.w3schools.com"
  window.location.href
  "https://www.w3schools.com/jsref/prop_loc_origin.asp"
*/
export const resetRoute = () => (window.location.href = window.location.origin);
