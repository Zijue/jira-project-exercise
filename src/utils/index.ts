import { useEffect, useRef, useState } from "react";

//!!value 求value的布尔值
export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在一个函数里，改变传入的对象本身是不好的
//此处object使用{[key: string]: unknown}不适用object类型的原因，是因为object不止指代键值对，还可以表示函数
//而函数是没有办法通过键去取值的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = Object.assign({}, object);
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//custom hook，用于在组件加载时只执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  //页面加载时：oldTitle
  //加载后：新title
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      //组件卸载时执行
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 * @returns
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
