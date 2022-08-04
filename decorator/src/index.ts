/*  reflect-metadata */

// (1) 设置
// Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
//    metadataKey：meta 数据的 key
//    metadataValue：meta 数据的 值
//    target：meta 数据附加的目标
//    propertyKey（可选）：对应的 property key

// (2) 获取
//    Reflect.getMetadata(metadataKey, target, propertyKey)

import "reflect-metadata";

const paramDecorator: ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => {
  //   console.log(parameterIndex);
  let requiredParams: number[] = [];
  requiredParams.push(parameterIndex);
  Reflect.defineMetadata("required", requiredParams, target, propertyKey);
};

const validateDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value;
  descriptor.value = function () {
    // 默认带有 arguments
    // 直接输出 console.log(arguments);
    const requiredParams: number[] = Reflect.getMetadata(
      "required",
      target,
      propertyKey
    );
    // index 位于方法的第几位
    requiredParams.forEach((index) => {
      // 判断参数的位置，如果大于 arguments.length 或者 判断arguments[index] == undefined 说明参数少传了
      if (index > arguments.length || arguments[index] == undefined) {
        throw new Error("参数不正确");
      }
    });

    // 这里必须return 出去，否则class实例化后取不到值
    // return method.apply(this, arguments);
    return method(...arguments);
  };
};

class User {
  @validateDecorator
  find(name: string, @paramDecorator id: number) {
    console.log(name, id);
    return {
      name,
      id,
    };
  }
}

const user = new User();
console.log(user.find("zs", 1));
