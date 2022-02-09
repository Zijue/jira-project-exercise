//!!value 求value的布尔值
export const isFalsy = (value) => (value === 0 ? true : !!value);

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  const result = Object.assign({}, object);
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
