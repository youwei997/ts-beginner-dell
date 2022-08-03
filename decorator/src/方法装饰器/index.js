"use strict";
/* 方法装饰器 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* 第一个参数 target */
// 普通方法，target对应的是类的prototype
// 静态方法（static function），target对应的是类的构造函数
/* 第二个参数 key */
// key是装饰的方法名字
/* 第三个参数 descriptor */
function getNameDecorator(target, key, descriptor) {
    console.log(target);
    descriptor.value = () => {
        return "descriptor";
    };
}
class Test {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
__decorate([
    getNameDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test.prototype, "getName", null);
const test = new Test("name");
console.log(test.getName());
