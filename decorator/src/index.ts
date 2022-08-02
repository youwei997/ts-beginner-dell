// 类的装饰器 本身是一个函数
// 就是对类的一种修饰

// 类的装饰器，接收的是一个构造函数
function testDecorator(constructor: any) {
  //   constructor.prototype.getName = () => {
  //     console.log("getName");
  //   };
  console.log("testDecorator1");
}

function testDecorator2(constructor: any) {
  //   constructor.prototype.getName = () => {
  //     console.log("getName");
  //   };
  console.log("testDecorator2");
}

// 装饰器传参
function decoratorParams(flag: boolean) {
  // 有传入参数时执行返回装饰器，否则返回空的装饰器
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.getName = () => {
        console.log("getName");
      };
    };
  } else {
    return (constructor: any) => {};
  }
}

// 类创建是就执行，不是实例化才执行
// 类装饰器收集是从上到下，装饰器执行顺序是从下到上
@testDecorator
@testDecorator2
@decoratorParams(false)
class Test {}

const test = new Test();
(test as any).getName();
