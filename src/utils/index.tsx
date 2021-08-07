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
