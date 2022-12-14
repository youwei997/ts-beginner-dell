"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
require("reflect-metadata");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var index_1 = require("../decorator/index");
var Crawler_1 = __importDefault(require("../utils/Crawler"));
var Analyzer_1 = __importDefault(require("../utils/Analyzer"));
var unit_1 = require("../utils/unit");
var index_2 = require("../index");
var analyzer = Analyzer_1.default.getInstance();
// 课程对象： 标题和价格
// interface CourseItem {
//   title: string;
//   price: number;
//   people: number;
// }
// // state里data（爬到的数据）的类型， --》 时间戳: 具体课程数组
// interface Data {
//   [key: string]: CourseItem[];
// }
// 中间件
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (!isLogin) {
        res.json((0, unit_1.getResData)(null, "请登录后操作"));
        return;
        // res.send("请登录后操作");
    }
    next();
};
var CrawlerController = /** @class */ (function () {
    function CrawlerController() {
    }
    CrawlerController.prototype.crawler = function (req, res) {
        // 因为数据需要使用echarts，课程标题用在echarts的标题，就选择了课程少的课程分类，职场进阶
        var url = index_2.crawlerUrl;
        new Crawler_1.default(url, analyzer);
        res.json((0, unit_1.getResData)(true, "爬取成功"));
    };
    CrawlerController.prototype.showData = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, "../../data/course.json");
            var result = fs_1.default.readFileSync(position, "utf-8");
            res.json((0, unit_1.getResData)(JSON.parse(result)));
        }
        catch (e) {
            res.json((0, unit_1.getResData)(false, "没有爬取到内容"));
        }
    };
    __decorate([
        (0, index_1.get)("/crawler"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "crawler", null);
    __decorate([
        (0, index_1.get)("/showData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "showData", null);
    CrawlerController = __decorate([
        (0, index_1.controller)("/api")
    ], CrawlerController);
    return CrawlerController;
}());
exports.CrawlerController = CrawlerController;
