// 静态类型

// 一个变量为静态类型，只能赋值为该类型的值，可以获得该类型的静态属性和方法

//count 类型为number 并具备number的所有属性和方法
const count: number = 0;
count.toFixed(2);

// interface
interface Point {
  x: number;
  y: number;
}

const point: Point = {
  x: 0,
  y: 0,
};
// point 具备Point上的属性和方法
point.x;
