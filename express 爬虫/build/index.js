"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "static")));
// 只有是正确的content-type默认是application/json才进入这个中间件解析处理。
app.use(express_1.default.json());
// 当请求的数据类型是application/x-www-form-urlencoded时才会进入这个中间件进行处理。
app.use(express_1.default.urlencoded({ extended: false }));
//cookieSession
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["cookie-session"],
    maxAge: 24 * 60 * 60 * 1000, //24 小时
}));
app.use(router_1.default);
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
