import { useState, useEffect } from "react";

const isFalse = (value: any) => {
  return value === 0 ? false : !value;
};
// 这里直接对对象定义为object类型
export const cleanObject = (object: object) => {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    // console.log('---');
    // @ts-ignore   ts-ignore 用法也感觉挺神奇的
    if (isFalse(newObject[key])) {
      // @ts-ignore
      delete newObject[key];
    }
  });
  // console.log('newObject', newObject);
  return newObject;
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

// 这个是有误的
// export const useDebounce = (value, delay) => {
//   let timeout;
//   useEffect(() => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout((value) => {return value}, delay)
//   }, [value, delay])
// }
