import { controller } from "../controller/";

export enum MethodType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
// type MethodType = "get" | "post" | "put" | "delete";

// 用于接收各个不同请求方式的函数
function getRequestDecorator(type: MethodType) {
  // 装饰器工厂，用于接收请求路径
  return function (path: string) {
    // 装饰器
    return function (target: controller, key: string) {
      // 将路径存到元数据
      Reflect.defineMetadata("path", path, target, key);
      // 将请求方式存到元数据
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(MethodType.get);
export const post = getRequestDecorator(MethodType.post);
export const put = getRequestDecorator(MethodType.put);
export const del = getRequestDecorator(MethodType.delete);
