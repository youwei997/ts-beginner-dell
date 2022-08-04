"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.MethodType = void 0;
var MethodType;
(function (MethodType) {
    MethodType["get"] = "get";
    MethodType["post"] = "post";
    MethodType["put"] = "put";
    MethodType["delete"] = "delete";
})(MethodType = exports.MethodType || (exports.MethodType = {}));
// type MethodType = "get" | "post" | "put" | "delete";
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
exports.get = getRequestDecorator(MethodType.get);
exports.post = getRequestDecorator(MethodType.post);
exports.put = getRequestDecorator(MethodType.put);
exports.del = getRequestDecorator(MethodType.delete);
