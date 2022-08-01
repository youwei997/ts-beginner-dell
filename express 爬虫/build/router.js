"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const CodingImoocAnalyzer_1 = __importDefault(require("./CodingImoocAnalyzer"));
const router = (0, express_1.Router)();
const analyzer = CodingImoocAnalyzer_1.default.getInstance();
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    console.log(req.session);
    if (isLogin) {
        const logOut = `<html>
                        <body>
                            <a href='/logout'>退出</a>
                        </body>
                  </html>`;
        res.send(logOut);
    }
    else {
        // 使用html表单，点击提交才能发送 /crawler 请求
        res.writeHead(200, { "Content-Type": "text/html" });
        fs_1.default.readFile("./static/login.html", "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
});
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
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("已经登陆");
    }
    else {
        if (password === "123" && req.session) {
            req.session.login = true;
            res.send("登录成功");
        }
        else {
            res.send("登录失败");
        }
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = false;
    }
    res.redirect("/");
});
exports.default = router;
