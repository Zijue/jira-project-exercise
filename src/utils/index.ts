import { useEffect, useState } from "react";

//!!value 求value的布尔值
export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  const result = Object.assign({}, object);
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (!isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

//custom hook，用于在组件加载时只执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//防抖custom hook
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
