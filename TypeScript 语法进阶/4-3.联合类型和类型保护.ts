interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

/*  类型保护 */

// 类型断言
function trainAnimal(animal: Bird | Dog) {
  // 联合类型，animal 只会取共有的属性或方法
  //   console.log(animal.fly);
  // animal.fly 为true时，说明是Bird类型
  if (animal.fly) {
    // 再用断言类型，把animal转换成Bird类型，就可以访问sing方法
    (animal as Bird).sing();
  } else {
    // animal.fly 为false，把animal转换成Dog类型，就可以访问bark方法
    (animal as Dog).bark();
  }
}

// in 语法类型保护
function trainAnimal2(animal: Bird | Dog) {
  if ("fly" in animal) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}

// typeof 类型保护
function add(first: string | number, second: string | number) {
  // 有一个是string类型，就返回string类型
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  } else {
    return first + second;
  }
}

// instanceof 类型保护
class NumberObj {
  constructor(public count: number) {}

  // 和上面的一样
  //   count: number;
  //   constructor(count: number) {
  //     this.count = count;
  //   }
}
function add2(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
