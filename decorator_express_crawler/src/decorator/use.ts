import { RequestHandler } from "express";

import { controller } from "../controller/";

export function use(middleware: RequestHandler) {
  return function (target: controller, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
