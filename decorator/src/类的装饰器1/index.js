"use strict";
/* 类的装饰器 */
// 类的装饰器，就是对类的一种修饰，本身是一个函数
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 类的装饰器，接收的是一个构造函数
function testDecorator(constructor) {
    //   constructor.prototype.getName = () => {
    //     console.log("getName");
    //   };
    console.log("testDecorator1");
}
function testDecorator2(constructor) {
    //   constructor.prototype.getName = () => {
    //     console.log("getName");
    //   };
    console.log("testDecorator2");
}
// 装饰器传参
function decoratorParams(flag) {
    // 有传入参数时执行返回装饰器，否则返回空的装饰器
    if (flag) {
        return function (constructor) {
            constructor.prototype.getName = () => {
                console.log("getName");
            };
        };
    }
    else {
        return (constructor) => { };
    }
}
// 类创建是就执行，不是实例化才执行
// 类装饰器收集是从上到下，装饰器执行顺序是从下到上
let Test = class Test {
};
Test = __decorate([
    testDecorator,
    testDecorator2,
    decoratorParams(false)
], Test);
const test = new Test();
test.getName();
// 避免变量重复
exports.default = void 0;
