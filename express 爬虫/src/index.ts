import express, { Request, Response } from "express";
import router from "./router";
import path from 'path'
import { json } from "express";
const app = express()
app.use(express.static(path.join(__dirname, 'static')));
// 只有是正确的content-type默认是application/json才进入这个中间件解析处理。
app.use(express.json());
// 当请求的数据类型是application/x-www-form-urlencoded时才会进入这个中间件进行处理。
app.use(express.urlencoded({ extended: false }));
app.use(router)

app.listen(3000, () => {
    console.log('服务器启动');
})
