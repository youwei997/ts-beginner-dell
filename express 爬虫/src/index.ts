import express, { Request, Response } from "express";
import router from "./router";
const app = express()

app.use(router)

app.listen(3000, () => {
    console.log('服务器启动');
})
