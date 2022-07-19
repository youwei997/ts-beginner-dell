"use strict";
// 慕课网实战的分析器
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class CodingImoocAnalyzer {
    // 不可被外部实例化
    constructor() { }
    // 获取实例
    static getInstance() {
        // 如果 getInstance 方法有接收值，那么只有第一次调用时，才会生成实例，只有第一次传的值才有效
        // 判断是否存在实例
        if (!CodingImoocAnalyzer.instance) {
            // 不存在实例，创建实例
            CodingImoocAnalyzer.instance = new CodingImoocAnalyzer();
        }
        // 返回 instance 实例
        return CodingImoocAnalyzer.instance;
    }
    //解析html
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseCard = $(".course-card");
        const courseInfos = [];
        courseCard.map((index, element) => {
            // 获取课程的标题
            const title = $(element).find(".ellipsis2").text();
            // 获取课程的金额
            const price = parseInt($(element).find(".price").text().replace("￥", "")); //获取金额，并且去除￥
            courseInfos.push({
                title,
                price,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    }
    // 生成课程信息的json文件
    generateJsonContent(courseInfo, filePath) {
        // fileContent 是对象，键名是时间戳，键值是课程信息（数组）
        let fileContent = {};
        // 判断文件是否存在
        if (fs_1.default.existsSync(filePath)) {
            // readFileSync 读取后是字符串，需要用JSON.parse转换成对象
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        // 生成文件内容
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }
    analyze(html, filePath) {
        // 把html传入 getCourseInfo 方法解析html
        const courseInfo = this.getCourseInfo(html); // 这里生成的应该是应该具有time和data的对象
        const fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = CodingImoocAnalyzer;
