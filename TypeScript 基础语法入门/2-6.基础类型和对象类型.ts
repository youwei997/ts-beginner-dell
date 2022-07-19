/* 基础类型 null undefined boolean number string symbol */
const count2: number = 0;
const teacherName: string = "张三";

/* 对象类型 */
const teacher: {
  name: string;
  age: number;
} = {
  name: "张三",
  age: 18,
};
// console.log(teacher);

// 数组
const numbers: number[] = [1, 2, 3, 4, 5];
// console.log(numbers);

// 类
class Person {}
const obj: Person = new Person();
// console.log(obj);

// 函数类型
// 类型是函数，返回值是number
const getNumber: () => number = () => {
  return 1;
};
console.log(getNumber());
