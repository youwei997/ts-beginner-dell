// 定义全局变量形式 声明$是一个函数，传入的参数是一个函数，传入的函数返回值为空,$函数的返回值空,
// declare var $: (param: () => void) => void

// 定义全局函数形式 函数名为$ 传入的参数是一个函数,传入的函数返回值为空,$函数的返回值空,
// declare function $(param: () => void): void

// 函数重载,同一个函数可以定义多次,根据函数的参数不同,就理解不同的函数作用
// 重载后 $函数参数变为string,返回值变成对象,对象里有个html方法,html方法参数为string,返回值为对象
// declare function $(param: string): {
//     html: (html: string) => {}
// }


// 优化
interface JqueryInstance {
    // 再返回一个JqueryInstance，jq的链式调用
    html: (html: string) => JqueryInstance
}
// 这个是用于传入一个加载函数
declare function $(readyFunc: () => void): void
// 选择器
declare function $(selector: string): JqueryInstance