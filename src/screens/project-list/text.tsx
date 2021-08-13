import React, { useEffect, useState } from "react";
import { useMount } from "utils";

// react hook 与 闭包， hook与闭包经典的坑(挺有意思的)
export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  // useMount(() => {
  //   setInterval(() => {
  //     console.log('num in setInterval', num);  // 闭包  num 0
  //   }, 1000);
  // })

  // useEffect(() => {
  //   return () => {
  //     console.log(num);  // useEffect依赖为[]以及闭包原因，这里的num放的是0。 所以，组件撤销的时候，打印0
  //   }
  // }, [])

  // 为了让useEffect 取得最新的值，依赖项要用好
  useEffect(() => {
    return () => {
      console.log(num); // 卸载值 为 最新值 (这里的内容 双越视频其实是有讲的)
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
