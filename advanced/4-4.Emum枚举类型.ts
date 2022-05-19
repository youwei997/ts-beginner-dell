// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELETED: 2,
// };

//  enum 第一个默认是0， 如果改变了默认值，那么后面的值就会自动加1
enum Status {
  OFFLINE,
  ONLINE,
  DELETED,
}

console.log(Status.OFFLINE); // 0
console.log(Status["ONLINE"]); //1. 可以使用枚举类型的值，来代替字符串
console.log(Status[2]); // DELETED ,反查

function getResult(status: number) {
  if (status === Status.OFFLINE) {
    return "offline";
  } else if (status === Status.ONLINE) {
    return "online";
  } else {
    return "error";
  }
}

const result = getResult(Status.ONLINE);
// console.log(result); //online
