// private protected public
// public 允许在类的内外被调用
// private 允许在类内部使用
// protected 允许在类内及子类使用

// class Person {
//   public name: string;
//   private age: number;
//   constructor() {
//     this.name = "";
//     this.age = 0;
//   }
// }

// class Teacher extends Person {
//   sayHi() {
//     console.log(this.name);
//   }
// }

// const person = new Person();
// person.name = "张三";
// // person.age = 12; //报错 ，不能访问
// // console.log(person.name);
// const teacher = new Teacher();
// teacher.name = "teacher";
// teacher.sayHi();

// constructor
// class Person {
//   // 传统写法
//   //   public name: string;
//   //   constructor(name: string) {
//   //     this.name = name;
//   //   }

//   // 简化写法
//   // 等于上面的 ---- 先定义一个变量，然后在构造函数中赋值
//   constructor(public name: string) {}
// }

// const person = new Person("张三");
// console.log(person.name);

// constructor 继承
class Person {
  constructor(public name: string) {}
}
class Teacher extends Person {
  constructor(public age: number) {
    // 子类如果和父类同时都有constructor，必须在子类的constructor中调用super
    super("Teacher"); // 把Teacher 传给 Person
    // console.log("name:" + this.name, "age:" + age);
  }
}
const teacher = new Teacher(12);
console.log(teacher.name);
console.log(teacher.age);
