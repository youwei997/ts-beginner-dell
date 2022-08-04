import { Router } from "express";
const router = Router();

export function controller(target: any) {
  for (let key in target.prototype) {
    // 这个key就是class 里的方法名
    const path = Reflect.getMetadata("path", target.prototype, key);
    // 用方法名取到target.prototype 里对应的函数，相当于取class里的函数
    const func = target.prototype[key];
    if (path) {
      router.get(path, func);
    }
  }
}

export function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
  };
}

export function post(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
  };
}

export default router;
