"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const Crawler_1 = __importDefault(require("./utils/Crawler"));
const Analyzer_1 = __importDefault(require("./utils/Analyzer"));
const unit_1 = require("./utils/unit");
const analyzer = Analyzer_1.default.getInstance();
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (!isLogin) {
        res.json((0, unit_1.getResData)(null, "请登录后操作"));
        return;
        // res.send("请登录后操作");
    }
    next();
};
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        const logOut = `<html>
                        <body>
                            <a href='/crawler'>爬取数据</a>
                            <a href='/showData'>展示内容</a>
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
router.get("/crawler", checkLogin, (req, res) => {
    const url = "https://coding.imooc.com/";
    new Crawler_1.default(url, analyzer);
    res.send("crawler success");
});
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, unit_1.getResData)(false, "已经登陆"));
    }
    else {
        if (password === "123" && req.session) {
            req.session.login = true;
            res.json((0, unit_1.getResData)(true, "登录成功"));
        }
        else {
            res.json((0, unit_1.getResData)(false, "登录失败"));
        }
    }
});
router.get("/showData", checkLogin, (req, res) => {
    // __dirname 代表build目录
    try {
        const position = path_1.default.resolve(__dirname, "../data/course.json");
        const result = fs_1.default.readFileSync(position, "utf-8");
        res.json((0, unit_1.getResData)(JSON.parse(result)));
    }
    catch (e) {
        res.json((0, unit_1.getResData)(false, "没有爬取到内容"));
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = false;
    }
    res.redirect("/");
    res.json((0, unit_1.getResData)(true));
});
exports.default = router;
