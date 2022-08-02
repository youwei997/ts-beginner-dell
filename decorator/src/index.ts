// T 继承一个构造函数。...args 展开变成一个数组，里面的元素都是any类型，函数的返回值是一个空对象
// T extends new (...args: any[]) => {}
// function testDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
//   // 返回原始的class
//   return class extends constructor {
//     name = "li";
//   };
// }
// @testDecorator
// class Test {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const test = new Test("zs");
// console.log(test);

// (test as any).getName();

// 工厂模式
function testDecorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "lee";
      getName() {
        return this.name;
      }
    };
  };
}

const Test = testDecorator()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test = new Test("zs");
console.log(test);
