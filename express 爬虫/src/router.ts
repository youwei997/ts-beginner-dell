import express, { Router, Request, Response } from "express";
import fs from 'fs'
import Crawler from "./Crawler";
import CodingImoocAnalyzer from "./CodingImoocAnalyzer";
const router = Router()
const analyzer = CodingImoocAnalyzer.getInstance();

// 当使用中间件，ts描述文件类型不准确时，可以引入描述文件某个具体内容，再改变这个内容
interface RequestWithBody extends Request {
    body: {
        // 传进来任意字段都是string类型
        [key: string]: string | undefined
    }
}
router.get('/', (req: Request, res: Response) => {
    // 使用html表单，点击提交才能发送 /crawler 请求
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('./static/login.html', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    });
})

// 爬虫路由
// router.post('/crawler', (req: RequestWithBody, res: Response) => {
//     const { password } = req.body
//     if (password === '123') {
//         // 当密码为123 才会进行爬虫请求
//         const url = "https://coding.imooc.com/";
//         new Crawler(url, analyzer)
//         res.send('crawler success')
//     } else {
//         res.send('password error')
//     }
// })

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send('已经登陆')
    } else {
        if (password === '123' && req.session) {
            req.session.login = true
            res.send('登录成功')
        } else {
            res.send('登录失败')
        }
    }
})
export default router