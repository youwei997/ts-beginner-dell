/* 数组 */
// 联合类型数组
const arr: (string | number)[] = [1, "2"];
// 字符串数组
const stringArr: string[] = ["1", "2"];
// undefined数组
const undefinedArr: undefined[] = [undefined];

// type alias
type User = {
  name: string;
  age: number;
};
// const userArr: User[] = [
//   {
//     name: "张三",
//     age: 18,
//   },
// ];

// class 也可以当作类型
class Teacher {
  name: string;
  age: number;
}
// const userArr: Teacher[] = [
//   {
//     name: "张三",
//     age: 18,
//   },
// ];

// 接口 interface 也可以
interface Person {
  name: string;
  age: number;
}

const userArr: Person[] = [
  {
    name: "张三",
    age: 18,
  },
];

/* 元组 */
// tuple 可以更好的约束数组的每一项
// 数量有限是数组，每一项都是固定的类型
const tuple: [number, string] = [1, "2"];
// 元组 csv
const tupleList: [string, string, number][] = [
  ["张三", "male", 11],
  ["李四", "male", 31],
  ["五五", "male", 41],
];
