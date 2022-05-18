// getter setter

// class Person {
//   // private _name 私有属性一般前面加下划线
//   constructor(private _name: string) {}
//   // getter setter 可以做一些额外的操作
//   get name(): string {
//     // getter 可以通过 person.name 直接获取
//     return this._name + " 先生";
//   }
//   set name(name: string) {
//     // 设置name person.name = "李四";
//     name = name.split(" ")[0];
//     this._name = name;
//   }
// }

// const person = new Person("张三");
// console.log(person.name);
// person.name = "李四 加密";
// console.log(person.name);

/* ts 单例模式 */
class Demo {
  // 这里的 static 代表类的静态属性，而不是实例的属性
  // instance 就是实例 所以它的类型是 Demo
  private static instance: Demo;
  // constructor 前面加 private ，代表不允许在类外部使用 new 操作符生成实例
  private constructor(public name: string) {}
  // 获取实例
  static getInstance() {
    // 如果 getInstance 方法有接收值，那么只有第一次调用时，才会生成实例，只有第一次传的值才有效
    // 判断是否存在实例
    if (!this.instance) {
      // 不存在实例，创建实例
      this.instance = new Demo("张三");
    }
    // 返回 instance 实例
    return this.instance;
  }
}

// const demo1 = new Demo(); // 报错
// const demo2 = new Demo(); // 报错
const demo3 = Demo.getInstance();
const demo4 = Demo.getInstance();
console.log(demo3.name);
console.log(demo4.name);
console.log(demo3 === demo4); // 返回 true，说明是同一个实例
