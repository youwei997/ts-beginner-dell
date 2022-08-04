"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.controller = exports.del = exports.put = exports.post = exports.get = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
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
var MethodType;
(function (MethodType) {
    MethodType["get"] = "get";
    MethodType["post"] = "post";
    MethodType["put"] = "put";
    MethodType["delete"] = "delete";
})(MethodType || (MethodType = {}));
// type MethodType = "get" | "post" | "put" | "delete";
function controller(target) {
    for (var key in target.prototype) {
        // 这个key就是class 里的方法名
        var path = Reflect.getMetadata("path", target.prototype, key);
        // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
        // 获取请求方法
        var method = Reflect.getMetadata("method", target.prototype, key);
        // 取中间件
        var middleware = Reflect.getMetadata("middleware", target.prototype, key);
        var func = target.prototype[key];
        if (path && method && func) {
            // 如果中间件存在，就把中间件放router生成的路由里
            if (middleware) {
                router[method](path, middleware, func);
            }
            else {
                router[method](path, func);
            }
        }
    }
}
exports.controller = controller;
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
exports.default = router;
