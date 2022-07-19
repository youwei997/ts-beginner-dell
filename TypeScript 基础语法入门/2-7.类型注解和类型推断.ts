// type annotation 类型注解，我们来告诉ts变量的类型
// type inference 类型推断,ts会根据我们的代码自动推断变量的类型
// 如果ts能自动分析变量的类型，那么我们就不需要写类型注解
// 如果ts不能自动分析变量的类型，那么我们就需要写类型注解

let count3: number;
count3 = 3;

const obj3 = {
  name: "张三",
};

// 无需手动写类型注解，ts会自动推断
const firstNumber = 1;
const secondNumber = 2;
const sum = firstNumber + secondNumber;

// 手动写类型注解
const getNumber2 = (firstNumber: number, secondNumber: number) => {
  return firstNumber + secondNumber;
};
console.log(getNumber2(1, 2));
