import express from "express";
import router from "./router";
import path from "path";
import cookieSession from "cookie-session";
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
