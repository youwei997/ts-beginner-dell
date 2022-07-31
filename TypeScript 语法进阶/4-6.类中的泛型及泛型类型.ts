// class DataManger {
//     // data: string[] = []
//     // constructor(data: string[]) {
//     //     this.data = data
//     // }
//     constructor(private data: string[]) { }
//     getItem(index: number): string {
//         return this.data[index]
//     }
// }
// const data = new DataManger(['2'])
// console.log(data.getItem(0));


/* 类传入泛型 */
// class DataManger<T> {
//     constructor(private data: T[]) { }
//     getItem(index: number): T {
//         return this.data[index]
//     }
// }
// const data = new DataManger<string>(['2'])
// console.log(data.getItem(0));


/* 泛型继承interface */
// interface Item {
//     name: string
// }
// // T继承Item，必须得有Item里的所有东西
// class DataManger<T extends Item> {
//     // data传入是一个数组，T就相当于是下面数组里的对象obj
//     constructor(private data: T[]) { }
//     getItem(index: number): string {
//         return this.data[index].name
//     }
// }
// const obj = { name: '张三' }
// const data = new DataManger([obj])
// console.log(data.getItem(0));


/* 泛型使用extends约束 */
// 只能传入number或string的类型
// class DataManger<T extends number | string> {
//     constructor(private data: T[]) { }
//     getItem(index: number): T {
//         return this.data[index]
//     }
// }

// const data = new DataManger<string>(['2'])
// console.log(data.getItem(0));


/* 使用泛型作为一个具体的类型注解 */
function hello<T>(params: T) {
    return params
}
// 又声明了个函数，把hello赋给func
const func: <T>(params: T) => T = hello