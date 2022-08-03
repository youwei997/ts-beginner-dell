// target 为类的prototype 或 类实例化对象的__proto__
// console.log((test as any).__proto__ === Test.prototype); //true

// 第一个 target 为类的原型 prototype
// 第二个 key 为方法名
// 第三个 paramIndex 为参数的下标，在方法形参的位置
function paramDecorator(target: any, key: string, paramIndex: number): any {
  console.log(target, key, paramIndex);
}

class Test {
  getInfo(name: string, @paramDecorator age: number) {
    // console.log(name, age);
  }
}

const test = new Test();
test.getInfo("zs", 12);
// console.log((test as any).__proto__ === Test.prototype);

export default void 0;
