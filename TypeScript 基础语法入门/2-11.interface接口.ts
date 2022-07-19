// interface
// interface 和type 那用interface就用interface

interface Person {
  //   readonly name: string; //只读
  name: string;
  age?: number; // 可有可无
  //   [propName: string]: any; // 可以有任意属性
  say(): string; // 方法
}

// 接口继承
interface Teacher extends Person {
  teach(): string;
}

const getPersonName = (person: Person): string => {
  return person.name;
};

const setPersonName = (person: Person, name: string): void => {
  person.name = "张三";
};

// 写入一个接口没有的属性 ，使用对象赋值后传入默认没问题
// sex: "male",
const person = {
  name: "李四",
  sex: "male",
  say() {
    return "";
  },
};
getPersonName(person);
// 直接传入对象，并且interface没有设置 [propName:string]:any 时，会强制校验出错，因为接口没有sex的属性
// getPersonName({
//   name: "李四",
//   sex: "male",
// }); //报错
setPersonName(person, "张三");

/* class */
// implements 应用某个接口
class User implements Person {
  name = "张三";
  say(): string {
    return "";
  }
}

// 接口继承
// Teacher 继承了 Person 就必须得有 Person 的所有属性，并且还要有自己的方法和属性
const teacher: Teacher = {
  name: "李四",
  say() {
    return "";
  },
  teach() {
    return "";
  },
};

// 接口函数
interface SayHi {
  (name: string): string;
}
// 参数和返回值都得对应
const sayHi: SayHi = (name: string) => {
  return `hi ${name}`;
};
