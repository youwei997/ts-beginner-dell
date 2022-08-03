/* 方法装饰器 */

/* 第一个参数 target */
// 普通方法，target对应的是类的prototype
// 静态方法（static function），target对应的是类的构造函数
/* 第二个参数 key */
// key是装饰的方法名字
/* 第三个参数 descriptor */
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.value = () => {
    return "descriptor";
  };
}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}
const test = new Test("name");
console.log(test.getName());
