"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
// 装饰器工厂
// class 加路由前缀
function controller(prefix) {
    // target 类型是构造函数  --->  new (...args: any[]) => any
    return function (target) {
        for (var key in target.prototype) {
            // 这个key就是class 里的方法名
            var path = Reflect.getMetadata("path", target.prototype, key);
            // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
            // 获取请求方法
            var method = Reflect.getMetadata("method", target.prototype, key);
            // 取中间件,中间件改成数组形式
            var middleware = Reflect.getMetadata("middleware", target.prototype, key);
            var func = target.prototype[key];
            if (path && method) {
                // 如果传进来是 / 就不加前缀
                var prefixPath = prefix === "/" ? path : prefix + path;
                // 如果中间件存在，就把中间件放router生成的路由里
                if (middleware && middleware.length) {
                    // 数组形式中间件
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([prefixPath], middleware, false), [func], false));
                }
                else {
                    router_1.default[method](prefixPath, func);
                }
            }
        }
    };
}
exports.controller = controller;
