import express, { Router, Request, Response } from "express";
import fs from 'fs'
import Crawler from "./Crawler";
import CodingImoocAnalyzer from "./CodingImoocAnalyzer";
const analyzer = CodingImoocAnalyzer.getInstance();
const router = Router()
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
router.post('/crawler', (req: Request, res: Response) => {
    const { password } = req.body
    if (password === '123') {
        // 当密码为123 才会进行爬虫请求
        const url = "https://coding.imooc.com/";
        new Crawler(url, analyzer)
        res.send('crawler success')
    } else {
        res.send('password error')
    }

})
export default router