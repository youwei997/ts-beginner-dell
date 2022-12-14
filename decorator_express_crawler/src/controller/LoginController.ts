import "reflect-metadata";
import { Response } from "express";

import { BodyRequest } from "../index";
import { controller, get, post } from "../decorator/index";
import { getResData } from "../utils/unit";

@controller("/api")
export class LoginController {
  // 静态方法在类里使用 LoginController.isLogin(req);
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get("/isLogin")
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    const result = getResData<responseResult.isLogin>(isLogin);
    res.json(result);
  }

  @post("/login")
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.json(getResData<responseResult.login>(true, "已经登陆"));
    } else {
      if (password === "123" && req.session) {
        req.session.login = true;
        res.json(getResData<responseResult.login>(true, "登录成功"));
      } else {
        res.json(getResData<responseResult.login>(false, "登录失败"));
      }
    }
  }
  @get("/logout")
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = false;
    }
    res.json(getResData<responseResult.logout>(true));
  }
  // @get("/")
  // home(req: BodyRequest, res: Response): void {
  //   const isLogin = LoginController.isLogin(req);
  //   if (isLogin) {
  //     const logOut = `<html>
  //                       <body>
  //                           <a href='/crawler'>爬取数据</a>
  //                           <a href='/showData'>展示内容</a>
  //                           <a href='/logout'>退出</a>
  //                       </body>
  //                 </html>`;
  //     res.send(logOut);
  //   } else {
  //     // 使用html表单，点击提交才能发送 /crawler 请求
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     fs.readFile("./static/login.html", "utf-8", (err, data) => {
  //       if (err) {
  //         throw err;
  //       }
  //       res.end(data);
  //     });
  //   }
  // }
}
// const test = new LoginController();
