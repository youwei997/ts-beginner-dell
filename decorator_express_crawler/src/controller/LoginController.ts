import "reflect-metadata";
import { Request, Response } from "express";
import fs from "fs";

import { BodyRequest } from "../index";
import { controller, get, post } from "./decorator";
import { getResData } from "../utils/unit";

@controller
class LoginController {
  @post("/login")
  login(req: BodyRequest, res: Response) {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResData(false, "已经登陆"));
    } else {
      if (password === "123" && req.session) {
        req.session.login = true;
        res.json(getResData(true, "登录成功"));
      } else {
        res.json(getResData(false, "登录失败"));
      }
    }
  }
  @get("/logout")
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = false;
    }
    // res.redirect("/");
    res.json(getResData(true));
  }
  @get("/")
  home(req: BodyRequest, res: Response) {
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
    } else {
      // 使用html表单，点击提交才能发送 /crawler 请求
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./static/login.html", "utf-8", (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    }
  }
}
// const test = new LoginController();
