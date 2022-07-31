// 普通方法
// function join(first: string | number, second: string | number) {
//   return `${first}:${second}`;
// }
// console.log(join(1, 2));

// 泛型字符串
// function join<T>(first: T, second: T) {
//   return `${first} : ${second}`
// }
// console.log(join<string>('zhan', 'san'));

// 数组类型
// function map<T>(params: T[]) {
//   return params
// }
// map<string>(['1', '2'])

// 多个泛型
// function join<S, N>(name: S, age: N) {
//   return `name:${name} ---- age:${age}`
// }
// // 即使不显式传入泛型，ts也会自动推断
// console.log(join<string, number>('张三', 11));

// 返回值也是泛型
function join<T>(first: T, second: T): T {
  return first
}

console.log(join<string>('张三', '66'));
