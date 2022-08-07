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
exports.LoginController = void 0;
require("reflect-metadata");
var fs_1 = __importDefault(require("fs"));
var index_1 = require("../decorator/index");
var unit_1 = require("../utils/unit");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    // 静态方法在类里使用 LoginController.isLogin(req);
    LoginController.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    LoginController.prototype.isLogin = function (req, res) {
        var isLogin = LoginController_1.isLogin(req);
        res.json((0, unit_1.getResData)(isLogin));
    };
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = LoginController_1.isLogin(req);
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
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = false;
        }
        // res.redirect("/");
        res.json((0, unit_1.getResData)(true));
    };
    LoginController.prototype.home = function (req, res) {
        var isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            var logOut = "<html>\n                        <body>\n                            <a href='/crawler'>\u722C\u53D6\u6570\u636E</a>\n                            <a href='/showData'>\u5C55\u793A\u5185\u5BB9</a>\n                            <a href='/logout'>\u9000\u51FA</a>\n                        </body>\n                  </html>";
            res.send(logOut);
        }
        else {
            // 使用html表单，点击提交才能发送 /crawler 请求
            res.writeHead(200, { "Content-Type": "text/html" });
            fs_1.default.readFile("./static/login.html", "utf-8", function (err, data) {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        }
    };
    var LoginController_1;
    __decorate([
        (0, index_1.get)("/api/isLogin"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
    __decorate([
        (0, index_1.post)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, index_1.get)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        (0, index_1.get)("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = LoginController_1 = __decorate([
        (0, index_1.controller)("/")
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
// const test = new LoginController();
