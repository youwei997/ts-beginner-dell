"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const Crawler_1 = __importDefault(require("./Crawler"));
const CodingImoocAnalyzer_1 = __importDefault(require("./CodingImoocAnalyzer"));
const analyzer = CodingImoocAnalyzer_1.default.getInstance();
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    // 使用html表单，点击提交才能发送 /crawler 请求
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs_1.default.readFile('./static/login.html', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    });
});
router.post('/crawler', (req, res) => {
    const { password } = req.body;
    if (password === '123') {
        // 当密码为123 才会进行爬虫请求
        const url = "https://coding.imooc.com/";
        new Crawler_1.default(url, analyzer);
        res.send('crawler success');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;
