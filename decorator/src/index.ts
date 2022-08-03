/* 属性装饰器 */

// 属性装饰器只有两个参数
// target
// key
// 虽然属性装饰器没有descriptor，但是可以自定义descriptor，然后return出去，替换属性的descriptor，也是一样的效果
// function nameDecorator(target: any, key: string): any {
//   const descriptor: PropertyDescriptor = {
//     writable: false,
//   };
//   return descriptor;
// }

// 修改的并不是实例上的name吗，而是原型上的name
// function nameDecorator(target: any, key: string): any {
//   // 可以使用 (test as any).__proto__.name 访问修改的属性
//   target[key] = "descriptor";
// }

function nameDecorator(target: any, key: string): any {
  const descriptor: PropertyDescriptor = {
    writable: true,
  };
  return descriptor;
}

// name 放在实例上
class Test {
  @nameDecorator
  name: string = "default";
  //   constructor(name: string) {
  //     this.name = name;
  //   }
}

const test = new Test();
// test.name = "11";
console.log(test.name);

export default void 0;
