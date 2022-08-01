"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Crawler_1 = __importDefault(require("./Crawler"));
const CodingImoocAnalyzer_1 = __importDefault(require("./CodingImoocAnalyzer"));
const analyzer = CodingImoocAnalyzer_1.default.getInstance();
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('express');
});
router.get('/crawler', (req, res) => {
    const url = "https://coding.imooc.com/";
    new Crawler_1.default(url, analyzer);
    res.send('crawler success');
});
exports.default = router;
