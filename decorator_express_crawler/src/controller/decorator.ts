import { RequestHandler, Router } from "express";
const router = Router();

// 用于接收各个不同请求方式的函数
function getRequestDecorator(type: string) {
  // 装饰器工厂，用于接收请求路径
  return function (path: string) {
    // 装饰器
    return function (target: any, key: string) {
      // 将路径存到元数据
      Reflect.defineMetadata("path", path, target, key);
      // 将请求方式存到元数据
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator("get");
export const post = getRequestDecorator("post");
export const put = getRequestDecorator("put");
export const del = getRequestDecorator("delete");

enum MethodType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
// type MethodType = "get" | "post" | "put" | "delete";

export function controller(target: any) {
  for (let key in target.prototype) {
    // 这个key就是class 里的方法名
    const path = Reflect.getMetadata("path", target.prototype, key);
    // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
    // 获取请求方法
    const method: MethodType = Reflect.getMetadata(
      "method",
      target.prototype,
      key
    );
    // 取中间件
    const middleware = Reflect.getMetadata("middleware", target.prototype, key);
    const func = target.prototype[key];
    if (path && method && func) {
      // 如果中间件存在，就把中间件放router生成的路由里
      if (middleware) {
        router[method](path, middleware, func);
      } else {
        router[method](path, func);
      }
    }
  }
}

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}

export default router;
