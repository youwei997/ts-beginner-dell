"use strict";
// 慕课网实战的分析器
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var CodingImoocAnalyzer = /** @class */ (function () {
    // 不可被外部实例化
    function CodingImoocAnalyzer() {
    }
    // 获取实例
    CodingImoocAnalyzer.getInstance = function () {
        // 如果 getInstance 方法有接收值，那么只有第一次调用时，才会生成实例，只有第一次传的值才有效
        // 判断是否存在实例
        if (!CodingImoocAnalyzer.instance) {
            // 不存在实例，创建实例
            CodingImoocAnalyzer.instance = new CodingImoocAnalyzer();
        }
        // 返回 instance 实例
        return CodingImoocAnalyzer.instance;
    };
    //解析html
    CodingImoocAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseCard = $(".course-card");
        var courseInfos = [];
        courseCard.map(function (index, element) {
            // 获取课程的标题
            var title = $(element).find(".ellipsis2").text();
            // 获取课程的金额
            var price = parseInt($(element).find(".price").text().replace("￥", "")); //获取金额，并且去除￥
            courseInfos.push({
                title: title,
                price: price,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    };
    // 生成课程信息的json文件
    CodingImoocAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        // fileContent 是对象，键名是时间戳，键值是课程信息（数组）
        var fileContent = {};
        // 判断文件是否存在
        if (fs_1.default.existsSync(filePath)) {
            // readFileSync 读取后是字符串，需要用JSON.parse转换成对象
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        // 生成文件内容
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    CodingImoocAnalyzer.prototype.analyze = function (html, filePath) {
        // 把html传入 getCourseInfo 方法解析html
        var courseInfo = this.getCourseInfo(html); // 这里生成的应该是应该具有time和data的对象
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return CodingImoocAnalyzer;
}());
exports.default = CodingImoocAnalyzer;
