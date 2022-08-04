import { Request, Response } from "express";
import fs from "fs";
import { get } from "superagent";

import { BodyRequest } from "../index";

function get(path: string) {
  return function (target: any, key: string) {};
}

class LoginController {
  //   constructor(parameters) {}
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
