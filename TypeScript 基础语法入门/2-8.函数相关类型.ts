// 返回值类型
function add(first: number, second: number): number {
  return first + second;
}
const total = add(1, 2);
// console.log(total);

// 无返回值
function say(): void {
  console.log("无返回值");
}

// never类型
// 函数不能返回任何类型，只能抛出异常
function errorMessage(): never {
  throw new Error("error");
}

// 函数接收解构类型
function add2({ first, second }: { first: number; second: number }) {
  return first + second;
}
const total2 = add2({ first: 1, second: 2 });

function add3({ first }: { first: number }) {
  return first;
}
const total3 = add3({ first: 66 });
console.log(total3);
