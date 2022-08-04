"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key) {
        var middlewareArr = Reflect.getMetadata("middleware", target, key) || [];
        middlewareArr.push(middleware);
        Reflect.defineMetadata("middleware", middlewareArr, target, key);
    };
}
exports.use = use;
