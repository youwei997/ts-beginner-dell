// ts基础类型 boolean,number,string,void,undefined,symbol,null
let count: number;
count = 123;

// 对象类型 ,{}, Class, function, []
// 函数返回值类型和参数类型定义在箭头函数函数体中
// 这种写法可以不指定返回值，可以根据函数体内容自动推断
// 但是如果指定了返回值，那么必须和指定的返回值类型一致
const func = (str: string) => {
  return parseInt(str);
};

// 函数返回值和参数类型定义在函数名中
// 冒号后面跟类型，等号后面跟具体实现
const func2: (str: string) => number = (str) => {
  return parseInt(str);
};

// js 内置函数
// 可以自动推断函数返回值类型
const date = new Date();

interface Person {
  name: string;
}
const rawData = '{"name":"张三"}';
const newData: Person = JSON.parse(rawData);

// 联合类型
let temp: number | string = 1234567;
temp = "1234567";
