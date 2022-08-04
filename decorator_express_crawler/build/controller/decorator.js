"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.controller = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
function controller(target) {
    for (var key in target.prototype) {
        // 这个key就是class 里的方法名
        var path = Reflect.getMetadata("path", target.prototype, key);
        // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
        var func = target.prototype[key];
        if (path) {
            router.get(path, func);
        }
    }
}
exports.controller = controller;
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata("path", path, target, key);
    };
}
exports.get = get;
function post(path) {
    return function (target, key) {
        Reflect.defineMetadata("path", path, target, key);
    };
}
exports.post = post;
exports.default = router;
