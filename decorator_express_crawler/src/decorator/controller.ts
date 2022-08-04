import router from "../router";
import { RequestHandler } from "express";
import { MethodType } from "./request";

// 装饰器工厂
// class 加路由前缀
export function controller(prefix: string) {
  // target 类型是构造函数  --->  new (...args: any[]) => any
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 这个key就是class 里的方法名
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
      // 获取请求方法
      const method: MethodType = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      // 取中间件,中间件改成数组形式
      const middleware: RequestHandler[] = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );
      const func = target.prototype[key];
      if (path && method) {
        // 如果传进来是 / 就不加前缀
        const prefixPath = prefix === "/" ? path : prefix + path;

        // 如果中间件存在，就把中间件放router生成的路由里
        if (middleware && middleware.length) {
          // 数组形式中间件
          router[method](prefixPath, ...middleware, func);
        } else {
          router[method](prefixPath, func);
        }
      }
    }
  };
}
