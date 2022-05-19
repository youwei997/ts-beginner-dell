"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CodingImoocAnalyzer_1 = __importDefault(require("./CodingImoocAnalyzer"));
class Crowller {
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        this.filePath = path_1.default.join(__dirname, "../data/course.json");
        // 调用 初始化爬虫
        this.initSpiderProcess();
    }
    // 获取html
    getRawHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
        });
    }
    writeFileSync(content) {
        fs_1.default.writeFileSync(this.filePath, content);
        console.log("写入成功");
    }
    // 初始化爬虫
    initSpiderProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            // 调用getRawHtml方法获取html结构
            const html = yield this.getRawHtml();
            const fileContent = this.analyzer.analyze(html, this.filePath);
            // 写入文件 fileContent 是对象，写入时得转换成字符串 JSON.stringify
            this.writeFileSync(fileContent);
        });
    }
}
const url = "https://coding.imooc.com/";
const analyzer = CodingImoocAnalyzer_1.default.getInstance();
new Crowller(url, analyzer);
console.log(1);
