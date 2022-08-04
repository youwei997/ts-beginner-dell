import { RequestHandler } from "express";

import { controller } from "../controller/";

export function use(middleware: RequestHandler) {
  return function (target: controller, key: string) {
    const middlewareArr = Reflect.getMetadata("middleware", target, key) || [];
    middlewareArr.push(middleware);
    Reflect.defineMetadata("middleware", middlewareArr, target, key);
  };
}
