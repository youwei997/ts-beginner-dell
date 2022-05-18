// readonly 只读属性

// class Person {
//   readonly name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const person = new Person("张三");
// // person.name = "李四"; // 报错   只读属性
// console.log(person.name);

/* 抽象类 */
// 把类里的共用的方法抽象出来
// abstract class Geom {
//   width: number;
//   getType() {
//     return "geom";
//   }
//   // 抽象方法不能写实际的函数体
//   abstract getArea(): number;
// }

// class Circle extends Geom {
//   // 继承了抽象类，抽象类里有抽象方法，必须得具体实现
//   getArea() {
//     return 123;
//   }
// }

// class Square extends Geom {
//   getArea() {
//     return 567;
//   }
// }

/* 接口 */

interface Person {
  name: string;
}
interface Teacher extends Person {
  teachingAge: number;
}

interface Student extends Person {
  age: number;
}

const teacher = {
  name: "张三",
  teachingAge: 18,
};

const student = {
  name: "李四",
  age: 18,
};

const person = (user: Person) => {
  console.log(user.name);
};
person(teacher);
person(student);
