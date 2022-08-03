/* 访问器装饰器 */
// 访问器装饰器 参数和方法装饰器参数一致
// target getter/setter的prototype
// key getter/setter的名
// descriptor 对 getter/setter 的操作
function visitNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // 是否允许修改
  descriptor.writable = false;
  console.log(key);
}

class Test {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    // 像获取属性一样获取getter
    // console.log(test.name);
    return this._name;
  }

  @visitNameDecorator
  set name(name) {
    // 像给属性赋值一样 赋值setter
    // test.name = "555555";
    this._name = name;
  }
}

const test = new Test("name");
test.name = "555555";
console.log(test.name);
