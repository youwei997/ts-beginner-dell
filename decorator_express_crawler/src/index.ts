import express, { Request } from "express";
import path from "path";
import cookieSession from "cookie-session";

//引入装饰器Controller
import "./controller/LoginController";
import router from "./controller/decorator";

const app = express();
app.use(express.static(path.join(__dirname, "static")));
// 只有是正确的content-type默认是application/json才进入这个中间件解析处理。
app.use(express.json());
// 当请求的数据类型是application/x-www-form-urlencoded时才会进入这个中间件进行处理。
app.use(express.urlencoded({ extended: false }));

//cookieSession
app.use(
  cookieSession({
    name: "session",
    keys: ["cookie-session"],
    maxAge: 24 * 60 * 60 * 1000, //24 小时
  })
);

app.use(router);

// 当使用中间件，ts描述文件类型不准确时，可以引入描述文件某个具体内容，再改变这个内容
export interface BodyRequest extends Request {
  body: {
    // 传进来任意字段都是string类型
    [key: string]: string | undefined;
  };
}

// 自定义一个中间件
// custom.d.ts
/* 
declare namespace Express {
    interface Request {
        teacherName: string
    }
}
*/

// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.teacherName = 'hello'
//     next()
// })

app.listen(3000, () => {
  console.log("服务器启动");
});
