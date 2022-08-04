"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.controller = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
function controller(target) {
    for (var key in target.prototype) {
        // 这个key就是class 里的方法名
        var path = Reflect.getMetadata("path", target.prototype, key);
        // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
        // 获取请求方法
        var method = Reflect.getMetadata("method", target.prototype, key);
        var func = target.prototype[key];
        if (path && method && func) {
            console.log(method);
            router[method](path, func);
        }
    }
}
exports.controller = controller;
// 用于接收各个不同请求方式的函数
function getRequestDecorator(type) {
    // 装饰器工厂，用于接收请求路径
    return function (path) {
        // 装饰器
        return function (target, key) {
            // 将路径存到元数据
            Reflect.defineMetadata("path", path, target, key);
            // 将请求方式存到元数据
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator("get");
exports.post = getRequestDecorator("post");
exports.put = getRequestDecorator("put");
exports.del = getRequestDecorator("delete");
// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }
exports.default = router;
