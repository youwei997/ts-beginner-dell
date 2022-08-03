/* 装饰器实际使用的小例子 */

const userInfo: any = { name: "name" }; //undefined  {name:'name'}

/* 装饰器统一捕获异常 */
// function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
//   // 先把原函数保存
//   const fun = descriptor.value;

//   // 再重写原函数，使用try catch捕获错误
//   descriptor.value = function () {
//     try {
//       fun();
//     } catch (error) {
//       console.log("userInfo 存在问题");
//     }
//   };
// }

/* 装饰器工厂，传递不同方法的错误信息 */
function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // 先把原函数保存
    const fun = descriptor.value;

    // 再重写原函数，使用try catch捕获错误
    descriptor.value = function () {
      try {
        // 这里必须得return 出去，要不然外面接收不到值，无语！！！！！！！！！！！！！！！！！！！！
        return fun();
      } catch (error) {
        console.log(msg);
      }
    };
  };
}

class Test {
  @catchError("userInfo.name 不存在")
  getName() {
    return userInfo.name;
  }
  @catchError("userInfo.age 不存在")
  getAge() {
    return userInfo.age;
  }
}

const test = new Test();
// console.log(test.getName());
test.getName();
// test.getAge();
