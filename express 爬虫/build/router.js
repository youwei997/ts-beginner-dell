"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const Crawler_1 = __importDefault(require("./Crawler"));
const CodingImoocAnalyzer_1 = __importDefault(require("./CodingImoocAnalyzer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const analyzer = CodingImoocAnalyzer_1.default.getInstance();
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    console.log(req.session);
    if (isLogin) {
        const logOut = `<html>
                        <body>
                            <a href='/crawler'>爬取数据</a>
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
router.get("/crawler", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        //只有登录时 才会进行爬虫请求
        const url = "https://coding.imooc.com/";
        new Crawler_1.default(url, analyzer);
        res.send("crawler success");
    }
    else {
        res.send("password error");
    }
});
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
router.get("/showData", (req, res) => {
    const issLogin = req.session ? req.session.login : false;
    if (!issLogin) {
        res.send("请登录后操作");
    }
    // __dirname 代表build目录
    try {
        const position = path_1.default.resolve(__dirname, "../data/course.json");
        const result = fs_1.default.readFileSync(position, "utf-8");
        res.json(JSON.parse(result));
    }
    catch (e) {
        res.send("没有爬取到内容");
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = false;
    }
    res.redirect("/");
});
exports.default = router;
